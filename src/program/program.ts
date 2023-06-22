export interface Program {
  liftGroupCycles: string[][];
  liftCycles: {
    [lift: string]: {
      lift: string;
      percent: number;
      reps: number;
      setType: "PR" | "Work";
    }[][];
  };
  isBodyweight: {
    [lift: string]: boolean;
  };
  progression: {
    [lift: string]: number;
  };
}
