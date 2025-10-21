import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import useTrackerCaptureStore from "@/state/trackerCapture";

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => state.data)
  );
  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : {};
  const sourceOfFunding = attributes["VDtUCd4xomY"];

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const hiddenFields = {};
    if (sourceOfFunding !== "other") {
      hiddenFields["soRnoQqwciC"] = true;
    }
    setProps({ ...props, hiddenFields });
  }, [sourceOfFunding]);
  return props;
};

export default useProfileRules;

const convertListToObj = (list, keyProperty, valueProperty) =>
  list
    ? list.reduce((result, current) => {
        result[current[keyProperty]] = valueProperty
          ? current[valueProperty]
          : current;

        return result;
      }, {})
    : {};
