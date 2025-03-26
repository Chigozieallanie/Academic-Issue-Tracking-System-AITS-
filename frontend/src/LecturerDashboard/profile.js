import React from "react";
import "./profile.css"; // Import the CSS file for styling

const Profile = () => {
  // Sample data for the lecturer's profile
  const profile = {
    name: "Dr. John Smith",
    email: "johnsmith@example.com",
  };

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
            <a href="logout.html">🔒 Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Profile & Settings</h1>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;