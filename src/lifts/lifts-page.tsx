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
import { useImmer } from "use-immer";

interface Inputs {
  [name: string]: {
    value: string;
    inputColor: string;
  };
}

export function LiftsPage() {
  const { currentUser } = useContext(UserContext);
  const [lifts, setLifts] = useState<Lifts | undefined>();
  const [originalLifts, setOriginalLifts] = useState<Lifts | undefined>();
  const [program, setProgram] = useState<Program | undefined>();
  const [weightInputs, updateWeightInputs] = useImmer<Inputs | undefined>(
    undefined
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Sets up lifts, originalLifts and weightInputs.
  const fetchData = (): void => {
    if (!currentUser) return;
    getLifts(currentUser.id).then((lifts) => {
      setLifts(lifts);
      const originalLifts: Lifts = JSON.parse(JSON.stringify(lifts));
      setOriginalLifts(originalLifts);
      updateWeightInputs({});
      updateWeightInputs((weightInputs) => {
        if (!weightInputs) return;
        weightInputs["bodyweight"] = {
          value: `${lifts.bodyweight}`,
          inputColor: "var(--text-color)",
        };
        for (const [lift, { pr }] of Object.entries(lifts.stats)) {
          weightInputs[lift] = {
            value: `${pr}`,
            inputColor: "var(--text-color)",
          };
        }
      });
    });
    getProgram(currentUser.id).then(setProgram);
  };

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

  const setPr = (weight: number, lift: string): void => {
    setLifts((lifts) => {
      if (!lifts) return undefined;
      return {
        ...lifts,
        stats: {
          ...lifts.stats,
          [lift]: {
            ...lifts.stats[lift],
            pr: weight,
          },
        },
      };
    });
  };

  const commitInput = (
    inputName: string,
    originalWeight: number,
    set: (weight: number) => void
  ): void => {
    updateWeightInputs((weightInputs) => {
      if (!weightInputs) return;
      const weight = Number(weightInputs[inputName].value);
      if (weight === originalWeight || isNaN(weight) || weight < 0) {
        weightInputs[inputName].inputColor = "var(--text-color)";
        weightInputs[inputName].value = `${originalWeight}`;
        set(originalWeight);
      } else {
        weightInputs[inputName].inputColor = "var(--edited-color)";
        weightInputs[inputName].value = `${weight}`;
        set(weight);
      }
    });
  };

  const saveChanges = () => {
    if (!currentUser) return;
    if (!lifts) return;
    storeLifts(currentUser.id, lifts).then(() => fetchData());
  };

  return (
    <div className="lifts-page">
      {lifts !== undefined &&
      originalLifts !== undefined &&
      program !== undefined &&
      weightInputs !== undefined ? (
        <>
          {program.liftGroupCycles.map((items: string[], i) => (
            <Cycle
              key={i}
              itemWidth={100}
              items={items}
              activeItemIndex={lifts.liftGroupPositions[i]}
              originalActiveItemIndex={originalLifts.liftGroupPositions[i]}
              setActiveItemIndex={(position) =>
                setLiftGroupPosition(i, position)
              }
              activeItemColor={`#${liftGroupColor[i]}`}
            />
          ))}
          <table className="lifts-table">
            <tbody>
              <tr>
                <th>Bodyweight</th>
                <td>
                  <input
                    className="text-input weight-input"
                    type="text"
                    style={{ color: weightInputs["bodyweight"].inputColor }}
                    onBlur={(e) => {
                      commitInput(
                        "bodyweight",
                        originalLifts.bodyweight,
                        setBodyweight
                      );
                    }}
                    onChange={(e) =>
                      updateWeightInputs((weightInputs) => {
                        if (weightInputs === undefined) return;
                        weightInputs["bodyweight"].value = e.target.value;
                      })
                    }
                    value={weightInputs["bodyweight"].value}
                  />
                  kg
                </td>
              </tr>
              {Object.entries(lifts.stats).map(([lift, liftStats], i) => (
                <tr key={i}>
                  <th>{lift}</th>
                  <td>
                    <input
                      className="text-input weight-input"
                      type="text"
                      style={{ color: weightInputs[lift].inputColor }}
                      onBlur={(e) => {
                        commitInput(
                          lift,
                          originalLifts.stats[lift].pr,
                          (weight) => setPr(weight, lift)
                        );
                      }}
                      onChange={(e) =>
                        updateWeightInputs((weightInputs) => {
                          if (weightInputs === undefined) return;
                          weightInputs[lift].value = e.target.value;
                        })
                      }
                      value={weightInputs[lift].value}
                    />
                    kg
                  </td>
                  <td>
                    {
                      <Cycle
                        itemWidth={80}
                        items={[
                          "PR",
                          ...Array(liftStats.cycleLength - 1).fill("Work"),
                        ]}
                        activeItemIndex={liftStats.cyclePosition}
                        originalActiveItemIndex={
                          originalLifts.stats[lift].cyclePosition
                        }
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
          <button onClick={() => fetchData()}>Cancel</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
