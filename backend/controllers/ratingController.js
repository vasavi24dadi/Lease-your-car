const pool = require("../config/db");

// Add rating/review
exports.addRating = async (req, res) => {
  const { booking_id, rating, review } = req.body;
  const user_id = req.user.id;

  try {
    const validRating = parseInt(rating);
    if (validRating < 1 || validRating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const result = await pool.query(
      `INSERT INTO ratings (booking_id, user_id, rating, review, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (booking_id, user_id) 
       DO UPDATE SET rating = $3, review = $4, created_at = NOW()
       RETURNING *`,
      [booking_id, user_id, validRating, review || ""]
    );

    res.json({
      message: "Rating added successfully",
      data: result.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add rating" });
  }
};

// Get ratings for a car
exports.getCarRatings = async (req, res) => {
  const { car_id } = req.params;

  try {
    const ratings = await pool.query(
      `SELECT r.*, u.name as reviewer_name, b.car_id
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN bookings b ON r.booking_id = b.id
       WHERE b.car_id = $1
       ORDER BY r.created_at DESC`,
      [car_id]
    );

    const averageRating = await pool.query(
      `SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings
       FROM ratings r
       JOIN bookings b ON r.booking_id = b.id
       WHERE b.car_id = $1`,
      [car_id]
    );

    res.json({
      ratings: ratings.rows,
      averageRating: averageRating.rows[0].average_rating || 0,
      totalRatings: averageRating.rows[0].total_ratings || 0
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

// Get rating for a specific booking
exports.getBookingRating = async (req, res) => {
  const { booking_id } = req.params;

  try {
    const rating = await pool.query(
      `SELECT * FROM ratings WHERE booking_id = $1`,
      [booking_id]
    );

    res.json(rating.rows[0] || null);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};
