const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, getConversations } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/send", authMiddleware, sendMessage);
router.get("/:booking_id", authMiddleware, getMessages);
router.get("/user/conversations", authMiddleware, getConversations);

module.exports = router;
