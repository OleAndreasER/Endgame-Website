import { useEffect, useState, useContext } from "react";
import { Program } from "./program";
import { getProgram } from "./program-access";
import { UserContext } from "../authentication/user-provider";

export function ProgramPage() {
  const { currentUser } = useContext(UserContext);
  const [program, setProgram] = useState<Program | undefined>();

  useEffect(() => {
    if (!currentUser) return;
    getProgram(currentUser.id).then(setProgram);
  }, [currentUser]);

  return (
    <>
      {program ? (
        <>
          <h1>Lift Group Cycles</h1>
          <table className="lift-group-cycle-table">
            <tbody>
              {program.liftGroupCycles.map((liftGroupCycle) => (
                <tr>
                  {liftGroupCycle.map((lift) => (
                    <td>{lift}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Lift Cycles</h1>
          {Object.entries(program.liftCycles).map(([lift, sessions]) => (
            <>
              <h2>{lift}</h2>
              <table>
                <tbody>
                  {sessions.flatMap((sets) =>
                    sets.map((set) => (
                      <tr>
                        <th>{set.lift}</th>
                        <td>{set.reps}</td>
                        <td>{set.percent}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
