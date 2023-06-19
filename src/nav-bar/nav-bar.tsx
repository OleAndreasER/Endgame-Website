import { UserContext } from "../authentication/user-provider";
import "./nav-bar.css";
import { NavLink } from "./nav-link/nav-link";
import { useContext } from "react";

export function NavBar() {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <div className="nav-space" />
      <nav>
        <NavLink path="/" text="Training Log" />
        <NavLink path="/lifts" text="Lifts" />
        <NavLink path="/program" text="Program" />
        <NavLink path="/training-profile" text="Trondheim1" />
        <NavLink
          path="/user-profile"
          text={currentUser ? currentUser.name : "Log in"}
        />
      </nav>
    </>
  );
}
