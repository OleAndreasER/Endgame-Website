export interface LogEntry {
  label: string;
  liftsInOrder: string[];
  sessionMap: {
    [lift: string]: {
      lift: string;
      reps: number;
      setType: {
        contents: boolean;
        tag?: "PR" | "Work";
      };
      weight: number;
    }[];
  };
}
