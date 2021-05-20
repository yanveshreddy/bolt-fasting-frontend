import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./index.css";
import { validate } from "./validate";
import AuthService from "../../services/authService";
// import history from "../../helpers/history";

const Login = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  // let { onChange } = props;
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      loginUser(values);
    }
  }, [errors, isloggedIn]);

  let loginUser = async (values) => {
    let response = await AuthService.login(values);
    console.log(response);
    setIsSubmitting(false);
    if (response.status === 200) {
      // history.push("/dashboard");
      const { history } = props;

      // Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace("/dashboard");
      // onChange(true);
      setIsLoggedIn(true);
    } else {
      setErrors((errors) => ({
        ...errors,
        password: "Invalid Password",
      }));
    }
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
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
