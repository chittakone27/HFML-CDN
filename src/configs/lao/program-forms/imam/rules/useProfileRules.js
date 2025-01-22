import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import _ from "lodash";
import { tracker } from "@/api";
const { saveTei } = tracker;

const useProfileRules = () => {
  const { data, layout, actions } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      layout: state.layout,
      actions: state.actions
    }),
    shallow
  );

  const { changeAttributeValue } = actions;
  const { currentEvents, currentTei, currentEnrollment } = data;
  const [toBeSaved, setToBeSaved] = useState(false);
  const [props, setProps] = useState({
    zZoGQEghrHp: {
      disabled: true
    },
    tQeFLjYbqzv: {
      disabled: true
    },
    afXHIJ7vIcR: {
      disabled: true
    },
    ZHmuDGwi50G: {
      disabled: true
    },
    RH44eXu8Wwl: {
      disabled: true
    }
  });
  const sortedEvents = _.sortBy(currentEvents, "eventDate").reverse();
  const latestEvent = sortedEvents[0];
  const lastVisitDate = latestEvent ? latestEvent.eventDate : "";
  const nextVisitDate = latestEvent ? latestEvent.dueDate : "";
  const foundTypeOfVisitDataValue = latestEvent ? latestEvent.dataValues.find((dv) => dv.dataElement === "NtnqZYgVfZ5") : "";
  const foundNutritionStatus = latestEvent ? latestEvent.dataValues.find((dv) => dv.dataElement === "cMhs6WKOp5f") : "";
  const foundTreatmentOutcome = latestEvent ? latestEvent.dataValues.find((dv) => dv.dataElement === "VyN7MkSnSVP") : "";
  const lastTypeOfVisit = foundTypeOfVisitDataValue ? foundTypeOfVisitDataValue.value : "";
  const lastNutritionStatus = foundNutritionStatus ? foundNutritionStatus.value : "";
  const lastTreatmentOutcome = foundTreatmentOutcome ? foundTreatmentOutcome.value : "";
  useEffect(() => {
    if (currentEvents.length > 0) {
      changeAttributeValue("oWFcp8NFmOV", lastVisitDate ? lastVisitDate : "");
      changeAttributeValue("B8PuwTK2vGJ", lastTypeOfVisit);
      changeAttributeValue("RH44eXu8Wwl", nextVisitDate);
      changeAttributeValue("ZHmuDGwi50G", lastNutritionStatus);
      changeAttributeValue("afXHIJ7vIcR", lastTreatmentOutcome);
    } else {
      changeAttributeValue("oWFcp8NFmOV", "");
      changeAttributeValue("B8PuwTK2vGJ", "");
      changeAttributeValue("RH44eXu8Wwl", "");
      changeAttributeValue("ZHmuDGwi50G", "");
      changeAttributeValue("afXHIJ7vIcR", "");
    }
    setToBeSaved(true);
  }, [lastVisitDate, lastTypeOfVisit, nextVisitDate, lastNutritionStatus, lastTreatmentOutcome]);

  useEffect(() => {
    (async () => {
      if (toBeSaved && !currentTei.isNew) {
        await saveTei(currentTei);
        setToBeSaved(false);
      }
    })();
  }, [toBeSaved]);

  useEffect(() => {
    if (layout.layout !== "layout2") {
      props.tQeFLjYbqzv.disabled = true;
    } else {
      props.tQeFLjYbqzv.disabled = false;
    }
    setProps({ ...props });
  }, [layout.layout]);

  return props;
};

export default useProfileRules;
