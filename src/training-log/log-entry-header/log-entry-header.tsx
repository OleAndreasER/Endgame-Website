import { useContext } from "react";
import { TrainingProfileContext } from "../../training-profile/training-profile-provider";

const addImage = require("../../image/add.png");
const editImage = require("../../image/edit.png");

interface Props {
  label: string;
  time: LogEntryTime;
  isHovered: boolean;
}

export enum LogEntryTime {
  Future,
  Next,
  Past,
}

export function LogEntryHeader({ label, time, isHovered }: Props) {
  const { addNextLogEntry } = useContext(TrainingProfileContext);
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
              className="add-image"
              alt="add"
              src={addImage}
            />
          ) : time === LogEntryTime.Past && isHovered ? (
            <img
              onClick={() => {}}
              className="edit-image"
              alt="edit"
              src={editImage}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
