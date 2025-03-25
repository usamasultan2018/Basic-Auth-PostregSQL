const express = require("express");
const {getUserProfile} = require("../controllers/userController");
const {authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();


// Route to get user profile (Protected route)
router.get("/profile", authMiddleware, getUserProfile);

// Export the router
module.exports = router;

