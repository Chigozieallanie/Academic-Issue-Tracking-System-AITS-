"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  HelpCircle,
  PieChart,
  TrendingUp,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import'./global.css';
export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track and analyze academic issues across departments</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="overview" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Department" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
              <SelectItem value="bus">Business</SelectItem>
              <SelectItem value="arts">Arts & Humanities</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Issues"
              value="156"
              change="+12%"
              trend="up"
              description="vs. previous period"
              icon={<BarChart3 className="h-4 w-4 text-primary" />}
            />
            <StatCard
              title="Pending"
              value="42"
              change="-5%"
              trend="down"
              description="vs. previous period"
              icon={<Clock className="h-4 w-4 text-yellow-500" />}
            />
            <StatCard
              title="Resolved"
              value="98"
              change="+18%"
              trend="up"
              description="vs. previous period"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
            />
            <StatCard
              title="Avg. Resolution Time"
              value="2.4 days"
              change="-0.8 days"
              trend="down"
              description="vs. previous period"
              icon={<TrendingUp className="h-4 w-4 text-primary" />}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-black">Issues by Status</CardTitle>
                <CardDescription>Distribution of issues by their current status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] w-full bg-primary/5 rounded-lg flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-primary/40" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <StatusLegendItem status="pending" count={42} percentage={27} />
                  <StatusLegendItem status="in-progress" count={16} percentage={10} />
                  <StatusLegendItem status="resolved" count={98} percentage={63} />
                  <StatusLegendItem status="rejected" count={0} percentage={0} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-black">Issues by Category</CardTitle>
                <CardDescription>Distribution of issues by category</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] w-full bg-primary/5 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-primary/40" />
                </div>
                <div className="mt-6 space-y-4">
                  <CategoryBar category="Grade Disputes" count={58} percentage={37} />
                  <CategoryBar category="Assignment Extensions" count={42} percentage={27} />
                  <CategoryBar category="Course Materials" count={31} percentage={20} />
                  <CategoryBar category="Group Work Issues" count={25} percentage={16} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">Recent Activity</CardTitle>
              <CardDescription>Latest issue resolutions and updates</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-primary/10">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4">
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        activity.type === "resolved"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {activity.type === "resolved" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : activity.type === "rejected" ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <HelpCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-black">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description} • {activity.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">Issue Trends</CardTitle>
              <CardDescription>Monthly trends of issues by status</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-[21/9] w-full bg-primary/5 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-32 w-32 text-primary/40" />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Jan</div>
                  <div className="text-lg font-bold">42</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Feb</div>
                  <div className="text-lg font-bold">38</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Mar</div>
                  <div className="text-lg font-bold">45</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Apr</div>
                  <div className="text-lg font-bold">31</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-black">Issues by Department</CardTitle>
                <CardDescription>Distribution of issues across departments</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] w-full bg-primary/5 rounded-lg flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-primary/40" />
                </div>
                <div className="mt-6 space-y-4">
                  <DepartmentBar department="Computer Science" count={62} percentage={40} />
                  <DepartmentBar department="Engineering" count={45} percentage={29} />
                  <DepartmentBar department="Business" count={28} percentage={18} />
                  <DepartmentBar department="Arts & Humanities" count={21} percentage={13} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-black">Resolution Time by Department</CardTitle>
                <CardDescription>Average time to resolve issues by department</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-[4/3] w-full bg-primary/5 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-primary/40" />
                </div>
                <div className="mt-6 space-y-4">
                  <ResolutionTimeBar department="Computer Science" time="1.8 days" />
                  <ResolutionTimeBar department="Engineering" time="2.3 days" />
                  <ResolutionTimeBar department="Business" time="3.1 days" />
                  <ResolutionTimeBar department="Arts & Humanities" time="2.5 days" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value, change, trend, description, icon }) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/5">
        <CardTitle className="text-sm font-medium text-black">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-2xl font-bold text-black">{value}</div>
        <div className="flex items-center">
          <span
            className={`text-xs ${
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            {change}
          </span>
          <span className="ml-1 text-xs text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusLegendItem({ status, count, percentage }) {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: Clock,
    },
    "in-progress": {
      color: "bg-blue-100",
      textColor: "text-blue-800",
      icon: HelpCircle,
    },
    resolved: {
      color: "bg-green-100",
      textColor: "text-green-800",
      icon: CheckCircle2,
    },
    rejected: {
      color: "bg-red-100",
      textColor: "text-red-800",
      icon: XCircle,
    },
  }

  const { color, textColor, icon: Icon } = statusConfig[status]

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full p-1.5 ${color} ${textColor}`}>
        <Icon className="h-3 w-3" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium capitalize">{status.replace("-", " ")}</div>
        <div className="text-xs text-muted-foreground">
          {count} ({percentage}%)
        </div>
      </div>
    </div>
  )
}

function CategoryBar({ category, count, percentage }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{category}</div>
        <div className="text-sm text-muted-foreground">
          {count} ({percentage}%)
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-primary/10">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function DepartmentBar({ department, count, percentage }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{department}</div>
        <div className="text-sm text-muted-foreground">
          {count} ({percentage}%)
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-primary/10">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function ResolutionTimeBar({ department, time }) {
  // Calculate a percentage for the bar width (assuming max is 5 days)
  const days = Number.parseFloat(time.split(" ")[0])
  const percentage = (days / 5) * 100

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{department}</div>
        <div className="text-sm text-muted-foreground">{time}</div>
      </div>
      <div className="h-2 w-full rounded-full bg-primary/10">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

const recentActivity = [
  {
    type: "resolved",
    title: "Grade dispute for CS101 Final Exam resolved",
    description: "Resolved by Dr. John Smith",
    time: "2 hours ago",
  },
  {
    type: "in-progress",
    title: "Request for assignment extension updated",
    description: "Status changed to In Progress",
    time: "3 hours ago",
  },
  {
    type: "rejected",
    title: "Accommodation request for exam rejected",
    description: "Rejected by Dr. Jane Doe",
    time: "5 hours ago",
  },
  {
    type: "resolved",
    title: "Question about project requirements resolved",
    description: "Resolved by Dr. John Smith",
    time: "Yesterday",
  },
  {
    type: "resolved",
    title: "Request for additional study materials resolved",
    description: "Resolved by Dr. Emily Johnson",
    time: "2 days ago",
  },
]
