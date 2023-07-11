import { useContext } from "react";
import { LogEntryTable } from "./log-entry-table/log-entry-table";
import "./training-log.css";
import { LogEntryTime } from "./log-entry-header/log-entry-header";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";
const upArrow = require("../image/up-arrow.png");

export function TrainingLog() {
  const { log, nextLog, addToNextLog, resetNextLog } = useContext(
    TrainingProfileContext
  );

  return log !== undefined && nextLog !== undefined ? (
    <main className="triple-grid">
      <div />
      <div className="training-log">
        {nextLog.map((logEntry, i) =>
          logEntry.label === "1." ? (
            <LogEntryTable
              key={i}
              logEntry={logEntry}
              time={LogEntryTime.Next}
            />
          ) : (
            <LogEntryTable
              key={i}
              logEntry={logEntry}
              time={LogEntryTime.Future}
            />
          )
        )}
        {log.map((logEntry, i) => (
          <LogEntryTable
            logEntryIndex={i}
            key={i}
            logEntry={logEntry}
            time={LogEntryTime.Past}
          />
        ))}
      </div>
      <div>
        <div className="arrows">
          <img
            src={upArrow}
            onClick={addToNextLog}
            className="up-arrow"
            alt="more next logs"
          />
          {nextLog.length > 1 ? (
            <img
              src={upArrow}
              onClick={resetNextLog}
              className="down-arrow"
              alt="reset"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  ) : (
    <></>
  );
}
