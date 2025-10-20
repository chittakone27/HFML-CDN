import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { DATA_ELEMENTS, ANC_PROGRAM_STAGE } from "./ancConst";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { add, sub, format, differenceInCalendarWeeks } from "date-fns";
import { findAttributeValue, findDataValue } from "@/configs/laotracker/common/utils";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import usePreviousEvents from "@/configs/laotracker/layout/ChrTrackerLayout/eventForms/usePreviousEvents";
import useMetadataStore from "@/state/metadata";
import { pickTranslation } from "@/utils/utils";

const {
  DIASTOLIC_BLOOD_PRESSURE,
  SYSTOLIC_BLOOD_PRESSURE,
  HIGH_BLOOD_PRESSURE,
  GESTATIONAL_WEEK,
  FUNDUAL_HEIGHT,
  FETUS_HEART_RATE,
  GESTATIONAL_AGE_1ST_VISIT,
  FETUS_POSITION,
  MEDICATION_FOR_HIGH_RISK_WOMEN,
  MEDICATION_FOR_HIGH_RISK_WOMEN_OTHERS,
  TRANSFERRED_TO_HIGHER_FACILITY,
  REASON_FOR_REFERRAL,
  REFERRED_TO,
  ANC_VISIT_AT_36_WEEKS_ABOVE,
  NUMBER_OF_ANC_VISIT,
  HEIGHT,
  COMPLETED_ANC_4TH,
  LMP_DATE,
  REMEMBER_LMP_DATE,
  ESTIMATED_DUE_DATE,
  WEIGHT_BEFORE_PREGNANT,
  BMI,
  BLOOD_SUGAR_TEST,
  RESULT_OF_BLOOD_SUGAR_TEST,
  HEMOGLOBIN_TEST,
  RESULT_OF_HEMOGLOBIN_TEST,
  HIV_SCREENING_TEST,
  HIV_SCREENING_TEST_RESULT,
  SYPHILIS,
  RESULT_SYPHILIS,
  HEPATITIS_B,
  RESULT_HEPATITIS_B,
  G,
  P,
  A,
  L,
  NEXT_APPOINTMENT_DATE,
  MCH_BOOK_NUMBER,
  MCH_BOOK_NUMBER_ATTRIBUTE,
  IFA_TABLETS_RECEIVED,
  NUMBER_OF_DISTRIBUTION_IFA
} = DATA_ELEMENTS;

const useAncRules = () => {
  const [disabledFields, setDisabledFields] = useState([]);
  const [helpers, setHelpers] = useState({});
  const [hiddenFields, setHiddenFields] = useState([]);
  const { t, i18n } = useTranslation();
  const { dataElements } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements
    }))
  );
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { event, chrTrackerActions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      chrTrackerActions: state.actions
    }))
  );
  const { currentEvents, currentTei } = data;
  const { changeDataValue, changeDataValues, setEvent } = chrTrackerActions;
  const { currentEvent, order } = event;
  const [props, setProps] = useState({});

  const dataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  const previousEvents = usePreviousEvents(ANC_PROGRAM_STAGE, currentEvent);

  useEffect(() => {
    const currentProps = {};
    const assignations = [];
    const currentDisabledFields = [HIGH_BLOOD_PRESSURE, MCH_BOOK_NUMBER, BMI, COMPLETED_ANC_4TH, ANC_VISIT_AT_36_WEEKS_ABOVE];
    const currentHiddenFields = [];
    const currentHelpers = {};
    //DISABLE MCH BOOK NUMBER AND COPY VALUE FROM TEI ATTRIBUTE
    if (!dataValues[MCH_BOOK_NUMBER]) {
      const foundMchBookNumberAttribute = findAttributeValue(currentTei, MCH_BOOK_NUMBER_ATTRIBUTE);
      assignations.push({ dataElement: MCH_BOOK_NUMBER, value: foundMchBookNumberAttribute });
    }

    //CHECK HIGH BLOOD PRESSURE IF SYSTOLIC > 139 OR DIASTOLIC > 89
    if (dataValues[SYSTOLIC_BLOOD_PRESSURE] && dataValues[DIASTOLIC_BLOOD_PRESSURE]) {
      const systolic = parseInt(dataValues[SYSTOLIC_BLOOD_PRESSURE]);
      const diastolic = parseInt(dataValues[DIASTOLIC_BLOOD_PRESSURE]);
      if (systolic > 139 || diastolic > 89) {
        assignations.push({ dataElement: HIGH_BLOOD_PRESSURE, value: "true" });
      } else {
        assignations.push({ dataElement: HIGH_BLOOD_PRESSURE, value: "" });
      }
    } else {
      assignations.push({ dataElement: HIGH_BLOOD_PRESSURE, value: "" });
    }

    //CALCULATE BMI
    if (dataValues[HEIGHT] && dataValues[WEIGHT_BEFORE_PREGNANT]) {
      const heightInMeters = parseFloat(dataValues[HEIGHT]) / 100;
      const weight = parseFloat(dataValues[WEIGHT_BEFORE_PREGNANT]);
      const bmi = weight / (heightInMeters * heightInMeters);
      assignations.push({ dataElement: BMI, value: bmi.toFixed(2) });
    } else {
      assignations.push({ dataElement: BMI, value: "" });
    }

    //KEEP HEIGHT, WEIGHT, BMI VALUES FROM FIRST VISIT
    if (dataValues[NUMBER_OF_ANC_VISIT] !== "1") {
      const foundFirstVisit = currentEvents.find((ce) => {
        return ce.dataValues.find((dv) => dv.dataElement === NUMBER_OF_ANC_VISIT && dv.value === "1");
      });
      if (foundFirstVisit) {
        const firstVisitHeight = findDataValue(foundFirstVisit.dataValues, HEIGHT);
        const firstVisitWeight = findDataValue(foundFirstVisit.dataValues, WEIGHT_BEFORE_PREGNANT);
        const firstVisitBmi = findDataValue(foundFirstVisit.dataValues, BMI);
        if (firstVisitHeight) assignations.push({ dataElement: HEIGHT, value: firstVisitHeight });
        if (firstVisitWeight) assignations.push({ dataElement: WEIGHT_BEFORE_PREGNANT, value: firstVisitWeight });
        if (firstVisitBmi) assignations.push({ dataElement: BMI, value: firstVisitBmi });
      }
    }

    //AUTO ASSIGN G, P, A, L BASED ON PREVIOUS EVENT
    const previousEvent = previousEvents[0];
    if (previousEvent) {
      const previousG = findDataValue(previousEvent.dataValues, G);
      const previousP = findDataValue(previousEvent.dataValues, P);
      const previousA = findDataValue(previousEvent.dataValues, A);
      const previousL = findDataValue(previousEvent.dataValues, L);
      if (previousG && !dataValues[G]) assignations.push({ dataElement: G, value: previousG });
      if (previousP && !dataValues[P]) assignations.push({ dataElement: P, value: previousP });
      if (previousA && !dataValues[A]) assignations.push({ dataElement: A, value: previousA });
      if (previousL && !dataValues[L]) assignations.push({ dataElement: L, value: previousL });
    }

    //HIDE RESULT OF BLOOD SUGAR TEST IF BLOOD SUGAR TEST IS NOT DONE
    if (dataValues[BLOOD_SUGAR_TEST] !== "true") {
      currentHiddenFields.push(RESULT_OF_BLOOD_SUGAR_TEST);
      assignations.push({ dataElement: RESULT_OF_BLOOD_SUGAR_TEST, value: "" });
    }

    //HIDE RESULT OF HEMOGLOBIN TEST IF HEMOGLOBIN TEST IS NOT DONE
    if (dataValues[HEMOGLOBIN_TEST] !== "true") {
      currentHiddenFields.push(RESULT_OF_HEMOGLOBIN_TEST);
      assignations.push({ dataElement: RESULT_OF_HEMOGLOBIN_TEST, value: "" });
    }

    //HIDE RESULT OF HIV TEST IF HIV TEST IS NOT DONE
    if (dataValues[HIV_SCREENING_TEST] !== "true") {
      currentHiddenFields.push(HIV_SCREENING_TEST_RESULT);
      assignations.push({ dataElement: HIV_SCREENING_TEST_RESULT, value: "" });
    }

    //HIDE RESULT OF SYPHILIS TEST IF SYPHILIS TEST IS NOT DONE
    if (dataValues[SYPHILIS] !== "true") {
      currentHiddenFields.push(RESULT_SYPHILIS);
      assignations.push({ dataElement: RESULT_SYPHILIS, value: "" });
    }

    //HIDE RESULT OF HEPATITIS B TEST IF HEPATITIS B TEST IS NOT DONE
    if (dataValues[HEPATITIS_B] !== "true") {
      currentHiddenFields.push(RESULT_HEPATITIS_B);
      assignations.push({ dataElement: RESULT_HEPATITIS_B, value: "" });
    }

    //HIDE NUMBER OF DISTRIBUTION IF NOT RECEIVED IFA TABLETS
    if (dataValues[IFA_TABLETS_RECEIVED] !== "true") {
      currentHiddenFields.push(NUMBER_OF_DISTRIBUTION_IFA);
      assignations.push({ dataElement: NUMBER_OF_DISTRIBUTION_IFA, value: "" });
    }

    //SET 4TH ANC AUTOMATICALLY
    if (dataValues[NUMBER_OF_ANC_VISIT] === "4") {
      assignations.push({ dataElement: COMPLETED_ANC_4TH, value: "true" });
    } else {
      assignations.push({ dataElement: COMPLETED_ANC_4TH, value: "" });
    }

    //MAKE NEXT APPOINTMENT DATE TO BE MANDATORY IF CURRENT ANC VISIT IS < 4TH VISIT
    if (dataValues[NUMBER_OF_ANC_VISIT] && parseInt(dataValues[NUMBER_OF_ANC_VISIT]) < 4) {
      if (!dataValues[NEXT_APPOINTMENT_DATE]) {
        currentHelpers[NEXT_APPOINTMENT_DATE] = [{ type: "ERROR", value: t("thisFieldIsRequired") }];
      }
    }

    //MAKE MAX FUTURE DATE FOR NEXT APPOINTMENT DATE TO BE 3 MONTHS FROM EVENT DATE
    if (currentEvent["eventDate"]) {
      currentProps[NEXT_APPOINTMENT_DATE] = {
        maxDate: add(new Date(currentEvent["eventDate"]), { months: 3 })
      };
    }

    //SET ANC VISIT AT 36 WEEKS ABOVE IF GESTATIONAL WEEK IS > 36
    if (dataValues[GESTATIONAL_WEEK]) {
      const gestationalWeek = parseInt(dataValues[GESTATIONAL_WEEK]);
      if (gestationalWeek > 36) {
        assignations.push({ dataElement: ANC_VISIT_AT_36_WEEKS_ABOVE, value: "true" });
      }
    }

    changeDataValues(assignations);
    setHiddenFields([...currentHiddenFields]);
    setDisabledFields([...currentDisabledFields]);
    setHelpers({ ...currentHelpers });
    setProps({ ...currentProps });
    const currentErrors = [];
    Object.keys(currentHelpers).forEach((key) => {
      const foundIndex = order.findIndex((o) => o === key);
      const foundErrors = currentHelpers[key].filter((h) => h.type === "ERROR");
      if (foundErrors.length > 0) {
        const foundItem = dataElements.find((de) => de.id === key);
        currentErrors.push(foundIndex + 1 + ". " + pickTranslation(foundItem, i18n.language, "formName"));
      }
    });
    setEvent("formErrors", currentErrors);
  }, [JSON.stringify(currentEvent), JSON.stringify(currentEvents)]);

  return {
    disabledFields,
    hiddenFields,
    helpers,
    props
  };
};
export default useAncRules;
