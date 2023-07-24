import { get } from "../misc/fetch-methods";
import { PresetProgram, Program, Sets } from "./program";

export const getProgram = async (userId: string): Promise<Program> => {
  const programFromServer: ProgramFromServer = await get(`/program/${userId}`);
  return toProgram(programFromServer);
};

export const getPrograms = async (userId: string): Promise<PresetProgram[]> => {
  const presetProgramsFromServer: PresetProgramFromServer[] = await get(
    `/programs/${userId}`
  );
  return presetProgramsFromServer.map((presetProgramFromServer) => ({
    ...presetProgramFromServer,
    program: toProgram(presetProgramFromServer.program),
  }));
};

interface ProgramFromServer {
  isBodyweightMap: {
    [lift: string]: boolean;
  };
  progressionMap: {
    [lift: string]: number;
  };
  liftGroupCycles: string[][];
  liftsInOrder: string[];
  liftCycleMap: {
    [lift: string]: SetFromServer[][];
  };
}

interface SetFromServer {
  lift: string;
  percent: number;
  reps: number;
  setType: "PR" | "Work";
}

interface PresetProgramFromServer {
  name: String;
  program: ProgramFromServer;
  wasMadeByUser: boolean;
}

export const toServerProgram = (program: Program): ProgramFromServer => {
  const liftCycleMap: { [lift: string]: SetFromServer[][] } = {};
  for (const [lift, liftCycle] of Object.entries(program.liftCycles)) {
    liftCycleMap[lift] = liftCycle.map((session) =>
      session.flatMap((sets) =>
        new Array(sets.sets).fill({
          lift: sets.lift,
          percent: sets.percent,
          reps: sets.reps,
          setType: sets.setType,
        })
      )
    );
  }

  return {
    isBodyweightMap: program.isBodyweight,
    progressionMap: program.progression,
    liftGroupCycles: program.liftGroupCycles,
    liftsInOrder: Object.keys(program.liftCycles),
    liftCycleMap: liftCycleMap,
  };
};

const toProgram = (program: ProgramFromServer): Program => {
  const liftCyclesInOrder: { [lift: string]: Sets[][] } = {};
  for (const lift of program.liftsInOrder) {
    liftCyclesInOrder[lift] = program.liftCycleMap[lift].map(groupSets);
  }

  const liftGroup: { [lift: string]: number } = {};
  program.liftGroupCycles.forEach((liftGroupCycle, i) => {
    for (const lift of liftGroupCycle) {
      liftGroup[lift] = i;
    }
  });

  return {
    liftGroup: liftGroup,
    liftGroupCycles: program.liftGroupCycles,
    liftCycles: liftCyclesInOrder,
    progression: program.progressionMap,
    isBodyweight: program.isBodyweightMap,
  };
};

const groupSets = (individualSets: SetFromServer[]): Sets[] => {
  const groupedSets: Sets[] = [];
  let temporaryGroup: SetFromServer[] = [];

  const addGroup = (): void => {
    const representativeSet: SetFromServer = temporaryGroup[0];
    const sets: number = temporaryGroup.length;
    groupedSets.push({
      ...representativeSet,
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

// PR sets are always considered unique here.
const setsAreEqual = (set1: SetFromServer, set2: SetFromServer): boolean =>
  set1.lift === set2.lift &&
  set1.reps === set2.reps &&
  set1.percent === set2.percent &&
  set1.setType === "Work" &&
  set2.setType === "Work";
