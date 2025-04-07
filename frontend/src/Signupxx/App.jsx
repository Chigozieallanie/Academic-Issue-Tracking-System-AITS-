import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import LecturerSignup from "./LecturerSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path ="/LecturerSignup"element={<LecturerSignup/>}/>
      </Routes>
    </Router>
  );
}

export default App;