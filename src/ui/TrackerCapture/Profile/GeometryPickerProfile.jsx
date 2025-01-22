import { useEffect, useState } from "react";
import { Input } from "@/ui/common";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { event } from "@/api";
import { useShallow } from "zustand/react/shallow";

const GeometryPickerProfile = (props) => {
  const { useDefault } = props;
  const [apiError, setApiError] = useState(null);
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data
    }))
  );
  const { currentTei, currentEnrollment } = data;
  const { changeEnrollmentProperty, changeTeiProperty } = actions;

  useEffect(() => {
    if (useDefault) {
      if (!currentTei.geometry || !currentTei.geometry.coordinates[0]) {
        if (orgUnit.geometry && orgUnit.geometry.type === "Point") {
          // changeTeiProperty("geometry", orgUnit.geometry);
          changeEnrollmentProperty("geometry", orgUnit.geometry);
        }
      }
    }
  }, [currentTei.geometry ? JSON.stringify(currentTei.geometry) : ""]);

  return (
    <div className="input-field-container">
      <Input
        valueType="COORDINATE"
        value={currentEnrollment.geometry ? currentEnrollment.geometry.coordinates : ""}
        accept={(coordinate) => {
          if (coordinate) {
            // changeTeiProperty("geometry", {
            //   type: "Point",
            //   coordinates: coordinate
            // });
            changeEnrollmentProperty("geometry", {
              type: "Point",
              coordinates: coordinate
            });
          } else {
            if (useDefault && orgUnit.geometry && orgUnit.geometry.type === "Point") {
              // changeTeiProperty("geometry", orgUnit.geometry);
              changeEnrollmentProperty("geometry", orgUnit.geometry);
            } else {
              // changeTeiProperty("geometry", null);
              changeEnrollmentProperty("geometry", null);
            }
          }
        }}
        {...props}
      />
    </div>
  );
};

export default GeometryPickerProfile;
