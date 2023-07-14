import "./fail-button.css";
import { useState } from "react";
interface Props {
  wasSuccessfulPr: boolean;
  toggleWasSuccessfulPr: () => void;
}

const failColor: string = "var(--text-color)";
const successColor: string = "var(--not-set-color)";

export function FailButton({ wasSuccessfulPr, toggleWasSuccessfulPr }: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <span
      style={{
        color: isHovering === wasSuccessfulPr ? failColor : successColor,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        toggleWasSuccessfulPr();
        setIsHovering(false);
      }}
      className="fail-button"
    >
      {" "}
      Fail
    </span>
  );
}
