import React, { useState } from "react";
import "./resond.css"; // Import the CSS file for styling

const Respond = () => {
  // State to manage the response text
  const [response, setResponse] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.trim() === "") {
      alert("Response cannot be empty!");
      return;
    }
    console.log("Response submitted:", response);
    alert("Response submitted successfully!");
    setResponse(""); // Clear the textarea after submission
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
        <h1>Respond to Complaint</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your response here..."
            rows="5"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          ></textarea>
          <br />
          <button type="submit">Submit Response</button>
        </form>
      </div>
    </div>
  );
};

export default Respond;