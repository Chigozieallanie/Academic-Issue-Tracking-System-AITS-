import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Header Section */}
      <header className="welcome-head">
        <h1>MAK AITS - Your Trusted Academic Issue Tracking System</h1>
        <div className="welcome-auth-buttons">
          <p className="role-selection-text">Please click here to proceed:</p>
          <div className="role-buttons">
            <Link to="/Select role">
              <button className="role-button">Proceed</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="welcome-main-content">
        <div className="welcome-text">
          <h2>Welcome to MAK-AITS</h2>
          <p>
            The <strong>MAK-Academic Issue Tracking System (AITS)</strong> is
            designed to streamline the process of reporting and managing
            Academic issues efficiently. Student facing academic issues are
            helped, AITS ensures seamless communication and resolution.
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
        </div>
      </main>

      {/* Footer Section */}
      <footer className="welcome-footer">
        <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
        <p>Empowering students through seamless issue resolution.</p>
      </footer>
    </div>
  );
}

export default Welcome;
