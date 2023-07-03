import { useContext } from "react";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";

export function ProgramPage() {
  const { program } = useContext(TrainingProfileContext);

  return (
    <main>
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
    </main>
  );
}
