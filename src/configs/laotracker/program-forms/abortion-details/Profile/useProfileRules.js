import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import useTrackerCaptureStore from "@/state/trackerCapture";

const ATTRIBUTES = {
  AGE: "tQeFLjYbqzv",
  SEX: "DmuazFb368B",
};

const useProfileRules = () => {
  const [props, setProps] = useState({
    [ATTRIBUTES.SEX]: {
      disabled: true,
    },
  });
  const actions = useTrackerCaptureStore(useShallow((state) => state.actions));

  //ASSIGN SEX FEMALE AUTOMATICALLY
  useEffect(() => {
    try {
      actions.changeAttributeValue(ATTRIBUTES.SEX, "F");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return props;
};

export default useProfileRules;
