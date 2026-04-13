const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 protected route (NEW)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

module.exports = router;
