import useTrackerCaptureStore from "@/state/trackerCapture";
import _ from "lodash";

const usePreviousEvents = (programStageId) => {
  const { currentEvents, selectedEvent } = useTrackerCaptureStore((state) => state.data);

  const events = _.sortBy(currentEvents, "eventDate");
  const stageEvents = events.filter((ev) => ev.programStage === programStageId);

  if (stageEvents.length === 1) return [];
  const currentEventIdx = stageEvents.findIndex((ev) => ev.event === selectedEvent);
  if (currentEventIdx === 0) return [];
  return stageEvents.slice(0, currentEventIdx);
};

export default usePreviousEvents;
