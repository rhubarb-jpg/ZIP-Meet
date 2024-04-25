const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pics: [
      {
        type: String,
        required: true,
      },
    ],
    zipcode: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    hobbies: [
      {
        type: String,
      },
    ],
    matches: [
      {
        type: String,
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// static sign up function
userSchema.statics.signUp = async function (
  username,
  email,
  password,
  pics,
  zipcode,
  dob,
  gender,
  interest,
  hobbies
) {
  // validation
  if (
    !email ||
    !password ||
    !username ||
    !pics ||
    !zipcode ||
    !dob ||
    !gender ||
    !interest ||
    !hobbies
  ) {
    throw Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email is in use");
  }
  const ageCheck = getAge(dob);
  if (ageCheck < 18) {
    throw Error("Must be at least 18 years old to sign up");
  }
  const age = ageCheck.toString();
  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    pics,
    zipcode,
    dob,
    gender,
    interest,
    age,
    hobbies,
  });
  return user;
};

// static login function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
// zip return
userSchema.methods.returnZip = function () {
  return this.zipcode;
};
const User = mongoose.model("User", userSchema);
module.exports = User;

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
