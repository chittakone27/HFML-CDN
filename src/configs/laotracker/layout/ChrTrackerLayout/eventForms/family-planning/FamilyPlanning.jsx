import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import Row from "@/configs/laotracker/layout/ChrTrackerLayout/Row";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import { useEffect } from "react";
import useSelectionStore from "@/state/selection";
import { add } from "date-fns";
const FamilyPlanning = () => {
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const program = useSelectionStore((state) => state.program);
  const programStageSection = program.programStages[0].programStageSections[0];
  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";

  useEffect(() => {
    let order = ["eventDate"];
    programStageSection.dataElements.forEach((de) => {
      order.push(de.id);
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
      {programStageSection.dataElements.map((de, index) => {
        const foundIndex = order.findIndex((o) => o === de.id);
        return (
          <Row
            label={
              <div style={{ display: "flex" }}>
                {foundIndex + 1}.&nbsp;
                <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
              </div>
            }
            field={
              <DataValueFieldNoBlurNoState
                change={(value) => {
                  changeDataValue(de.id, value);
                }}
                accept={(value) => {
                  changeDataValue(de.id, value);
                }}
                disabled={!editing || completed}
                dataElement={de.id}
                currentProgramStage={currentProgramStage}
                currentEvent={currentEvent}
                maxDate={currentEvent.eventDate ? add(new Date(currentEvent.eventDate), { years: 11 }) : null}
              />
            }
          />
        );
      })}
    </div>
  );
};

export default FamilyPlanning;
