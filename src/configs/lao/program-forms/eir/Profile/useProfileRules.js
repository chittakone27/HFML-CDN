import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import moment from "moment";

import {
  useProfileRuleEffect,
  convertListToObj,
} from "@/configs/lao/program-forms/common/tracker";
import useTrackerCaptureStore from "@/state/trackerCapture";

const useProfileRules = (isProfile) => {
  const { t } = useTranslation();
  const { currentTei, currentEnrollment } = useTrackerCaptureStore(
    (state) => state.data,
    shallow
  );
  const { changeAttributeValue } = useTrackerCaptureStore(
    (state) => state.actions,
    shallow
  );

  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : {};

  const nationality = attributes["uR9XK6AbPvE"];
  const dob = attributes["tQeFLjYbqzv"];
  const sex = attributes["DmuazFb368B"];
  const currentUniqueId = attributes["oPKsfqS64oE"];
  const { enrollmentDate } = currentEnrollment;

  useEffect(() => {
    if (dob) {
      const dateOfBirth = moment(dob.slice(0, 10));
      const enrDateConverted = moment(enrollmentDate.slice(0, 10));
      changeAttributeValue(
        "vJdG29KW1Et",
        enrDateConverted.diff(dateOfBirth, "months")
      );
    }

    //&& mode === "registration"
    if (dob && sex && !isProfile) {
      const randomNumber = [
        Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        // Math.floor(Math.random() * (9 - 0 + 1)) + 0,
        // Math.floor(Math.random() * (9 - 0 + 1)) + 0
      ];
      const dateOfBirth = moment(dob.slice(0, 10));
      const childUniqueId = `${moment(dateOfBirth).format("DDMMYYYY")}-${
        sex === "M" ? "1" : "2"
      }-${randomNumber.join("")}`;
      if (childUniqueId !== currentUniqueId) {
        changeAttributeValue("oPKsfqS64oE", childUniqueId);
      }
    }

    if (dob && sex && isProfile) {
      const generatedNumber = attributes["oPKsfqS64oE"].split("-")[2];
      const childUniqueId = `${moment(dob).format("DDMMYYYY")}-${
        sex === "M" ? "1" : "2"
      }-${generatedNumber}`;
      if (childUniqueId !== currentUniqueId) {
        changeAttributeValue("oPKsfqS64oE", childUniqueId);
      }
    }
  }, [dob, enrollmentDate, sex, isProfile]);

  useEffect(() => {
    if (!nationality) changeAttributeValue("uR9XK6AbPvE", "LA");
  }, [nationality]);

  useProfileRuleEffect(() => {
    const helpers = {
      oPKsfqS64oE: t("childUniqueIdWarning"),
    };
    const disabledFields = {
      vJdG29KW1Et: true,
      oPKsfqS64oE: true,
    };
    return { helpers, disabledFields };
  }, []);
};

export default useProfileRules;
