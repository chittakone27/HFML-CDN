import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { DATA_ELEMENTS } from "./pncConst";
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
const { PNC_VISIT_NUMBER, PNC1_WITHIN_24HRS, PNC_IN_6_WEEKS, NEW_BORN_EXCLUSIVELY_BREASTFED_FROM_BIRTH_UNTIL_DISCHARGE, NEXT_APPOINTMENT_DATE } =
  DATA_ELEMENTS;

const usePncRules = () => {
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
    const currentProps = {};
    const assignations = [];
    const currentDisabledFields = [];
    const currentHiddenFields = [];
    const currentHelpers = {};

    //HIDE RECEIVING PNC WIHIN 24 HOURS IF PNC VISIT IS NOT 1ST VISIT
    if (dataValues[PNC_VISIT_NUMBER] !== "1") {
      currentHiddenFields.push(PNC1_WITHIN_24HRS);
      assignations.push({ dataElement: PNC1_WITHIN_24HRS, value: "" });
    }

    //HIDE RECEIVING PNC IN 6 WEEKS AFTER DELIVERY IF PNC VISIT IS < 2
    if (!dataValues[PNC_VISIT_NUMBER] || (dataValues[PNC_VISIT_NUMBER] && parseInt(dataValues[PNC_VISIT_NUMBER]) < 2)) {
      currentHiddenFields.push(PNC_IN_6_WEEKS);
      assignations.push({ dataElement: PNC_IN_6_WEEKS, value: "" });
    }

    //HIDE NEW_BORN_EXCLUSIVELY_BREASTFED_FROM_BIRTH_UNTIL_DISCHARGE IF PNC VISIT IS NOT 1ST VISIT
    if (dataValues[PNC_VISIT_NUMBER] !== "1") {
      currentHiddenFields.push(NEW_BORN_EXCLUSIVELY_BREASTFED_FROM_BIRTH_UNTIL_DISCHARGE);
      assignations.push({ dataElement: NEW_BORN_EXCLUSIVELY_BREASTFED_FROM_BIRTH_UNTIL_DISCHARGE, value: "" });
    }

    //MAKE NEXT APPOINTMENT DATE TO BE MANDATORY IF CURRENT PNC VISIT IS < 2ND VISIT
    if (dataValues[PNC_VISIT_NUMBER] && parseInt(dataValues[PNC_VISIT_NUMBER]) < 2) {
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

    //MAKE RECEIVING PNC WIHIN 24 HOURS TO BE MANDATORY IF PNC VISIT IS 1ST VISIT
    if (dataValues[PNC_VISIT_NUMBER] === "1") {
      if (!dataValues[PNC1_WITHIN_24HRS]) {
        currentHelpers[PNC1_WITHIN_24HRS] = [{ type: "ERROR", value: t("thisFieldIsRequired") }];
      }
    }

    //MAKE RECEIVING PNC IN 6 WEEKS AFTER DELIVERY TO BE MANDATORY IF PNC VISIT IS >= 2ND VISIT
    if (dataValues[PNC_VISIT_NUMBER] && parseInt(dataValues[PNC_VISIT_NUMBER]) >= 2) {
      if (!dataValues[PNC_IN_6_WEEKS]) {
        currentHelpers[PNC_IN_6_WEEKS] = [{ type: "ERROR", value: t("thisFieldIsRequired") }];
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
export default usePncRules;
