// src/configs/laotracker/program-forms/nearby/useNearbyRules.js
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Travel-time / condition DEs – Section 1 (dry season)
const TRAVEL_CONDITION_ID = "dfMxJtpEVY0"; // Travel condition (option set)
const FOOT_DURATION_ID = "Bokim7QLnF8"; // Travel duration – foot
const BIKE_DURATION_ID = "bcnCvxfxNeF"; // Travel duration – bike
const FERRY_FEE_ID = "dBK06ybZUbT"; // Ferry fee
const NEED_TO_CROOS_RIVER = "jWinhL2rxeK"; // Need to cross river (Yes/No)
const CAN_TAVEL_BY_CAR = "NI37vfjXk6J"; // The parts that bike can go, car can go as well (dry)

// New dry-season bike & truck fields
const NEED_HUMAN_CARRY_BIKE_DRY_ID = "wrXGoTI4uQH"; // Need human to carry bike (dry)
const FEES_CARRY_BIKE_DRY_ID = "f40RBOQlDi1"; // Fee for human to carry bike (dry)
const TRUCK_NEED_DRY_ID = "jaHGxAr3E9p"; // Need a truck to cross muddy road (dry)
const FEE_FOR_TRUCK_DRY_ID = "P554rYBYhyN"; // Fee for truck (dry)

// Travel-time / condition DEs – Section 2 (rainy season)
const TRAVEL_CONDITION_ID2 = "BiSiYIv9EFW"; // Travel condition (option set)
const BIKE_DURATION_ID2 = "VSbTF1Y4CMD"; // Travel duration – bike
const FOOT_DURATION_ID2 = "cC9tXe9nM1O"; // Travel duration – foot
const BOAT_DURATION_ID2 = "thA1ltseEo4"; // Travel time – boat (sec 2)
const NEED_TO_CROOS_RIVER2 = "rvYPto0hxVE"; // Need to cross river (Yes/No)
const FERRY_FEE_ID2 = "Lh7BukXsQES"; // Ferry fee
const NEED_HUMAN_CARRY_BIKE_ID = "xcFzGlfAZNW"; // Need human assistance (Yes/No, rainy)
const FEES_CARRY_BIKE_ID = "ttoaHSY8sTB"; // Fees for human assistance (rainy)
const FEE_FOR_TRUCK_ID = "T08IOF1bwi3"; // Fee for truck (rainy)
const ROAD_BROKEN_ID = "ex7pwRhyyAM"; // Road damaged in rainy season (Yes/No)
const TRUCK_NEED_RAIN_ID = "j7JHlTSVlPy"; // Need truck to cross muddy road (rainy)
const CAN_TAVEL_BY_CAR2 = "XaW1WBFbzid"; // The parts that bike can go, car can go as well (rainy)

// Boat-related DEs – Section 1
const BOAT_TIME_ID = "yZfjh0SBRzz"; // Travel time by boat

// Fee fields: integer only, allowed 0 or >= 1000
const INTEGER_ONLY_IDS = [
  "dBK06ybZUbT",
  "F3U851g1biu",
  "Lh7BukXsQES",
  "UiDx8c6lno5",
  "ttoaHSY8sTB",
  "T08IOF1bwi3",
  "f40RBOQlDi1", // fee for human (dry)
  "P554rYBYhyN", // fee for truck (dry)
];

// Existing dry-section rule: hide F3U851g1biu if jWinhL2rxeK not true
const HIDE_IF_YES_ID = "F3U851g1biu";
const YES_TRIGGER_ID = "jWinhL2rxeK";

// (Old dry truck IDs kept for safety, but not used anymore)
const SHOW_TRIGGER_ID = "rvYPto0hxVE"; // legacy
const SHOW_IF_TRUE_ID = "UiDx8c6lno5"; // legacy

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
    // 1) Travel condition rules – Section 1 (dfMxJtpEVY0)
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // 1.2) Travel condition rules – Section 2 (BiSiYIv9EFW)
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

    // --- Extra logic based on travel modality in Section 1 & 2 --------------
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

    // -----------------------------------------------------------------------
    // 1.a) Dry-season bike helper: human carry bike + fee
    // -----------------------------------------------------------------------
    if (!hasBike1) {
      // No bike in modality → hide both DEs
      hiddenFields[NEED_HUMAN_CARRY_BIKE_DRY_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
    } else {
      // Fee only when "Need human to carry bike" is Yes/true
      const needHumanDryVal = dv(NEED_HUMAN_CARRY_BIKE_DRY_ID);
      const needHumanDryNorm = norm(needHumanDryVal);
      if (needHumanDryNorm !== "yes" && needHumanDryNorm !== "true") {
        hiddenFields[FEES_CARRY_BIKE_DRY_ID] = true;
      }
    }

    // -----------------------------------------------------------------------
    // 1.b) Dry-season truck logic:
    //      - If travel modality is only boat → hide both
    //      - Else: show fee only when Need truck is yes/true
    // -----------------------------------------------------------------------
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
    // 1.c) Rainy-season extra logic (unchanged, now using treatAsBoatOnly2)
    // -----------------------------------------------------------------------
    // Need human to carry bike — show only if bike is part of travel modality
    if (!hasBike2) {
      hiddenFields[NEED_HUMAN_CARRY_BIKE_ID] = true;
      hiddenFields[FEES_CARRY_BIKE_ID] = true; // bike not used → also hide fee
    } else {
      // Fee for human to carry bike — show only if above DE is Yes/true
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

    // Road damaged in rainy season — show only if modality is NOT "only boat"
    if (treatAsBoatOnly2) {
      hiddenFields[ROAD_BROKEN_ID] = true;
    }

    // -----------------------------------------------------------------------
    // 2) Existing rule (Section 1): hide F3U851g1biu when jWinhL2rxeK is NOT true
    // -----------------------------------------------------------------------
    const yesTriggerVal = dv(YES_TRIGGER_ID);
    const yesNorm = norm(yesTriggerVal);
    if (yesNorm !== "true" && yesNorm !== "yes") {
      hiddenFields[HIDE_IF_YES_ID] = true;
    }

    // -----------------------------------------------------------------------
    // 3) Integer-only + 0 or >= 1000 for all fee fields
    // -----------------------------------------------------------------------
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
      // Allowed: 0 OR >= 1000; disallow negatives and 1–999
      if (!Number.isFinite(num) || num < 0 || (num > 0 && num < 1000)) {
        warnings[id] = "min1000OrZero";
        warningTexts[id] = t("nearby.warnings.min1000OrZero", {
          defaultValue: "Value must be 0 or at least 1000.",
        });
      }
    }

    // -----------------------------------------------------------------------
    // 4) Hide specific options for Travel time by boat yZfjh0SBRzz
    //    Hide: cannot_foot, cannot_bike
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

export default useNearbyRules;
export { toAsciiDigits };
