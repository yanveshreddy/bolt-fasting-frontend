import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const Register = () => {
  return (
    <>
      <div className="bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 login-part d-flex flex-column justify-content-center">
              {/* <div className=" align-items-center"> */}
              <div className="bg-card">
                <h2 class="card-title">Sign Up for free</h2>

                {/* <p>
                Need an account ?{" "}
                <Link to="register" className="text-primary">
                  Create an Account
                </Link>
              </p> */}
                <form>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="Name"
                      autoComplete="off"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      id="confirm-password"
                      placeholder="confirm-password"
                    />
                  </div>
                  <div>
                    <button class="btn btn-primary align-self-stretch">
                      Create Account
                    </button>
                  </div>

                  <div class="d-flex flex-row align-items-start justify-content-start mt-2">
                    <p>Already Have an account ?</p>
                    <Link to="/" className="ml-2 text-primary">
                      Login
                    </Link>
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

      {/* <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card">
            <h2 class="card-title text-center">Sign Up for free</h2>
            <div class="card-body py-md-4">
              <form _lpchecked="1">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Name"
                    autoComplete="off"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="confirm-password"
                    placeholder="confirm-password"
                  />
                </div>
                <div>
                  <button class="btn btn-primary align-self-stretch">
                    Create Account
                  </button>
                </div>

                <div class="d-flex flex-row align-items-start justify-content-start mt-2">
                  <p>Already Have an account ?</p>
                  <Link to="/" className="ml-2">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Register;
