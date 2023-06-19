import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { UserContext } from "../authentication/user-provider";
import { useContext } from "react";

export function UserProfile() {
  const { setCurrentUser } = useContext(UserContext);
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
    </>
  );
}
