import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../authentication/user-provider";
import { useContext } from "react";

export function UserProfile() {
  const { currentUser, logIn, logOut } = useContext(UserContext);
  return (
    <>
      {currentUser ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <GoogleLogin
          onSuccess={logIn}
          onError={() => console.log("Login failed.")}
        />
      )}
    </>
  );
}
