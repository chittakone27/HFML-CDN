import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useState } from "react";
import { findDataValue, findAttributeValue, calculateAge } from "@/configs/laotracker/common/utils";
import { useShallow } from "zustand/react/shallow";
import _, { find } from "lodash";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { INFANT_DATA_ELEMENTS, DELIVERY_DETAILS_DATA_ELEMENTS, ATTRIBUTES, EIR_ATTRIBUTES } from "./deliveryDetailsConst";
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
  SERVICE_LOCATION,
  MOTHERS_AGE_AT_DELIVERY,
  DATE_OF_DISCHARGE,
  DATE_OF_DELIVERY
} = INFANT_DATA_ELEMENTS;
const { CHILD_TEIS, MOTHER_DATE_OF_DISCHARGE, MOTHER_DATE_OF_DELIVERY } = DELIVERY_DETAILS_DATA_ELEMENTS;
const { DOB, MOTHER_FIRST_NAME, MOTHER_LAST_NAME, PROVINCE, DISTRICT, VILLAGE, PARENT_PHONE_NUMBER } = EIR_ATTRIBUTES;
const { AGE, SEX, FIRST_NAME, LAST_NAME, MOBILE } = ATTRIBUTES;

const useInfantFormRules = (childIndex) => {
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
  const { changeDataValue, changeDataValues, setEvent } = chrTrackerActions;
  const { currentEvent } = event;
  const childTeisValue = findDataValue(currentEvent.dataValues, CHILD_TEIS);
  const children = JSON.parse(childTeisValue);
  const currentChild = children[childIndex];
  const foundEirEnrollment = currentChild.enrollments.find((enr) => enr.program === "Yj9cJ34AXw6");
  const birthDetailsEvent = foundEirEnrollment.events.find((ev) => ev.programStage === "bwGkn5ebqkD");
  const birthDetailsDataValues = birthDetailsEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});
  const deliveryDetailsDataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  const [disabledFields, setDisabledFields] = useState([]);
  const [helpers, setHelpers] = useState({});
  const [hiddenFields, setHiddenFields] = useState([]);
  const [props, setProps] = useState({});

  useEffect(() => {
    const assignations = [];
    const currentDisabledFields = [MOTHERS_AGE_AT_DELIVERY, DATE_OF_DISCHARGE, DATE_OF_DELIVERY];
    const currentHiddenFields = [];
    const currentHelpers = {};
    const currentProps = {};
    //ASSIGN DATE OF DELIVERY AUTOMATICALLY
    assignations.push({ dataElement: DATE_OF_DELIVERY, value: deliveryDetailsDataValues[DATE_OF_DELIVERY] });

    //ASSIGN MOTHER'S AGE AT DELIVERY ATTRIBUTE AUTOMATICALLY
    const mothersDob = findAttributeValue(currentTei, AGE);
    const motherAge = calculateAge(mothersDob, deliveryDetailsDataValues[MOTHER_DATE_OF_DELIVERY]);
    assignations.push({ dataElement: MOTHERS_AGE_AT_DELIVERY, value: motherAge.years });

    //ASSIGN DATE OF DISCHARGE AUTOMATICALLY
    assignations.push({ dataElement: DATE_OF_DISCHARGE, value: deliveryDetailsDataValues[MOTHER_DATE_OF_DISCHARGE] });

    //ASSIGN DATE OF BIRTH ATTRIBUTE AUTOMATICALLY
    assignations.push({ attribute: DOB, value: deliveryDetailsDataValues[DATE_OF_DELIVERY] });

    //ASSIGN MOTHER'S NAME ATTRIBUTE AUTOMATICALLY
    assignations.push({ attribute: MOTHER_FIRST_NAME, value: findAttributeValue(currentTei, FIRST_NAME) });
    assignations.push({ attribute: MOTHER_LAST_NAME, value: findAttributeValue(currentTei, LAST_NAME) });

    //ASSIGN PARENT'S PHONE NUMBER ATTRIBUTE AUTOMATICALLY
    assignations.push({ attribute: PARENT_PHONE_NUMBER, value: findAttributeValue(currentTei, MOBILE) });

    //ASSIGN PROVINCE, DISTRICT, VILLAGE ATTRIBUTE AUTOMATICALLY
    assignations.push({ attribute: PROVINCE, value: findAttributeValue(currentTei, PROVINCE) });
    assignations.push({ attribute: DISTRICT, value: findAttributeValue(currentTei, DISTRICT) });
    assignations.push({ attribute: VILLAGE, value: findAttributeValue(currentTei, VILLAGE) });

    //ASSIGN VALUES
    const cloned = _.cloneDeep(children);
    const child = _.cloneDeep(cloned[childIndex]);
    const foundEnrollmentIndex = child.enrollments.findIndex((enr) => enr.program === "Yj9cJ34AXw6");
    const foundEventIndex = child.enrollments[foundEnrollmentIndex].events.findIndex((ev) => ev.event === birthDetailsEvent.event);

    assignations.forEach((assignation) => {
      if (assignation.attribute) {
        const foundAttributeIndex = child.attributes.findIndex((attr) => attr.attribute === assignation.attribute);
        if (foundAttributeIndex === -1) {
          child.attributes.push({
            attribute: assignation.attribute,
            value: assignation.value
          });
        } else {
          child.attributes[foundAttributeIndex].value = assignation.value;
        }
      }
      if (assignation.dataElement) {
        const foundDataValueIndex = child.enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues.findIndex(
          (dv) => dv.dataElement === assignation.dataElement
        );
        if (foundDataValueIndex === -1) {
          child.enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues.push({
            dataElement: assignation.dataElement,
            value: assignation.value
          });
        } else {
          child.enrollments[foundEnrollmentIndex].events[foundEventIndex].dataValues[foundDataValueIndex].value = assignation.value;
        }
      }
    });
    cloned[childIndex] = child;
    changeDataValue(CHILD_TEIS, JSON.stringify(cloned));
    setHiddenFields([...currentHiddenFields]);
    setDisabledFields([...currentDisabledFields]);
    setHelpers({ ...currentHelpers });
    setProps({ ...currentProps });
  }, [JSON.stringify(currentTei), JSON.stringify(currentEvent), JSON.stringify(birthDetailsEvent)]);

  return { disabledFields, hiddenFields, helpers, props };
};

export default useInfantFormRules;
