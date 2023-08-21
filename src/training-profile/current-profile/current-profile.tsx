import { useContext, useState } from "react";
import { DeleteButton } from "./delete-button/delete-button";
import { TrainingProfileContext } from "../training-profile-provider";
import "./current-profile.css";
import { maxProfileNameLength } from "../training-profile";

const confirmImage = require("../../image/confirm.png");
const cancelImage = require("../../image/cancel.png");

interface Props {
  onProfileChange: () => void;
}

export function CurrentProfile({ onProfileChange }: Props) {
  const { profileName, deleteProfile, renameProfile } = useContext(
    TrainingProfileContext
  );
  const [rename, setRename] = useState<string | undefined>(undefined);

  if (profileName === null) return <></>;

  if (rename !== undefined)
    return (
      <div className="current-profile renaming-profile-name">
        <input
          style={{
            color:
              rename.length <= maxProfileNameLength ? "" : "var(--error-color)",
          }}
          className="text-input profile-name"
          value={rename}
          onChange={(e) => {
            setRename(e.target.value);
          }}
        />
        <img
          src={cancelImage}
          alt="cancel"
          onClick={() => setRename(undefined)}
          className="standard-icon"
        />
        <img
          src={confirmImage}
          alt="confirm"
          className="standard-icon"
          onClick={async () => {
            if (rename.length > 0 && rename.length <= maxProfileNameLength) {
              await renameProfile(profileName, rename);
              onProfileChange();
              setRename(undefined);
            }
          }}
        />
      </div>
    );

  return (
    <div className="current-profile">
      <div className="profile-name">{profileName}</div>
      <DeleteButton
        onClick={async () => {
          await deleteProfile(profileName);
          onProfileChange();
        }}
      />
      <button
        className="standard-button"
        onClick={() => setRename(profileName)}
      >
        Rename
      </button>
    </div>
  );
}
