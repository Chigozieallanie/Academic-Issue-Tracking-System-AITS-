import React from "react";
import "./resolved.css"; // Import the CSS file for styling

const ResolvedComplaints = () => {
  // Sample data for resolved complaints
  const resolvedComplaints = [
    {
      id: "001",
      student: "Mary Nakato",
      issue: "Missing Marks",
      resolutionDate: "2025-01-30",
    },
    {
      id: "002",
      student: "Aisha Kyomuhendo",
      issue: "Exam Appeal",
      resolutionDate: "2025-02-01",
    },
  ];
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
            <a href="resolved.html" className="active">📊 Resolved Complaints</a>
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
        <h1>Resolved Complaints</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Issue</th>
              <th>Resolution Date</th>
            </tr>
          </thead>
          <tbody>
            {resolvedComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.student}</td>
                <td>{complaint.issue}</td>
                <td>{complaint.resolutionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResolvedComplaints;