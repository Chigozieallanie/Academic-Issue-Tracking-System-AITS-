import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LecturerSignup from "./Signupxx/LecturerSignup";
import Login from "./loginxx/Login";
import About from "./loginxx/About";
import Signup from "./Signupxx/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LecturerSignup" element={<LecturerSignup />} />
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </Router>
  );

}
  export default App;