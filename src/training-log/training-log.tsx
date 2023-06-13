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
          {logEntry.liftsInOrder.map((lift) =>
            logEntry.sessionMap[lift].map((session) => (
              <tr>
                <th>{session.lift}</th>
                <td>{session.setType.tag}</td>
                <td>{session.reps} reps</td>
                <td>{session.weight}kg</td>
              </tr>
            ))
          )}
          <tr></tr>
        </table>
      ))}
    </>
  );
}
