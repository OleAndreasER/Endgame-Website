import { liftGroupColor } from "../../config/lift-group-color";
import { LogEntry } from "../log-entry";
import {
  LogEntryHeader,
  LogEntryTime,
} from "../log-entry-header/log-entry-header";
import "./log-entry-table.css";
import { useState } from "react";

interface Props {
  logEntry: LogEntry;
  time: LogEntryTime;
}

const maybePlural = (x: number, unit: string): string => {
  if (x === 1) return `${x} ${unit}`;
  return `${x} ${unit}s`;
};

export function LogEntryTable({ logEntry, time }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LogEntryHeader
        isHovered={isHovered}
        time={time}
        label={logEntry.label}
      />
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
    </div>
  );
}
