import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useProfileRules from "./useProfileRules";
import useTrackerCaptureStore from "@/state/trackerCapture";

const Profile = () => {
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
    }))
  );
  const props = useProfileRules();
  Object.keys(props.hiddenFields).forEach((h) => {
    if (props.hiddenFields[h]) props.assignations[h] = "";
  });
  Object.keys(props.assignations).forEach((a) => {
    const attribute = a;
    const value = props.assignations[a];
    actions.changeAttributeValue(attribute, value);
  });
  const attributes = program.programTrackedEntityAttributes.map((ptea) => {
    return ptea.trackedEntityAttribute.id;
  });
  return attributes.map((attribute) => {
    const hidden = props.hiddenFields[attribute];

    return (
      !hidden && (
        <Box className="custom-tracker-profile-field-row">
          <AttributeLabel attribute={attribute} />
          <AttributeField disabledManualFields={true} attribute={attribute} />
        </Box>
      )
    );
  });
};
export default Profile;
