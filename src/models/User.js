const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"]
  },
  profileImage: {
    type: String, // URL or file path of the image
    default: null,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
