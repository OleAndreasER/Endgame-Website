import { get } from "../misc/fetchMethods";
import { LogEntry } from "./log-entry";

export const getLog = (): Promise<LogEntry[]> => get("log/");

export const getNextLogEntries = async (logs: number): Promise<[LogEntry]> => {
  const logEntry: [LogEntry] = await get(`log/next/${logs}`);
  return logEntry;
};
