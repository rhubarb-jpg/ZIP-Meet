const express = require("express");
const router = express.Router();

const {
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  createUser,
  loginUser,
  resetPassword,
} = require("../controllers/userController.js");
const { requireAuth } = require("../middleware/requireAuth");

// router.get("/", (req, res) => {
//   res.json({ msg: "Get all" });
// });
// delete user
router.delete("/:id", requireAuth, deleteUser);

// update user info
router.patch("/:id", requireAuth, updateUser);

// return one user
router.get("/:id", requireAuth, getUser);

// register user
router.post("/signup", createUser);

// login user
router.post("/login", loginUser);

router.get("/", requireAuth, getAllUsers);

module.exports = router;
