import { useEffect, useState, useContext } from "react";
import { Lifts } from "./lifts";
import { getLifts } from "./lifts-access";
import "./lift-page.css";
import { UserContext } from "../authentication/user-provider";
import { Cycle } from "./cycle/cycle";
import { liftGroupColor } from "../config/lift-group-color";
import { Program } from "../program/program";
import { getProgram } from "../program/program-access";
import { setLifts as storeLifts } from "./lifts-access";

export function LiftsPage() {
  const { currentUser } = useContext(UserContext);
  const [lifts, setLifts] = useState<Lifts | undefined>();
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

  const setLiftCyclePosition = (lift: string, position: number): void => {
    setLifts((lifts) => {
      if (!lifts) return undefined;
      return {
        ...lifts,
        stats: {
          ...lifts.stats,
          [lift]: {
            ...lifts.stats[lift],
            cyclePosition: position,
          },
        },
      };
    });
  };

  const setBodyweight = (weight: number): void => {
    setLifts((lifts) => {
      if (!lifts) return undefined;
      return {
        ...lifts,
        bodyweight: weight,
      };
    });
  };

  const saveChanges = () => {
    if (!currentUser) return;
    if (!lifts) return;
    storeLifts(currentUser.id, lifts).then(console.log);
  };

  return (
    <div className="lifts-page">
      {lifts !== undefined && program !== undefined ? (
        <>
          <p>
            Bodyweight:{" "}
            <input
              type="number"
              step="0.1"
              min={0}
              onChange={(e) => setBodyweight(parseFloat(e.target.value))}
              value={lifts.bodyweight}
            />
          </p>

          {program.liftGroupCycles.map((items: string[], i) => (
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
              {Object.entries(lifts.stats).map(([lift, liftStats]) => (
                <tr>
                  <th>{lift}</th>
                  <td>{liftStats.pr}kg</td>
                  <td>
                    {
                      <Cycle
                        itemWidth={80}
                        items={[
                          "PR",
                          ...Array(liftStats.cycleLength - 1).fill("Work"),
                        ]}
                        activeItemIndex={liftStats.cyclePosition}
                        setActiveItemIndex={(position) => {
                          setLiftCyclePosition(lift, position);
                        }}
                        activeItemColor={`#${
                          liftGroupColor[program.liftGroup[lift]]
                        }`}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={saveChanges}>Confirm</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
