import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useState } from "react";
import { findDataValue, findAttributeValue, calculateAge } from "@/configs/laotracker/common/utils";
import { useShallow } from "zustand/react/shallow";
import _ from "lodash";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { INFANT_DATA_ELEMENTS, ATTRIBUTES } from "./deliveryDetailsConst";
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

const useInfantFormRules = (birthDetailsEvent, childIndex) => {
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentTei } = data;
  const { event, chrTrackerActions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      chrTrackerActions: state.actions
    }))
  );
  const { changeDataValue } = chrTrackerActions;
  const { currentEvent } = event;
  const foundDeliveryDetailEvent = currentEvent;
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
    [SERVICE_LOCATION]: { disabled: true }
  });
  const [assignations, setAssignations] = useState({});

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
    const currentAssignations = {};
    //IF place of birth is not facility then hide facility of birth
    if (dataValues[PLACE_OF_BIRTH] === "Health Facility") {
      props[FACILITY_OF_BIRTH].hidden = false;
    } else {
      props[FACILITY_OF_BIRTH].hidden = true;
      currentAssignations[FACILITY_OF_BIRTH] = "";
    }

    //Assign date of birth and time of birth automatically
    if (deliveryDetailsDataValues[DATE_OF_BIRTH]) {
      currentAssignations[DATE_OF_BIRTH] = deliveryDetailsDataValues[DATE_OF_BIRTH];
    }
    if (deliveryDetailsDataValues[TIME_OF_BIRTH]) {
      currentAssignations[TIME_OF_BIRTH] = deliveryDetailsDataValues[TIME_OF_BIRTH];
    }
    //Assign gestational week automatically
    if (deliveryDetailsDataValues[GESTATIONAL_WEEKS]) {
      currentAssignations[GESTATIONAL_WEEKS] = deliveryDetailsDataValues[GESTATIONAL_WEEKS];
    }
    //Assign type of delivery week automatically
    if (deliveryDetailsDataValues[TYPE_OF_DELIVERY]) {
      currentAssignations[TYPE_OF_DELIVERY] = deliveryDetailsDataValues[TYPE_OF_DELIVERY];
    }
    //IF gestational weeks > 36 and weight >= 2500g then hide Kangaroo mom care in preterm/ low birth weight < 2500g
    const gestationalWeeks = dataValues[GESTATIONAL_WEEKS] ? parseInt(dataValues[GESTATIONAL_WEEKS]) : 99999999;
    const weight = dataValues[BIRTH_WEIGHT] ? parseInt(dataValues[BIRTH_WEIGHT]) : 99999999;
    if (gestationalWeeks <= 36 || weight < 2500) {
      props[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT].hidden = false;
    } else {
      props[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT].hidden = true;
      currentAssignations[KANGAROO_MOM_CARE_IN_PRETERM_LOW_BIRTH_WEIGHT] = "";
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
      currentAssignations[RESUSCITATION_DURATION] = "";
    }
    //HIDE referral section if referred = false
    if (dataValues[REFERRED_TO_HIGHER_FACILITY] === "true") {
      props[DATE_OF_REFERRAL].hidden = false;
      props[REASON_FOR_REFERRAL].hidden = false;
    } else {
      props[DATE_OF_REFERRAL].hidden = true;
      props[REASON_FOR_REFERRAL].hidden = true;
      currentAssignations[DATE_OF_REFERRAL] = "";
      currentAssignations[REASON_FOR_REFERRAL] = "";
    }
    //Assign service location automatically
    if (deliveryDetailsDataValues[SERVICE_LOCATION]) {
      currentAssignations[SERVICE_LOCATION] = deliveryDetailsDataValues[SERVICE_LOCATION];
    }
    const cloned = _.cloneDeep(birthDetailsEvent);
    const children = JSON.parse(deliveryDetailsDataValues[CHILD_TEIS]);
    Object.keys(currentAssignations).forEach((key) => {
      const foundDataValueIndex = cloned.dataValues.findIndex((dv) => dv.dataElement === key);
      if (foundDataValueIndex === -1) {
        cloned.dataValues.push({
          dataElement: key,
          value: currentAssignations[key]
        });
      } else {
        cloned.dataValues[foundDataValueIndex].value = currentAssignations[key];
      }
    });
    const foundEnrollmentIndex = children[childIndex].enrollments.findIndex((enr) => enr.program === "Yj9cJ34AXw6");
    const foundEventIndex = children[childIndex].enrollments[foundEnrollmentIndex].events.findIndex((ev) => ev.event === birthDetailsEvent.event);
    children[childIndex].enrollments[foundEnrollmentIndex].events[foundEventIndex] = cloned;

    if (deliveryDetailsDataValues[LIVE_BIRTHS] && parseInt(deliveryDetailsDataValues[LIVE_BIRTHS]) > 0) {
      const childAttributes = [
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
      ];
      children.forEach((child) => {
        childAttributes.forEach((attribute) => {
          let value = "";
          if (attribute.deliveryTeaId === "tQeFLjYbqzv") {
            value = findDataValue(foundDeliveryDetailEvent.dataValues, "grMMOiF9fPj");
          } else {
            value = findAttributeValue(currentTei, attribute.deliveryTeaId);
          }
          const foundAttributeIndex = child.attributes.findIndex((attr) => attr.attribute === attribute.eirTeaId);
          if (foundAttributeIndex === -1) {
            child.attributes.push({
              attribute: attribute.eirTeaId,
              value
            });
          } else {
            child.attributes[foundAttributeIndex].value = value;
          }
        });
      });
      changeDataValue(CHILD_TEIS, JSON.stringify(children));
    }

    setProps({ ...props });
  }, [JSON.stringify(currentTei), JSON.stringify(currentEvent), JSON.stringify(birthDetailsEvent)]);

  return props;
};

export default useInfantFormRules;
