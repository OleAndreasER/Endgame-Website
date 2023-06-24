import { useEffect, useState, useContext } from "react";
import { getProfileNames } from "./profile-access";
import { UserContext } from "../authentication/user-provider";

export function TrainingProfile() {
  const { currentUser } = useContext(UserContext);
  const [profileNames, setProfileNames] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getProfileNames(currentUser.id).then(setProfileNames);
  }, [currentUser]);

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
