import pool from "../config/db.js";

export const getVenues = async (req, res) => {
  try {
    const [venues] = await pool.execute(
      `
      SELECT
        id,
        name,
        description,
        capacity
      FROM venues
      ORDER BY id ASC
      `,
    );

    return res.status(200).json({
      venues,
    });
  } catch (error) {
    console.error("Get venues error:", error);

    return res.status(500).json({
      message: "Failed to fetch venues",
    });
  }
};
