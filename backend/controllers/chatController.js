const Chat = require("../models/chatModel");
const User = require("../models/user.model");

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // current user
      { users: { $elemMatch: { $eq: userId } } }, // user the current user wants to message
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage",
    select: "username pic email",
  });
  var user = await User.findById(userId);
  var user2 = await User.findById(req.user._id);
  // chat already exists, return chat information and do not create a new one
  if (isChat.length > 0) {
    res.send(isChat[0]);
    return;
  } else {
    var chatInfo = {
      users: [req.user._id, userId],
    };
  }

  try {
    const createChat = await Chat.create(chatInfo);

    const chat = await Chat.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(chat);
  } catch (error) {
    res.status(400);
    throw Error(error.message);
  }
};

const fetchChats = async (req, res) => {
  try {
    // find chats by matching the ID of the user currently logged in, then send
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 }) // sort from most recent chat to oldest
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "username pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { accessChat, fetchChats };
