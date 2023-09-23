import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";
import "./nav-bar.css";
import { NavLink } from "./nav-link/nav-link";
import { useContext } from "react";

export function NavBar() {
  const { profileName } = useContext(TrainingProfileContext);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="nav-space" />
      <nav>
        <NavLink path="/" text="Training Log" />
        <div className="only-desktop">
          <NavLink path="/lifts" text="Lifts" />
        </div>
        <div className="only-desktop">
          <NavLink path="/program" text="Program" />
        </div>
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
