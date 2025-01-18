const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors({ origin: PORT }));

connectDB();

app.use(express.json()); // To parse incoming JSON requests

// Make sure the route is correctly defined
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
