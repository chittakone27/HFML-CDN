import { useEffect, useMemo } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";

const AVAIL_SEL = "fszEmzFYXHU";            // Internet on-site (can connect to internet)
const OP_ANCHOR_ID = "JYVWqdlRq4Y";         // Anchor row to place Operators next to (6.1)
const OTHERS_ID = "BRHYwOIZ01O";            // Operator: Others (checkbox)
const SERVICE_PROVIDER_ID = "O5TwLn4hWFr";  // Service provider (free text below Operators)


const TYPE_CONN_ID   = "eWrvOj7ZUL2";       // Wifi / Cable / Both  (8.x anchor)
const WIFI_FIELD_ID  = "nhilsZioxC9";       // Wifi detail
const CABLE_FIELD_ID = "xQS1owULSbL";       // Cable detail


const OPERATOR_IDS = new Set([
  "zLgkhPBoASd", // Lao Telecom (LTH)
  "fspSJIn4Vqq", // ETL
  "oxzEWQ0BkDQ", // Unitel
  "OADBGdVi279", // Beeline
  "Y0KkCeX3jUv", // Win phone
  "TXc0EBAuhHE", // Vietnamese Sim
  "rKIPUko4uIS", // Thai Sim
  "BRHYwOIZ01O", // Others
]);

const NEW_OPERATOR_IDS = new Set([
  "Pza84UE33Qh",
  "rMDTqJBGufz",
  "cokIAx7lbWF",
  "PMN34xrGhew",
  "l91Lp6CKVQW",
  "clHAviSg1NZ",
  "zxfjpZ9yziJ",
  "khA9UFm6Qpq", 
]);

const NEW_OP_TRIGGER_ID = "khA9UFm6Qpq"; // if selected -> show/require Zc3FhnkGI7H
const NEW_OP_SPECIFY_ID = "Zc3FhnkGI7H"; // required when trigger checked


const CONN_FIELDS = [
  TYPE_CONN_ID,
  NEW_OP_SPECIFY_ID,
  "eq1FTj6Z2vT",   
  WIFI_FIELD_ID,
  CABLE_FIELD_ID,
  //  "tknBpZWiu89",
  //"SbpLKeVJBZd",
];

const GLOBAL_MANDATORY_IDS = new Set([
  "dww5EckWlhe",
  "M0klNUD2fP5",
  "JYVWqdlRq4Y", // OP_ANCHOR_ID
  "fszEmzFYXHU", // AVAIL_SEL
  "bEWpwn7HfUI",
  "OpKuX0h3iSf",
  "Gt26xzdkt53",
]);


const ALWAYS_REQ_IDS = new Set([

  "eq1FTj6Z2vT",
  "nhilsZioxC9",
  "tknBpZWiu89",
  "SbpLKeVJBZd",

  ...GLOBAL_MANDATORY_IDS,
]);

const MONTH_ANCHOR_ID = "SVSfEQFVBUj";
const MONTH_IDS = new Set([
  "NIji1vKjEsn","ycwkJ30qjwb","bxEtg4oxf4m","F9lxwEAGnHE",
  "X67WGTx2djm","t1Z7lsQ2Qte","SO1P5eMGMSc","L1lvlYVBaVN",
  "K3q2Vgo6p6P","N3dIyivSvSo","kMHppy04I0O","BkK10QaD8FE",
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

const getValue = (event, deId) => {
  if (!event) return undefined;
  const arr = event?.dataValues;
  if (Array.isArray(arr)) {
    const hit = arr.find((d) => d?.dataElement === deId);
    if (hit) return hit.value;
  }
  return event?.[deId];
};

const presentInEvent = (event, id) =>
  Array.isArray(event?.dataValues) &&
  event.dataValues.some((d) => d?.dataElement === id);

/export default function useFacilityBuildingRules(sectionDEs = []) {
  const { currentEvent } = useCurrentEvent();
  const { actions } = useTrackerCaptureStore.getState();

  const availVal     = getValue(currentEvent, AVAIL_SEL);
  const anchorVal    = getValue(currentEvent, OP_ANCHOR_ID); // 6.1 anchor toggle
  const othersVal    = getValue(currentEvent, OTHERS_ID);
  const typeVal      = getValue(currentEvent, TYPE_CONN_ID);
  const newTriggerVal= getValue(currentEvent, NEW_OP_TRIGGER_ID);

  const sel = normalize(availVal);
  const hasSel = sel !== "";
  const notAvail = sel === "not available";

  const showConn = hasSel && !notAvail;

  const type = normalize(typeVal); 
  const showWifi  = showConn && (type === "wifi"  || type === "both");
  const showCable = showConn && (type === "cable" || type === "both");

  // 6.1 Operators
  const showOperators = truthy(anchorVal);
  const showServiceProvider = showOperators && truthy(othersVal);

  // 8.1  
  const showNewOperators = showConn;
  const showNewSpecify = showNewOperators && truthy(newTriggerVal);

  const sectionIds = (sectionDEs || [])
    .map((de) => de?.id || de?.dataElement?.id)
    .filter(Boolean);
  const isController = sectionIds.includes(TYPE_CONN_ID); 

  const inSection = (id) => sectionIds.includes(id);
  const visibleInSection = (id, h) => inSection(id) && !h[id];

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

    if (!showOperators) {
      for (const id of OPERATOR_IDS) h[id] = true;
      h[SERVICE_PROVIDER_ID] = true;
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
        req[id] = showServiceProvider && !hiddenFields[id];
        continue;
      }
      if (id === NEW_OP_SPECIFY_ID) {
        req[id] = showNewSpecify && !hiddenFields[id]; 
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

  useEffect(() => {
    if (!currentEvent?.event || !actions?.changeDataValue) return;
    const evId = currentEvent.event;
    const getDV = (id) => getValue(currentEvent, id);
    Object.entries(hiddenFields).forEach(([id, isHidden]) => {
      if (isHidden && !isEmpty(getDV(id))) {
        actions.changeDataValue(evId, id, "");
      }
    });
  }, [hiddenFields, currentEvent?.event, actions]);

  useEffect(() => {
    if (!isController || !actions) return;
    const ev = currentEvent;

    const anySelectedStage = (ids) => {
      if (!ev) return false;
      for (const id of ids) {
        const v = getValue(ev, id);
        if (truthy(v)) return true;
      }
      return false;
    };

    const selStage = normalize(getValue(ev, AVAIL_SEL));
    const showConnStage = selStage !== "" && selStage !== "not available";
    const typeStage = normalize(getValue(ev, TYPE_CONN_ID));
    const showWifiStage  = showConnStage && (typeStage === "wifi" || typeStage === "both");

    const showOp6Stage = truthy(getValue(ev, OP_ANCHOR_ID));
    const needOneOp6   = showOp6Stage   && !anySelectedStage(Array.from(OPERATOR_IDS));
    const needOneOp8   = showConnStage  && !anySelectedStage(Array.from(NEW_OPERATOR_IDS));
    const needOneMonth =                 !anySelectedStage(Array.from(MONTH_IDS));

      const missingSingles = [];

    if (showConnStage && isEmpty(getValue(ev, "eq1FTj6Z2vT"))) missingSingles.push("eq1FTj6Z2vT");
    if (showWifiStage && isEmpty(getValue(ev, WIFI_FIELD_ID))) missingSingles.push(WIFI_FIELD_ID);
    if (showConnStage && isEmpty(getValue(ev, "tknBpZWiu89"))) missingSingles.push("tknBpZWiu89");
    if (showConnStage && isEmpty(getValue(ev, "SbpLKeVJBZd"))) missingSingles.push("SbpLKeVJBZd");

    for (const id of GLOBAL_MANDATORY_IDS) {
      if (presentInEvent(ev, id) && isEmpty(getValue(ev, id))) {
        missingSingles.push(id);
      }
    }

    const trig = truthy(getValue(ev, NEW_OP_TRIGGER_ID));
    if (showConnStage && trig && isEmpty(getValue(ev, NEW_OP_SPECIFY_ID))) {
      missingSingles.push(NEW_OP_SPECIFY_ID);
    }

    const disabled = missingSingles.length > 0 || needOneOp6 || needOneOp8 || needOneMonth;


    try {
      if (actions.setLayout) {
        actions.setLayout("disableEventCompleteButton", disabled);
      } else if (actions.setCompleteDisabled) {
        actions.setCompleteDisabled(disabled);
      } else if (actions.setCanComplete) {
        actions.setCanComplete(!disabled);
      }
    } catch {}

    if (actions.setHandlers) {
      const KEY = "eventSave_facilityStageGuard";
      actions.setHandlers(KEY, async () => {
        const groupMsgs = [];
        if (needOneOp6)   groupMsgs.push('Please select at least one option in "6.1 Operator".');
        if (needOneOp8)   groupMsgs.push('Please select at least one option in "8.1 What network does the regular internet belong to?".');
        if (needOneMonth) groupMsgs.push('Please select at least one month in "Outreach activity usually happens in which month".');

        if (missingSingles.length > 0 || groupMsgs.length > 0) {
          const msg = [
            ...(missingSingles.length > 0 ? ["Please complete all required fields."] : []),
            ...groupMsgs,
          ].join(" ");
          return { ok: false, message: msg };
        }
        return { ok: true };
      });
      return () => actions.setHandlers && actions.setHandlers(KEY, null);
    }

  }, [isController, actions, currentEvent?.event, currentEvent?.dataValues]);
  // ---------------------------------------------------------------------------

  return {
    hiddenFields,
    requiredFields,
    operators: { ids: OPERATOR_IDS, othersId: OTHERS_ID },
    newOperators: { ids: NEW_OPERATOR_IDS, triggerId: NEW_OP_TRIGGER_ID, specifyId: NEW_OP_SPECIFY_ID },
    months: { ids: MONTH_IDS },
    keys: {
      AVAIL_SEL,
      OP_ANCHOR_ID,
      SERVICE_PROVIDER_ID,
      CONN_FIELDS,
      TYPE_CONN_ID,
      WIFI_FIELD_ID,
      CABLE_FIELD_ID,
      MONTH_ANCHOR_ID,
    },
    state: {
      showConn, showOperators, showServiceProvider, showWifi, showCable,
      showNewOperators, showNewSpecify,
    },
  };
}
