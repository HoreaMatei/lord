const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    required: true,
    type: String,
    minlength: 6, // Optional: enforce a minimum length
  },

  bestScore: { type: Number, default: null },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
