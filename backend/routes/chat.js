const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");
const { accessChat, fetchChats } = require("../controllers/chatController");

router.post("/", requireAuth, accessChat);
router.route("/").get(requireAuth, fetchChats);

module.exports = router;
