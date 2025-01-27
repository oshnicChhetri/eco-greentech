import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unathorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodes the token via secret code "JWT Secret"

    if (!decoded) {
      return res.status(401).json({ error: "Unathorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // select - password sends every user data except password

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware protect route:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.userRole == "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Acess denied - Admin only" });
  }
};
