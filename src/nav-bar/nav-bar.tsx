import { UserContext } from "../authentication/user-provider";
import { getProfileName } from "../training-profile/profile-access";
import "./nav-bar.css";
import { NavLink } from "./nav-link/nav-link";
import { useContext, useEffect, useState } from "react";

export function NavBar() {
  const { currentUser } = useContext(UserContext);
  const [profileName, setProfileName] = useState<string | undefined>();

  useEffect(() => {
    if (!currentUser) return;
    getProfileName(currentUser.id).then(setProfileName);
  }, [currentUser]);

  return (
    <>
      <div className="nav-space" />
      <nav>
        <NavLink path="/" text="Training Log" />
        <NavLink path="/lifts" text="Lifts" />
        <NavLink path="/program" text="Program" />
        <NavLink
          path="/training-profile"
          text={profileName ? profileName : "profile"}
        />
        <NavLink
          path="/user-profile"
          text={currentUser ? currentUser.name : "Log in"}
        />
      </nav>
    </>
  );
}
