import React, { useState } from "react";
import "./Verificationcode.css";
import { useNavigate } from "react-router-dom";

const Verificationcode = ({ handleVerification }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.trim() === "") {
      setError("Verification code is required.");
      return;
    }
    handleVerification(verificationCode);
    navigate("/login"); // Navigate to the login page after verification
  };

  return (
    <div className="verification-container">
      <h2>Enter Verification Code</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="verificationCode"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={handleChange}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Verificationcode;
