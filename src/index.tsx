import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import { UserProvider } from "./authentication/user-provider";
import { TrainingProfileProvider } from "./training-profile/training-profile-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserProvider>
    <TrainingProfileProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TrainingProfileProvider>
  </UserProvider>
);
