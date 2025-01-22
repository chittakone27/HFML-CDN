import { useState, useEffect } from "react";
import { Input } from "@/ui/common";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import useCurrentEvent from "./useCurrentEvent";
import _ from "lodash";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import { event, tracker } from "@/api";
import useSelectionStore from "@/state/selection";
import { convertDisplayDate } from "@/utils/utils";

const { saveEvent } = event;
const { saveEventDate } = tracker;

const EventDateFieldNoBlur = ({ helpers, disabled, type, minDate, maxDate }) => {
  const [toBeSaved, setToBeSaved] = useState(false);
  const [apiError, setApiError] = useState(null);
  const orgUnit = useSelectionStore((state) => state.orgUnit);
  const { currentEvent } = useCurrentEvent();
  const { actions, layout } = useTrackerCaptureStore((state) => ({ actions: state.actions, layout: state.layout }), shallow);
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  let currentDisabled = completed || disabled || !layout.eventFormEditing;
  const { changeEventProperty, setLayout } = actions;

  if (currentEvent.orgUnit !== orgUnit.id) {
    currentDisabled = true;
  }

  const saveCurrentEvent = async () => {
    if (currentEvent.isDirty) {
      const eventToBeSaved = { ...currentEvent };
      setLayout("formLoading", true);
      const result = await saveEventDate(eventToBeSaved);
      if (!result.ok) {
        setApiError({ ...result });
      } else {
        if (eventToBeSaved.isNew) {
          changeEventProperty(eventToBeSaved.event, "isNew", false);
        }
        changeEventProperty(eventToBeSaved.event, "isDirty", false);
        setLayout("formLoading", false);
      }
    }
  };

  return (
    <div className="input-field-container">
      <Input
        helpers={helpers}
        disabled={currentDisabled}
        minDate={minDate ? minDate : "1900-01-01"}
        maxDate={maxDate}
        valueType="DATE"
        mandatory={type === "eventDate"}
        value={currentEvent[type ? type : "eventDate"] ? convertDisplayDate(currentEvent[type ? type : "eventDate"]) : ""}
        accept={async (value) => {
          changeEventProperty(currentEvent.event, type, value);
          if (type === "eventDate" && ["OVERDUE", "SCHEDULE"].includes(currentEvent.status)) {
            changeEventProperty(currentEvent.event, "status", "ACTIVE");
          }
        }}
      />
      {apiError && (
        <ErrorDialog
          error={JSON.stringify(apiError)}
          handleClose={() => {
            setApiError(null);
          }}
        />
      )}
    </div>
  );
};

export default EventDateFieldNoBlur;
