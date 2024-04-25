const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/user.model");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid request");
    return res.status(404).json({ error: "Invalid request" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "username pics");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username pics email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username pics email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, fetchMessages };
