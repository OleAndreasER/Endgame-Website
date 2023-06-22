import { useEffect, useState } from "react";
import { Program } from "./program";
import { getProgram } from "./program-access";

export function ProgramPage() {
  const [program, setProgram] = useState<Program | undefined>();

  useEffect(() => {
    getProgram().then(setProgram);
  }, []);

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
