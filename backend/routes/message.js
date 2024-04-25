const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const {
  sendMessage,
  fetchMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(requireAuth, sendMessage);
router.route("/:chatId").get(requireAuth, fetchMessages);

module.exports = router;
