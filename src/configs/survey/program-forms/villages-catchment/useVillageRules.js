import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "ooCoZbdc3az";  // Travel time (hour) By foot (e.g. "0:15")
const CAR_ID  = "bHbKBszX1LW";  // Travel time (hour) By car  (e.g. "1:50")

// Normalize non-ASCII digits (Thai/Lao/Arabic etc.) to ASCII
const toAsciiDigits = (str = "") =>
  String(str).replace(/[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g, ch => {
    const c = ch.charCodeAt(0);
    if (c >= 0x0E50 && c <= 0x0E59) return String(c - 0x0E50); // Thai
    if (c >= 0x0ED0 && c <= 0x0ED9) return String(c - 0x0ED0); // Lao
    if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); // Arabic-Indic
    if (c >= 0x06F0 && c <= 0x06F9) return String(c - 0x06F0); // Ext Arabic-Indic
    if (c >= 0x0966 && c <= 0x096F) return String(c - 0x0966); // Devanagari
    return ch;
  });

// Parse "H:MM" -> total minutes, NaN if invalid
const parseHMToMinutes = (val) => {
  if (val == null) return NaN;
  const s = toAsciiDigits(String(val)).trim();
  const m = /^(\d{1,2})\s*:\s*([0-5]?\d)$/.exec(s);
  if (!m) return NaN;
  const hours = Number(m[1]);
  const mins  = Number(m[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(mins)) return NaN;
  return hours * 60 + mins;
};

const useVillageRules = () => {
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

    // Helper to read a DE value
    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    // ---- Rule: Foot time must be strictly less than Car time ----
    const footMin = parseHMToMinutes(dv(FOOT_ID));
    const carMin  = parseHMToMinutes(dv(CAR_ID));

    if (Number.isFinite(footMin) && Number.isFinite(carMin)) {
      if (!(footMin > carMin)) {
        const msg = "Travel time by foot must be less than travel time by car (format H:MM).";
        warnings[FOOT_ID] = msg;
        warnings[CAR_ID]  = msg;
      }
    }
    // If missing/unparsable, the component's “all mandatory” guard will handle it.

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

export default useVillageRules;
