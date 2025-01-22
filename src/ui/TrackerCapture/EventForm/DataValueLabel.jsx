import { Typography } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import useCurrentEvent from "./useCurrentEvent";

const DataValueLabel = ({ dataElement, label }) => {
  const program = useSelectionStore((state) => state.program);
  const dataElements = useMetadataStore((state) => state.dataElements);
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const foundPde = currentProgramStage.programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const foundDe = dataElements.find((de) => de.id === dataElement);
  let mandatory = foundPde ? foundPde.compulsory : false;

  return label ? (
    <Typography>{label}</Typography>
  ) : foundDe && dataElement ? (
    <div style={{ display: "flex" }}>
      <Typography>{foundDe.displayFormName}</Typography>
      {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
    </div>
  ) : null;
};

export default DataValueLabel;
