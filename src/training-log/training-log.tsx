import { useEffect, useState } from "react";
import { LogEntry } from "./log-entry";
import { getLog, getNextLogEntry } from "./log-access";
import { LogEntryTable } from "./log-entry-table/log-entry-table";
import "./training-log.css";

export function TrainingLog() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextLogEntries, setNextLogEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    getNextLogEntry().then((nextLogEntry) => {
      setNextLogEntries([nextLogEntry]);
    });
    getLog().then(setLog);
  }, []);

  return (
    <div className="training-log">
      <div>
        {nextLogEntries.map((nextLogEntry, i) => (
          <LogEntryTable key={i} logEntry={nextLogEntry} />
        ))}
        {log.map((logEntry, i) => (
          <LogEntryTable key={i + 1000} logEntry={logEntry} />
        ))}
      </div>
    </div>
  );
}
