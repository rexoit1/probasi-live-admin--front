//react
import React, { useState } from "react";

// routing
import { Link } from "react-router-dom"

// action
import { sendEmail } from "../store/admin/action";
//redux
import { connect } from "react-redux";

const OtpPage = (props) => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError("Email is Required!");
    props.sendEmail({ email });

    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  return (
    <>
      <div className="login-page back__style">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-12 col-lg-4">
              <div className="card login-box-container">
                <div className="card-body">
                  <div className="authent-text">
                    <p className="text-danger mb-4 h5">Enter OTP</p>
                    <p>You will get a OTP Via Email</p>
                  </div>
                  <form autoComplete="off">
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (!e.target.value) {
                              return setError("Email is Required !");
                            } else {
                              return setError("");
                            }
                          }}
                        />
                        <label htmlFor="floatingPassword">OTP</label>
                      </div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-danger m-b-xs" onClick={handleSubmit}>
                        Send
                      </button>
                      <Link to="/"><p className="text-info mt-2"><i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Take me back to Login!</p></Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { sendEmail })(OtpPage);
