import { useEffect, useState } from "react";
import { LogEntry } from "./log-entry";
import { getLog, getNextLogEntry } from "./log-access";
import { LogEntryTable } from "./log-entry-table/log-entry-table";
import "./training-log.css";
const upArrow = require("../image/up-arrow.png");
const addImage = require("../image/add.png");

export function TrainingLog() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextLogEntry, setNextLogEntry] = useState<LogEntry>();
  const [afterNextLogEntries, setAfterNextLogEntries] = useState<LogEntry[]>(
    []
  );

  useEffect(() => {
    getNextLogEntry()
      .then((nextLogEntry) => {
        setNextLogEntry(nextLogEntry);
      })
      .catch(() => console.log("Server offline."));
    getLog().then(setLog).catch(console.error);
  }, []);

  return (
    <div className="training-log">
      <div>
        {afterNextLogEntries.map((afterNextLogEntry, i) => (
          <>
            <p>{afterNextLogEntry.label}</p>
            <LogEntryTable key={i} logEntry={afterNextLogEntry} />
          </>
        ))}

        {nextLogEntry === undefined ? null : (
          <>
            <p>
              {nextLogEntry.label}
              <img src={addImage} alt="add" id="add-image" />
            </p>

            <LogEntryTable key={0} logEntry={nextLogEntry} />
          </>
        )}

        {log.map((logEntry, i) => (
          <>
            <p>{logEntry.label}</p>
            <LogEntryTable key={0} logEntry={logEntry} />
          </>
        ))}
      </div>
      <img src={upArrow} id="up-arrow" alt="up-arrow" />
    </div>
  );
}
