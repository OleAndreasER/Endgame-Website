import { useContext } from "react";
import { TrainingProfileContext } from "../../training-profile/training-profile-provider";

const addImage = require("../../image/add.png");

interface Props {
  label: string;
}

export function LogEntryHeader({ label }: Props) {
  const { addNextLogEntry } = useContext(TrainingProfileContext);
  return (
    <div className="log-entry-header">
      {label === "1." ? (
        <div className="grid">
          <div></div>
          <div className="middle">Next</div>
          <div>
            <img
              onClick={addNextLogEntry}
              id="add-image"
              alt="add"
              src={addImage}
            />
          </div>
        </div>
      ) : (
        <>{label}</>
      )}
    </div>
  );
}
