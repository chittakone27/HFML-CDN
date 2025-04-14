import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import { useEffect, useState } from "react";
import { DATA_ELEMENTS, ATTRIBUTES } from "./ipdVisitDetailsConst";
import { findAttributeValue, findDataValue } from "@/configs/laotracker/common/utils";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { isAfter, isBefore, format } from "date-fns";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
const {
  CLIENT_AGE_AT_VISIT,
  IPD_ADMISSION_DATE,
  IPD_STATUS_AT_DISCHARGE,
  IS_PREGNANT_ID,
  DATE_OF_DEATH,
  OUTSIDE_PROVINCE,
  OUTSIDE_DISTRICT,
  IPD_MAIN_DIAGNOSIS_ICD10,
  IDC10_CAUSE_GROUP,
  IPD_TREATMENT_TYPE
} = DATA_ELEMENTS;
const { DOB, SEX, VILLAGE } = ATTRIBUTES;

const useIpdVisitDetailsRules = () => {
  const { t } = useTranslation();
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );

  const orgUnit = useSelectionStore((state) => state.orgUnit);

  const [props, setProps] = useState({
    disabledFields: [],
    hiddenFields: [],
    fieldProps: {
      [DATE_OF_DEATH]: {},
      eventDate: {},
      preConditions: { [IS_PREGNANT_ID]: {} }
    }
  });
  const { orgUnits } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits
    }))
  );
  const { currentTei } = data;
  const { currentEvent } = event;
  const { setEvent, changeDataValue, changeEventProperty } = actions;

  const findCustomAttributeValue = (attribute, attributes) => {
    const foundAttributeValue = attributes.find((attr) => attr.attribute.id === attribute);

    return foundAttributeValue ? foundAttributeValue.value : "";
  };

  const calculateAgeInYears = (dob, dischargeDate) => {
    let ageInYears = "";
    if (dob && dischargeDate) {
      const dobValue = new Date(dob);
      const dischargeDateValue = new Date(dischargeDate);
      ageInYears = dischargeDateValue.getFullYear() - dobValue.getFullYear();
      const m = dischargeDateValue.getMonth() - dobValue.getMonth();

      if (m < 0 || (m === 0 && dischargeDateValue.getDate() < dobValue.getDate())) {
        ageInYears--;
      }
    }
    return ageInYears;
  };

  useEffect(() => {
    const eventDate = currentEvent.eventDate.split("T")[0];
    const dob = findAttributeValue(currentTei, DOB);
    const sex = findAttributeValue(currentTei, SEX);
    const ageAtVisit = calculateAgeInYears(dob, eventDate);
    const village = findAttributeValue(currentTei, VILLAGE);
    const admissionDate = findDataValue(currentEvent.dataValues, IPD_ADMISSION_DATE);
    const ipdStatusAtDischarge = findDataValue(currentEvent.dataValues, IPD_STATUS_AT_DISCHARGE);
    const dateOfDeath = findDataValue(currentEvent.dataValues, DATE_OF_DEATH);
    const currentHiddenFields = [
      "dLIPYO8wooC",
      "eYGlKgmZyj8",
      "NoXeTahc1E2",
      "uN8LfG3KPgZ",
      "ZwwgoOLFry8",
      "CuKwviFco3q",
      "NqPZMFyhtkj",
      "myFEAEFK8SR"
    ];
    const currentDisabledFields = [];
    const currentFieldProps = {
      [DATE_OF_DEATH]: {},
      eventDate: {},
      preConditions: { [IS_PREGNANT_ID]: {} }
    };

    //Max admission date is event date
    currentFieldProps[IPD_ADMISSION_DATE] = {
      maxDate: format(new Date(eventDate), "yyyy-MM-dd"),
      helpers: []
    };

    //Assign client age at visit automatically
    changeDataValue(CLIENT_AGE_AT_VISIT, ageAtVisit);

    //Admission date must be <= discharge date (event date)
    //Admission date mut be >= DOB
    if (isAfter(new Date(admissionDate), new Date(eventDate))) {
      currentFieldProps[IPD_ADMISSION_DATE].helpers.push({
        type: "ERROR",
        value: t("admissionDateMustBeBeforeDischargeDate")
      });
    }
    if (isBefore(new Date(admissionDate), new Date(dob))) {
      currentFieldProps[IPD_ADMISSION_DATE].helpers.push({
        type: "ERROR",
        value: t("admissionDateMustBeAfterDateOfBirth")
      });
    }
    //Discharge date must be >= DOB
    if (isBefore(new Date(eventDate), new Date(dob))) {
      currentFieldProps.eventDate.helpers.push({
        type: "ERROR",
        value: t("dischargeDateMustBeAfterDateOfBirth")
      });
    }

    // Hide Data element of female when tei is male
    if (sex === "M" || ageAtVisit <= 10) {
      currentFieldProps.preConditions[IS_PREGNANT_ID].hidden = true;
    }

    // Hide the Date of Death data element when the IPD status at discharge is different from "Died"
    const isDead = ipdStatusAtDischarge === "6";

    if (isDead) {
      if (!dateOfDeath) {
        currentFieldProps[DATE_OF_DEATH].helpers = [
          {
            type: "ERROR",
            value: t("dateOfDeathIsMandatory")
          }
        ];
      } else {
        if (isAfter(new Date(dateOfDeath), new Date(eventDate))) {
          currentFieldProps[DATE_OF_DEATH].helpers = [
            {
              type: "ERROR",
              value: t("dateOfDeathMustNotAfterDischargeDate")
            }
          ];
        }
      }
    } else {
      currentHiddenFields.push(DATE_OF_DEATH);
      changeDataValue(DATE_OF_DEATH, "");
    }

    //Assign discharge date (event date) automatically
    if (!eventDate) {
      changeEventProperty(currentEvent.event, "eventDate", format(new Date(), "yyyy-MM-dd"));
    }

    //Assign outside province/district automatically
    const foundVillage = orgUnits.find((ou) => ou.id === village);
    const foundVillageProvince = findCustomAttributeValue("AExdcxSHkXj", foundVillage.attributeValues);
    const foundVillageDistrict = findCustomAttributeValue("DUuCROLcoik", foundVillage.attributeValues);
    if (foundVillage && foundVillageProvince && foundVillageDistrict) {
      const facilityAncestors = orgUnit.ancestors.map((a) => a.id);
      const outsideProvince = !facilityAncestors.includes(foundVillageProvince);
      const outsideDistrict = !facilityAncestors.includes(foundVillageDistrict);
      changeDataValue(OUTSIDE_PROVINCE, outsideProvince ? "true" : "");
      changeDataValue(OUTSIDE_DISTRICT, outsideDistrict ? "true" : "");
    } else {
      changeDataValue(OUTSIDE_PROVINCE, "");
      changeDataValue(OUTSIDE_DISTRICT, "");
    }

    if (isDead && dateOfDeath && currentEvent.status === "COMPLETED") {
      setEvent("disableIncompleteButton", true);
    } else {
      setEvent("disableIncompleteButton", false);
    }

    ////////////////////////////////////////////////////////
    const currentProps = {
      hiddenFields: currentHiddenFields,
      disabledFields: currentDisabledFields,
      fieldProps: currentFieldProps
    };
    setProps({ ...currentProps });
    const errors = [];
    Object.keys(currentFieldProps).forEach((field) => {
      const helpers = currentFieldProps[field].helpers;
      if (helpers) {
        helpers.forEach((helper) => {
          if (helper.type === "ERROR") {
            errors.push(helper.value);
          }
        });
      }
    });

    setEvent("formErrors", errors);
  }, [JSON.stringify(currentEvent)]);

  return props;
};

export default useIpdVisitDetailsRules;
