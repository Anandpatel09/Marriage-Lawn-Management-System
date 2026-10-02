import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  let connection;

  try {
    // -------------------------------------------------
    // 1. USER FROM AUTH TOKEN
    // -------------------------------------------------

    const userId = req.user.userId;

    // -------------------------------------------------
    // 2. REQUEST DATA
    // -------------------------------------------------

    const {
      venueId,
      packageId,
      occasion,
      bookingDate,
      guests,
      customerAddress,
      specialRequests,
    } = req.body;

    // -------------------------------------------------
    // 3. BASIC VALIDATION
    // -------------------------------------------------

    if (!venueId || !packageId || !occasion || !bookingDate || !guests) {
      return res.status(400).json({
        message:
          "Venue, package, occasion, booking date and guests are required.",
      });
    }

    if (Number(guests) <= 0) {
      return res.status(400).json({
        message: "Number of guests must be greater than 0.",
      });
    }

    // -------------------------------------------------
    // 4. CONNECTION
    // -------------------------------------------------

    connection = await pool.getConnection();

    await connection.beginTransaction();

    // -------------------------------------------------
    // 5. GET CUSTOMER
    // -------------------------------------------------

    const [users] = await connection.execute(
      `
            SELECT
                id,
                first_name,
                last_name,
                email,
                mobile,
                city
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
      [userId],
    );

    if (users.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "User not found.",
      });
    }

    const user = users[0];

    const customerName = `${user.first_name} ${user.last_name}`.trim();

    const customerEmail = user.email;

    const customerMobile = user.mobile;

    const address = customerAddress || user.city || null;

    // -------------------------------------------------
    // 6. GET VENUE
    // -------------------------------------------------

    const [venues] = await connection.execute(
      `
            SELECT
                id,
                name,
                capacity
            FROM venues
            WHERE id = ?
            LIMIT 1
            `,
      [venueId],
    );

    if (venues.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Marriage lawn not found.",
      });
    }

    const venue = venues[0];

    // -------------------------------------------------
    // 7. CHECK VENUE CAPACITY
    // -------------------------------------------------

    if (Number(guests) > Number(venue.capacity)) {
      await connection.rollback();

      return res.status(400).json({
        message: `Maximum capacity of ${venue.name} is ${venue.capacity} guests.`,
      });
    }

    // -------------------------------------------------
    // 8. GET PACKAGE
    // -------------------------------------------------

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
            LIMIT 1
            `,
      [packageId],
    );

    if (packages.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Selected package not found.",
      });
    }

    const selectedPackage = packages[0];

    // -------------------------------------------------
    // 9. CHECK AVAILABILITY
    // -------------------------------------------------

    const [existingBookings] = await connection.execute(
      `
                SELECT
                    id,
                    status
                FROM bookings
                WHERE venue_id = ?
                  AND booking_date = ?
                  AND slot = 'full-day'
                  AND status IN (
                      'pending',
                      'confirmed'
                  )
                LIMIT 1
                FOR UPDATE
                `,
      [venueId, bookingDate],
    );

    if (existingBookings.length > 0) {
      await connection.rollback();

      return res.status(409).json({
        message: "This marriage lawn is already booked for the selected date.",
      });
    }

    // -------------------------------------------------
    // 10. SERVER-SIDE PRICE CALCULATION
    // -------------------------------------------------

    const baseAmount = Number(selectedPackage.base_price);

    const includedGuests = Number(selectedPackage.included_guests);

    const extraGuestPrice = Number(selectedPackage.extra_guest_price);

    const guestCount = Number(guests);

    const extraGuestCount = Math.max(0, guestCount - includedGuests);

    const extraGuestAmount = extraGuestCount * extraGuestPrice;

    const subtotal = baseAmount + extraGuestAmount;

    const gstAmount = Number((subtotal * 0.18).toFixed(2));

    const totalAmount = Number((subtotal + gstAmount).toFixed(2));

    // -------------------------------------------------
    // 11. INSERT BOOKING
    // -------------------------------------------------

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
                    customer_name,
                    customer_mobile,
                    customer_email,
                    customer_address,
                    special_requests,
                    base_amount,
                    extra_guest_count,
                    extra_guest_amount,
                    subtotal,
                    gst_amount,
                    total_amount,
                    status
                )
                VALUES (?,?,?,?,?,'full-day',?,?,?,?,?,?,?,?,?,?,?,?,'pending')
                `,
      [
        userId,
        venueId,
        packageId,
        occasion,
        bookingDate,
        guestCount,
        customerName,
        customerMobile,
        customerEmail,
        address,
        specialRequests || null,
        baseAmount,
        extraGuestCount,
        extraGuestAmount,
        subtotal,
        gstAmount,
        totalAmount,
      ],
    );

    // -------------------------------------------------
    // 12. COMMIT
    // -------------------------------------------------

    await connection.commit();

    // -------------------------------------------------
    // 13. RESPONSE
    // -------------------------------------------------

    return res.status(201).json({
      message: "Booking request submitted successfully.",

      booking: {
        id: result.insertId,

        userId,

        venueId,

        packageId,

        venueName: venue.name,

        packageName: selectedPackage.name,

        occasion,

        bookingDate,

        guests: guestCount,

        customerName,

        customerMobile,

        customerEmail,

        customerAddress: address,

        specialRequests: specialRequests || null,

        baseAmount,

        extraGuestCount,

        extraGuestAmount,

        subtotal,

        gstAmount,

        totalAmount,

        status: "pending",
      },
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Rollback error:", rollbackError);
      }
    }

    console.error("Create booking error:", error);

    // ---------------------------------------------
    // DUPLICATE BOOKING
    // ---------------------------------------------

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "This marriage lawn is already booked for the selected date.",
      });
    }

    return res.status(500).json({
      message: "Failed to create booking.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
