import React from "react";//Import React modules.
import "./LecturerSignup.css"; // Import CSS file

const LecturerSignup = () => {
  return (
    <div className="signup-container">
      <h2 className="header-text">
        MAKERERE UNIVERSITY ACADEMIC ISSUE TRACKING SYSTEM
        <br />
        <span className="sub-header">MAK - AITS</span>
      </h2>

      <div className="signup-box">
        <h3 className="form-title">Lecturer Signup</h3>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Department" required />
          <input type="text" placeholder="Employee ID No" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>

      <footer>@ 2025 MAK - AITS</footer>
    </div>
  );
};

export default LecturerSignup;
