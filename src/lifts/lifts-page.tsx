import { useEffect, useContext } from "react";
import { Lifts } from "./lifts";
import "./lift-page.css";
import { UserContext } from "../authentication/user-provider";
import { Cycle } from "./cycle/cycle";
import { liftGroupColor } from "../config/lift-group-color";
import { useImmer } from "use-immer";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";

interface Inputs {
  [name: string]: {
    value: string;
    inputColor: string;
  };
}

export function LiftsPage() {
  const {
    lifts: originalLifts,
    program,
    setLifts: storeLifts,
  } = useContext(TrainingProfileContext);

  //These are the lifts as they are edited; originalLifts is only changed on "Confirm" button press.
  const [lifts, updateLifts] = useImmer<Lifts | undefined>(undefined);
  const [weightInputs, updateWeightInputs] = useImmer<Inputs | undefined>(
    undefined
  );

  useEffect(() => {
    setUpInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalLifts]);

  // Sets up lifts and weightInputs.
  const setUpInputs = (): void => {
    if (!originalLifts) return;
    const lifts: Lifts = JSON.parse(JSON.stringify(originalLifts));
    updateLifts(lifts);
    const weightInputs: Inputs = {};

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
    updateWeightInputs(weightInputs);
  };

  const setLiftGroupPosition = (index: number, position: number): void => {
    updateLifts((lifts) => {
      if (!lifts) return;
      lifts.liftGroupPositions[index] = position;
    });
  };

  const setLiftCyclePosition = (lift: string, position: number): void => {
    updateLifts((lifts) => {
      if (!lifts) return;
      lifts.stats[lift].cyclePosition = position;
    });
  };

  const setBodyweight = (weight: number): void => {
    updateLifts((lifts) => {
      if (!lifts) return;
      lifts.bodyweight = weight;
    });
  };

  const setPr = (weight: number, lift: string): void => {
    updateLifts((lifts) => {
      if (!lifts) return;
      lifts.stats[lift].pr = weight;
    });
  };

  //This happens when the user unselects (onBlur) the inputs.
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

  // "Confirm" button
  const saveChanges = () => {
    if (!lifts) return;
    storeLifts(lifts);
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
          <button className="standard-button" onClick={saveChanges}>
            Confirm
          </button>
          <button className="standard-button" onClick={() => setUpInputs()}>
            Cancel
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
