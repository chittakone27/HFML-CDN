import { useEffect } from "react";
import useChrTrackerStore from "./state";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import { findAttributeValue } from "../../common/utils";
import { format } from "date-fns";
const identificationFieldMapping = {
  cvid: "FB3Ro1hJ9ht",
  nationalid: "lRZGCESE6v2",
  passportnumber: "pjpnF7u5PQj",
  systemcvid: "corXnplgfQ7",
  insurancenumber: "ebLsZHyGHYx",
  familybooknumber: "gSImG6wxCkY",
  laogreennationalidbottom: "E0zWSujcGQC"
};

const useProfileRules = () => {
  const { t } = useTranslation();
  const { layout, actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data
    }))
  );
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { profile, chrTrackerActions } = useChrTrackerStore(
    useShallow((state) => ({
      profile: state.profile,
      chrTrackerActions: state.actions
    }))
  );
  const { changeAttributeValue, setLayout } = actions;
  const { setProfile } = chrTrackerActions;
  const { currentTei, currentEnrollment } = data;

  useEffect(() => {
    const props = {
      tQeFLjYbqzv: { maxDate: currentEnrollment.enrollmentDate }
    };
    const helpers = [
      {
        target: "oPKsfqS64oE",
        type: "HELPER",
        value: t("clientHealthIdWarning1")
      }
    ];
    const disabledFields = ["oPKsfqS64oE", "BaiVwt8jVfg", "vJdG29KW1Et"];
    let hiddenFields = ["I40YqLHbAvE", "vJdG29KW1Et", ...Object.values(identificationFieldMapping)];
    if (program.id === "ck0rft9jVlF") {
      hiddenFields.push("IdwH3mwSy2o");
    }
    const foundAgeInYearAttribute = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === "BaiVwt8jVfg");
    const foundDob = findAttributeValue(currentTei, "tQeFLjYbqzv");
    const foundMobile = findAttributeValue(currentTei, "RwoKpuIgMmA");
    const foundIdentificationField = findAttributeValue(currentTei, "UsQwqMatstH");

    if (foundDob && foundAgeInYearAttribute) {
      let date1 = foundDob;
      let date2 = undefined;
      if (currentEnrollment && currentEnrollment.enrollmentDate) {
        date2 = currentEnrollment.enrollmentDate;
      } else if (currentTei.created) {
        date2 = format(new Date(currentTei.created), "yyyy-MM-dd");
      }

      if (date1 > date2) [date1, date2] = [date2, date1];

      const d1 = new Date(date1);
      const d2 = new Date(date2);

      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();

      // Adjust days and months if needed
      if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }
      changeAttributeValue("BaiVwt8jVfg", years + "");
    }

    if (["vqNgkw4gfw7", "fflLsS1lm3g", "AyPkCOMmgdd", "u1Na9wCGY6d"].includes(program.id)) {
      disabledFields.push("DmuazFb368B");
      changeAttributeValue("DmuazFb368B", "F");
      hiddenFields.push("DtqYqC9Xr5Z");
    }

    if (layout.layout === "layout2") {
      helpers.push({
        target: "oPKsfqS64oE",
        type: "HELPER",
        value: t("clientHealthIdWarning2")
      });
    }

    if (foundIdentificationField) {
      Object.keys(identificationFieldMapping).forEach((key) => {
        if (key !== foundIdentificationField) {
          changeAttributeValue(identificationFieldMapping[key], "");
        } else {
          hiddenFields = hiddenFields.filter((hf) => hf !== identificationFieldMapping[key]);
        }
      });
    }

    program.programTrackedEntityAttributes
      .filter((ptea) => ptea.mandatory)
      .forEach((ptea) => {
        const foundValue = findAttributeValue(currentTei, ptea.trackedEntityAttribute.id);
        if (!foundValue) {
          helpers.push({
            target: ptea.trackedEntityAttribute.id,
            type: "ERROR",
            value: t("thisFieldIsRequired")
          });
        }
      });
    if (foundMobile) {
      let newValue;
      if (foundMobile.includes("unknown") || foundMobile.includes("dontHave")) {
        newValue = foundMobile;
        changeAttributeValue("RwoKpuIgMmA", newValue);
      } else {
        newValue = foundMobile.replace(/\D/g, "");

        if (newValue.substring(0, 3) === "030" && newValue.length < 10) {
          helpers.push({
            target: "RwoKpuIgMmA",
            type: "ERROR",
            value: t("invalidPhoneNumber")
          });
        }
        if (newValue.substring(0, 3) === "020" && newValue.length < 11) {
          helpers.push({
            target: "RwoKpuIgMmA",
            type: "ERROR",
            value: t("invalidPhoneNumber")
          });
        }
        if (newValue.substring(0, 3) === "030" && newValue.length > 10) {
          newValue = newValue.substring(0, 10);
        }
        if (newValue.substring(0, 3) === "020" && newValue.length > 11) {
          newValue = newValue.substring(0, 11);
        }
        changeAttributeValue("RwoKpuIgMmA", newValue);
      }
    }

    setProfile("helpers", helpers);
    setProfile("disabledFields", disabledFields);
    setProfile("hiddenFields", hiddenFields);
    setProfile("props", props);
  }, [JSON.stringify(currentTei.attributes), currentTei.trackedEntityInstance, program.id]);

  useEffect(() => {
    const foundCountry = findAttributeValue(currentTei, "uR9XK6AbPvE");
    if (!foundCountry) {
      changeAttributeValue("uR9XK6AbPvE", "LA");
    }
    if (layout.layout === "layout2") {
      setLayout("profileFormEditing", true);
    }
  }, []);
};

export default useProfileRules;
