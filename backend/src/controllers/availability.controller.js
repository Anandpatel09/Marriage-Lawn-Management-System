import pool from "../config/db.js";

export const getAvailability = async (req, res) => {
  try {
    const { venueId, month, year } = req.query;

    if (!venueId || !month || !year) {
      return res.status(400).json({
        message: "venueId, month and year are required",
      });
    }

    const [bookings] = await pool.execute(
      `
      SELECT
        DATE_FORMAT(booking_date, '%Y-%m-%d') AS booking_date,
        slot,
        status
      FROM bookings
      WHERE venue_id = ?
        AND MONTH(booking_date) = ?
        AND YEAR(booking_date) = ?
        AND status IN ('pending', 'confirmed')
      ORDER BY booking_date ASC
      `,
      [Number(venueId), Number(month), Number(year)],
    );

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Availability error:", error);

    return res.status(500).json({
      message: "Failed to fetch availability",
    });
  }
};
