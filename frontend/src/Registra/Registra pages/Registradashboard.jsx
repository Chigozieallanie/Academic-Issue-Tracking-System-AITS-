import React from 'react';

const RegistrarDashboard = () => {
  const issues = [
    {
      title: "EXAM MARKS",
      description: "Missing my exam mark for programing...",
      status: "pending",
      createdBy: "KIGOZI ALLAN",
      createdOn: "4/23/2025",
      assignedTo: "CHIGOZIE ALLANIE"
    },
    {
      title: "End of Sem 1 marks",
      description: "Issue with semester marks...",
      status: "pending",
      createdBy: "UNKNOWN",
      createdOn: "4/20/2025",
      assignedTo: "ADMIN"
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>MAK-AITS</h2>
        <div style={styles.nav}>
          <div style={styles.navItem}>🏠 Dashboard</div>
          <div style={styles.navItem}>📋 Issues</div>
          <div style={styles.navItem}>👤 Profile</div>
        </div>
        <div style={styles.profileBox}>
          <div style={styles.profileIcon}>oi</div>
          <div>
            <div style={styles.name}>okedi ismail</div>
            <div style={styles.role}>Academic registrar</div>
          </div>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <h2>Academic Registrar Dashboard</h2>
          <p>Welcome back, okedi!</p>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>6</div>
            <div>Total Issues</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>3</div>
            <div>Pending</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>0</div>
            <div>In Progress</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>3</div>
            <div>Resolved</div>
          </div>
        </div>

        <div style={styles.priorityContainer}>
          <h3>Priority Issues</h3>
          <button style={styles.viewAllBtn}>View All Issues</button>
          {issues.map((issue, index) => (
            <div key={index} style={styles.issueCard}>
              <div style={styles.issueHeader}>
                <strong>{issue.title}</strong>
                <span style={styles.statusBadge}>{issue.status}</span>
              </div>
              <p>{issue.description}</p>
              <small>
                Created by: {issue.createdBy} | Created: {issue.createdOn} | Assigned to: {issue.assignedTo}
              </small>
              <br />
              <button style={styles.reviewBtn}>Review Issue</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    backgroundColor: '#eafeea',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#141c2b',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    marginTop: '30px',
  },
  navItem: {
    marginBottom: '20px',
    cursor: 'pointer',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingTop: '20px',
    borderTop: '1px solid #333',
  },
  profileIcon: {
    backgroundColor: '#2c2c54',
    color: 'white',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    textAlign: 'center',
    lineHeight: '35px',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
  },
  role: {
    fontSize: '12px',
    color: '#ccc',
  },
  main: {
    flex: 1,
    padding: '30px',
  },
  header: {
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    minWidth: '120px',
    boxShadow: '0 0 5px #ccc',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2b0a4b',
  },
  priorityContainer: {
    position: 'relative',
  },
  viewAllBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#751d00',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  issueCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 0 5px #ccc',
  },
  issueHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusBadge: {
    backgroundColor: '#f5a623',
    color: 'white',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '12px',
  },
  reviewBtn: {
    marginTop: '10px',
    backgroundColor: '#1e0040',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default RegistrarDashboard;
