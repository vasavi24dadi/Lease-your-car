const express = require("express");
const router = express.Router();

const {
  bookCar,
  getMyBookings,
  getBookingsForMyCars,
  updateBookingStatus,
  approveBooking,
  rejectBooking,
  getNotifications,
  markNotificationRead
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

// user books car
router.post("/", authMiddleware, bookCar);

// user sees own bookings
router.get("/", authMiddleware, getMyBookings);

// owner sees bookings for his cars
router.get("/owner", authMiddleware, getBookingsForMyCars);

// owner updates booking status (old endpoint)
router.put("/:bookingId/status", authMiddleware, updateBookingStatus);

// owner approves booking
router.put("/:booking_id/approve", authMiddleware, approveBooking);

// owner rejects booking
router.put("/:booking_id/reject", authMiddleware, rejectBooking);

// get owner notifications
router.get("/notifications/list", authMiddleware, getNotifications);

// mark notification as read
router.put("/notifications/:notification_id/read", authMiddleware, markNotificationRead);

module.exports = router;
