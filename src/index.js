import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const resizeObserverLoopErr = (err) => {
  if (
    err.message ===
    "ResizeObserver loop completed with undelivered notifications"
  ) {
    return;
  }
  throw err;
};

window.addEventListener("error", resizeObserverLoopErr);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// rootElement.render(<React.StrictMode>
//   <App />
// </React.StrictMode>);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div style={{ flexGrow: "4" }}>
      <h1>Simple Web IDE</h1>
      <App />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
