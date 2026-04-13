const pool = require("../config/db");

// Send message
exports.sendMessage = async (req, res) => {
  const { booking_id, receiver_id, message } = req.body;
  const sender_id = req.user.id;

  try {
    const msg = await pool.query(
      `INSERT INTO messages (booking_id, sender_id, receiver_id, message_text, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [booking_id, sender_id, receiver_id, message]
    );

    res.json({
      message: "Message sent successfully",
      data: msg.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get chat messages between users
exports.getMessages = async (req, res) => {
  const { booking_id } = req.params;
  const user_id = req.user.id;

  try {
    const messages = await pool.query(
      `SELECT m.*, 
              u1.name as sender_name,
              u2.name as receiver_name
       FROM messages m
       JOIN users u1 ON m.sender_id = u1.id
       JOIN users u2 ON m.receiver_id = u2.id
       WHERE m.booking_id = $1
       ORDER BY m.created_at ASC`,
      [booking_id]
    );

    res.json(messages.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Get all conversations for a user
exports.getConversations = async (req, res) => {
  const user_id = req.user.id;

  try {
    const conversations = await pool.query(
      `SELECT DISTINCT ON (
        CASE 
          WHEN sender_id = $1 THEN receiver_id 
          ELSE sender_id 
        END)
        booking_id,
        CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END as other_user_id,
        u.name as other_user_name,
        message_text as last_message,
        m.created_at
       FROM messages m
       JOIN users u ON (
         CASE WHEN sender_id = $1 THEN receiver_id = u.id 
              ELSE sender_id = u.id 
         END)
       WHERE sender_id = $1 OR receiver_id = $1
       ORDER BY CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END, m.created_at DESC`,
      [user_id]
    );

    res.json(conversations.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};
