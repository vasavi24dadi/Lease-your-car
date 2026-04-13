const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "lease_your_car_secret";
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // 0️⃣ Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        error: "All fields (name, email, phone, password) are required" 
      });
    }

    // 1️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2️⃣ insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, phone, role, created_at`,
      [name, email, phone, hashedPassword, role || "customer"]
    );

    const user = result.rows[0];

    // 3️⃣ create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      userId: user.id,
      role: user.role,
      user: user
    });

  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // 2️⃣ compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3️⃣ success
    // 3️⃣ create token
const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  JWT_SECRET,
  { expiresIn: "1d" }
);

// 4️⃣ send response
res.json({
  message: "Login successful",
  token: token,
  userId: user.id,
  role: user.role,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };