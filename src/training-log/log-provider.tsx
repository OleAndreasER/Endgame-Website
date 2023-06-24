import React, { useState, useEffect, useContext } from "react";
import { LogEntry } from "./log-entry";
import { addNextLogEntry, getLog, getNextLogEntries } from "./log-access";
import { UserContext } from "../authentication/user-provider";

interface Props {
  children: JSX.Element;
}

interface LogContextValue {
  log: LogEntry[];
  addNextLogEntry: () => void;
  addNextLogEntryToLog: () => void;
}

export const LogContext = React.createContext<LogContextValue>(
  {} as LogContextValue
);

export const LogProvider = ({ children }: Props) => {
  const { currentUser } = useContext(UserContext);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextLogEntries, setNextLogEntries] = useState<LogEntry[]>([]);
  const [nextLogEntryCount, setNextLogEntryCount] = useState<number>(1);

  useEffect(() => {
    if (currentUser) {
      getLog(currentUser.id).then(setLog);
      getNextLogEntries(currentUser.id, 5).then(setNextLogEntries);
    }
  }, [currentUser]);

  return (
    <LogContext.Provider
      value={{
        log: nextLogEntries.slice(0, nextLogEntryCount).reverse().concat(log),

        addNextLogEntry: () => {
          if (!currentUser) return;
          setNextLogEntryCount(nextLogEntryCount + 1);
          if (nextLogEntryCount >= nextLogEntries.length) {
            getNextLogEntries(currentUser.id, nextLogEntryCount + 5).then(
              setNextLogEntries
            );
          }
        },

        addNextLogEntryToLog: () => {
          if (!currentUser) return;
          addNextLogEntry(currentUser.id).then((addedLogEntry) => {
            setNextLogEntryCount(1);
            getNextLogEntries(currentUser.id, 5).then(setNextLogEntries);
            setLog((previousLog) => [addedLogEntry, ...previousLog]);
          });
        },
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
