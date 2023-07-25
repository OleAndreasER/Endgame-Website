import { useEffect, useState, useContext } from "react";
import { deleteProfile, getProfileNames } from "./profile-access";
import { UserContext } from "../authentication/user-provider";
import { TrainingProfileContext } from "./training-profile-provider";
import "./training-profile.css";
import { PresetProgram } from "../program/program";
import { getPrograms } from "../program/program-access";

const addImage = require("../image/add.png");
const editImage = require("../image/edit.png");
const cancelImage = require("../image/cancel.png");
const maxProfileNameLength = 15;

export function TrainingProfile() {
  const {
    switchProfile,
    profileName: activeProfileName,
    createNewProfile,
    deleteProfile,
    renameProfile,
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
    getProfileNames(currentUser.id).then(setProfileNames);
    getPrograms(currentUser.id).then(setPresetPrograms);
  }, [currentUser]);

  return (
    <main className="training-profile-page">
      <div className="training-profile-content">
        <h1>Training Profiles</h1>
        {profileNames.map((profileName, i) => (
          <div className="triple-grid" key={i}>
            {profileName === activeProfileName ? (
              <>
                <div />
                <div
                  style={{
                    color: "var(--edited-color)",
                  }}
                  className="training-profile-item middle"
                >
                  {profileName}
                </div>
                <div className="right">
                  <img src={editImage} className="standard-icon" />
                  <img src={cancelImage} className="standard-icon" />
                </div>
              </>
            ) : (
              <>
                <div />
                <div
                  className="link training-profile-item middle"
                  onClick={() => {
                    switchProfile(profileName);
                  }}
                >
                  {profileName}
                </div>
                <div className="left">
                  <img
                    src={editImage}
                    className="standard-icon"
                    onClick={() => renameProfile(profileName, "trond4")}
                  />
                  <img
                    src={cancelImage}
                    className="standard-icon"
                    onClick={() => deleteProfile(profileName)}
                  />
                </div>
              </>
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
                  getProfileNames(currentUser.id).then(setProfileNames);
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
    </main>
  );
}
