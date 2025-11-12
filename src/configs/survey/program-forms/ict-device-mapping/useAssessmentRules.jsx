import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";

const norm = (s) => String(s ?? "").toLowerCase().trim();

const useProfileRules = () => {
  const { currentTei } = useTrackerCaptureStore(
    useShallow((state) => state.data)
  );

  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : {};

  const sourceOfFunding = norm(attributes["VDtUCd4xomY"]);

  const deviceType = norm(attributes["xQrdgnlPcC3"]);

  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  useEffect(() => {
    const hidden = {};

    hidden["tDri5optbSF"] = sourceOfFunding !== "other";

     const hideFor = {
      laptop: ["XRdw8EK5FJg", "azMLZ6HjJzX"],
      tablet: ["leCxCv4ZFaX", "rIHJFrYHA27"],
      desktop: ["leCxCv4ZFaX", "rIHJFrYHA27", "XRdw8EK5FJg"],
      "smart phone": ["rIHJFrYHA27", "azMLZ6HjJzX", "leCxCv4ZFaX"],
      smartphone: ["rIHJFrYHA27", "azMLZ6HjJzX", "leCxCv4ZFaX"],
    };

    const toHide = hideFor[deviceType] ?? [];
    toHide.forEach((attrId) => {
      hidden[attrId] = true;
    });

    setProps((prev) => ({
      ...prev,
      hiddenFields: hidden,
    }));
  }, [sourceOfFunding, deviceType]);

  return props;
};

export default useProfileRules;

const convertListToObj = (list, keyProperty, valueProperty) =>
  Array.isArray(list)
    ? list.reduce((acc, cur) => {
        acc[cur[keyProperty]] = valueProperty ? cur[valueProperty] : cur;
        return acc;
      }, {})
    : {};
