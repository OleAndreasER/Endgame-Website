export interface Lifts {
  bodyweight: number;
  liftGroupPositions: number[];
  stats: {
    [lift: string]: {
      cycleLength: number;
      cyclePosition: number;
      pr: number;
    };
  };
}
