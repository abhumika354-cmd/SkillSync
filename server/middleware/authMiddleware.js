const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {

    console.log("=================================");
    console.log("Authorization Header:", req.headers.authorization);

    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Logged In User:");
    console.log("_id:", user._id);
    console.log("Name:", user.fullName);
    console.log("Email:", user.email);
    console.log("Role:", user.role);
    console.log("Skills:", user.skills);
    console.log("=================================");

    req.user = user;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

module.exports = protect;