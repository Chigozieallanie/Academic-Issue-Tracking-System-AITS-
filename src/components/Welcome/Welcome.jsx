import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Header Section */}
      <header className="head">
        <h1>MAK AITS - Your Trusted Academic Issue Tracking System</h1>
        <div className="auth-buttons">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome to MAK-AITS</h2>
        <p>
          The <strong>MAK-Academic Issue Tracking System (AITS)</strong> is
          designed to streamline the process of reporting and managing Academic
          issues efficiently.Student facing academic issues are helped, AITS
          ensures seamless communication and resolution.
        </p>
        <h2>Our Mission</h2>
        <p>
          We aim to provide a seamless and efficient platform for students,
          lecturers, and the registrar to track and resolve academic issues.
        </p>
        <h2>Contact Us</h2>
        <p>Email: support@academicsystem.com</p>
        <p>Phone: +256-414-542803</p>
        <p>Address: 7062 University Road, Kampala, Uganda</p>
        <p> P.O. Box 7062, Kampala, Uganda</p>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
        <p>Empowering students through seamless issue resolution.</p>
      </footer>
    </div>
  );
}

export default Welcome;
