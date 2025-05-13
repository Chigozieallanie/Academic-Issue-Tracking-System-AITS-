import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const RoleSelection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.roleContainer}> {/* New container for the Select Role section */}
        <h1 style={styles.title}>Select Your Role</h1>
        
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Register as Student</button>
          <button style={styles.button}>Register as Lecturer</button>
          <button style={styles.button}>Register as Academic Registrar</button>
        </div>
        
        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/Login" style={styles.loginLink}>Login</Link> {/* Link to the login page */}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    backgroundImage: "url('/mainbuilding.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  roleContainer: { // New style for the Select Role container
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#333333",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "280px",
    marginBottom: "25px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#020335",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    textAlign: "center",
    width: "100%",
    fontWeight: "500",
    color: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  },
  loginText: {
    marginTop: "10px",
    color: "#666666",
    fontSize: "14px",
  },
  loginLink: {
    color: "#4285f4",
    textDecoration: "none",
    fontWeight: "500",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default RoleSelection;