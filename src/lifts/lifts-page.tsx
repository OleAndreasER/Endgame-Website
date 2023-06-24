import { useEffect, useState, useContext } from "react";
import { Lifts } from "./lifts";
import { getLifts } from "./lifts-access";
import "./lift-page.css";
import { UserContext } from "../authentication/user-provider";

export function LiftsPage() {
  const { currentUser } = useContext(UserContext);
  const [lifts, setLifts] = useState<Lifts | undefined>();

  useEffect(() => {
    if (!currentUser) return;
    getLifts(currentUser.id).then(setLifts);
  }, [currentUser]);

  return (
    <>
      {lifts ? (
        <>
          <p>Bodyweight: {lifts?.bodyweight}</p>
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
    </>
  );
}
