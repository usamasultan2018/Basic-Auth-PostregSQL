const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getUserProfile = async (req, res) => {
    try { 
        const userId = req.user.id;  
        
        const user = await User.findById(userId).select("username email");
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json({
            message: "User profile fetched successfully",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } 
    catch (err) {
        console.error("Error getting user profile:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};

module.exports = { getUserProfile };
