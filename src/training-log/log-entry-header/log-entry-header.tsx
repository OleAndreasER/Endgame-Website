import { useContext } from "react";
import { LogContext } from "../log-provider";

const addImage = require("../../image/add.png");

interface Props {
  label: string;
}

export function LogEntryHeader({ label }: Props) {
  const { addNextLogEntryToLog } = useContext(LogContext);
  return (
    <div className="log-entry-header">
      {label === "1." ? (
        <>
          Next
          <img
            onClick={addNextLogEntryToLog}
            id="add-image"
            alt="add"
            src={addImage}
          />
        </>
      ) : (
        <>{label}</>
      )}
    </div>
  );
}
