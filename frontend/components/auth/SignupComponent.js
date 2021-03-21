import React, { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import Link from "next/link";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    message: "",
    loading: "",
  });
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);
  const { name, email, password, error, success, message, loading } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    const user = { name: name, email: email, password: password };
    signup(user).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          error: "",
          loading: false,
          success: true,
          message: data.message,
        });
      }
    });
  };
  const showLoading = () => {
    return loading ? <div className="alert alert-info">Loading...</div> : "";
  };

  const showError = () => {
    return error ? <div className="alert alert-danger">{error}</div> : "";
  };

  const showMessage = () => {
    return message ? <div className="alert alert-info">{message}</div> : "";
  };
  const togglepassword = () => {
    if (document.getElementById("mypass").type == "text") {
      document.getElementById("mypass").type = "password";
    } else {
      document.getElementById("mypass").type = "text";
    }
  };
  const signupForm = () => {
    return (
      <div className="container col-md-8 mt-5 " style={{ margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center mb-5">
            <h2>Signup</h2>
          </div>
          {showError()}
          {showMessage()}
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              value={name}
              onChange={handleChange("name")}
              id="myname"
              type="text"
              className="form-control"
              required
            ></input>
          </div>

          <fieldset className="form-group">
            <label className="text-muted">Email</label>
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              id="myemail"
              className="form-control"
              required
            />
            <span className="bmd-help">
              We'll never share your email with anyone else.
            </span>
          </fieldset>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              value={password}
              onChange={handleChange("password")}
              id="mypass"
              type="password"
              className="form-control"
              required
              minLength="8"
            ></input>
            <input type="checkbox" onClick={() => togglepassword()} />
            <span> show password</span>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div>
          <p className="info">
            Already Registerd <Link href="/signin">signin</Link>
          </p>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {signupForm()}
      {showLoading()}
    </React.Fragment>
  );
};
export default SignupComponent;
