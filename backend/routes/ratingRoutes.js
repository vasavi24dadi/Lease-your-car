const express = require("express");
const router = express.Router();
const { addRating, getCarRatings, getBookingRating } = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addRating);
router.get("/car/:car_id", getCarRatings);
router.get("/:booking_id", getBookingRating);

module.exports = router;
