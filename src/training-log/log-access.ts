import { get } from "../misc/fetchMethods";
import { LogEntry } from "./log-entry";

export const getLog = (): Promise<LogEntry[]> => get("log/");

export const getNextLogEntry = (): Promise<LogEntry> => get("next/");
