import { get } from "../misc/fetchMethods";
import { LogEntry } from "./log-entry";

export const getLog = async (): Promise<LogEntry[]> => {
  const logEntry = await get("log/");
  return [logEntry];
};
