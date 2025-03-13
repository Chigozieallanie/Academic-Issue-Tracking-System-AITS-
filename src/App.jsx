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
import Issuestatus from "./pages/Issuestatus";
import Logout from "./pages/Logout";
import Welcome from "./components/Welcome/Welcome";
import Verificationcode from "./Signupxx/Verificationcode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/verificationcode" element={<Verificationcode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<StudentDashboard />}>
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
          <Route path="/issueStatus" element={<Issuestatus />} />
          <Route path="/Logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
