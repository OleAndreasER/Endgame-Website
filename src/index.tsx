import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./authentication/user-provider";
import { LogProvider } from "./training-log/log-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="544677426730-ia6ma18673hla2hu03bekqc1orfjo5id.apps.googleusercontent.com">
    <UserProvider>
      <LogProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LogProvider>
    </UserProvider>
  </GoogleOAuthProvider>
);
