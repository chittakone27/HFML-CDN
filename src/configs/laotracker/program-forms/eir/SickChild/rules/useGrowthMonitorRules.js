import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
import {
  addDays,
  addYears,
  addMonths,
  format,
  differenceInYears,
  differenceInMonths,
  differenceInDays
} from "date-fns";
import { DOB_ATTR_ID } from "../const";

const YEAR_ID = "jBEIyV4jneP";
const MONTH_ID = "Tw0hHyhbjgF";
const WEEK_ID = "vTci7gLTO9d";
const DAY_ID = "AF36bOueuZB";

// Pneumonia hides these:
const HIDE_IF_PNEUMONIA = [
  "EJ10RvCF4DK",
  "DtM9O0NrjcP",
  "F8dkD0Q07Om",
  "rsE2q1cDpqe",
  "qh8i5p7yZX4",
  "fAoWiYGCuvz",
];

// Show/hide + autofill target
const SHOW_IF_LAST_VISIT = "rgDuTaKYmIA";

// ---- Numeric constraints you requested ----
const LIMITS = {
  fAoWiYGCuvz: { max: 50 },
  qh8i5p7yZX4: { max: 50 },
  EJ10RvCF4DK: { max: 50 },
  DtM9O0NrjcP: { min: 50, max: 1000 },
  F8dkD0Q07Om: { min: 37.5, max: 750, decimals: 2 }, // up to 2 decimals
  rsE2q1cDpqe: { max: 50 },
  Sl1BmkUV9HD: { max: 50 },
};

const LIMIT_IDS = Object.keys(LIMITS);

const useGrowthMonitorRules = () => {
  const [hiddenFields, setHiddenFields] = useState([]);

  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({ data: state.data, actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions ?? {};
  const { currentTei } = data ?? {};

  const getVal = (deId) =>
    currentEvent?.dataValues?.find((d) => d.dataElement === deId)?.value ?? "";

  // ---------- Visibility + rgDuTaKYmIA auto-fill ----------
  useEffect(() => {
    if (!currentEvent?.event) return;

    const diagnosis = String(getVal("BM2NqJZcLCg")).trim().toLowerCase();
    const visitType = String(getVal("Do3RE2NXrxp")).trim();
    const yesNo = String(getVal("ATIQuAZ9lU0")).trim();

    const toHide = new Set();

    // A) If Pneumonia → hide those fields
    if (diagnosis === "pneumonia") {
      HIDE_IF_PNEUMONIA.forEach((id) => toHide.add(id));
    }

    // B) Last visit rule → show rgDuTaKYmIA only when visit type is "Last visit"
    const isLastVisit = visitType !== "Last visit";
    if (!isLastVisit) {
      toHide.add(SHOW_IF_LAST_VISIT);
    }

    // --- Apply auto-fill for rgDuTaKYmIA when visible ---
    if (isLastVisit) {
      const baseDate = currentEvent?.eventDate
        ? new Date(currentEvent.eventDate)
        : new Date();
      const yesValues = new Set(["Yes", "YES", "yes", "true", "True"]);
      const offsetDays = yesValues.has(yesNo) ? 1 : 14; // next day if "Yes", else +14
      const targetDate = addDays(baseDate, offsetDays);
      const dhisDate = format(targetDate, "yyyy-MM-dd");
      changeDataValue?.(currentEvent.event, SHOW_IF_LAST_VISIT, dhisDate);
    } else {
      // hidden → clear
      changeDataValue?.(currentEvent.event, SHOW_IF_LAST_VISIT, "");
    }

    // Clear any other fields we hide (except rgDuTaKYmIA already handled)
    for (const id of toHide) {
      if (id !== SHOW_IF_LAST_VISIT) {
        changeDataValue?.(currentEvent.event, id, "");
      }
    }

    setHiddenFields(Array.from(toHide));
  }, [
    currentEvent?.event,
    currentEvent?.eventDate, // base for next-day/14-day calc
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) =>
          ["BM2NqJZcLCg", "Do3RE2NXrxp", "ATIQuAZ9lU0"].includes(d.dataElement)
        )
        .map((d) => [d.dataElement, d.value])
    ),
  ]);

  // ---------- Numeric constraints (clamp/format) ----------
  useEffect(() => {
    if (!currentEvent?.event || !currentEvent?.dataValues) return;

    const isInterim = (raw) => {
      if (raw === null || raw === undefined) return true;
      const s = String(raw).trim();
      if (s === "") return true;
      if (s === "-" || s === "+") return true;
      if (s.endsWith(".")) return true; // let "30." be typed before clamping
      return !/^[0-9]*\.?[0-9]*$/.test(s);
    };

    const toAtMostNDecimals = (num, n) => {
      const s = String(num);
      if (!s.includes(".")) return s;
      const [i, f] = s.split(".");
      return f.length > n ? `${i}.${f.slice(0, n)}` : s;
    };

    for (const deId of LIMIT_IDS) {
      const conf = LIMITS[deId];
      const raw = String(getVal(deId));
      if (isInterim(raw)) continue;

      const num = parseFloat(raw);
      if (Number.isNaN(num)) continue;

      let next = num;

      if (conf.min != null && next < conf.min) next = conf.min;
      if (conf.max != null && next > conf.max) next = conf.max;

      let out = String(next);
      if (conf.decimals != null) {
        out = toAtMostNDecimals(next, conf.decimals);
      }
      // Only write back if changed
      if (out !== raw) {
        changeDataValue?.(currentEvent.event, deId, out);
      }
    }
  }, [
    currentEvent?.event,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) => LIMIT_IDS.includes(d.dataElement))
        .map((d) => [d.dataElement, d.value])
    ),
  ]);

  // ---------- Calendar-accurate age autofill (year → month → week/day) ----------
  useEffect(() => {
    const evtStr = currentEvent?.eventDate;
    const dobStr = currentTei?.attributes?.find(
      (a) => a.attribute === DOB_ATTR_ID
    )?.value;

    if (!currentEvent?.event) return;

    // If either missing → clear
    if (!evtStr || !dobStr) {
      changeDataValue?.(currentEvent.event, YEAR_ID, "");
      changeDataValue?.(currentEvent.event, MONTH_ID, "");
      changeDataValue?.(currentEvent.event, WEEK_ID, "");
      changeDataValue?.(currentEvent.event, DAY_ID, "");
      return;
    }

    const eventDate = new Date(evtStr);
    const dob = new Date(dobStr);

    const valid =
      !Number.isNaN(eventDate.getTime()) &&
      !Number.isNaN(dob.getTime()) &&
      eventDate >= dob;

    if (!valid) {
      changeDataValue?.(currentEvent.event, YEAR_ID, 0);
      changeDataValue?.(currentEvent.event, MONTH_ID, 0);
      changeDataValue?.(currentEvent.event, WEEK_ID, 0);
      changeDataValue?.(currentEvent.event, DAY_ID, 0);
      return;
    }

    // 1) Years
    const years = differenceInYears(eventDate, dob);
    const dobPlusYears = addYears(dob, years);

    // 2) Remaining months
    const months = differenceInMonths(eventDate, dobPlusYears);
    const dobPlusYearsMonths = addMonths(dobPlusYears, months);

    // 3) Remaining days → split into weeks + days
    const remDays = differenceInDays(eventDate, dobPlusYearsMonths);
    const weeks = Math.floor(remDays / 7);
    const days = remDays % 7;

    // Write back
    changeDataValue?.(currentEvent.event, YEAR_ID, years);
    changeDataValue?.(currentEvent.event, MONTH_ID, months);
    changeDataValue?.(currentEvent.event, WEEK_ID, weeks);
    changeDataValue?.(currentEvent.event, DAY_ID, days);
  }, [
    currentEvent?.event,
    currentEvent?.eventDate,
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value
  ]);

  return { hiddenFields };
};

export default useGrowthMonitorRules;
