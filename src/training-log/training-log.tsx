import { useEffect, useState } from "react";
import { LogEntry } from "./log-entry";
import { getLog } from "./log-access";

export function TrainingLog() {
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    getLog().then(setLog);
  });

  return (
    <>
      {log.map((logEntry) => (
        <table>
          <tr>
            <th>{logEntry.label}</th>
          </tr>
          {logEntry.liftsInOrder.map((lift) => (
            <tr>
              <th>{lift}</th>
            </tr>
          ))}
          <tr></tr>
        </table>
      ))}
    </>
  );
}
