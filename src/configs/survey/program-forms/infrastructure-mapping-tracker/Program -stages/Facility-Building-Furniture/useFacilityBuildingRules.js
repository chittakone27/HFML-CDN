import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";

const AVAIL_SEL = "fszEmzFYXHU";
const OP_ANCHOR_ID = "JYVWqdlRq4Y";
const OTHERS_ID = "BRHYwOIZ01O";
const SERVICE_PROVIDER_ID = "O5TwLn4hWFr";
const TYPE_CONN_ID = "eWrvOj7ZUL2";
const WIFI_FIELD_ID = "nhilsZioxC9"; 
const CABLE_FIELD_ID = "xQS1owULSbL"; 

const OPERATOR_IDS = new Set([
  "zLgkhPBoASd",
  "fspSJIn4Vqq",
  "oxzEWQ0BkDQ",
  "OADBGdVi279",
  "Y0KkCeX3jUv",
  "TXc0EBAuhHE",
  "rKIPUko4uIS",
  "BRHYwOIZ01O",
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

const NEW_OP_TRIGGER_ID = "khA9UFm6Qpq";
const NEW_OP_SPECIFY_ID = "Zc3FhnkGI7H";

const EXT_HIDE_WHEN_ANCHOR_FALSE = "tknBpZWiu89";

const CONN_FIELDS = [
  TYPE_CONN_ID,
  NEW_OP_SPECIFY_ID,
  "eq1FTj6Z2vT",
  WIFI_FIELD_ID,
  CABLE_FIELD_ID,
  "SbpLKeVJBZd",
];

const TOTAL_OUTREACH_ID = "bEWpwn7HfUI"; 
const OUTREACH_FACILITY_ID = "OpKuX0h3iSf"; 
const OUTREACH_COMMUNITY_ID = "msFzvgwQQzm"; 

const GLOBAL_MANDATORY_IDS = new Set([
  TOTAL_OUTREACH_ID,
  OUTREACH_FACILITY_ID,
  "Gt26xzdkt53",
  "dww5EckWlhe",
  "M0klNUD2fP5",
  "JYVWqdlRq4Y",
  "fszEmzFYXHU",
  "SVSfEQFVBUj", 
]);

const INTEGER_ONLY_IDS = new Set([
  TOTAL_OUTREACH_ID,
  OUTREACH_FACILITY_ID,
  "Gt26xzdkt53",
  OUTREACH_COMMUNITY_ID,
  "SVSfEQFVBUj", 
]);

const ALWAYS_REQ_IDS = new Set([
  TYPE_CONN_ID, 
  WIFI_FIELD_ID, 
  CABLE_FIELD_ID, 
  "eq1FTj6Z2vT",
  "SbpLKeVJBZd",
  "tknBpZWiu89", 
  ...GLOBAL_MANDATORY_IDS,
]);

const MONTH_ANCHOR_ID = "SVSfEQFVBUj";
const NO_OUTREACH_ID = "l4g6U5MNdxQ";

const MONTH_IDS = new Set([
  "NIji1vKjEsn",
  "ycwkJ30qjwb",
  "bxEtg4oxf4m",
  "F9lxwEAGnHE",
  "X67WGTx2djm",
  "t1Z7lsQ2Qte",
  "SO1P5eMGMSc",
  "L1lvlYVBaVN",
  "K3q2Vgo6p6P",
  "N3dIyivSvSo",
  "kMHppy04I0O",
  "BkK10QaD8FE",
  NO_OUTREACH_ID, 
]);

const FUND_SOURCE_ID = "eq1FTj6Z2vT";
const HIDE_WHEN_PERSONAL_ID = "SbpLKeVJBZd";

const truthy = (v) => v === "true";

const normalize = (v) => String(v ?? "").trim().toLowerCase();

const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  return false;
};

const canReceivePhoneFromOption = (raw) => {
  const v = normalize(raw);
  if (!v) return undefined;

  if (v === "cannot") return false;

  if (v === "can" || v.includes("partially can")) return true;

  if (truthy(raw)) return true;

  return false;
};

const isIntegerOnly = (v) => /^\d+$/.test(String(v ?? "").trim());

const parseIntSafe = (raw) => {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  if (!/^\d+$/.test(s)) return null;
  return parseInt(s, 10);
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

const REG_KEY = "__FACILITY_RULES_REGISTRY__";
const getRegistry = () => {
  const g = typeof globalThis !== "undefined" ? globalThis : window;
  if (!g[REG_KEY]) g[REG_KEY] = new Map();
  return g[REG_KEY];
};

const setCombinedDisabled = (actions) => {
  if (!actions) return;

  const reg = getRegistry();
  const anyDisabled = Array.from(reg.values()).some((v) => v.disabled === true);

  if (typeof actions.setLayout === "function") {
    actions.setLayout("disableEventCompleteButton", anyDisabled);
    return;
  }

  if (typeof actions.setCompleteDisabled === "function") {
    actions.setCompleteDisabled(anyDisabled);
    return;
  }

  if (typeof actions.setCanComplete === "function") {
    actions.setCanComplete(!anyDisabled);
  }
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

  const trSessionsSum = t("facility.outreach.sessionsSumCheck", {
    defaultValue: isLao
      ? "ຈໍານວນການອອກຄ່າຍລວມຕ້ອງໃຫຍ່ກວ່າ ຫຼື ເທົ່າກັບ ຈໍານວນຄັ້ງທີ່ຈັດຢູ່ສະຖານພະຍາບານ ບວກ ຈໍານວນຄັ້ງທີ່ອອກຄ່າຍໃນຊຸມຊົນ."
      : "Total outreach sessions (bEWpwn7HfUI) must be greater than or equal to sessions at facility plus sessions in outreach (OpKuX0h3iSf + msFzvgwQQzm).",
  });

  const trMonthsCount = t("facility.outreach.monthCountCheck", {
    defaultValue: isLao
      ? "ຈໍານວນເດືອນທີ່ລາຍງານ (SVSfEQFVBUj) ຕ້ອງໃຫຍ່ກວ່າ ຫຼື ເທົ່າກັບ ຈໍານວນເດືອນທີ່ມີການຕິກໃນຂໍ້ 14."
      : "The number of outreach activities (SVSfEQFVBUj) must be greater than or equal to the number of months selected in question 14.",
  });

  const availVal = getValue(currentEvent, AVAIL_SEL);
  const anchorVal = getValue(currentEvent, OP_ANCHOR_ID);
  const othersVal = getValue(currentEvent, OTHERS_ID);
  const typeVal = getValue(currentEvent, TYPE_CONN_ID);
  const newTriggerVal = getValue(currentEvent, NEW_OP_TRIGGER_ID);

  const sel = normalize(availVal);
  const hasSel = sel !== "";
  const notAvail = sel === "not available";

  const showConn = hasSel && !notAvail;

  const type = normalize(typeVal);
  const showWifi = showConn && (type === "wifi" || type === "both");
  const showCable = showConn && (type === "cable" || type === "both");

  const anchorCanReceive = canReceivePhoneFromOption(anchorVal);
  const showOperators = anchorCanReceive === true;
  const showServiceProvider = showOperators && truthy(othersVal);
  const showNewOperators = showConn; 
  const showNewSpecify = showNewOperators && truthy(newTriggerVal);

  const sectionIds = (sectionDEs || [])
    .map((de) => de?.id || de?.dataElement?.id)
    .filter(Boolean);

  const isPersonalFund = useMemo(() => {
    const raw = getValue(currentEvent, FUND_SOURCE_ID);
    const key = normalize(raw).replace(/[\s_]+/g, "");
    return key === "personalfund";
  }, [currentEvent?.dataValues]);

  const monthsAnchorValForHide = parseIntSafe(
    getValue(currentEvent, MONTH_ANCHOR_ID)
  );
  const hiddenFields = useMemo(() => {
    const h = {};

    if (!showConn) {
      for (const id of CONN_FIELDS) h[id] = true;
      for (const id of NEW_OPERATOR_IDS) h[id] = true;
    } else {
      if (!showWifi) h[WIFI_FIELD_ID] = true;
      if (!showCable) h[CABLE_FIELD_ID] = true;
      if (!showNewSpecify) h[NEW_OP_SPECIFY_ID] = true;
    }

    if (!showOperators) {
      for (const id of OPERATOR_IDS) h[id] = true;
      h[SERVICE_PROVIDER_ID] = true;
      h[EXT_HIDE_WHEN_ANCHOR_FALSE] = true;
    } else if (!showServiceProvider) {
      h[SERVICE_PROVIDER_ID] = true;
    }

    if (isPersonalFund) {
      h[HIDE_WHEN_PERSONAL_ID] = true;
    }

    if (monthsAnchorValForHide > 0) {
      h[NO_OUTREACH_ID] = true;
    }

    return h;
  }, [
    showConn,
    showWifi,
    showCable,
    showOperators,
    showServiceProvider,
    showNewSpecify,
    isPersonalFund,
    monthsAnchorValForHide,
  ]);

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
      if (id === HIDE_WHEN_PERSONAL_ID) {
        req[id] = !hiddenFields[id] && !isPersonalFund;
        continue;
      }

      if (ALWAYS_REQ_IDS.has(id)) {
        req[id] = !hiddenFields[id];
        continue;
      }

      req[id] = false;
    }
    return req;
  }, [sectionDEs, hiddenFields, showServiceProvider, showNewSpecify, isPersonalFund]);

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

  useEffect(() => {
    if (!actions) return;
    const ev = currentEvent;

    const anySelected = (ids) => {
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
    const showWifiStage =
      showConnStage && (typeStage === "wifi" || typeStage === "both");
    const showCableStage =
      showConnStage && (typeStage === "cable" || typeStage === "both");

    const anchorStageRaw = getValue(ev, OP_ANCHOR_ID);
    const anchorStageCanReceive = canReceivePhoneFromOption(anchorStageRaw);
    const showOp6Stage = anchorStageCanReceive === true;

    const showNewSpecifyStage = truthy(getValue(ev, NEW_OP_TRIGGER_ID));
    const showServiceProviderStage =
      anchorStageCanReceive === true && truthy(getValue(ev, OTHERS_ID));
    const singleCandidates = sectionIds.filter(
      (id) => !OPERATOR_IDS.has(id) && !NEW_OPERATOR_IDS.has(id) && !MONTH_IDS.has(id)
    );

    const visibleSingles = singleCandidates.filter((id) => !hiddenFields[id]);

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

    const monthsAnchorValForGroup = parseIntSafe(getValue(ev, MONTH_ANCHOR_ID));
    const noOutreachFlagForGroup = truthy(getValue(ev, NO_OUTREACH_ID));

    const realMonthIds = Array.from(MONTH_IDS).filter((id) => id !== NO_OUTREACH_ID);
    const realMonthsSelected = realMonthIds.filter((id) => truthy(getValue(ev, id))).length;

    let needOneMonth = false;
    if (monthsAnchorValForGroup === 0) {
      if (realMonthsSelected === 0 && !noOutreachFlagForGroup) {
        needOneMonth = true;
      }
    } else if (monthsAnchorValForGroup > 0) {
      needOneMonth = realMonthsSelected === 0;
    } else {
      needOneMonth = !anySelected(Array.from(MONTH_IDS));
    }

    const needOneOp6 = showOp6Stage && !anySelected(Array.from(OPERATOR_IDS));
    const needOneOp8 = showConnStage && !anySelected(Array.from(NEW_OPERATOR_IDS));

    const missingSvcProvider =
      showServiceProviderStage && isEmpty(getValue(ev, SERVICE_PROVIDER_ID));
    const missingNewSpecify =
      showNewSpecifyStage && isEmpty(getValue(ev, NEW_OP_SPECIFY_ID));

    const invalidIntegerIds = [];
    for (const id of INTEGER_ONLY_IDS) {
      if (hiddenFields[id]) continue;
      const raw = getValue(ev, id);
      if (!isEmpty(raw) && !isIntegerOnly(raw)) invalidIntegerIds.push(id);
    }

    const totalOutreach = parseIntSafe(getValue(ev, TOTAL_OUTREACH_ID));
    const atFacility = parseIntSafe(getValue(ev, OUTREACH_FACILITY_ID));
    const inCommunity = parseIntSafe(getValue(ev, OUTREACH_COMMUNITY_ID));

    const sessionsSumConflict =
      totalOutreach != null &&
      atFacility != null &&
      inCommunity != null &&
      totalOutreach < atFacility + inCommunity;

    let monthsSelectedReal = 0;
    for (const id of MONTH_IDS) {
      if (id === NO_OUTREACH_ID) continue;
      if (truthy(getValue(ev, id))) monthsSelectedReal++;
    }

    const monthsAnchorVal = parseIntSafe(getValue(ev, MONTH_ANCHOR_ID));
    const noOutreachFlag = truthy(getValue(ev, NO_OUTREACH_ID));

    let monthsCountConflict = false;
    if (monthsAnchorVal === 0) {
      if (monthsSelectedReal > 0) {
        monthsCountConflict = true;
      } else {
        monthsCountConflict = false;
      }
    } else if (monthsAnchorVal > 0) {
      if (monthsSelectedReal > 0 && monthsAnchorVal < monthsSelectedReal) {
        monthsCountConflict = true;
      }
    } else {
      monthsCountConflict = false;
    }

    const sectionDisabled =
      missingSingles.length > 0 ||
      needOneOp6 ||
      needOneOp8 ||
      needOneMonth ||
      missingSvcProvider ||
      missingNewSpecify ||
      invalidIntegerIds.length > 0 ||
      sessionsSumConflict ||
      monthsCountConflict;

    const reg = getRegistry();
    const sectionKey = sectionIds[0] || `sec_${Math.random().toString(36).slice(2, 7)}`;

    const checkSection = () => {
      const msgs = [];
      if (missingSingles.length) msgs.push("Please complete all required fields.");
      if (needOneOp6) msgs.push('Please select at least one option in "6.1 Operator".');
      if (needOneOp8)
        msgs.push('Please select at least one option in "8.1 Regular internet network".');
      if (needOneMonth) msgs.push('Please select at least one month in "Outreach activity months".');
      if (missingSvcProvider) msgs.push('Please fill "Service provider" below "Others".');
      if (missingNewSpecify) msgs.push("Please specify the network name.");
      if (invalidIntegerIds.length) msgs.push(trIntOnly);
      if (sessionsSumConflict) msgs.push(trSessionsSum);
      if (monthsCountConflict) msgs.push(trMonthsCount);
      return {
        ok: msgs.length === 0,
        message: msgs.join(" "),
      };
    };

    reg.set(sectionKey, { disabled: sectionDisabled, check: checkSection });
    setCombinedDisabled(actions);

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
    trSessionsSum,
    trMonthsCount,
    JSON.stringify(hiddenFields),
    i18n.language,
    sectionIds.join("|"),
  ]);

  return {
    hiddenFields,
    requiredFields,
    operators: { ids: OPERATOR_IDS, othersId: OTHERS_ID },
    newOperators: {
      ids: NEW_OPERATOR_IDS,
      triggerId: NEW_OP_TRIGGER_ID,
      specifyId: NEW_OP_SPECIFY_ID,
    },
    months: { ids: MONTH_IDS, anchorId: MONTH_ANCHOR_ID },
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
