import { useContext } from "react";
import { TrainingProfileContext } from "../../training-profile/training-profile-provider";

const addImage = require("../../image/add.png");
const editImage = require("../../image/edit.png");
const confirmImage = require("../../image/confirm.png");
const cancelImage = require("../../image/cancel.png");
const undoImage = require("../../image/undo.png");

interface Props {
  label: string;
  time: LogEntryTime;
  isHovering: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setLogEntry: () => void;
  logEntryIndex?: number;
}

export enum LogEntryTime {
  Future,
  Next,
  Past,
}

export function LogEntryHeader({
  label,
  time,
  isHovering,
  setIsEditing,
  isEditing,
  setLogEntry,
  logEntryIndex,
}: Props) {
  const { addNextLogEntry, undoLogEntry } = useContext(TrainingProfileContext);
  return (
    <div className="log-entry-header">
      <div className="triple-grid">
        <div className="left" />
        <div className="middle">
          {time === LogEntryTime.Next ? "Next" : label}
        </div>
        <div className="right">
          {time === LogEntryTime.Next ? (
            <img
              onClick={addNextLogEntry}
              className="standard-icon"
              alt="add"
              src={addImage}
            />
          ) : time === LogEntryTime.Past && isEditing ? (
            <>
              <img
                onClick={() => {
                  setIsEditing(false);
                  setLogEntry();
                }}
                className="standard-icon"
                alt="confirm"
                src={confirmImage}
              />
              <img
                onClick={() => setIsEditing(false)}
                className="standard-icon"
                alt="cancel"
                src={cancelImage}
              />
            </>
          ) : time === LogEntryTime.Past && isHovering && !isEditing ? (
            <>
              <img
                onClick={() => setIsEditing(true)}
                className="standard-icon only-desktop"
                alt="edit"
                src={editImage}
              />
              {logEntryIndex === 0 ? (
                <img
                  onClick={undoLogEntry}
                  className="standard-icon only-desktop"
                  alt="undo"
                  src={undoImage}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
