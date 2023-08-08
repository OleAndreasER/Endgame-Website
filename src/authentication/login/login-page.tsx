import { UserContext } from "../user-provider";
import "./login-page.css";
import { useContext, useState } from "react";

export function LoginPage() {
  const { logIn, signIn } = useContext(UserContext);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInUsername, setSignInUsername] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");
  const [signInPasswordConfirm, setSignInPasswordConfirm] =
    useState<string>("");

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
                onChange={(e) => {
                  setSignInUsername(e.target.value);
                }}
              />
              <input
                placeholder="Email"
                type="email"
                className="text-input login-input"
                onChange={(e) => {
                  setSignInEmail(e.target.value);
                }}
              />
              <input
                placeholder="Password"
                className="text-input login-input"
                type="password"
                onChange={(e) => {
                  setSignInPassword(e.target.value);
                }}
              />
              <input
                placeholder="Confirm Password"
                className="text-input login-input"
                type="password"
                onChange={(e) => {
                  setSignInPasswordConfirm(e.target.value);
                }}
              />
              <div className="adjacent login-buttons">
                <button
                  className="standard-button login-button"
                  onClick={() => {
                    if (signInPassword !== signInPasswordConfirm) return;
                    signIn(signInUsername, signInEmail, signInPassword);
                  }}
                >
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
                  onClick={() => {
                    logIn(loginEmail, loginPassword);
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
