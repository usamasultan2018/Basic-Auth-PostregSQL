const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables");
        }
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });
    } catch (err) {
        console.error("Error generating token:", err.message);
        return null; 
    }
};

const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in environment variables");
        }
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error("Invalid Token:", err.message);
        return null; 
    }
};

module.exports = { generateToken, verifyToken };
