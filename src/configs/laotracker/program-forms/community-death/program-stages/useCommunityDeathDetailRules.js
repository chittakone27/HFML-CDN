import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";

const useCommunityDeathDetailRules = () => {
  const [hiddenFields, setHiddenFields] = useState([]);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;

  useEffect(() => {
    let tempHiddenFields = [];

    const getDataValue = (dataElementId) =>
      currentEvent?.dataValues?.find((dv) => dv.dataElement === dataElementId)?.value;

    const YOU5UrERj6L = getDataValue("YOU5UrERj6L");
    const ImbZ26FXqCY = getDataValue("ImbZ26FXqCY");
    const QvX65zeRteX = getDataValue("QvX65zeRteX");
    const zr7r1dtULBg = getDataValue("zr7r1dtULBg");

    if (!YOU5UrERj6L) {
      tempHiddenFields.push("kXRyqHLsX8b");
    }

    if (ImbZ26FXqCY !== "Other (specify)") {
      tempHiddenFields.push("qXRjL6YHX5l");
      changeDataValue(currentEvent.event, "qXRjL6YHX5l", "");
    }

    if (QvX65zeRteX !== "Other (specify)") {
      tempHiddenFields.push("fyDdwAMidRI");
      changeDataValue(currentEvent.event, "fyDdwAMidRI", "");
    }

    if (zr7r1dtULBg !== "Other (specify)") {
      tempHiddenFields.push("JxA90BwDj2H");
        changeDataValue(currentEvent.event, "JxA90BwDj2H", "");
    }
    setHiddenFields([...tempHiddenFields]);
    
  }, [JSON.stringify(currentEvent)]);

  return { hiddenFields };
};

export default useCommunityDeathDetailRules;
