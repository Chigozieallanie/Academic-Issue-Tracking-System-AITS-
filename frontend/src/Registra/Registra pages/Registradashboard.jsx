"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./RegistraDashboard.css"
//import Sidebar from "./sidebar"
// Mock data
const user = {
  first_name: "Okedi"
}

const mockIssues = [
  {
    id: 1,
    title: "EXAM MARKS",
    description: "Missing my exam mark for programming...",
    created_by_name: "KIGOZI ALLAN",
    created_at: "2025-04-23",
    assigned_to_name: "CHIGOZIE ALLANIE",
    status: "pending",
    assigned_to: "CHIGOZIE"
  },
  {
    id: 2,
    title: "End of Sem 1 marks",
    description: "Final semester marks not yet published.",
    created_by_name: "KASOZI JANE",
    created_at: "2025-04-20",
    status: "pending"
  }
]

const stats = {
  totalIssues: 6,
  pendingIssues: 3,
  inProgressIssues: 0,
  resolvedIssues: 3
}

const RegistraDashboard = () => {
  const [allIssues, setAllIssues] = useState([])
  const [priorityIssues, setPriorityIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAllIssues(mockIssues)

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const priority = mockIssues.filter((issue) => {
        const createdDate = new Date(issue.created_at)
        return issue.status === "pending" && createdDate < sevenDaysAgo
      })

      setPriorityIssues(priority)
      setLoading(false)
    }, 500)
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending"
      case "in_progress":
        return "status-in-progress"
      case "resolved":
        return "status-resolved"
      default:
        return ""
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Academic Registrar Dashboard</h1>
        <p>Welcome back, {user.first_name}!</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card"><div className="stat-value">{stats.totalIssues}</div><div className="stat-label">Total Issues</div></div>
        <div className="stat-card"><div className="stat-value">{stats.pendingIssues}</div><div className="stat-label">Pending</div></div>
        <div className="stat-card"><div className="stat-value">{stats.inProgressIssues}</div><div className="stat-label">In Progress</div></div>
        <div className="stat-card"><div className="stat-value">{stats.resolvedIssues}</div><div className="stat-label">Resolved</div></div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Priority Issues</h2>
          <Link to="/issues" className="btn btn-secondary">View All Issues</Link>
        </div>

        {loading ? (
          <div>Loading priority issues...</div>
        ) : priorityIssues.length === 0 ? (
          <p>No priority issues at this time.</p>
        ) : (
          <div className="issue-list">
            {priorityIssues.map((issue) => (
              <div key={issue.id} className="issue-card priority">
                <div className="issue-header">
                  <h3><Link to={`/issues/${issue.id}`}>{issue.title}</Link></h3>
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>{issue.status.replace("_", " ")}</span>
                </div>
                <p>{issue.description}</p>
                <div className="issue-footer">
                  <span>Created by: {issue.created_by_name}</span>
                  <span>Created: {new Date(issue.created_at).toLocaleDateString()}</span>
                  <span>Assigned to: {issue.assigned_to_name || "Unassigned"}</span>
                </div>
                <div className="issue-actions">
                  <Link to={`/issues/${issue.id}`} className="btn btn-primary">Review Issue</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Recent Unassigned Issues</h2>
        {loading ? (
          <p>Loading unassigned issues...</p>
        ) : (
          <div className="issue-list">
            {allIssues.filter((i) => !i.assigned_to).map((issue) => (
              <div key={issue.id} className="issue-card">
                <div className="issue-header">
                  <h3><Link to={`/issues/${issue.id}`}>{issue.title}</Link></h3>
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>{issue.status.replace("_", " ")}</span>
                </div>
                <p>{issue.description}</p>
                <div className="issue-footer">
                  <span>Created by: {issue.created_by_name}</span>
                  <span>Created: {new Date(issue.created_at).toLocaleDateString()}</span>
                </div>
                <div className="issue-actions">
                  <Link to={`/issues/${issue.id}`} className="btn btn-primary">Assign Issue</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistraDashboard
