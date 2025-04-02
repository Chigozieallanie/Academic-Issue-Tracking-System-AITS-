import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

function Issuestatus() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/issues`).then((response) => {
      setIssues(response.data);
      console.log(response)
    }).catch((error) => {
      console.error("Failed", error);
    });
  }, []);


  return (
    <div>
      <div className="status-container">
        <div>
          <h2>Issue Statuses</h2>
          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <Issue issues={issues} />
          )}
        </div>
      </div>
    </div>
  )

//     return (
//         <div>
//            <div className="status-container">
//               <h2>Issue Status</h2>
//                   <div className={``}>
//                     <p><strong>Issue #555555</strong></p>
//                     <p><strong>Category:</strong> category</p>
//                     <p><strong>Description:</strong> description</p>
//                     <p><strong>Submitted on:</strong> timestamp</p>
//                     <p><strong>Status:</strong> status</p>
//                     <p><strong>Document:</strong> documentName</p>
//                     <p><strong>Lecturer:</strong> lecturer</p>
//                     <p><strong>Course Code:</strong> courseCode</p>
//             </div>
//             </div>
//         </div>
//     )
}

function Issue({ issues }) {

  // return <>hello {issues[0].course}</>

  return (
    <>
    {issues.map((issue) =>
      <div key={issue.id} className="bg-red-200 p-3 my-3">
        <p><strong>Issue #{issue.id}</strong></p>
        <p><strong>Course:</strong> {issue.course}</p>
        <p><strong>Description:</strong> {issue.description}</p>
        <p><strong>Submitted on:</strong> {issue.created_at}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Student:</strong> {issue.student}</p>
      </div>
    )}
    </>
  );
}

export default Issuestatus
