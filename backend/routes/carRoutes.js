const express = require("express");
const router = express.Router();
const { addCar, getAllCars } = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
// add car (only logged-in users)
router.post("/add", authMiddleware, upload.single("car_image"), addCar);

// get all cars (anyone)
router.get("/", getAllCars);

module.exports = router;
