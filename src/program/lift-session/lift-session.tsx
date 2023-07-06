import { Sets } from "../program";
import "./lift-session.css";

interface Props {
  session: Sets[];
  color: string;
}

const maybePlural = (x: number, unit: string): string => {
  if (x === 1) return `${x} ${unit}`;
  return `${x} ${unit}s`;
};

export function LiftSession({ session, color }: Props) {
  return (
    <table className="program-lift-session">
      <tbody>
        {session.map((sets, j) => (
          <tr key={j}>
            <th style={{ backgroundColor: color }}>{sets.lift}</th>
            <td>{sets.setType}</td>
            <td>{maybePlural(sets.sets, "set")}</td>
            <td>{maybePlural(sets.reps, "rep")}</td>
            <td>{sets.percent}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
