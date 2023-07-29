import "./delete-button.css";
import { useState } from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DeleteButton({ onClick }: Props) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  return isConfirming ? (
    <button onClick={onClick} className="standard-button delete-button">
      Really?
    </button>
  ) : (
    <button
      onClick={() => setIsConfirming(true)}
      className="standard-button delete-button"
    >
      Delete
    </button>
  );
}
