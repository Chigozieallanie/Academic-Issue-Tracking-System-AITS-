import React, { useState } from "react";
import "./Verificationcode.css";
import { useNavigate } from "react-router-dom";

const Verificationcode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleVerification = () => {};
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
    navigate("/login");
  };

  return (
    <div className="verification-body">
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
        <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
        <p>Empowering students through seamless issue resolution</p>
      </div>
    </div>
  );
};

export default Verificationcode;
