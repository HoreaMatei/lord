const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.log("Error connectig to database", e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
