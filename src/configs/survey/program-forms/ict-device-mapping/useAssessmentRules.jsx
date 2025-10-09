import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
const useAssessmentRules = () => {
  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {},
  });

  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
    }))
  );
  const { currentTei, currentEvents, selectedEvent } = data;
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);

  useEffect(() => {
    const assignations = {};
    const deviceCondition =
      currentEvent.dataValues.find((dv) => dv.dataElement === "OP77Sctj4TR")
        ?.value || "";
    if (deviceCondition === "No longer in this institution - Transfer") {
      assignations["EHemNEq0Zaj"] = "0";
    }

    setProps({ ...props, assignations });
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei?.lastSaved)]);

  return props;
};

export default useAssessmentRules;
