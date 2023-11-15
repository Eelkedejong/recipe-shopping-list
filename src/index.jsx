import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./utils/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense fallback="loading">
    <App />
  </React.Suspense>
);
