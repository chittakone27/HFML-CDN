import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";

const ATTRIBUTES = {
  HIDE1: "OsoaGZLlAgx",
  HIDE2: "vj8fQVCfEdD",
  CONDITION1: "BaiVwt8jVfg",
  CONDITION2: "qqIRVyMw68b",
  BOOL_CONDITION: "DtqYqC9Xr5Z",
  SHOW_IF_TRUE: "q4lqBvHgv7u"
};

const useCommunityDeathRules = () => {
  const [props, setProps] = useState({});
  const store = useTrackerCaptureStore(
    useShallow((state) => ({
      values: state.eventForm.dataValues,
      changeValue: state.actions.changeAttributeValue,
    }))
  );

  useEffect(() => {
    const { values } = store;
    const newProps = {};

    // Rule 1: Hide HIDE1 and HIDE2 if CONDITION1 > 0 and CONDITION2 is blank
    const condition1Value = parseFloat(values?.[ATTRIBUTES.CONDITION1] || "0");
    const condition2Value = values?.[ATTRIBUTES.CONDITION2] || "";

    if (condition1Value > 0 && condition2Value.trim() === "") {
      newProps[ATTRIBUTES.HIDE1] = { hidden: true };
      newProps[ATTRIBUTES.HIDE2] = { hidden: true };
    }

    // Rule 2: Show SHOW_IF_TRUE if BOOL_CONDITION is true
    const boolCondition = values?.[ATTRIBUTES.BOOL_CONDITION];
    if (boolCondition === "true" || boolCondition === true) {
      newProps[ATTRIBUTES.SHOW_IF_TRUE] = { hidden: false };
    } else {
      newProps[ATTRIBUTES.SHOW_IF_TRUE] = { hidden: true };
    }

    setProps(newProps);
  }, [store.values]);

  return props;
};

export default useCommunityDeathRules;
