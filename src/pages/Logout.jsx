import { Link } from "react-router-dom";
import React from "react";

function Logout() {
  return (
    <div className="logout-container">
      <h2>Are you sure you want to logout?</h2>

      <Link to="/dashboard">
        <button>Cancel</button>
      </Link>
      <Link to="/login">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default Logout;
