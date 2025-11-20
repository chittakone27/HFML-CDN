// src/configs/laotracker/program-forms/villages-catchment/useVillageRules.js
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// -------------------------------------------------------------------
// Dry-season travel conditions (village → HF)
// -------------------------------------------------------------------
// 2. Travel modality
const TRAVEL_CONDITION_ID = "tiXQkpoVypv"; // Travel condition (option set)
// 3. Travel time (hour) by foot
const FOOT_DURATION_ID = "ooCoZbdc3az";
// 4. Travel time (hour) by bike
const BIKE_DURATION_ID = "bHbKBszX1LW";
// 5. Travel time (hour) by boat
const BOAT_TIME_ID = "gepvFAO9AZ7";
// 6. Boat fee one-way (Kip)
const FERRY_FEE_ID = "OWAR8Vpa8IW";
// 7. Need to cross river (e.g. by boat)
const NEED_TO_CROOS_RIVER = "pNpvxWJdma0";
// 8. Fee for crossing river (one-way) (Kip)
const CROSS_FEE_DRY_ID = "J6etH8q3xGw";
// 10. Can travel by car in dry season
const CAN_TAVEL_BY_CAR = "qMcrT19dJzL";

// NEW dry-season bike/truck fields
// 9. Need human to carry bike across muddy road or shallow river
const NEED_HUMAN_CARRY_BIKE_DRY_ID = "NougqvmbbOa";
// 10. Fee for human to carry bike (one-way fee)
const FEES_CARRY_BIKE_DRY_ID = "epuK8h4Tj9F";
// 11. Need a truck to cross muddy road
const TRUCK_NEED_DRY_ID = "u2UUQIeQadY";
// 12. Fee for truck
const FEE_FOR_TRUCK_DRY_ID = "Xj9BWckBot5";

// -------------------------------------------------------------------
// Rainy-season travel conditions (village → HF)
// -------------------------------------------------------------------
// 2. Travel modality
const TRAVEL_CONDITION_ID2 = "GWjkmxiRjk0";
// 3. Travel time (hour) by foot
const FOOT_DURATION_ID2 = "H7wG8lNIkrC";
// 4. Travel time (hour) by bike
const BIKE_DURATION_ID2 = "boNkAhvANYo";
// 5. Travel time (hour) by boat
const BOAT_DURATION_ID2 = "ISndNMGW9xi";
// 6. Boat fee one-way (Kip)
const FERRY_FEE_ID2 = "GkV6y3THu3M";
// 7. Need to cross river (e.g. by boat)
const NEED_TO_CROOS_RIVER2 = "SOWCUUYumd6";
// 8. Fee for crossing river (one-way) (Kip)
const CROSS_FEE_RAIN_ID = "kqG0GV8L1pK";
// 9. Need human to carry bike across muddy road or shallow river
const NEED_HUMAN_CARRY_BIKE_ID = "CFpxTPRuM5q";
// 10. Fee for human to carry bike (one-way fee)
const FEES_CARRY_BIKE_ID = "eLZZDJq63Lx";
// 11. Need a truck to cross muddy road
const TRUCK_NEED_RAIN_ID = "WJ9rQPMdnfo";
// 12. Fee for truck
const FEE_FOR_TRUCK_ID = "EwZZZTIDA8c";
// 14. Road broken in rainy season
const ROAD_BROKEN_ID = "d7eFdiZip4P";
// NEW: Can travel by car in rainy season (same logic as qMcrT19dJzL)
const CAN_TAVEL_BY_CAR2 = "OchVqUn7V0b";

// -------------------------------------------------------------------
// Integer-only fee fields (0 or ≥ 1000 allowed)
// -------------------------------------------------------------------
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

// Existing dry-section rule in this stage:
// hide J6etH8q3xGw (crossing fee) if pNpvxWJdma0 (need to cross river) is not true
const HIDE_IF_YES_ID = CROSS_FEE_DRY_ID;
const YES_TRIGGER_ID = NEED_TO_CROOS_RIVER;

// Normalize non-ASCII digits to ASCII
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

const norm = (s) => String(s ?? "").trim().toLowerCase();

/**
 * Apply travel-condition rules to one section
 * - If "foot" not present → hide foot field
 * - If "bike" not present → hide bike field (+ optional car field)
 * - If "boat" not present → hide boat duration & ferry fee
 * - If "boat" present     → hide "Need to cross river"
 */
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

    // -----------------------------------------------------------------------
    // 1) Travel condition rules – Section 1 (dry season)
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // 1.1) Existing dry rule: show J6etH8q3xGw only if pNpvxWJdma0 is true
    // -----------------------------------------------------------------------
    const yesTriggerVal = dv(YES_TRIGGER_ID);
    const yesNorm = norm(yesTriggerVal);
    if (yesNorm !== "true" && yesNorm !== "yes") {
      hiddenFields[HIDE_IF_YES_ID] = true;
    }

    // --- Extra logic based on travel modality in Section 1 ------------------
    const cond1Raw = dv(TRAVEL_CONDITION_ID);
    const cond1 = norm(cond1Raw || "");
    const hasFoot1 = cond1.includes("foot");
    const hasBike1 = cond1.includes("bike");
    const isBoatOnly1 = hasBoat1 && !hasFoot1 && !hasBike1;
    const isBoatOnlyLabel1 =
      cond1 === "can only travel by boat from source to destination";
    const treatAsBoatOnly1 = isBoatOnly1 || isBoatOnlyLabel1;

    // Dry: Need human to carry bike + fee
    if (!hasBike1) {
      // no bike in modality → hide both
      hiddenFields[NEED_HUMAN_CARRY_BIKE_DRY_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
    } else {
      const needHumanDryVal = dv(NEED_HUMAN_CARRY_BIKE_DRY_ID);
      const needHumanDryNorm = norm(needHumanDryVal);
      if (needHumanDryNorm !== "yes" && needHumanDryNorm !== "true") {
        hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true; // show fee only if YES
      }
    }

    // Dry: truck to cross muddy road + fee
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

    // -----------------------------------------------------------------------
    // 2) Travel condition rules – Section 2 (rainy season)
    // -----------------------------------------------------------------------
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

    // --- Extra logic based on travel modality in Section 2 ------------------
    const cond2Raw = dv(TRAVEL_CONDITION_ID2);
    const cond2 = norm(cond2Raw || "");
    const hasFoot2 = cond2.includes("foot");
    const hasBike2 = cond2.includes("bike");
    const isBoatOnly2 = hasBoat2 && !hasFoot2 && !hasBike2;
    // Literal label: "Can only travel by boat from source to destination"
    const isBoatOnlyLabel2 =
      cond2 === "can only travel by boat from source to destination";

    const treatAsBoatOnly2 = isBoatOnly2 || isBoatOnlyLabel2;

    // Need human to carry bike — show only if bike is part of travel modality
    // Fee for human to carry bike — show only if above DE is Yes/true
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

    // Need a truck to cross muddy road (RAINY)
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

    // Road broken in rainy season — show only if modality is NOT "only boat"
    if (treatAsBoatOnly2) {
      hiddenFields[ROAD_BROKEN_ID] = true;
    }

    // -----------------------------------------------------------------------
    // 2.2) Rainy crossing fee:
    //      kqG0GV8L1pK visible only when SOWCUUYumd6 is yes/true
    // -----------------------------------------------------------------------
    const crossRainVal = dv(NEED_TO_CROOS_RIVER2);
    const crossRainNorm = norm(crossRainVal);
    if (crossRainNorm !== "true" && crossRainNorm !== "yes") {
      hiddenFields[CROSS_FEE_RAIN_ID] = true;
    }

    // -----------------------------------------------------------------------
    // 3) Integer-only + 0 or >= 1000 for all fee fields
    // -----------------------------------------------------------------------
    for (const id of INTEGER_ONLY_IDS) {
      if (hiddenFields[id]) continue;

      const raw = toAsciiDigits(String(dv(id) ?? "").trim());
      if (raw === "") continue;

      // Must be all digits
      if (!/^\d+$/.test(raw)) {
        warnings[id] = "integerOnly";
        continue;
      }

      const num = Number(raw);
      // Allowed: 0 OR >= 1000; disallow negatives and 1–999
      if (!Number.isFinite(num) || num < 0 || (num > 0 && num < 1000)) {
        warnings[id] = "min1000OrZero";
      }
    }

    // -----------------------------------------------------------------------
    // 4) Hide specific options for Travel time by boat (dry)
    //    Boat-time DE: gepvFAO9AZ7 – hide: cannot_foot, cannot_bike
    // -----------------------------------------------------------------------
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
