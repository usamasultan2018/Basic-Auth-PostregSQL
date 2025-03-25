const express = require("express");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const authRoutes = require("./routes/authRoutes"); // Fixed path

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes); 

// Test route
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Hello World" });
});

module.exports = app;
