import React, { useState } from "react";
import "./Appsignup.css";
import { sendVerificationCode } from "./email";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordStrength(getPasswordStrength(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!verificationSent) {
      const code = generateVerificationCode();
      setGeneratedCode(code);
      sendVerificationCode(formData.email, code);
      setVerificationSent(true);
      alert("Verification code sent to your email.");
      navigate("/verificationcode");
      return;
    }

    alert("Signup successful!");
    console.log("User data:", formData);
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 8) {
      return "Weak";
    } else if (
      password.length >= 8 &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
    ) {
      return "Strong";
    } else {
      return "Medium";
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page opacity-half">
      <div className="signup-body">
        <h3>
          <b>Makerere University Academic Issue Tracking System</b>
        </h3>
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
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p>Password Strength: {passwordStrength}</p>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <footer className="signup-footer">
            <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
            <p>Empowering students through seamless issue resolution</p>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Signup;
