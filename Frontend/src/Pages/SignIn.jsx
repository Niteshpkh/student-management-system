import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./SignIn.css";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

const SignIn = () => {
  const navigate = useNavigate();

  // Step 1: Form details, Step 2: OTP verification
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  // State for OTP digits (array of 6 strings)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpInputRefs = useRef([]);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus the first OTP box when entering Step 2
  useEffect(() => {
    if (step === 2) {
      const firstInput = otpInputRefs.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  // Step 1 Validation & Send OTP
  const handleInitiateRegistration = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    const username = formData.userName.trim();
    const email = formData.email.trim().toLowerCase();

    if (!username) {
      setError("Username is required.");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      setError("Only valid @gmail.com addresses are supported for verification.");
      return;
    }
    if (!formData.role) {
      setError("Please select a role (Student, Teacher, or Admin).");
      return;
    }
    if (!formData.password) {
      setError("Password is required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Call backend /auth/send-otp
      const response = await api.post("/auth/send-otp", { email });
      setInfoMessage(response.data?.message || `A 6-digit verification code was sent to ${email}`);
      setCountdown(RESEND_COOLDOWN);
      setStep(2);
    } catch (err) {
      console.error("Failed to send OTP:", err);
      const msg = err.response?.data?.message || "Failed to send verification code. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle individual digit input
  const handleOtpChange = (index, value) => {
    // Only accept numeric input
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue && value !== "") return;

    const newOtp = [...otp];

    if (cleanValue.length > 1) {
      // In case multiple digits are entered/autofilled
      const pastedDigits = cleanValue.slice(0, OTP_LENGTH).split("");
      for (let i = 0; i < pastedDigits.length; i++) {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = pastedDigits[i];
        }
      }
      setOtp(newOtp);
      const nextFocus = Math.min(index + pastedDigits.length, OTP_LENGTH - 1);
      otpInputRefs.current[nextFocus]?.focus();
    } else {
      newOtp[index] = cleanValue;
      setOtp(newOtp);
      if (cleanValue && index < OTP_LENGTH - 1) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
    setError("");
  };

  // Handle backspace navigation in OTP fields
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous box if current is empty
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste full code into any box
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (!pasteData) return;

    const digits = pasteData.slice(0, OTP_LENGTH).split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    // Focus last filled or next empty input
    const nextEmptyIndex = digits.length < OTP_LENGTH ? digits.length : OTP_LENGTH - 1;
    otpInputRefs.current[nextEmptyIndex]?.focus();
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0 || resending) return;

    setResending(true);
    setError("");
    setInfoMessage("");

    try {
      const email = formData.email.trim().toLowerCase();
      const response = await api.post("/auth/send-otp", { email });
      setInfoMessage(response.data?.message || "New verification code sent successfully.");
      setCountdown(RESEND_COOLDOWN);
      setOtp(Array(OTP_LENGTH).fill(""));
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError(err.response?.data?.message || "Could not resend code. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  // Step 2 Final Submission
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== OTP_LENGTH) {
      setError(`Please enter the complete ${OTP_LENGTH}-digit verification code.`);
      return;
    }

    setLoading(true);

    const payload = {
      userName: formData.userName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      otp: otpCode
    };

    try {
      const response = await api.post("/auth/verify-and-register", payload);
      const successMsg = response.data?.message || "Registration successful! You can now log in.";

      // Navigate to login page with success feedback message
      navigate("/login", {
        state: {
          successMessage: successMsg,
          prefillUser: formData.userName.trim()
        }
      });
    } catch (err) {
      console.error("Verification error:", err);
      const msg = err.response?.data?.message || "Verification failed. Please check the code and try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Back Link */}
        <div className="signup-nav">
          <Link to="/" className="back-link">
            ← Back to School Website
          </Link>
        </div>

        {/* School Header */}
        <div className="signup-header">
          <img
            src="/logo.svg"
            alt="Rational Academy Logo"
            className="school-logo"
          />
          <h1>Rational Academy</h1>
          <p className="subtitle">Sundarharaicha-8, Salakpur, Morang</p>
        </div>

        {/* Step Progression Indicators */}
        <div className="step-indicator">
          <div className={`step-item ${step >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Account Details</span>
          </div>
          <div className={`step-connector ${step === 2 ? "active" : ""}`} />
          <div className={`step-item ${step === 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">OTP Verification</span>
          </div>
        </div>

        {/* Status Banners */}
        {error && (
          <div className="alert-banner alert-error" role="alert">
            <svg viewBox="0 0 20 20" fill="currentColor" className="alert-icon">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="alert-banner alert-info" role="status">
            <svg viewBox="0 0 20 20" fill="currentColor" className="alert-icon">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{infoMessage}</span>
          </div>
        )}

        {/* STEP 1: ACCOUNT FORM */}
        {step === 1 && (
          <form onSubmit={handleInitiateRegistration} className="signup-form" noValidate>
            <div className="form-group">
              <label htmlFor="userName">Username</label>
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder="Choose a username"
                value={formData.userName}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address (@gmail.com)</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="yourname@gmail.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <span className="field-hint">A 6-digit verification code will be sent to this email.</span>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role in Academy</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Your Role --</option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner-content">
                  <span className="spinner" /> Sending Verification Code...
                </span>
              ) : (
                "Continue to Email Verification →"
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <div className="otp-step-view">
            <div className="otp-card-header">
              <div className="mail-badge-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3>Enter Verification Code</h3>
              <p className="otp-instruction">
                We sent a 6-digit one-time password to:
              </p>
              <div className="recipient-pill">
                <strong>{formData.email}</strong>
                <button
                  type="button"
                  className="change-email-btn"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setInfoMessage("");
                  }}
                  title="Change Email Address"
                >
                  Edit
                </button>
              </div>
            </div>

            <form onSubmit={handleVerifyAndRegister} className="otp-form">
              {/* 6 Digit Inputs */}
              <div className="otp-inputs-grid" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`otp-digit-box ${digit ? "filled" : ""}`}
                    autoFocus={idx === 0}
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Dev environment helper tip */}
              <div className="dev-otp-tip">
                <span>💡 Note: In test mode, check your Spring Boot terminal console for the verification OTP.</span>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || otp.join("").length !== OTP_LENGTH}
              >
                {loading ? (
                  <span className="btn-spinner-content">
                    <span className="spinner" /> Verifying & Registering...
                  </span>
                ) : (
                  "Verify & Complete Registration"
                )}
              </button>

              {/* Resend and Actions */}
              <div className="otp-footer-actions">
                {countdown > 0 ? (
                  <span className="countdown-text">
                    Resend code in <strong>0:{countdown < 10 ? `0${countdown}` : countdown}</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="resend-btn"
                    disabled={resending}
                  >
                    {resending ? "Sending..." : "Resend Verification Code"}
                  </button>
                )}

                <div className="back-step-action">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="text-link-btn"
                  >
                    ← Back to edit details
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Existing account link */}
        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;