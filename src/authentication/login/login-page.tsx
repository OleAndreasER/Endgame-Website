import { useKeyDown } from "../../misc/useKeyDown";
import { SignInResult } from "../user-access";
import { UserContext } from "../user-provider";
import "./login-page.css";
import { useContext, useState } from "react";

export function LoginPage() {
  const { logIn, signIn } = useContext(UserContext);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [signInEmail, setSignInEmail] = useState<string>("");
  const [signInUsername, setSignInUsername] = useState<string>("");
  const [signInPassword, setSignInPassword] = useState<string>("");
  const [signInPasswordConfirm, setSignInPasswordConfirm] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useKeyDown(
    () => {
      if (isSigningIn) {
        if (signInPassword !== signInPasswordConfirm) return;
        signIn(signInUsername, signInEmail, signInPassword);
      } else {
        logIn(loginEmail, loginPassword);
      }
    },
    ["Enter"],
    [
      isSigningIn,
      signInPassword,
      signInPasswordConfirm,
      signInUsername,
      signInEmail,
      loginEmail,
      loginPassword,
    ]
  );

  return (
    <main className="login-page">
      <div className="login-box">
        <h1>Endgame</h1>
        <div className="bottom">
          {isSigningIn ? (
            <>
              <div className="error-message">{errorMessage}</div>
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
                  onClick={async () => {
                    if (signInPassword !== signInPasswordConfirm) {
                      setErrorMessage("Passwords don't match");
                      return;
                    }

                    const signInResult: SignInResult | null = await signIn(
                      signInUsername,
                      signInEmail,
                      signInPassword
                    );

                    if (signInResult === null) {
                      setErrorMessage("Something went wrong");
                      return;
                    }

                    if (
                      !signInResult.wasSuccess &&
                      signInResult.failureReason !== undefined
                    ) {
                      setErrorMessage(signInResult.failureReason);
                    }
                  }}
                >
                  Sign up
                </button>
                <div
                  onClick={() => setIsSigningIn(false)}
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
                  onClick={() => setIsSigningIn(true)}
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
