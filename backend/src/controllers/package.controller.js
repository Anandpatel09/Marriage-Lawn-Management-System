import pool from "../config/db.js";

export const getPackages = async (req, res) => {
  try {
    const [packages] = await pool.execute(
      `
      SELECT
        id,
        name,
        description,
        base_price,
        included_guests,
        extra_guest_price
      FROM packages
      WHERE active = TRUE
      ORDER BY id ASC
      `,
    );

    return res.status(200).json({
      packages,
    });
  } catch (error) {
    console.error("Get packages error:", error);

    return res.status(500).json({
      message: "Failed to fetch packages",
    });
  }
};
