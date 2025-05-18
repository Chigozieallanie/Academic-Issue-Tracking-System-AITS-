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
         <div className="stat-value">{stats.inProgressIssues}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.resolvedIssues}</div>
          <div className="stat-label">Resolved</div>
        </div>
      </div>

      <div className="dashboard-content ">
        <div className="dashboard-section ">
          <div className="section-header">
            <h2>Your Recent Issues</h2>
            <Link to="/issues/create" className="btn btn-primary">
              Create New Issue
            </Link>
          </div>
          {loading ? (
            <div className="loading">Loading recent issues...</div>
          ) : recentIssues.length === 0 ? (
            <div className="empty-state">
              <p>You haven't submitted any issues yet.</p>
              <Link to="/issues/create" className="btn btn-primary">
                Submit Your First Issue
              </Link>
            </div>
          ) : (
            <div className="issue-list">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="issue-card">
                  <div className="issue-header">
                    <h3>
                      <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
                    </h3>
                    <span className={`status-badge ${getStatusClass(issue.status)}`}>
                      {issue.status.replace("_", " ")}
                    </span>
                    </div>
                  <p className="issue-description">{issue.description.substring(0, 100)}...</p>
                  <div className="issue-footer">
                    <span>Created: {new Date(issue.created_at).toLocaleDateString()}</span>
                    <span>Assigned to: {issue.assigned_to_name || "Unassigned"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
      </div>

      <div className="dashboard-footer"></div>
      <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/issues/create" className="btn btn-primary">
              Submit New Issue
            </Link>
            <Link to="/issues" className="btn btn-secondary">
              View All Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
export default Dashboard;