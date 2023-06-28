import { useEffect, useState, useContext } from "react";
import { Lifts } from "./lifts";
import { getLifts } from "./lifts-access";
import "./lift-page.css";
import { UserContext } from "../authentication/user-provider";
import { Cycle } from "./cycle/cycle";
import { liftGroupColor } from "../config/lift-group-color";
import { Program } from "../program/program";
import { getProgram } from "../program/program-access";

export function LiftsPage() {
  const { currentUser } = useContext(UserContext);
  const [lifts, setLifts] = useState<Lifts | undefined>();
  const [cycleIndex, setCycleIndex] = useState<number>(0);
  const [program, setProgram] = useState<Program | undefined>();

  useEffect(() => {
    if (!currentUser) return;
    getLifts(currentUser.id).then(setLifts);
    getProgram(currentUser.id).then(setProgram);
  }, [currentUser]);

  const setLiftGroupPosition = (index: number, position: number): void => {
    setLifts((lifts) => {
      if (!lifts) return undefined;
      const updatedLiftGroupPositions: number[] = [...lifts.liftGroupPositions];
      updatedLiftGroupPositions[index] = position;
      return { ...lifts, liftGroupPositions: updatedLiftGroupPositions };
    });
  };

  return (
    <div className="lifts-page">
      {lifts ? (
        <>
          <p>Bodyweight: {lifts?.bodyweight}</p>
          {program?.liftGroupCycles.map((items: string[], i) => (
            <Cycle
              itemWidth={100}
              items={items}
              activeItemIndex={lifts.liftGroupPositions[i]}
              setActiveItemIndex={(position) =>
                setLiftGroupPosition(i, position)
              }
              activeItemColor={`#${liftGroupColor[i]}`}
            />
          ))}
          <table className="lifts-table">
            <tbody>
              <tr>
                <th></th>
                <th>PR</th>
                <th>Cycle</th>
              </tr>
              {Object.entries(lifts.stats).map(([lift, liftStats]) => (
                <tr>
                  <th>{lift}</th>
                  <td>{liftStats.pr}kg</td>
                  <td>
                    {liftStats.cyclePosition + 1}/{liftStats.cycleLength}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
