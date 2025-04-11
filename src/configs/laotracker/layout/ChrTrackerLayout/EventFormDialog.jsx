import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, AlertTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import AbortionDetails from "./eventForms/AbortionDetails";
import FamilyPlanning from "./eventForms/FamilyPlanning";
import AncVisitDetails from "./eventForms/AncVisitDetails";
import PncDetails from "./eventForms/PncDetails";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { tracker } from "@/api";
import { useState } from "react";
import _ from "lodash";
import IpdVisitDetails from "./eventForms/IpdVisitDetails";
import useBasicRules from "./eventForms/useBasicRules";

const { saveEvent } = tracker;
const mapping = {
  vqNgkw4gfw7: {
    ks9YrW50xb5: AbortionDetails
  },
  PBLmYwloRHu: {
    Sb26npqib05: FamilyPlanning
  },
  fflLsS1lm3g: {
    IZ9GXqMAZV8: AncVisitDetails
  },
  u1Na9wCGY6d: {
    huYWjrG6A1C: PncDetails
  },
  ck0rft9jVlF: {
    PuT0v7uvrDO: IpdVisitDetails
  }
};
const EventFormDialog = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { trackerActions } = useTrackerCaptureStore(
    useShallow((state) => ({
      trackerActions: state.actions
    }))
  );
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { saveEventToState } = trackerActions;
  const { currentEvent, currentProgramStage, editing } = event;
  const { setEvent, changeEventProperty } = actions;
  const Component = currentEvent && currentProgramStage && mapping[program.id][currentProgramStage.id];
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const errors = [...useBasicRules(), ...event.formErrors];
  return currentEvent ? (
    <Dialog fullWidth={true} maxWidth={"xl"} open={true}>
      <div className="chr-tracker-event-form-container">
        <div className="chr-tracker-event-form">
          <Component />
        </div>
        <div className="chr-tracker-event-form-helper">
          {errors.length > 0 ? (
            <div
              style={{ padding: 5, color: "#e53935", height: "100%", width: "100%", overflow: "auto", backgroundColor: "#ffcdd2", borderRadius: 3 }}
            >
              {errors.map((error) => {
                return <div>- {error}</div>;
              })}
            </div>
          ) : (
            <div style={{ padding: 5, height: "100%", width: "100%", overflow: "auto", backgroundColor: "#e8f5e9", borderRadius: 3 }}>
              {t("noErrors")}
            </div>
          )}
        </div>
        <div className="chr-tracker-event-form-buttons">
          {editing && (
            <LoadingButton
              disabled={errors.length > 0}
              loading={loading}
              variant="contained"
              onClick={async () => {
                setLoading(true);
                saveEventToState(currentEvent);
                await saveEvent(currentEvent);
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("save")}
            </LoadingButton>
          )}
          {!editing && !completed && (
            <LoadingButton
              variant="contained"
              onClick={() => {
                setEvent("editing", true);
              }}
            >
              {t("edit")}
            </LoadingButton>
          )}
          &nbsp;
          {!completed && editing && (
            <LoadingButton
              loading={loading}
              disabled={errors.length > 0}
              variant="contained"
              color="success"
              onClick={() => {
                setLoading(true);
                changeEventProperty("status", "COMPLETED");
                const cloned = _.cloneDeep(currentEvent);
                cloned.status = "COMPLETED";
                saveEventToState(cloned);
                saveEvent(cloned);
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("complete")}
            </LoadingButton>
          )}
          {completed && (
            <LoadingButton
              loading={loading}
              variant="contained"
              color="warning"
              onClick={() => {
                setLoading(true);
                changeEventProperty("status", "ACTIVE");
                const cloned = _.cloneDeep(currentEvent);
                cloned.status = "ACTIVE";
                saveEventToState(cloned);
                saveEvent(cloned);
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("incomplete")}
            </LoadingButton>
          )}
          <LoadingButton
            loading={loading}
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="error"
            onClick={() => {
              setEvent("currentEvent", null);
              setEvent("editing", false);
              setEvent("formErrors", []);
            }}
          >
            {t("close")}
          </LoadingButton>
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default EventFormDialog;
