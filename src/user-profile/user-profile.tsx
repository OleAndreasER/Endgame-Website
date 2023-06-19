import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { User } from "../authentication/user";
import { UserContext } from "../authentication/user-provider";
import { useContext } from "react";

export function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return (
    <>
      <GoogleLogin
        onSuccess={(credentalToken) => {
          if (credentalToken.credential) {
            const userInfo: any = jwt_decode(credentalToken.credential);
            setCurrentUser({ name: userInfo.name, id: userInfo.sub });
          }
        }}
        onError={() => console.log("Login failed.")}
      />
      <p>{currentUser?.name}</p>
      <p>{currentUser?.id}</p>
    </>
  );
}
