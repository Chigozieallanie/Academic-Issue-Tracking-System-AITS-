import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dash.css";

export default function Dashboard({ name, college, course, year, semester }) {
  const [issues, setIssues] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch issues and notifications from an API
    const fetchedIssues = [
      {
        id: 1,
        status: "Pending",
        description: "Issue with course registration"
      },
      { id: 2, status: "Resolved", description: "Issue with exam schedule" },
      { id: 3, status: "Pending", description: "Issue with library access" }
    ];
    const fetchedNotifications = [
      { id: 1, message: "Your issue #1 has been resolved." },
      { id: 2, message: "New issue submitted." }
    ];

    setIssues(fetchedIssues);
    setNotifications(fetchedNotifications);
  }, []);

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;
  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {name || "Student"}</h2>
        <p>College: {college || "Not Selected"}</p>
        <p>Course: {course || "Not Selected"}</p>
        <p>Year: {year || "Not Selected"}</p>
        <p>Semester: {semester || "Not Selected"}</p>
      </header>

      <div className="dashboard-sections">
        <section className="issues-section">
          <h3>Issues Summary</h3>
          <p>Total Issues Submitted: {issues.length}</p>
          <p>Pending Issues: {pendingIssues}</p>
          <p>Resolved Issues: {resolvedIssues}</p>
          <ul>
            {issues.map((issue) => (
              <li key={issue.id}>
                {issue.description} - <strong>{issue.status}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="notifications-section">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </section>

        <section className="profile-section">
          <h3>Profile</h3>
          <Link to="/profile">Edit Profile</Link>
        </section>

        <section className="courses-section">
          <h3>My Course</h3>
          <Link to="/my-Course">View Courses</Link>
        </section>

        <section className="report-issue-section">
          <h3>Report an Issue</h3>
          <Link to="/reportIssue">Report Issue</Link>
        </section>
      </div>
    </div>
  );
}
