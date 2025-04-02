import React from "react";
import "./LecturerLogin.css";

function LecturerLogin() {
  return (
    <div className="login-container">
      <header className="header">
        MAKERERE UNIVERSITY ACADEMIC ISSUE TRACKING SYSTEM <br />
        <span className="sub-header">MAK - AITS</span>
      </header>

      <div className="login-box">
        <h2 className="title">Lecturer Login</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button className="login-btn">Login</button>

          <div className="extra-links">
            <a href="#">Forgot Password?</a>
            <a href="#">Signup</a>
          </div>
        </form>
      </div>

      <footer className="footer">@ 2025 MAK - AITS</footer>
    </div>
  );
}

export default LecturerLogin;