import { useEffect, useState } from "react";
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

// --- Age field IDs (from your note)
const YEAR_ID = "XxJ8Ta1NoAV";
const MONTH_ID = "MV1yoC7BfnG";
const WEEK_ID = "DxOqZZgVQhF";
// You mentioned Day uses the same ID as Month; if Day has its own DE, replace below:
const DAY_ID = "H40cGMAAnAe";

const NEXT_VISIT_ID = "SeI2XVTYwDZ";
const LIMIT_FIELD_ID = "tR2Yen5sUnc";

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

  // --- Keep your limiter for tR2Yen5sUnc
  useEffect(() => {
    if (!currentEvent) return;

    const getVal = (id) =>
      currentEvent?.dataValues?.find((d) => d.dataElement === id)?.value;

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

  // --- Calendar-accurate age + next visit auto-update
  useEffect(() => {
    const dobObj = currentTei?.attributes?.find(
      (attr) => attr["attribute"] === DOB_ATTR_ID
    );
    const eventDateStr = currentEvent?.eventDate;

    // If event date is cleared, clear next visit and stop
    if (!eventDateStr) {
      if (currentEvent?.event) changeDataValue(currentEvent.event, NEXT_VISIT_ID, "");
      setHiddenFields([]);
      return;
    }

    // Always write next visit = eventDate + 1 month
    const evt = new Date(eventDateStr);
    if (!Number.isNaN(evt.getTime())) {
      const nextMonthDate = addMonths(evt, 1);
      const dhisDate = format(nextMonthDate, "yyyy-MM-dd");
      changeDataValue(currentEvent.event, NEXT_VISIT_ID, dhisDate);
    }

    // Compute age only if DOB exists & is valid
    if (dobObj?.value && eventDateStr) {
      const eventDate = new Date(eventDateStr);
      const dob = new Date(dobObj.value);

      if (
        !Number.isNaN(eventDate.getTime()) &&
        !Number.isNaN(dob.getTime()) &&
        eventDate >= dob
      ) {
        // 1) Years
        const years = differenceInYears(eventDate, dob);
        const dobPlusYears = addYears(dob, years);

        // 2) Remaining months
        const months = differenceInMonths(eventDate, dobPlusYears);
        const dobPlusYearsMonths = addMonths(dobPlusYears, months);

        // 3) Remaining days
        const remainingDays = differenceInDays(eventDate, dobPlusYearsMonths);

        // 4) Split into weeks + days
        const weeks = Math.floor(remainingDays / 7);
        const days = remainingDays % 7;

        // Write back to DEs
        changeDataValue(currentEvent.event, YEAR_ID, years);
        changeDataValue(currentEvent.event, MONTH_ID, months);
        changeDataValue(currentEvent.event, WEEK_ID, weeks);
        changeDataValue(currentEvent.event, DAY_ID, days);
      } else {
        // If invalid or future DOB vs event, zero out
        changeDataValue(currentEvent.event, YEAR_ID, 0);
        changeDataValue(currentEvent.event, MONTH_ID, 0);
        changeDataValue(currentEvent.event, WEEK_ID, 0);
        changeDataValue(currentEvent.event, DAY_ID, 0);
      }
    }
    setHiddenFields([]);
  }, [
    currentEvent?.event,
    currentEvent?.eventDate,
    // react when DOB changes
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value
  ]);

  return { hiddenFields };
};

export default useGrowthMonitorRules;
