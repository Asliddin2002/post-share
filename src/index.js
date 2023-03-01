import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import process from "process";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const id = process.env.REACT_APP_GOOGLE_API_TOKEN;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={id}>
    <Router>
      <App />
    </Router>
    <NotificationContainer />
  </GoogleOAuthProvider>
);
