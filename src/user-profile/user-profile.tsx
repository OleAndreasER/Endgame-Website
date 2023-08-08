import { UserContext } from "../authentication/user-provider";
import { useContext } from "react";

export function UserProfile() {
  const { logOut } = useContext(UserContext);
  return (
    <main>
      <button className="standard-button" onClick={logOut}>
        Log out
      </button>
    </main>
  );
}
