import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { getDataVl } from "../helper";
import { GROWTH_MONITOR_DES } from "../const";


const { HEIGHT, WEIGHT } = GROWTH_MONITOR_DES;

const useCompleteGuard = () => {
  const { currentEvent } = useCurrentEvent();

  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );

  useEffect(() => {

    const dv = currentEvent?.dataValues ?? [];
    const height = getDataVl(dv, HEIGHT);
    const weight = getDataVl(dv, WEIGHT);

    const missing = !height || !weight; // both required
    actions?.setCompleteBlocked?.(missing);
  }, [JSON.stringify(currentEvent)]);
};

export default useCompleteGuard;
