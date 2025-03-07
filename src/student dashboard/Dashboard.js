import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
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
          {["Dashboard", "Profile", "My Course", "Report Issue", "Issue Status", "Logout"].map((section) => (
            <li key={section} className={activeSection === section ? "active" : ""} onClick={() => setActiveSection(section)}>
              {section}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>MAKERERE UNIVERSITY</h1>
          <p>Academic Issue Tracking System</p>
        </header>

        <div className="content">
          {activeSection === "Dashboard" && (
            <div className="dashboard-info">
              <h2>Welcome, {name || "Student"}</h2>
              <p>College: {college || "Not Selected"}</p>
              <p>Course: {course || "Not Selected"}</p>
              <p>Year: {year || "Not Selected"}</p>
              <p>Semester: {semester || "Not Selected"}</p>
            </div>
          )}

          {activeSection === "Profile" && (
            <div className="profile-container">
              <h2>Edit Your Profile</h2>

              <label>Upload Profile Photo:</label>
              <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
              {profilePhoto && <p>Photo uploaded: {profilePhoto.name}</p>}

              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              <input type="text" placeholder="Registration Number" value={regNo} onChange={(e) => setRegNo(e.target.value)} />

              <label>College:</label>
              <select value={college} onChange={(e) => setCollege(e.target.value)}>
                <option value="">Select College</option>
                <option value="College of Agricultural and Environmental Sciences">College of Agricultural and Environmental Sciences(CAES)</option>
                <option value="College of Business and Management Sciences">College of Business and Management Sciences(COBAMS)</option>
                <option value="College of Computing and Information Sciences">College of Computing and Information Sciences(COCIS)</option>
                <option value="College of Education and External Studies">College of Education and External Studies(COEES)</option>
                <option value="College of Engineering, Design, Art and Technology">College of Engineering, Design, Art and Technology(CEDAT)</option>
                <option value="College of Health Sciences">College of Health Sciences(COHS)</option>
                <option value="College of Humanities and Social Sciences">College of Humanities and Social Sciences(CHUSS)</option>
                <option value="College of Veterinary Medicine, Animal Resources & Bio-security">College of Veterinary Medicine, Animal Resources & Bio-security(COVABS)</option>
                <option value="The School of Law">The School of Law(SOL)</option>
              </select>

              <label>Course:</label>
              <select value={course} onChange={handleCourseChange}>
                <option value="">Select Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information System & Technology">Information System & Technology</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Library & Information Sciences">Library & Information Science</option>
                <option value="Law">Law</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Economics">Economics</option>
                <option value="Social Work & Social Administration">Social Work & Social Administration</option>
                <option value="Journalism & Communication">Journalism & Communication</option>  
                <option value="Agricultural Engineering">Agricultural Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>    
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>  
                <option value="Biomedical Engineering">Biomedical Engineering</option>
                <option value="Veterinary Medicine">Veterinary Medicine</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine">Medicine</option>
                <option value="Economics">Economics</option>
                <option value="History">History</option>
              </select>

              <label>Year:</label>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select Year</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>

              <label>Semester:</label>
              <select value={semester} onChange={handleSemesterChange}>
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>

              <button onClick={() => setProfileSaved(true)}>Save Profile</button>
              {profileSaved && <p className="success-message">Profile saved successfully!</p>}
            </div>
          )}

          {activeSection === "My Course" && (
            <div className="course-container">
              <h2>My Course Details</h2>
              <p>You are currently enrolled in <strong>{course || "a course"}</strong> under the <strong>{college || "selected college"}</strong>.</p>
              {courseUnits.length > 0 && (
                <div>
                  <h3>Course Units:</h3>
                  <ul>
                    {courseUnits.map((unit, index) => (
                      <li key={index}>{unit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;