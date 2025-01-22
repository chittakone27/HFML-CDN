import { useLayoutEffect, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

import useTrackerCaptureStore from "@/state/trackerCapture";
import useRuleContext from "./useRuleContext";
import { event } from "@/api";
import _ from "lodash";
const { saveEvent } = event;

//only work with withRules hoc
//callBack return {Object} status
//all status: errors, helpers, warnings, assignations, hiddenFields, hiddenOptions, disabledFields
//hiddenFields, disabledFields example: hiddenFields = {dataElementId: Boolean}
//errors, helpers,warnings example: errors = {dataElementId: "errors text"}
//assignations example: assignations = {dataElementId: value}
//hiddenOptions example: hiddenOptions = {dataElementId: []} //array list option hidden
export const useProfileRuleEffect = (callBack, dependencies) => {
  const { changeAttributeValue } = useTrackerCaptureStore(
    (state) => state.actions,
    shallow
  );
  const { changeRuleState, resetRuleState } = useRuleContext("profile");
  const { currentTei } = useTrackerCaptureStore((state) => state.data, shallow);

  const checkHiddenOptions = (attributeId, options) => {
    const found = currentTei.attributes.find(
      (attribute) =>
        attribute.attribute === attributeId && options.includes(attribute.value)
    );

    return Boolean(found);
  };

  useLayoutEffect(() => {
    resetRuleState();
    const status = callBack();

    const assignations = _.cloneDeep(status.assignations) || {};
    if (status.hiddenFields) {
      Object.keys(status.hiddenFields).forEach((attribute) => {
        if (status.hiddenFields[attribute]) assignations[attribute] = "";
      });
    }
    if (status.hiddenOptions) {
      Object.keys(status.hiddenOptions).forEach((attribute) => {
        const options = status.hiddenOptions[attribute];
        const isClearValue = checkHiddenOptions(attribute, options);
        if (isClearValue) assignations[attribute] = "";
      });
    }
    Object.keys(assignations).forEach((attribute) => {
      changeAttributeValue(attribute, assignations[attribute]);
    });
    changeRuleState(status);
  }, dependencies);
};

//only work with withRules hoc
//callBack return {Object} status
//all status: errors, helpers, warnings, assignations, hiddenFields, hiddenOptions, disabledFields
//hiddenFields, disabledFields example: hiddenFields = {dataElementId: Boolean}
//errors, helpers,warnings example: errors = {dataElementId: "errors text"}
//assignations example: assignations = {dataElementId: value}
//hiddenOptions example: hiddenOptions = {dataElementId: []} //array list option hidden
export const useEventRuleEffect = (callBack, dependencies) => {
  const { changeRuleState, resetRuleState } = useRuleContext("event");
  const [toBeSaved, setToBeSaved] = useState(false);

  const { changeDataValue, changeEventProperty } = useTrackerCaptureStore(
    (state) => state.actions,
    shallow
  );
  const { currentTei, currentEvents, selectedEvent } = useTrackerCaptureStore(
    (state) => state.data,
    shallow
  );
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);

  const checkHiddenOptions = (dataElement, options) => {
    const found = currentEvent.dataValues.find(
      (de) => de.dataElement === dataElement && options.includes(value)
    );

    return Boolean(found);
  };

  const isDirty = (assignations) => {
    let isDirty = false;
    Object.keys(assignations).forEach((dataElement) => {
      const foundDataValue = currentEvent.dataValues.find(
        (de) => de.dataElement === dataElement
      );

      if (!foundDataValue) {
        if (!assignations[dataElement]) return;
        isDirty = true;
        return;
      }
      if (foundDataValue.value !== assignations[dataElement]) {
        isDirty = true;
      }
    });

    //if current event dirty, data value field change but not on blur, so assign rule don't run
    // if (!currentEvent.isDirty) {
    //   changeEventProperty(currentEvent.event, "isDirty", true);
    //   return;
    // }

    return isDirty;
  };

  const changeAssignations = (assignations) => {
    Object.keys(assignations).forEach((dataElement) => {
      changeDataValue(
        currentEvent.event,
        dataElement,
        assignations[dataElement]
      );
    });
  };

  useEffect(() => {
    (async () => {
      if (toBeSaved) {
        const result = await saveEvent(currentEvent);
        if (result.ok) {
          changeEventProperty(currentEvent.event, "isDirty", false);
        } else {
          changeEventProperty(currentEvent.event, "isDirty", true);
        }
        setToBeSaved(false);
      }
    })();
  }, [toBeSaved]);

  useLayoutEffect(() => {
    resetRuleState();
    const status = callBack() || {};

    const assignations = _.cloneDeep(status.assignations) || {};
    if (status.hiddenFields) {
      Object.keys(status.hiddenFields).forEach((dataElement) => {
        if (status.hiddenFields[dataElement]) assignations[dataElement] = "";
      });
    }
    if (status.hiddenOptions) {
      Object.keys(status.hiddenOptions).forEach((dataElement) => {
        const options = status.hiddenOptions[dataElement];
        const isClearValue = checkHiddenOptions(dataElement, options);
        if (isClearValue) assignations[dataElement] = "";
      });
    }
    if (isDirty(assignations)) {
      changeAssignations(assignations);
      setToBeSaved(true);
    }
    changeRuleState(status);
  }, dependencies);
};
