import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";

const convertListToObj = (list, keyProperty, valueProperty) =>
  list
    ? list.reduce((result, current) => {
        result[current[keyProperty]] = valueProperty
          ? current[valueProperty]
          : current;
        return result;
      }, {})
    : {};

const STATUS_ATTR = "H6D3yonJvno";
const TARGET_ATTR = "YoXa89MGtIf";

const norm = (v) => String(v ?? "").trim().toLowerCase();

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => state.data)
  );

  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : {};

  const statusRaw = attributes[STATUS_ATTR];
  const status = norm(statusRaw); 

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const hiddenFields = {};

    if (!status || status === "functioning") {
      hiddenFields[TARGET_ATTR] = true;
    }

    setProps((prev) => ({ ...prev, hiddenFields }));
  }, [status]); 

  return props; 
};

export default useProfileRules;
