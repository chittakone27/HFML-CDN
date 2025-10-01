import { useEffect, useState, useRef } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { getDataVl, getAttrVl, roundNumber } from "../helper";
import { GROWTH_MONITORING } from "../mapping";
import { GENDER_ATTR_ID, GROWTH_MONITOR_DES, BG_COLORS } from "../const";

const {
  AGE_IN_MONTHS,
  WEIGHT,
  HEIGHT,
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
  const genderMapping = useRef({});
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

  const handleSingleDeProps = (deId, props) => {
    setChildNutriStatus((prev) => ({
      ...prev,
      [deId]: { ...props }
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
          props.backgroundColor = "";
          props.color = "#363f4d";
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
    }
    return props;
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
    }
    return props;
  };

  const getCorrectDeProps = (deId, mapping, valueForCompare, mappingType) => {
    let deValue = "";
    let props = { ...defaultProps };

    if (valueForCompare != null && valueForCompare !== "" && !Number.isNaN(valueForCompare)) {
      if (["WEIGHT_FOR_AGE", "HEIGHT_FOR_AGE"].includes(mappingType)) {
        switch (true) {
          case valueForCompare >= mapping["-2SD"]:
            props.backgroundColor = GREEN;
            deValue = "Over or equal to -2 SD";
            break;
          case valueForCompare < mapping["-2SD"] && valueForCompare >= mapping["-3SD"]:
            props.backgroundColor = YELLOW;
            deValue = "Below -2 to -3 SD";
            break;
          case valueForCompare < mapping["-3SD"]:
            props.backgroundColor = RED;
            props.color = "#fff";
            deValue = "Below -3 SD";
            break;
          default:
            break;
        }
      } else {
        switch (true) {
          case valueForCompare >= mapping["3SD"] || valueForCompare < mapping["-3SD"]:
            props.backgroundColor = RED;
            props.color = "#fff";
            deValue =
              valueForCompare >= mapping["3SD"]
                ? "Over +3SD (Obese)"
                : "less than -3SD (SAM)";
            break;
          case (valueForCompare < mapping["3SD"] && valueForCompare >= mapping["2SD"]) ||
               (valueForCompare < mapping["-2SD"] && valueForCompare >= mapping["-3SD"]):
            props.backgroundColor = ORANGE;
            deValue =
              valueForCompare < mapping["-2SD"] && valueForCompare >= mapping["-3SD"]
                ? "less than -2 to -3SD (MAM)"
                : "Over +2 to +3SD (overweight)";
            break;
          case (valueForCompare < mapping["2SD"] && valueForCompare >= mapping["1SD"]) ||
               (valueForCompare < mapping["-1SD"] && valueForCompare >= mapping["-2SD"]):
            props.backgroundColor = YELLOW;
            deValue =
              valueForCompare < mapping["-1SD"] && valueForCompare >= mapping["-2SD"]
                ? "less than -1 to -2 SD"
                : "More than +1 to +2 SD";
            break;
          case valueForCompare < mapping["1SD"] && valueForCompare >= mapping["-1SD"]:
            props.backgroundColor = GREEN;
            deValue = "Between -1 to + 1 SD";
            break;
          default:
            break;
        }
      }
      changeDataValue(event, deId, deValue);
      return props;
    } else {
      changeDataValue(event, deId, "");
      return props;
    }
  };

  /**
   * Nearest/clamped lookup so we always return an SD mapping even if the exact
   * key (months/height) is missing in mapping.js, or the value is slightly out of range.
   */
  const getSdMappingByFilterValue = (filterValue, deTypeMapping, filterProp, targetProp) => {
    const finalMapping = {};
    for (const sd in deTypeMapping) {
      const entries = deTypeMapping[sd];
      if (!Array.isArray(entries) || !entries.length) continue;

      // Sort ascending by the filter property (e.g., 'months' or 'height')
      const sorted = entries.slice().sort((a, b) => a[filterProp] - b[filterProp]);

      // Try exact match first
      let chosen = sorted.find((e) => e[filterProp] == filterValue);

      if (!chosen) {
        // Clamp to ends
        if (filterValue <= sorted[0][filterProp]) {
          chosen = sorted[0];
        } else if (filterValue >= sorted[sorted.length - 1][filterProp]) {
          chosen = sorted[sorted.length - 1];
        } else {
          // Pick nearest neighbor between the two bounding points
          const idx = sorted.findIndex((e) => e[filterProp] > filterValue);
          const prev = sorted[idx - 1];
          const next = sorted[idx];
          chosen =
            filterValue - prev[filterProp] <= next[filterProp] - filterValue ? prev : next;
        }
      }

      finalMapping[sd] = chosen[targetProp];
    }
    return finalMapping;
  };

  const getWastingMapping = (ageInMonths, wfhMapping) => {
    switch (true) {
      case ageInMonths <= 24:
        return wfhMapping["0to2"];
      case ageInMonths > 24 && ageInMonths <= 120:
        return wfhMapping["2to5"];
      default:
        return null;
    }
  };

  // load gender mapping once attributes are available/updated
  useEffect(() => {
    const gender = getAttrVl(attributes, GENDER_ATTR_ID);
    if (GROWTH_MONITORING.hasOwnProperty(gender)) {
      genderMapping.current = { ...GROWTH_MONITORING[gender] };
    }
  }, [attributes]);

  useEffect(() => {
    const SD_MAPPING = genderMapping.current;
    const ageInMonths = parseFloat(getDataVl(dataValues, AGE_IN_MONTHS));
    const height = parseFloat(getDataVl(dataValues, HEIGHT));
    const weight = parseFloat(getDataVl(dataValues, WEIGHT));

    // report selections
    const weightForAgeReport = getDataVl(dataValues, WFA_UNDER_RPT);
    const heightForAgeReport = getDataVl(dataValues, HFA_STUNT_RPT);
    const weightForHeightReport = getDataVl(dataValues, WFH_WAST_RPT);

    // current correct values (for helper compare)
    const weightForAgeCorrect = getDataVl(dataValues, WFA_UNDER_CORR);
    const heightForAgeCorrect = getDataVl(dataValues, HFA_STUNT_CORR);
    const weightForHeightCorrect = getDataVl(dataValues, WFH_WAST_CORR);

    // REPORT props (always visible)
    handleSingleDeProps(
      WFA_UNDER_RPT,
      getUnderweightAndStuntingStatus(
        weightForAgeReport,
        WFA_UNDER_CORR,
        weightForAgeCorrect,
        "reportUnderweightStatusIsNotCorrect"
      )
    );
    handleSingleDeProps(
      HFA_STUNT_RPT,
      getUnderweightAndStuntingStatus(
        heightForAgeReport,
        HFA_STUNT_CORR,
        heightForAgeCorrect,
        "reportStuntingStatusIsNotCorrect"
      )
    );
    handleSingleDeProps(
      WFH_WAST_RPT,
      getWastingStatus(
        weightForHeightReport,
        WFH_WAST_CORR,
        weightForHeightCorrect,
        "reportWastingStatusIsNotCorrect"
      )
    );

    // helper to disable & clear a CORRECT field until its REPORT is chosen
    const disableCorrect = (deId) => {
      changeDataValue(event, deId, ""); // clear value
      handleSingleDeProps(deId, {
        ...defaultProps,
        disabled: true,  // keep input rendered (layout intact)
        readOnly: true   // never editable
      });
    };

    // Weight-for-Age CORRECT (always non-editable)
    if (weightForAgeReport) {
      if (!Number.isNaN(ageInMonths) && !Number.isNaN(weight) && SD_MAPPING["WEIGHT_FOR_AGE"]) {
        const wfaMonthsMapping = getSdMappingByFilterValue(
          ageInMonths,
          SD_MAPPING["WEIGHT_FOR_AGE"],
          "months",
          "weight"
        );
        const wfaProps = getCorrectDeProps(
          WFA_UNDER_CORR,
          wfaMonthsMapping,
          weight,
          "WEIGHT_FOR_AGE"
        );
        // Keep disabled/readOnly even after auto-fill
        handleSingleDeProps(WFA_UNDER_CORR, { ...wfaProps, disabled: true, readOnly: true });
      } else {
        disableCorrect(WFA_UNDER_CORR);
      }
    } else {
      disableCorrect(WFA_UNDER_CORR);
    }

    // Height-for-Age CORRECT (always non-editable)
    if (heightForAgeReport) {
      if (!Number.isNaN(ageInMonths) && !Number.isNaN(height) && SD_MAPPING["HEIGHT_FOR_AGE"]) {
        const hfaMonthsMapping = getSdMappingByFilterValue(
          ageInMonths,
          SD_MAPPING["HEIGHT_FOR_AGE"],
          "months",
          "height"
        );
        const hfaProps = getCorrectDeProps(
          HFA_STUNT_CORR,
          hfaMonthsMapping,
          height,
          "HEIGHT_FOR_AGE"
        );
        handleSingleDeProps(HFA_STUNT_CORR, { ...hfaProps, disabled: true, readOnly: true });
      } else {
        disableCorrect(HFA_STUNT_CORR);
      }
    } else {
      disableCorrect(HFA_STUNT_CORR);
    }

    // Weight-for-Height CORRECT (always non-editable)
    if (weightForHeightReport) {
      const wfhAgeInmonthsMapping =
        SD_MAPPING["WEIGHT_FOR_HEIGHT"] && getWastingMapping(ageInMonths, SD_MAPPING["WEIGHT_FOR_HEIGHT"]);
      if (wfhAgeInmonthsMapping && !Number.isNaN(height) && !Number.isNaN(weight)) {
        const finalHeight = roundNumber(height);
        const wfhFinalMapping = getSdMappingByFilterValue(
          finalHeight,
          wfhAgeInmonthsMapping,
          "height",
          "weight"
        );
        const wfhProps = getCorrectDeProps(
          WFH_WAST_CORR,
          wfhFinalMapping,
          weight,
          "WEIGHT_FOR_HEIGHT"
        );
        handleSingleDeProps(WFH_WAST_CORR, { ...wfhProps, disabled: true, readOnly: true });
      } else {
        disableCorrect(WFH_WAST_CORR);
      }
    } else {
      disableCorrect(WFH_WAST_CORR);
    }
  }, [JSON.stringify(attributes), JSON.stringify(dataValues)]);

  return childNutriStatus;
};

export default useChildNutritionStatusRules;
