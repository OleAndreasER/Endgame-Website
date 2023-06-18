import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="544677426730-ia6ma18673hla2hu03bekqc1orfjo5id.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
