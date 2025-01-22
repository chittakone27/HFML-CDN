import { Typography } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import useCurrentEvent from "./useCurrentEvent";

const DataValueLabelNoState = ({ dataElement, label, currentProgramStage }) => {
  const dataElements = useMetadataStore((state) => state.dataElements);
  const foundPde = currentProgramStage.programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const foundDe = dataElements.find((de) => de.id === dataElement);
  let mandatory = foundPde ? foundPde.compulsory : false;
  return label ? (
    <div>{label}</div>
  ) : foundDe && dataElement ? (
    <div>
      {foundDe.displayFormName}
      {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
    </div>
  ) : null;
};

export default DataValueLabelNoState;
