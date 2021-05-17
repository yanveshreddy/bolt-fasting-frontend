import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { validate } from "./validate";

const Login = ({ handleCallBack, message }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // let { handleCallBack, message } = props;
  // console.log(message);
  useEffect(() => {
    // setErrors(validate(values));
    if (Object.keys(errors).length === 0 && isSubmitting) {
      loginUser(values);
    }
  }, [errors]);

  let loginUser = async (values) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    };
    console.log(options.body);
    let url = "http://localhost:3001/login";
    try {
      let response = await fetch(url, options);
      let resData = await response.json();
      localStorage.setItem("authToken", resData.data);
      console.log(isSubmitting);
      handleCallBack(true);
    } catch (error) {
      console.log(error);
    }

    await setIsSubmitting(false);
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    await setErrors(validate(values));
    await setIsSubmitting(true);

    // console.log(values);
  };

  const handleChange = (event) => {
    event.persist();
    // setErrors(validate(values));
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 login-part d-flex flex-column justify-content-center">
            {/* <div className=" align-items-center"> */}
            <div className="bg-card">
              <h2 className="card-title">Login</h2>

              <p>
                Need an account ?{" "}
                <Link to="register" className="text-primary">
                  Create an Account
                </Link>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email && "text-danger"}`}
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="form-control-error text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="form-group ">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password && "text-danger"
                    }`}
                    id="password"
                    name="password"
                    value={values.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="form-control-error text-danger">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary align-self-stretch"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>
          <div className="col-12  col-md-4 d-flex flex-column justify-content-center cta-part">
            <h1 className="text-center heading">Loose Weight for Good</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
