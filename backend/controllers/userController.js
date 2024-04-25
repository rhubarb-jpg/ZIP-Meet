const User = require("../models/user.model.js");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const zipcodes = require("zipcodes");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// creating new user
const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    pics,
    zipcode,
    dob,
    gender,
    interest,
    hobbies,
  } = req.body;
  // add to database
  try {
    const user = await User.signUp(
      username,
      email,
      password,
      pics,
      zipcode,
      dob,
      gender,
      interest,
      hobbies
    );
    const token = createToken(user._id);
    var _id = user._id;
    res.status(200).json({
      email,
      token,
      _id,
      username,
      pics,
      zipcode,
      dob,
      gender,
      interest,
      hobbies,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    var _id = user._id;

    res.status(200).json({
      token,
      _id,
      username: user.username,
      pics: user.pics,
      zipcode: user.zipcode,
      age: user.age,
      gender: user.gender,
      interest: user.interest,
      hobbies: user.hobbies,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//single user
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }
  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  // USER EXISTS
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }
  // USER EXISTS
  // UPDATE PASSWORD
  const { password, newPassword } = req.body;
  if (password) {
    const u = await User.findById({ _id: id });
    const match = await bcrypt.compare(password, u.password);

    if (!match) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (!validator.isStrongPassword(newPassword)) {
      return res
        .status(400)
        .json({ error: "New password is not strong enough." });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hash,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    return res.status(200).json(user);
  }
  //UPDATE PICS
  const { pics, newPics} = req.body;
  if (pics) {
    const u = await User.findById({ _id: id });
    const match = await bcrypt.compare(pics, u.pics);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPics, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        pics: hash,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    return res.status(200).json(user);
  }

  // UPDATE PASSWORD
  // UPDATE EMAIL
  const { email } = req.body;
  if (email) {
    const uEmail = User.findOne({ email: email });
    if (!validator.isEmail(email)) {
      return res.status(404).json({ error: "Email is not valid" });
    }
    if (uEmail) {
      return res.status(404).json({ error: "Email is in use" });
    }
  }
  // UPDATE EMAIL

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ error: "User does not exist" });
  }
  return res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find(
    { _id: { $ne: req.user._id } },
    {
      zipcode: 1,
      username: 1,
      pics: 1,
      gender: 1,
      interest: 1,
      age: 1,
      hobbies: 1,
    }
  ); // does not return current user
  const currentUser = await User.findOne(
    { _id: req.user._id },
    { zipcode: 1, gender: 1, interest: 1 }
  );
  const zip = currentUser.returnZip();
  nearByZips = zipCodeLocator(zip);

  var matches = [];

  users.forEach((user) => {
    const userZip = user.returnZip();
    if (nearByZips.includes(userZip)) {
      if (
        currentUser.gender == user.interest &&
        currentUser.interest == user.gender
      ) {
        matches.push(user);
      }
    }
  });
  return res.status(200).json(matches);
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
};

function zipCodeLocator(str) {
  const zipCode = parseInt(str); // logged in users zipcode

  var rad = zipcodes.radius(zipCode, 10);
  return rad;
}

