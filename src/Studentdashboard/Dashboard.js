import React, { useState } from "react";
import "./Dashboard.css";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [regNo, setRegNo] = useState("");
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState("");
  const [category, setCategory] = useState("");
  const [document, setDocument] = useState(null);
  const [lecturer, setLecturer] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseUnits, setCourseUnits] = useState([]);

  const issueCategories = ["Academic", "Administrative", "Technical", "Financial", "Other"];
  const lecturers = ["Lecturer A", "Lecturer B", "Lecturer C"];
  const courseCodes = ["CS101", "CS102", "CS103"];

  const courses = {
    "Computer Science": {
      "1": ["Introduction to Programming", "Data Structures", "Discrete Mathematics"],
      "2": ["Algorithms", "Operating Systems", "Database Systems"]
    },
    "Medicine": {
      "1": ["Anatomy", "Physiology", "Biochemistry"],
      "2": ["Pathology", "Pharmacology", "Microbiology"]
    },
    "Economics": {
      "1": ["Microeconomics", "Macroeconomics", "Statistics"],
      "2": ["Econometrics", "Development Economics", "Public Finance"]
    },
    "History": {
      "1": ["Ancient History", "Medieval History", "Modern History"],
      "2": ["African History", "Asian History", "European History"]
    }
  };

  const handleReportIssue = () => {
    if (!category) {
      alert("Please select an issue category.");
      return;
    }
    if (!newIssue.trim()) {
      alert("Please enter an issue description.");
      return;
    }

    const issueData = {
      id: issues.length + 1,
      category: category,
      description: newIssue,
      timestamp: new Date().toLocaleString(),
      status: "Pending",
      documentName: document ? document.name : "No document attached",
      lecturer: lecturer,
      courseCode: courseCode,
    };

    setIssues([...issues, issueData]);
    setCategory("");
    setNewIssue("");
    setDocument(null);
    setLecturer("");
    setCourseCode("");
    alert("Issue reported successfully!");
  };

  const handleResolveIssue = (issueId) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, status: "Resolved" } : issue
      )
    );
    alert(`Issue #${issueId} has been resolved.`);
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    setCourseUnits(courses[selectedCourse][semester] || []);
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = e.target.value;
    setSemester(selectedSemester);
    setCourseUnits(courses[course][selectedSemester] || []);
  };


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>STUDENT DASHBOARD</h2>
        <ul>
          {["dashboard", "profile", "my-Course", "reportIssue", "IssueStatus", "Logout"].map((section) => (
            <NavLink to={section}>

            <li key={section} >
              {section}
            </li>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>MAKERERE UNIVERSITY</h1>
          <p>Academic Issue Tracking System</p>
        </header>

        <div className="content">
          <Outlet/>
            </div>
          {/* {activeSection === "Dashboard" && (
         
          )}



          

          
      

          {activeSection === "Report Issue" && (
            <div className="issue-container">
              <h2>Report an Issue</h2>

              <p><strong>Name:</strong> {name}</p>
              <p><strong>Student ID:</strong> {studentId}</p>
              <p><strong>Registration Number:</strong> {regNo}</p>

              <label>Select Issue Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {issueCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label>Select Lecturer:</label>
              <select value={lecturer} onChange={(e) => setLecturer(e.target.value)}>
                <option value="">Select Lecturer</option>
                {lecturers.map((lect) => (
                  <option key={lect} value={lect}>{lect}</option>
                ))}
              </select>

              <label>Select Course Code:</label>
              <select value={courseCode} onChange={(e) => setCourseCode(e.target.value)}>
                <option value="">Select Course Code</option>
                {courseCodes.map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>

              <textarea
                placeholder="Describe your issue..."
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                maxLength={200}
              />

              <label>Attach Document:</label>
              <input type="file" onChange={(e) => setDocument(e.target.files[0])} />
              {document && <p>Document attached: {document.name}</p>}

              <button onClick={handleReportIssue}>Submit Issue</button>
            </div>
          )}

          {activeSection === "Issue Status" && (
            <div className="status-container">
              <h2>Issue Status</h2>
              {issues.length === 0 ? (
                <p>No issues reported yet.</p>
              ) : (
                issues.map((issue) => (
                  <div key={issue.id} className={`issue ${issue.status.toLowerCase()}`}>
                    <p><strong>Issue #{issue.id}</strong></p>
                    <p><strong>Category:</strong> {issue.category}</p>
                    <p><strong>Description:</strong> {issue.description}</p>
                    <p><strong>Submitted on:</strong> {issue.timestamp}</p>
                    <p><strong>Status:</strong> {issue.status}</p>
                    <p><strong>Document:</strong> {issue.documentName}</p>
                    <p><strong>Lecturer:</strong> {issue.lecturer}</p>
                    <p><strong>Course Code:</strong> {issue.courseCode}</p>
                    {issue.status === "Pending" && <button onClick={() => handleResolveIssue(issue.id)}>Mark as Resolved</button>}
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === "Logout" && (
            <div className="logout-container">
              <h2>Are you sure you want to logout?</h2>
              <button onClick={() => setActiveSection("Dashboard")}>Cancel</button>
              <button onClick={() => alert("Logged out successfully!")}>Logout</button>
            </div>
          )} */}
      </div>
    </div>
  );
};

export default Dashboard;