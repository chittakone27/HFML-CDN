import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FOOT_ID = "Bokim7QLnF8";
const CAR_ID  = "bcnCvxfxNeF";
const INTEGER_ONLY_ID = "dBK06ybZUbT"; // integer, >= 1000
const TRIGGER_ID = "jWinhL2rxeK";      // controls visibility of INTEGER_ONLY_ID

// Normalize non-ASCII digits to ASCII
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

// Interprets “false/no/0” as a hiding trigger
const isNo = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return v === false || v === 0 || s === "0" || s === "false" || s === "no" || s === "n";
};

const useNearbyRules = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    warnings: {},
    warningTexts: {},
    hiddenFields: {},
    // mandatoryFields intentionally unused — NearbyStage makes *all visible* mandatory
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
    const warningTexts = {};
    const hiddenOptions = {};
    const hiddenFields = {};

    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    // Dynamically hide INTEGER_ONLY_ID when trigger says "no/false/0"
    const triggerVal = dv(TRIGGER_ID);
    if (isNo(triggerVal)) hiddenFields[INTEGER_ONLY_ID] = true;

    // Integer-only + minimum >= 1000 (apply only when visible)
    if (!hiddenFields[INTEGER_ONLY_ID]) {
      const intRaw = toAsciiDigits(String(dv(INTEGER_ONLY_ID) ?? "").trim());
      if (intRaw !== "") {
        if (!/^\d+$/.test(intRaw)) {
          warnings[INTEGER_ONLY_ID] = "integerOnly";
          warningTexts[INTEGER_ONLY_ID] = t("nearby.warnings.integerOnly", {
            defaultValue: "Please enter a whole number (digits 0–9 only).",
          });
        } else {
          const num = Number(intRaw);
          if (!Number.isFinite(num) || num < 1000) {
            warnings[INTEGER_ONLY_ID] = "min1000";
            warningTexts[INTEGER_ONLY_ID] = t("nearby.warnings.min1000", {
              min: 1000,
              defaultValue: "Value must be at least 1000.",
            });
          }
        }
      }
    }

    // Hide specific options as requested
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
      warningTexts,
      hiddenFields,
      hiddenOptions,
      disabledFields: prev.disabledFields || {},
    }));
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei?.lastSaved), t]);

  return props;
};

export default useNearbyRules;
export { toAsciiDigits };
