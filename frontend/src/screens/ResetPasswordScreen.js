import React, { useState } from "react";
import axios from "axios";
// import { useToasts } from "react-toast-notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
const ResetPasswordScreen = (props) => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({ email: "" });
  // const { addToast } = useToasts();
  const handleResetPassword = async () => {
    axios.post("/api/users/reset", user).then((res) => {
      if (res.status === 203) {
        alert(res.data);
        // addToast("Cet e-mail ne correspond pas à un utilisateur enregistré.", {
        //   appearance: "error",
        // });
        toast.error(t("error-message-reset-password"), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (res.status === 200) {
        alert(res.data);
        toast.success(t("succes-message-reset-password"), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          props.history.push("/");
        }, 5000);
      }
    });
    setUser({ email: "" });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{t("reset-password-test")}</h1>
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
                {t("enter-email-to-reset-password")}
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
                      {t("password-recovery")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ResetPasswordScreen;
