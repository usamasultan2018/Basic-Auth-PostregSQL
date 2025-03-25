const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({ name, email, password });

        // Generate token
        const token = generateToken(user.id);

        return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (err) {
        console.error("Error registering user:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user.id);

        return res.status(StatusCodes.OK).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (err) {
        console.error("Error logging in user:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
