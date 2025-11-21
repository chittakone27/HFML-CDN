import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const TRAVEL_CONDITION_ID = "tiXQkpoVypv"; // Travel condition (option set)
const FOOT_DURATION_ID = "ooCoZbdc3az";
const BIKE_DURATION_ID = "bHbKBszX1LW";
const BOAT_TIME_ID = "gepvFAO9AZ7";
const FERRY_FEE_ID = "OWAR8Vpa8IW";
const NEED_TO_CROOS_RIVER = "pNpvxWJdma0";
const CROSS_FEE_DRY_ID = "J6etH8q3xGw";
const CAN_TAVEL_BY_CAR = "qMcrT19dJzL";
const NEED_HUMAN_CARRY_BIKE_DRY_ID = "NougqvmbbOa";
const FEES_CARRY_BIKE_DRY_ID = "epuK8h4Tj9F";
const TRUCK_NEED_DRY_ID = "u2UUQIeQadY";
const FEE_FOR_TRUCK_DRY_ID = "Xj9BWckBot5";

const TRAVEL_CONDITION_ID2 = "GWjkmxiRjk0";
const FOOT_DURATION_ID2 = "H7wG8lNIkrC";
const BIKE_DURATION_ID2 = "boNkAhvANYo";
const BOAT_DURATION_ID2 = "ISndNMGW9xi";
const FERRY_FEE_ID2 = "GkV6y3THu3M";
const NEED_TO_CROOS_RIVER2 = "SOWCUUYumd6";
const CROSS_FEE_RAIN_ID = "kqG0GV8L1pK";
const NEED_HUMAN_CARRY_BIKE_ID = "CFpxTPRuM5q";
const FEES_CARRY_BIKE_ID = "eLZZDJq63Lx";
const TRUCK_NEED_RAIN_ID = "WJ9rQPMdnfo";
const FEE_FOR_TRUCK_ID = "EwZZZTIDA8c";
const ROAD_BROKEN_ID = "d7eFdiZip4P";
const CAN_TAVEL_BY_CAR2 = "OchVqUn7V0b";

const INTEGER_ONLY_IDS = [
  FERRY_FEE_ID,        // dry: boat fee
  CROSS_FEE_DRY_ID,    // dry: crossing fee
  FERRY_FEE_ID2,       // rainy: boat fee
  CROSS_FEE_RAIN_ID,   // rainy: crossing fee
  FEES_CARRY_BIKE_ID,  // rainy: fee for human carry bike
  FEE_FOR_TRUCK_ID,    // rainy: fee for truck
  FEES_CARRY_BIKE_DRY_ID, // dry: fee for human carry bike
  FEE_FOR_TRUCK_DRY_ID,   // dry: fee for truck
];

const HIDE_IF_YES_ID = CROSS_FEE_DRY_ID;
const YES_TRIGGER_ID = NEED_TO_CROOS_RIVER;

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

const useVillageRules = () => {
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

    const { hasBoat: hasBoat1 } = applyTravelConditionRules(
      dv(TRAVEL_CONDITION_ID),
      {
        footId: FOOT_DURATION_ID,
        bikeId: BIKE_DURATION_ID,
        boatId: BOAT_TIME_ID,
        ferryFeeId: FERRY_FEE_ID,
        needCrossRiverId: NEED_TO_CROOS_RIVER,
        canTravelByCarId: CAN_TAVEL_BY_CAR,
      },
      hiddenFields
    );

    const yesTriggerVal = dv(YES_TRIGGER_ID);
    const yesNorm = norm(yesTriggerVal);
    if (yesNorm !== "true" && yesNorm !== "yes") {
      hiddenFields[HIDE_IF_YES_ID] = true;
    }

    const cond1Raw = dv(TRAVEL_CONDITION_ID);
    const cond1 = norm(cond1Raw || "");
    const hasFoot1 = cond1.includes("foot");
    const hasBike1 = cond1.includes("bike");
    const isBoatOnly1 = hasBoat1 && !hasFoot1 && !hasBike1;
    const isBoatOnlyLabel1 =
      cond1 === "can only travel by boat from source to destination";
    const treatAsBoatOnly1 = isBoatOnly1 || isBoatOnlyLabel1;

    if (!hasBike1) {
      hiddenFields[NEED_HUMAN_CARRY_BIKE_DRY_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
    } else {
      const needHumanDryVal = dv(NEED_HUMAN_CARRY_BIKE_DRY_ID);
      const needHumanDryNorm = norm(needHumanDryVal);
      if (needHumanDryNorm !== "yes" && needHumanDryNorm !== "true") {
        hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true; // show fee only if YES
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

    const cond2Raw = dv(TRAVEL_CONDITION_ID2);
    const cond2 = norm(cond2Raw || "");
    const hasFoot2 = cond2.includes("foot");
    const hasBike2 = cond2.includes("bike");
    const isBoatOnly2 = hasBoat2 && !hasFoot2 && !hasBike2;
    const isBoatOnlyLabel2 =
      cond2 === "can only travel by boat from source to destination";

    const treatAsBoatOnly2 = isBoatOnly2 || isBoatOnlyLabel2;

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

    const crossRainVal = dv(NEED_TO_CROOS_RIVER2);
    const crossRainNorm = norm(crossRainVal);
    if (crossRainNorm !== "true" && crossRainNorm !== "yes") {
      hiddenFields[CROSS_FEE_RAIN_ID] = true;
    }

    for (const id of INTEGER_ONLY_IDS) {
      if (hiddenFields[id]) continue;

      const raw = toAsciiDigits(String(dv(id) ?? "").trim());
      if (raw === "") continue;

      if (!/^\d+$/.test(raw)) {
        warnings[id] = "integerOnly";
        continue;
      }

      const num = Number(raw);
      if (!Number.isFinite(num) || num < 0 || (num > 0 && num < 1000)) {
        warnings[id] = "min1000OrZero";
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

export default useVillageRules;
export { toAsciiDigits };
