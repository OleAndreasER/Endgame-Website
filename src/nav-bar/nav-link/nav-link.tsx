import { useLocation, useNavigate } from "react-router-dom";
import "./nav-link.css";

interface Props {
  path: string;
  text: string;
}

export function NavLink({ path, text }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <p
      onClick={() => {
        navigate(path);
      }}
      className={location.pathname === path ? "current-page" : ""}
    >
      {text}
    </p>
  );
}
