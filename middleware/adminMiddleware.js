const adminOnly = (req, res, next) => {

  console.log("========== ADMIN MIDDLEWARE ==========");
  console.log("User Object:", req.user);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "No User Found",
    });
  }

  console.log("User Role:", req.user.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access Denied. Admin Only",
    });
  }

  next();
};

module.exports = adminOnly;