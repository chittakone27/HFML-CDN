import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import useMetadataStore from "@/state/metadata";
import { pickTranslation } from "@/utils/utils";
import { DATA_ELEMENTS } from "./familyPlanningConst";
import { findAttributeValue } from "@/configs/laotracker/common/utils";
import { calculateAge } from "@/configs/laotracker/program-forms/common/utils";
import { add } from "date-fns";
const {
  FAMILY_PLANNING_VISIT_NUMBER,
  SERVICE_ADOPTION_AT,
  COMPLETED_IFA_90_TABLETS,
  EMERGENCY_PILLS,
  USER_TYPE,
  SERVICE_OPTED,
  AGE_GROUP,
  SERVICE_REMOVED,
  REASON_FOR_SERVICE_REMOVED,
  OTHER_REASON_FOR_REMOVAL,
  NUMBER_OF_DISTRIBUTION,
  NEXT_APPOINTMENT_DATE
} = DATA_ELEMENTS;

const useFamilyPlanningRules = () => {
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

  // const previousEvents = usePreviousEvents(ANC_PROGRAM_STAGE, currentEvent);

  useEffect(() => {
    const assignations = [];
    const currentDisabledFields = [];
    const currentHiddenFields = [];
    const currentHelpers = {};
    const currentProps = {};
    const foundDob = findAttributeValue(currentTei, "tQeFLjYbqzv"); //Date of Birth
    const foundSex = findAttributeValue(currentTei, "DmuazFb368B");
    const age = calculateAge(foundDob, currentEvent.eventDate);

    //HIDE SERVICE ADOPTION AT IF VISIT NUMBER IS NOT 1
    if (dataValues[FAMILY_PLANNING_VISIT_NUMBER] !== "1") {
      currentHiddenFields.push(SERVICE_ADOPTION_AT);
      assignations.push({ dataElement: SERVICE_ADOPTION_AT, value: "" });
    }

    //HIDE SERVICE ADOPTION AT TO BE MANDATORY IF VISIT NUMBER IS 1
    if (dataValues[FAMILY_PLANNING_VISIT_NUMBER] === "1") {
      if (!dataValues[SERVICE_ADOPTION_AT]) {
        currentHelpers[SERVICE_ADOPTION_AT] = [{ type: "ERROR", value: t("thisFieldIsRequired") }];
      }
    }

    //HIDE USER TYPE AND SERVICE OPTED IF EMERGENCY PILLS IS TICKED
    if (dataValues[EMERGENCY_PILLS] === "true") {
      currentHiddenFields.push(USER_TYPE);
      currentHiddenFields.push(SERVICE_OPTED);
      assignations.push({ dataElement: USER_TYPE, value: "" });
      assignations.push({ dataElement: SERVICE_OPTED, value: "" });
    }

    //HIDE COMPLETED IFA 90 TABLETS IF CLIENT IS A WOMAN AND < 25 YEARS OLD
    if (foundSex === "F" && age.years < 25) {
      currentHiddenFields.push(COMPLETED_IFA_90_TABLETS);
      assignations.push({ dataElement: COMPLETED_IFA_90_TABLETS, value: "" });
    }

    //ASSIGN AGE GROUP AUTOMATICALLY IF NOT AVAILABLE
    if (age && !dataValues[AGE_GROUP]) {
      const { years } = age;
      if (years < 15) {
        assignations.push({ dataElement: AGE_GROUP, value: "<15yrs" });
      } else if (years >= 15 && years <= 19) {
        assignations.push({ dataElement: AGE_GROUP, value: "15-19yrs" });
      } else if (years >= 20 && years <= 24) {
        assignations.push({ dataElement: AGE_GROUP, value: "20-24yrs" });
      } else if (years > 25) {
        assignations.push({ dataElement: AGE_GROUP, value: ">25yrs" });
      } else {
        assignations.push({ dataElement: AGE_GROUP, value: "" });
      }
    }

    //HIDE REASON FOR SERVICE REMOVED IF SERVICE REMOVE IS NOT CHOSEN
    if (!dataValues[SERVICE_REMOVED]) {
      currentHiddenFields.push(REASON_FOR_SERVICE_REMOVED);
      assignations.push({ dataElement: REASON_FOR_SERVICE_REMOVED, value: "" });
    }

    //HIDE OTHER REASON FOR REMOVAL IF REASON FOR SERVICE REMOVED IS NOT OTHERS
    if (dataValues[REASON_FOR_SERVICE_REMOVED] !== "Other") {
      currentHiddenFields.push(OTHER_REASON_FOR_REMOVAL);
      assignations.push({ dataElement: OTHER_REASON_FOR_REMOVAL, value: "" });
    }

    //HIDE IUD AND IMPLANTS IF CLIENT AGE IS > 49 YEARS OLD
    if (age.years > 49) {
      currentProps[SERVICE_OPTED] = { hiddenOptions: ["IUD", "Implants"] };
    }

    //ASSIGN NEXT APPOINTMENT DATE AUTOMATICALLY BASED ON SERVICE OPTED
    if (dataValues[SERVICE_OPTED]) {
      let nextAppointmentDate = "";
      const numberOfDistribution = dataValues[NUMBER_OF_DISTRIBUTION] ? parseInt(dataValues[NUMBER_OF_DISTRIBUTION]) : 1;
      let timeToBeAdded = {
        days: 0,
        months: 0,
        years: 0
      };
      let nextAge = { days: 0, months: 0, years: 0 };
      switch (dataValues[SERVICE_OPTED]) {
        case "S-pill":
        case "C-pill":
          timeToBeAdded.days = numberOfDistribution * 30;
          break;
        case "Inj":
          timeToBeAdded.days = numberOfDistribution * 90;
          break;
        case "IUD":
          timeToBeAdded.years = 10;
          nextAge = calculateAge(foundDob, add(new Date(currentEvent.eventDate), { years: 3 }));
          if (nextAge.years >= 49) {
            timeToBeAdded = null;
          }
          break;
        case "Implants":
          timeToBeAdded.years = 3;
          nextAge = calculateAge(foundDob, add(new Date(currentEvent.eventDate), { years: 10 }));
          if (nextAge.years >= 49) {
            timeToBeAdded = null;
          }
          break;
        default:
          break;
      }
      if (timeToBeAdded) {
        nextAppointmentDate = add(new Date(currentEvent.eventDate), timeToBeAdded);
        assignations.push({ dataElement: NEXT_APPOINTMENT_DATE, value: nextAppointmentDate });
      }
    }
    if (!dataValues[SERVICE_OPTED] || !dataValues[NUMBER_OF_DISTRIBUTION]) {
      assignations.push({ dataElement: NEXT_APPOINTMENT_DATE, value: "" });
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
        foundErrors.forEach((fe) => {
          currentErrors.push(foundIndex + 1 + ". " + pickTranslation(foundItem, i18n.language, "formName") + " (" + fe.value + " )");
        });
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
export default useFamilyPlanningRules;
