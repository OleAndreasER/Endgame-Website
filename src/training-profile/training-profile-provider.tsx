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
  undoLogEntry,
} from "../training-log/log-access";
import { getLifts } from "../lifts/lifts-access";
import { getProgram } from "../program/program-access";
import { setLifts as storeLifts } from "../lifts/lifts-access";
import {
  createNewProfile,
  deleteProfile,
  getProfileName,
  renameProfile,
  setActiveProfile,
} from "./profile-access";
import { useImmer } from "use-immer";

interface Props {
  children: JSX.Element;
}

interface TrainingProfileContextValue {
  profileName: string | null;
  log: LogEntry[] | null;
  nextLog: LogEntry[] | null;
  lifts: Lifts | null;
  program: Program | null;
  setLifts: (lifts: Lifts) => Promise<void>;
  switchProfile: (profileName: string) => Promise<void>;
  addToNextLog: () => Promise<void>;
  addNextLogEntry: () => Promise<void>;
  resetNextLog: () => Promise<void>;
  setLogEntry: (n: number, logEntry: LogEntry) => Promise<void>;
  undoLogEntry: () => Promise<void>;
  createNewProfile: (name: string, program: Program) => Promise<void>;
  deleteProfile: (profileName: string) => Promise<void>;
  renameProfile: (oldName: string, newName: string) => Promise<void>;
}

export const TrainingProfileContext =
  React.createContext<TrainingProfileContextValue>(
    {} as TrainingProfileContextValue
  );

export function TrainingProfileProvider({ children }: Props) {
  const { currentUser } = useContext(UserContext);

  const [log, updateLog] = useImmer<LogEntry[] | null>(null);
  const [nextLog, updateNextLog] = useImmer<LogEntry[] | null>(null);
  const [nextLogSize, setNextLogSize] = useState<number>(1);

  const [lifts, setLifts] = useState<Lifts | null>(null);
  const [program, setProgram] = useState<Program | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);

  const setEmptyState = () => {
    setNextLogSize(1);
    updateNextLog(null);
    updateLog(null);
    setLifts(null);
    setProgram(null);
    setProfileName(null);
  };

  // These must be in sync.
  const fetchLiftsProgramNextEntries = async (): Promise<void> => {
    if (!currentUser) return;
    setNextLogSize(1);
    await Promise.all([
      getLifts().then(setLifts),
      getNextLogEntries(5).then(updateNextLog),
      getProgram().then(setProgram),
    ]);
  };

  const fetchTrainingProfile = async (): Promise<void> => {
    if (!currentUser) return;
    const isActiveProfile: boolean = await getProfileName().then(
      (profileName) => {
        setProfileName(profileName);
        return profileName !== null;
      }
    );
    if (!isActiveProfile) {
      setEmptyState();
      return;
    }
    fetchLiftsProgramNextEntries();
    // Independent of next entries, lifts and program.
    getLog().then(updateLog);
  };

  useEffect(() => {
    if (!currentUser) setEmptyState();
    fetchTrainingProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <TrainingProfileContext.Provider
      value={{
        log,
        nextLog: nextLog ? nextLog.slice(0, nextLogSize).reverse() : null,
        lifts,
        program,
        profileName,
        setLifts: async (lifts: Lifts): Promise<void> => {
          if (!currentUser) return;
          await storeLifts(lifts);
          await fetchLiftsProgramNextEntries();
        },
        switchProfile: async (profileName: string): Promise<void> => {
          if (!currentUser) return;
          await setActiveProfile(profileName);
          await fetchTrainingProfile();
        },
        addToNextLog: async () => {
          if (!currentUser) return;
          if (!nextLog) return;
          setNextLogSize((nextLogSize) => nextLogSize + 1);
          if (nextLogSize >= nextLog.length) {
            await getNextLogEntries(nextLogSize + 5).then(updateNextLog);
          }
        },
        addNextLogEntry: async () => {
          if (!currentUser) return;
          // Program can not be affected by adding next entry.
          const addedEntry: LogEntry | null = await addNextLogEntry();
          if (addedEntry === null) return;
          updateLog((log) => {
            if (log === null) return;
            log.unshift(addedEntry);
          });
          setNextLogSize(1);
          getNextLogEntries(5).then(updateNextLog);
          getLifts().then(setLifts);
        },
        resetNextLog: async () => {
          setNextLogSize(1);
        },
        setLogEntry: async (n, logEntry) => {
          if (!currentUser) return;
          if (
            n === 0 &&
            log !== null &&
            lifts !== null &&
            program !== null &&
            log.length > 0
          ) {
            // Have fails affect lift PRs and cycles
            const newLifts: Lifts = JSON.parse(JSON.stringify(lifts));
            const replacedEntry: LogEntry = log[0];
            for (const [lift, session] of Object.entries(logEntry.sessions)) {
              const oldWasSuccess: boolean = replacedEntry.sessions[lift].some(
                (sets) => sets.wasSuccessfulPr
              );
              const newIsSuccess: boolean = session.some(
                (sets) => sets.wasSuccessfulPr
              );
              const becomesFail: boolean = oldWasSuccess && !newIsSuccess;
              const becomesSuccess: boolean = !oldWasSuccess && newIsSuccess;
              const liftStats = newLifts.stats[lift];
              if (becomesFail) {
                liftStats.cycleLength += 1;
                if (liftStats.cycleLength === 2) {
                  liftStats.cyclePosition = 2;
                }
                liftStats.pr -= 2 * program.progression[lift];
              } else if (becomesSuccess) {
                liftStats.cycleLength -= 1;
                liftStats.cyclePosition %= liftStats.cycleLength;
                liftStats.pr += 2 * program.progression[lift];
              }
            }
            await storeLifts(newLifts).then(() => setLifts(newLifts));
          }
          await setLogEntry(logEntry, n).then(() => getLog().then(updateLog));
        },
        undoLogEntry: async () => {
          if (!currentUser) return;
          await undoLogEntry();
          await fetchLiftsProgramNextEntries();
          await getLog().then(updateLog);
        },
        createNewProfile: async (name: string, program: Program) => {
          if (!currentUser) return;
          await createNewProfile(name, program);
        },
        deleteProfile: async (name: string) => {
          if (!currentUser) return;
          await deleteProfile(name);
          //On deleting active profile
          if (profileName === name) {
            setEmptyState();
          }
        },
        renameProfile: async (oldName: string, newName: string) => {
          if (!currentUser) return;
          await renameProfile(oldName, newName);
          await getProfileName().then(setProfileName);
        },
      }}
    >
      {children}
    </TrainingProfileContext.Provider>
  );
}
