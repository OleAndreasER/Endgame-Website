import { del, get, post, put } from "../misc/fetch-methods";
import { LogEntry, Sets } from "./log-entry";

export const addNextLogEntry = async (): Promise<LogEntry | null> => {
  const addedLogEntry: LogEntryFromServer | null = await post(`log`);
  if (addedLogEntry === null) return null;
  return toLogEntry(addedLogEntry);
};

export const undoLogEntry = async (): Promise<void> => {
  del(`log`);
};

export const getLog = async (): Promise<LogEntry[] | null> => {
  const logFromServer: LogEntryFromServer[] | null = await get(`log`);
  if (logFromServer === null) return null;
  return logFromServer.map(toLogEntry);
};

export const getNextLogEntries = async (
  logs: number
): Promise<LogEntry[] | null> => {
  const logFromServer: LogEntryFromServer[] | null = await get(
    `log/next/${logs}`
  );
  if (logFromServer === null) return null;
  return logFromServer.map(toLogEntry);
};

export const setLogEntry = async (
  logEntry: LogEntry,
  i: number
): Promise<void> => {
  await put(`log/${i}`, {
    ...logEntry,
    sessions: Object.entries(logEntry.sessions),
  });
};

interface LogEntryFromServer {
  label: string;
  liftsInOrder: string[];
  sessionMap: {
    [lift: string]: SetFromServer[];
  };
}

interface SetFromServer {
  lift: string;
  reps: number;
  setType: {
    contents?: boolean;
    tag: "PR" | "Work";
  };
  weight: number;
}

// PR sets are always considered unique here.
const setsAreEqual = (set1: SetFromServer, set2: SetFromServer): boolean =>
  set1.lift === set2.lift &&
  set1.reps === set2.reps &&
  set1.weight === set2.weight &&
  set1.setType.tag === "Work" &&
  set2.setType.tag === "Work";

const groupSets = (individualSets: SetFromServer[]): Sets[] => {
  const groupedSets: Sets[] = [];
  let temporaryGroup: SetFromServer[] = [];

  const addGroup = (): void => {
    const representativeSet: SetFromServer = temporaryGroup[0];
    const sets: number = temporaryGroup.length;
    groupedSets.push({
      lift: representativeSet.lift,
      reps: representativeSet.reps,
      setType: representativeSet.setType.tag,
      wasSuccessfulPr: representativeSet.setType.contents,
      weight: representativeSet.weight,
      sets: sets,
    });
  };

  for (const set of individualSets) {
    if (temporaryGroup.length === 0 || setsAreEqual(set, temporaryGroup[0])) {
      temporaryGroup.push(set);
    } else {
      addGroup();
      temporaryGroup = [set];
    }
  }
  addGroup();

  return groupedSets;
};

const toLogEntry = (logEntryFromServer: LogEntryFromServer): LogEntry => {
  const sessionsGroupedAndOrdered: { [lift: string]: Sets[] } = {};
  for (const lift of logEntryFromServer.liftsInOrder) {
    const session = logEntryFromServer.sessionMap[lift];
    sessionsGroupedAndOrdered[lift] = groupSets(session);
  }

  return {
    label: logEntryFromServer.label,
    sessions: sessionsGroupedAndOrdered,
  };
};
