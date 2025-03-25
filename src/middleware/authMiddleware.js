const { generateToken, verifyToken } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {

    try {
        // Content - Type: application / json
        // Authorization: Bearer YOUR_ACCESS_TOKEN
        // Accept: application / json


        const authHeader = req.header("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access denied. No token provided." });
            return;
        }

        // Extract the token (remove 'Bearer ' prefix)
        //  Bearer YOUR_ACCESS_TOKEN
        const token = authHeader.split(" ")[1];

        //verfy the token

        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid or expired token." });
            return;
        }
        // Attach user data to request object
        req.user = decoded;
        // Proceed to next middleware/controller
        next();
    }
    catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized access." });
    }
}

module.exports = authMiddleware;