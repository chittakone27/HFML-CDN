import { Typography } from "@mui/material";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";

const AttributeLabel = ({ variant, attribute, label, mandatory }) => {
  const program = useSelectionStore((state) => state.program);
  const trackedEntityAttributes = useMetadataStore((state) => state.trackedEntityAttributes);
  const foundPtea = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === attribute);
  const foundTea = trackedEntityAttributes.find((tea) => tea.id === attribute);
  let currentMandatory = foundPtea.mandatory || mandatory;
  return label ? (
    <div style={{ display: "flex" }}>
      <Typography variant={variant ? variant : "body1"}>{label}</Typography>
    </div>
  ) : foundTea && attribute ? (
    <div style={{ display: "flex" }}>
      <Typography variant={variant ? variant : "body1"}>{foundTea.displayFormName}</Typography>
      {currentMandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
    </div>
  ) : null;
};

export default AttributeLabel;
