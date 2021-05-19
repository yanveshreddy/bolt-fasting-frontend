import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { validate } from "./validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../services/authService";
// import history from "../../helpers/history";

const Register = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // setErrors(validate(values));
    if (Object.keys(errors).length === 0 && isSubmitting) {
      registerUser(values);
    }
  }, [errors]);

  let registerUser = async (values) => {
    let response = await AuthService.register(values);
    setIsSubmitting(false);

    if (response.data.status === 200) {
      // history.push("/");
    }
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);

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
        <div className="row bg-card">
          <div className="col-12 col-md-7  login-part d-flex flex-column justify-content-center">
            {/* <div className=" align-items-center"> */}
            <div className=" ml-auto mt-5 pt-5 pb-5">
              <h2 className="card-title">Sign Up for free</h2>

              {/* <p>
                Need an account ?{" "}
                <Link to="register" className="text-primary">
                  Create an Account
                </Link>
              </p> */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6 mb-0">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      autoComplete="off"
                      className={`form-control ${
                        errors.firstName && "text-danger"
                      }`}
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <p className={`form-control-error text-danger`}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className={`form-control ${
                        errors.lastName && "text-danger"
                      }`}
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <p className="form-control-error">{errors.lastName}</p>
                    )}
                  </div>
                </div>

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
                <div className="form-group ">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmpassword && "text-danger"
                    }`}
                    id="confirm-password"
                    name="confirmpassword"
                    value={values.confirmpassword}
                    placeholder="confirm-password"
                    onChange={handleChange}
                  />
                  {errors.confirmpassword && (
                    <p className="form-control-error text-danger">
                      {errors.confirmpassword}
                    </p>
                  )}
                </div>
                <div className="mb-1">
                  <button
                    type="submit"
                    className="btn btn-primary align-self-stretch"
                  >
                    Create Account
                  </button>
                </div>

                <div className="d-flex flex-row align-items-start justify-content-start mt-2">
                  <p>Already Have an account ?</p>
                  <Link to="/" className="ml-2 text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
            {/* </div> */}
          </div>

          <div className="col-12  col-md-5 pt-4 d-flex flex-column justify-content-center cta-part">
            <h1 className="text-center heading">Loose Weight for Good</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
