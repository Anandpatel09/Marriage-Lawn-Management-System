import pool from "../config/db.js";

export const getAvailability = async (
    req,
    res
) => {
    try {
        const {
            venueId,
            month,
            year,
        } = req.query;

        // ----------------------------------------
        // VALIDATION
        // ----------------------------------------

        if (
            !venueId ||
            !month ||
            !year
        ) {
            return res.status(400).json({
                message:
                    "venueId, month and year are required.",
            });
        }

        const numericVenueId =
            Number(venueId);

        const numericMonth =
            Number(month);

        const numericYear =
            Number(year);

        if (
            Number.isNaN(
                numericVenueId
            ) ||
            numericMonth < 1 ||
            numericMonth > 12 ||
            numericYear < 2000
        ) {
            return res.status(400).json({
                message:
                    "Invalid availability parameters.",
            });
        }

        // ----------------------------------------
        // GET BOOKINGS
        // ----------------------------------------

        const [bookings] =
            await pool.execute(
                `
                SELECT
                    id,
                    DATE_FORMAT(
                        booking_date,
                        '%Y-%m-%d'
                    ) AS booking_date,
                    slot,
                    status
                FROM bookings
                WHERE venue_id = ?
                  AND MONTH(booking_date) = ?
                  AND YEAR(booking_date) = ?
                  AND status IN (
                      'pending',
                      'confirmed'
                  )
                ORDER BY booking_date ASC
                `,
                [
                    numericVenueId,
                    numericMonth,
                    numericYear,
                ]
            );

        return res.status(200).json({
            venueId:
                numericVenueId,

            month:
                numericMonth,

            year:
                numericYear,

            bookings,
        });

    } catch (error) {
        console.error(
            "Availability error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch availability.",
        });
    }
};