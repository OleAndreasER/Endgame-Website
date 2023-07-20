import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../authentication/user-provider";
import "./login-page.css";
import { useContext } from "react";

export function LoginPage() {
  const { logIn } = useContext(UserContext);

  return (
    <main className="login-page">
      <div className="login-box">
        <h1>Endgame</h1>
        <input placeholder="Email" className="text-input login-input" />
        <input
          placeholder="Password"
          className="text-input login-input"
          type="password"
        />
        <button className="standard-button login-button">Log in</button>

        <GoogleLogin
          onSuccess={logIn}
          onError={() => console.log("Login failed.")}
        />
      </div>
    </main>
  );
}
