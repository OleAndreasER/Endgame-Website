import { LogIn } from "./log-in/log-in";
import "./login-page.css";
import { useState } from "react";
import { SignUp } from "./sign-up/sign-up";

export function LoginPage() {
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  return (
    <main className="login-page">
      <div className="login-box">
        <h1>Endgame</h1>
        <div className="bottom">
          {isSigningUp ? (
            <SignUp switchToLogin={() => setIsSigningUp(false)} />
          ) : (
            <LogIn switchToSignUp={() => setIsSigningUp(true)} />
          )}
        </div>
      </div>
    </main>
  );
}
