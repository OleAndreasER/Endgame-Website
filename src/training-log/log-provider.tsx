import React, { useState, useEffect } from "react";
import { LogEntry } from "./log-entry";
import { addNextLogEntry, getLog, getNextLogEntries } from "./log-access";

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
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextLogEntries, setNextLogEntries] = useState<LogEntry[]>([]);
  const [nextLogEntryCount, setNextLogEntryCount] = useState<number>(1);

  useEffect(() => {
    getLog().then(setLog);
    getNextLogEntries(5).then(setNextLogEntries);
  }, []);

  return (
    <LogContext.Provider
      value={{
        log: nextLogEntries.slice(0, nextLogEntryCount).reverse().concat(log),

        addNextLogEntry: () => {
          setNextLogEntryCount(nextLogEntryCount + 1);
          if (nextLogEntryCount >= nextLogEntries.length) {
            getNextLogEntries(nextLogEntryCount + 5).then(setNextLogEntries);
          }
        },

        addNextLogEntryToLog: () => {
          addNextLogEntry().then((addedLogEntry) => {
            setNextLogEntryCount(1);
            getNextLogEntries(5).then(setNextLogEntries);
            setLog((previousLog) => [addedLogEntry, ...previousLog]);
          });
        },
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
