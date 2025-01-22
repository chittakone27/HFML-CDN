import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { DATA_ELEMENTS } from "./const";
import { useShallow } from "zustand/react/shallow";
import usePreviousEvents from "@/configs/laotracker/common/usePreviousEvents";
import { findDataValue } from "@/configs/laotracker/common/utils";
import { format, add } from "date-fns";
const {
  SERVICES_TYPE,
  DIASTOLIC_BLOOD_PRESSURE,
  SYSTOLIC_BLOOD_PRESSURE,
  HIGH_BLOOD_PRESSURE,
  PNC_VISIT_NUMBER,
  PNC1_WITHIN_24HRS,
  PNC2_WITHIN_2_3DAYS,
  PNC3_WITHIN_7_14DAYS,
  PNC_IN_6WEEKS,
  MOTHER_CONDITION,
  ABNORMAL_MOTHER_CONDITION,
  BABY_CONDITION,
  ABNORMAL_BABY_CONDITION,
  EXCLUSIVE_BREASTFEEDING,
  REASON_NOT_BREASTFEEDING,
  WHAT_TO_FEED_BABY,
  RECEIVED_IFA_TABLETS,
  HOW_MANY_IFA_TABLETS,
  RECEIVED_VITAMIN_B1,
  HOW_MANY_VITAMIN_B1_TABLETS,
  NEXT_APPOINTMENT_DATE
} = DATA_ELEMENTS;
const usePncRules = () => {
  const [disabledFields, setDisabledFields] = useState([SERVICES_TYPE, HIGH_BLOOD_PRESSURE]);
  const [hiddenFields, setHiddenFields] = useState([]);
  const [props, setProps] = useState({});
  const previousPncEvents = usePreviousEvents("huYWjrG6A1C");
  const { currentEvent } = useCurrentEvent();

  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvents } = data;
  const { changeDataValue } = actions;
  const dataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  useEffect(() => {
    let currentProps = {};
    let currentDisabledFields = [...disabledFields];
    let currentHiddenFields = [...hiddenFields];
    ///////////////////////////////////////////////////////////////////////////////////
    //Automatically set Service Type taken from ANC program stage
    const foundEvent = currentEvents.find((ce) => {
      const foundPs = ce.programStage === "IZ9GXqMAZV8";
      const foundServiceType = ce.dataValues.find((dv) => dv.dataElement === SERVICES_TYPE && dv.value);
      return foundPs && foundServiceType;
    });
    if (foundEvent) {
      const foundServiceType = foundEvent.dataValues.find((dv) => dv.dataElement === SERVICES_TYPE);
      changeDataValue(currentEvent.event, SERVICES_TYPE, foundServiceType.value);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //HIDE PNC2_WITHIN_2_3DAYS IF PNC VISIT NUMBER = 1
    //HIDE PNC3_WITHIN_7_14DAYS IF PNC VISIT NUMBER = 1 or 2
    //HIDE PNC_IN_6WEEKS IF PNC VISIT NUMBER > 6
    console.log(dataValues[PNC_VISIT_NUMBER] === "2");
    if (dataValues[PNC_VISIT_NUMBER] === "1") {
      currentHiddenFields.push(PNC2_WITHIN_2_3DAYS);
      currentHiddenFields.push(PNC3_WITHIN_7_14DAYS);
    } else {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== PNC2_WITHIN_2_3DAYS);
      currentHiddenFields = currentHiddenFields.filter((f) => f !== PNC3_WITHIN_7_14DAYS);
    }
    if (dataValues[PNC_VISIT_NUMBER] === "2") {
      currentHiddenFields.push(PNC3_WITHIN_7_14DAYS);
    } else {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== PNC3_WITHIN_7_14DAYS);
    }
    if (dataValues[PNC_VISIT_NUMBER] && parseInt(dataValues[PNC_VISIT_NUMBER]) > 6) {
      currentHiddenFields.push(PNC_IN_6WEEKS);
    } else {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== PNC_IN_6WEEKS);
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //Set high blood pressure = "true" if systoloc > 140 or diastolic > 90
    const diastolicBloodPressure = dataValues[DIASTOLIC_BLOOD_PRESSURE] ? parseInt(dataValues[DIASTOLIC_BLOOD_PRESSURE]) : null;
    const systolicBloodPressure = dataValues[SYSTOLIC_BLOOD_PRESSURE] ? parseInt(dataValues[SYSTOLIC_BLOOD_PRESSURE]) : null;
    if (diastolicBloodPressure || systolicBloodPressure) {
      if (diastolicBloodPressure > 90 || systolicBloodPressure > 140) {
        changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "true");
      } else {
        changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "");
      }
    } else {
      changeDataValue(currentEvent.event, HIGH_BLOOD_PRESSURE, "");
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //HIDE mother or baby abnormal condition if condition = normal
    if (dataValues[MOTHER_CONDITION] === "Abnormal") {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== ABNORMAL_MOTHER_CONDITION);
    } else {
      currentHiddenFields.push(ABNORMAL_MOTHER_CONDITION);
      changeDataValue(currentEvent.event, ABNORMAL_MOTHER_CONDITION, "");
    }
    if (dataValues[BABY_CONDITION] === "Abnormal") {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== ABNORMAL_BABY_CONDITION);
    } else {
      currentHiddenFields.push(ABNORMAL_BABY_CONDITION);
      changeDataValue(currentEvent.event, ABNORMAL_BABY_CONDITION, "");
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //HIDE Breastfeeding section if breastfeeding = false
    if (dataValues[EXCLUSIVE_BREASTFEEDING] === "false") {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== REASON_NOT_BREASTFEEDING);
      currentHiddenFields = currentHiddenFields.filter((f) => f !== WHAT_TO_FEED_BABY);
    } else {
      currentHiddenFields.push(REASON_NOT_BREASTFEEDING);
      currentHiddenFields.push(WHAT_TO_FEED_BABY);
      changeDataValue(currentEvent.event, REASON_NOT_BREASTFEEDING, "");
      changeDataValue(currentEvent.event, WHAT_TO_FEED_BABY, "");
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //HIDE IFA section if received = false
    if (dataValues[RECEIVED_IFA_TABLETS] === "true" || dataValues[RECEIVED_IFA_TABLETS] === "false") {
      currentDisabledFields.push(RECEIVED_IFA_TABLETS);
      currentHiddenFields = currentHiddenFields.filter((f) => f !== HOW_MANY_IFA_TABLETS);
    } else {
      currentHiddenFields.push(HOW_MANY_IFA_TABLETS);
      currentDisabledFields = currentDisabledFields.filter((cdf) => cdf !== RECEIVED_IFA_TABLETS);
      changeDataValue(currentEvent.event, HOW_MANY_IFA_TABLETS, "");
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //HIDE Vitamin B1 section if received = false
    if (dataValues[RECEIVED_VITAMIN_B1] === "true") {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== HOW_MANY_VITAMIN_B1_TABLETS);
    } else {
      currentHiddenFields.push(HOW_MANY_VITAMIN_B1_TABLETS);
      changeDataValue(currentEvent.event, HOW_MANY_VITAMIN_B1_TABLETS, "");
    }

    //IF PNC VISIT = 1 THEN SHOW RECEIVING PNC1 WITHIN 24 HRS
    if (dataValues[PNC_VISIT_NUMBER] !== "1") {
      currentHiddenFields.push(PNC1_WITHIN_24HRS);
      changeDataValue(currentEvent.event, PNC1_WITHIN_24HRS, "");
    } else {
      currentHiddenFields = currentHiddenFields.filter((f) => f !== PNC1_WITHIN_24HRS);
    }

    //
    const currentEventDate = currentEvent && currentEvent.eventDate ? new Date(currentEvent.eventDate) : new Date();
    currentProps[NEXT_APPOINTMENT_DATE] = {
      maxDate: format(add(currentEventDate, { days: 90 }), "yyyy-MM-dd")
    };
    setProps({ ...currentProps });
    setHiddenFields([...currentHiddenFields]);
    setDisabledFields([...currentDisabledFields]);
  }, [JSON.stringify(currentEvent)]);

  useEffect(() => {
    if (previousPncEvents.length > 0) {
      const foundReceivedIFA = findDataValue(previousPncEvents[0].dataValues, RECEIVED_IFA_TABLETS);
      changeDataValue(currentEvent.event, RECEIVED_IFA_TABLETS, foundReceivedIFA);
    }
  }, [currentEvent ? currentEvent.event : ""]);

  return {
    disabledFields,
    hiddenFields,
    props
  };
};
export default usePncRules;
