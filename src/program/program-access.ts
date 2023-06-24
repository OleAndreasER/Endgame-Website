import { get } from "../misc/fetchMethods";
import { Program } from "./program";

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
    [lift: string]: Set[][];
  };
}

interface Set {
  lift: string;
  percent: number;
  reps: number;
  setType: "PR" | "Work";
}

const toProgram = (program: ProgramFromServer): Program => {
  const liftCyclesInOrder: { [lift: string]: Set[][] } = {};
  for (const lift of program.liftsInOrder) {
    liftCyclesInOrder[lift] = program.liftCycleMap[lift];
  }

  return {
    liftGroupCycles: program.liftGroupCycles,
    liftCycles: liftCyclesInOrder,
    progression: program.progressionMap,
    isBodyweight: program.isBodyweightMap,
  };
};

export const getProgram = async (userId: string): Promise<Program> => {
  const programFromServer: ProgramFromServer = await get(`/program/${userId}`);
  return toProgram(programFromServer);
};
