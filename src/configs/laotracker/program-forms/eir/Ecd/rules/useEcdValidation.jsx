import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";

// Static mandatory (always required)
const BASE_MANDATORY = [
  "PbxUCREViGW", // Service provided
  "WwZBYeOLT51", // Payment
  "l2CHcaZ8Sua",
  "pFkHKeFQ5IM",
  "ys5Vh2Uy9ym",
  "tP8r6IQoqpK",
  "jjqWnIz6PNK",
  "O22NLnyyiN3", // Result
  "mHvlqLhgrpC",
  "vdFLgi5nGWE", // Next appointment date (conditionally skipped)
];

const LABELS = {
  PbxUCREViGW: "Service provided",
  WwZBYeOLT51: "Payment",
  l2CHcaZ8Sua: "This field",
  pFkHKeFQ5IM: "This field",
  ys5Vh2Uy9ym: "This field",
  tP8r6IQoqpK: "This field",
  jjqWnIz6PNK: "This field",
  O22NLnyyiN3: "Result",
  mHvlqLhgrpC: "This field",
  vdFLgi5nGWE: "Next appointment date",
  D2o1Qh6LZHh: "Follow-up action",
};

const NEXT_APPT_DE = "vdFLgi5nGWE";
const SKIP_FLAG_DE = "mHvlqLhgrpC"; 

const isEmpty = (v) => v == null || (typeof v === "string" && v.trim() === "");
const getDV = (ev, id) => ev?.dataValues?.find((d) => d.dataElement === id)?.value;
const boolish = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "y";
};

export default function useEcdValidation({ SHOW_LABELS, TRIGGER_DE_ID, TARGET_DE_ID }) {
  const { currentEvent } = useCurrentEvent();
  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );
  const { setLayout, setHandlers } = actions || {};

  const [issues, setIssues] = useState([]);
  const [fieldHelperProps, setFieldHelperProps] = useState({}); // { [deId]: { helpers: [...] } }

  const buildIssues = useCallback(
    (ev) => {
      const errs = [];
      const skipNextAppt = boolish(getDV(ev, SKIP_FLAG_DE));


      BASE_MANDATORY.forEach((id) => {
        if (id === NEXT_APPT_DE && skipNextAppt) return; 
        if (isEmpty(getDV(ev, id))) {
          // errs.push({ deId: id, message: `${LABELS[id] || id} is required.` });
          errs.push({ deId: id, message: `` });
        }
      });


      const triggerLabel = String(getDV(ev, TRIGGER_DE_ID) || "").trim();
      const requireTarget = SHOW_LABELS.has(triggerLabel); 
      if (requireTarget && isEmpty(getDV(ev, TARGET_DE_ID))) {
        errs.push({
          deId: TARGET_DE_ID,
          // message: `${LABELS[TARGET_DE_ID]} is required when Result is "${triggerLabel}".`,
          message: ``,
        });
      }

      return errs;
    },
    [SHOW_LABELS, TRIGGER_DE_ID, TARGET_DE_ID]
  );

  const buildHelpersByField = useCallback((errs) => {
    const byId = {};
    errs.forEach((e) => {
      if (!byId[e.deId]) byId[e.deId] = { helpers: [] };
      byId[e.deId].helpers.push({ type: "WARNING", value: e.message });
    });
    return byId;
  }, []);


  useEffect(() => {
    const ev = currentEvent || {};
    const skipNextAppt = boolish(getDV(ev, SKIP_FLAG_DE));

      if (setLayout) {
      setLayout("hideFields", { [NEXT_APPT_DE]: !!skipNextAppt });
    }

    const errs = buildIssues(ev);
    setIssues(errs);
    setFieldHelperProps(buildHelpersByField(errs));

    if (setLayout) setLayout("disableEventCompleteButton", errs.length > 0);
  }, [currentEvent, setLayout, buildIssues, buildHelpersByField]);


  useEffect(() => {
    if (!setHandlers) return;
    setHandlers("eventSave", async (evArg) => {
      const ev = evArg || currentEvent || {};

      const errs = buildIssues(ev);
      if (errs.length > 0) {
        setIssues(errs);
        setFieldHelperProps(buildHelpersByField(errs));
        return { ok: false, message: "Please fix the highlighted errors." };
      }
      return { ok: true };
    });
    return () => setHandlers("eventSave", null);
  }, [setHandlers, buildIssues, buildHelpersByField, currentEvent]);

  return { issues, fieldHelperProps };
}
