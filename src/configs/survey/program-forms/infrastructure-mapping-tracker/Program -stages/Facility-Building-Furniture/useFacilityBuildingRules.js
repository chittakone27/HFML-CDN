import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";

// 7. On-site internet available (can connect to the internet?)
const AVAIL_SEL = "fszEmzFYXHU";

// 6. Can receive phone call? (anchor for 6.1 operator list)
const OP_ANCHOR_ID = "JYVWqdlRq4Y";

// Operator: Others (checkbox) → then require Service Provider text
const OTHERS_ID = "BRHYwOIZ01O";
const SERVICE_PROVIDER_ID = "O5TwLn4hWFr";

// 8. Connection type selector + detail fields
const TYPE_CONN_ID   = "eWrvOj7ZUL2"; // Wifi/Cable/Both
const WIFI_FIELD_ID  = "nhilsZioxC9"; // Wifi detail
const CABLE_FIELD_ID = "xQS1owULSbL"; // Cable detail

// --- Existing 6.1 operator checkboxes (multi-select) ---
const OPERATOR_IDS = new Set([
  "zLgkhPBoASd","fspSJIn4Vqq","oxzEWQ0BkDQ","OADBGdVi279",
  "Y0KkCeX3jUv","TXc0EBAuhHE","rKIPUko4uIS","BRHYwOIZ01O",
]);

// --- NEW 8.1 operator group (regular internet network) ---
const NEW_OPERATOR_IDS = new Set([
  "Pza84UE33Qh","rMDTqJBGufz","cokIAx7lbWF","PMN34xrGhew",
  "l91Lp6CKVQW","clHAviSg1NZ","zxfjpZ9yziJ","khA9UFm6Qpq",
]);

// If khA9UFm6Qpq true → require specify text
const NEW_OP_TRIGGER_ID = "khA9UFm6Qpq";
const NEW_OP_SPECIFY_ID = "Zc3FhnkGI7H";

// Extra field to show + make mandatory when 6. anchor is true
const EXT_HIDE_WHEN_ANCHOR_FALSE = "tknBpZWiu89";

// Connectivity group (includes type selector & details + other singles)
const CONN_FIELDS = [
  TYPE_CONN_ID,
  NEW_OP_SPECIFY_ID,
  "eq1FTj6Z2vT",
  WIFI_FIELD_ID,
  CABLE_FIELD_ID,
  "SbpLKeVJBZd",
];

const GLOBAL_MANDATORY_IDS = new Set([
  "bEWpwn7HfUI",
  "OpKuX0h3iSf",
  "Gt26xzdkt53",
  "dww5EckWlhe",
  "M0klNUD2fP5",
  "JYVWqdlRq4Y",
  "fszEmzFYXHU",
  "SVSfEQFVBUj", // months anchor
]);

const INTEGER_ONLY_IDS = new Set([
  "bEWpwn7HfUI","OpKuX0h3iSf","Gt26xzdkt53",
]);


const ALWAYS_REQ_IDS = new Set([
  TYPE_CONN_ID,          // show asterisk on connection type
  WIFI_FIELD_ID,         // required when Wifi or Both
  CABLE_FIELD_ID,        // required when Cable or Both
  "eq1FTj6Z2vT",
  "SbpLKeVJBZd",
  "tknBpZWiu89",         // when 6 is true (shown then)
  ...GLOBAL_MANDATORY_IDS,
]);

// -------- Months block (always shown; require ≥1) --------
const MONTH_ANCHOR_ID = "SVSfEQFVBUj";
const MONTH_IDS = new Set([
  "NIji1vKjEsn","ycwkJ30qjwb","bxEtg4oxf4m","F9lxwEAGnHE",
  "X67WGTx2djm","t1Z7lsQ2Qte","SO1P5eMGMSc","L1lvlYVBaVN",
  "K3q2Vgo6p6P","N3dIyivSvSo","kMHppy04I0O","BkK10QaD8FE","l4g6U5MNdxQ",
]);

// ------------------------- Helpers -------------------------
const truthy = (v) =>
  v === true || v === "true" || v === 1 || v === "1" || v === "Yes" || v === "YES" || v === "yes";

const normalize = (v) => String(v ?? "").trim().toLowerCase();

const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  return false;
};


const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); // Thai
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); // Lao
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); // Arabic-Indic
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); // Ext Arabic-Indic
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); // Devanagari
      return ch;
    }
  );

// Integer check that accepts localized digits
const isIntegerOnly = (v) => /^\d+$/.test(toAsciiDigits(String(v ?? "").trim()));

// Read a DE value from current event (supports dataValues and flattened)
const getValue = (event, deId) => {
  if (!event) return undefined;
  const arr = event?.dataValues;
  if (Array.isArray(arr)) {
    const hit = arr.find((d) => d?.dataElement === deId);
    if (hit) return hit.value;
  }
  return event?.[deId];
};

const REG_KEY = "__FACILITY_RULES_REGISTRY__";
const getRegistry = () => {
  const g = typeof globalThis !== "undefined" ? globalThis : window;
  if (!g[REG_KEY]) g[REG_KEY] = new Map();
  return g[REG_KEY];
};
const setCombinedDisabled = (actions) => {
  const reg = getRegistry();
  const anyDisabled = Array.from(reg.values()).some((v) => v.disabled === true);
  try {
    if (actions.setLayout) actions.setLayout("disableEventCompleteButton", anyDisabled);
    else if (actions.setCompleteDisabled) actions.setCompleteDisabled(anyDisabled);
    else if (actions.setCanComplete) actions.setCanComplete(!anyDisabled);
  } catch {}
};

export default function useFacilityBuildingRules(sectionDEs = []) {
  const { currentEvent } = useCurrentEvent();
  const { actions } = useTrackerCaptureStore.getState();

  const { i18n, t } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trIntOnly = t("equipment.error.integerOnly", {
    defaultValue: isLao
      ? "ອະນຸຍາດໃສ່ແຕ່ເລກຈໍານວນເຕັມ (ບໍ່ອະນຸຍາດເລກຈຸດທົດສະນິຍົມ)."
      : "Only whole numbers are allowed (no decimals).",
  });

  const availVal      = getValue(currentEvent, AVAIL_SEL);
  const anchorVal     = getValue(currentEvent, OP_ANCHOR_ID);
  const othersVal     = getValue(currentEvent, OTHERS_ID);
  const typeVal       = getValue(currentEvent, TYPE_CONN_ID);
  const newTriggerVal = getValue(currentEvent, NEW_OP_TRIGGER_ID);

  const sel = normalize(availVal);
  const hasSel = sel !== "";
  const notAvail = sel === "not available";

  const showConn = hasSel && !notAvail;

  const type = normalize(typeVal); // "wifi" | "cable" | "both" | ""
  const showWifi  = showConn && (type === "wifi"  || type === "both");
  const showCable = showConn && (type === "cable" || type === "both");

  const showOperators = truthy(anchorVal);
  const showServiceProvider = showOperators && truthy(othersVal);

  const showNewOperators = showConn; // 8.1 group visible with connection section
  const showNewSpecify = showNewOperators && truthy(newTriggerVal);

  // this section's DE ids
  const sectionIds = (sectionDEs || [])
    .map((de) => de?.id || de?.dataElement?.id)
    .filter(Boolean);

  const hiddenFields = useMemo(() => {
    const h = {};

    if (!showConn) {
      for (const id of CONN_FIELDS) h[id] = true;
      for (const id of NEW_OPERATOR_IDS) h[id] = true;
    } else {
      if (!showWifi)  h[WIFI_FIELD_ID]  = true;
      if (!showCable) h[CABLE_FIELD_ID] = true;
      if (!showNewSpecify) h[NEW_OP_SPECIFY_ID] = true;
    }

    // Operators 6.1
    if (!showOperators) {
      for (const id of OPERATOR_IDS) h[id] = true;
      h[SERVICE_PROVIDER_ID] = true;
      h[EXT_HIDE_WHEN_ANCHOR_FALSE] = true;
    } else if (!showServiceProvider) {
      h[SERVICE_PROVIDER_ID] = true;
    }

    return h;
  }, [showConn, showWifi, showCable, showOperators, showServiceProvider, showNewSpecify]);

  const requiredFields = useMemo(() => {
    const req = {};
    for (const de of sectionDEs) {
      const id = de?.id || de?.dataElement?.id;
      if (!id) continue;

      if (OPERATOR_IDS.has(id) || NEW_OPERATOR_IDS.has(id) || MONTH_IDS.has(id)) {
        req[id] = false;
        continue;
      }

      if (id === SERVICE_PROVIDER_ID) {
        req[id] = showServiceProvider && !hiddenFields[id]; // Others → Service provider
        continue;
      }
      if (id === NEW_OP_SPECIFY_ID) {
        req[id] = showNewSpecify && !hiddenFields[id]; // khA9UFm6Qpq → specify
        continue;
      }

      if (ALWAYS_REQ_IDS.has(id)) {
        req[id] = !hiddenFields[id]; 
        continue;
      }

      req[id] = false;
    }
    return req;
  }, [sectionDEs, hiddenFields, showServiceProvider, showNewSpecify]);

  // -------------------- Clear values when hidden --------------------
  useEffect(() => {
    if (!currentEvent?.event || !actions?.changeDataValue) return;
    const evId = currentEvent.event;
    const getDV = (id) => getValue(currentEvent, id);
    Object.entries(hiddenFields).forEach(([id, isHidden]) => {
      if (isHidden && !isEmpty(getDV(id))) {
        actions.changeDataValue(evId, id, "");
      }
    });
  }, [hiddenFields, currentEvent?.event, actions, currentEvent]);

  // -------------------- Master-guard registration --------------------
  useEffect(() => {
    if (!actions) return;
    const ev = currentEvent;

    // helper: any of the given ids selected (for multi-select groups)
    const anySelected = (ids) => {
      if (!ev) return false;
      for (const id of ids) {
        const v = getValue(ev, id);
        if (truthy(v)) return true;
      }
      return false;
    };

    // recompute minimal visibility used by guard
    const selStage = normalize(getValue(ev, AVAIL_SEL));
    const showConnStage = selStage !== "" && selStage !== "not available";
    const typeStage = normalize(getValue(ev, TYPE_CONN_ID));
    const showWifiStage  = showConnStage && (typeStage === "wifi" || typeStage === "both");
    const showCableStage = showConnStage && (typeStage === "cable" || typeStage === "both");
    const showOp6Stage   = truthy(getValue(ev, OP_ANCHOR_ID));
    const showNewSpecifyStage = truthy(getValue(ev, NEW_OP_TRIGGER_ID));
    const showServiceProviderStage =
      truthy(getValue(ev, OP_ANCHOR_ID)) && truthy(getValue(ev, OTHERS_ID));

    // ----- REQUIRED: ALL visible single-value fields in this section -----
    const singleCandidates = sectionIds.filter(
      (id) => !OPERATOR_IDS.has(id) && !NEW_OPERATOR_IDS.has(id) && !MONTH_IDS.has(id)
    );

    const visibleSingles = singleCandidates.filter((id) => !hiddenFields[id]);

    // Wifi/Cable details only when their types are chosen
    if (!showWifiStage) {
      const idx = visibleSingles.indexOf(WIFI_FIELD_ID);
      if (idx >= 0) visibleSingles.splice(idx, 1);
    }
    if (!showCableStage) {
      const idx = visibleSingles.indexOf(CABLE_FIELD_ID);
      if (idx >= 0) visibleSingles.splice(idx, 1);
    }

    const missingSingles = [];
    for (const id of visibleSingles) {
      const val = getValue(ev, id);
      if (isEmpty(val)) missingSingles.push(id);
    }

    // ----- REQUIRED: groups (multi-select) -----
    const needOneOp6   = showOp6Stage  && !anySelected(Array.from(OPERATOR_IDS));     // 6.1 when 6==true
    const needOneOp8   = showConnStage && !anySelected(Array.from(NEW_OPERATOR_IDS)); // 8.1 when connection shown
    const needOneMonth =                !anySelected(Array.from(MONTH_IDS));          // months always

    // ----- Additional singles driven by booleans -----
    // Others → service provider text
    const missingSvcProvider =
      showServiceProviderStage && isEmpty(getValue(ev, SERVICE_PROVIDER_ID));
    // khA9UFm6Qpq → specify text
    const missingNewSpecify =
      showNewSpecifyStage && isEmpty(getValue(ev, NEW_OP_SPECIFY_ID));

    // ----- Integer-only checks -----
    const invalidIntegerIds = [];
    for (const id of INTEGER_ONLY_IDS) {
      if (hiddenFields[id]) continue;
      const raw = getValue(ev, id);
      if (!isEmpty(raw) && !isIntegerOnly(raw)) invalidIntegerIds.push(id);
    }

    const sectionDisabled =
      missingSingles.length > 0 ||
      needOneOp6 || needOneOp8 || needOneMonth ||
      missingSvcProvider || missingNewSpecify ||
      invalidIntegerIds.length > 0;

    // Register this section in the global registry
    const reg = getRegistry();
    const sectionKey = sectionIds[0] || `sec_${Math.random().toString(36).slice(2, 7)}`;

    // Per-section checker (used by master on Save/Complete)
    const checkSection = () => {
      const msgs = [];
      if (missingSingles.length) msgs.push("Please complete all required fields.");
      if (needOneOp6)   msgs.push('Please select at least one option in "6.1 Operator".');
      if (needOneOp8)   msgs.push('Please select at least one option in "8.1 Regular internet network".');
      if (needOneMonth) msgs.push('Please select at least one month in "Outreach activity months".');
      if (missingSvcProvider) msgs.push('Please fill "Service provider" below "Others".');
      if (missingNewSpecify)  msgs.push('Please specify the network name.');
      if (invalidIntegerIds.length) msgs.push(trIntOnly);
      return {
        ok: msgs.length === 0,
        message: msgs.join(" "),
      };
    };

    // write + recompute live disable
    reg.set(sectionKey, { disabled: sectionDisabled, check: checkSection });
    setCombinedDisabled(actions);

    // Install/refresh MASTER handler (single entry point the app will call)
    if (actions.setHandlers) {
      const MASTER_KEY = "eventSave_facilityStageMaster";
      actions.setHandlers(MASTER_KEY, async () => {
        const regs = Array.from(getRegistry().values());
        for (const r of regs) {
          const res = r.check();
          if (!res.ok) return { ok: false, message: res.message };
        }
        return { ok: true };
      });
    }

    // Cleanup: remove this section on unmount and recompute
    return () => {
      const r = getRegistry();
      r.delete(sectionKey);
      setCombinedDisabled(actions);
    };
  }, [
    actions,
    currentEvent,
    currentEvent?.event,
    currentEvent?.dataValues,
    trIntOnly,
    JSON.stringify(hiddenFields),
    i18n.language,
    sectionIds.join("|"),
  ]);

  return {
    hiddenFields,
    requiredFields,
    operators: { ids: OPERATOR_IDS, othersId: OTHERS_ID },
    newOperators: { ids: NEW_OPERATOR_IDS, triggerId: NEW_OP_TRIGGER_ID, specifyId: NEW_OP_SPECIFY_ID },
    months: { ids: MONTH_IDS, anchorId: MONTH_ANCHOR_ID },
    keys: {
      AVAIL_SEL, OP_ANCHOR_ID, SERVICE_PROVIDER_ID, CONN_FIELDS,
      TYPE_CONN_ID, WIFI_FIELD_ID, CABLE_FIELD_ID, MONTH_ANCHOR_ID,
    },
    state: {
      // expose current visibility for the UI if needed
      showConn,
      showOperators,
      showServiceProvider,
      showWifi,
      showCable,
      showNewOperators,
      showNewSpecify,
    },
  };
}
