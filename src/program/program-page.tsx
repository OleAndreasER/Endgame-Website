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
              {program.liftGroupCycles.map((liftGroupCycle, i) => (
                <tr key={i}>
                  {liftGroupCycle.map((lift, i) => (
                    <td key={i}>{lift}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Lift Cycles</h1>
          {Object.entries(program.liftCycles).map(([lift, sessions], i) => (
            <div key={i}>
              <h2>{lift}</h2>
              <table>
                <tbody>
                  {sessions.map((sets) =>
                    sets.map((set, i) => (
                      <tr key={i}>
                        <th>{set.lift}</th>
                        <td>{set.reps}</td>
                        <td>{set.percent}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
