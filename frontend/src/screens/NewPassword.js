import { useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";

export default function NewPassword(props) {
  const [user, setUser] = useState({
    password: "",
    token: props.match.params.token,
  });
  const { t } = useTranslation();

  const handleNewPassword = async () => {
    console.log(user);
    axios.post("/api/users/new_pass", user).then((res) => {
      if (res.status === 203) {
        alert(res.data);
        props.history.push("/");
      }
      if (res.status === 200) {
        alert(res.data);
        props.history.push("/Login");
      }
    });
    setUser({ password: "", token: "" });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //setPassword(e.target.value.password)
    console.log(user);
  };

  return (
    <section
      className="Form my-4 mx-5"
      style={{
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="row no-gutters"
          style={{
            backgroundColor: "#ced1d3",
            borderRadius: "30px",
            boxShadow: "12px 12px 22px grey",
          }}
        >
          <div className="px-5 py-5">
            <h2 className="font-weight-bold py-3">{t("enter-new-pass")}</h2>
            <form>
              <div
                className="form-row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="col-lg-7">
                  <input
                    type="password"
                    placeholder={t("new-pass-placeholer")}
                    className="form-control my-3 p-4"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div
                className="form-row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="col-lg-7"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className="btn1"
                    style={{
                      backgroundColor: "wheat",
                      height: "50px",
                      borderRadius: "15px",
                    }}
                    id="btnNewPassword"
                    onClick={handleNewPassword}
                  >
                    {t("button-rest-pass")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
