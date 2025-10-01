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

  const getSdMappingByFilterValue = (filterValue, deTypeMapping, filterProp, targetProp) => {
    const finalMapping = {};
    if (!deTypeMapping) return finalMapping;

    for (const sd in deTypeMapping) {
      const entries = deTypeMapping[sd];
      if (!Array.isArray(entries) || !entries.length) continue;

      const sorted = entries.slice().sort((a, b) => a[filterProp] - b[filterProp]);

      let chosen = sorted.find((e) => e[filterProp] == filterValue);

      if (!chosen) {
        if (filterValue <= sorted[0][filterProp]) {
          chosen = sorted[0];
        } else if (filterValue >= sorted[sorted.length - 1][filterProp]) {
          chosen = sorted[sorted.length - 1];
        } else {
          const idx = sorted.findIndex((e) => e[filterProp] > filterValue);
          const prev = sorted[idx - 1];
          const next = sorted[idx];
          chosen = (filterValue - prev[filterProp] <= next[filterProp] - filterValue) ? prev : next;
        }
      }

      finalMapping[sd] = chosen[targetProp];
    }
    return finalMapping;
  };

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
          props.color = "#fff";
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

  useEffect(() => {
    const gender = getAttrVl(attributes, GENDER_ATTR_ID);
    if (GROWTH_MONITORING.hasOwnProperty(gender)) {
      genderMapping.current = { ...GROWTH_MONITORING[gender] }; // includes WEIGHT_FOR_HEIGHT
    }
  }, [attributes]);

  useEffect(() => {
    const SD = genderMapping.current?.WEIGHT_FOR_HEIGHT;
    const height = parseFloat(getDataVl(dataValues, HEIGHT));
    const weight = parseFloat(getDataVl(dataValues, WEIGHT));

    if (!SD || Number.isNaN(height) || Number.isNaN(weight)) {
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

      const roundedHeight = roundNumber(height);
    const table = roundedHeight < 65 ? SD["0to2"] : SD["2to5"]; // height decides the table

    if (!table) {
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

    const mappingAtHeight = getSdMappingByFilterValue(roundedHeight, table, "height", "weight");

    if (!mappingAtHeight || Object.keys(mappingAtHeight).length === 0) {
      changeDataValue(event, WFH_WAST_CORR, "");
      handleSingleDeProps(WFH_WAST_CORR, { ...defaultProps, disabled: true, readOnly: true });
      return;
    }

    const props = getWfhCorrectProps(WFH_WAST_CORR, mappingAtHeight, weight);
    handleSingleDeProps(WFH_WAST_CORR, { ...props, disabled: true, readOnly: true });
  }, [JSON.stringify(attributes), JSON.stringify(dataValues)]);

  return childNutriStatus;
};

export default useChildNutritionStatusRules;
