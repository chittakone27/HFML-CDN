import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { DATA_ELEMENTS } from "./const";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { add, sub, format, differenceInCalendarWeeks } from "date-fns";
import { findDataValue } from "@/configs/laotracker/common/utils";
import _ from "lodash";
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
  GDM,
  DIAGNOSIS_OF_GDM,
  HEMOGLOBIN_TEST,
  RESULT_OF_HEMOGLOBIN_TEST,
  HIV_TEST1,
  RESULT_HIV_TEST1,
  HIV_TEST2,
  RESULT_HIV_TEST2,
  SYPHILIS,
  RESULT_SYPHILIS,
  HEPATITIS_B,
  RESULT_HEPATITIS_B,
  G,
  P,
  A,
  L,
  NEXT_APPOINTMENT_DATE
} = DATA_ELEMENTS;

const findGPAL = (events) => {
  const GPAL = {
    [G]: "",
    [P]: "",
    [A]: "",
    [L]: ""
  };
  _.sortBy(events, "eventDate").forEach((ev) => {
    const foundG = findDataValue(ev.dataValues, G);
    const foundP = findDataValue(ev.dataValues, P);
    const foundA = findDataValue(ev.dataValues, A);
    const foundL = findDataValue(ev.dataValues, L);
    if (foundG) {
      GPAL[G] = foundG;
    }
    if (foundP) {
      GPAL[P] = foundP;
    }
    if (foundA) {
      GPAL[A] = foundA;
    }
    if (foundL) {
      GPAL[L] = foundL;
    }
  });
  return GPAL;
};

const useAncRules = () => {
  const [disabledFields, setDisabledFields] = useState([
    HIGH_BLOOD_PRESSURE,
    ANC_VISIT_AT_36_WEEKS_ABOVE,
    COMPLETED_ANC_4TH,
    LMP_DATE,
    ESTIMATED_DUE_DATE,
    BMI
  ]);

  const [helpers, setHelpers] = useState({});
  const [hiddenFields, setHiddenFields] = useState([]);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvents } = data;
  const { changeDataValue } = actions;
  const { currentEvent } = useCurrentEvent();
  const [props, setProps] = useState({});
  const dataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  useEffect(() => {
    let currentProps = {};
    let currentHelpers = {};
    let currentDisabledFields = [...disabledFields];
    let currentHiddenFields = [...hiddenFields];
    //Set high blood pressure = "true" if systoloc > 140 or diastolic > 90
    const diastolicBloodPressure = dataValues[DIASTOLIC_BLOOD_PRESSURE] ? parseInt(dataValues[DIASTOLIC_BLOOD_PRESSURE]) : null;
    const systolicBloodPressure = dataValues[SYSTOLIC_BLOOD_PRESSURE] ? parseInt(dataValues[SYSTOLIC_BLOOD_PRESSURE]) : null;
    if (diastolicBloodPressure || systolicBloodPressure) {
      if (diastolicBloodPressure > 89 || systolicBloodPressure > 139) {
        changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "true");
      } else {
        changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "");
      }
    } else {
      changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "");
    }
    ////////////////////////////////////////////////////////////////////
    //Hide fundual height and fetus heart rate if gestational week < 20
    if (dataValues[GESTATIONAL_WEEK] && parseInt(dataValues[GESTATIONAL_WEEK]) < 20) {
      currentHiddenFields = [...currentHiddenFields, FUNDUAL_HEIGHT, FETUS_HEART_RATE];
      changeDataValue(currentEvent.event, FUNDUAL_HEIGHT, "");
      changeDataValue(currentEvent.event, FETUS_HEART_RATE, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((field) => field !== FUNDUAL_HEIGHT && field !== FETUS_HEART_RATE);
    }
    //Show fetus position if Gestational age in ANC 1st 1st > 24 weeks
    //Set ANC visit at 36 weeks above if Gestational age in ANC 1st > 36
    if (!dataValues[GESTATIONAL_AGE_1ST_VISIT] || parseInt(dataValues[GESTATIONAL_AGE_1ST_VISIT]) <= 24) {
      currentHiddenFields = [...currentHiddenFields, FETUS_POSITION];
      changeDataValue(currentEvent.event, FETUS_POSITION, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((field) => field !== FETUS_POSITION);
    }
    if (dataValues[GESTATIONAL_AGE_1ST_VISIT] && parseInt(dataValues[GESTATIONAL_AGE_1ST_VISIT]) > 36) {
      changeDataValue(currentEvent.event, ANC_VISIT_AT_36_WEEKS_ABOVE, "true");
    } else {
      changeDataValue(currentEvent.event, ANC_VISIT_AT_36_WEEKS_ABOVE, "");
    }
    ////////////////////////////////////////////////////////////////////
    //Hide medication for high-risk women other if Others is not selected
    if (dataValues[MEDICATION_FOR_HIGH_RISK_WOMEN] !== "Others") {
      currentHiddenFields = [...currentHiddenFields, MEDICATION_FOR_HIGH_RISK_WOMEN_OTHERS];
      changeDataValue(currentEvent.event, MEDICATION_FOR_HIGH_RISK_WOMEN_OTHERS, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((field) => field !== MEDICATION_FOR_HIGH_RISK_WOMEN_OTHERS);
    }
    ////////////////////////////////////////////////////////////////////
    //Hide referral data elements if transferred is false
    if (dataValues[TRANSFERRED_TO_HIGHER_FACILITY] !== "true") {
      currentHiddenFields = [...currentHiddenFields, REASON_FOR_REFERRAL, REFERRED_TO];
      changeDataValue(currentEvent.event, REASON_FOR_REFERRAL, "");
      changeDataValue(currentEvent.event, REFERRED_TO, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((field) => field !== REASON_FOR_REFERRAL && field !== REFERRED_TO);
    }
    ////////////////////////////////////////////////////////////////////
    //Disable height if number of anc visit !== 1
    //Put height automatically if there is one event with number of anc visit = 1 and height was available
    //Update 13/02/2025: Disable this logic
    // if (dataValues[NUMBER_OF_ANC_VISIT] !== "1") {
    //   const foundEvent = currentEvents.find((ce) => {
    //     const foundFirstVisit = ce.dataValues.find((dv) => dv.dataElement === NUMBER_OF_ANC_VISIT && dv.value === "1");
    //     const foundHeight = ce.dataValues.find((dv) => dv.dataElement === HEIGHT && dv.value);
    //     const foundWeight = ce.dataValues.find((dv) => dv.dataElement === WEIGHT_BEFORE_PREGNANT && dv.value);
    //     return foundFirstVisit && foundHeight && foundWeight;
    //   });
    //   currentDisabledFields = [...currentDisabledFields, HEIGHT, WEIGHT_BEFORE_PREGNANT];
    //   if (foundEvent) {
    //     const foundHeight = foundEvent.dataValues.find((dv) => dv.dataElement === HEIGHT);
    //     const foundWeight = foundEvent.dataValues.find((dv) => dv.dataElement === WEIGHT_BEFORE_PREGNANT);
    //     changeDataValue(currentEvent.event, HEIGHT, foundHeight.value);
    //     changeDataValue(currentEvent.event, WEIGHT_BEFORE_PREGNANT, foundWeight.value);
    //   }
    // } else {
    //   currentDisabledFields = currentDisabledFields.filter((f) => f !== HEIGHT && f !== WEIGHT_BEFORE_PREGNANT);
    // }
    ////////////////////////////////////////////////////////////////////
    //Set Completed ANC 4th = true if number of anc visit >= 4
    if (dataValues[NUMBER_OF_ANC_VISIT] && parseInt(dataValues[NUMBER_OF_ANC_VISIT]) >= 4) {
      changeDataValue(currentEvent.event, COMPLETED_ANC_4TH, "true");
    } else {
      changeDataValue(currentEvent.event, COMPLETED_ANC_4TH, "");
    }
    ////////////////////////////////////////////////////////////////////
    //If dont remember LMP date
    //  1. Let the user enter Gestational Age (Week)
    //  1. Disable LMP Date
    //  2. Calculate LMP Date and Estimated Due Date automatically
    //If remember LMP Date
    //  1. Let the user enter LMP date
    //  1. Disable Gestational Age (Week)
    //  2. Calculate Gestational Age (Week) Estimated Due Date automatically
    const eventDate = currentEvent.eventDate ? new Date(currentEvent.eventDate) : null;
    if (dataValues[REMEMBER_LMP_DATE] === "false") {
      currentDisabledFields = [...disabledFields, LMP_DATE];
      currentDisabledFields = [...currentDisabledFields.filter((f) => f !== GESTATIONAL_WEEK)];
      const week = dataValues[GESTATIONAL_WEEK] ? parseInt(dataValues[GESTATIONAL_WEEK]) : null;
      let lmpDate = "";
      if (eventDate && week) {
        lmpDate = sub(eventDate, { days: week * 7 });
        changeDataValue(currentEvent.event, LMP_DATE, format(lmpDate, "yyyy-MM-dd"));
      }
      if (lmpDate) {
        const estimatedDueDate = add(new Date(lmpDate), { days: 40 * 7 });
        changeDataValue(currentEvent.event, ESTIMATED_DUE_DATE, format(estimatedDueDate, "yyyy-MM-dd"));
      }
    } else {
      currentDisabledFields = currentDisabledFields.filter((f) => f !== LMP_DATE);
      currentDisabledFields.push(GESTATIONAL_WEEK);
      const lmpDate = dataValues[LMP_DATE] ? new Date(dataValues[LMP_DATE]) : null;
      if (eventDate && lmpDate) {
        const gestationalWeek = differenceInCalendarWeeks(eventDate, lmpDate);
        const estimatedDueDate = add(lmpDate, { days: 40 * 7 });
        changeDataValue(currentEvent.event, ESTIMATED_DUE_DATE, format(estimatedDueDate, "yyyy-MM-dd"));
        changeDataValue(currentEvent.event, GESTATIONAL_WEEK, gestationalWeek + "");
      }
    }
    ////////////////////////////////////////////////////////////////////
    //Calculate BMI based on first ANC visit, and make it fixed
    const foundEvent = currentEvents.find((ce) => {
      const foundFirstVisit = ce.dataValues.find((dv) => dv.dataElement === NUMBER_OF_ANC_VISIT && dv.value === "1");
      const foundHeight = ce.dataValues.find((dv) => dv.dataElement === HEIGHT && dv.value);
      const foundWeight = ce.dataValues.find((dv) => dv.dataElement === WEIGHT_BEFORE_PREGNANT && dv.value);
      return foundFirstVisit && foundHeight && foundWeight;
    });
    if (foundEvent && !dataValues[BMI]) {
      const foundHeight = foundEvent.dataValues.find((dv) => dv.dataElement === HEIGHT);
      const foundWeight = foundEvent.dataValues.find((dv) => dv.dataElement === WEIGHT_BEFORE_PREGNANT);
      if (foundHeight && foundWeight) {
        const height = parseInt(foundHeight.value) / 100;
        const squareOfHeight = height * height;
        const weight = parseInt(foundWeight.value);
        const bmi = weight / squareOfHeight;
        changeDataValue(currentEvent.event, BMI, bmi.toFixed(2));
      }
    }

    ////////////////////////////////////////////////////////////////////
    //IF GDM is yes then show DIAGNOSIS OF GDPM
    if (dataValues[GDM] !== "true") {
      currentHiddenFields = [...currentHiddenFields, DIAGNOSIS_OF_GDM];
      changeDataValue(currentEvent.event, DIAGNOSIS_OF_GDM, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== DIAGNOSIS_OF_GDM);
    }
    ////////////////////////////////////////////////////////////////////
    //SHOW HIDE TESTS
    if (dataValues[HEMOGLOBIN_TEST] !== "true") {
      currentHiddenFields = [...currentHiddenFields, RESULT_OF_HEMOGLOBIN_TEST];
      changeDataValue(currentEvent.event, RESULT_OF_HEMOGLOBIN_TEST, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== RESULT_OF_HEMOGLOBIN_TEST);
    }
    if (dataValues[HIV_TEST1] !== "true") {
      currentHiddenFields = [...currentHiddenFields, RESULT_HIV_TEST1];
      changeDataValue(currentEvent.event, RESULT_HIV_TEST1, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== RESULT_HIV_TEST1);
    }
    if (dataValues[HIV_TEST2] !== "true") {
      currentHiddenFields = [...currentHiddenFields, RESULT_HIV_TEST2];
      changeDataValue(currentEvent.event, RESULT_HIV_TEST2, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== RESULT_HIV_TEST2);
    }
    if (dataValues[SYPHILIS] !== "true") {
      currentHiddenFields = [...currentHiddenFields, RESULT_SYPHILIS];
      changeDataValue(currentEvent.event, RESULT_SYPHILIS, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== RESULT_SYPHILIS);
    }
    if (dataValues[HEPATITIS_B] !== "true") {
      currentHiddenFields = [...currentHiddenFields, RESULT_HEPATITIS_B];
      changeDataValue(currentEvent.event, RESULT_HEPATITIS_B, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((chf) => chf !== RESULT_HEPATITIS_B);
    }

    if (dataValues[NUMBER_OF_ANC_VISIT] && parseInt(dataValues[NUMBER_OF_ANC_VISIT]) > 1) {
      currentHelpers = {
        [HEIGHT]: [{ type: "HELPER", value: "ຂໍ້ມູນນີ້ຈະຖືກຕືມອັດຕະໂນມັດໂດຍລະບົບ" }],
        [WEIGHT_BEFORE_PREGNANT]: [{ type: "HELPER", value: "ຂໍ້ມູນນີ້ຈະຖືກຕືມອັດຕະໂນມັດໂດຍລະບົບ" }],
        [BMI]: [{ type: "HELPER", value: "ຂໍ້ມູນນີ້ຈະຖືກຕືມອັດຕະໂນມັດໂດຍລະບົບ" }]
      };
    }

    const currentEventDate = currentEvent && currentEvent.eventDate ? new Date(currentEvent.eventDate) : new Date();
    currentProps[NEXT_APPOINTMENT_DATE] = {
      maxDate: format(add(currentEventDate, { days: 90 }), "yyyy-MM-dd")
    };
    setProps({ ...currentProps });
    setHelpers({ ...currentHelpers });
    setHiddenFields([...currentHiddenFields]);
    setDisabledFields([...currentDisabledFields]);
  }, [JSON.stringify(currentEvent)]);

  useEffect(() => {
    //AUTO ASSIGN G, P, A, L
    const GPAL = findGPAL(currentEvents);
    Object.keys(GPAL).forEach((key) => {
      changeDataValue(currentEvent.event, key, GPAL[key]);
    });
  }, [currentEvent.event]);

  useEffect(() => {
    //AUTO ASSIGN G, P, A, L
    const GPAL = findGPAL(currentEvents);
    Object.keys(GPAL).forEach((key) => {
      changeDataValue(currentEvent.event, key, GPAL[key]);
    });
  }, [currentEvent.event]);

  useEffect(() => {
    currentEvents
      .filter((ce) => ce.programStage === "IZ9GXqMAZV8")
      .forEach((event) => {
        if (dataValues[G]) {
          changeDataValue(event.event, G, dataValues[G]);
        }
        if (dataValues[P]) {
          changeDataValue(event.event, P, dataValues[P]);
        }
        if (dataValues[A]) {
          changeDataValue(event.event, A, dataValues[A]);
        }
        if (dataValues[L]) {
          changeDataValue(event.event, L, dataValues[L]);
        }
      });
  }, [dataValues[G], dataValues[P], dataValues[A], dataValues[L]]);

  return {
    disabledFields,
    hiddenFields,
    helpers,
    props
  };
};
export default useAncRules;
