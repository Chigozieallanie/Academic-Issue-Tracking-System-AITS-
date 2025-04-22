import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AtSign, KeyRound, User } from "lucide-react";

export default function LecturerSignup() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup logic
    console.log("Form submitted:", formValues);
    navigate("/lecturerlogin"); // Redirect to Lecturer Login after signup
  };

  return (
    <div className="min-h-screen bg-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Lecturer Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleChange}
                className="pl-10 w-full border rounded-md p-2"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={handleChange}
                className="pl-10 w-full border rounded-md p-2"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                className="pl-10 w-full border rounded-md p-2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2 rounded-md hover:bg-primary/90"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/lecturerlogin" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

