import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import useProfileRules from "./useProfileRules"; // <- add this

const Profile = () => {
  const { program } = useSelectionStore((s) => ({ program: s.program }));
  const { hiddenFields /*, disabledFields*/ } = useProfileRules();

  const attributes =
    program?.programTrackedEntityAttributes?.map(
      (ptea) => ptea.trackedEntityAttribute.id
    ) || [];

  return attributes.map((attribute) => {
    if (hiddenFields?.[attribute]) return null; // hide per rules

    return (
      <Box key={attribute} className="custom-tracker-profile-field-row">
        <AttributeLabel attribute={attribute} />
        <AttributeField
          attribute={attribute}
          disabledManualFields
        />
      </Box>
    );
  });
};

export default Profile;
