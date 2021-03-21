import React, { useState, useEffect } from "react";
import { signin, isAuth, authenticate } from "../../actions/auth";
import Link from "next/link";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
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
  const { email, password, error, success, message, loading } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    signin({ email, password }).then((data) => {
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
        authenticate(data, () => {
          Router.push("/");
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
  const signinForm = () => {
    return (
      <div className="container col-md-8 mt-5" style={{ margin: "auto" }}>
        <div className="row justify-content-center mb-5">
          <h2>Signin</h2>
        </div>
        {showError()}
        {showMessage()}

        <form onSubmit={handleSubmit}>
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
            Not Registerd <Link href="/signup">signup</Link>
          </p>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {signinForm()}
      {showLoading()}
    </React.Fragment>
  );
};
export default SigninComponent;
