import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEventRuleEffect } from "../../common/tracker";
import { DATA_ELEMENT_IDS, ATTRIBUTE_IDS } from "./const";
import { addMonths, addYears, format, differenceInYears } from "date-fns";
const {
  EMERGENCY_PILLS,
  SERVICE_AT,
  USER_TYPE,
  SERVICE_OPTED,
  SERVICE_REMOVED,
  SERVICE_REMOVED_REASON,
  NEXT_APPOINT_DAY,
  NO_DISTRIBUTION
} = DATA_ELEMENT_IDS;

const useFamilyPlanningRules = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    hiddenFields: {}
  });
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentTei, currentEvents, selectedEvent } = data;
  const { changeDataValue } = actions;
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const { event, eventDate, dataValues } = currentEvent;
  const { attributes } = currentTei;

  const getDataVl = (deId) => dataValues.find((dv) => dv.dataElement === deId);
  const getAttrVl = (attrId) =>
    attributes.find((attr) => attr.attribute === attrId);

  const isMoreThan49YearsOld = () => {
    if (currentEvent && currentTei) {
      const dateOfBirth = getAttrVl(ATTRIBUTE_IDS.DATE_OF_BIRTH);
      const ageInYear = differenceInYears(
        new Date(eventDate),
        new Date(dateOfBirth.value)
      );
      return ageInYear > 49 ? true : false;
    } else {
      return false;
    }
  };

  const calcNextAppointmentDate = (serviceOptedVl, noDistributionVl) => {
    let tempNextAppointDay;
    switch (serviceOptedVl) {
      case "S-pill":
        tempNextAppointDay = addMonths(new Date(eventDate), noDistributionVl);
        return format(tempNextAppointDay, "yyyy-MM-dd");
      case "C-pill":
        tempNextAppointDay = addMonths(new Date(eventDate), noDistributionVl);
        return format(tempNextAppointDay, "yyyy-MM-dd");
      case "Inj":
        tempNextAppointDay = addMonths(
          new Date(eventDate),
          parseInt(noDistributionVl) * 3
        );
        return format(tempNextAppointDay, "yyyy-MM-dd");
      case "IUD":
        if (!isMoreThan49YearsOld()) {
          tempNextAppointDay = addYears(
            new Date(eventDate),
            parseInt(noDistributionVl) * 10
          );
          return format(tempNextAppointDay, "yyyy-MM-dd");
        } else {
          return "";
        }
      case "Implants":
        if (!isMoreThan49YearsOld()) {
          tempNextAppointDay = addYears(
            new Date(eventDate),
            parseInt(noDistributionVl) * 3
          );
          return format(tempNextAppointDay, "yyyy-MM-dd");
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  /* Rules for Data value assign */
  useEffect(() => {
    const isEmergency = getDataVl(EMERGENCY_PILLS);
    const serviceAt = getDataVl(SERVICE_AT);
    const serviceOpted = getDataVl(SERVICE_OPTED);
    const noDistribution = getDataVl(NO_DISTRIBUTION);
    if (serviceAt) {
      switch (serviceAt.value) {
        case "VHV":
          changeDataValue(event, USER_TYPE, "R");
          break;
        case "OutCountry":
          changeDataValue(event, USER_TYPE, "N");
          break;
        default:
          break;
      }
    }
    /* Number of Distribution rules */
    if (
      (!isEmergency || isEmergency?.value === "") &&
      (!serviceOpted || serviceOpted?.value === "")
    ) {
      changeDataValue(event, NEXT_APPOINT_DAY, "");
    }
    /* Next appointment date rules */
    if (serviceOpted && noDistribution && noDistribution?.value !== "") {
      const finalNextAppointDay = calcNextAppointmentDate(
        serviceOpted.value,
        noDistribution.value
      );
      changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
    }
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);

  /* Rules for Show/Hide fields */
  useEventRuleEffect(() => {
    const hiddenOptions = {};
    const hiddenFields = {};
    const disabledFields = {};
    if (currentEvent && currentTei) {
      const isEmergency = getDataVl(EMERGENCY_PILLS);
      const serviceAt = getDataVl(SERVICE_AT);
      const serviceOpted = getDataVl(SERVICE_OPTED);
      /* Emergency Pills rules */
      if (isEmergency && isEmergency.value === "true") {
        hiddenOptions[SERVICE_AT] = ["OutCountry"];
        hiddenFields[USER_TYPE] = true;
        hiddenFields[SERVICE_OPTED] = true;
        hiddenFields[SERVICE_REMOVED] = true;
        hiddenFields[SERVICE_REMOVED_REASON] = true;
      }
      /* Service at/by rules */
      if (serviceAt) {
        switch (serviceAt.value) {
          case "outreach":
            hiddenOptions[SERVICE_OPTED] = [
              "IUD",
              "Fcondom",
              "tube",
              "vase",
              "Implants"
            ];
            break;
          case "VHV":
            disabledFields[USER_TYPE] = true;
            hiddenOptions[SERVICE_OPTED] = [
              "IUD",
              "Fcondom",
              "tube",
              "vase",
              "Implants"
            ];
            break;
          case "OutCountry":
            disabledFields[USER_TYPE] = true;
            hiddenOptions[SERVICE_OPTED] = [
              "S-pill",
              "C-pill",
              "Inj",
              "Mcondom",
              "Fcondom"
            ];
            break;
          default:
            break;
        }
      }
      /* Age in year rules */
      if (isMoreThan49YearsOld()) {
        hiddenOptions[SERVICE_OPTED] = ["IUD"];
      }
      /* Service Opted rules */
      if (serviceOpted && ["tube", "vase"].includes(serviceOpted.value)) {
        hiddenFields[NEXT_APPOINT_DAY] = true;
      }
      /* Number of Distribution rules */
      if (
        (!isEmergency || isEmergency?.value === "") &&
        (!serviceOpted || serviceOpted?.value === "")
      ) {
        hiddenFields[NO_DISTRIBUTION] = true;
      }
    }
    /* Set hidden fields for table rendering */
    setProps((prev) => ({ ...prev, hiddenFields }));
    return { hiddenOptions, hiddenFields, disabledFields };
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);
  return props;
};

export default useFamilyPlanningRules;
