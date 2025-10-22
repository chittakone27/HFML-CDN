import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "Bokim7QLnF8"; 
const CAR_ID  = "bcnCvxfxNeF"; 

const toAsciiDigits = (str = "") =>
  String(str).replace(/[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g, ch => {
    const c = ch.charCodeAt(0);
    if (c >= 0x0E50 && c <= 0x0E59) return String(c - 0x0E50); 
    if (c >= 0x0ED0 && c <= 0x0ED9) return String(c - 0x0ED0); 
    if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); 
    if (c >= 0x06F0 && c <= 0x06F9) return String(c - 0x06F0); 
    if (c >= 0x0966 && c <= 0x096F) return String(c - 0x0966); 
    return ch;
  });

const parseHMToMinutes = (val) => {
  const s = toAsciiDigits(val).trim();
  const m = /^(\d{1,2})\s*:\s*([0-5]?\d)$/.exec(s);
  if (!m) return NaN;
  const hours = Number(m[1]);
  const mins  = Number(m[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(mins)) return NaN;
  return hours * 60 + mins;
};

const useNearbyRules = () => {
  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({ data: state.data }))
  );
  const { currentTei, currentEvents, selectedEvent } = data || {};
  const currentEvent = currentEvents?.find((ev) => ev.event === selectedEvent);

  useEffect(() => {
    const assignations = {};
    const warnings = {};

    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    const footMin = parseHMToMinutes(dv(FOOT_ID));
    const carMin  = parseHMToMinutes(dv(CAR_ID));

    if (Number.isFinite(footMin) && Number.isFinite(carMin)) {
      if (!(footMin > carMin)) {
        const msg = "Travel time by foot must be less than travel time by car (format H:MM).";
        warnings[FOOT_ID] = msg;
        warnings[CAR_ID]  = msg;
      }
    }

    setProps((prev) => ({
      ...prev,
      assignations,
      warnings,
      hiddenFields: prev.hiddenFields || {},
      disabledFields: prev.disabledFields || {},
      hiddenOptions: prev.hiddenOptions || {},
    }));
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei?.lastSaved)]);

  return props;
};

export default useNearbyRules;
