import { LogEntry } from "../log-entry";
import "./log-entry-table.css";

interface Props {
  logEntry: LogEntry;
}

const liftGroupColor: string[] = ["445E93", "B6174B", "306B34"];

const maybePlural = (x: number, unit: string): string => {
  if (x === 1) return `${x} ${unit}`;
  return `${x} ${unit}s`;
};

export function LogEntryTable({ logEntry }: Props) {
  return (
    <>
      <p>{logEntry.label}</p>
      <table>
        {logEntry.liftsInOrder.map((lift, i) =>
          logEntry.sessionMap[lift].map((session) => (
            <tr className={session.setType.contents === false ? "fail" : ""}>
              <th style={{ backgroundColor: "#" + liftGroupColor[i] }}>
                {session.lift}
              </th>
              <td>{session.setType.tag}</td>
              <td>{maybePlural(1, "set")}</td>
              <td>{maybePlural(session.reps, "rep")}</td>
              <td>{session.weight}kg</td>
            </tr>
          ))
        )}
        <tr></tr>
      </table>
    </>
  );
}
