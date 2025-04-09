import React, { useState, useEffect } from "react";
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
    role: "student",
    // Student fields
    student_id: "",
    program: "",
    year_of_study: "",
    // Lecturer fields
    staff_id: "",
    department: "",
    specialization: "",
    // Registrar fields
    office: "",
    contact_info: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate form based on role
  const validateForm = () => {
    // Common required fields
    if (!formData.username || !formData.email || !formData.password || 
        !formData.password2 || !formData.first_name || !formData.last_name) {
      setError("All basic fields are required");
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

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.student_id || !formData.program || !formData.year_of_study) {
        setError("Student ID, program, and year of study are required");
        return false;
      }
      if (formData.year_of_study < 1 || formData.year_of_study > 5) {
        setError("Year of study must be between 1 and 5");
        return false;
      }
    } else if (formData.role === "lecturer") {
      if (!formData.staff_id || !formData.department || !formData.specialization) {
        setError("Staff ID, department, and specialization are required");
        return false;
      }
    } else if (formData.role === "registrar") {
      if (!formData.office || !formData.contact_info) {
        setError("Office and contact info are required");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare data to send based on role
      const requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        role: formData.role,
        ...(formData.role === "student" && {
          student_id: formData.student_id,
          program: formData.program,
          year_of_study: parseInt(formData.year_of_study)
        }),
        ...(formData.role === "lecturer" && {
          staff_id: formData.staff_id,
          department: formData.department,
          specialization: formData.specialization
        }),
        ...(formData.role === "registrar" && {
          office: formData.office,
          contact_info: formData.contact_info
        })
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        requestData,
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
        if (typeof errorData === 'object') {
          // Join all error messages
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(' ') : messages}`)
            .join('\n');
          setError(errorMessages);
        } else {
          setError(errorData.toString());
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

  // Render role-specific fields
  const renderRoleFields = () => {
    switch(formData.role) {
      case "student":
        return (
          <>
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Program</label>
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Year of Study (1-5)</label>
              <input
                type="number"
                name="year_of_study"
                value={formData.year_of_study}
                onChange={handleChange}
                min="1"
                max="5"
                required
              />
            </div>
          </>
        );
      case "lecturer":
        return (
          <>
            <div className="form-group">
              <label>Staff ID</label>
              <input
                type="text"
                name="staff_id"
                value={formData.staff_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case "registrar":
        return (
          <>
            <div className="form-group">
              <label>Office</label>
              <input
                type="text"
                name="office"
                value={formData.office}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Info</label>
              <input
                type="text"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
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

          {/* Role-specific fields */}
          {renderRoleFields()}

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