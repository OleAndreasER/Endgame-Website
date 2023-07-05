import { useContext } from "react";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";
import { LiftGroupCycle } from "./lift-group-cycle/lift-group-cycle";
import { liftGroupColor } from "../config/lift-group-color";

export function ProgramPage() {
  const { program } = useContext(TrainingProfileContext);

  return (
    <main>
      {program ? (
        <>
          <h1>Lift Group Cycles</h1>
          {program.liftGroupCycles.map((liftGroupCycle, i) => (
            <LiftGroupCycle
              key={i}
              items={liftGroupCycle}
              itemWidth={100}
              backgroundColor={`#${liftGroupColor[i]}`}
            />
          ))}
          <h1>Lift Cycles</h1>
          {Object.entries(program.liftCycles).map(([lift, sessions], i) => (
            <div key={i}>
              <h2>{lift}</h2>
              <table>
                <tbody>
                  {sessions.map((sets) =>
                    sets.map((sets, i) => (
                      <tr key={i}>
                        <th>{sets.lift}</th>
                        <td>{sets.sets}</td>
                        <td>{sets.reps}</td>
                        <td>{sets.percent}%</td>
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
