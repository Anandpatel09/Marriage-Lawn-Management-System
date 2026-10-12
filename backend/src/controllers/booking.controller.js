

// src/controllers/booking.controller.js

import pool from "../config/db.js";

/**
 * Shared booking validation and price calculation.
 * Also used by payment.controller.js so online and cash bookings
 * use the same backend-calculated prices.
 */
export const getBookingData = async (connection, body, userId) => {
  const {
    venueId,
    packageId,
    occasion,
    bookingDate,
    guests,
    customerName,
    customerMobile,
    customerEmail,
    customerAddress,
    specialRequests,
  } = body;

  if (
    !venueId ||
    !packageId ||
    !occasion ||
    !bookingDate ||
    !guests ||
    !customerName?.trim() ||
    !customerMobile?.trim() ||
    !customerEmail?.trim() ||
    !customerAddress?.trim()
  ) {
    const error = new Error("Please fill in all required booking fields.");
    error.statusCode = 400;
    throw error;
  }

  const guestCount = Number(guests);

  if (!Number.isInteger(guestCount) || guestCount < 1) {
    const error = new Error("Guests must be a valid positive number.");
    error.statusCode = 400;
    throw error;
  }

  // Lock the venue row while checking availability to reduce race conditions.
  const [venues] = await connection.execute(
    "SELECT id, name FROM venues WHERE id = ? FOR UPDATE",
    [venueId]
  );

  if (!venues.length) {
    const error = new Error("Selected venue was not found.");
    error.statusCode = 404;
    throw error;
  }

  const [packages] = await connection.execute(
    `SELECT
      id,
      name,
      base_price,
      included_guests,
      extra_guest_price
   FROM packages
   WHERE id = ? AND active = 1`,
    [packageId]
  );

  if (!packages.length) {
    const error = new Error("Selected package was not found.");
    error.statusCode = 404;
    throw error;
  }

  // Prevent booking a date already reserved at this venue.
  const [existingBookings] = await connection.execute(
    `SELECT id
     FROM bookings
     WHERE venue_id = ?
       AND booking_date = ?
       AND status IN ('pending', 'confirmed')
     LIMIT 1`,
    [venueId, bookingDate]
  );

  if (packages.length === 0) {
    const error = new Error(
      "Selected package was not found or is inactive."
    );
    error.statusCode = 404;
    throw error;
  }

  const selectedPackage = packages[0];

  const baseAmount = Number(selectedPackage.base_price);
  const includedGuests = Number(selectedPackage.included_guests);
  const extraGuestPrice = Number(selectedPackage.extra_guest_price);

  if (
    !Number.isFinite(baseAmount) ||
    !Number.isFinite(includedGuests) ||
    !Number.isFinite(extraGuestPrice) ||
    baseAmount < 0 ||
    includedGuests < 0 ||
    extraGuestPrice < 0
  ) {
    const error = new Error("Package pricing is invalid.");
    error.statusCode = 500;
    throw error;
  }

  // Calculate additional guest charges
  const extraGuestCount = Math.max(
    0,
    Number(guests) - includedGuests
  );

  const extraGuestAmount = Number(
    (extraGuestCount * extraGuestPrice).toFixed(2)
  );

  // Calculate subtotal and 18% GST
  const subtotal = Number(
    (baseAmount + extraGuestAmount).toFixed(2)
  );

  const gstAmount = Number(
    (subtotal * 0.18).toFixed(2)
  );

  const totalAmount = Number(
    (subtotal + gstAmount).toFixed(2)
  );

  return {
    userId,
    venueId: Number(venueId),
    packageId: Number(packageId),
    occasion: occasion.trim(),
    bookingDate,
    guests: Number(guests),
    customerName: customerName.trim(),
    customerMobile: customerMobile.trim(),
    customerEmail: customerEmail.trim(),
    customerAddress: customerAddress.trim(),
    specialRequests: specialRequests?.trim() || null,
    baseAmount,
    extraGuestCount,
    extraGuestAmount,
    subtotal,
    gstAmount,
    totalAmount,
  };
};

/**
 * Insert a booking after getBookingData has validated it.
 * Booking status remains pending until admin approval.
 */
export const insertBooking = async (
  connection,
  booking,
  { paymentMethod, paymentStatus, razorpayOrderId = null }
) => {
  const [result] = await connection.execute(
    `INSERT INTO bookings (
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
      status,
      paid_amount,
      payment_method,
      payment_status,
      razorpay_order_id
    ) VALUES (
      ?, ?, ?, ?, ?, 'full-day', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      'pending', 0, ?, ?, ?
    )`,
    [
      booking.userId,
      booking.venueId,
      booking.packageId,
      booking.occasion,
      booking.bookingDate,
      booking.guests,
      booking.customerName,
      booking.customerMobile,
      booking.customerEmail,
      booking.customerAddress,
      booking.specialRequests,
      booking.baseAmount,
      booking.extraGuestCount,
      booking.extraGuestAmount,
      booking.subtotal,
      booking.gstAmount,
      booking.totalAmount,
      paymentMethod,
      paymentStatus,
      razorpayOrderId,
    ]
  );

  return result.insertId;
};

/**
 * Pay at Lawn: booking is pending and payment is unpaid.
 * Online bookings are created by payment.controller.js.
 */
// Create Pay at Lawn booking
export const createBooking = async (req, res) => {
  if (
    req.body.paymentMethod &&
    req.body.paymentMethod !== "pay_at_lawn"
  ) {
    return res.status(400).json({
      message: "For online payments, use the payment order endpoint.",
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const booking = await getBookingData(
      connection,
      req.body,
      req.user.userId
    );

    const bookingId = await insertBooking(connection, booking, {
      paymentMethod: "pay_at_lawn",
      paymentStatus: "unpaid",
    });

    await connection.commit();

    // Return all details used to create the booking
    return res.status(201).json({
      message: "Booking request submitted successfully.",

      booking: {
        id: bookingId,
        userId: booking.userId,
        venueId: booking.venueId,
        packageId: booking.packageId,

        occasion: booking.occasion,
        bookingDate: booking.bookingDate,
        slot: "full-day",
        guests: booking.guests,

        customerName: booking.customerName,
        customerMobile: booking.customerMobile,
        customerEmail: booking.customerEmail,
        customerAddress: booking.customerAddress,
        specialRequests: booking.specialRequests,

        // Price breakdown
        baseAmount: booking.baseAmount,
        extraGuestCount: booking.extraGuestCount,
        extraGuestAmount: booking.extraGuestAmount,
        subtotal: booking.subtotal,
        gstAmount: booking.gstAmount,
        totalAmount: booking.totalAmount,

        // Booking and payment details
        status: "pending",
        paidAmount: 0,
        paymentMethod: "pay_at_lawn",
        paymentStatus: "unpaid",

        // No Razorpay transaction for Pay at Lawn
        razorpayOrderId: null,
        razorpayPaymentId: null,
        razorpaySignature: null,
      },
    });
  } catch (error) {
    await connection.rollback();

    console.error("createBooking error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to create booking.",
    });
  } finally {
    connection.release();
  }
};
/**
 * Get the logged-in customer's bookings.
 */
// Get upcoming or past bookings for the logged-in customer
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const type = req.query.type === "past" ? "past" : "upcoming";

    const dateCondition =
      type === "past"
        ? "b.booking_date < CURDATE()"
        : "b.booking_date >= CURDATE()";

    const [rows] = await pool.execute(
      `SELECT
        b.id,
        b.user_id,
        b.venue_id,
        b.package_id,
        b.occasion,
        b.booking_date,
        b.slot,
        b.guests,

        b.customer_name,
        b.customer_mobile,
        b.customer_email,
        b.customer_address,
        b.special_requests,

        b.base_amount,
        b.extra_guest_count,
        b.extra_guest_amount,
        b.subtotal,
        b.gst_amount,
        b.total_amount,

        b.status,
        b.paid_amount,
        b.payment_method,
        b.payment_status,

        b.razorpay_order_id,
        b.razorpay_payment_id,

        b.created_at,
        b.updated_at,

        v.name AS venue_name,
        p.name AS package_name

      FROM bookings b
      LEFT JOIN venues v ON v.id = b.venue_id
      LEFT JOIN packages p ON p.id = b.package_id

      WHERE b.user_id = ?
        AND ${dateCondition}

      ORDER BY b.booking_date ${type === "past" ? "DESC" : "ASC"
      }, b.created_at DESC`,
      [userId]
    );

    const bookings = rows.map((b) => {
      // MySQL DATE values may be returned as strings or Date objects.
      const date =
        b.booking_date instanceof Date
          ? [
            b.booking_date.getFullYear(),
            String(b.booking_date.getMonth() + 1).padStart(2, "0"),
            String(b.booking_date.getDate()).padStart(2, "0"),
          ].join("-")
          : String(b.booking_date).slice(0, 10);

      return {
        id: Number(b.id),
        bookingId: `DML-${b.id}`,

        // Fields expected by Bookings.tsx
        title: b.venue_name || "Marriage Lawn Booking",
        occasion: b.occasion || "",

        venueId: Number(b.venue_id),
        venueName: b.venue_name || "Venue",

        packageId: Number(b.package_id),
        packageName: b.package_name || "Package",

        bookingDate: date,
        slot: b.slot || "full-day",
        guests: Number(b.guests || 0),

        customerName: b.customer_name || "",
        customerMobile: b.customer_mobile || "",
        customerEmail: b.customer_email || "",
        customerAddress: b.customer_address || "",
        specialRequests: b.special_requests || null,

        baseAmount: Number(b.base_amount || 0),
        extraGuestCount: Number(b.extra_guest_count || 0),
        extraGuestAmount: Number(b.extra_guest_amount || 0),
        subtotal: Number(b.subtotal || 0),
        gstAmount: Number(b.gst_amount || 0),
        totalAmount: Number(b.total_amount || 0),

        paidAmount: Number(b.paid_amount || 0),
        paymentMethod: b.payment_method,
        paymentStatus: b.payment_status,

        status: b.status,
        createdAt: b.created_at,
        updatedAt: b.updated_at,
      };
    });

    return res.status(200).json({
      message: `${type} bookings fetched successfully.`,
      bookings,
    });
  } catch (error) {
    console.error("getMyBookings error:", error);

    return res.status(500).json({
      message: "Failed to fetch bookings.",
    });
  }
};