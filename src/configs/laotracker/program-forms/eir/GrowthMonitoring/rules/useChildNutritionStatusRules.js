import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
//
import { getDataVl, getAttrVl } from "../helper";
import { GENDER_ATTR_ID, GROWTH_MONITOR_DES, BG_COLORS } from "../const";
const {
  WFA_UNDER_RPT,
  HFA_STUNT_RPT,
  WFH_WAST_RPT,
  WFA_UNDER_CORR,
  HFA_STUNT_CORR,
  WFH_WAST_CORR
} = GROWTH_MONITOR_DES;
const { RED, GREEN, YELLOW, ORANGE } = BG_COLORS;
const defaultProps = { backgroundColor: "", helpers: [], color: "#363f4d" };

const useChildNutritionStatusRules = () => {
  const [childNutriStatus, setChildNutriStatus] = useState({
    [WFA_UNDER_RPT]: { ...defaultProps },
    [HFA_STUNT_RPT]: { ...defaultProps },
    [WFH_WAST_RPT]: { ...defaultProps },
    [WFA_UNDER_CORR]: { ...defaultProps },
    [HFA_STUNT_CORR]: { ...defaultProps },
    [WFH_WAST_CORR]: { ...defaultProps }
  });
  const { t } = useTranslation();
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { dataValues, event } = currentEvent;
  const { changeDataValue } = actions;
  const { currentTei } = data;
  const { attributes } = currentTei;
  // console.log(childNutriStatus);

  const handleSingleDeProps = (deId, props) => {
    setChildNutriStatus((prev) => ({
      ...prev,
      [deId]: {
        ...props
      }
    }));
  };

  const getUnderweightAndStuntingStatus = (
    value,
    referredDeId,
    referredDeValue,
    helperTranslateCode
  ) => {
    let props = { ...defaultProps };
    if (value) {
      switch (value) {
        case "Over or equal to -2 SD":
          props.backgroundColor = GREEN;
          break;
        case "Below -2 to -3 SD":
          props.backgroundColor = YELLOW;
          break;
        case "Below -3 SD":
          props.backgroundColor = RED;
          props.color = "#fff";
          break;
        case "Lost follow up":
          (props.backgroundColor = ""), (props.color = "#363f4d");
          changeDataValue(event, referredDeId, "Lost follow up");
          handleSingleDeProps(referredDeId, defaultProps);
          break;
        default:
          break;
      }
      props.helpers =
        value !== referredDeValue
          ? [{ type: "WARNING", value: t(helperTranslateCode) }]
          : [];
      return props;
    } else {
      return props;
    }
  };

  const getWastingStatus = (
    value,
    referredDeId,
    referredDeValue,
    helperTranslateCode
  ) => {
    let props = { ...defaultProps };
    if (value) {
      switch (true) {
        case [
          "Over +2 to +3SD (overweight)",
          "less than -2 to -3SD (MAM)"
        ].includes(value):
          props.backgroundColor = ORANGE;
          break;
        case ["More than +1 to +2 SD", "less than -1 to -2 SD"].includes(value):
          props.backgroundColor = YELLOW;
          break;
        case ["Over +3SD (Obese)", "less than -3SD (SAM)"].includes(value):
          props.backgroundColor = RED;
          props.color = "#fff";
          break;
        case value === "Between -1 to + 1 SD":
          props.backgroundColor = GREEN;
          break;
        case value === "Lost follow up":
          changeDataValue(event, referredDeId, "Lost follow up");
          handleSingleDeProps(referredDeId, defaultProps);
          break;
        default:
          break;
      }
      props.helpers =
        value !== referredDeValue
          ? [{ type: "WARNING", value: t(helperTranslateCode) }]
          : [];
      return props;
    } else {
      return props;
    }
  };

  useEffect(() => {
    const gender = getAttrVl(attributes, GENDER_ATTR_ID);
    console.log(gender);
    /* Handle **Weight For Age - Report** changing */
    const weightForAgeReport = getDataVl(dataValues, WFA_UNDER_RPT);
    const weightForAgeCorrect = getDataVl(dataValues, WFA_UNDER_CORR);
    const weightForAgeProps = getUnderweightAndStuntingStatus(
      weightForAgeReport,
      WFA_UNDER_CORR,
      weightForAgeCorrect,
      "reportUnderweightStatusIsNotCorrect"
    );
    handleSingleDeProps(WFA_UNDER_RPT, weightForAgeProps);
    /* Handle **Height For Age - Report** changing */
    const heightForAgeReport = getDataVl(dataValues, HFA_STUNT_RPT);
    const heightForAgeCorrect = getDataVl(dataValues, HFA_STUNT_CORR);
    const heightForAgeProps = getUnderweightAndStuntingStatus(
      heightForAgeReport,
      HFA_STUNT_CORR,
      heightForAgeCorrect,
      "reportStuntingStatusIsNotCorrect"
    );
    handleSingleDeProps(HFA_STUNT_RPT, heightForAgeProps);
    /* Handle **Weight for height - Report** changing */
    const weightForHeightReport = getDataVl(dataValues, WFH_WAST_RPT);
    const weightForHeightCorrect = getDataVl(dataValues, WFH_WAST_CORR);
    const weightForHeightProps = getWastingStatus(
      weightForHeightReport,
      WFH_WAST_CORR,
      weightForHeightCorrect,
      "reportWastingStatusIsNotCorrect"
    );
    handleSingleDeProps(WFH_WAST_RPT, weightForHeightProps);
  }, [JSON.stringify(attributes), JSON.stringify(dataValues)]);

  return childNutriStatus;
};

export default useChildNutritionStatusRules;
