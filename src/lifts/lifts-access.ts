import { get, put } from "../misc/fetch-methods";
import { Lifts } from "./lifts";

interface LiftStats {
  cycleLength: number;
  cyclePosition: number;
  pr: number;
}

// Data from server
interface Stats {
  bodyweight: number;
  liftsInOrder: string[];
  liftGroupPositions: number[];
  liftStatsMap: {
    [lift: string]: LiftStats;
  };
}

const toLifts = (stats: Stats): Lifts => {
  //stats.liftStatsMap, but in order.
  const liftStats: { [lift: string]: LiftStats } = {};
  for (const lift of stats.liftsInOrder) {
    liftStats[lift] = stats.liftStatsMap[lift];
  }

  return {
    bodyweight: stats.bodyweight,
    liftGroupPositions: stats.liftGroupPositions,
    stats: liftStats,
  };
};

const toStats = (lifts: Lifts): Stats => {
  return {
    bodyweight: lifts.bodyweight,
    liftGroupPositions: lifts.liftGroupPositions,
    liftStatsMap: lifts.stats,
    liftsInOrder: Object.keys(lifts.stats),
  };
};

export const getLifts = async (): Promise<Lifts | null> => {
  const stats: Stats | null = await get(`stats`);
  if (stats === null) return null;
  return toLifts(stats);
};

export const setLifts = async (lifts: Lifts): Promise<void> => {
  await put(`stats`, toStats(lifts));
};
