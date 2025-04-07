"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function ResolveIssuePage() {
  const params = useParams()
  const router = useRouter()
  const issueId = params.id

  // Find the issue from our mock data
  const issue = assignedIssues.find((i) => i.id === issueId)

  const [resolution, setResolution] = useState("resolve")

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
    // In a real app, you would update the issue status in the backend
    alert(`Issue ${resolution === "resolve" ? "resolved" : "rejected"}!`)
    router.push("/dashboard/assigned")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resolve Issue</h1>
          <p className="text-muted-foreground">{issue.title}</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Resolution Details</CardTitle>
            <CardDescription>Provide details about how you resolved this issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Resolution Type</Label>
              <RadioGroup defaultValue="resolve" onValueChange={(value) => setResolution(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="resolve" id="resolve" />
                  <Label htmlFor="resolve" className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Resolve Issue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reject" id="reject" />
                  <Label htmlFor="reject" className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                    Reject Issue
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-title">Resolution Title</Label>
              <Input id="resolution-title" placeholder="Brief summary of resolution" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-details">Resolution Details</Label>
              <Textarea
                id="resolution-details"
                placeholder="Provide detailed explanation of how you resolved this issue"
                className="min-h-[150px]"
                required
              />
            </div>

            {resolution === "resolve" && (
              <div className="space-y-2">
                <Label htmlFor="follow-up">Follow-up Actions (Optional)</Label>
                <Textarea
                  id="follow-up"
                  placeholder="Any follow-up actions or recommendations"
                  className="min-h-[100px]"
                />
              </div>
            )}

            {resolution === "reject" && (
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Explain why this issue is being rejected"
                  className="min-h-[100px]"
                  required={resolution === "reject"}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{resolution === "resolve" ? "Resolve Issue" : "Reject Issue"}</Button>
          </CardFooter>
        </form>
      </Card>
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
