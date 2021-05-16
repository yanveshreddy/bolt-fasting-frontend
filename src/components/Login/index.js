import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Login = () => {
  return (
    <div className="bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 login-part d-flex flex-column justify-content-center">
            {/* <div className=" align-items-center"> */}
            <div className="bg-card">
              <h2 class="card-title">Login</h2>

              <p>
                Need an account ?{" "}
                <Link to="register" className="text-primary">
                  Create an Account
                </Link>
              </p>
              <form>
                <div class="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <button class="btn btn-primary align-self-stretch">
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
