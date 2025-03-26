import React from "react";
import "./details.css"; // Import the CSS file for styling

const ComplaintDetails = () => {
  // Sample data for the complaint
  const complaint = {
    student: "John Doe",
    issue: "Exam grade discrepancy",
    description: "I believe my exam grade is incorrect, and I need a review.",
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
            <a href="profile.html">⚙️ Profile & Settings</a>
          </li>
          <li>
            <a href="logout.html">🚪 Log Out</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Complaint Details</h1>
        <p>
          <strong>Student:</strong> {complaint.student}
        </p>
        <p>
          <strong>Issue:</strong> {complaint.issue}
        </p>
        <p>
          <strong>Description:</strong> {complaint.description}
        </p>
        <a href="respond.html">✏️ Respond</a>
      </div>
    </div>
  );
};

export default ComplaintDetails;