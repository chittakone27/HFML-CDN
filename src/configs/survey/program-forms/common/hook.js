import useEventCaptureStore from "@/state/eventCapture";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

// Calculates age difference and returns {years, months}
const calculateDiff = (dob, eventDate) => {
  if (!dob || !eventDate) return { years: 0, months: 0 };

  const [dobYear, dobMonth, dobDay] = dob.split("-").map(Number);
  const [eYear, eMonth, eDay] = eventDate.split("-").map(Number);

  let years = eYear - dobYear;
  let months = eMonth - dobMonth;
  let days = eDay - dobDay;

  if (days < 0) {
    months -= 1;
    days += 30; // approximate
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // If age >= 1 year → show years only, months = 0
  if (years >= 1) {
    months = 0;
  }

  return { years: Math.max(years, 0), months: Math.max(months, 0) };
};

export const useAgeInYearRule = (dateOfBirthId, AgeInYearId, monthInYearId) => {
  const { currentEvent, status, actions } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      status: state.status,
      actions: state.actions,
    }),
    shallow
  );

  const eventDate = currentEvent?.dataValues?.["uQ9r3BuELco"]; // death/event date

  useEffect(() => {
    const dob = currentEvent?.dataValues?.[dateOfBirthId];
    let hidden = [...(status?.hiddenFields || [])];

    if (!eventDate) {
      // No event date → show both fields
      hidden = hidden.filter((id) => id !== AgeInYearId && id !== monthInYearId);
      actions.setStatus("hiddenFields", hidden);
      return;
    }

    if (dob) {
      const diff = calculateDiff(dob, eventDate);

      if (diff.years >= 1) {
        // Person >= 1 year → show years, hide months
        actions.setCurrentEventDataValue(AgeInYearId, String(diff.years));
        actions.setCurrentEventDataValue(monthInYearId, "0");

        hidden = hidden.filter((id) => id !== AgeInYearId);
        if (!hidden.includes(monthInYearId)) hidden.push(monthInYearId);
      } else {
        // Person < 1 year → show months, hide years
        actions.setCurrentEventDataValue(AgeInYearId, "0");
        actions.setCurrentEventDataValue(monthInYearId, String(diff.months));

        hidden = hidden.filter((id) => id !== monthInYearId);
        if (!hidden.includes(AgeInYearId)) hidden.push(AgeInYearId);
      }
    } else {
      // No DOB → hide both
      if (!hidden.includes(AgeInYearId)) hidden.push(AgeInYearId);
      if (!hidden.includes(monthInYearId)) hidden.push(monthInYearId);
    }

    actions.setStatus("hiddenFields", hidden);
  }, [currentEvent?.dataValues?.[dateOfBirthId], eventDate]);
};
/**
 * Clears village fields if the person is marked as foreigner.
 */
export const useForeignerRule = (foreignerId, villageSectorIds) => {
  const { currentEvent, actions } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
    }),
    shallow
  );

  useEffect(() => {
    const isForeigner = currentEvent?.dataValues?.[foreignerId];
    if (isForeigner === "true") {
      villageSectorIds.forEach((id) => actions.setCurrentEventDataValue(id, ""));
    }
  }, [currentEvent?.dataValues?.[foreignerId]]);
};

/**
 * Clears "Other" fields if ethnicity is "ອື່ນໆ".
 */
export const useEthnicityRule = (ethnicityId, fieldAnotherIds) => {
  const { currentEvent, actions } = useEventCaptureStore(
    (state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions,
    }),
    shallow
  );

  useEffect(() => {
    const isEthnicity = currentEvent?.dataValues?.[ethnicityId];
    if (isEthnicity === "ອື່ນໆ") {
      const ids = Array.isArray(fieldAnotherIds) ? fieldAnotherIds : [fieldAnotherIds];
      ids.forEach((id) => actions.setCurrentEventDataValue(id, ""));
    }
  }, [currentEvent?.dataValues?.[ethnicityId]]);
};