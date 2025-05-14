"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./global.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would verify the code here
    // For demo purposes, we'll just redirect to the dashboard
    navigate("/dashboard");
  };

  const handleResend = () => {
    // In a real app, you would resend the verification code here
    alert("Verification code resent!");
  };

  return (
    <div className="min-h-screen bg-primary/10 flex items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md border-primary shadow-lg">
        <CardHeader className="space-y-1 border-b border-primary/20 bg-primary text-white">
          <CardTitle className="text-2xl font-bold">Verification</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            We&apos;ve sent a verification code to your email. Please enter it below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6 bg-white">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary p-3">
                <span className="text-white text-lg">📧</span>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to <span className="font-medium text-black">j***@university.edu</span>
              </p>
            </div>
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  className="h-12 w-12 text-center text-lg border-primary/30 focus-visible:ring-primary focus-visible:border-primary"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                className="text-primary hover:text-primary/80"
              >
                Didn&apos;t receive a code? Resend
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-primary/5 border-t border-primary/20">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
              Verify
            </Button>
            <div className="text-center text-sm">
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Back to Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
