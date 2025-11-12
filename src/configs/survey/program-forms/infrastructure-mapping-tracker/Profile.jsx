import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import useProfileRules from "./useProfileRules";



const IDS = {
  A: "s9TfhXLCYgD",
  B: "nZjzEldORWw",
  C: "Z9V1f5YzXXj",
};


const MANUAL_DISABLE = new Set([
  // IDS.A,
   IDS.B,
   IDS.C,
]);


const MANUAL_HIDE = new Set([
   IDS.A,
  // IDS.B,
  // IDS.C,
]);
// -----------------------------------------------------------------------------


const Profile = () => {
  const { program } = useSelectionStore((s) => ({ program: s.program }));
  const { hiddenFields = {}, disabledFields = {} } = useProfileRules() || {};

  const attributes =
    program?.programTrackedEntityAttributes?.map(
      (ptea) => ptea.trackedEntityAttribute.id
    ) || [];

  return (
    <>
      {attributes.map((attribute) => {

        if (MANUAL_HIDE.has(attribute)) return null;


        if (hiddenFields?.[attribute]) return null;

        const isDisabled = MANUAL_DISABLE.has(attribute) || !!disabledFields?.[attribute];

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
