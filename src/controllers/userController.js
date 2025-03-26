const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../config/cloudinary");


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
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        const userId = req.user.id;
        const file = req.file;

        const { name} = req.body;


        let imageUrl;
        if (file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "auth_profile",
                        public_id: `profile_${userId}`,
                        overwrite: true,
                        transformation: [{ width: 300, height: 300, crop: "fill" }],
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary Upload Error:", error);
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }

                );
                stream.end(file.buffer);

            });
            imageUrl = await uploadPromise;

        }
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                name, profileImage: imageUrl
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


module.exports = { getUserProfile, updateUserProfile };
