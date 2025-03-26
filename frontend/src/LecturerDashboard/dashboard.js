import React from "react";
import "./dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Lecturer Dashboard</h2>
        <ul>
          <li>
            <a href="complaints.html">📄 Assigned Complaints</a>
          </li>
          <li>
            <a href="resolved.html">📊 Resolved Complaints</a>
          </li>
          <li>
            <a href="profile.html">⚙️ Profile & Settings</a>
          </li>
          <li>
            <a href="logout.html">🚪 Log Out</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome, Lecturer!</h1>
        <p>Select a section from the menu to manage student complaints.</p>
      </div>
    </div>
  );
};

export default Dashboard;