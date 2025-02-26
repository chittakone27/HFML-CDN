import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEventRuleEffect } from "../../common/tracker";
import { DATA_ELEMENT_IDS, ATTRIBUTE_IDS } from "./const";
import { addMonths, addYears, format } from "date-fns";
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

  useEffect(() => {
    const ageInYear = getAttrVl(ATTRIBUTE_IDS.AGE_IN_YEAR);
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
      let tempNextAppointDay;
      let finalNextAppointDay;
      switch (serviceOpted.value) {
        case "S-pill":
          tempNextAppointDay = addMonths(
            new Date(eventDate),
            noDistribution.value
          );
          finalNextAppointDay = format(tempNextAppointDay, "yyyy-MM-dd");
          changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
          break;
        case "C-pill":
          tempNextAppointDay = addMonths(
            new Date(eventDate),
            noDistribution.value
          );
          finalNextAppointDay = format(tempNextAppointDay, "yyyy-MM-dd");
          changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
          break;
        case "Inj":
          tempNextAppointDay = addMonths(
            new Date(eventDate),
            parseInt(noDistribution.value) * 3
          );
          finalNextAppointDay = format(tempNextAppointDay, "yyyy-MM-dd");
          changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
          break;
        case "IUD":
          if (ageInYear && ageInYear.value <= 49) {
            tempNextAppointDay = addYears(
              new Date(eventDate),
              parseInt(noDistribution.value) * 10
            );
            finalNextAppointDay = format(tempNextAppointDay, "yyyy-MM-dd");
            changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
          }
          break;
        case "Implants":
          if (ageInYear && ageInYear.value <= 49) {
            tempNextAppointDay = addYears(
              new Date(eventDate),
              parseInt(noDistribution.value) * 3
            );
            finalNextAppointDay = format(tempNextAppointDay, "yyyy-MM-dd");
            changeDataValue(event, NEXT_APPOINT_DAY, finalNextAppointDay);
          }
          break;
        default:
          break;
      }
    }
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);

  useEventRuleEffect(() => {
    const hiddenOptions = {};
    const hiddenFields = {};
    const disabledFields = {};
    if (currentEvent) {
      const ageInYear = getAttrVl(ATTRIBUTE_IDS.AGE_IN_YEAR);
      const isEmergency = getDataVl(EMERGENCY_PILLS);
      const serviceAt = getDataVl(SERVICE_AT);
      const serviceOpted = getDataVl(SERVICE_OPTED);
      //   console.log(ageInYear);
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
      if (ageInYear && ageInYear.value > 49) {
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
