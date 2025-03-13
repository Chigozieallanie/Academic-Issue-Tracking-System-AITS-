import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import { useState } from "react";

function ReportIssue({
  courseCodes,
  setCourseCode,
  courseCode,
  lecturers,
  setCategory,
  issueCategories,
  category,
  regNo,
  studentId,
  newIssue,
  setNewIssue,
  setDocument,
  handleReportIssue,
  name,
  document
}) {
  const [description, setDescription] = useState("");
  const [lecturer, setLecturer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      console.log("Description is required", description);
    } else {
      console.log("Description is valid");
      handleReportIssue();
    }
  }

  return (
    <div className="issue-container">
      <Form onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>

        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Student ID:</strong> {studentId}
        </p>
        <p>
          <strong>Registration Number:</strong> {regNo}
        </p>

        <label>Select Issue Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {issueCategories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Select Lecturer:</label>
        <select
          value={lecturer}
          onChange={(e) => {
            console.log(e.target.value);
            setLecturer(e.target.value);
          }}
        >
          <option value="">Select Lecturer</option>
          {lecturers?.map((lect) => (
            <option key={lect} value={lect}>
              {lect}
            </option>
          ))}
        </select>

        <label>Select Course Code:</label>
        <select
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        >
          <option value="">Select Course Code</option>
          {courseCodes?.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />

        <label>Attach Document:</label>
        <input type="file" onChange={(e) => setDocument(e.target.files[0])} />
        {document && <p>Document attached: {document.name}</p>}
        <Button>Submit Issues</Button>
      </Form>
    </div>
  );
}

export default ReportIssue;
