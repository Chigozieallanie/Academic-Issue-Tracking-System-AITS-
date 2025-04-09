"use client"

import { useState } from "react"
import { AtSign, Mail, Phone, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import'./global.css';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would update the profile in the backend
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information and contact details</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative h-24 w-24 rounded-full bg-primary/10">
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-primary">
                    JS
                  </span>
                </div>
                <div className="flex flex-col space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-medium">Dr. John Smith</h3>
                  <p className="text-sm text-muted-foreground">Computer Science Department</p>
                  <div className="flex justify-center space-x-2 sm:justify-start">
                    <Button type="button" variant="outline" size="sm" disabled={!isEditing}>
                      Upload Photo
                    </Button>
                    <Button type="button" variant="ghost" size="sm" disabled={!isEditing}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Dr. John Smith"
                    className="pl-10"
                    defaultValue="Dr. John Smith"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.smith@university.edu"
                    className="pl-10"
                    defaultValue="john.smith@university.edu"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Computer Science"
                  defaultValue="Computer Science"
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                  defaultValue="Professor of Computer Science with a focus on Artificial Intelligence and Machine Learning. Teaching CS101, CS202, and CS303 this semester."
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-1">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Email Notifications</h3>
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Issue Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications when new issues are assigned to you
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Security</h3>
              <div className="rounded-md border p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your password to keep your account secure</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
                    Change Password
                  </Button>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}