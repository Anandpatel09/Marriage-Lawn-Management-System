import pool from "../config/db.js";

export const createBooking = async (req, res) => {
    let connection;

    try {
        // ============================================
        // 1. AUTHENTICATED USER
        // ============================================

        const userId = req.user.userId;

        // ============================================
        // 2. GET ALL DATA FROM FRONTEND PAYLOAD
        // ============================================

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
        } = req.body;

        // ============================================
        // 3. VALIDATION
        // ============================================

        if (
            !venueId ||
            !packageId ||
            !occasion ||
            !bookingDate ||
            guests === undefined ||
            guests === null
        ) {
            return res.status(400).json({
                message:
                    "Venue, package, occasion, booking date and guests are required.",
            });
        }

        if (!customerName?.trim()) {
            return res.status(400).json({
                message:
                    "Customer name is required.",
            });
        }

        if (!customerMobile?.trim()) {
            return res.status(400).json({
                message:
                    "Customer mobile is required.",
            });
        }

        if (!customerEmail?.trim()) {
            return res.status(400).json({
                message:
                    "Customer email is required.",
            });
        }

        if (!customerAddress?.trim()) {
            return res.status(400).json({
                message:
                    "Customer address is required.",
            });
        }

        if (Number(guests) <= 0) {
            return res.status(400).json({
                message:
                    "Number of guests must be greater than 0.",
            });
        }

        // ============================================
        // 4. DATABASE CONNECTION
        // ============================================

        connection =
            await pool.getConnection();

        await connection.beginTransaction();

        // ============================================
        // 5. CHECK VENUE EXISTS
        // ============================================

        const [venues] =
            await connection.execute(
                `
                SELECT
                    id,
                    name
                FROM venues
                WHERE id = ?
                LIMIT 1
                `,
                [venueId]
            );

        if (venues.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                message:
                    "Marriage lawn not found.",
            });
        }

        const venue = venues[0];

        // ============================================
        // 6. GET PACKAGE
        // ============================================

        const [packages] =
            await connection.execute(
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
                [packageId]
            );

        if (packages.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                message:
                    "Selected package not found.",
            });
        }

        const selectedPackage =
            packages[0];

        // ============================================
        // 7. CHECK DATE AVAILABILITY
        // ============================================

        const [existingBookings] =
            await connection.execute(
                `
                SELECT
                    id
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
                [
                    venueId,
                    bookingDate,
                ]
            );

        if (
            existingBookings.length > 0
        ) {
            await connection.rollback();

            return res.status(409).json({
                message:
                    "This marriage lawn is already booked for the selected date.",
            });
        }

        // ============================================
        // 8. SERVER-SIDE PRICE CALCULATION
        // ============================================

        const baseAmount =
            Number(
                selectedPackage.base_price
            );

        const includedGuests =
            Number(
                selectedPackage.included_guests
            );

        const extraGuestPrice =
            Number(
                selectedPackage.extra_guest_price
            );

        const guestCount =
            Number(guests);

        const extraGuestCount =
            Math.max(
                0,
                guestCount -
                    includedGuests
            );

        const extraGuestAmount =
            extraGuestCount *
            extraGuestPrice;

        const subtotal =
            baseAmount +
            extraGuestAmount;

        const gstAmount =
            Number(
                (
                    subtotal * 0.18
                ).toFixed(2)
            );

        const totalAmount =
            Number(
                (
                    subtotal +
                    gstAmount
                ).toFixed(2)
            );

        // ============================================
        // 9. INSERT EVERYTHING
        // ============================================

        const [result] =
            await connection.execute(
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
                VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    'full-day',
                    ?,

                    ?,
                    ?,
                    ?,
                    ?,

                    ?,

                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,

                    'pending'
                )
                `,
                [
                    userId,
                    venueId,
                    packageId,
                    occasion,
                    bookingDate,
                    guestCount,

                    customerName.trim(),
                    customerMobile.trim(),
                    customerEmail.trim(),
                    customerAddress.trim(),

                    specialRequests?.trim() ||
                        null,

                    baseAmount,
                    extraGuestCount,
                    extraGuestAmount,
                    subtotal,
                    gstAmount,
                    totalAmount,
                ]
            );

        // ============================================
        // 10. COMMIT
        // ============================================

        await connection.commit();

        // ============================================
        // 11. RESPONSE
        // ============================================

        return res.status(201).json({
            message:
                "Booking request submitted successfully.",

            booking: {
                id:
                    result.insertId,

                userId,

                venueId,

                packageId,

                venueName:
                    venue.name,

                packageName:
                    selectedPackage.name,

                occasion,

                bookingDate,

                guests:
                    guestCount,

                customerName:
                    customerName.trim(),

                customerMobile:
                    customerMobile.trim(),

                customerEmail:
                    customerEmail.trim(),

                customerAddress:
                    customerAddress.trim(),

                specialRequests:
                    specialRequests?.trim() ||
                    null,

                baseAmount,

                extraGuestCount,

                extraGuestAmount,

                subtotal,

                gstAmount,

                totalAmount,

                status:
                    "pending",
            },
        });

    } catch (error) {
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error(
                    "Rollback error:",
                    rollbackError
                );
            }
        }

        console.error(
            "Create booking error:",
            error
        );

        if (
            error.code ===
            "ER_DUP_ENTRY"
        ) {
            return res.status(409).json({
                message:
                    "This marriage lawn is already booked for the selected date.",
            });
        }

        return res.status(500).json({
            message:
                "Failed to create booking.",
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
};