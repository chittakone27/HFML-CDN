import { Typography } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";

const DataValueLabel = ({ dataElement, label }) => {
  const program = useSelectionStore((state) => state.program);
  const dataElements = useMetadataStore((state) => state.dataElements);
  const foundPde = program.programStages[0].programStageDataElements.find((pde) => pde.dataElement.id === dataElement);
  const foundDe = dataElements.find((de) => de.id === dataElement);
  const status = useEventCaptureStore((state) => state.status);
  const hidden = status.hiddenFields.includes(dataElement);

  if (!foundPde) {
    console.log(dataElement);
  }
  let mandatory = foundPde.compulsory;
  if (status.mandatoryFields.includes(dataElement)) {
    mandatory = true;
  }
  if (hidden) {
    return null;
  } else {
    return label ? (
      <span>{label}</span>
    ) : foundDe && dataElement ? (
      <span>
        {foundDe.displayFormName}
        {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
      </span>
    ) : null;
  }
};

export default DataValueLabel;
