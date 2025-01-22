import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { DATA_ELEMENTS, ATTRIBUTES } from "../const";
import { findDataValue, findAttributeValue } from "@/configs/laotracker/common/utils";
import { useShallow } from "zustand/react/shallow";
import { format, isAfter, isBefore } from "date-fns";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { tracker } from "@/api";
import _ from "lodash";
const { saveEvent, saveTei, saveEnrollment, getReservedValue } = tracker;
const {
  CLIENT_AGE_AT_VISIT,
  IPD_ADMISSION_DATE,
  IPD_STATUS_AT_DISCHARGE,
  IS_PREGNANT_ID,
  DATE_OF_DEATH,
  OUTSIDE_PROVINCE,
  OUTSIDE_DISTRICT,
  IPD_MAIN_DIAGNOSIS_ICD10,
  IDC10_CAUSE_GROUP
} = DATA_ELEMENTS;
const { DOB, SEX, VILLAGE } = ATTRIBUTES;

const useIpdVisitDetailsRules = () => {
  const { t } = useTranslation();
  const { orgUnits, optionSets } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      optionSets: state.optionSets
    }))
  );
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const [icd10ValueSet, setIcd10ValueSet] = useState([]);
  const [props, setProps] = useState({
    hiddenFields: [],
    disableFields: [],
    errorAdmissionDate: false,
    dischargeDate: ""
  });
  const { currentEvent } = useCurrentEvent();
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { setLayout, changeDataValue, changeEventProperty, setHandlers, changeEnrollmentProperty } = actions;
  const { currentTei } = data;

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

  const formatDate = (date) => {
    if (date) {
      return format(new Date(date), "yyyy-MM-dd");
    } else {
      return "";
    }
  };

  const findCustomAttributeValue = (attribute, attributes) => {
    const foundAttributeValue = attributes.find((attr) => attr.attribute.id === attribute);

    return foundAttributeValue ? foundAttributeValue.value : "";
  };

  useEffect(() => {
    let valid = true;
    const newProps = {};
    // newProps[IDC10_CAUSE_GROUP] = { hidden: true };
    const admissionDate = findDataValue(currentEvent.dataValues, IPD_ADMISSION_DATE);
    const eventDate = currentEvent.eventDate.split("T")[0];
    const dob = findAttributeValue(currentTei, DOB);
    const sex = findAttributeValue(currentTei, SEX);
    const ageAtVisit = calculateAgeInYears(dob, eventDate);
    const village = findAttributeValue(currentTei, VILLAGE);
    const ipdStatusAtDischarge = findDataValue(currentEvent.dataValues, IPD_STATUS_AT_DISCHARGE);
    const dateOfDeath = findDataValue(currentEvent.dataValues, DATE_OF_DEATH);
    newProps[IPD_ADMISSION_DATE] = {
      maxDate: formatDate(eventDate),
      helpers: []
    };
    newProps[IS_PREGNANT_ID] = {};
    newProps[DATE_OF_DEATH] = {};
    newProps.eventDate = { helpers: [] };
    newProps[OUTSIDE_DISTRICT] = { hidden: true };
    newProps[OUTSIDE_PROVINCE] = { hidden: true };
    //ASSIGN CLIENT AGE AT VISIT AUTOMATICALLY FROM IPD ADMISSION DATE AND DOB
    changeDataValue(currentEvent.event, CLIENT_AGE_AT_VISIT, ageAtVisit);

    //Admission date must be <= discharge date (event date)
    //Admission date mut be >= DOB
    if (isAfter(new Date(admissionDate), new Date(eventDate))) {
      newProps[IPD_ADMISSION_DATE].helpers.push({
        type: "ERROR",
        value: t("admissionDateMustBeBeforeDischargeDate")
      });
      valid = false;
    }
    if (isBefore(new Date(admissionDate), new Date(dob))) {
      newProps[IPD_ADMISSION_DATE].helpers.push({
        type: "ERROR",
        value: t("admissionDateMustBeAfterDateOfBirth")
      });
      valid = false;
    }

    //Discharge date must be >= DOB
    if (isBefore(new Date(eventDate), new Date(dob))) {
      newProps.eventDate.helpers.push({
        type: "ERROR",
        value: t("dischargeDateMustBeAfterDateOfBirth")
      });
      valid = false;
    }

    // Hide Data element of female when tei is male
    if (sex === "M" || ageAtVisit <= 10) {
      newProps[IS_PREGNANT_ID].hidden = true;
    } else {
      newProps[IS_PREGNANT_ID].hidden = false;
    }

    // Hide the Date of Death data element when the IPD status at discharge is different from "Died"
    const isDead = ipdStatusAtDischarge === "6";

    if (isDead) {
      newProps[DATE_OF_DEATH].hidden = false;
      if (!dateOfDeath) {
        valid = false;
        newProps[DATE_OF_DEATH].helpers = [
          {
            type: "ERROR",
            value: t("dateOfDeathIsMandatory")
          }
        ];
      } else {
        if (isAfter(new Date(dateOfDeath), new Date(eventDate))) {
          newProps[DATE_OF_DEATH].helpers = [
            {
              type: "ERROR",
              value: t("dateOfDeathMustNotAfterDischargeDate")
            }
          ];
          valid = false;
        }
      }
    } else {
      newProps[DATE_OF_DEATH].hidden = true;
      changeDataValue(currentEvent.event, DATE_OF_DEATH, "");
    }
    //Assign discharge date (event date) automatically
    if (!eventDate) {
      changeEventProperty(currentEvent.event, "eventDate", formatDate(new Date()));
    }

    //Assign outside province/district automatically
    const foundVillage = orgUnits.find((ou) => ou.id === village);
    const foundVillageProvince = findCustomAttributeValue("AExdcxSHkXj", foundVillage.attributeValues);
    const foundVillageDistrict = findCustomAttributeValue("DUuCROLcoik", foundVillage.attributeValues);
    if (foundVillage && foundVillageProvince && foundVillageDistrict) {
      const facilityAncestors = orgUnit.ancestors.map((a) => a.id);
      const outsideProvince = !facilityAncestors.includes(foundVillageProvince);
      const outsideDistrict = !facilityAncestors.includes(foundVillageDistrict);
      changeDataValue(currentEvent.event, OUTSIDE_PROVINCE, outsideProvince ? "true" : "");
      changeDataValue(currentEvent.event, OUTSIDE_DISTRICT, outsideDistrict ? "true" : "");
    } else {
      changeDataValue(currentEvent.event, OUTSIDE_PROVINCE, "");
      changeDataValue(currentEvent.event, OUTSIDE_DISTRICT, "");
    }

    //Assign value for Cause group based on the value of IPD main diagnosis 1 (ICD 10)
    // const icd10 = findDataValue(
    //   currentEvent.dataValues,
    //   IPD_MAIN_DIAGNOSIS_ICD10
    // );
    // if (icd10) {
    //   const foundIcd10OptionSet = optionSets.find(
    //     (e) => e.id === "ZgqhnzhZZcQ"
    //   );
    //   if (foundIcd10OptionSet) {
    //     const foundOption = foundIcd10OptionSet.options.find(
    //       (e) => e.code === icd10
    //     );
    //     if (foundOption) {
    //       const foundAttributeValue = foundOption.attributeValues.find(
    //         (e) => e.attribute.id === "UBT4QSKzYo4"
    //       );
    //       if (foundAttributeValue) {
    //         changeDataValue(
    //           currentEvent.event,
    //           IDC10_CAUSE_GROUP,
    //           foundAttributeValue.value
    //         );
    //       }
    //     }
    //   }
    // } else {
    //   changeDataValue(currentEvent.event, IDC10_CAUSE_GROUP, "");
    // }
    //

    if (isDead) {
      setHandlers("eventSave", async (currentEvent, currentTei, currentEnrollment) => {
        const foundCodSystemId = currentTei.attributes.find((attr) => attr.attribute === "BfkIayM14MF");
        if (!foundCodSystemId) {
          const codSystemId = await getReservedValue("BfkIayM14MF", "null");
          const clonedTei = _.cloneDeep(currentTei);
          clonedTei.attributes.push({
            attribute: "BfkIayM14MF",
            value: codSystemId[0].value
          });
          await saveTei(clonedTei);
        }
        const eventResult = await saveEvent(currentEvent);
        const newEnrollment = {
          trackedEntityInstance: currentTei.trackedEntityInstance,
          orgUnit: currentEvent.orgUnit,
          enrollmentDate: currentEvent.eventDate,
          program: "ogrOUKoSaWA",
          incidentDate: dateOfDeath,
          events: [
            {
              trackedEntityInstance: currentTei.trackedEntityInstance,
              eventDate: dateOfDeath,
              orgUnit: currentEvent.orgUnit,
              program: "ogrOUKoSaWA",
              programStage: "WlWJt4lVSWw"
            }
          ]
        };
        const clonedCurrentEnrollment = _.cloneDeep(currentEnrollment);
        clonedCurrentEnrollment.status = "COMPLETED";
        const newEnrollmentResult = await saveEnrollment(newEnrollment);
        const currentEnrollmentResult = await saveEnrollment(clonedCurrentEnrollment);
        if (eventResult.ok && newEnrollmentResult.ok && currentEnrollmentResult.ok) {
          changeEnrollmentProperty("status", "COMPLETED");
          return { ok: true };
        } else {
          return { ok: false };
        }
      });
    } else {
      setHandlers("eventSave", null);
    }

    if (!valid) {
      setLayout("disableEventSaveButton", true);
      setLayout("disableEventCompleteButton", true);
    } else {
      setLayout("disableEventSaveButton", false);
      setLayout("disableEventCompleteButton", false);
    }

    setProps({ ...newProps });
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);

  useEffect(() => {
    const foundIcd10OptionSet = optionSets.find((os) => os.id === "ZgqhnzhZZcQ");
    const valueSet = foundIcd10OptionSet.options.map((o) => {
      const value = o.code;
      const foundTranslation = o.translations.find((t) => t.locale === "lo" && t.property === "NAME");
      let labels = [o.name];
      if (foundTranslation) {
        labels.unshift(foundTranslation.value);
      }
      return { value, label: labels.join(" / ") };
    });
    setIcd10ValueSet([...valueSet]);
  }, []);

  return { props, icd10ValueSet };
};

export default useIpdVisitDetailsRules;
