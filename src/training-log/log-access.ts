import { get } from "../misc/fetchMethods";
import { LogEntry } from "./log-entry";

export const getLog = (): Promise<LogEntry[]> => get("log/");

export const getNextLogEntry = async (): Promise<LogEntry> => {
  const logEntry: LogEntry = await get("next/");
  if (logEntry.label === "Next: ") {
    logEntry.label = "Next Workout";
  }
  return logEntry;
};
