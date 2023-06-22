import { useEffect, useState } from "react";
import { Lifts } from "./lifts";
import { getLifts } from "./lifts-access";

export function LiftsPage() {
  const [lifts, setLifts] = useState<Lifts | undefined>();

  useEffect(() => {
    getLifts().then(setLifts);
  }, []);

  return <p>Bodyweight: {lifts?.bodyweight}</p>;
}
