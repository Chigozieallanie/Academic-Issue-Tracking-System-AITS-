import React, { useState } from "react";
import "./Appsignup.css";
import { sendVerificationCode } from "./email"; // Import the email service

const Signup = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordStrength(getPasswordStrength(e.target.value));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (!verificationSent) {
      const code = generateVerificationCode();
      setGeneratedCode(code);
      sendVerificationCode(formData.email, code);
      setVerificationSent(true);
      alert("Verification code sent to your email.");
      return;
    }

    if (formData.verificationCode !== generatedCode) {
      setError("Invalid verification code.");
      return;
    }

    alert("Signup successful!");
    console.log("User data:", formData);
  };

  // Generate a random verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Validate password strength
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Get password strength
  const getPasswordStrength = (password) => {
    if (password.length < 8) {
      return "Weak";
    } else if (password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return "Strong";
    } else {
      return "Medium";
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <h3><b>Makerere University Academic Issue Tracking System</b></h3>
      <h4>Student Sign Up</h4>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          Show Password
        </label>
        <p>Password Strength: {passwordStrength}</p>
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {verificationSent && (
          <input
            type="text"
            name="verificationCode"
            placeholder="Verification Code"
            value={formData.verificationCode}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;