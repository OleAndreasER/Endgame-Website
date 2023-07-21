export interface Program {
  liftGroupCycles: string[][];
  liftGroup: {
    [lift: string]: number;
  };
  liftCycles: {
    [lift: string]: Sets[][];
  };
  isBodyweight: {
    [lift: string]: boolean;
  };
  progression: {
    [lift: string]: number;
  };
}

export interface Sets {
  lift: string;
  percent: number;
  sets: number;
  reps: number;
  setType: "PR" | "Work";
}

export interface PresetProgram {
  name: String;
  program: Program;
  wasMadeByUser: boolean;
}
