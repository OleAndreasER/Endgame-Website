import { useContext } from "react";
import { LogEntryTable } from "./log-entry-table/log-entry-table";
import "./training-log.css";
import { LogContext } from "./log-provider";
import { LogEntryHeader } from "./log-entry-header/log-entry-header";
const upArrow = require("../image/up-arrow.png");

export function TrainingLog() {
  const { log, addNextLogEntry } = useContext(LogContext);

  return (
    <div className="training-log">
      <div>
        {log.map((logEntry, i) => (
          <>
            <LogEntryHeader key={-(i + 1)} label={logEntry.label} />
            <LogEntryTable key={i} logEntry={logEntry} />
          </>
        ))}
      </div>
      <img
        src={upArrow}
        onClick={addNextLogEntry}
        id="up-arrow"
        alt="up-arrow"
      />
    </div>
  );
}
