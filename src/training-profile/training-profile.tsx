import { useEffect, useState, useContext } from "react";
import { getProfileNames } from "./profile-access";
import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "./training-profile-provider";
import "./training-profile.css";
import { PresetProgram } from "../program/program";
import { getPrograms } from "../program/program-access";
import { CurrentProfile } from "./current-profile/current-profile";

const addImage = require("../image/add.png");
export const maxProfileNameLength = 15;

const maybeToList = (maybe: any[] | null): any[] =>
  maybe === null ? [] : maybe;

export function TrainingProfile() {
  const {
    switchProfile,
    profileName: activeProfileName,
    createNewProfile,
  } = useContext(TrainingProfileContext);
  const { currentUser } = useContext(UserContext);
  const [profileNames, setProfileNames] = useState<string[]>([]);
  const [presetPrograms, setPresetPrograms] = useState<PresetProgram[]>([]);
  const [isAddingProfile, setIsAddingProfile] = useState<boolean>(false);
  const [activeProgram, setActiveProgram] = useState<
    PresetProgram | undefined
  >();
  const [newProfileName, setNewProfileName] = useState<string>("");

  useEffect(() => {
    if (!currentUser) return;
    getProfileNames().then(maybeToList).then(setProfileNames);
    getPrograms().then(maybeToList).then(setPresetPrograms);
  }, [currentUser]);

  return (
    <main className="triple-grid">
      {activeProfileName === undefined || currentUser === undefined ? (
        <div />
      ) : (
        <div>
          <CurrentProfile
            onProfileChange={() => {
              getProfileNames().then(maybeToList).then(setProfileNames);
            }}
          />
        </div>
      )}
      <div className="training-profile-content">
        <h1>Training Profiles</h1>
        {profileNames.map((profileName, i) => (
          <div key={i}>
            {profileName === activeProfileName ? (
              <div
                style={{
                  color: "var(--edited-color)",
                }}
                className="training-profile-item"
              >
                {profileName}
              </div>
            ) : (
              <div
                className="link training-profile-item"
                onClick={() => {
                  switchProfile(profileName);
                }}
              >
                {profileName}
              </div>
            )}
          </div>
        ))}

        {isAddingProfile ? (
          <>
            <input
              className="text-input training-profile-name-input training-profile-item"
              placeholder="name"
              value={newProfileName}
              style={{
                color:
                  newProfileName.length > maxProfileNameLength
                    ? "var(--error-color)"
                    : undefined,
              }}
              onChange={(e) => {
                setNewProfileName(e.target.value);
              }}
            />
            <h1>Choose Program</h1>
            {presetPrograms.map((presetProgram, i) =>
              presetProgram === activeProgram ? (
                <div
                  style={{ color: "var(--edited-color)" }}
                  className="link"
                  key={i}
                  onClick={() => setActiveProgram(undefined)}
                >
                  {presetProgram.name}
                </div>
              ) : (
                <div
                  className="link"
                  key={i}
                  onClick={() => setActiveProgram(presetProgram)}
                >
                  {presetProgram.name}
                </div>
              )
            )}
            {activeProgram !== undefined &&
            newProfileName.length > 0 &&
            newProfileName.length <= maxProfileNameLength ? (
              <button
                onClick={async () => {
                  if (newProfileName.length === 0) return;
                  if (currentUser === undefined) return;
                  setIsAddingProfile(false);
                  await createNewProfile(newProfileName, activeProgram.program);
                  getProfileNames().then(maybeToList).then(setProfileNames);
                }}
                className="standard-button"
              >
                Confirm
              </button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <img
            onClick={() => setIsAddingProfile(true)}
            className="standard-icon"
            alt="new training profile"
            src={addImage}
          />
        )}
      </div>
      <div />
    </main>
  );
}
