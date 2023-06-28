export interface Program {
  liftGroupCycles: string[][];
  liftGroup: {
    [lift: string]: number;
  };
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
