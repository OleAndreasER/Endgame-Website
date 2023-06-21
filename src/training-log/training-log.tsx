import { useContext } from "react";
import { LogEntryTable } from "./log-entry-table/log-entry-table";
import "./training-log.css";
import { LogContext } from "./log-provider";
const upArrow = require("../image/up-arrow.png");
const addImage = require("../image/add.png");

export function TrainingLog() {
  const { log, addNextLogEntry } = useContext(LogContext);

  return (
    <div className="training-log">
      <div>
        {log.map((logEntry, i) => (
          <>
            <p>{logEntry.label}</p>
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
