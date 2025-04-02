import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

function MyCourse({ college, course, courseUnits }) {
  const [issues, setIssues] = useState([]);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/issuesxxx`).then((response) => {
  //     setIssues(response.data);
  //   }).catch((error) => {
  //     console.error("Failed", error);
  //   });
  // }, []);

  return (
    <div className="my-course">
      <h2>My Course Details</h2>
      <p>
        You are currently enrolled in <strong>{course || "a course"}</strong>{" "}
        under the <strong>{college || "selected college"}</strong>.
      </p>
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
  );
}
export default MyCourse;
