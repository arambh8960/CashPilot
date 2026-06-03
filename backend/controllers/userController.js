import User from "../models/userModels.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOtpEmail } from "../utils/emailService.js";

// FIX: JWT_SECRET from env — not hardcoded
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "24h",
  });
};

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// ─── Register (step 1: send OTP) ────────────────────────────────────────────
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ success: false, message: "Password must be at least 8 characters." });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase().trim() });

    // FIX: if already exists and verified, reject
    if (existing && existing.isVerified) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existing && !existing.isVerified) {
      // Resend OTP to existing unverified account
      existing.password = hashedPassword;
      existing.name = name.trim();
      existing.otp = { code: otp, expiresAt: otpExpiresAt };
      await existing.save();
    } else {
      await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        isVerified: false,
        otp: { code: otp, expiresAt: otpExpiresAt },
      });
    }
    console.log("Generated OTP:", otp);

    // FIX: Removed 'await' so email sends in the background, making response instant
    sendOtpEmail(email, otp).catch((error) => {
      console.error("Background OTP Email Delivery Error:", error);
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Verify OTP (step 2: confirm email) ─────────────────────────────────────
export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (!user.otp?.code || !user.otp?.expiresAt) {
      return res.status(400).json({ success: false, message: "No OTP found. Please register again." });
    }

    if (new Date() > user.otp.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please register again." });
    }

    if (user.otp.code !== otp.toString()) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Mark verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Resend OTP ──────────────────────────────────────────────────────────────
export async function resendOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified." });
    }

    const otp = generateOtp();
    user.otp = { code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
    await user.save();

    // FIX: Removed 'await' so resending OTP doesn't hang the UI
    sendOtpEmail(email, otp).catch((error) => {
      console.error("Background Resend OTP Email Delivery Error:", error);
    });

    return res.status(200).json({ success: true, message: "OTP resent successfully." });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Login ───────────────────────────────────────────────────────────────────
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Both fields are required." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // FIX: Block unverified users from logging in
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first.",
        needsVerification: true,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Get current user ────────────────────────────────────────────────────────
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("name email createdAt");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Update profile ──────────────────────────────────────────────────────────
export async function updateProfile(req, res) {
  const { name, email } = req.body;

  if (!name || !email || !validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Valid name and email are required." });
  }

  try {
    const exists = await User.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: req.user.id },
    });

    if (exists) {
      return res.status(409).json({ success: false, message: "Email already in use." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: name.trim(), email: email.toLowerCase().trim() },
      { new: true, runValidators: true }
    ).select("name email");

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}

// ─── Update password ─────────────────────────────────────────────────────────
export async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ success: false, message: "Password invalid or too short." });
  }

  try {
    const user = await User.findById(req.user.id).select("password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
}