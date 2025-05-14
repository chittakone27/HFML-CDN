import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import Row from "../Row";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import { useEffect } from "react";

const FamilyPlanning = () => {
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEvent, currentProgramStage, editing } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";

  useEffect(() => {
    let order = [];
    currentProgramStage.programStageDataElements.forEach((psde) => {
      order.push(psde.dataElement.id);
    });
    setEvent("order", order);
  }, []);

  return (
    <div>
      <Row
        label={<EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />}
        field={
          <EventDateFieldNoState
            disabled={!editing || completed}
            currentEvent={currentEvent}
            accept={(value) => {
              changeEventProperty("eventDate", value);
              changeEventProperty("dueDate", value);
            }}
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

export default FamilyPlanning;
