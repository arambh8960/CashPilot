import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized or token missing.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Ensure server is configured with a JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment");
      return res.status(500).json({ success: false, message: "Server misconfiguration." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password -otp");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // FIX: Block unverified users from protected routes
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before continuing.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired.",
    });
  }
}