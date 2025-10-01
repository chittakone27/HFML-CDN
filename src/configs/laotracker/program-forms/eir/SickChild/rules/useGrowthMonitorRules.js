import { useEffect, useRef, useState } from "react";
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

const HIDE_IF_PNEUMONIA = [
  "EJ10RvCF4DK",
  "DtM9O0NrjcP",
  "F8dkD0Q07Om",
  "rsE2q1cDpqe",
  "qh8i5p7yZX4",
  "fAoWiYGCuvz",
];

const SHOW_IF_LAST_VISIT = "rgDuTaKYmIA"; // Next visit
const REFERRED_ID = "yZo8WgcTvBi";       // Referred
const HOSPITALIZED_ID = "ATIQuAZ9lU0";    // Hospitalized (true => next day)

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

  const lastEventDateRef = useRef(null);
  const lastAutoNextRef  = useRef(null);
  const lastOffsetRef    = useRef(null); 

  useEffect(() => {
    if (!currentEvent?.event) return;

    const diagnosis      = String(getVal("BM2NqJZcLCg")).trim().toLowerCase();
    const visitType      = String(getVal("Do3RE2NXrxp")).trim();
    const hospitalizedVal= String(getVal(HOSPITALIZED_ID)).trim();
    const referredVal    = String(getVal(REFERRED_ID)).trim();

    const yesValues = new Set(["Yes", "YES", "yes", "true", "True", true, "1", 1]);

    const toHide = new Set();

    if (diagnosis === "pneumonia") {
      HIDE_IF_PNEUMONIA.forEach((id) => toHide.add(id));
    }

  
    const isLastVisit = visitType !== "Last visit";
    if (!isLastVisit) {
      toHide.add(SHOW_IF_LAST_VISIT);
    }


    if (yesValues.has(referredVal)) {
      toHide.add(SHOW_IF_LAST_VISIT);
    }


    if (isLastVisit && !toHide.has(SHOW_IF_LAST_VISIT)) {
      const baseDate   = currentEvent?.eventDate ? new Date(currentEvent.eventDate) : new Date();
      const offsetDays = yesValues.has(hospitalizedVal) ? 1 : 14;   // <-- +1 day if hospitalized, else +14
      const autoNext   = format(addDays(baseDate, offsetDays), "yyyy-MM-dd");

      const curVal             = String(getVal(SHOW_IF_LAST_VISIT) || "");
      const eventDateChanged   = lastEventDateRef.current !== currentEvent?.eventDate;
      const offsetChanged      = lastOffsetRef.current !== offsetDays;
      const userHasOverridden  = curVal && curVal !== lastAutoNextRef.current;


      if (!userHasOverridden && (eventDateChanged || offsetChanged || !curVal)) {
        changeDataValue?.(currentEvent.event, SHOW_IF_LAST_VISIT, autoNext);
        lastAutoNextRef.current = autoNext;
      } else {
        lastAutoNextRef.current = lastAutoNextRef.current ?? autoNext;
      }

      lastEventDateRef.current = currentEvent?.eventDate || "";
      lastOffsetRef.current    = offsetDays;
    } else {
      changeDataValue?.(currentEvent.event, SHOW_IF_LAST_VISIT, "");
      lastAutoNextRef.current = null;
      lastOffsetRef.current   = null;
    }

    for (const id of toHide) {
      if (id !== SHOW_IF_LAST_VISIT) {
        changeDataValue?.(currentEvent.event, id, "");
      }
    }

    setHiddenFields(Array.from(toHide));
  }, [
    currentEvent?.event,
    currentEvent?.eventDate,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) =>
          ["BM2NqJZcLCg", "Do3RE2NXrxp", HOSPITALIZED_ID, REFERRED_ID, SHOW_IF_LAST_VISIT].includes(d.dataElement)
        )
        .map((d) => [d.dataElement, d.value])
    ),
  ]);

  useEffect(() => {
    const evtStr = currentEvent?.eventDate;
    const dobStr = currentTei?.attributes?.find(
      (a) => a.attribute === DOB_ATTR_ID
    )?.value;

    if (!currentEvent?.event) return;

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

    const years = differenceInYears(eventDate, dob);
    const dobPlusYears = addYears(dob, years);

    const months = differenceInMonths(eventDate, dobPlusYears);
    const dobPlusYearsMonths = addMonths(dobPlusYears, months);

    const remDays = differenceInDays(eventDate, dobPlusYearsMonths);
    const weeks = Math.floor(remDays / 7);
    const days = remDays % 7;

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
