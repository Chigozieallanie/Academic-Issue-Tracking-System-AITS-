import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    // if (!values.email) {
    //     errors.email = "Email is required!";
    // } else if (!regex.test(values.email)) {
    //     errors.email = "This is not a valid email format!";
    // }
    if (!values.password) {
      errors.password = "Password is required";
    }
    // else if (values.password.length < 4) {
    //     errors.password = "Password must be more than 4 characters";
    // } else if (values.password.length > 10) {
    //     errors.password = "Password cannot exceed more than 10 characters";
    // }
    // if (values.password !== values.confirmPassword) {
    //     errors.confirmPassword = "Those passwords didn’t match. Try again.";
    // }
    return errors;
  };

  return (
    <>
      <div className="login-body">
        <div className="container">
          {Object.keys(formErrors).length === 0 && isSubmit
            ? // <div className="ui message success">
              //     Signed in successfully
              // </div>
              navigate("/Dashboard")
            : console.log("Entered Details", formValues)}

          <form onSubmit={handleSubmit}>
            <h1>Makerere University academic issue Tracking System</h1>
            <p1>
              <b>STUDENT LOGIN</b>
            </p1>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field">
                <label>
                  <b>Username</b>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Type your username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.username}</p>

              <div className="field">
                <label>
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button className="fluid ui button blue">Login</button>

              <div>
                <h5>
                  <b>Forgot password?</b>
                </h5>
                <Link to="/signup">
                  <h6>
                    <b>Signup</b>
                  </h6>
                </Link>
                <p>
                  © {new Date().getFullYear()} MAK-AITS. All rights reserved.
                </p>
                <p>Empowering students through seamless issue resolution</p>
              </div>
            </div>
          </form>
        </div>{" "}
      </div>
    </>
  );
}

export default Login;
