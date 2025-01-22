import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useEffect, useState } from "react";
import { calculateAge } from "../../common/utils";
import { useShallow } from "zustand/react/shallow";
import { format, differenceInWeeks, differenceInDays } from "date-fns";
import { DELIVERY_DETAILS_DATA_ELEMENTS, ATTRIBUTES } from "./const";

const { LMP_DATE, WOMEN_AGE_GROUP, GESTATIONAL_WEEKS, SYSTOLIC, DIASTOLIC } = DELIVERY_DETAILS_DATA_ELEMENTS;
const { AGE, SEX } = ATTRIBUTES;

const useDeliveryDetailsRules = () => {
  const [props, setProps] = useState({
    [WOMEN_AGE_GROUP]: {
      disabled: true
    },
    [GESTATIONAL_WEEKS]: {
      disabled: true
    },
    [SYSTOLIC]: {},
    [LMP_DATE]: {}
  });

  const { data, actions } = useTrackerCaptureStore(useShallow((state) => ({ data: state.data, actions: state.actions })));
  const { currentTei, currentEnrollment } = data;
  const { currentEvent } = useCurrentEvent();
  let dataValues = {};
  let attributes = {};

  if (currentEvent) {
    dataValues = currentEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }

  if (currentTei) {
    attributes = currentTei.reduce((prev, current) => {
      prev[current.attribute] = current.value;
      return prev;
    }, {});
  }

  //ASSIGN WOMEN AGE GROUP AUTOMATICALLY
  useEffect(() => {
    if (currentEvent && currentEvent.eventDate && attributes[AGE]) {
      const { years } = calculateAge(attributes[AGE], currentEvent.eventDate);
      if (years < 15) {
        actions.changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "<15yrs");
      } else if (years >= 15 && years <= 19) {
        actions.changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "15-19yrs");
      } else if (years >= 20 && years <= 24) {
        actions.changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "20-24yrs");
      } else if (years >= 25) {
        actions.changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, ">25yrs");
      } else {
        actions.changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "");
      }
    }
  }, [currentEvent ? currentEvent.eventDate : null, attributes[AGE]]);

  //LMP Date : Date : Cant be future date
  //Date of admission and LMP Date should be less than 300 days
  //LMP Date should be greater than date of admission >35 weeks
  useEffect(() => {
    if (currentEvent && currentEvent.eventDate && dataValues[LMP_DATE]) {
      const weeksDiff = differenceInWeeks(new Date(currentEvent.eventDate), new Date(dataValues[LMP_DATE]));
      const daysDiff = differenceInDays(new Date(currentEvent.eventDate), new Date(dataValues[LMP_DATE]));
      if (daysDiff >= 300 || weeksDiff <= 35) {
        setProps({
          ...props,
          [LMP_DATE]: {
            helpers: [
              {
                type: "ERROR",
                value: "Days between LMP Date and Date of Admission must be < 300 days"
              },
              {
                type: "ERROR",
                value: "Weeks between LMP Date and Date of Admission must be > 35 weeks"
              }
            ]
          }
        });
      } else {
        setProps({
          ...props,
          [LMP_DATE]: {
            helpers: []
          }
        });
        actions.changeDataValue(currentEvent.event, GESTATIONAL_WEEKS, weeksDiff + "");
      }
    }
  }, [currentEvent ? currentEvent.eventDate : null, dataValues[LMP_DATE]]);

  //Systolic must be greater than Diastolic
  useEffect(() => {
    if (dataValues[SYSTOLIC] && dataValues[DIASTOLIC]) {
      if (parseInt(dataValues[SYSTOLIC]) <= parseInt(dataValues[DIASTOLIC])) {
        setProps({
          ...props,
          [SYSTOLIC]: {
            helpers: [
              {
                type: "ERROR",
                value: "Systolic value must be greater then Diastolic value"
              }
            ]
          }
        });
      } else {
        setProps({
          ...props,
          [SYSTOLIC]: {
            helpers: []
          }
        });
      }
    }
  }, [dataValues[SYSTOLIC], dataValues[DIASTOLIC]]);

  return props;
};

const useProfileRules = () => {
  const [props, setProps] = useState({
    [SEX]: {
      disabled: true
    }
  });
  const { data, actions } = useTrackerCaptureStore(useShallow((state) => ({ data: state.data, actions: state.actions })));
  const { currentTei, currentEnrollment } = data;
  let attributes = {};

  if (currentTei) {
    attributes = currentTei.reduce((prev, current) => {
      prev[current.attribute] = current.value;
      return prev;
    }, {});
  }

  //ASSIGN SEX FEMALE AUTOMATICALLY
  useEffect(() => {
    try {
      actions.changeAttributeValue(SEX, "F");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return props;
};

export { useDeliveryDetailsRules, useProfileRules };
