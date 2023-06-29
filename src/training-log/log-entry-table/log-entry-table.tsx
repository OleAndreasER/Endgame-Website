import { liftGroupColor } from "../../config/lift-group-color";
import { LogEntry } from "../log-entry";
import "./log-entry-table.css";

interface Props {
  logEntry: LogEntry;
}

const maybePlural = (x: number, unit: string): string => {
  if (x === 1) return `${x} ${unit}`;
  return `${x} ${unit}s`;
};

export function LogEntryTable({ logEntry }: Props) {
  return (
    <>
      <table className="log-entry-table">
        <tbody>
          {Object.entries(logEntry.sessions).map(([lift, session], i) =>
            session.map((sets, j) => (
              <tr
                key={j}
                className={sets.wasSuccessfulPr === false ? "fail" : ""}
              >
                <th style={{ backgroundColor: "#" + liftGroupColor[i] }}>
                  {sets.lift}
                </th>
                <td>{sets.setType}</td>
                <td>{maybePlural(sets.sets, "set")}</td>
                <td>{maybePlural(sets.reps, "rep")}</td>
                <td>{sets.weight}kg</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
