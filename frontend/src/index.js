import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import { Provider } from "react-redux"; //to emplaiment in our app we need to imoprt provider
import store from "./store";
import "./index.css";
import "antd/dist/antd.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
