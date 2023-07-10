import { useImmer } from "use-immer";
import { liftGroupColor } from "../../config/lift-group-color";
import { LogEntry } from "../log-entry";
import {
  LogEntryHeader,
  LogEntryTime,
} from "../log-entry-header/log-entry-header";
import "./log-entry-table.css";
import { useEffect, useState } from "react";

interface Props {
  logEntry: LogEntry;
  time: LogEntryTime;
}

interface Input {
  value: string;
  color: string;
}

interface LogEntryInput {
  reps: Input;
  sets: Input;
  weight: Input;
}

const maybePlural = (x: number, unit: string): string => {
  if (x === 1) return unit;
  return `${unit}s`;
};

export function LogEntryTable({ logEntry, time }: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [logEntryEdit, updateLogEntryEdit] = useImmer<LogEntry | undefined>(
    undefined
  );
  const [logEntryInputs, updateLogEntryInputs] = useImmer<
    LogEntryInput[][] | undefined
  >(undefined);

  useEffect(() => {
    if (isEditing) {
      updateLogEntryEdit(JSON.parse(JSON.stringify(logEntry)));
      updateLogEntryInputs(
        Object.values(logEntry.sessions).map((session) =>
          session.map((sets) => ({
            reps: {
              value: `${sets.reps}`,
              color: "var(--text-color)",
            },
            sets: {
              value: `${sets.sets}`,
              color: "var(--text-color)",
            },
            weight: {
              value: `${sets.weight}`,
              color: "var(--text-color)",
            },
          }))
        )
      );
    } else {
      updateLogEntryEdit(undefined);
    }
  }, [isEditing]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <LogEntryHeader
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        isHovering={isHovering}
        time={time}
        label={logEntry.label}
      />
      {logEntryEdit === undefined || logEntryInputs === undefined ? (
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
                  <td>{`${sets.sets} ${maybePlural(sets.sets, "set")}`}</td>
                  <td>{`${sets.reps} ${maybePlural(sets.reps, "rep")}`}</td>
                  <td>{sets.weight}kg</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <table className="log-entry-table">
          <tbody>
            {Object.entries(logEntryEdit.sessions).map(([lift, session], i) =>
              session.map((sets, j) => (
                <tr
                  key={j}
                  className={sets.wasSuccessfulPr === false ? "fail" : ""}
                >
                  <th style={{ backgroundColor: "#" + liftGroupColor[i] }}>
                    {sets.lift}
                  </th>
                  <td>{sets.setType}</td>
                  <td>
                    <input
                      className="text-input"
                      value={logEntryInputs[i][j].sets.value}
                      style={{
                        width: "2em",
                        color: logEntryInputs[i][j].sets.color,
                      }}
                      onChange={(e) =>
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          if (e.target.value.length > 3) return;
                          logEntryInputs[i][j].sets.value = e.target.value;
                        })
                      }
                      onBlur={() => {
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          const originalSets: number = Object.values(
                            logEntry.sessions
                          )[i][j].sets;
                          const sets = Math.floor(
                            Number(logEntryInputs[i][j].sets.value)
                          );
                          if (
                            isNaN(sets) ||
                            sets === originalSets ||
                            sets < 0
                          ) {
                            //Reset input
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][j].sets =
                                originalSets;
                            });
                            logEntryInputs[i][j].sets.value = `${originalSets}`;
                            logEntryInputs[i][j].sets.color =
                              "var(--text-color)";
                          } else {
                            //Commit inputs to logEntryEdit
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][j].sets =
                                sets;
                            });
                            logEntryInputs[i][j].sets.value = `${sets}`;
                            logEntryInputs[i][j].sets.color =
                              "var(--edited-color)";
                          }
                        });
                      }}
                    />
                    {maybePlural(sets.sets, "set")}
                  </td>
                  <td>
                    <input
                      className="text-input"
                      style={{
                        width: "2em",
                        color: logEntryInputs[i][j].reps.color,
                      }}
                      value={logEntryInputs[i][j].reps.value}
                      onChange={(e) =>
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          if (e.target.value.length > 3) return;
                          logEntryInputs[i][j].reps.value = e.target.value;
                        })
                      }
                      onBlur={() => {
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          const originalReps: number = Object.values(
                            logEntry.sessions
                          )[i][j].reps;
                          const reps = Math.floor(
                            Number(logEntryInputs[i][j].reps.value)
                          );
                          if (
                            isNaN(reps) ||
                            reps === originalReps ||
                            reps < 0
                          ) {
                            //Reset input
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][j].reps =
                                originalReps;
                            });
                            logEntryInputs[i][j].reps.value = `${originalReps}`;
                            logEntryInputs[i][j].reps.color =
                              "var(--text-color)";
                          } else {
                            //Commit inputs to logEntryEdit
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][j].reps =
                                reps;
                            });
                            logEntryInputs[i][j].reps.value = `${reps}`;
                            logEntryInputs[i][j].reps.color =
                              "var(--edited-color)";
                          }
                        });
                      }}
                    />
                    {maybePlural(sets.reps, "rep")}
                  </td>
                  <td>
                    <input
                      className="text-input"
                      style={{
                        width: "4em",
                        color: logEntryInputs[i][j].weight.color,
                      }}
                      value={logEntryInputs[i][j].weight.value}
                      onChange={(e) =>
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          if (e.target.value.length > 6) return;
                          logEntryInputs[i][j].weight.value = e.target.value;
                        })
                      }
                      onBlur={() => {
                        updateLogEntryInputs((logEntryInputs) => {
                          if (logEntryInputs === undefined) return;
                          const originalWeight: number = Object.values(
                            logEntry.sessions
                          )[i][j].weight;
                          const weight = Number(
                            logEntryInputs[i][j].weight.value
                          );
                          if (
                            isNaN(weight) ||
                            weight === originalWeight ||
                            weight < 0
                          ) {
                            //Reset input
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][
                                j
                              ].weight = originalWeight;
                            });
                            logEntryInputs[i][
                              j
                            ].weight.value = `${originalWeight}`;
                            logEntryInputs[i][j].weight.color =
                              "var(--text-color)";
                          } else {
                            //Commit inputs to logEntryEdit
                            updateLogEntryEdit((logEntryEdit) => {
                              if (!logEntryEdit) return;
                              Object.values(logEntryEdit.sessions)[i][
                                j
                              ].weight = weight;
                            });
                            logEntryInputs[i][j].weight.value = `${weight}`;
                            logEntryInputs[i][j].weight.color =
                              "var(--edited-color)";
                          }
                        });
                      }}
                    />
                    kg
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
