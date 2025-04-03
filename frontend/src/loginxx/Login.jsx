import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Simulate login API call
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img 
            src="/mak-logo.png" 
            alt="Makerere University Logo" 
            className="logo"
          />
          <h1>Academic Issue Tracking System</h1>
          <h2>Student Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
              className={formErrors.username ? "input-error" : ""}
            />
            {formErrors.username && (
              <span className="error-message">{formErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              className={formErrors.password ? "input-error" : ""}
            />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="login-links">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </form>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
          <p className="tagline">Empowering students through seamless issue resolution</p>
        </div>
      </div>
    </div>
  );
}

export default Login;