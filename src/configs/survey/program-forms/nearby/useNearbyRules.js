// src/configs/laotracker/program-forms/nearby/useNearbyRules.js
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "Bokim7QLnF8"; // Travel time by foot (H:MM)
const CAR_ID  = "bcnCvxfxNeF"; // Travel time by car  (H:MM)
const INTEGER_ONLY_ID = "dBK06ybZUbT"; // MUST be integer (non-negative)

// normalize non-ASCII digits to ASCII
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

// Parse "H:MM" to minutes
const parseHMToMinutes = (val) => {
  const s = toAsciiDigits(String(val ?? "")).trim();
  const m = /^(\d{1,2})\s*:\s*([0-5]?\d)$/.exec(s);
  if (!m) return NaN;
  const hours = Number(m[1]);
  const mins  = Number(m[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(mins)) return NaN;
  return hours * 60 + mins;
};

const useNearbyRules = () => {
  const [props, setProps] = useState({
    warnings: {},          // { [deId]: 'warningCode' }
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
    const warnings = {}; // store *codes*; translate in the UI

    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    // 1) Foot (minutes) should be GREATER than Car (minutes)
    const footMin = parseHMToMinutes(dv(FOOT_ID));
    const carMin  = parseHMToMinutes(dv(CAR_ID));
    if (Number.isFinite(footMin) && Number.isFinite(carMin)) {
      if (!(footMin > carMin)) {
        const code = "footVsCar";      // <-- translate later
        warnings[FOOT_ID] = code;
        warnings[CAR_ID]  = code;
      }
    }

    // 2) Integer-only guard for dBK06ybZUbT (non-negative integers only)
    const intRaw = toAsciiDigits(String(dv(INTEGER_ONLY_ID) ?? "").trim());
    if (intRaw !== "" && !/^\d+$/.test(intRaw)) {
      warnings[INTEGER_ONLY_ID] = "integerOnly"; // <-- translate later
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
