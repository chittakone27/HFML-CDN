import { useEffect, useRef, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
import {
  addMonths,
  addYears,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  format
} from "date-fns";
import { DOB_ATTR_ID } from "../const";

// Age DEs
const YEAR_ID = "XxJ8Ta1NoAV";
const MONTH_ID = "MV1yoC7BfnG";
const WEEK_ID = "DxOqZZgVQhF";
const DAY_ID = "H40cGMAAnAe";

// Next visit & limiter
const NEXT_VISIT_ID = "SeI2XVTYwDZ";
const LIMIT_FIELD_ID = "tR2Yen5sUnc";
const REFERRED_ID = "ejM2imqrnUF"; // Referred

const useGrowthMonitorRules = () => {
  const [hiddenFields, setHiddenFields] = useState([]);

  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;
  const { currentTei } = data;

  const lastEventDateRef = useRef(null);
  const lastAutoNextRef = useRef(null);

  const getVal = (id) =>
    currentEvent?.dataValues?.find((d) => d.dataElement === id)?.value;

  const isSelected = (v) => {
    const n = Number(v);
    if (Number.isFinite(n)) return n > 0;
    const s = String(v ?? "").trim().toLowerCase();
    return ["yes", "true", "selected", "1"].includes(s);
  };

  // --- Keep your limiter for tR2Yen5sUnc
  useEffect(() => {
    if (!currentEvent) return;

    const val = getVal(LIMIT_FIELD_ID);
    if (val == null) return;

    const isNumeric =
      typeof val === "number" ||
      (typeof val === "string" && val.trim() !== "" && !Number.isNaN(parseFloat(val)));

    if (isNumeric) {
      const n = parseFloat(val);
      if (n > 20) {
        actions?.changeDataValue(currentEvent.event, LIMIT_FIELD_ID, 20);
      }
    } else {
      const s = String(val);
      if (s.length > 20) {
        actions?.changeDataValue(currentEvent.event, LIMIT_FIELD_ID, s.slice(0, 20));
      }
    }
  }, [
    currentEvent?.event,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) => d.dataElement === LIMIT_FIELD_ID)
        .map((d) => [d.dataElement, d.value])
    )
  ]);

  useEffect(() => {
    const dobObj = currentTei?.attributes?.find(
      (attr) => attr["attribute"] === DOB_ATTR_ID
    );
    const eventDateStr = currentEvent?.eventDate;

    if (!eventDateStr) {
      if (currentEvent?.event) changeDataValue(currentEvent.event, NEXT_VISIT_ID, "");
      lastEventDateRef.current = null;
      lastAutoNextRef.current = null;
      return;
    }

    const evt = new Date(eventDateStr);
    if (!Number.isNaN(evt.getTime())) {
      const nextMonthDate = addMonths(evt, 1);
      const autoNext = format(nextMonthDate, "yyyy-MM-dd");

      const currentNext =
        currentEvent?.dataValues?.find((d) => d.dataElement === NEXT_VISIT_ID)?.value || "";

      const eventDateChanged = lastEventDateRef.current !== eventDateStr;

      if (
        (eventDateChanged && (!currentNext || currentNext === lastAutoNextRef.current)) ||
        (!currentNext && !lastAutoNextRef.current)
      ) {
        changeDataValue(currentEvent.event, NEXT_VISIT_ID, autoNext);
      }

      lastEventDateRef.current = eventDateStr;
      lastAutoNextRef.current = autoNext;
    }

    if (dobObj?.value && eventDateStr) {
      const eventDate = new Date(eventDateStr);
      const dob = new Date(dobObj.value);

      if (
        !Number.isNaN(eventDate.getTime()) &&
        !Number.isNaN(dob.getTime()) &&
        eventDate >= dob
      ) {
        const years = differenceInYears(eventDate, dob);
        const dobPlusYears = addYears(dob, years);
        const months = differenceInMonths(eventDate, dobPlusYears);
        const dobPlusYearsMonths = addMonths(dobPlusYears, months);
        const remainingDays = differenceInDays(eventDate, dobPlusYearsMonths);
        const weeks = Math.floor(remainingDays / 7);
        const days = remainingDays % 7;

        changeDataValue(currentEvent.event, YEAR_ID, years);
        changeDataValue(currentEvent.event, MONTH_ID, months);
        changeDataValue(currentEvent.event, WEEK_ID, weeks);
        changeDataValue(currentEvent.event, DAY_ID, days);
      } else {
        changeDataValue(currentEvent.event, YEAR_ID, 0);
        changeDataValue(currentEvent.event, MONTH_ID, 0);
        changeDataValue(currentEvent.event, WEEK_ID, 0);
        changeDataValue(currentEvent.event, DAY_ID, 0);
      }
    }
  }, [
    currentEvent?.eventDate,
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value
  ]);

  useEffect(() => {
    if (!currentEvent) return;
    const referredYes = isSelected(getVal(REFERRED_ID));
    setHiddenFields(referredYes ? [NEXT_VISIT_ID] : []);
  }, [
    currentEvent?.event,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter(d => d.dataElement === REFERRED_ID)
        .map(d => [d.dataElement, d.value])
    )
  ]);

  return { hiddenFields };
};

export default useGrowthMonitorRules;
