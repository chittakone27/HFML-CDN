import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TRAVEL_CONDITION_ID = "dfMxJtpEVY0"; // Travel condition (option set)
const FOOT_DURATION_ID = "Bokim7QLnF8";    // Travel duration – foot
const BIKE_DURATION_ID = "bcnCvxfxNeF";    // Travel duration – bike
const FERRY_FEE_ID = "dBK06ybZUbT";          // Ferry fee
// Boat-related DEs
const BOAT_TIME_ID = "yZfjh0SBRzz";        // Travel time by boat

const INTEGER_ONLY_ID = "dBK06ybZUbT";     // integer, >= 1000

// Normalize non-ASCII digits to ASCII
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
    }
  );

const isNo = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return (
    v === false ||
    v === 0 ||
    s === "0" ||
    s === "false" ||
    s === "no" ||
    s === "n"
  );
};

const norm = (s) => String(s ?? "").trim().toLowerCase();

const useNearbyRules = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    warnings: {},
    warningTexts: {},
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
    const warningTexts = {};
    const hiddenOptions = {};
    const hiddenFields = {};

    const dv = (id) =>
      currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    const travelCondRaw = dv(TRAVEL_CONDITION_ID);
    const travelCond = norm(travelCondRaw);

    let hideFoot = false;
    let hideBike = false;
    let hideBoat = false;

    if (travelCond) {
      const hasFoot = travelCond.includes("foot");
      const hasBike = travelCond.includes("bike");
      const hasBoat = travelCond.includes("boat");

      if (!hasFoot) hideFoot = true;
      if (!hasBike) hideBike = true;
      if (!hasBoat) hideBoat = true;
    }

    if (hideFoot) {
      hiddenFields[FOOT_DURATION_ID] = true; // Bokim7QLnF8
    }
    if (hideBike) {
      hiddenFields[BIKE_DURATION_ID] = true; // bcnCvxfxNeF
    }
    if (hideBoat) {
      hiddenFields[BOAT_TIME_ID] = true; // yZfjh0SBRzz
    }
    if (hideBoat) {
      hiddenFields[FERRY_FEE_ID] = true; // dBK06ybZUbT
    }

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

    hiddenOptions[BOAT_TIME_ID] = ["cannot_foot", "cannot_bike"];

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
