import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LOCK_COPY_FLAG_AFTER_RAINY_EDIT = false;


const DISTANCE_DRY_ID = "K4RyAstSuIe";
const TRAVEL_CONDITION_ID = "dfMxJtpEVY0"; 
const FOOT_DURATION_ID = "Bokim7QLnF8";
const BIKE_DURATION_ID = "bcnCvxfxNeF";
const BOAT_TIME_ID = "yZfjh0SBRzz";
const FERRY_FEE_ID = "dBK06ybZUbT";
const CAN_TAVEL_BY_CAR = "NI37vfjXk6J";
const NEED_HUMAN_CARRY_BIKE_DRY_ID = "wrXGoTI4uQH";
const FEES_CARRY_BIKE_DRY_ID = "f40RBOQlDi1";
const NEED_TO_CROOS_RIVER = "jWinhL2rxeK";
const TRUCK_NEED_DRY_ID = "jaHGxAr3E9p";
const FEE_FOR_TRUCK_DRY_ID = "P554rYBYhyN";
const DANGEROUS_DRY_ID = "vBpU3LPtQHw";

// Travel-time / condition DEs – Section 2 (rainy season)

const DISTANCE_RAINY_ID = "WOFwxctknr3";
const TRAVEL_CONDITION_ID2 = "BiSiYIv9EFW"; 
const FOOT_DURATION_ID2 = "cC9tXe9nM1O";
const BIKE_DURATION_ID2 = "VSbTF1Y4CMD";
const BOAT_DURATION_ID2 = "thA1ltseEo4";
const FERRY_FEE_ID2 = "Lh7BukXsQES";
const CAN_TAVEL_BY_CAR2 = "XaW1WBFbzid";
const NEED_HUMAN_CARRY_BIKE_ID = "xcFzGlfAZNW";
const FEES_CARRY_BIKE_ID = "ttoaHSY8sTB";
const NEED_TO_CROOS_RIVER2 = "rvYPto0hxVE"; 
const TRUCK_NEED_RAIN_ID = "j7JHlTSVlPy";
const FEE_FOR_TRUCK_ID = "T08IOF1bwi3";
const DANGEROUS_RAINY_ID = "R6lD44QJfa4";
const ROAD_BROKEN_ID = "ex7pwRhyyAM";

const COPY_TRAVEL_COND_FLAG_ID = "YMTERwrxrix";

const DRY_TO_RAINY_MAP = {
  [DISTANCE_DRY_ID]: DISTANCE_RAINY_ID,
  [TRAVEL_CONDITION_ID]: TRAVEL_CONDITION_ID2,
  [FOOT_DURATION_ID]: FOOT_DURATION_ID2,
  [BIKE_DURATION_ID]: BIKE_DURATION_ID2,
  [BOAT_TIME_ID]: BOAT_DURATION_ID2,
  [FERRY_FEE_ID]: FERRY_FEE_ID2,
  [CAN_TAVEL_BY_CAR]: CAN_TAVEL_BY_CAR2,
  [NEED_HUMAN_CARRY_BIKE_DRY_ID]: NEED_HUMAN_CARRY_BIKE_ID,
  [FEES_CARRY_BIKE_DRY_ID]: FEES_CARRY_BIKE_ID,
  [TRUCK_NEED_DRY_ID]: TRUCK_NEED_RAIN_ID,
  [FEE_FOR_TRUCK_DRY_ID]: FEE_FOR_TRUCK_ID,
  [DANGEROUS_DRY_ID]: DANGEROUS_RAINY_ID,
};

const RAINY_SECTION_IDS_FOR_CHANGE_DETECTION = [
  DISTANCE_RAINY_ID,
  TRAVEL_CONDITION_ID2,
  FOOT_DURATION_ID2,
  BIKE_DURATION_ID2,
  BOAT_DURATION_ID2,
  FERRY_FEE_ID2,
  CAN_TAVEL_BY_CAR2,
  NEED_HUMAN_CARRY_BIKE_ID,
  FEES_CARRY_BIKE_ID,
  NEED_TO_CROOS_RIVER2,
  TRUCK_NEED_RAIN_ID,
  FEE_FOR_TRUCK_ID,
  DANGEROUS_RAINY_ID,
 
];


const INTEGER_ONLY_IDS = [
  "dBK06ybZUbT",
  "F3U851g1biu",
  "Lh7BukXsQES",
  "UiDx8c6lno5",
  "ttoaHSY8sTB",
  "T08IOF1bwi3",
  "f40RBOQlDi1", 
  "P554rYBYhyN", 
];

const HIDE_IF_YES_ID = "F3U851g1biu";
const YES_TRIGGER_ID = "jWinhL2rxeK";

const SHOW_TRIGGER_ID = "rvYPto0hxVE"; 
const SHOW_IF_TRUE_ID = "UiDx8c6lno5"; 

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
      return ch;
    }
  );

const norm = (s) => String(s ?? "").trim().toLowerCase();

const setEventDEValue = (actions, eventId, deId, value) => {
  if (!actions || !eventId || !deId) return;

  try {
    if (typeof actions.handleEventDataValueChange === "function") {
      actions.handleEventDataValueChange({
        event: eventId,
        dataElement: deId,
        value,
      });
      return;
    }
    if (typeof actions.setDataValue === "function") {
      actions.setDataValue({ event: eventId, dataElement: deId, value });
      return;
    }
  } catch {
  }

  const stateNow = useTrackerCaptureStore.getState();
  const dataNow = stateNow?.data;
  const freshEvent = dataNow?.currentEvents?.find((ev) => ev.event === eventId);

  const current = Array.isArray(freshEvent?.dataValues)
    ? [...freshEvent.dataValues]
    : [];

  const idx = current.findIndex((dv) => dv.dataElement === deId);

  if (value === "" || value == null) {
    if (idx >= 0) {
      current.splice(idx, 1);
    }
  } else if (idx >= 0) {
    if (current[idx].value === value) return;
    current[idx] = { ...current[idx], value };
  } else {
    current.push({ dataElement: deId, value });
  }

  try {
    if (typeof actions.changeEventProperty === "function") {
      actions.changeEventProperty(eventId, "dataValues", current);
    }
  } catch {
  }
};

const applyTravelConditionRules = (
  travelCondRaw,
  {
    footId,
    bikeId,
    boatId,
    ferryFeeId,
    needCrossRiverId,
    canTravelByCarId,
  },
  hiddenFields
) => {
  const travelCond = norm(travelCondRaw);

  let hideFoot = false;
  let hideBike = false;
  let hideBoat = false;
  let hasBoat = false;

  if (travelCond) {
    const hasFoot = travelCond.includes("foot");
    const hasBike = travelCond.includes("bike");
    hasBoat = travelCond.includes("boat");

    if (!hasFoot) hideFoot = true;
    if (!hasBike) hideBike = true;
    if (!hasBoat) hideBoat = true;
  }

  if (hideFoot && footId) hiddenFields[footId] = true;
  if (hideBike && bikeId) hiddenFields[bikeId] = true;
  if (hideBike && canTravelByCarId) hiddenFields[canTravelByCarId] = true;
  if (hideBoat && boatId) hiddenFields[boatId] = true;
  if (hideBoat && ferryFeeId) hiddenFields[ferryFeeId] = true;
  if (hasBoat && needCrossRiverId) hiddenFields[needCrossRiverId] = true;

  return { hasBoat };
};


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

  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({ data: state.data, actions: state.actions }))
  );
  const { currentTei, currentEvents, selectedEvent } = data || {};
  const currentEvent = currentEvents?.find((ev) => ev.event === selectedEvent);
  const eventId = currentEvent?.event || currentEvent?.id;

  const lastFlagYesRef = useRef(false);
  const lastSnapshotRef = useRef(null);
  const copyFlagLockedRef = useRef(false);

  const prevHiddenRef = useRef({});

  useEffect(() => {
    const assignations = {};
    const warnings = {};
    const warningTexts = {};
    const hiddenOptions = {};
    const hiddenFields = {};
    const disabledFields = {};

    const dv = (id) => {
      if (!currentEvent || !id) return undefined;

      if (
        currentEvent.values &&
        typeof currentEvent.values === "object" &&
        Object.prototype.hasOwnProperty.call(currentEvent.values, id)
      ) {
        return currentEvent.values[id];
      }

      if (Array.isArray(currentEvent.dataValues)) {
        const hit = currentEvent.dataValues.find((x) => x.dataElement === id);
        if (hit) return hit.value;
      }

      return currentEvent[id];
    };

    const dvSnapshot = (id) => {
      if (!id) return undefined;
      const stateNow = useTrackerCaptureStore.getState();
      const dataNow = stateNow?.data;
      const ev =
        dataNow?.currentEvents?.find((e) => e.event === selectedEvent) ||
        currentEvent;
      if (!ev) return undefined;

      if (
        ev.values &&
        typeof ev.values === "object" &&
        Object.prototype.hasOwnProperty.call(ev.values, id)
      ) {
        return ev.values[id];
      }

      if (Array.isArray(ev.dataValues)) {
        const hit = ev.dataValues.find((x) => x.dataElement === id);
        if (hit) return hit.value;
      }

      return ev[id];
    };

    const buildRainySnapshot = () => {
      const obj = {};
      for (const rainyId of RAINY_SECTION_IDS_FOR_CHANGE_DETECTION) {
        obj[rainyId] = dvSnapshot(rainyId) ?? "";
      }
      return JSON.stringify(obj);
    };

    const flagRaw = dv(COPY_TRAVEL_COND_FLAG_ID);
    const flagNorm = norm(flagRaw);
    const isFlagYes =
      flagNorm === "true" || flagNorm === "yes" || flagNorm === "1";

    const lastFlagYes = lastFlagYesRef.current;

    if (isFlagYes && !lastFlagYes && actions && currentEvent && eventId) {
      Object.entries(DRY_TO_RAINY_MAP).forEach(([dryId, rainyId]) => {
        const srcVal = dv(dryId) ?? "";
        setEventDEValue(actions, eventId, rainyId, srcVal);
      });

      lastSnapshotRef.current = buildRainySnapshot();
      copyFlagLockedRef.current = false; 
    }

    if (lastSnapshotRef.current && actions && currentEvent && eventId) {
      const currentSnapshot = buildRainySnapshot();
      if (currentSnapshot !== lastSnapshotRef.current) {

        setEventDEValue(actions, eventId, COPY_TRAVEL_COND_FLAG_ID, "");

        if (LOCK_COPY_FLAG_AFTER_RAINY_EDIT) {
          copyFlagLockedRef.current = true;
        }

        lastSnapshotRef.current = null;
      }
    }

    lastFlagYesRef.current = isFlagYes;

    const { hasBoat: hasBoat1 } = applyTravelConditionRules(
      dv(TRAVEL_CONDITION_ID),
      {
        footId: FOOT_DURATION_ID,
        bikeId: BIKE_DURATION_ID,
        boatId: BOAT_TIME_ID,
        ferryFeeId: FERRY_FEE_ID,
        needCrossRiverId: NEED_TO_CROOS_RIVER,
        canTravelByCarId: CAN_TAVEL_BY_CAR, // dry car field
      },
      hiddenFields
    );

    const { hasBoat: hasBoat2 } = applyTravelConditionRules(
      dv(TRAVEL_CONDITION_ID2),
      {
        footId: FOOT_DURATION_ID2,
        bikeId: BIKE_DURATION_ID2,
        boatId: BOAT_DURATION_ID2,
        ferryFeeId: FERRY_FEE_ID2,
        needCrossRiverId: NEED_TO_CROOS_RIVER2,
        canTravelByCarId: CAN_TAVEL_BY_CAR2, // rainy car field
      },
      hiddenFields
    );

    const cond1Raw = dv(TRAVEL_CONDITION_ID);
    const cond1 = norm(cond1Raw || "");
    const hasFoot1 = cond1.includes("foot");
    const hasBike1 = cond1.includes("bike");
    const isBoatOnly1 = hasBoat1 && !hasFoot1 && !hasBike1;
    const isBoatOnlyLabel1 =
      cond1 === "can only travel by boat from source to destination";
    const treatAsBoatOnly1 = isBoatOnly1 || isBoatOnlyLabel1;

    const cond2Raw = dv(TRAVEL_CONDITION_ID2);
    const cond2 = norm(cond2Raw || "");
    const hasFoot2 = cond2.includes("foot");
    const hasBike2 = cond2.includes("bike");
    const isBoatOnly2 = hasBoat2 && !hasFoot2 && !hasBike2;
    const isBoatOnlyLabel2 =
      cond2 === "can only travel by boat from source to destination";
    const treatAsBoatOnly2 = isBoatOnly2 || isBoatOnlyLabel2;

    if (!hasBike1) {
      hiddenFields[NEED_HUMAN_CARRY_BIKE_DRY_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
    } else {
      const needHumanDryVal = dv(NEED_HUMAN_CARRY_BIKE_DRY_ID);
      const needHumanDryNorm = norm(needHumanDryVal);
      if (needHumanDryNorm !== "yes" && needHumanDryNorm !== "true") {
        hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
      }
    }

    if (treatAsBoatOnly1) {
      hiddenFields[TRUCK_NEED_DRY_ID] = true;
      hiddenFields[FEE_FOR_TRUCK_DRY_ID] = true;
    } else {
      const truckNeedDryVal = dv(TRUCK_NEED_DRY_ID);
      const truckNeedDryNorm = norm(truckNeedDryVal);
      if (truckNeedDryNorm !== "true" && truckNeedDryNorm !== "yes") {
        hiddenFields[FEE_FOR_TRUCK_DRY_ID] = true;
      }
    }

    if (!hasBike2) {
      hiddenFields[NEED_HUMAN_CARRY_BIKE_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_ID] = true;
    } else {
      const needHumanVal = dv(NEED_HUMAN_CARRY_BIKE_ID);
      const needHumanNorm = norm(needHumanVal);
      if (needHumanNorm !== "yes" && needHumanNorm !== "true") {
        hiddenFields[FEES_CARRY_BIKE_ID] = true;
      }
    }

    if (treatAsBoatOnly2) {
      hiddenFields[TRUCK_NEED_RAIN_ID] = true;
      hiddenFields[FEE_FOR_TRUCK_ID] = true;
    } else {
      const truckNeedRainVal = dv(TRUCK_NEED_RAIN_ID);
      const truckNeedRainNorm = norm(truckNeedRainVal);
      if (truckNeedRainNorm !== "true" && truckNeedRainNorm !== "yes") {
        hiddenFields[FEE_FOR_TRUCK_ID] = true;
      }
    }

    if (treatAsBoatOnly2) {
      hiddenFields[ROAD_BROKEN_ID] = true;
    }

    const yesTriggerVal = dv(YES_TRIGGER_ID);
    const yesNorm = norm(yesTriggerVal);
    if (yesNorm !== "true" && yesNorm !== "yes") {
      hiddenFields[HIDE_IF_YES_ID] = true;
    }

    for (const id of INTEGER_ONLY_IDS) {
      if (hiddenFields[id]) continue;

      const raw = toAsciiDigits(String(dv(id) ?? "").trim());
      if (raw === "") continue;

      if (!/^\d+$/.test(raw)) {
        warnings[id] = "integerOnly";
        warningTexts[id] = t("nearby.warnings.integerOnly", {
          defaultValue: "Please enter a whole number (digits 0–9 only).",
        });
        continue;
      }

      const num = Number(raw);
      if (!Number.isFinite(num) || num < 0 || (num > 0 && num < 1000)) {
        warnings[id] = "min1000OrZero";
        warningTexts[id] = t("nearby.warnings.min1000OrZero", {
          defaultValue: "Value must be 0 or at least 1000.",
        });
      }
    }

    hiddenOptions[BOAT_TIME_ID] = ["cannot_foot", "cannot_bike"];
    if (actions && eventId) {
      const prevHidden = prevHiddenRef.current || {};
      for (const deId of Object.keys(hiddenFields)) {
        const wasHidden = !!prevHidden[deId];
        const isHidden = !!hiddenFields[deId];
        if (isHidden && !wasHidden) {

          setEventDEValue(actions, eventId, deId, "");
        }
      }
      prevHiddenRef.current = { ...hiddenFields };
    } else {

      prevHiddenRef.current = { ...hiddenFields };
    }

    if (copyFlagLockedRef.current && LOCK_COPY_FLAG_AFTER_RAINY_EDIT) {
      disabledFields[COPY_TRAVEL_COND_FLAG_ID] = true;
    }

    setProps({
      assignations,
      warnings,
      warningTexts,
      hiddenFields,
      hiddenOptions,
      disabledFields,
    });
  }, [
    JSON.stringify(currentEvent),
    JSON.stringify(currentTei?.lastSaved),
    t,
    selectedEvent,
    eventId,
  ]);

  return props;
};

export default useNearbyRules;
export { toAsciiDigits };
