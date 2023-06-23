export interface LogEntry {
  label: string;
  sessions: {
    [lift: string]: Sets[];
  };
}

export interface Sets {
  sets: number;
  lift: string;
  reps: number;
  setType: "PR" | "Work";
  wasSuccessfulPr?: boolean;
  weight: number;
}
