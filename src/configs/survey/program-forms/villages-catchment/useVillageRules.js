import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const FOOT_ID = "ooCoZbdc3az";   // By foot (string like "0:15")
const CAR_ID  = "bHbKBszX1LW";   // By car  (string like "1:50")
const INTEGER_ID = "OWAR8Vpa8IW"; // must be whole number >= 1000
const TRIGGER_ID = "SOWCUUYumd6"; // when FALSE, hide INTEGER_ID

// Normalize non-ASCII digits to ASCII
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

// explicit "no/false/0/n"
const explicitNo = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return v === false || s === "false" || s === "no" || s === "0" || s === "n";
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

    // Helper to read a DE value
    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    // VISIBILITY: hide INTEGER_ID when TRIGGER_ID is explicitly "no/false/0/n"
    const triggerVal = dv(TRIGGER_ID);
    if (explicitNo(triggerVal)) hiddenFields[INTEGER_ID] = true;

    // ---- Rule: INTEGER ONLY + MIN >= 1000 for OWAR8Vpa8IW (only when visible) ----
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

    // Optional: hide specific options if these DEs use option sets
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
