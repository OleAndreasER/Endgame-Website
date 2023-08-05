import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../authentication/user-provider";
import "./login-page.css";
import { useContext, useState } from "react";
import { login } from "./login-access";

export function LoginPage() {
  const { logIn } = useContext(UserContext);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  return (
    <main className="login-page">
      <div className="login-box">
        <h1>Endgame</h1>
        <div className="bottom">
          {isSigningUp ? (
            <>
              <input
                placeholder="Username"
                className="text-input login-input"
              />
              <input
                placeholder="Email"
                type="email"
                className="text-input login-input"
              />
              <input
                placeholder="Password"
                className="text-input login-input"
                type="password"
              />
              <input
                placeholder="Confirm Password"
                className="text-input login-input"
                type="password"
              />
              <div className="adjacent login-buttons">
                <button className="standard-button login-button">
                  Sign up
                </button>
                <div
                  onClick={() => setIsSigningUp(false)}
                  className="link signin-button"
                >
                  Log in
                </div>
              </div>
            </>
          ) : (
            <>
              <input
                placeholder="Email"
                type="email"
                className="text-input login-input"
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                className="text-input login-input"
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />

              <div className="adjacent login-buttons">
                <button
                  onClick={async () => {
                    console.log(await login(loginEmail, loginPassword));
                  }}
                  className="standard-button login-button"
                >
                  Log in
                </button>
                <div
                  onClick={() => setIsSigningUp(true)}
                  className="link signin-button"
                >
                  Sign up
                </div>
              </div>

              <GoogleLogin
                onSuccess={logIn}
                onError={() => console.log("Login failed.")}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
