import useMetadataStore from "@/state/metadata";
import { Typography } from "@mui/material";

const AttributeLabelNoState = ({ attribute, label, mandatory }) => {
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const foundTea = trackedEntityAttributes.find((tea) => tea.id === attribute);
  return label ? (
    <Typography>{label}</Typography>
  ) : foundTea && attribute ? (
    <div style={{ display: "flex" }}>
      <Typography>{foundTea.displayFormName}</Typography>
      {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
    </div>
  ) : null;
};

export default AttributeLabelNoState;
