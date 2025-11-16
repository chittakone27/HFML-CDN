import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "ooCoZbdc3az";   // Travel duration by foot
const CAR_ID  = "bHbKBszX1LW";   // Travel duration by bike (was "car")
const INTEGER_ID = "OWAR8Vpa8IW"; // Ferry fee (integer-only, >= 1000)
const TRIGGER_ID = "SOWCUUYumd6"; // Need to cross river? (Yes/No)
const TRAVEL_CONDITION_ID = "tiXQkpoVypv"; // Travel condition
const BOAT_TIME_ID = "gepvFAO9AZ7";       // Travel time by boat

const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); 
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); 
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); 
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); 
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); 
      return ch;
    }
  );

// explicit "no/false/0/n"
const explicitNo = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return v === false || s === "false" || s === "no" || s === "0" || s === "n";
};

const parseTravelCondition = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  if (!s) return null;

  if (
    s === "foot only" 
  ) {
    return "foot_only";
  }
  if (
    s === "bike only"
  ) {
    return "bike_only";
  }
  return null;
};

const useVillageRules = () => {
  const [props, setProps] = useState({
    warnings: {},          // { [deId]: 'warningCode' }
    hiddenFields: {},
    // mandatoryFields not needed — ALL visible are required in the stage
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
    const hiddenFields = {};
    const hiddenOptions = {};

    const dv = (id) =>
      currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;


    const triggerVal = dv(TRIGGER_ID);
    if (explicitNo(triggerVal)) {
      hiddenFields[INTEGER_ID] = true;
      hiddenFields[BOAT_TIME_ID] = true; 
    }

    if (!hiddenFields[INTEGER_ID]) {
      const rawInt = toAsciiDigits(String(dv(INTEGER_ID) ?? "").trim());
      if (rawInt !== "") {
        if (!/^\d+$/.test(rawInt)) {
          warnings[INTEGER_ID] = "integerOnly";
        } else {
          const num = Number(rawInt);
          if (!Number.isFinite(num) || num < 1000) {
            warnings[INTEGER_ID] = "min1000";
          }
        }
      }
    }

    const travelCondVal = dv(TRAVEL_CONDITION_ID);
    const travelMode = parseTravelCondition(travelCondVal);

    if (travelMode === "foot_only") {
      // can only travel by foot → hide bike duration
      hiddenFields[CAR_ID] = true;
    } else if (travelMode === "bike_only") {
      // can only travel by bike → hide foot duration
      hiddenFields[FOOT_ID] = true;
    }

    hiddenOptions[CAR_ID] = ["cannot_foot"];
    hiddenOptions[FOOT_ID] = ["cannot_bike"];

    setProps((prev) => ({
      ...prev,
      assignations,
      warnings,
      hiddenFields,
      hiddenOptions,
      disabledFields: prev.disabledFields || {},
    }));
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei?.lastSaved)]);

  return props;
};

export default useVillageRules;
export { toAsciiDigits };
