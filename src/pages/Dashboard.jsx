export default function Dashbord({ name, college, course, year, semester }) {
  return (
    <div className="dashboard-info">
      <h2>Welcome, {name || "Student"}</h2>
      <p>College: {college || "Not Selected"}</p>
      <p>Course: {course || "Not Selected"}</p>
      <p>Year: {year || "Not Selected"}</p>
      <p>Semester: {semester || "Not Selected"}</p>
    </div>
  );
}
