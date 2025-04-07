"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, Clock, Filter, HelpCircle, Search, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AssignedIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredIssues = assignedIssues.filter((issue) => {
    // Filter by search query
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.student.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assigned Issues</h1>
        <p className="text-muted-foreground">Manage and resolve issues assigned to you</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Issues</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {filteredIssues.filter((issue) => issue.status !== "resolved" && issue.status !== "rejected").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No active issues</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  You have resolved all your assigned issues. Great job!
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues
              .filter((issue) => issue.status !== "resolved" && issue.status !== "rejected")
              .map((issue) => <IssueCard key={issue.id} issue={issue} />)
          )}
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          {filteredIssues.filter((issue) => issue.status === "resolved" || issue.status === "rejected").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-3">
                  <XCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No resolved issues</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">You haven't resolved any issues yet.</p>
              </CardContent>
            </Card>
          ) : (
            filteredIssues
              .filter((issue) => issue.status === "resolved" || issue.status === "rejected")
              .map((issue) => <IssueCard key={issue.id} issue={issue} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IssueCard({ issue }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{issue.title}</h3>
              <StatusBadge status={issue.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              From: {issue.student} • {issue.date}
            </p>
            <p className="mt-2 text-sm">{issue.description}</p>
          </div>
          <div className="flex flex-row gap-2 sm:flex-col">
            <Link href={`/dashboard/issues/${issue.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
            {issue.status !== "resolved" && issue.status !== "rejected" && (
              <Link href={`/dashboard/issues/${issue.id}/resolve`}>
                <Button size="sm" className="w-full">
                  Resolve
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    "in-progress": {
      color: "bg-blue-100 text-blue-800",
      icon: HelpCircle,
    },
    resolved: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    rejected: {
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  }

  const { color, icon: Icon } = statusConfig[status]

  return (
    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      <span>{status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}</span>
    </div>
  )
}

const assignedIssues = [
  {
    id: "1",
    title: "Grade dispute for CS101 Final Exam",
    student: "Alice Johnson",
    date: "2 hours ago",
    status: "pending",
    description:
      "Student believes their final exam was graded incorrectly and is requesting a review of questions 3, 7, and 12.",
  },
  {
    id: "2",
    title: "Request for assignment extension",
    student: "Bob Smith",
    date: "5 hours ago",
    status: "in-progress",
    description: "Student is requesting a 3-day extension for the upcoming project due to medical circumstances.",
  },
  {
    id: "3",
    title: "Question about project requirements",
    student: "Charlie Brown",
    date: "Yesterday",
    status: "pending",
    description:
      "Student is unclear about the requirements for the final project and needs clarification on the deliverables.",
  },
  {
    id: "4",
    title: "Complaint about group member participation",
    student: "Diana Prince",
    date: "2 days ago",
    status: "in-progress",
    description: "Student reports that two members of their group are not contributing equally to the group project.",
  },
  {
    id: "5",
    title: "Request for additional study materials",
    student: "Edward Cullen",
    date: "3 days ago",
    status: "resolved",
    description:
      "Student is requesting additional practice problems and study materials for the upcoming midterm exam.",
  },
  {
    id: "6",
    title: "Accommodation request for exam",
    student: "Fiona Gallagher",
    date: "1 week ago",
    status: "rejected",
    description: "Student is requesting special accommodations for the final exam due to a learning disability.",
  },
]
