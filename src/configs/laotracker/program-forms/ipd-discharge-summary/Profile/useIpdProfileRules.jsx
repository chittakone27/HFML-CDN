import { useEffect, useState } from "react";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { DATA_ELEMENTS, ATTRIBUTES } from "../const";
import { findAttributeValue } from "@/configs/laotracker/common/utils";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
const { IS_PREGNANT_ID } = DATA_ELEMENTS;
const { SEX, DOB } = ATTRIBUTES;

const useIpdProfileRules = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    hiddenFields: [],
    disableFields: [],
    warningSex: false,
    vJdG29KW1Et: { hidden: true }
  });
  const [prevSex, setPrevSex] = useState("");
  const { currentEvent } = useCurrentEvent();
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { setLayout } = actions;
  const { currentTei, currentEvents, currentEnrollment } = data;

  const calculateAgeInYears = (dob, date) => {
    let ageInYears = "";
    if (dob && date) {
      const dobValue = new Date(dob);
      const dischargeDateValue = new Date(date);
      ageInYears = dischargeDateValue.getFullYear() - dobValue.getFullYear();
      const m = dischargeDateValue.getMonth() - dobValue.getMonth();

      if (m < 0 || (m === 0 && dischargeDateValue.getDate() < dobValue.getDate())) {
        ageInYears--;
      }
    }
    return ageInYears;
  };

  useEffect(() => {
    const sex = findAttributeValue(currentTei, SEX);
    const dob = findAttributeValue(currentTei, DOB);
    const age = calculateAgeInYears(dob, currentEnrollment.enrollmentDate);
    setPrevSex(sex);
    let warningSex = false;
    const firstCondition = age <= 10 && sex === "F";
    const secondCondition = sex === "M" && (prevSex === "F" || prevSex === "");
    const thirdCondition =
      currentEvents.filter((event) => event.dataValues.find((dataValue) => dataValue.dataElement === IS_PREGNANT_ID)?.value).length > 0;
    if ((firstCondition || secondCondition) && thirdCondition) {
      warningSex = true;
      props.warningSex = warningSex;
    }

    if (warningSex) {
      props.DmuazFb368B = {
        helpers: [
          {
            type: "WARNING",
            value: t("pregnantWarning")
          }
        ]
      };
    } else {
      props.DmuazFb368B = {};
    }
    setTimeout(() => {
      if (currentEnrollment && currentEnrollment.status === "COMPLETED") {
        setLayout("disableCompleteButton", true);
        setLayout("disableProfileSaveButton", true);
        setLayout("disableEventSaveButton", true);
        setLayout("disableEventEditButton", true);
        setLayout("disableEventCompleteButton", true);
        setLayout("disableEventCreateButton", true);
        setLayout("disableEventDeleteButton", true);
        setLayout("disableProfileEditButton", true);
      }
    }, 500);

    setProps({ ...props });
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei), JSON.stringify(currentEnrollment)]);

  return props;
};

export default useIpdProfileRules;
