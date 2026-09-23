import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user.userId;

    const {
      venueId,
      packageId,
      occasion,
      bookingDate,
      guests,
      specialRequests,
    } = req.body;

    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!venueId || !packageId || !occasion || !bookingDate || !guests) {
      return res.status(400).json({
        message: "All required booking fields must be provided.",
      });
    }

    if (Number(guests) <= 0) {
      return res.status(400).json({
        message: "Guests must be greater than 0.",
      });
    }

    // ----------------------------------------
    // START TRANSACTION
    // ----------------------------------------

    await connection.beginTransaction();

    // ----------------------------------------
    // CHECK VENUE
    // ----------------------------------------

    const [venues] = await connection.execute(
      `
        SELECT
          id,
          name,
          capacity
        FROM venues
        WHERE id = ?
        `,
      [venueId],
    );

    if (venues.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Venue not found.",
      });
    }

    const venue = venues[0];

    // ----------------------------------------
    // CHECK CAPACITY
    // ----------------------------------------

    if (Number(guests) > Number(venue.capacity)) {
      await connection.rollback();

      return res.status(400).json({
        message: `Maximum capacity of ${venue.name} is ${venue.capacity} guests.`,
      });
    }

    // ----------------------------------------
    // GET PACKAGE
    // ----------------------------------------

    const [packages] = await connection.execute(
      `
        SELECT
          id,
          name,
          base_price,
          included_guests,
          extra_guest_price
        FROM packages
        WHERE id = ?
          AND active = TRUE
        `,
      [packageId],
    );

    if (packages.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Package not found.",
      });
    }

    const selectedPackage = packages[0];

    // ----------------------------------------
    // CHECK DATE
    // ----------------------------------------

    const [existingBookings] = await connection.execute(
      `
        SELECT id
        FROM bookings
        WHERE venue_id = ?
          AND booking_date = ?
          AND slot = 'full-day'
          AND status IN ('pending', 'confirmed')
        FOR UPDATE
        `,
      [venueId, bookingDate],
    );

    if (existingBookings.length > 0) {
      await connection.rollback();

      return res.status(409).json({
        message: "This lawn is already booked for the selected date.",
      });
    }

    // ----------------------------------------
    // CALCULATE PRICE ON SERVER
    // ----------------------------------------

    const basePrice = Number(selectedPackage.base_price);

    const includedGuests = Number(selectedPackage.included_guests);

    const extraGuestPrice = Number(selectedPackage.extra_guest_price);

    const extraGuests = Math.max(0, Number(guests) - includedGuests);

    const subtotal = basePrice + extraGuests * extraGuestPrice;

    const gst = subtotal * 0.18;

    const totalAmount = subtotal + gst;

    // ----------------------------------------
    // INSERT BOOKING
    // ----------------------------------------

    const [result] = await connection.execute(
      `
        INSERT INTO bookings (
          user_id,
          venue_id,
          package_id,
          occasion,
          booking_date,
          slot,
          guests,
          total_amount,
          special_requests,
          status
        )
        VALUES (?, ?, ?, ?, ?, 'full-day', ?, ?, ?, 'pending')
        `,
      [
        userId,
        venueId,
        packageId,
        occasion,
        bookingDate,
        guests,
        totalAmount,
        specialRequests || null,
      ],
    );

    // ----------------------------------------
    // COMMIT
    // ----------------------------------------

    await connection.commit();

    return res.status(201).json({
      message: "Booking request submitted successfully.",
      bookingId: result.insertId,
      totalAmount,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Create booking error:", error);

    // Duplicate booking
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "This lawn is already booked for the selected date.",
      });
    }

    return res.status(500).json({
      message: "Failed to create booking.",
    });
  } finally {
    connection.release();
  }
};
