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

  handleReportIssue,
  name,
  document
}) {
  const [description, setDescription] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      console.log("Description is required", description);
    } else {
      console.log("Description is valid");
      handleReportIssue();
    }
  }
  function handleDocumentChange(e) {
    const file = e.target.files[0];
    setSelectedDocument(file);
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
        <input type="file" onChange={handleDocumentChange} />
        {selectedDocument && <p>Document attached: {selectedDocument.name}</p>}
        <Button type="submit">Submit Issues</Button>
      </Form>
    </div>
  );
}

export default ReportIssue;
