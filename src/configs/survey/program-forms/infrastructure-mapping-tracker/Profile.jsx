import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import useProfileRules from "./useProfileRules";

// TEA IDs you want to toggle frequently
const IDS = {
  A: "s9TfhXLCYgD",
  B: "nZjzEldORWw",
  C: "Z9V1f5YzXXj",
};

// --- Toggle here -------------------------------------------------------------
// Disable (read-only in UI)
const MANUAL_DISABLE = new Set([
  // IDS.A,
   IDS.B,
   IDS.C,
]);

// Hide (don’t render at all)
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
        // Manual hide overrides everything
        if (MANUAL_HIDE.has(attribute)) return null;

        // Respect rule-based hiding
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
