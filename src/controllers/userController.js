const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }

        res.status(StatusCodes.OK).json({
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error.",
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                username, email
            },
            {
                new: true,
                runValidators: true,
              
            },
        ).select("-password");;
        if (!updatedUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
            });
        }
        res.status(StatusCodes.OK).json({
            message: "User profile updated successfully",
            user: updatedUser,
        });

    }
    catch (error) {
        console.error("PUT Updating Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error.",
        });
    }
}


module.exports = { getUserProfile,updateUserProfile  };
