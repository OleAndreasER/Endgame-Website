import { useState, useContext } from "react";
import { UserContext } from "../../user-provider";
import { useKeyDown } from "../../../misc/useKeyDown";

interface Props {
  switchToSignUp: () => void;
}

export function LogIn({ switchToSignUp }: Props) {
  const { logIn } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const logInWithErrorMessage = async () => {
    const gotLoggedIn: boolean = await logIn(email, password);
    if (!gotLoggedIn) {
      setErrorMessage("Try again!");
    }
  };

  useKeyDown(
    () => {
      logInWithErrorMessage();
    },
    ["Enter"],
    [email, password]
  );

  return (
    <>
      <div className="error-message">{errorMessage}</div>
      <input
        placeholder="Email"
        type="email"
        className="text-input login-input"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="Password"
        className="text-input login-input"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <div className="adjacent login-buttons">
        <button
          onClick={() => {
            logInWithErrorMessage();
          }}
          className="standard-button login-button"
        >
          Log in
        </button>
        <div onClick={() => switchToSignUp()} className="link signin-button">
          Sign up
        </div>
      </div>
    </>
  );
}
