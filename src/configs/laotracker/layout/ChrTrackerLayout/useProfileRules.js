import { useEffect } from "react";
import useChrTrackerStore from "./state";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import { findAttributeValue } from "../../common/utils";
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
    const helpers = [
      {
        target: "oPKsfqS64oE",
        type: "HELPER",
        value: t("clientHealthIdWarning1")
      }
    ];
    const disabledFields = ["oPKsfqS64oE", "BaiVwt8jVfg", "vJdG29KW1Et"];
    let hiddenFields = ["I40YqLHbAvE", ...Object.values(identificationFieldMapping)];
    const foundAgeInYearAttribute = program.programTrackedEntityAttributes.find((ptea) => ptea.trackedEntityAttribute.id === "BaiVwt8jVfg");
    const foundAge = findAttributeValue(currentTei, "tQeFLjYbqzv");
    const foundMobile = findAttributeValue(currentTei, "RwoKpuIgMmA");
    const foundIdentificationField = findAttributeValue(currentTei, "UsQwqMatstH");

    if (foundAge && foundAgeInYearAttribute) {
      const currentInitialDate = new Date(currentEnrollment.enrollmentDate);
      const currentDate = new Date(foundAge);
      const diff = new Date(currentInitialDate.getTime() - currentDate.getTime());
      const years = diff.getUTCFullYear() - 1970;
      changeAttributeValue("BaiVwt8jVfg", years + "");
    }

    if (["vqNgkw4gfw7", "fflLsS1lm3g", "AyPkCOMmgdd", "u1Na9wCGY6d"].includes(program.id)) {
      disabledFields.push("DmuazFb368B");
      changeAttributeValue("DmuazFb368B", "F");
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
      let newValue = foundMobile.replace(/\D/g, "");
      if (newValue.length < 11) {
        helpers.push({
          target: "RwoKpuIgMmA",
          type: "ERROR",
          value: t("invalidPhoneNumber")
        });
      }
      if (newValue.length > 11) {
        newValue = newValue.substring(0, 11);
      }
      changeAttributeValue("RwoKpuIgMmA", newValue);
    }

    setProfile("helpers", helpers);
    setProfile("disabledFields", disabledFields);
    setProfile("hiddenFields", hiddenFields);
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
