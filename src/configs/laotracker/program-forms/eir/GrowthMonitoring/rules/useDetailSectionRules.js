import { useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
import { getDataVl } from "../helper";
import { GROWTH_MONITOR_DES, MAX_LIMIT, MIN_LIMIT } from "../const";

const { HEIGHT, WEIGHT, MUAC } = GROWTH_MONITOR_DES;


const EXCLUDED_IDS = new Set(["xvE2z6W3wYh", "acQoZnFeVYZ", "fwerjuyn3QC"]);

const useDetailSectionRules = () => {
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;


  const formatToFirstDecimalNumStr = (raw) => {
    const s = String(raw ?? "");
    const parts = s.split(".");
    if (parts.length === 2 && parts[1].length > 1) {
      parts[1] = parts[1][0];
      return `${parts[0]}.${parts[1]}`;
    }
    return s;
  };


  

  const isInterim = (raw) => {
    if (raw === null || raw === undefined) return true;
    const s = String(raw).trim();
    if (s === "") return true;               
    if (s === "-" || s === "+") return true; 
    if (s.endsWith(".")) return true;        

    return !/^[0-9]*\.?[0-9]*$/.test(s);
  };

  const typedEnoughForMin = (raw, minValue) => {
    const s = String(raw).trim();
    const digits = s.replace(/\D/g, "").length;
    const minDigits = String(minValue).replace(/\D/g, "").length;
    return digits >= minDigits && !s.endsWith(".");
  };

  const handleLimitedDataValue = (deId, deVl, minValue, maxValue) => {

    if (EXCLUDED_IDS.has(deId)) return;

    if (deVl === null || deVl === undefined) return;

    const raw = String(deVl);

    if (isInterim(raw)) return;

    const num = parseFloat(raw);
    if (Number.isNaN(num)) return;

    if (num > maxValue) {
      changeDataValue(
        currentEvent.event,
        deId,
        formatToFirstDecimalNumStr(maxValue.toString())
      );
      return;
    }

    if (num < minValue) {
      if (!typedEnoughForMin(raw, minValue)) return; 
      changeDataValue(
        currentEvent.event,
        deId,
        formatToFirstDecimalNumStr(minValue.toString())
      );
      return;
    }

    const formatted = formatToFirstDecimalNumStr(num.toString());
    if (formatted !== raw) {
      changeDataValue(currentEvent.event, deId, formatted);
    }
  };

  useEffect(() => {
    if (!currentEvent || !currentEvent.dataValues) return;

    const height = getDataVl(currentEvent.dataValues, HEIGHT);
    const weight = getDataVl(currentEvent.dataValues, WEIGHT);
    const muac   = getDataVl(currentEvent.dataValues, MUAC);

    handleLimitedDataValue(HEIGHT, height, MIN_LIMIT.HEIGHT, MAX_LIMIT.HEIGHT);
    handleLimitedDataValue(WEIGHT, weight, MIN_LIMIT.WEIGHT, MAX_LIMIT.WEIGHT);
    handleLimitedDataValue(MUAC,   muac,   MIN_LIMIT.MUAC,   MAX_LIMIT.MUAC);
  }, [JSON.stringify(currentEvent)]);

  return 1;
};

export default useDetailSectionRules;
