import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";

const Profile = () => {
  // shallow not needed here; keep it simple
  const { program } = useSelectionStore((s) => ({ program: s.program }));

  const attributes = program?.programTrackedEntityAttributes?.map(
    (ptea) => ptea.trackedEntityAttribute.id
  ) || [];

  return attributes.map((attribute) => (
    <Box key={attribute} className="custom-tracker-profile-field-row">
      <AttributeLabel attribute={attribute} />
      <AttributeField disabledManualFields attribute={attribute} />
    </Box>
  ));
};

export default Profile;
