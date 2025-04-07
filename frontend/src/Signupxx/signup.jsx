import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Appsignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    role: "student"
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || 
        !formData.password2 || !formData.first_name || !formData.last_name) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.role
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Registration successful:", response.data);
      navigate("/login", { 
        state: { 
          message: "Registration successful! Please log in." 
        } 
      });
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      
      if (error.response?.data) {
        // Handle Django validation errors
        const errorData = error.response.data;
        if (errorData.username) {
          setError(`Username: ${errorData.username.join(" ")}`);
        } else if (errorData.email) {
          setError(`Email: ${errorData.email.join(" ")}`);
        } else if (errorData.password) {
          setError(`Password: ${errorData.password.join(" ")}`);
        } else {
          setError("Registration failed. Please check your details.");
        }
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page">
      <div className="signup-body">
        <h3>Makerere University Academic Issue Tracking System</h3>
        <h4>Sign Up</h4>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="registrar">Academic Registrar</option>
            </select>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={4}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
