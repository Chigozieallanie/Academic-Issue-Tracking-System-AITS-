"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"

const LecturerDashboard = ({ stats }) => {
  const { user } = useAuth()
  const [assignedIssues, setAssignedIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    const fetchAssignedIssues = async () => {
      try {
        const response = await api.get("/issues/")
        // Filter issues assigned to the current lecturer
        const userIssues = response.data.filter((issue) => issue.assigned_to === user.id)
        // Sort by creation date (newest first)
        const sortedIssues = userIssues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
 setAssignedIssues(sortedIssues)

        // Prepare data for the bar chart
        const statusCounts = {
          pending: userIssues.filter((issue) => issue.status === "pending").length,
          in_progress: userIssues.filter((issue) => issue.status === "in_progress").length,
          resolved: userIssues.filter((issue) => issue.status === "resolved").length,
          closed: userIssues.filter((issue) => issue.status === "closed").length,
        }
         setChartData([
          { name: "Pending", count: statusCounts.pending },
          { name: "In Progress", count: statusCounts.in_progress },
          { name: "Resolved", count: statusCounts.resolved },
          { name: "Closed", count: statusCounts.closed },
        ])
         setLoading(false)
      } catch (error) {
        console.error("Error fetching assigned issues:", error)
        setLoading(false)
      }
    }
     fetchAssignedIssues()
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
  }