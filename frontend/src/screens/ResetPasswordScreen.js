import React, { useState } from "react";
import axios from "axios";
const ResetPasswordScreen = (props) => {
  const [user, setUser] = useState({ email: "" });

  const handleResetPassword = async () => {
    axios.post("/api/users/reset", user).then((res) => {
      if (res.status === 203) {
        alert(res.data);
      }
      if (res.status === 200) {
        alert(res.data);
        props.history.push("/");
      }
    });
    setUser({ email: "" });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>here we reset password for free</h1>
      <section
        className="Form my-4 mx-5"
        style={{ padding: 0, margin: 0, boxSizing: "border-box" }}
      >
        <div
          className="container my-5 "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="row no-gutters"
            style={{
              backgroundColor: "#EAE6E5",
              borderRadius: "30px",
              boxShadow: "12px 12px 22px grey",
            }}
          >
            <div className="px-5 py-5">
              <h2 className="font-weight-bold py-3">
                Please enter your e-mail address
              </h2>
              <form>
                <div
                  className="form-row"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="col-lg-7">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control my-3 p-4"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  className="form-row"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="col-lg-7" style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn btn-secondary rounded center"
                      id="btnResetPassword"
                      onClick={handleResetPassword}
                    >
                      {" "}
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordScreen;
