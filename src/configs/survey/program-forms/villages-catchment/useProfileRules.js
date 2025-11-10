import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(useShallow((s) => s.data));
  const attrs = currentTei?.attributes || [];

  const toObj = (list) =>
    Array.isArray(list)
      ? list.reduce((a, x) => ((a[x.attribute] = x.value), a), {})
      : {};

  const A = toObj(attrs);

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const hidden = {};
    // Example:
    // if (String(A["ATTR_FOR_SOURCE_OF_FUNDING"]).toLowerCase() !== "other") {
    //   hidden["ATTR_FOR_FUNDING_OTHER_TEXT"] = true;
    // }

    setProps((p) => ({ ...p, hiddenFields: hidden }));
  }, [JSON.stringify(A)]);

  return props;
};

export default useProfileRules;
