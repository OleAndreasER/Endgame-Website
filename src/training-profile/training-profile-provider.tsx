import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../authentication/user-provider";
import { LogEntry } from "../training-log/log-entry";
import { Lifts } from "../lifts/lifts";
import { Program } from "../program/program";
import {
  addNextLogEntry,
  getLog,
  getNextLogEntries,
  setLogEntry,
} from "../training-log/log-access";
import { getLifts } from "../lifts/lifts-access";
import { getProgram } from "../program/program-access";
import { setLifts as storeLifts } from "../lifts/lifts-access";
import { getProfileName, setActiveProfile } from "./profile-access";
import { useImmer } from "use-immer";

interface Props {
  children: JSX.Element;
}

interface TrainingProfileContextValue {
  profileName: string | undefined;
  log: LogEntry[] | undefined;
  nextLog: LogEntry[] | undefined;
  lifts: Lifts | undefined;
  program: Program | undefined;
  setLifts: (lifts: Lifts) => Promise<void>;
  switchProfile: (profileName: string) => Promise<void>;
  addToNextLog: () => Promise<void>;
  addNextLogEntry: () => Promise<void>;
  resetNextLog: () => Promise<void>;
  setLogEntry: (n: number, logEntry: LogEntry) => Promise<void>;
}

export const TrainingProfileContext =
  React.createContext<TrainingProfileContextValue>(
    {} as TrainingProfileContextValue
  );

export function TrainingProfileProvider({ children }: Props) {
  const { currentUser } = useContext(UserContext);

  const [log, updateLog] = useImmer<LogEntry[] | undefined>(undefined);
  const [nextLog, updateNextLog] = useImmer<LogEntry[] | undefined>(undefined);
  const [nextLogSize, setNextLogSize] = useState<number>(1);

  const [lifts, setLifts] = useState<Lifts | undefined>();
  const [program, setProgram] = useState<Program | undefined>();
  const [profileName, setProfileName] = useState<string | undefined>();

  // These must be in sync.
  const fetchLiftsProgramNextEntries = async (): Promise<void> => {
    if (!currentUser) return;
    setNextLogSize(1);
    await Promise.all([
      getLifts(currentUser.id).then(setLifts),
      getNextLogEntries(currentUser.id, 5).then(updateNextLog),
      getProgram(currentUser.id).then(setProgram),
    ]);
  };

  const fetchTrainingProfile = async (): Promise<void> => {
    fetchLiftsProgramNextEntries();
    if (!currentUser) return;
    // Independent on next entries, lifts and program.
    getLog(currentUser.id).then(updateLog);
    getProfileName(currentUser.id).then(setProfileName);
  };

  useEffect(() => {
    if (!currentUser) {
      setNextLogSize(1);
      updateNextLog(undefined);
      updateLog(undefined);
      setLifts(undefined);
      setProgram(undefined);
      setProfileName(undefined);
    }
    fetchTrainingProfile();
  }, [currentUser]);

  return (
    <TrainingProfileContext.Provider
      value={{
        log,
        nextLog: nextLog ? nextLog.slice(0, nextLogSize).reverse() : undefined,
        lifts,
        program,
        profileName,
        setLifts: async (lifts: Lifts): Promise<void> => {
          if (!currentUser) return;
          await storeLifts(currentUser.id, lifts);
          await fetchLiftsProgramNextEntries();
        },
        switchProfile: async (profileName: string): Promise<void> => {
          if (!currentUser) return;
          await setActiveProfile(currentUser.id, profileName);
          await fetchTrainingProfile();
        },
        addToNextLog: async () => {
          if (!currentUser) return;
          if (!nextLog) return;
          setNextLogSize((nextLogSize) => nextLogSize + 1);
          if (nextLogSize >= nextLog.length) {
            await getNextLogEntries(currentUser.id, nextLogSize + 5).then(
              updateNextLog
            );
          }
        },
        addNextLogEntry: async () => {
          if (!currentUser) return;
          // Program can not be affected by adding next entry.
          const addedEntry: LogEntry = await addNextLogEntry(currentUser.id);
          updateLog((log) => {
            if (log === undefined) return;
            log.unshift(addedEntry);
          });
          setNextLogSize(1);
          getNextLogEntries(currentUser.id, 5).then(updateNextLog);
          getLifts(currentUser.id).then(setLifts);
        },
        resetNextLog: async () => {
          setNextLogSize(1);
        },
        setLogEntry: async (n, logEntry) => {
          if (!currentUser) return;
          await setLogEntry(logEntry, n, currentUser.id).then(() =>
            getLog(currentUser.id).then(updateLog)
          );
        },
      }}
    >
      {children}
    </TrainingProfileContext.Provider>
  );
}
