import { useEffect, useState } from "react";
import { getProfileNames } from "./profile-access";

export function TrainingProfile() {
  const [profileNames, setProfileNames] = useState<string[]>([]);

  useEffect(() => {
    getProfileNames().then(setProfileNames);
  }, []);

  return (
    <>
      <h1>Training Profiles</h1>
      <ul>
        {profileNames.map((profileName) => (
          <li>{profileName}</li>
        ))}
      </ul>
    </>
  );
}
