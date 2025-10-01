import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import TrackerTableSection from "../../common/TrackerTableSection";

import {
  addMonths,
  addYears,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  format,
} from "date-fns";

import "./index.css";

import { ECD_STAGE_ID, DOB_ATTR_ID } from "./const";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import useEcdValidation from "./rules/useEcdValidation";


const YEAR_ID = "D6GqkdzzOQE"; // years
const MONTH_ID = "BYM3zjvhI4i"; // months
const WEEK_ID = "lXHpWJigniL";  // weeks
const DAY_ID = "ajx8hlxn2Rs";   // days
const AGE_IDS = new Set([YEAR_ID, MONTH_ID, WEEK_ID, DAY_ID]);
const AGE_ORDER = [YEAR_ID, MONTH_ID, WEEK_ID, DAY_ID];


const NEXT_VISIT_ID = "vdFLgi5nGWE";


const TRIGGER_DE_ID = "O22NLnyyiN3"; // Result
const TARGET_DE_ID = "D2o1Qh6LZHh";  // Follow-up action


const SKIP_FLAG_DE = "mHvlqLhgrpC";


const SHOW_LABELS = new Set([
  "Abnormal and received stimulation",
  "Abnormal but did not receive stimulation",
  "Normal",
]);

const boolish = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "y";
};


const NO_CLICK_FP = {
  sx: { pointerEvents: "none", userSelect: "none" }, 
  inputProps: { readOnly: true, tabIndex: -1 },      
  tabIndex: -1,                                      
};

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


  const { fieldHelperProps } = useEcdValidation({
    SHOW_LABELS,
    TRIGGER_DE_ID,
    TARGET_DE_ID,
  });

  const ecdStage = program?.programStages?.find(
    (progStage) => progStage.id === ECD_STAGE_ID
  );
  const { programStageSections = [] } = ecdStage ?? {};

  const getVal = (deId) =>
    currentEvent?.dataValues?.find((d) => d.dataElement === deId)?.value ?? "";

  const triggerLabel = String(getVal(TRIGGER_DE_ID)).trim();
  const shouldShowTarget = SHOW_LABELS.has(triggerLabel);
  const isDidNotAssessed = triggerLabel === "Did not assessed";


  const skipNextVisit = boolish(getVal(SKIP_FLAG_DE));

 
  useEffect(() => {
    if (!currentEvent?.event || !changeDataValue) return;
    if (!shouldShowTarget || isDidNotAssessed) {
      const existing = getVal(TARGET_DE_ID);
      if (existing !== "") {
        changeDataValue(currentEvent.event, TARGET_DE_ID, "");
      }
    }
 
  }, [currentEvent?.event, triggerLabel, changeDataValue]);

 
  const lastEventDateRef = useRef(null);
  const lastAutoNextRef = useRef(null);
  useEffect(() => {
    if (!currentEvent?.event) return;
    const evtStr = currentEvent?.eventDate;

    if (!evtStr) {
      changeDataValue?.(currentEvent.event, NEXT_VISIT_ID, "");
      lastEventDateRef.current = null;
      lastAutoNextRef.current = null;
      return;
    }

    const evt = new Date(evtStr);
    if (Number.isNaN(evt.getTime())) return;

    const autoNext = format(addMonths(evt, 1), "yyyy-MM-dd");
    const currentNext =
      currentEvent?.dataValues?.find((d) => d.dataElement === NEXT_VISIT_ID)?.value || "";

    const eventDateChanged = lastEventDateRef.current !== evtStr;

    if (
      (eventDateChanged && (!currentNext || currentNext === lastAutoNextRef.current)) ||
      (!currentNext && !lastAutoNextRef.current)
    ) {
      changeDataValue?.(currentEvent.event, NEXT_VISIT_ID, autoNext);
    }

    lastEventDateRef.current = evtStr;
    lastAutoNextRef.current = autoNext;
  }, [currentEvent?.event, currentEvent?.eventDate, changeDataValue]);


  useEffect(() => {
    if (!currentEvent?.event) return;

    const evtStr = currentEvent?.eventDate;
    const dobStr = currentTei?.attributes?.find(
      (a) => a.attribute === DOB_ATTR_ID
    )?.value;

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
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value,
    changeDataValue,
  ]);

  useEffect(() => {
    if (!currentEvent?.event) return;

    const evtStr = currentEvent?.eventDate;
    const dobStr = currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value;
    if (!evtStr || !dobStr) return;

    const eventDate = new Date(evtStr);
    const dob = new Date(dobStr);
    const valid =
      !Number.isNaN(eventDate.getTime()) &&
      !Number.isNaN(dob.getTime()) &&
      eventDate >= dob;
    if (!valid) return;

    const years = differenceInYears(eventDate, dob);
    const dobPlusYears = addYears(dob, years);
    const months = differenceInMonths(eventDate, dobPlusYears);
    const dobPlusYearsMonths = addMonths(dobPlusYears, months);
    const remDays = differenceInDays(eventDate, dobPlusYearsMonths);
    const weeks = Math.floor(remDays / 7);
    const days = remDays % 7;

    const expected = {
      [YEAR_ID]: years,
      [MONTH_ID]: months,
      [WEEK_ID]: weeks,
      [DAY_ID]: days,
    };

    const getAgeVal = (id) =>
      currentEvent?.dataValues?.find((d) => d.dataElement === id)?.value;

    Object.entries(expected).forEach(([id, val]) => {
      const existing = getAgeVal(id);
      if (String(existing ?? "") !== String(val ?? "")) {
        changeDataValue?.(currentEvent.event, id, val);
      }
    });
  }, [
    currentEvent?.event,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) => AGE_IDS.has(d.dataElement))
        .map((d) => [d.dataElement, d.value])
    ),
    currentEvent?.eventDate,
    currentTei?.attributes?.find((a) => a.attribute === DOB_ATTR_ID)?.value,
    changeDataValue,
  ]);

  const sectionHasAgeFields = (pss) =>
    pss?.dataElements?.some((de) => AGE_IDS.has(de.id));

  return (
    <div id="ecd-container" className="eir-growth-monitor-form">
      <EventDateLabel type="eventDate" />
      <EventDateFieldNoBlur type="eventDate" />
      <br />
      {programStageSections.map((pss) => {
        const visibleDes = pss.dataElements.filter((de) => {
          const triggerOK = (shouldShowTarget || de.id !== TARGET_DE_ID);
          const nextVisitOK = !(skipNextVisit && de.id === NEXT_VISIT_ID);
          return triggerOK && nextVisitOK;
        });

        const ageIdsPresent = AGE_ORDER.filter((id) =>
          visibleDes.some((de) => de.id === id)
        );

        const ageRow =
          ageIdsPresent.length > 0
            ? [
                ageIdsPresent.map((id) => {
                  const helpers = fieldHelperProps[id] || {};
                  const mergedSx = { ...(helpers.sx || {}), ...(NO_CLICK_FP.sx || {}) };
                  return {
                    id,
                    
                    fieldProps: {
                      ...(helpers || {}),
                      ...NO_CLICK_FP,
                      disabled: true,
                      readOnly: true,
                      sx: mergedSx,
                    },
                  };
                }),
              ]
            : [];

        const otherRows = visibleDes
          .filter((de) => !AGE_IDS.has(de.id))
          .map((de) => [
            {
              id: de.id,
              fieldProps: {
                ...(fieldHelperProps[de.id] || {}),
              },
            },
          ]);

        return (
          <TrackerTableSection
            key={pss.id}
            dataElementConfigs={[...ageRow, ...otherRows]}
            sectionTitle={pss.displayName}
            sx={{ border: "2px solid #CFD8DC", marginBottom: "15px" }}
          />
        );
      })}
    </div>
  );
};

export default Ecd;
