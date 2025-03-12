function Issuestatus() {

    return (
        <div>
           <div className="status-container">
              <h2>Issue Status</h2>
              {/* {issues.length === 0 ? (
                <p>No issues reported yet.</p>
              ) : ( */}
                {/* // issues.map((issue) => ( */}
                  <div  className={``}>
                    <p><strong>Issue #555555</strong></p>
                    <p><strong>Category:</strong> category</p>
                    <p><strong>Description:</strong> description</p>
                    <p><strong>Submitted on:</strong> timestamp</p>
                    <p><strong>Status:</strong> status</p>
                    <p><strong>Document:</strong> documentName</p>
                    <p><strong>Lecturer:</strong> lecturer</p>
                    <p><strong>Course Code:</strong> courseCode</p>
            </div>
                    {/* {issue.status === "Pending" && <button onClick={() => handleResolveIssue(issue.id)}>Mark as Resolved</button>} */}
                  {/* </div> */}
            
              {/* )} */}
            </div>
        
        </div>
    )
}

export default Issuestatus
