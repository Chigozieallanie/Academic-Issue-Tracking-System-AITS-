import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div style={styles.sidebar}>
    <h2 style={styles.logo}>MAK-AITS</h2>
    <nav>
      <Link to="/" style={styles.link}>🏠 Dashboard</Link>
      <Link to="/issues" style={styles.link}>📋 Issues</Link>
      <Link to="/profile" style={styles.link}>👤 Profile</Link>
    </nav>
    <div style={styles.profileBox}>
      <div style={styles.profileIcon}>oi</div>
      <div>
        <div style={styles.name}>okedi ismail</div>
        <div style={styles.role}>Academic registrar</div>
      </div>
    </div>
  </div>
);

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#141c2b',
    color: 'white',
    padding: '20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  link: {
    display: 'block',
    margin: '20px 0',
    color: 'white',
    textDecoration: 'none',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderTop: '1px solid #333',
    paddingTop: '20px'
  },
  profileIcon: {
    backgroundColor: '#2c2c54',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    textAlign: 'center',
    lineHeight: '35px',
    fontWeight: 'bold'
  },
  name: { fontWeight: 'bold' },
  role: { fontSize: '12px', color: '#ccc' }
};

export default Sidebar;
