const pool = require("../config/db");

// ✅ Owner adds a car
const addCar = async (req, res) => {
  try {
    // Check authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required. Please login first." });
    }

    const { car_name, location, price_per_km } = req.body;

    // Validate required fields
    if (!car_name || !location || !price_per_km) {
      return res.status(400).json({ error: "Car name, location, and price per km are required" });
    }

    // Validate file
    if (!req.file) {
      return res.status(400).json({ error: "Car image is required" });
    }

    const image = req.file.filename;

    const newCar = await pool.query(
      `INSERT INTO cars (owner_id, car_name, location, price_per_km, car_image)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [
        req.user.id,
        car_name,
        location,
        price_per_km,
        image
      ]
    );

    res.json(newCar.rows[0]);

  } catch (err) {
    console.error("Error in addCar:", err);
    res.status(500).json({ error: err.message || "Failed to add car" });
  }
};

const getAllCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addCar, getAllCars };