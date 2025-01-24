import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useShallow } from "zustand/react/shallow";
//
import { differenceInWeeks, differenceInMonths } from "date-fns";
//
import { DOB_ATTR_ID } from "./const";

const useGrowthMonitorRules = () => {
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
    console.log(currentEvent, currentTei);
    const dobObj = currentTei.attributes.find(
      (attr) => attr["attribute"] === DOB_ATTR_ID
    );
    if (currentEvent.eventDate && dobObj && dobObj.value) {
      const currEvtDate = new Date(currentEvent.eventDate);
      const teiDob = new Date(dobObj.value);
      const ageInWeeks = differenceInWeeks(currEvtDate, teiDob);
      const ageInMonths = differenceInMonths(currEvtDate, teiDob);
      //   console.log(ageInWeeks, ageInMonths);
      changeDataValue(currentEvent.event, "DxOqZZgVQhF", ageInWeeks);
      changeDataValue(currentEvent.event, "MV1yoC7BfnG", ageInMonths);
    }
  }, [JSON.stringify(currentEvent), JSON.stringify(currentTei)]);

  return 0;
};

export default useGrowthMonitorRules;
