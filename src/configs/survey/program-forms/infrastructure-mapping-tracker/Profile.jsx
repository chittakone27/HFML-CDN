import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import useProfileRules from "./useProfileRules";

const SECRET_ATTR = "s9TfhXLCYgD"; // TEA to protect

const Profile = () => {
  const { program } = useSelectionStore((s) => ({ program: s.program }));
  const { hiddenFields, disabledFields } = useProfileRules();

  const attributes =
    program?.programTrackedEntityAttributes?.map(
      (ptea) => ptea.trackedEntityAttribute.id
    ) || [];

  return (
    <>
      {attributes.map((attribute) => {
        // Use this AFTER your import is done. Just uncomment the next line.
         if (attribute === SECRET_ATTR) return null;
        // ------------------------------------------------------------------

        // Respect rule-based hiding
        if (hiddenFields?.[attribute]) return null;

        // disable – default
        const isSecret = attribute === SECRET_ATTR;
        const isDisabled = isSecret || !!disabledFields?.[attribute];

        return (
          <Box key={attribute} className="custom-tracker-profile-field-row">
            <AttributeLabel attribute={attribute} />
            <AttributeField
              attribute={attribute}
              disabledManualFields
              disabled={isDisabled}
            />
          </Box>
        );
      })}
    </>
  );
};

export default Profile;
