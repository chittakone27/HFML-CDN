import { shallow } from "zustand/shallow";
import EventDateField from "./EventDateField";
import EventDateLabel from "./EventDateLabel";
import useSelectionStore from "@/state/selection";
import useEventCaptureStore from "@/state/eventCapture";
import { Input } from "@/ui/common";
import { useShallow } from "zustand/react/shallow";

const FormTop = () => {
  const { program } = useSelectionStore(
    (state) => ({ program: state.program, orgUnit: state.orgUnit }),
    shallow
  );
  const { currentEvent, actions, layout } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
      layout: state.layout,
    }))
  );
  const { setCurrentEventGeometry } = actions;
  const { featureType } = program.programStages[0];
  const geometry = currentEvent.geometry;
  return (
    <div id="default-event-capture-form-top">
      {!layout.hideEventDate && (
        <div
          id="default-event-capture-event-date-field"
          style={{ padding: 10, paddingBottom: 0 }}
        >
          <EventDateLabel />
          <EventDateField />
        </div>
      )}
      {!layout.hideCoordinatesPicker &&
        featureType &&
        featureType !== "NONE" && (
          <div style={{ padding: 10 }}>
            <Input
              value={
                geometry
                  ? [geometry.coordinates[0], geometry.coordinates[1]]
                  : null
              }
              valueType="COORDINATE"
              accept={(value) => {
                setCurrentEventGeometry(value[1], value[0]);
              }}
            />
          </div>
        )}
    </div>
  );
};

export default FormTop;
