import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import Row from "../Row";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import useTrackerCaptureStore from "@/state/trackerCapture";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";

const AbortionDetails = () => {
  const { event } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentEvent, currentProgramStage, editing } = event;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  return (
    <div>
      <Row
        label={<EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />}
        field={<EventDateFieldNoState disabled={!editing || completed} currentEvent={currentEvent} />}
      />
      {currentProgramStage.programStageDataElements.map((psde) => {
        return (
          <Row
            label={<DataValueLabelNoState dataElement={psde.dataElement.id} currentProgramStage={currentProgramStage} />}
            field={
              <DataValueFieldNoBlurNoState
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
