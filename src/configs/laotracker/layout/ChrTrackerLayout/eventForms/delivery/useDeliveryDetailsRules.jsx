import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import {
  DELIVERY_DETAILS_DATA_ELEMENTS,
  INFANT_DATA_ELEMENTS,
  ATTRIBUTES,
  ANC_DATA_ELEMENTS,
  ANC_PROGRAM_STAGE,
  ANC_PROGRAM
} from "./deliveryDetailsConst";
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
  LMP_DATE,
  WOMEN_AGE_GROUP,
  GESTATIONAL_WEEKS,
  SYSTOLIC_BLOOD_PRESSURE,
  DIASTOLIC_BLOOD_PRESSURE,
  HIGH_BLOOD_PRESSURE,
  LIVE_BIRTHS,
  STILL_BIRTHS,
  HIV_POSITIVE,
  HIV_POSITIVE_TREATED_WITH_ARV,
  COMPLICATIONS,
  SPECIFY_COMPLICATIONS,
  HISTORY_OF_PREGNANCY,
  HIV_TEST_DURING_ANC,
  PROVIDING_HIV_COUNSELLING,
  REMEMBER_LMP_DATE,
  ESTIMATED_DUE_DATE,
  GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4,
  GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD,
  BLOOD_LOSS,
  BLOOD_LOSS_VOLUME,
  MOTHER_DATE_OF_DELIVERY,
  G,
  P,
  A,
  L,
  CHILD_TEIS,
  DELIVERY_COMPLETED
} = DELIVERY_DETAILS_DATA_ELEMENTS;
const { NUMBER_OF_ANC_VISIT, HIV_TEST1, HIV_TEST2 } = ANC_DATA_ELEMENTS;
const {
  PLACE_OF_BIRTH,
  FACILITY_OF_BIRTH,
  TYPE_OF_DELIVERY,
  DATE_OF_BIRTH,
  TIME_OF_BIRTH,
  BIRTH_WEIGHT,
  KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT,
  NEWBORN_CONDITION,
  RESUSCITATION,
  RESUSCITATION_DURATION,
  CONGENITAL_ABNORMAL,
  SEPSIS,
  DISTRESS_CARDIAC_DISEASE,
  OTHER_ABNORNAL_SPECIFY,
  REFERRED_TO_HIGHER_FACILITY,
  DATE_OF_REFERRAL,
  REASON_FOR_REFERRAL,
  SERVICE_LOCATION
} = INFANT_DATA_ELEMENTS;
const { AGE, SEX } = ATTRIBUTES;

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

const useDeliveryDetailsRules = () => {
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
  const { currentEvents, currentTei, currentEnrollments } = data;
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
    //ASSIGN GPAL FROM ANC EVENT
    const foundAncEnrollment = currentEnrollments.find((en) => en.program === ANC_PROGRAM);
    if (foundAncEnrollment) {
      const ancEvents = foundAncEnrollment.events.filter((e) => e.programStage === ANC_PROGRAM_STAGE); //ANC program stage
      if (ancEvents.length > 0) {
        const GPAL = findGPAL(ancEvents);
        Object.keys(GPAL).forEach((key) => {
          if (!dataValues[key]) {
            assignations.push({ dataElement: key, value: GPAL[key] });
          }
          return;
        });
      }
    }
    changeDataValues(assignations);
  }, []);

  useEffect(() => {
    const assignations = [];
    const currentDisabledFields = [];
    const currentHiddenFields = [CHILD_TEIS];
    const currentHelpers = {};
    const currentProps = {};

    //DISABLE SOME FIELDS IF DELIVERY IS ALREADY COMPLETED
    const completed = dataValues[DELIVERY_COMPLETED] === "true";
    if (completed) {
      currentDisabledFields.push(MOTHER_DATE_OF_DELIVERY);
      currentDisabledFields.push(LIVE_BIRTHS);
      currentDisabledFields.push(STILL_BIRTHS);
      currentDisabledFields.push("eventDate");
    }

    //DONT ALLOW ZERO IN LIVE BIRTHS AND STILL BIRTHS
    if (dataValues[LIVE_BIRTHS] && dataValues[LIVE_BIRTHS][0] === "0") {
      currentHelpers[LIVE_BIRTHS] = [
        {
          type: "ERROR",
          value: t("zeroIsNotAllowed")
        }
      ];
    }
    if (dataValues[STILL_BIRTHS] && dataValues[STILL_BIRTHS][0] === "0") {
      currentHelpers[STILL_BIRTHS] = [
        {
          type: "ERROR",
          value: t("zeroIsNotAllowed")
        }
      ];
    }

    //HIDE HIV TREATED IF HIV IS NOT POSITIVE
    if (dataValues[HIV_POSITIVE] !== "true") {
      currentHiddenFields.push(HIV_POSITIVE_TREATED_WITH_ARV);
      assignations.push({ dataElement: HIV_POSITIVE_TREATED_WITH_ARV, value: "" });
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

export default useDeliveryDetailsRules;
