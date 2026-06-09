import React, { useState } from "react";
import { loginStyles } from "../assets/dummyStyles";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // basic client-side validation
    if (!email.trim() || !password) {
      setError("Both fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/user/login`, { email, password });
      const { token, user } = res.data;

      // save to correct storage based on rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));

      if (typeof onLogin === "function") {
        onLogin(user, rememberMe, token);
      } else {
        navigate("/");
      }
    } catch (err) {
      const data = err.response?.data;

      // FIX: handle unverified user — redirect to OTP page with email prefilled
      if (data?.needsVerification) {
        navigate("/verify-otp", { state: { email } });
        return;
      }

      setError(data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={{ ...styles.blob, top: -80, left: -80, background: "rgba(99,102,241,.12)" }} />
      <div style={{ ...styles.blob, bottom: -60, right: -60, background: "rgba(16,185,129,.10)", width: 300, height: 300 }} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerArea}>
          <div style={styles.avatarCircle}>
            <User size={28} color="#fff" />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your CashPilot account</p>
        </div>

        {/* Error message */}
        {error && (
          <div style={styles.apiError}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0 }}>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <div style={styles.inputWrap}>
              <Mail size={17} style={styles.inputIcon} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                style={styles.input}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <Lock size={17} style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●●●"
                style={{ ...styles.input, paddingRight: 42 }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          {/* FIX: removed `required` from checkbox — it was wrong */}
          <label style={styles.checkRow}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: "#6366f1", width: 15, height: 15 }}
            />
            <span style={{ fontSize: 13, color: "#6b7280" }}>Remember Me</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            style={{ ...styles.btn, ...(isLoading ? styles.btnDisabled : {}) }}
          >
            {isLoading ? <Spinner text="Signing in..." /> : "Sign In"}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Create One</Link>
        </p>
      </div>
    </div>
  );
};

// ─── Spinner ─────────────────────────────────────────────────────────────────
const Spinner = ({ text }) => (
  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
    <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }}
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25" />
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity=".75" />
    </svg>
    {text}
  </span>
);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 20, position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" },
  blob: { position: "absolute", width: 400, height: 400, borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" },
  card: { background: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 4px 40px rgba(0,0,0,.08)", position: "relative" },
  headerArea: { textAlign: "center", marginBottom: 28 },
  avatarCircle: { width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  title: { fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 6px" },
  subtitle: { fontSize: 13.5, color: "#6b7280", margin: 0 },
  field: { marginBottom: 20 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: 13, color: "#9ca3af", pointerEvents: "none" },
  input: { width: "100%", padding: "11px 14px 11px 40px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", transition: "border .2s, box-shadow .2s", fontFamily: "inherit" },
  eyeBtn: { position: "absolute", right: 13, background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center" },
  apiError: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 },
  checkRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 20, cursor: "pointer" },
  btn: { width: "100%", padding: "12px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "opacity .2s", fontFamily: "inherit" },
  btnDisabled: { opacity: 0.65, cursor: "not-allowed" },
  footerText: { textAlign: "center", fontSize: 13.5, color: "#6b7280", marginTop: 20 },
  link: { color: "#6366f1", fontWeight: 600, textDecoration: "none" },
};



export default Login;
