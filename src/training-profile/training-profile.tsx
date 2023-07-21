import { useEffect, useState, useContext } from "react";
import { getProfileNames } from "./profile-access";
import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "./training-profile-provider";
import "./training-profile.css";
import { PresetProgram } from "../program/program";
import { getPrograms } from "../program/program-access";

export function TrainingProfile() {
  const { switchProfile, profileName: activeProfileName } = useContext(
    TrainingProfileContext
  );
  const { currentUser } = useContext(UserContext);
  const [profileNames, setProfileNames] = useState<string[]>([]);
  const [presetPrograms, setPresetPrograms] = useState<PresetProgram[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getProfileNames(currentUser.id).then(setProfileNames);
    getPrograms(currentUser.id).then(setPresetPrograms);
  }, [currentUser]);

  return (
    <main className="training-profile-page">
      <div className="training-profile-content">
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
        <h1>Programs</h1>
        <ul>
          {presetPrograms.map((presetProgram, i) => (
            <li className="link" key={i} onClick={() => {}}>
              {presetProgram.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
