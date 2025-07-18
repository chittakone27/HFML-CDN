import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
//
import { differenceInWeeks, differenceInMonths } from "date-fns";
//
import { DOB_ATTR_ID } from "../const";

const useGrowthMonitorRules = () => {
  const [hiddenFields, setHiddenFields] = useState([]);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { changeDataValue } = actions;
  const { currentTei } = data;

  useEffect(() => {
    // console.log(currentEvent, currentTei);
    let tempHiddenFields = [];
    const dobObj = currentTei.attributes.find((attr) => attr["attribute"] === DOB_ATTR_ID);
    if (currentEvent.eventDate && dobObj && dobObj.value) {
      const currEvtDate = new Date(currentEvent.eventDate);
      const teiDob = new Date(dobObj.value);
      const ageInWeeks = differenceInWeeks(currEvtDate, teiDob);
      const ageInMonths = differenceInMonths(currEvtDate, teiDob);
      changeDataValue(currentEvent.event, "DxOqZZgVQhF", ageInWeeks);
      changeDataValue(currentEvent.event, "MV1yoC7BfnG", ageInMonths);
      if (ageInMonths < 6 ) {
        tempHiddenFields.push("bTz0sXjXF4I","VUn6z5bss2H","fwerjuyn3QC");
      } else if (ageInMonths >= 6 && ageInMonths< 60) {
        tempHiddenFields.push("GVHTqqwolWD");
      } else if (ageInMonths >= 60){
        tempHiddenFields.push("bTz0sXjXF4I","VUn6z5bss2H","fwerjuyn3QC","GVHTqqwolWD");
      } else if (ageInMonths < 12 || ageInMonths > 59) {
        tempHiddenFields.push("DzNWdRvRB11");
      }
      for (const hiddenField of tempHiddenFields) {
        changeDataValue(currentEvent.event, hiddenField, "");
      }
      setHiddenFields([...tempHiddenFields]);
    }
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);

  return { hiddenFields: hiddenFields };
};

export default useGrowthMonitorRules;
