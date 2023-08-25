import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <Router>
        <App />
      </Router>
  </AuthContext>
 
);
