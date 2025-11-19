import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useMemo } from "react";
import useProfileRules from "./useProfileRules";

const IDS = {
  a: "NSkJrZeR8LL",
  b: "RLamCNXOwQ5",
};

const MANUAL_DISABLE = new Set([
  IDS.a, 
  IDS.b, 
]);

const Profile = () => {
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const props = useProfileRules() || {};

  useEffect(() => {
    if (!props.hiddenFields) return;
    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (isHidden) actions.changeAttributeValue(attr, "");
    });
  }, [actions, props.hiddenFields]);

  useEffect(() => {
    if (!props.assignations) return;
    Object.entries(props.assignations).forEach(([attr, value]) => {
      actions.changeAttributeValue(attr, value);
    });
  }, [actions, props.assignations]);

  const attributes = useMemo(
    () =>
      (program?.programTrackedEntityAttributes ?? []).map(
        (ptea) => ptea.trackedEntityAttribute.id
      ),
    [program?.programTrackedEntityAttributes]
  );

  return attributes.map((attribute) => {
    const hidden = props?.hiddenFields?.[attribute];
    if (hidden) return null;

    const ruleDisabled = !!props?.disabledFields?.[attribute];
    const manualDisabled = MANUAL_DISABLE.has(attribute);
    const disabled = ruleDisabled || manualDisabled;

    return (
      <Box key={attribute} className="custom-tracker-profile-field-row">
        <AttributeLabel attribute={attribute} />
        <AttributeField
          attribute={attribute}
          disabledManualFields={true}
          disabled={disabled}
        />
      </Box>
    );
  });
};

export default Profile;
