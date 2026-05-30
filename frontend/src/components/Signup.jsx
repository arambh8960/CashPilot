import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ─── Validation ──────────────────────────────────────────────────────────────
const validate = ({ name, email, password, confirmPassword }) => {
  const e = {};

  if (!name.trim()) e.name = "Name is required.";

  if (!email.trim()) e.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email))
    e.email = "Enter a valid email address.";

  if (!password) e.password = "Password is required.";
  else if (password.length < 8)
    e.password = "Password must be at least 8 characters.";

  if (!confirmPassword) e.confirmPassword = "Please confirm your password.";
  else if (password !== confirmPassword)
    e.confirmPassword = "Passwords do not match.";

  return e;
};

// ─── Shared Field Component ─────────────────────────────────────────────────
const Field = ({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  right,
}) => (
  <div style={{ marginBottom: 20 }}>
    <label htmlFor={id} style={styles.label}>
      {label}
    </label>

    <div style={styles.inputWrap}>
      <Icon size={17} style={styles.inputIcon} />

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {}),
        }}
      />

      {right}
    </div>

    {error && <p style={styles.fieldErr}>{error}</p>}
  </div>
);

// ─── Step Indicator ─────────────────────────────────────────────────────────
const Steps = ({ current }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
      marginBottom: 32,
    }}
  >
    {["Details", "Verify"].map((label, i) => {
      const done = i < current;
      const active = i === current;

      return (
        <React.Fragment key={label}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: done
                  ? "#10b981"
                  : active
                  ? "#6366f1"
                  : "#e5e7eb",
                color: done || active ? "#fff" : "#9ca3af",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {done ? <CheckCircle size={16} /> : i + 1}
            </div>

            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: active
                  ? "#6366f1"
                  : done
                  ? "#10b981"
                  : "#9ca3af",
              }}
            >
              {label}
            </span>
          </div>

          {i < 1 && (
            <div
              style={{
                width: 64,
                height: 2,
                background: done ? "#10b981" : "#e5e7eb",
                margin: "0 8px",
                marginBottom: 20,
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────
const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  // ─── Register ────────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();

    setApiError("");
    setSuccessMsg("");

    const errs = validate({ name, email, password, confirmPassword });

    setErrors(errs);

    if (Object.keys(errs).length) return;

    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/user/register`, {
        name,
        email,
        password,
      });

      setStep(1);
      startResendCooldown();
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Verify OTP ──────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setApiError("");

    const code = otp.join("");

    if (code.length < 6) {
      setApiError("Please enter the full 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/user/verify-otp`, {
        email,
        otp: code,
      });

      const { token, user } = res.data;

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));

      if (typeof onSignup === "function") {
        onSignup(user, rememberMe, token);
      } else {
        navigate("/");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Invalid or expired OTP."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Resend OTP ──────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setApiError("");
    setSuccessMsg("");

    try {
      await axios.post(`${API_URL}/user/resend-otp`, { email });

      setSuccessMsg("New OTP sent to your email!");

      setOtp(["", "", "", "", "", ""]);

      startResendCooldown();
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Could not resend OTP."
      );
    }
  };

  const startResendCooldown = () => {
    setResendCooldown(60);

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  // ─── OTP Handling ────────────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...otp];

    next[index] = value.slice(-1);

    setOtp(next);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      document.getElementById("otp-5")?.focus();
    }
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.blob,
          top: -80,
          left: -80,
          background: "rgba(99,102,241,.12)",
        }}
      />

      <div
        style={{
          ...styles.blob,
          bottom: -60,
          right: -60,
          background: "rgba(16,185,129,.10)",
          width: 300,
          height: 300,
        }}
      />

      <div style={styles.card}>
        <button
          onClick={() => (step === 0 ? navigate(-1) : setStep(0))}
          style={styles.backBtn}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={styles.headerArea}>
          <div style={styles.avatarCircle}>
            <User size={28} color="#fff" />
          </div>

          <h1 style={styles.title}>
            {step === 0 ? "Create Account" : "Verify Email"}
          </h1>

          <p style={styles.subtitle}>
            {step === 0
              ? "Join ExpenseTracker to manage your finances"
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        <Steps current={step} />

        {apiError && (
          <div style={styles.apiError}>{apiError}</div>
        )}

        {successMsg && (
          <div style={styles.successBox}>{successMsg}</div>
        )}

        {step === 0 && (
          <form onSubmit={handleRegister} noValidate>
            <Field
              id="name"
              label="Full Name"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="John Doe"
            />

            <Field
              id="email"
              label="Email Address"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />

            <Field
              id="password"
              label="Password"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Min. 8 characters"
              right={
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              }
            />

            <Field
              id="confirmPassword"
              label="Confirm Password"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="Re-enter password"
              right={
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              }
            />

            <label style={styles.checkRow}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                style={{
                  accentColor: "#6366f1",
                  width: 15,
                  height: 15,
                }}
              />

              <span
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                Remember me
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.btn,
                ...(isLoading
                  ? styles.btnDisabled
                  : {}),
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                "Create Account"
              )}
            </button>

            <p style={styles.footerText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Sign in
              </Link>
            </p>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleVerifyOtp} noValidate>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(i, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(i, e)
                  }
                  onPaste={
                    i === 0 ? handleOtpPaste : undefined
                  }
                  style={{
                    ...styles.otpBox,
                    borderColor: digit
                      ? "#6366f1"
                      : "#e5e7eb",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.btn,
                ...(isLoading
                  ? styles.btnDisabled
                  : {}),
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Spinner ────────────────────────────────────────────────────────────────
const Spinner = () => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }}
  >
    <svg
      style={{
        width: 18,
        height: 18,
        animation: "spin 1s linear infinite",
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity=".25"
      />

      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        opacity=".75"
      />
    </svg>

    Processing...
  </span>
);

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: 20,
    position: "relative",
    overflowX: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },

  blob: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
  },

  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 4px 40px rgba(0,0,0,.08)",
    position: "relative",
  },

  backBtn: {
    position: "absolute",
    top: 18,
    left: 18,
    background: "#f1f5f9",
    border: "none",
    borderRadius: 10,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#64748b",
  },

  headerArea: {
    textAlign: "center",
    marginBottom: 28,
  },

  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#6366f1,#8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 6px",
  },

  subtitle: {
    fontSize: 13.5,
    color: "#6b7280",
    margin: 0,
  },

  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  },

  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute",
    left: 13,
    color: "#9ca3af",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    padding: "11px 14px 11px 40px",
    borderRadius: 10,
    border: "1.5px solid #e5e7eb",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  inputError: {
    borderColor: "#fca5a5",
    background: "#fff7f7",
  },

  eyeBtn: {
    position: "absolute",
    right: 13,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
  },

  fieldErr: {
    fontSize: 12,
    color: "#ef4444",
    margin: "5px 0 0",
  },

  apiError: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#dc2626",
    marginBottom: 18,
  },

  successBox: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#16a34a",
    marginBottom: 18,
  },

  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    cursor: "pointer",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background:
      "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 4,
    fontFamily: "inherit",
  },

  btnDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  footerText: {
    textAlign: "center",
    fontSize: 13.5,
    color: "#6b7280",
    marginTop: 18,
  },

  link: {
    color: "#6366f1",
    fontWeight: 600,
    textDecoration: "none",
  },

  otpBox: {
    width: 46,
    height: 54,
    borderRadius: 12,
    border: "1.5px solid #e5e7eb",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
  },
};

export default Signup;