import useTrackerCaptureStore from "@/state/trackerCapture";
import _ from "lodash";

const usePreviousEvents = (programStageId, currentEvent) => {
  const { currentEvents, selectedEvent } = useTrackerCaptureStore((state) => state.data);

  const events = _.sortBy(currentEvents, "eventDate");
  const stageEvents = events.filter((ev) => ev.programStage === programStageId).filter((ev) => ev.event !== currentEvent.event);

  return stageEvents;
};

export default usePreviousEvents;
