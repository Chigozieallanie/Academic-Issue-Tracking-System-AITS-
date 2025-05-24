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