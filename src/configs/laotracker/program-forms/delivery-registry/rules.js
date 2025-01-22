import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useEffect, useState } from "react";
import { calculateAge, findDataValue, findAttributeValue } from "../../common/utils";
import { generateUid } from "@/utils/utils";
import { useShallow } from "zustand/react/shallow";
import { format, differenceInWeeks, differenceInDays } from "date-fns";
import { DELIVERY_DETAILS_DATA_ELEMENTS, INFANT_DATA_ELEMENTS, ATTRIBUTES, ANC_DATA_ELEMENTS } from "./const";
import { useTranslation } from "react-i18next";
import _, { assign } from "lodash";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { tracker } from "@/api";
const { saveEvent } = tracker;

const {
  LMP_DATE,
  WOMEN_AGE_GROUP,
  GESTATIONAL_WEEKS,
  SYSTOLIC_BLOOD_PRESSURE,
  DIASTOLIC_BLOOD_PRESSURE,
  HIGH_BLOOD_PRESSURE,
  LIVE_BIRTHS,
  STILL_BIRTHS,
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
  G,
  P,
  A,
  L
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
  const { t } = useTranslation();
  const [props, setProps] = useState({
    [GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4]: {
      hidden: true
    },
    [GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD]: {
      hidden: true
    },
    [HISTORY_OF_PREGNANCY]: {
      disabled: true
    },
    [HIV_TEST_DURING_ANC]: {
      disabled: true
    },
    [PROVIDING_HIV_COUNSELLING]: {
      hidden: false
    },
    [WOMEN_AGE_GROUP]: {
      disabled: true
    },
    [GESTATIONAL_WEEKS]: {
      disabled: false
    },
    [HIGH_BLOOD_PRESSURE]: {
      disabled: true
    },
    [STILL_BIRTHS]: { hidden: false },
    [HIV_POSITIVE_TREATED_WITH_ARV]: {},
    [SPECIFY_COMPLICATIONS]: { hidden: false },
    [LMP_DATE]: {
      disabled: true
    },
    [REMEMBER_LMP_DATE]: {
      disabled: true
    },
    [ESTIMATED_DUE_DATE]: {
      disabled: true
    },
    [BLOOD_LOSS_VOLUME]: {
      hidden: false
    }
  });

  const { data, actions } = useTrackerCaptureStore(useShallow((state) => ({ data: state.data, actions: state.actions })));
  const { changeDataValue } = actions;
  const { currentTei, currentEnrollment, currentEnrollments, currentEvents } = data;
  const ancPncEnrollment = currentEnrollments.find((ce) => ce.program === "fflLsS1lm3g");
  let foundAncFirstEvent = null;
  let ancLatestEvent = null;
  if (ancPncEnrollment) {
    const foundEvent = ancPncEnrollment.events.find((ev) => {
      const foundFirstVisit = ev.dataValues.find((dv) => dv.dataElement === NUMBER_OF_ANC_VISIT && dv.value === "1");
      return foundFirstVisit;
    });
    if (foundEvent) foundAncFirstEvent = foundEvent;
  }
  if (ancPncEnrollment) {
    const sortedEvents = _.sortBy(
      ancPncEnrollment.events.filter((ev) => ev.programStage === "IZ9GXqMAZV8"),
      "eventDate"
    ).reverse();
    ancLatestEvent = sortedEvents[0];
  }
  const { currentEvent } = useCurrentEvent();
  let ancFirstEventDataValues = {};
  let ancLatestEventDataValues = {};
  let dataValues = {};
  let attributes = {};

  if (currentEvent) {
    dataValues = currentEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }
  if (foundAncFirstEvent) {
    ancFirstEventDataValues = foundAncFirstEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }
  if (ancLatestEvent) {
    ancLatestEventDataValues = ancLatestEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }

  if (currentTei) {
    attributes = currentTei.attributes.reduce((prev, current) => {
      prev[current.attribute] = current.value;
      return prev;
    }, {});
  }
  useEffect(() => {
    if (!currentEvent) return;
    //ASSIGN WOMEN AGE GROUP AUTOMATICALLY
    if (currentEvent && currentEvent.eventDate && attributes[AGE]) {
      const { years } = calculateAge(attributes[AGE], currentEvent.eventDate);
      if (years < 15) {
        changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "<15yrs");
      } else if (years >= 15 && years <= 19) {
        changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "15-19yrs");
      } else if (years >= 20 && years <= 24) {
        changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "20-24yrs");
      } else if (years >= 25) {
        changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, ">25yrs");
      } else {
        changeDataValue(currentEvent.event, WOMEN_AGE_GROUP, "");
      }
    }

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
    //HIDE Still births of there are live births
    const liveBirths = dataValues[LIVE_BIRTHS];
    if (liveBirths) {
      changeDataValue(currentEvent.event, STILL_BIRTHS, "");
      props[STILL_BIRTHS].hidden = true;
    } else {
      props[STILL_BIRTHS].hidden = false;
    }
    //Show warning if HIV positive treated with ARV = true
    if (dataValues[HIV_POSITIVE_TREATED_WITH_ARV] === "true") {
      props[HIV_POSITIVE_TREATED_WITH_ARV] = {
        helpers: [{ type: "WARNING", value: t("hivPositiveTestedWithArvWarning") }]
      };
    } else {
      props[HIV_POSITIVE_TREATED_WITH_ARV] = {};
    }
    //HIDE specify complications of complications = false
    if (dataValues[COMPLICATIONS] === "true") {
      props[SPECIFY_COMPLICATIONS].hidden = false;
    } else {
      props[SPECIFY_COMPLICATIONS].hidden = true;
      changeDataValue(currentEvent.event, SPECIFY_COMPLICATIONS, "");
    }
    //ASSIGN history of pregnant automatically from ANC event
    if (ancFirstEventDataValues[HISTORY_OF_PREGNANCY]) {
      changeDataValue(currentEvent.event, HISTORY_OF_PREGNANCY, ancFirstEventDataValues[HISTORY_OF_PREGNANCY]);
    }
    //ASSIGN HIV TEST during ANC automatically from ANC event
    if (ancFirstEventDataValues[HIV_TEST1] === "true" || ancFirstEventDataValues[HIV_TEST2] === "true") {
      changeDataValue(currentEvent.event, HIV_TEST_DURING_ANC, "true");
    } else {
      changeDataValue(currentEvent.event, HIV_TEST_DURING_ANC, "false");
    }
    //Hide providing HIV counselling if HIV Test = true
    if (dataValues[HIV_TEST_DURING_ANC] === "true") {
      props[PROVIDING_HIV_COUNSELLING].hidden = true;
      changeDataValue(currentEvent.event, PROVIDING_HIV_COUNSELLING, "");
    } else {
      props[PROVIDING_HIV_COUNSELLING].hidden = false;
    }
    //ASSIGN LMP Section automatically from ANC event
    if (ancFirstEventDataValues[LMP_DATE]) {
      changeDataValue(currentEvent.event, LMP_DATE, ancFirstEventDataValues[LMP_DATE]);
    }
    if (ancFirstEventDataValues[REMEMBER_LMP_DATE]) {
      changeDataValue(currentEvent.event, REMEMBER_LMP_DATE, ancFirstEventDataValues[REMEMBER_LMP_DATE]);
    }
    if (ancFirstEventDataValues[ESTIMATED_DUE_DATE]) {
      changeDataValue(currentEvent.event, ESTIMATED_DUE_DATE, ancFirstEventDataValues[ESTIMATED_DUE_DATE]);
    }
    // if (ancFirstEventDataValues[GESTATIONAL_WEEKS]) {
    //   changeDataValue(currentEvent.event, GESTATIONAL_WEEKS, ancFirstEventDataValues[GESTATIONAL_WEEKS]);
    // }
    if (ancLatestEventDataValues["cmhpujmJ1DJ"]) {
      changeDataValue(currentEvent.event, GESTATIONAL_WEEKS, ancLatestEventDataValues["cmhpujmJ1DJ"]);
      props[GESTATIONAL_WEEKS].disabled = true;
    } else {
      props[GESTATIONAL_WEEKS].disabled = false;
    }
    //Hide Gestational aged under/equal 32 weeks received Antenital-MgSO4 if gestational age over 32 week
    //Hide Gestational aged under/equal 34 weeks received Antenital-Corticosteriod if gestational age over 34 week
    const currentGestationalWeek = dataValues[GESTATIONAL_WEEKS] ? parseInt(dataValues[GESTATIONAL_WEEKS]) : null;
    if (currentGestationalWeek) {
      console.log(currentGestationalWeek);
      if (currentGestationalWeek <= 34) {
        props[GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD].hidden = false;
      } else {
        props[GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD].hidden = true;
        changeDataValue(currentEvent.event, GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD, "");
      }
      if (currentGestationalWeek <= 32) {
        props[GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4].hidden = false;
      } else {
        props[GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4].hidden = true;
        changeDataValue(currentEvent.event, GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4, "");
      }
    } else {
      props[GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4].hidden = true;
      props[GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD].hidden = true;
      changeDataValue(currentEvent.event, GESTATIONAL_UNDER_OR_EQUAL_32_WEEKS_RECEIVED_MGSO4, "");
      changeDataValue(currentEvent.event, GESTATIONAL_UNDER_OR_EQUAL_34_WEEKS_RECEIVED_CORTICOSTERIOD, "");
    }
    //HIDE BLOOD LOSS VOLUME IF NO BLOOD LOSS
    if (dataValues[BLOOD_LOSS] !== "true") {
      props[BLOOD_LOSS_VOLUME].hidden = true;
      changeDataValue(currentEvent.event, BLOOD_LOSS_VOLUME, "");
    } else {
      props[BLOOD_LOSS_VOLUME].hidden = false;
    }

    setProps({ ...props });
  }, [JSON.stringify(currentEvent), attributes[AGE]]);

  useEffect(() => {
    if (currentEvent) {
      const foundEnrollment = currentEnrollments.find((ce) => ce.program === "fflLsS1lm3g");
      if (foundEnrollment) {
        const GPAL = findGPAL(foundEnrollment.events.filter((ev) => ev.programStage === "IZ9GXqMAZV8"));
        changeDataValue(currentEvent.event, G, GPAL[G] ? GPAL[G] : "");
        changeDataValue(currentEvent.event, P, GPAL[P] ? GPAL[P] : "");
        changeDataValue(currentEvent.event, A, GPAL[A] ? GPAL[A] : "");
        changeDataValue(currentEvent.event, L, GPAL[L] ? GPAL[L] : "");
      }
    }
  }, [currentEvent ? currentEvent.event : ""]);

  return props;
};

const useProfileRules = () => {
  const [props, setProps] = useState({
    [SEX]: {
      disabled: true
    }
  });
  const { data, actions } = useTrackerCaptureStore(useShallow((state) => ({ data: state.data, actions: state.actions })));
  const { changeAttributeValue } = actions;

  const { currentTei, currentEnrollment } = data;
  let attributes = {};

  if (currentTei) {
    attributes = currentTei.attributes.reduce((prev, current) => {
      prev[current.attribute] = current.value;
      return prev;
    }, {});
  }

  //ASSIGN SEX FEMALE AUTOMATICALLY
  useEffect(() => {
    try {
      changeAttributeValue(SEX, "F");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return props;
};

const useInfantFormRules = (currentEvent, childTeis, childTei, setData) => {
  const { currentEvents, currentEnrollment } = useTrackerCaptureStore((state) => state.data);
  const foundDeliveryDetailEvent = currentEvents.find((e) => e.programStage === "YOHVx1Xmpgr" && e.enrollment === currentEnrollment.enrollment);
  const [props, setProps] = useState({
    [FACILITY_OF_BIRTH]: {
      hidden: false
    },
    [TYPE_OF_DELIVERY]: {
      disabled: true
    },
    // [GESTATIONAL_WEEKS]: { disabled: true },
    [DATE_OF_BIRTH]: { disabled: true },
    [TIME_OF_BIRTH]: { disabled: true },
    [KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT]: { hidden: true },
    [RESUSCITATION]: { hidden: true },
    [RESUSCITATION_DURATION]: { hidden: true },
    [CONGENITAL_ABNORMAL]: { hidden: true },
    [SEPSIS]: { hidden: true },
    [DISTRESS_CARDIAC_DISEASE]: { hidden: true },
    [OTHER_ABNORNAL_SPECIFY]: { hidden: true },
    [DATE_OF_REFERRAL]: { hidden: true },
    [REASON_FOR_REFERRAL]: { hidden: true },
    [SERVICE_LOCATION]: { disabled: true },
    assignations: {}
  });

  let deliveryDetailsDataValues = {};
  let dataValues = {};
  if (currentEvent) {
    dataValues = currentEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }
  if (foundDeliveryDetailEvent) {
    deliveryDetailsDataValues = foundDeliveryDetailEvent.dataValues.reduce((prev, current) => {
      prev[current.dataElement] = current.value;
      return prev;
    }, {});
  }

  useEffect(() => {
    const assignations = {};
    //IF place of birth is not facility then hide facility of birth
    if (dataValues[PLACE_OF_BIRTH] === "Health Facility") {
      props[FACILITY_OF_BIRTH].hidden = false;
    } else {
      props[FACILITY_OF_BIRTH].hidden = true;
      assignations[FACILITY_OF_BIRTH] = "";
    }

    //Assign date of birth and time of birth automatically
    if (deliveryDetailsDataValues[DATE_OF_BIRTH]) {
      assignations[DATE_OF_BIRTH] = deliveryDetailsDataValues[DATE_OF_BIRTH];
    }
    if (deliveryDetailsDataValues[TIME_OF_BIRTH]) {
      assignations[TIME_OF_BIRTH] = deliveryDetailsDataValues[TIME_OF_BIRTH];
    }
    //Assign gestational week automatically
    if (deliveryDetailsDataValues[GESTATIONAL_WEEKS]) {
      assignations[GESTATIONAL_WEEKS] = deliveryDetailsDataValues[GESTATIONAL_WEEKS];
    }
    //Assign type of delivery week automatically
    if (deliveryDetailsDataValues[TYPE_OF_DELIVERY]) {
      assignations[TYPE_OF_DELIVERY] = deliveryDetailsDataValues[TYPE_OF_DELIVERY];
    }
    //IF gestational weeks > 36 and weight >= 2500g then hide Kangaroo mom care in preterm/ low birth weight < 2500g
    const gestationalWeeks = dataValues[GESTATIONAL_WEEKS] ? parseInt(dataValues[GESTATIONAL_WEEKS]) : 99999999;
    const weight = dataValues[BIRTH_WEIGHT] ? parseInt(dataValues[BIRTH_WEIGHT]) : 99999999;
    if (gestationalWeeks <= 36 || weight < 2500) {
      props[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT].hidden = false;
    } else {
      props[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT].hidden = true;
      assignations[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT] = "";
    }
    //IF newborn condition is normal then hide abnormal dataElements
    if (dataValues[NEWBORN_CONDITION] === "Normal" || !dataValues[NEWBORN_CONDITION]) {
      props[RESUSCITATION].hidden = true;
      props[CONGENITAL_ABNORMAL].hidden = true;
      props[SEPSIS].hidden = true;
      props[DISTRESS_CARDIAC_DISEASE].hidden = true;
      props[OTHER_ABNORNAL_SPECIFY].hidden = true;
    } else {
      props[RESUSCITATION].hidden = false;
      props[CONGENITAL_ABNORMAL].hidden = false;
      props[SEPSIS].hidden = false;
      props[DISTRESS_CARDIAC_DISEASE].hidden = false;
      props[OTHER_ABNORNAL_SPECIFY].hidden = false;
    }
    //IF RESUSCITATION = true then show duration
    if (dataValues[RESUSCITATION] === "true") {
      props[RESUSCITATION_DURATION].hidden = false;
    } else {
      props[RESUSCITATION_DURATION].hidden = true;
      assignations[RESUSCITATION_DURATION] = "";
    }
    //HIDE referral section if referred = false
    if (dataValues[REFERRED_TO_HIGHER_FACILITY] === "true") {
      props[DATE_OF_REFERRAL].hidden = false;
      props[REASON_FOR_REFERRAL].hidden = false;
    } else {
      props[DATE_OF_REFERRAL].hidden = true;
      props[REASON_FOR_REFERRAL].hidden = true;
      assignations[DATE_OF_REFERRAL] = "";
      assignations[REASON_FOR_REFERRAL] = "";
    }
    //Assign service location automatically
    if (deliveryDetailsDataValues[SERVICE_LOCATION]) {
      assignations[SERVICE_LOCATION] = deliveryDetailsDataValues[SERVICE_LOCATION];
    }

    const newChildTeis = _.cloneDeep(childTeis);
    const foundChildTeiIndex = childTeis.findIndex((c) => c.trackedEntityInstance === childTei.trackedEntityInstance);
    const foundEnrollmentIndex = childTei.enrollments.findIndex((enr) => enr.program === "Yj9cJ34AXw6");
    const foundEventIndex =
      childTei && childTei.enrollments
        ? childTei.enrollments[foundEnrollmentIndex].events.findIndex((ev) => ev.programStage === "bwGkn5ebqkD")
        : null;

    Object.keys(assignations).forEach((de) => {
      const foundDataValueIndex = newChildTeis[foundChildTeiIndex].enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues.findIndex(
        (dv) => dv.dataElement === de
      );
      if (foundDataValueIndex === -1) {
        newChildTeis[foundChildTeiIndex].enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues.push({
          dataElement: de,
          value: assignations[de]
        });
      } else {
        newChildTeis[foundChildTeiIndex].enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues[foundDataValueIndex].value =
          assignations[de];
      }
    });
    setData("childTeis", newChildTeis);
    setProps({ ...props });
  }, [JSON.stringify(currentEvent), JSON.stringify(foundDeliveryDetailEvent)]);

  return props;
};

const useChildTeisLogic = (setTab) => {
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEnrollment, currentTei, childTeis } = data;
  const { setData, changeDataValue } = actions;
  const { currentEvent } = useCurrentEvent();
  if (!currentEvent) return;
  const foundLiveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
  const foundDateOfDelivery = findDataValue(currentEvent.dataValues, "grMMOiF9fPj");
  const foundChildTeis = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
  const updateAttribute = (tei, teaId, foundCurrentAttribute) => {
    const foundExistedAttribute = tei.attributes.find((e) => e.attribute === teaId);
    if (foundExistedAttribute) {
      foundExistedAttribute.value = foundCurrentAttribute.value;
    } else {
      tei.attributes.push({
        attribute: teaId,
        value: foundCurrentAttribute.value
      });
    }
    return tei;
  };

  const initEirAttributes = (tei) => {
    [
      {
        deliveryTeaId: "tQeFLjYbqzv",
        eirTeaId: "tQeFLjYbqzv"
      },
      {
        deliveryTeaId: "IEE2BMhfoSc",
        eirTeaId: "RqEyvE6zcTE"
      },
      {
        deliveryTeaId: "IBLkiaYRRL3",
        eirTeaId: "WkHHrysFy3n"
      },
      {
        deliveryTeaId: "r8bZppSsIvR",
        eirTeaId: "r8bZppSsIvR"
      },
      {
        deliveryTeaId: "oVwa5LfjnvA",
        eirTeaId: "oVwa5LfjnvA"
      },
      {
        deliveryTeaId: "UNiaP6Oz7Mv",
        eirTeaId: "UNiaP6Oz7Mv"
      },
      {
        deliveryTeaId: "RwoKpuIgMmA", //lgHRdU82IJv
        eirTeaId: "DcMyN6eoyFD"
      }
    ].forEach((tea) => {
      if (tea.deliveryTeaId === "tQeFLjYbqzv") {
        tei = updateAttribute(tei, tea.eirTeaId, {
          value: foundDateOfDelivery
        });
      } else {
        const foundCurrentAttribute = currentTei.attributes.find((e) => e.attribute === tea.deliveryTeaId);
        if (foundCurrentAttribute) {
          tei = updateAttribute(tei, tea.eirTeaId, foundCurrentAttribute);
        } else {
          if (tea.deliveryTeaId === "RwoKpuIgMmA") {
            const foundCurrentPhoneNumber = currentTei.attributes.find((e) => e.attribute === "lgHRdU82IJv");
            if (foundCurrentPhoneNumber) {
              tei = updateAttribute(tei, "lgHRdU82IJv", foundCurrentPhoneNumber);
            }
          }
        }
      }
    });
    return tei;
  };

  const createChildTeis = async () => {
    if (foundChildTeis) {
      const converted = JSON.parse(foundChildTeis);
      if (foundLiveBirths && foundLiveBirths == converted.length) {
        changeDataValue(currentEvent.event, "lYdXxom1BAG", JSON.stringify(childTeis));
        const newCurrentEvent = _.cloneDeep(currentEvent);
        const foundCurrentChildTeisDataValue = newCurrentEvent.dataValues.findIndex((dv) => dv.dataElement === "lYdXxom1BAG");
        newCurrentEvent.dataValues[foundCurrentChildTeisDataValue].value = JSON.stringify(childTeis);
        const result = await saveEvent(newCurrentEvent);
        return result;
      }
    }
    if (!foundLiveBirths) {
      const result = await saveEvent(currentEvent);
      return result;
    }

    if (foundLiveBirths && foundLiveBirths > "0") {
      const liveBirths = parseInt(foundLiveBirths);
      let newChildTeis = [];
      for (let i = 0; i < liveBirths; i++) {
        const newTeiId = generateUid();
        const newEnrollmentId = generateUid();
        const newChrEnrollmentId = generateUid();
        const newBirthDetailEventId = generateUid();
        const newImmunizationEventId = generateUid();
        const foundVillageOptionSet = findAttributeValue(currentTei, "rreM2sBjjoT");
        const foundVillageHierarchy = findAttributeValue(currentTei, "UNiaP6Oz7Mv");
        let chrOrgUnit = "";
        if (foundVillageHierarchy) {
          chrOrgUnit = foundVillageHierarchy;
        } else {
          const foundVillage = orgUnits.find((ou) => ou.code === foundVillageOptionSet);
          chrOrgUnit = foundVillage.id;
        }

        let newTei = {
          orgUnit: orgUnit.id,
          trackedEntityInstance: newTeiId,
          trackedEntityType: "MCPQUTHX1Ze",
          enrollments: [
            {
              trackedEntityType: "MCPQUTHX1Ze",
              orgUnit: orgUnit.id,
              program: "Yj9cJ34AXw6",
              trackedEntityInstance: newTeiId,
              enrollment: newEnrollmentId,
              enrollmentDate: foundDateOfDelivery,
              incidentDate: foundDateOfDelivery,
              status: "ACTIVE",
              events: [
                {
                  dueDate: foundDateOfDelivery,
                  program: "Yj9cJ34AXw6",
                  event: newBirthDetailEventId,
                  programStage: "bwGkn5ebqkD",
                  orgUnit: orgUnit.id,
                  trackedEntityInstance: newTeiId,
                  enrollment: newEnrollmentId,
                  status: "ACTIVE",
                  eventDate: foundDateOfDelivery,
                  dataValues: []
                },
                {
                  dueDate: foundDateOfDelivery,
                  program: "Yj9cJ34AXw6",
                  event: newImmunizationEventId,
                  programStage: "hCTTxOH8FOa",
                  orgUnit: orgUnit.id,
                  trackedEntityInstance: newTeiId,
                  enrollment: newEnrollmentId,
                  status: "ACTIVE",
                  eventDate: foundDateOfDelivery,
                  dataValues: []
                }
              ]
            },
            {
              trackedEntityType: "MCPQUTHX1Ze",
              orgUnit: chrOrgUnit,
              program: "m9tWdDKc2Y4",
              trackedEntityInstance: newTeiId,
              enrollment: newChrEnrollmentId,
              enrollmentDate: foundDateOfDelivery,
              incidentDate: foundDateOfDelivery,
              status: "ACTIVE"
            }
          ],
          attributes: []
        };
        newTei = initEirAttributes(newTei);
        newChildTeis.push(newTei);
      }
      setData("childTeis", newChildTeis);
      changeDataValue(currentEvent.event, "lYdXxom1BAG", JSON.stringify(newChildTeis));
      const newCurrentEvent = _.cloneDeep(currentEvent);
      const foundCurrentChildTeisDataValue = newCurrentEvent.dataValues.findIndex((dv) => dv.dataElement === "lYdXxom1BAG");
      if (foundCurrentChildTeisDataValue === -1) {
        newCurrentEvent.dataValues.push({
          dataElement: "lYdXxom1BAG",
          value: JSON.stringify(newChildTeis)
        });
      } else {
        newCurrentEvent.dataValues[foundCurrentChildTeisDataValue].value = JSON.stringify(newChildTeis);
      }
      const result = await saveEvent(newCurrentEvent);
      setTab(1);
      return result;
    }
  };
  return createChildTeis;
};
export { useDeliveryDetailsRules, useProfileRules, useInfantFormRules, useChildTeisLogic };
