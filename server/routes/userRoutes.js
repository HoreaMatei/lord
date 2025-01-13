const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const {
  getUsers,
  createUser,
  loginUser,
  updateBestScore,
  getBestScore,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser); // For creating a new user
router.post("/login", loginUser);
router.get("/best-score", authMiddleware, getBestScore);
router.put("/best-score", authMiddleware, updateBestScore);

module.exports = router;
