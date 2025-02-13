import { useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
//
import { getDataVl } from "../helper";
import { GROWTH_MONITOR_DES, MAX_LIMIT } from "../const";
const { HEIGHT, WEIGHT, MUAC } = GROWTH_MONITOR_DES;

const useDetailSectionRules = () => {
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;

  const formatToFirstDecimalNumStr = (floatNumStr) => {
    const parts = floatNumStr.split(".");
    if (parts.length === 2 && parts[1].length > 1) {
      parts[1] = parts[1].charAt(0);
      return parts.join(".");
    } else {
      return floatNumStr;
    }
  };

  const handleLimitedDataValue = (deId, deVl, limitValue) => {
    if (deVl) {
      if (parseFloat(deVl) > limitValue) {
        changeDataValue(currentEvent.event, deId, limitValue.toString());
      } else {
        const formattedDeVl = formatToFirstDecimalNumStr(deVl);
        changeDataValue(currentEvent.event, deId, formattedDeVl);
      }
    }
  };

  useEffect(() => {
    const height = getDataVl(currentEvent.dataValues, HEIGHT);
    const weight = getDataVl(currentEvent.dataValues, WEIGHT);
    const muac = getDataVl(currentEvent.dataValues, MUAC);
    handleLimitedDataValue(HEIGHT, height, MAX_LIMIT.HEIGHT);
    handleLimitedDataValue(WEIGHT, weight, MAX_LIMIT.WEIGHT);
    handleLimitedDataValue(MUAC, muac, MAX_LIMIT.MUAC);
  }, [JSON.stringify(currentEvent)]);

  return 1;
};

export default useDetailSectionRules;
