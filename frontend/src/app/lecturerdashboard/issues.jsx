"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, Paperclip, Send, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import'./global.css';

export default function IssueDetailPage() {
  const params = useParams()
  const router = useRouter()
  const issueId = params.id

  // Find the issue from our mock data
  const issue = assignedIssues.find((i) => i.id === issueId)

  const [message, setMessage] = useState("")

  if (!issue) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Issue not found</h1>
        <p className="text-muted-foreground">The issue you are looking for does not exist.</p>
        <Button className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send the message to the backend
    alert(`Message sent: ${message}`)
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{issue.title}</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              From: {issue.student} • {issue.date}
            </p>
            <StatusBadge status={issue.status} />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>Review the details of this issue and take appropriate action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="mt-1 text-sm">{issue.description}</p>
            </div>
            <div>
              <h3 className="font-medium">Attachments</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span>exam_answers.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            {issue.status !== "resolved" && issue.status !== "rejected" && (
              <>
                <Button variant="outline" className="gap-1">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Link href={`/dashboard/issues/${issue.id}/resolve`}>
                  <Button className="gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Resolve
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication</CardTitle>
          <CardDescription>Message history between you and the student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "lecturer" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "lecturer" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      msg.sender === "lecturer" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px]"
            />
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
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

const messages = [
  {
    sender: "student",
    content:
      "Hello Dr. Smith, I believe there was an error in grading my final exam. Could you please review questions 3, 7, and 12?",
    time: "2 hours ago",
  },
  {
    sender: "lecturer",
    content: "Hi Alice, I'll take a look at your exam and get back to you shortly.",
    time: "1 hour ago",
  },
  {
    sender: "student",
    content: "Thank you! I've attached my exam answers for your reference.",
    time: "1 hour ago",
  },
  {
    sender: "lecturer",
    content:
      "I've reviewed question 3 and I see the issue. You're right that your answer should have received partial credit. I'm still looking at the other questions.",
    time: "30 minutes ago",
  },
]
