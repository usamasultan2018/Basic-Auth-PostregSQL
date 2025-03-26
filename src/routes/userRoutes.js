const express = require("express");
const { getUserProfile, updateUserProfile  } = require("../controllers/userController");
const  authMiddleware = require("../middleware/authMiddleware");
const upload  = require("../middleware/upload");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile",authMiddleware, upload.single("profileImage"),updateUserProfile);

module.exports = router;
