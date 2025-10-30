import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FOOT_ID = "Bokim7QLnF8"; 
const CAR_ID  = "bcnCvxfxNeF"; 
const INTEGER_ONLY_ID = "dBK06ybZUbT"; 

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
  const s = toAsciiDigits(String(val ?? "")).trim();
  const m = /^(\d{1,2})\s*:\s*([0-5]?\d)$/.exec(s);
  if (!m) return NaN;
  const hours = Number(m[1]);
  const mins  = Number(m[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(mins)) return NaN;
  return hours * 60 + mins;
};

const useNearbyRules = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    warnings: {},       
    warningTexts: {},   
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

    const dv = (id) => currentEvent?.dataValues?.find((x) => x.dataElement === id)?.value;

    // // 1) Optional: Foot > Car rule (kept commented as in your file)
    // const footMin = parseHMToMinutes(dv(FOOT_ID));
    // const carMin  = parseHMToMinutes(dv(CAR_ID));
    // if (Number.isFinite(footMin) && Number.isFinite(carMin)) {
    //   if (!(footMin > carMin)) {
    //     const code = "footVsCar";
    //     warnings[FOOT_ID] = code;
    //     warnings[CAR_ID]  = code;
    //     const msg = t("nearby.warnings.footVsCar", {
    //       defaultValue: "Travel time by foot should be greater than travel time by car.",
    //     });
    //     warningTexts[FOOT_ID] = msg;
    //     warningTexts[CAR_ID]  = msg;
    //   }
    // }

    // 2) Integer-only + minimum (>= 1000) guard for dBK06ybZUbT
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

    setProps((prev) => ({
      ...prev,
      assignations,
      warnings,
      warningTexts,
      hiddenFields: prev.hiddenFields || {},
      disabledFields: prev.disabledFields || {},
      hiddenOptions: prev.hiddenOptions || {},
    }));
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei?.lastSaved), t]);

  return props;
};

export default useNearbyRules;
