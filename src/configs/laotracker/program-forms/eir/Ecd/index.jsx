import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
// Components
import TrackerTableSection from "../../common/TrackerTableSection";
// Libs
import {
  addMonths,
  addYears,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  format
} from "date-fns";
// CSS
import "./index.css";
// const values
import { ECD_STAGE_ID, DOB_ATTR_ID } from "./const";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";

// --- Age field IDs
const YEAR_ID = "D6GqkdzzOQE";   // workingyear
const MONTH_ID = "BYM3zjvhI4i";   // Month
const WEEK_ID = "lXHpWJigniL";    // weeks
const DAY_ID = "ajx8hlxn2Rs";     // days

// Next visit
const NEXT_VISIT_ID = "vdFLgi5nGWE";

// Show/Hide rule
const TRIGGER_DE_ID = "O22NLnyyiN3"; // if this has any value →
const TARGET_DE_ID  = "D2o1Qh6LZHh"; // …show this; otherwise hide+clear

const Ecd = () => {
  const { currentEvent } = useCurrentEvent();
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({ data: state.data, actions: state.actions }))
  );
  const { changeDataValue } = actions ?? {};
  const { currentTei } = data ?? {};

  const ecdStage = program?.programStages?.find(
    (progStage) => progStage.id === ECD_STAGE_ID
  );
  const { programStageSections = [] } = ecdStage ?? {};

  const getVal = (deId) =>
    currentEvent?.dataValues?.find((d) => d.dataElement === deId)?.value;

  // Compute visibility: show TARGET if TRIGGER has any non-empty value
  const triggerValRaw = getVal(TRIGGER_DE_ID);
  const triggerHasValue =
    triggerValRaw !== null &&
    triggerValRaw !== undefined &&
    String(triggerValRaw).trim() !== "";

  // If hidden, clear TARGET value
  useEffect(() => {
    if (!currentEvent?.event || !changeDataValue) return;
    if (!triggerHasValue) {
      const existing = getVal(TARGET_DE_ID);
      if (existing !== "" && existing !== undefined) {
        changeDataValue(currentEvent.event, TARGET_DE_ID, "");
      }
    }
    // Re-run when trigger or target changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentEvent?.event,
    triggerHasValue,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) => [TRIGGER_DE_ID, TARGET_DE_ID].includes(d.dataElement))
        .map((d) => [d.dataElement, d.value])
    )
  ]);

  // Always keep NEXT_VISIT_ID = eventDate + 1 month (clear if no eventDate)
  useEffect(() => {
    const evtStr = currentEvent?.eventDate;
    if (!currentEvent?.event) return;

    if (!evtStr) {
      changeDataValue?.(currentEvent.event, NEXT_VISIT_ID, "");
      return;
    }
    const evt = new Date(evtStr);
    if (!Number.isNaN(evt.getTime())) {
      const nextMonth = addMonths(evt, 1);
      const dhisDate = format(nextMonth, "yyyy-MM-dd");
      changeDataValue?.(currentEvent.event, NEXT_VISIT_ID, dhisDate);
    }
  }, [currentEvent?.event, currentEvent?.eventDate, changeDataValue]);

  // Calendar-accurate age autofill: years → months → weeks/days
  useEffect(() => {
    const evtStr = currentEvent?.eventDate;
    const dobStr = currentTei?.attributes?.find(
      (a) => a.attribute === DOB_ATTR_ID
    )?.value;

    if (!currentEvent?.event) return;

    // If either is missing, clear all age fields
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
      // Future DOB vs event or invalid dates → zero
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

    // 3) Remaining days
    const remDays = differenceInDays(eventDate, dobPlusYearsMonths);

    // 4) Split remaining days into weeks + days
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
    // re-run when DOB changes
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value,
    changeDataValue
  ]);

  return (
    <div id="ecd-container" className="eir-growth-monitor-form">
      <EventDateLabel type="eventDate" />
      <EventDateFieldNoBlur type="eventDate" />
      <br />
      {programStageSections.map((pss) => {
        const sectionDeConfigs = pss.dataElements
          // hide TARGET unless trigger has value
          .filter((de) => triggerHasValue || de.id !== TARGET_DE_ID)
          .map((de) => [{ id: de.id }]);

        return (
          <TrackerTableSection
            key={pss.id}
            dataElementConfigs={sectionDeConfigs}
            sectionTitle={pss.displayName}
            sx={{ border: "2px solid #CFD8DC", marginBottom: "15px" }}
          />
        );
      })}
    </div>
  );
};

export default Ecd;
