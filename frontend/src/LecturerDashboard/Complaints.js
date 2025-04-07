import React from "react";
import "./style.css"; // Import the CSS file for styling

const Complaints = () => {
  // Sample data for complaints
  const complaints = [
    {
      id: "001",
      student: "John Doe",
      date: "2025-02-01",
      status: "Pending",
      actionLink: "details.js",
    },
    {
      id: "002",
      student: "Mark Johnson",
      date: "2025-02-03",
      status: "Resolved",
      actionLink: "details.js",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Lecturer Dashboard</h2>
        <ul>
          <li>
            <a href="dashboard.js">🏠 Home</a>
          </li>
          <li>
            <a href="resolved.js">📊 Resolved Complaints</a>
          </li>
          <li>
            <a href="profile.js">⚙️ Profile & Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Assigned Complaints</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.student}</td>
                <td>{complaint.date}</td>
                <td>{complaint.status}</td>
                <td>
                  <a href={complaint.actionLink}>View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;