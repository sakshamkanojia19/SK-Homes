import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-5480yd8m1kj3bxbc.us.auth0.com"
      clientId="LODcZW7Sf8IXt16FAWm4EEEujpGWvvcZ"
      authorizationParams={{
        redirect_uri: "https://sk-homes-phi.vercel.app/",
      }}
      audience="http://localhost:8001"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
