import { useEffect, useState } from "react";
import { Lifts } from "./lifts";
import { getLifts } from "./lifts-access";
import "./lift-page.css";

export function LiftsPage() {
  const [lifts, setLifts] = useState<Lifts | undefined>();

  useEffect(() => {
    getLifts().then(setLifts);
  }, []);

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
