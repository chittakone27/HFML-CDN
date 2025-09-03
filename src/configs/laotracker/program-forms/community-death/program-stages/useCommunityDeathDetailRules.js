import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";

const useCommunityDeathDetailRules = () => {
  const [hiddenFields, setHiddenFields] = useState([]);
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions ?? {};

  useEffect(() => {
    if (!currentEvent) return;

    const tempHiddenFields = [];
    const getDataValue = (dataElementId) =>
      currentEvent?.dataValues?.find((dv) => dv.dataElement === dataElementId)?.value;

    const YOU5UrERj6L = getDataValue("YOU5UrERj6L"); // is foreigner?
    const ImbZ26FXqCY = getDataValue("ImbZ26FXqCY"); // place of death
    const QvX65zeRteX = getDataValue("QvX65zeRteX"); // cause of death
    const zr7r1dtULBg = getDataValue("zr7r1dtULBg"); // relationship

    if (!YOU5UrERj6L) {
      tempHiddenFields.push("kXRyqHLsX8b"); // hide country if not foreigner
    }

    if (ImbZ26FXqCY !== "Other (specify)") {
      tempHiddenFields.push("qXRjL6YHX5l");
      changeDataValue?.(currentEvent.event, "qXRjL6YHX5l", "");
    }

    if (QvX65zeRteX !== "Other (specify)") {
      tempHiddenFields.push("fyDdwAMidRI");
      changeDataValue?.(currentEvent.event, "fyDdwAMidRI", "");
    }

    if (zr7r1dtULBg !== "Other (specify)") {
      tempHiddenFields.push("JxA90BwDj2H");
      changeDataValue?.(currentEvent.event, "JxA90BwDj2H", "");
    }

    setHiddenFields(tempHiddenFields);
  }, [
    currentEvent?.event,
    JSON.stringify(
      (currentEvent?.dataValues || [])
        .filter((d) =>
          ["YOU5UrERj6L", "ImbZ26FXqCY", "QvX65zeRteX", "zr7r1dtULBg"].includes(d.dataElement)
        )
        .map((d) => [d.dataElement, d.value])
    ),
  ]);

  return { hiddenFields };
};

export default useCommunityDeathDetailRules;
