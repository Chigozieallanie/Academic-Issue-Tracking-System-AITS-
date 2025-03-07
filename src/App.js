import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginxx/Login";
import About from "./loginxx/About";
import Signup from "./Signupxx/signup";
import Dashboard from "./student dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  );

}
  export default App;