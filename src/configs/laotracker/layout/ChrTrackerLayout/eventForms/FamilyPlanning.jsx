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
  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";

  useEffect(() => {
    let order = ["eventDate"];
    currentProgramStage.programStageDataElements.forEach((psde) => {
      order.push(psde.dataElement.id);
    });
    setEvent("order", order);
  }, []);

  return (
    <div>
      <Row
        label={
          <div style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
            1.&nbsp;
            <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
          </div>
        }
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
        const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
        return (
          <Row
            label={
              <div style={{ display: "flex" }}>
                {foundIndex + 1}.&nbsp;
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
