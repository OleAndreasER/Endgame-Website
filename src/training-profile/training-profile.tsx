import { useEffect, useState, useContext } from "react";
import { getProfileNames } from "./profile-access";
import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "./training-profile-provider";

export function TrainingProfile() {
  const { switchProfile, profileName: activeProfileName } = useContext(
    TrainingProfileContext
  );
  const { currentUser } = useContext(UserContext);
  const [profileNames, setProfileNames] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getProfileNames(currentUser.id).then(setProfileNames);
  }, [currentUser]);

  return (
    <main>
      <h1>Training Profiles</h1>
      <ul>
        {profileNames.map((profileName, i) =>
          profileName === activeProfileName ? (
            <li
              style={{ color: "var(--edited-color)" }}
              className="link"
              key={i}
            >
              {profileName}
            </li>
          ) : (
            <li
              className="link"
              key={i}
              onClick={() => {
                switchProfile(profileName);
              }}
            >
              {profileName}
            </li>
          )
        )}
      </ul>
    </main>
  );
}
