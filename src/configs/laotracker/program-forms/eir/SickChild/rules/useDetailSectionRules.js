import { useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
import { getDataVl } from "../helper";
import { GROWTH_MONITOR_DES, MAX_LIMIT, MIN_LIMIT } from "../const";

const { HEIGHT, WEIGHT, MUAC } = GROWTH_MONITOR_DES;

const useDetailSectionRules = () => {
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;

  // keep only 1 decimal if more; leave integers as-is
  const formatToFirstDecimalNumStr = (raw) => {
    const s = String(raw ?? "");
    const parts = s.split(".");
    if (parts.length === 2 && parts[1].length > 1) {
      parts[1] = parts[1][0];
      return `${parts[0]}.${parts[1]}`;
    }
    return s;
  };

  // Inputs the user types while still composing a number
  // (don’t clamp yet on these)
  const isInterim = (raw) => {
    if (raw === null || raw === undefined) return true;
    const s = String(raw).trim();
    if (s === "") return true;               // empty
    if (s === "-" || s === "+") return true; // just a sign
    if (s.endsWith(".")) return true;        // trailing decimal point (e.g., "30.")
    // allow partial numerics like "0.", "3.", "030", etc.
    return !/^[0-9]*\.?[0-9]*$/.test(s);
  };

  // Only clamp to min once user has typed enough digits
  // (so typing "3" doesn't immediately become 30)
  const typedEnoughForMin = (raw, minValue) => {
    const s = String(raw).trim();
    const digits = s.replace(/\D/g, "").length;
    const minDigits = String(minValue).replace(/\D/g, "").length;
    return digits >= minDigits && !s.endsWith(".");
  };

  const handleLimitedDataValue = (deId, deVl, minValue, maxValue) => {
    if (deVl === null || deVl === undefined) return;

    const raw = String(deVl);
    // If still composing (partial), let the user type
    if (isInterim(raw)) return;

    const num = parseFloat(raw);
    if (Number.isNaN(num)) return;

    // Always cap immediately if above max
    if (num > maxValue) {
      changeDataValue(currentEvent.event, deId, formatToFirstDecimalNumStr(maxValue.toString()));
      return;
    }

    // For values below min: only clamp once "enough digits" are typed
    if (num < minValue) {
      if (!typedEnoughForMin(raw, minValue)) return; // let them finish typing
      changeDataValue(currentEvent.event, deId, formatToFirstDecimalNumStr(minValue.toString()));
      return;
    }

    // Within range → normalize to at most 1 decimal (if any)
    const formatted = formatToFirstDecimalNumStr(num.toString());
    if (formatted !== raw) {
      changeDataValue(currentEvent.event, deId, formatted);
    }
  };

  useEffect(() => {
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
