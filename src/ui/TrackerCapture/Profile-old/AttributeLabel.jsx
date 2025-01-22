import { Typography } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";

const AttributeLabel = ({ attribute, label }) => {
  const program = useSelectionStore((state) => state.program);
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const foundPtea = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === attribute);
  const foundTea = trackedEntityAttributes.find((tea) => tea.id === attribute);
  let mandatory = foundPtea.mandatory;
  return label ? (
    <Typography>{label}</Typography>
  ) : foundTea && attribute ? (
    <div style={{ display: "flex" }}>
      <Typography style={{ fontSize: 14 }}>{foundTea.displayFormName}</Typography>
      {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
    </div>
  ) : null;
};

export default AttributeLabel;
