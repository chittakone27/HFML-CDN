import useEventCaptureStore from "@/state/eventCapture";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { calculateDiff } from "../utils";

export const useAgeInYearRule = (dateOfBirthId, AgeInYearId) => {
  const {
    currentEvent,
    actions: { setCurrentEventDataValue },
  } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent, actions: state.actions }),
    shallow
  );

  const eventDate = currentEvent.eventDate;

  useEffect(() => {
    const dob = currentEvent.dataValues[dateOfBirthId];
    if (dob && eventDate) {
      const diff = calculateDiff(dob, eventDate);
      if (diff.years) {
        setCurrentEventDataValue(AgeInYearId, diff.years + "");
      } else if (diff.months) {
        setCurrentEventDataValue(AgeInYearId, "0." + diff.months);
      } else if (diff.days) {
        setCurrentEventDataValue(AgeInYearId, "0.1");
      } else {
        setCurrentEventDataValue(AgeInYearId, "");
      }
    } else {
      setCurrentEventDataValue(AgeInYearId, "");
    }
  }, [eventDate, currentEvent.dataValues[dateOfBirthId]]);
};

export const useForeignerRule = (foreignerId, villageSectorIds) => {
  const {
    currentEvent,
    actions: { setCurrentEventDataValue },
  } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent, actions: state.actions }),
    shallow
  );

  useEffect(() => {
    const isForeigner = currentEvent.dataValues[foreignerId];
    if (isForeigner === "true") {
      villageSectorIds.forEach((id) => {
        setCurrentEventDataValue(id, "");
      });
    }
  }, [currentEvent.dataValues[foreignerId]]);
};
