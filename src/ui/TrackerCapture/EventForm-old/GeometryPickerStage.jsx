import { useEffect, useState } from "react";
import { Input } from "@/ui/common";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { event } from "@/api";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "./useCurrentEvent";
const { saveEvent } = event;

const GeometryPickerStage = (props) => {
  const { useDefault } = props;
  const [toBeSaved, setToBeSaved] = useState(false);
  const [apiError, setApiError] = useState(null);
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { currentEvent } = useCurrentEvent();

  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data
    }))
  );
  const { changeEventProperty } = actions;

  useEffect(() => {
    if (useDefault) {
      if (!currentEvent.geometry || !currentEvent.geometry.coordinates[0]) {
        if (orgUnit.geometry && orgUnit.geometry.type === "Point") {
          changeEventProperty(currentEvent.event, "geometry", orgUnit.geometry);
          setToBeSaved(true);
        }
      }
    }
  }, [currentEvent.geometry ? JSON.stringify(currentEvent.geometry) : ""]);

  const saveCurrentEvent = async () => {
    const result = await saveEvent(currentEvent);
    if (!result.ok) {
      setApiError({ ...result });
    }
  };

  useEffect(() => {
    (async () => {
      if (toBeSaved) {
        await saveCurrentEvent();
        setToBeSaved(false);
      }
    })();
  }, [toBeSaved]);
  return (
    <div className="input-field-container">
      <Input
        valueType="COORDINATE"
        value={currentEvent.geometry ? currentEvent.geometry.coordinates : ""}
        accept={(coordinate) => {
          if (coordinate) {
            changeEventProperty(currentEvent.event, "geometry", {
              type: "Point",
              coordinates: coordinate
            });
          } else {
            if (useDefault && orgUnit.geometry && orgUnit.geometry.type === "Point") {
              changeEventProperty(currentEvent.event, "geometry", orgUnit.geometry);
            } else {
              changeEventProperty(currentEvent.event, "geometry", null);
            }
          }
          setToBeSaved(true);
        }}
        {...props}
      />
    </div>
  );
};

export default GeometryPickerStage;
