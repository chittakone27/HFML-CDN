import { useEffect, useState, useRef } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";

import { getDataVl, getAttrVl, roundNumber } from "../helper";
import { GROWTH_MONITORING } from "../mapping";
import { GENDER_ATTR_ID, GROWTH_MONITOR_DES, BG_COLORS } from "../const";

const { WEIGHT, HEIGHT, WFH_WAST_CORR } = GROWTH_MONITOR_DES;
const { RED, GREEN, YELLOW, ORANGE } = BG_COLORS;

const defaultProps = { backgroundColor: "", helpers: [], color: "#363f4d" };

const useChildNutritionStatusRules = () => {
  const genderMapping = useRef({});
  const [childNutriStatus, setChildNutriStatus] = useState({
    [WFH_WAST_CORR]: { ...defaultProps }
  });

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

  // map rows for the chosen height into { "-3SD": w, "-2SD": w, ... }
  const getSdMappingByFilterValue = (filterValue, deTypeMapping, filterProp, targetProp) => {
    const finalMapping = {};
    if (!deTypeMapping) return finalMapping;
    for (const sd in deTypeMapping) {
      const entries = deTypeMapping[sd] || [];
      const hit = entries.find((e) => e[filterProp] == filterValue);
      if (hit) finalMapping[sd] = hit[targetProp];
    }
    return finalMapping;
  };

  // classify ONLY Weight-for-Height
  const getWfhCorrectProps = (deId, mapping, weightVal) => {
    let deValue = "";
    const props = { ...defaultProps };

    if (
      mapping &&
      Object.keys(mapping).length > 0 &&
      weightVal != null &&
      weightVal !== "" &&
      !Number.isNaN(weightVal)
    ) {
      switch (true) {
        case weightVal >= mapping["3SD"] || weightVal < mapping["-3SD"]:
          props.backgroundColor = RED;
          props.color = "#fff !important";
          deValue = weightVal >= mapping["3SD"] ? "Over +3SD (Obese)" : "less than -3SD (SAM)";
          break;

        case (weightVal < mapping["3SD"] && weightVal >= mapping["2SD"]) ||
             (weightVal < mapping["-2SD"] && weightVal >= mapping["-3SD"]):
          props.backgroundColor = ORANGE;
          deValue =
            weightVal < mapping["-2SD"] && weightVal >= mapping["-3SD"]
              ? "less than -2 to -3SD (MAM)"
              : "Over +2 to +3SD (overweight)";
          break;

        case (weightVal < mapping["2SD"] && weightVal >= mapping["1SD"]) ||
             (weightVal < mapping["-1SD"] && weightVal >= mapping["-2SD"]):
          props.backgroundColor = YELLOW;
          deValue =
            weightVal < mapping["-1SD"] && weightVal >= mapping["-2SD"]
              ? "less than -1 to -2 SD"
              : "More than +1 to +2 SD";
          break;

        case weightVal < mapping["1SD"] && weightVal >= mapping["-1SD"]:
          props.backgroundColor = GREEN;
          deValue = "Between -1 to + 1 SD";
          break;

        default:
          deValue = "";
      }
      changeDataValue(event, deId, deValue);
      return props;
    }

    changeDataValue(event, deId, "");
    return props;
  };

  // Load gender-specific tables once
  useEffect(() => {
    const gender = getAttrVl(attributes, GENDER_ATTR_ID);
    if (GROWTH_MONITORING.hasOwnProperty(gender)) {
      genderMapping.current = { ...GROWTH_MONITORING[gender] }; // includes WEIGHT_FOR_HEIGHT
    }
  }, []);

  // Compute ONLY WFH_WAST_CORR from HEIGHT + WEIGHT (no age)
  useEffect(() => {
    const SD = genderMapping.current?.WEIGHT_FOR_HEIGHT;
    const height = parseFloat(getDataVl(dataValues, HEIGHT));
    const weight = parseFloat(getDataVl(dataValues, WEIGHT));

    // guard
    if (!SD || Number.isNaN(height) || Number.isNaN(weight)) {
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

    // choose the correct WHO table by height (length <65cm vs height ≥65cm)
    const roundedHeight = roundNumber(height);
    const table =
      roundedHeight < 65 ? SD["0to2"] : SD["2to5"]; // no AGE used; height decides which table

    if (!table) {
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

    const mappingAtHeight = getSdMappingByFilterValue(roundedHeight, table, "height", "weight");
    if (!mappingAtHeight || Object.keys(mappingAtHeight).length === 0) {
      // no exact row found for that rounded height
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

    const props = getWfhCorrectProps(WFH_WAST_CORR, mappingAtHeight, weight);
    handleSingleDeProps(WFH_WAST_CORR, { ...props, disabled: false, readOnly: false });
  }, [JSON.stringify(attributes), JSON.stringify(dataValues)]);

  return childNutriStatus;
};

export default useChildNutritionStatusRules;
