import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "ooCoZbdc3az";   
const CAR_ID  = "bHbKBszX1LW";   
const INTEGER_ID = "OWAR8Vpa8IW"; 
const TRIGGER_ID = "SOWCUUYumd6"; 


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

// explicit "no/false/0/n"
const explicitNo = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return v === false || s === "false" || s === "no" || s === "0" || s === "n";
};

const useVillageRules = () => {
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
    const warnings = {};
    const hiddenFields = {};
    const hiddenOptions = {};

    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    const triggerVal = dv(TRIGGER_ID);
    if (explicitNo(triggerVal)) hiddenFields[INTEGER_ID] = true;

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

    hiddenOptions[CAR_ID] = [
      "cannot_foot",
    ];
    hiddenOptions[FOOT_ID] = [
      "cannot_bike",
    ];

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
