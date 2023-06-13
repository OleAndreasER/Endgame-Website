import { useLocation, useNavigate } from "react-router-dom";
import "./nav-bar.css";
import { NavLink } from "./nav-link/nav-link";

export function NavBar() {
  return (
    <>
      <div className="nav-space" />
      <nav>
        <NavLink path="/" text="Training Log" />
        <NavLink path="/lifts" text="Lifts" />
        <NavLink path="/program" text="Program" />
        <NavLink path="/training-profile" text="Trondheim1" />
        <NavLink path="/user-profile" text="OleAndreasER" />
      </nav>
    </>
  );
}
