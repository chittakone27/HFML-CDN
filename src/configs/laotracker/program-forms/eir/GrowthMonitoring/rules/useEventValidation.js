import { useCallback, useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";

// === CONFIG ===============================================================
const MANDATORY_IDS = new Set([
  "duK3cRDufXz", // service provide
  "QItRCoRSXo6", // payment
  "xvE2z6W3wYh", // Height (cm)
  "acQoZnFeVYZ", // Weight (kg)
  "fwerjuyn3QC", // MUAC (cm)
  "GVHTqqwolWD", // Vit A 100k
  "bTz0sXjXF4I", // Vit A 200k
  "VUn6z5bss2H", // Deworming
  "hPyn2zYB4Ld", // Counseling
  "ejM2imqrnUF", // Referred
  "SeI2XVTYwDZ", // Next appointment date
]);

const NEXT_APPT_ID = "SeI2XVTYwDZ";
const REFERRED_ID = "ejM2imqrnUF";

// Min/Max + labels
const RANGE_RULES = {
  xvE2z6W3wYh: { min: 30, max: 150, label: "Height (cm)" },
  acQoZnFeVYZ: { min: 1,  max: 50,  label: "Weight (kg)" },
  fwerjuyn3QC: { min: 2,  max: 50,  label: "MUAC (cm)"  },
};

const LABELS = {
  duK3cRDufXz: "Service provider",
  QItRCoRSXo6: "Payment",
  xvE2z6W3wYh: "Height (cm)",
  acQoZnFeVYZ: "Weight (kg)",
  fwerjuyn3QC: "MUAC (cm)",
  GVHTqqwolWD: "Vitamin A 100 000 UI",
  bTz0sXjXF4I: "Vitamin A 200 000 UI",
  VUn6z5bss2H: "Deworming",
  hPyn2zYB4Ld: "Received counseling on breastfeeding, complementary feeding and early childhood development",
  ejM2imqrnUF: "Referred",
  SeI2XVTYwDZ: "Next appointment date",
};

const EXACT_ONE_DECIMAL_IDS = new Set(["xvE2z6W3wYh", "acQoZnFeVYZ"]);

const isEmpty = (v) => v == null || (typeof v === "string" && v.trim() === "");
const getDV = (ev, id) => ev?.dataValues?.find((d) => d.dataElement === id)?.value;

const hasExactlyOneDecimal = (raw) => /^-?\d+\.\d$/.test(String(raw).trim());

const hasAtMostOneDecimal = (raw) => /^-?\d+(\.\d)?$/.test(String(raw).trim());

export default function useEventValidation() {
  const { currentEvent } = useCurrentEvent();
  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );
  const { setLayout, setHandlers } = actions || {};

  const [errors, setErrors] = useState([]);
  const [fieldHelperProps, setFieldHelperProps] = useState({}); // { [deId]: { helpers: [...] } }

  const pushIssue = (arr, { deId, message, severity = "ERROR" }) =>
    arr.push({ deId, message, severity });

  const toInt = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const isSelected = (v) => {
    const n = toInt(v);
    if (n !== null) return n > 0;
    const s = String(v || "").toLowerCase().trim();
    return ["yes", "true", "selected", "1"].includes(s);
  };

  const isUnder6Months = (yy, mm) => yy === 0 && mm >= 6 && mm < 12;
  const is6to11Months  = (yy, mm) => yy >= 1 && mm >= 0 && mm < 12;

  const computeIssues = useCallback((ev) => {
    const issues = [];

    const referredYes = isSelected(getDV(ev, REFERRED_ID));

    for (const id of MANDATORY_IDS) {
      if (id === NEXT_APPT_ID && referredYes) continue;
      if (isEmpty(getDV(ev, id))) {
        pushIssue(issues, { deId: id, message: `` });
      }
    }

     for (const [id, cfg] of Object.entries(RANGE_RULES)) {
      const raw = getDV(ev, id);
      if (isEmpty(raw)) continue;

      const label = cfg.label || LABELS[id] || id;

      if (EXACT_ONE_DECIMAL_IDS.has(id)) {
        if (!hasExactlyOneDecimal(raw)) {
          pushIssue(issues, {
            deId: id,
            message: `${label} must have exactly 1 decimal (e.g., 50.0). You entered "${raw}".`,
          });
        }
      } else {
        if (!hasAtMostOneDecimal(raw)) {
          pushIssue(issues, {
            deId: id,
            message: `${label} must have at most 1 decimal. You entered "${raw}".`,
          });
        }
      }

      const num = Number(raw);
      if (Number.isNaN(num)) {
        pushIssue(issues, { deId: id, message: `${label} must be a number.` });
      } else {
        if (id === "fwerjuyn3QC" && num < 11.5) {
          pushIssue(issues, {
            deId: id,
            message: `This child is identified as SAM.`,
            severity: "WARNING",
          });
        }
        if (num < cfg.min || num > cfg.max) {
          pushIssue(issues, {
            deId: id,
            message: `${label} must be between ${cfg.min} and ${cfg.max} (got ${raw}).`,
          });
        }
      }
    }

    const vitA100 = getDV(ev, "GVHTqqwolWD"); // 100,000 IU
    const vitA200 = getDV(ev, "bTz0sXjXF4I"); // 200,000 IU

    const ageYearRaw = getDV(ev, "XxJ8Ta1NoAV"); // years
    const ageMonthRaw = getDV(ev, "MV1yoC7BfnG"); // months
    const ageYear = toInt(ageYearRaw);
    const ageMonth = toInt(ageMonthRaw);
    const hasAge = ageYear !== null && ageMonth !== null;

    if (isSelected(vitA100) && hasAge) {
      if (!isUnder6Months(ageYear, ageMonth)) {
        pushIssue(issues, {
          deId: "GVHTqqwolWD",
          message: `Vitamin A 100,000 IU is only for children 6-11 months.`,
          severity: "WARNING",
        });
      }
    }

    if (isSelected(vitA200) && hasAge) {
      if (!is6to11Months(ageYear, ageMonth)) {
        pushIssue(issues, {
          deId: "bTz0sXjXF4I",
          message: `Vitamin A 200,000 IU is only for children 12–60 months.`,
          severity: "WARNING",
        });
      }
    }

    return issues;
  }, []);

  const buildFieldHelpers = useCallback((issues) => {
    const byId = {};
    issues.forEach((e) => {
      if (!byId[e.deId]) byId[e.deId] = { helpers: [] };
      const type = e.severity === "ERROR" ? "ERROR" : (e.severity === "WARNING" ? "WARNING" : "INFO");
      byId[e.deId].helpers.push({ type, value: e.message });
    });
    return byId;
  }, []);

  useEffect(() => {
    if (!setLayout) return;
    const ev = currentEvent || {};
    const issues = computeIssues(ev);
    setErrors(issues);
    setFieldHelperProps(buildFieldHelpers(issues));
    const hasErrors = issues.some((i) => i.severity === "ERROR");
    setLayout("disableEventCompleteButton", hasErrors);
  }, [computeIssues, buildFieldHelpers, currentEvent, setLayout]);

  useEffect(() => {
    if (!setHandlers) return;
    setHandlers("eventSave", async (evArg) => {
      const ev = evArg || currentEvent || {};
      const issues = computeIssues(ev);
      const hasErrors = issues.some((i) => i.severity === "ERROR");
      setErrors(issues);
      setFieldHelperProps(buildFieldHelpers(issues));
      if (hasErrors) {
        return { ok: false, message: "Please fix the highlighted errors." };
      }
      return { ok: true };
    });
    return () => setHandlers("eventSave", null);
  }, [setHandlers, computeIssues, buildFieldHelpers, currentEvent]);

  return {
    fieldHelperProps,
    errors,
    isCompleteDisabled: errors.some((i) => i.severity === "ERROR"),
  };
}