import { useState, useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "../state";
import { useShallow } from "zustand/react/shallow";

const useNcleCommunicableDiseasesRules = () => {
  const [disabledFields, setDisabledFields] = useState([]);
  const [helpers, setHelpers] = useState({});
  const [hiddenFields, setHiddenFields] = useState([]);
  const { data, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions
    }))
  );
  const { event, chrTrackerActions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      chrTrackerActions: state.actions
    }))
  );
  const { currentEvents } = data;
  const { changeDataValue } = chrTrackerActions;
  const { currentEvent } = event;
  const [props, setProps] = useState({});

  const dataValues = currentEvent.dataValues.reduce((prev, curr) => {
    prev[curr.dataElement] = curr.value;
    return prev;
  }, {});

  useEffect(() => {
    const currentHiddenFields = [];
    if (dataValues["Dyq13cMGMzT"] === "1") {
      currentHiddenFields.push("xtbLyF9Euaq");
      changeDataValue("xtbLyF9Euaq", "");
    }
    setHiddenFields([...currentHiddenFields]);
  }, [JSON.stringify(currentEvent)]);

  return {
    disabledFields,
    hiddenFields,
    helpers,
    props
  };
};
export default useNcleCommunicableDiseasesRules;
