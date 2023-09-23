import { useContext, useState } from "react";
import { UserContext } from "../../user-provider";
import { SignUpResult } from "../../user-access";
import { useKeyDown } from "../../../misc/use-key-down";
interface Props {
  switchToLogin: () => void;
}

export function SignUp({ switchToLogin }: Props) {
  const { signUp } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  useKeyDown(
    () => {
      signUpWithErrorMessage();
    },
    ["Enter"],
    [password, passwordConfirm, username, email]
  );

  const signUpWithErrorMessage = async () => {
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const signUpResult: SignUpResult | null = await signUp(
      username,
      email,
      password
    );

    if (signUpResult === null) {
      setErrorMessage("Something went wrong");
      return;
    }

    if (!signUpResult.wasSuccess && signUpResult.failureReason !== undefined) {
      setErrorMessage(signUpResult.failureReason);
    }
  };

  return (
    <>
      <div className="error-message">{errorMessage}</div>
      <input
        placeholder="Username"
        className="text-input login-input"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        placeholder="Confirm Password"
        className="text-input login-input"
        type="password"
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
      <div className="adjacent login-buttons">
        <button
          className="standard-button login-button"
          onClick={() => signUpWithErrorMessage()}
        >
          Sign up
        </button>
        <div onClick={() => switchToLogin()} className="link signin-button">
          Log in
        </div>
      </div>
    </>
  );
}
