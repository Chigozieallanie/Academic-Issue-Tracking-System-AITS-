import React from "react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Header Section */}
      <header className="head">
        <h1>AITS</h1>
        <div className="auth-buttons">
          <button>Sign Up</button>
          <button>Login</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome to AITS</h2>
        <p>
          The <strong>Academic Issue Tracking System (AITS)</strong> is designed
          to streamline the process of reporting and managing Academic issues
          efficiently. Whether you're a student facing concerns or an
          administrator resolving them, AITS ensures seamless communication and
          resolution.
        </p>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} AITS. All rights reserved.</p>
        <p>Empowering students through seamless issue resolution.</p>
      </footer>
    </div>
  );
}

export default Welcome;
