"use client";

import { useState } from "react";
import "./global.css";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [department, setDepartment] = useState("all");

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
                <span className="icon-placeholder">📅</span>
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
                <span className="icon-placeholder">🔍</span>
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
              icon={<span className="icon-placeholder">📊</span>}
            />
            <StatCard
              title="Pending"
              value="42"
              change="-5%"
              trend="down"
              description="vs. previous period"
              icon={<span className="icon-placeholder">⏳</span>}
            />
            <StatCard
              title="Resolved"
              value="98"
              change="+18%"
              trend="up"
              description="vs. previous period"
              icon={<span className="icon-placeholder">✅</span>}
            />
            <StatCard
              title="Avg. Resolution Time"
              value="2.4 days"
              change="-0.8 days"
              trend="down"
              description="vs. previous period"
              icon={<span className="icon-placeholder">📈</span>}
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
                  <span className="icon-placeholder">📊</span>
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
                  <span className="icon-placeholder">📊</span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
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
  );
}

function StatusLegendItem({ status, count, percentage }) {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: "⏳",
    },
    "in-progress": {
      color: "bg-blue-100",
      textColor: "text-blue-800",
      icon: "🔄",
    },
    resolved: {
      color: "bg-green-100",
      textColor: "text-green-800",
      icon: "✅",
    },
    rejected: {
      color: "bg-red-100",
      textColor: "text-red-800",
      icon: "❌",
    },
  };

  const { color, textColor, icon } = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full p-1.5 ${color} ${textColor}`}>
        <span>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium capitalize">{status.replace("-", " ")}</div>
        <div className="text-xs text-muted-foreground">
          {count} ({percentage}%)
        </div>
      </div>
    </div>
  );
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
  );
}
