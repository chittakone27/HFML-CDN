import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import moment from "moment";

import { convertListToObj } from "@/configs/lao/program-forms/common/tracker";
import useTrackerCaptureStore from "@/state/trackerCapture";

const useProfileRules = () => {
  const { t } = useTranslation();
  const { currentTei, currentEnrollment } = useTrackerCaptureStore((state) => state.data, shallow);
  const { changeAttributeValue } = useTrackerCaptureStore((state) => state.actions, shallow);
  const attributes = currentTei ? convertListToObj(currentTei.attributes, "attribute", "value") : {};
  const nationality = attributes["uR9XK6AbPvE"];
  const dob = attributes["tQeFLjYbqzv"];
  const { enrollmentDate } = currentEnrollment;

  useEffect(() => {
    if (dob) {
      const dateOfBirth = moment(dob.slice(0, 10));
      const enrDateConverted = moment(enrollmentDate.slice(0, 10));
      changeAttributeValue("vJdG29KW1Et", enrDateConverted.diff(dateOfBirth, "months"));
    }
  }, [dob, enrollmentDate]);

  useEffect(() => {
    if (!nationality) {
      changeAttributeValue("uR9XK6AbPvE", "LA");
    }
  }, [nationality]);
};

export default useProfileRules;
