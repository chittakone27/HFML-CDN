import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";

const MANDATORY = [
  "Do3RE2NXrxp",
  "RmOOSIhlPCe",
  "ayGwH2TiTnH",
  "XSPP8Mk61ND", // Height
  "S9XyKsAbuL9", // Weight
  "BM2NqJZcLCg",
  "nvOV3SOzeAj",
  "ATIQuAZ9lU0",
  "lLhbPilxIHC",
  "yZo8WgcTvBi",
  "BbPkveDfb5T" // MUAC
  // "rgDuTaKYmIA", // Next visit date
];

const LABELS = {
  Do3RE2NXrxp: "Visit type",
  RmOOSIhlPCe: "Service provided",
  ayGwH2TiTnH: "Payment",
  XSPP8Mk61ND: "Height (cm)",
  S9XyKsAbuL9: "Weight (kg)",
  BM2NqJZcLCg: "Diagnosis",
  nvOV3SOzeAj: "Main diagnosis",
  ATIQuAZ9lU0: "Hospitalized",
  lLhbPilxIHC: "Treatment outcome",
  yZo8WgcTvBi: "Referred",
  rgDuTaKYmIA: "Next visit date",


  fAoWiYGCuvz: "ORS received (bags)",
  qh8i5p7yZX4: "Zinc received (tablets)",
  EJ10RvCF4DK: "RUTF received (Sachets)",
  DtM9O0NrjcP: "F100 received (grams)",
  F8dkD0Q07Om: "F75 received (grams) (37.5–750, up to 2 decimals)",
  rsE2q1cDpqe: "ResoMal 84g received (bags) (≤ 50)",
  Sl1BmkUV9HD: "Antibiotics 500mg (≤ 50)",
};

// Base ranges
const RANGE_RULES = {
  XSPP8Mk61ND: { min: 30,  max: 150, label: LABELS.XSPP8Mk61ND }, // Height
  S9XyKsAbuL9: { min: 1,   max: 50,  label: LABELS.S9XyKsAbuL9 }, // Weight
  BbPkveDfb5T: { min: 2,   max: 50,  label: LABELS.BbPkveDfb5T }, // MUAC

  // Extras
  fAoWiYGCuvz: {               max: 50,            label: LABELS.fAoWiYGCuvz },
  qh8i5p7yZX4: {               max: 50,            label: LABELS.qh8i5p7yZX4 },
  EJ10RvCF4DK: {               max: 50,            label: LABELS.EJ10RvCF4DK },
  DtM9O0NrjcP: { min: 50,      max: 1000,          label: LABELS.DtM9O0NrjcP },
  F8dkD0Q07Om: { min: 37.5,    max: 750,  maxDp: 2, label: LABELS.F8dkD0Q07Om }, // up to 2 decimals
  rsE2q1cDpqe: {               max: 50,            label: LABELS.rsE2q1cDpqe },
  Sl1BmkUV9HD: {               max: 50,            label: LABELS.Sl1BmkUV9HD },
};

// Exactly one decimal for Height & Weight
const EXACT_ONE_DECIMAL_IDS = new Set(["XSPP8Mk61ND", "S9XyKsAbuL9"]);
const hasExactlyOneDecimal = (raw) => /^-?\d+\.\d$/.test(String(raw).trim());


const isEmpty = (v) => v == null || (typeof v === "string" && v.trim() === "");
const getDV = (ev, id) => ev?.dataValues?.find((d) => d.dataElement === id)?.value;
const decimalPlaces = (raw) => {
  const s = String(raw ?? "").trim();
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
};

const MUAC_ID = "BbPkveDfb5T";

export default function useSickChildValidation() {
  const { currentEvent } = useCurrentEvent();
  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );
  const { setLayout, setHandlers } = actions || {};

  const [fieldHelperProps, setFieldHelperProps] = useState({}); // { deId: { helpers:[{type,value}], sx } }

  const computeIssues = useCallback((ev) => {
    const issues = [];    
    const helpers = {};  

    const baseSx = {
      "& .MuiFormHelperText-root": { fontSize: 12, fontStyle: "normal", fontWeight: 400 },
    };

    const ensureSlot = (id) => {
      if (!helpers[id]) helpers[id] = { helpers: [], sx: baseSx };
    };

    const pushError = (id, msg) => {
      ensureSlot(id);
      helpers[id].helpers.push({ type: "ERROR", value: msg });
      issues.push(msg); 
    };

    const pushWarn = (id, msg) => {
      ensureSlot(id);
      helpers[id].helpers.push({ type: "WARNING", value: msg }); // warnings do NOT block
    };

    // Mandatory
    for (const id of MANDATORY) {
      if (isEmpty(getDV(ev, id))) {
        // pushError(id, `${LABELS[id] || id} is required.`);
        pushError(id, ``);
      }
    }

    for (const [id, cfg] of Object.entries(RANGE_RULES)) {
      const raw = getDV(ev, id);
      if (isEmpty(raw)) continue;

   
      if (EXACT_ONE_DECIMAL_IDS.has(id) && !hasExactlyOneDecimal(raw)) {
        pushError(id, `${cfg.label} must have exactly 1 decimal (e.g., 50.0). You entered "${raw}".`);
        continue; // skip further checks for this field
      }

   
      if (cfg.maxDp != null && decimalPlaces(raw) > cfg.maxDp) {
        pushError(id, `${cfg.label} must have at most ${cfg.maxDp} decimal places. You entered "${raw}".`);
        continue;
      }

      const num = Number(raw);
      if (Number.isNaN(num)) {
        pushError(id, `${cfg.label} must be a number. You entered "${raw}".`);
        continue;
      }

      if (id === MUAC_ID && num < 11.5) {
        pushWarn(id, `This child is identified as SAM.`);
      }

      if (cfg.min != null && num < cfg.min) {
        pushError(id, `${cfg.label} must be ≥ ${cfg.min}. You entered "${raw}".`);
      }
      if (cfg.max != null && num > cfg.max) {
        pushError(id, `${cfg.label} must be ≤ ${cfg.max}. You entered "${raw}".`);
      }
    }

    return { issues, helpers };
  }, []);


  useEffect(() => {
    const { issues, helpers } = computeIssues(currentEvent);
    setFieldHelperProps(helpers);
    const hasErrors = issues.length > 0; // warnings do not contribute here
    setLayout?.("disableEventCompleteButton", hasErrors);


    setHandlers?.("eventSave", async () => {
      const { issues: onSaveIssues, helpers: onSaveHelpers } = computeIssues(currentEvent);
      if (onSaveIssues.length > 0) {
        setFieldHelperProps(onSaveHelpers); // ensure inline messages are visible
        alert(`Please fix the following before completing:\n\n- ${onSaveIssues.join("\n- ")}`);
        return { ok: false };
      }
      return { ok: true };
    });
  }, [computeIssues, currentEvent, setLayout, setHandlers]);

  return { fieldHelperProps };
}
