"use client"

import { useState } from "react"
import { Bell, Globe, Moon, Save, Shield, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import'./global.css';

export default function SettingsPage() {
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("english")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [browserNotifications, setBrowserNotifications] = useState(true)
  const [issueAssignedNotifications, setIssueAssignedNotifications] = useState(true)
  const [issueUpdatedNotifications, setIssueUpdatedNotifications] = useState(true)
  const [issueResolvedNotifications, setIssueResolvedNotifications] = useState(true)

  const handleSaveSettings = (e) => {
    e.preventDefault()
    // In a real app, you would save the settings to the backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">General Settings</CardTitle>
              <CardDescription>Manage your basic account settings</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input
                    id="display-name"
                    defaultValue="Dr. John Smith"
                    className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.smith@university.edu"
                    className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger
                      id="language"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <SelectValue placeholder="Select language" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger
                      id="timezone"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    >
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-12">UTC-12:00</SelectItem>
                      <SelectItem value="utc-11">UTC-11:00</SelectItem>
                      <SelectItem value="utc-10">UTC-10:00</SelectItem>
                      <SelectItem value="utc-9">UTC-09:00</SelectItem>
                      <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                      <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                      <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                      <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                      <SelectItem value="utc-4">UTC-04:00</SelectItem>
                      <SelectItem value="utc-3">UTC-03:00</SelectItem>
                      <SelectItem value="utc-2">UTC-02:00</SelectItem>
                      <SelectItem value="utc-1">UTC-01:00</SelectItem>
                      <SelectItem value="utc">UTC+00:00</SelectItem>
                      <SelectItem value="utc+1">UTC+01:00</SelectItem>
                      <SelectItem value="utc+2">UTC+02:00</SelectItem>
                      <SelectItem value="utc+3">UTC+03:00</SelectItem>
                      <SelectItem value="utc+4">UTC+04:00</SelectItem>
                      <SelectItem value="utc+5">UTC+05:00</SelectItem>
                      <SelectItem value="utc+5:30">UTC+05:30 (India)</SelectItem>
                      <SelectItem value="utc+6">UTC+06:00</SelectItem>
                      <SelectItem value="utc+7">UTC+07:00</SelectItem>
                      <SelectItem value="utc+8">UTC+08:00</SelectItem>
                      <SelectItem value="utc+9">UTC+09:00</SelectItem>
                      <SelectItem value="utc+10">UTC+10:00</SelectItem>
                      <SelectItem value="utc+11">UTC+11:00</SelectItem>
                      <SelectItem value="utc+12">UTC+12:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 border-t border-primary/10">
                <Button type="submit" className="ml-auto gap-1 bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="email-notifications" className="text-base">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="browser-notifications" className="text-base">
                          Browser Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={browserNotifications}
                      onCheckedChange={setBrowserNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>

                <Separator className="bg-primary/10" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="issue-assigned" className="text-base">
                        Issue Assigned
                      </Label>
                      <p className="text-sm text-muted-foreground">When an issue is assigned to you</p>
                    </div>
                    <Switch
                      id="issue-assigned"
                      checked={issueAssignedNotifications}
                      onCheckedChange={setIssueAssignedNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="issue-updated" className="text-base">
                        Issue Updated
                      </Label>
                      <p className="text-sm text-muted-foreground">When an issue you're assigned to is updated</p>
                    </div>
                    <Switch
                      id="issue-updated"
                      checked={issueUpdatedNotifications}
                      onCheckedChange={setIssueUpdatedNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="issue-resolved" className="text-base">
                        Issue Resolved
                      </Label>
                      <p className="text-sm text-muted-foreground">When an issue is marked as resolved</p>
                    </div>
                    <Switch
                      id="issue-resolved"
                      checked={issueResolvedNotifications}
                      onCheckedChange={setIssueResolvedNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 border-t border-primary/10">
                <Button type="submit" className="ml-auto gap-1 bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                  <RadioGroup
                    defaultValue="light"
                    value={theme}
                    onValueChange={setTheme}
                    className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3"
                  >
                    <div>
                      <RadioGroupItem
                        value="light"
                        id="theme-light"
                        className="peer sr-only"
                        aria-label="Light theme"
                      />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Sun className="mb-3 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" aria-label="Dark theme" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="system"
                        id="theme-system"
                        className="peer sr-only"
                        aria-label="System theme"
                      />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">OS</span>
                        </div>
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="bg-primary/10" />

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger
                      id="font-size"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    >
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduce-motion" className="text-base">
                      Reduce Motion
                    </Label>
                    <Switch id="reduce-motion" defaultChecked={false} className="data-[state=checked]:bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reduce the amount of animations and transitions in the interface
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 border-t border-primary/10">
                <Button type="submit" className="ml-auto gap-1 bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-black">Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                    />
                  </div>
                </div>

                <Separator className="bg-primary/10" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <Label htmlFor="two-factor" className="text-base">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Switch id="two-factor" defaultChecked={false} className="data-[state=checked]:bg-primary" />
                  </div>
                </div>

                <Separator className="bg-primary/10" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <div className="rounded-md border border-primary/20 p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows • Last active: Just now</p>
                        </div>
                        <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Previous Session</p>
                          <p className="text-xs text-muted-foreground">Safari on macOS • Last active: 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Log Out
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10"
                  >
                    Log Out of All Devices
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 border-t border-primary/10">
                <Button type="submit" className="ml-auto gap-1 bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
