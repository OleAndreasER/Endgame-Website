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

export const getLifts = async (userId: string): Promise<Lifts> => {
  const stats: Stats = await get(`stats`);
  return toLifts(stats);
};

export const setLifts = (userId: string, lifts: Lifts): Promise<void> =>
  put(`stats`, toStats(lifts));
