import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { getDataVl } from "../helper";
import { GROWTH_MONITOR_DES } from "../const";

/**
 * Blocks the global "Complete" action whenever HEIGHT or WEIGHT is missing.
 * Assumes the store exposes actions.setCompleteBlocked(flag:boolean)
 * and the footer reads ui.completeBlocked to disable the Complete button.
 */
const { HEIGHT, WEIGHT } = GROWTH_MONITOR_DES;

const useCompleteGuard = () => {
  const { currentEvent } = useCurrentEvent();

  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );

  useEffect(() => {
    // Defensive: if no event or no dataValues, block completing
    const dv = currentEvent?.dataValues ?? [];
    const height = getDataVl(dv, HEIGHT);
    const weight = getDataVl(dv, WEIGHT);

    const missing = !height || !weight; // both required
    actions?.setCompleteBlocked?.(missing);
  }, [JSON.stringify(currentEvent)]);
};

export default useCompleteGuard;
