import React from "react";

const RoleSelection = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select Your Role</h1>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button}>Register as Student</button>
        <button style={styles.button}>Register as Lecturer</button>
        <button style={styles.button}>Register as Academic Registrar</button>
      </div>
      
      <p style={styles.loginText}>Already have an account? <a href="#" style={styles.loginLink}>Login</a></p>
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
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textAlign: "center",
    width: "100%",
  },
  loginText: {
    marginTop: "30px",
    color: "#666",
    fontSize: "14px",
  },
  loginLink: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default RoleSelection;