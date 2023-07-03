import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../authentication/user-provider";
import { useContext } from "react";

export function UserProfile() {
  const { currentUser, logIn, logOut } = useContext(UserContext);
  return (
    <main>
      {currentUser ? (
        <button className="standard-button" onClick={logOut}>
          Log out
        </button>
      ) : (
        <GoogleLogin
          onSuccess={logIn}
          onError={() => console.log("Login failed.")}
        />
      )}
    </main>
  );
}
