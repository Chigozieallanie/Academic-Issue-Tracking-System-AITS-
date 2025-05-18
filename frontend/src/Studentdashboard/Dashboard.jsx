"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"


const StudentDashboard = ({ stats }) => {
  const { user } = useAuth()
  const [recentIssues, setRecentIssues] = useState([])
  const [loading, setLoading] = useState(true)
useEffect(() => {
    const fetchRecentIssues = async () => {
      try {
        const response = await api.get("/issues/")
        // Filter issues created by the current student
        const userIssues = response.data.filter((issue) => issue.created_by === user.id)
        // Sort by creation date (newest first) and take the first 5
        const sortedIssues = userIssues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

        setRecentIssues(sortedIssues)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching recent issues:", error)
        setLoading(false)
      }
    }
  fetchRecentIssues()
  }, [user.id])



  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending"
      case "in_progress":
        return "status-in-progress"
      case "resolved":
        return "status-resolved"
      case "closed":
        return "status-closed"
      default:
        return ""
    }
    return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back, {user.first_name}!</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.totalIssues}</div>
          <div className="stat-label">Total Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pendingIssues}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">

  const handleReportIssue = () => {
    if (!category) {
      alert("Please select an issue category.");
      return;
    }
    if (!newIssue.trim()) {
      alert("Please enter an issue description.");
      return;
    }

    const issueData = {
      id: issues.length + 1,
      category: category,
      description: newIssue,
      timestamp: new Date().toLocaleString(),
      status: "Pending",
      documentName: document ? document.name : "No document attached",
      lecturer: lecturer,
      courseCode: courseCode
    };

    setIssues([...issues, issueData]);
    setCategory("");
    setNewIssue("");
    setDocument(null);
    setLecturer("");
    setCourseCode("");
    alert("Issue reported successfully!");
  };

  const handleResolveIssue = (issueId) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, status: "Resolved" } : issue
      )
    );
    alert(`Issue #${issueId} has been resolved.`);
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    setCourseUnits(courses[selectedCourse][semester] || []);
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setCourseUnits(courses[course][selectedSemester] || []);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>STUDENT DASHBOARD</h2>
        <ul>
          {[
            { path: "dashboard", icon: <MdDashboard /> },
            { path: "profile", icon: <CgProfile /> },
            { path: "my-Course", icon: <FaAddressBook /> },
            { path: "reportIssue", icon: <GoIssueOpened /> },
            { path: "issueList", icon: <SiStatuspage /> },
            { path: "notification", icon: <IoMdNotificationsOutline /> },
            { path: "Logout", icon: <CiLogout /> }
          ].map((section) => (
            <NavLink to={section.path} key={section.path}>
              <li key={section.path}>
                {section.icon}
                {section.path}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>MAKERERE UNIVERSITY</h1>
          <p>Academic Issue Tracking System</p>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;