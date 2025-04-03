import { useEffect, useState } from "react";
import axios from "axios";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = "http://localhost:8000/api/issues/";

  // Format category for display
  const formatCategory = (category) => {
    const categoryMap = {
      academic: "Academic",
      administrative: "Administrative",
      technical: "Technical",
      other: "Other",
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(BACKEND_URL);
        if (response.data && Array.isArray(response.data)) {
          setIssues(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError(`Failed to load issues: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading issues...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reported Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-600">No issues have been reported yet.</p>
      ) : (
        <div className="card shadow-sm border-0 p-4">
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="ps-4">
                      ID
                    </th>
                    <th scope="col">Category</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Lecturer</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">
                      Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="ps-4">
                        <span className="badge bg-primary bg-opacity-10 text-primary">
                          #{issue.id}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            issue.category === "academic"
                              ? "bg-info"
                              : issue.category === "administrative"
                              ? "bg-warning text-dark"
                              : issue.category === "technical"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {formatCategory(issue.category)}
                        </span>
                      </td>
                      <td className="fw-semibold">{issue.coursecode}</td>
                      <td>{issue.lecturer}</td>
                      <td>
                        <div
                          className="text-truncate"
                          style={{ maxWidth: "200px" }}
                          title={issue.description}
                        >
                          {issue.description}
                        </div>
                      </td>
                      <td className="text-center">
                        {issue.document ? (
                          <a
                            href={`http://localhost:8000${issue.document}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-file-earmark-text me-1"></i>View
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueList;
