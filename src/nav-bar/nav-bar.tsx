import { useNavigate } from "react-router-dom";
import "./nav-bar.css";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav-space" />
      <nav>
        <a
          onClick={() => {
            navigate("/");
          }}
        >
          Training log
        </a>
        <a
          onClick={() => {
            navigate("/lifts");
          }}
        >
          Lifts
        </a>
        <a
          onClick={() => {
            navigate("/program");
          }}
        >
          Program
        </a>
        <a
          onClick={() => {
            navigate("/training-profile");
          }}
        >
          Trondheim1
        </a>
        <a
          onClick={() => {
            navigate("/user-profile");
          }}
        >
          OleAndreasER
        </a>
      </nav>
    </>
  );
}
