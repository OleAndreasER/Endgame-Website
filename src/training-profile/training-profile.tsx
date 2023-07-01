import { useEffect, useState, useContext } from "react";
import { getProfileNames, setActiveProfile } from "./profile-access";
import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "./training-profile-provider";

export function TrainingProfile() {
  const { switchProfile } = useContext(TrainingProfileContext);
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
        {profileNames.map((profileName, i) => (
          <li
            key={i}
            onClick={() => {
              switchProfile(profileName);
            }}
          >
            {profileName}
          </li>
        ))}
      </ul>
    </>
  );
}
