"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AtSign, KeyRound, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import'./global.css';

export default function SignupPage() {
  const router = useRouter()
  const [contactMethod, setContactMethod] = useState("email")

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would handle the signup process here
    // For demo purposes, we'll just redirect to the verification page
    router.push("/verify")
  }

  return (
    <div className="min-h-screen bg-primary/10 flex items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md border-primary shadow-lg">
        <CardHeader className="space-y-1 border-b border-primary/20 bg-primary text-white">
          <CardTitle className="text-2xl font-bold">Lecturer Sign up</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Create an account to start managing academic issues
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6 bg-white">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                <Input
                  id="name"
                  placeholder="Dr. John Smith"
                  className="pl-10 border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email
              </Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.smith@university.edu"
                  className="pl-10 border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black font-medium">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2 p-3 rounded-md bg-primary/5 border border-primary/20">
              <Label className="text-black font-medium">Verification Method</Label>
              <RadioGroup defaultValue="email" onValueChange={(value) => setContactMethod(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" className="border-primary text-primary" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" className="border-primary text-primary" />
                  <Label htmlFor="phone">Phone Number</Label>
                </div>
              </RadioGroup>
            </div>
            {contactMethod === "phone" && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  required={contactMethod === "phone"}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-black font-medium">
                Department
              </Label>
              <Input
                id="department"
                placeholder="Computer Science"
                className="border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-primary/5 border-t border-primary/20">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
              Sign Up
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
