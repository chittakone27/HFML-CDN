import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";

const useCurrentEvent = () => {
  const { program } = useSelectionStore((state) => ({ program: state.program }), shallow);

  const { data } = useTrackerCaptureStore((state) => ({ data: state.data }), shallow);
  const { currentEvents, selectedEvent } = data;
  if (!selectedEvent) {
    return { currentEvent: null, currentProgramStage: null };
  }

  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  if (currentEvent) {
    const currentProgramStage = program.programStages.find((ps) => ps.id === currentEvent.programStage);
    return { currentEvent, currentProgramStage };
  } else {
    return { currentEvent: {}, currentProgramStage: {} };
  }
};

export default useCurrentEvent;
