import React, { useContext } from "react";
import { TrainingProfileContext } from "../training-profile/training-profile-provider";
import { LiftGroupCycle } from "./lift-group-cycle/lift-group-cycle";
import { liftGroupColor } from "../config/lift-group-color";
import "./program-page.css";
import { LiftSession } from "./lift-session/lift-session";

export function ProgramPage() {
  const { program } = useContext(TrainingProfileContext);

  return (
    <main className="program-page">
      {program ? (
        <>
          <div className="lift-group-cycles">
            {program.liftGroupCycles.map((liftGroupCycle, i) => (
              <LiftGroupCycle
                key={i}
                items={liftGroupCycle}
                itemWidth={100}
                backgroundColor={`#${liftGroupColor[i]}`}
              />
            ))}
          </div>
          {Object.entries(program.liftCycles).map(([lift, sessions], i) => (
            <React.Fragment key={i}>
              <h2>{lift}</h2>
              <div className="program-lift">
                {sessions.map((session, i) => (
                  <LiftSession
                    key={i}
                    session={session}
                    color={`#${liftGroupColor[program.liftGroup[lift]]}`}
                  />
                ))}
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
