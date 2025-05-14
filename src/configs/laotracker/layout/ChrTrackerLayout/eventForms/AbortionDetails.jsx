import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import Row from "../Row";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import useTrackerCaptureStore from "@/state/trackerCapture";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import { useEffect } from "react";

const AbortionDetails = () => {
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentEvent, currentProgramStage, editing } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";

  useEffect(() => {
    const order = currentProgramStage.programStageDataElements.map((psde, index) => {
      return psde.dataElement.id;
    });
    setEvent("order", order);
  }, []);

  return (
    <div>
      <Row
        label={
          <div style={{ display: "flex", alignItems: "end", justifyContent: "center" }}>
            <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
          </div>
        }
        field={
          <EventDateFieldNoState
            accept={(value) => {
              changeEventProperty("eventDate", value);
              changeEventProperty("dueDate", value);
            }}
            disabled={!editing || completed}
            currentEvent={currentEvent}
          />
        }
      />
      {currentProgramStage.programStageDataElements.map((psde, index) => {
        return (
          <Row
            label={
              <div style={{ display: "flex" }}>
                {index + 1}.&nbsp;
                <DataValueLabelNoState dataElement={psde.dataElement.id} currentProgramStage={currentProgramStage} />
              </div>
            }
            field={
              <DataValueFieldNoBlurNoState
                change={(value) => {
                  changeDataValue(psde.dataElement.id, value);
                }}
                accept={(value) => {
                  changeDataValue(psde.dataElement.id, value);
                }}
                disabled={!editing || completed}
                dataElement={psde.dataElement.id}
                currentProgramStage={currentProgramStage}
                currentEvent={currentEvent}
              />
            }
          />
        );
      })}
    </div>
  );
};

export default AbortionDetails;
