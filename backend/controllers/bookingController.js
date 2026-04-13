const pool = require("../config/db");

// =============================
// BOOK A CAR
// =============================
exports.bookCar = async (req, res) => {
  const { car_id, start_date, start_time, end_date, end_time, distance } = req.body;

  try {
    // Validate inputs
    if (!car_id || !start_date || !start_time || !end_date || !end_time || !distance) {
      return res.status(400).json({
        message: "All fields (car_id, start_date, start_time, end_date, end_time, distance) are required"
      });
    }

    // Get car details including price_per_km
    const carDetails = await pool.query(
      `SELECT id, owner_id, car_name, price_per_km FROM cars WHERE id = $1`,
      [car_id]
    );

    if (carDetails.rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    const car = carDetails.rows[0];
    const price_per_km = car.price_per_km;
    const total_price = distance * price_per_km;

    // Check booking conflict - check if car is available in the time slot
    const conflict = await pool.query(
      `SELECT * FROM bookings
       WHERE car_id = $1
       AND status != 'rejected'
       AND (
         (start_date = $2 AND (start_time, end_time) OVERLAPS ($3::time, $4::time))
         OR (start_date < $2 AND end_date > $2)
         OR (start_date = $5 AND (start_time, end_time) OVERLAPS ($3::time, $4::time))
         OR (start_date < $5 AND end_date > $5)
       )`,
      [car_id, start_date, start_time, end_time, end_date]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({
        message: "Car not available in this time slot"
      });
    }

    // Insert booking with distance and calculated total price
    const booking = await pool.query(
      `INSERT INTO bookings
      (user_id, car_id, start_date, start_time, end_date, end_time, distance, price_per_km, total_price, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        req.user.id,
        car_id,
        start_date,
        start_time,
        end_date,
        end_time,
        distance,
        price_per_km,
        total_price,
        "pending"
      ]
    );

    // Get customer name
    const customer = await pool.query(
      `SELECT name FROM users WHERE id = $1`,
      [req.user.id]
    );
    const customer_name = customer.rows[0].name;

    // Save notification to database
    await pool.query(
      `INSERT INTO notifications (owner_id, booking_id, message, is_read)
       VALUES ($1, $2, $3, $4)`,
      [
        car.owner_id,
        booking.rows[0].id,
        `New booking from ${customer_name} for ${car.car_name}`,
        false
      ]
    );

    // Emit real-time notification via Socket.io
    req.io.to(`user-${car.owner_id}`).emit("new-booking", {
      booking_id: booking.rows[0].id,
      car_name: car.car_name,
      customer_name: customer_name,
      start_date: start_date,
      start_time: start_time,
      end_date: end_date,
      end_time: end_time,
      distance: distance,
      total_price: total_price,
      message: `New booking from ${customer_name} for ${car.car_name}`
    });

    res.json({
      message: "Booking successful",
      booking: booking.rows[0]
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Booking failed" });

  }
};


// =============================
// GET USER BOOKINGS
// =============================
exports.getMyBookings = async (req, res) => {

  try {

    const bookings = await pool.query(
      `SELECT b.*, c.car_name, c.location
       FROM bookings b
       JOIN cars c ON b.car_id = c.id
       WHERE b.user_id = $1`,
      [req.user.id]
    );

    res.json(bookings.rows);

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Failed to fetch bookings" });

  }

};


// =============================
// OWNER VIEW BOOKINGS
// =============================
exports.getBookingsForMyCars = async (req, res) => {

  try {

    const bookings = await pool.query(
      `SELECT b.*, u.name AS customer_name, c.car_name
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN cars c ON b.car_id = c.id
       WHERE c.owner_id = $1`,
      [req.user.id]
    );

    res.json(bookings.rows);

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Failed to fetch owner bookings" });

  }

};


// =============================
// APPROVE BOOKING (OWNER)
// =============================
exports.approveBooking = async (req, res) => {

  const { booking_id } = req.params;

  try {
    // Get booking details
    const booking = await pool.query(
      `SELECT b.*, c.car_name, u.name AS customer_name
       FROM bookings b
       JOIN cars c ON b.car_id = c.id
       JOIN users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [booking_id]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const bookingData = booking.rows[0];
    const customer_id = bookingData.user_id;
    const car_name = bookingData.car_name;
    const customer_name = bookingData.customer_name;

    // Update booking status
    await pool.query(
      `UPDATE bookings
       SET status = 'approved'
       WHERE id = $1`,
      [booking_id]
    );

    // Send notification to customer via Socket.io
    req.io.to(`user-${customer_id}`).emit("booking-approved", {
      booking_id: booking_id,
      car_name: car_name,
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      message: `Your booking for ${car_name} has been approved! ✅`
    });

    res.json({
      message: "Booking approved",
      notification_sent_to: customer_id
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Approval failed" });

  }

};


// =============================
// REJECT BOOKING
// =============================
exports.rejectBooking = async (req, res) => {

  const { booking_id } = req.params;

  try {
    // Get booking details
    const booking = await pool.query(
      `SELECT b.*, c.car_name, u.name AS customer_name
       FROM bookings b
       JOIN cars c ON b.car_id = c.id
       JOIN users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [booking_id]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const bookingData = booking.rows[0];
    const customer_id = bookingData.user_id;
    const car_name = bookingData.car_name;
    const customer_name = bookingData.customer_name;

    // Update booking status
    await pool.query(
      `UPDATE bookings
       SET status = 'rejected'
       WHERE id = $1`,
      [booking_id]
    );

    // Send notification to customer via Socket.io
    req.io.to(`user-${customer_id}`).emit("booking-rejected", {
      booking_id: booking_id,
      car_name: car_name,
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      message: `Your booking for ${car_name} has been rejected ❌`
    });

    res.json({
      message: "Booking rejected",
      notification_sent_to: customer_id
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Rejection failed" });

  }

};

// =============================
// GET OWNER NOTIFICATIONS
// =============================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await pool.query(
      `SELECT n.*, b.car_id, c.car_name, u.name AS customer_name
       FROM notifications n
       JOIN bookings b ON n.booking_id = b.id
       JOIN cars c ON b.car_id = c.id
       JOIN users u ON b.user_id = u.id
       WHERE n.owner_id = $1
       ORDER BY n.created_at DESC
       LIMIT 20`,
      [req.user.id]
    );

    res.json(notifications.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// =============================
// MARK NOTIFICATION AS READ
// =============================
exports.markNotificationRead = async (req, res) => {
  try {
    const { notification_id } = req.params;

    await pool.query(
      `UPDATE notifications
       SET is_read = true
       WHERE id = $1`,
      [notification_id]
    );

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update notification" });
  }
};


// =============================
// UPDATE BOOKING STATUS
// =============================
exports.updateBookingStatus = async (req, res) => {

  const { bookingId } = req.params;
  const { status } = req.body;

  try {

    const validStatuses = ["pending", "approved", "rejected", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status"
      });
    }

    const booking = await pool.query(
      `UPDATE bookings
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, bookingId]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({
        error: "Booking not found"
      });
    }

    res.json({
      message: "Booking status updated",
      booking: booking.rows[0]
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Status update failed" });

  }

};