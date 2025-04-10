import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./loginxx/Login";
import About from "./loginxx/About";
import Signup from "./Signupxx/signup";
import Profile from "./pages/Profile";
import StudentDashboard from "./Studentdashboard/Dashboard";
import Mycourse from "./pages/My course";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import IssueList from "./pages/IssueList";
import Logout from "./pages/Logout";
import Welcome from "./components/Welcome/Welcome";
import Verificationcode from "./Signupxx/Verificationcode";
import Notifications from "./pages/Notifications";
import RegistraSignup from "./Registra/Registra signup";
import RegistraLogin from "./Registra/Registralogin";
import Registradashboard from "./Registra/Registra pages/Registradashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/registra signup" element={<RegistraSignup />} />
        <Route path="/registralogin" element={<RegistraLogin />} />
        <Route path="/registradashboard" element={<Registradashboard />} />
        <Route path="/verificationcode" element={<Verificationcode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentdashboard" element={<StudentDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="/reportissue" element={<ReportIssue name="Allan" />} />
          <Route
            path="my-course"
            element={
              <Mycourse
                college="COCIS"
                course="CC1232"
                courseUnits={["arch", "sda"]}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/issueList" element={<IssueList />} />
          <Route path="/Logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}
