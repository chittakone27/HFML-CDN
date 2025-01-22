import useDataEntryStore from "@/state/dataEntry";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

const useControlBarLogics = () => {
  const { program, dataSet, orgUnit, period, attributeOptionCombo } = useSelectionStore(
    (state) => ({
      program: state.program,
      dataSet: state.dataSet,
      orgUnit: state.orgUnit,
      period: state.period,
      attributeOptionCombo: state.attributeOptionCombo
    }),
    shallow
  );

  const { layout: trackerLayout, actions: trackerCaptureActions } = useTrackerCaptureStore(
    (state) => ({ layout: state.layout, actions: state.actions }),
    shallow
  );

  const { isLocked, canBeCompleted } = useDataEntryStore((state) => state.status);
  const { currentEvent, actions } = useEventCaptureStore((state) => ({ currentEvent: state.currentEvent, actions: state.actions }));
  const { resetEventCaptureState } = actions;
  const { resetState } = trackerCaptureActions;

  useEffect(() => {
    resetState();
    resetEventCaptureState();
  }, [program ? program.id : null, orgUnit ? orgUnit.id : null, program && program.periodType ? (period ? period.dhis2Period : null) : null]);

  let renderOrgUnitSelector = false;
  let renderPeriodSelector = false;
  let renderNewEventButton = false;
  let renderTrackerGoBackButton = false;
  let renderNewTeiButton = false;
  let renderTrackerSearchButton = false;
  let renderCompleteButton = false;
  let renderRunValidationsButton = false;
  let renderAttributeComboSelector = false;
  let disableCompleteButton = isLocked || !canBeCompleted;
  let disabled = currentEvent ? currentEvent.isDirty : false;

  if (program || dataSet) {
    renderOrgUnitSelector = true;
  }
  if (program) {
    if (orgUnit) {
      if (program.periodType) {
        renderPeriodSelector = true;
        if (period.dhis2Period) {
          renderNewEventButton = true;
          renderCompleteButton = true;
          renderTrackerGoBackButton = false;
        }
      } else {
        if (program.registration) {
          renderNewTeiButton = trackerLayout.layout === "layout1";
          renderTrackerSearchButton = trackerLayout.layout === "layout1";
          if (trackerLayout.hideRegisterButton) {
            renderNewTeiButton = false;
          }
          if (trackerLayout.hideSearchButton) {
            renderTrackerSearchButton = false;
          }
          renderTrackerGoBackButton = trackerLayout.layout === "layout2" || trackerLayout.layout === "layout3";
        } else {
          renderNewEventButton = true;
        }
      }
    }
  } else if (dataSet) {
    if (orgUnit) {
      renderPeriodSelector = true;
      if (period.dhis2Period) {
        if (dataSet.hasAttributeCombo) {
          renderAttributeComboSelector = true;
          if (attributeOptionCombo) {
            renderRunValidationsButton = true;
            renderCompleteButton = true;
            renderTrackerGoBackButton = false;
          }
        } else {
          renderCompleteButton = true;
          renderRunValidationsButton = true;
          renderTrackerGoBackButton = false;
        }
      }
    }
  }
  return {
    renderOrgUnitSelector,
    renderPeriodSelector,
    renderNewEventButton,
    renderTrackerGoBackButton,
    renderNewTeiButton,
    renderTrackerSearchButton,
    renderCompleteButton,
    disableCompleteButton,
    renderAttributeComboSelector,
    renderRunValidationsButton,
    disabled
  };
};
export default useControlBarLogics;
