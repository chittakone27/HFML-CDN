import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, AlertTitle, Popover } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import AbortionDetails from "./eventForms/AbortionDetails";
import FamilyPlanning from "./eventForms/FamilyPlanning";
import AncVisitDetails from "./eventForms/AncVisitDetails";
import NcleCommunicableDiseases from "./eventForms/NcleCommunicableDiseases";
import PncDetails from "./eventForms/PncDetails";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { tracker, event } from "@/api";
import { useState } from "react";
import _ from "lodash";
import IpdVisitDetails from "./eventForms/IpdVisitDetails";
import useBasicRules from "./eventForms/useBasicRules";
import { saveIpdVisitDetails } from "./handlers";
import Swal from "sweetalert2";

const { saveEvent } = tracker;
const { deleteEvent } = event;
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
  },
  kPEL6aQkTCb: {
    UxFuT7chE5U: NcleCommunicableDiseases
  }
};
const EventFormDialog = () => {
  const [deleteButtonAnchorEl, setDeleteButtonAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { trackerActions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      trackerActions: state.actions,
      data: state.data
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
  const { saveEventToState, deleteEventFromList } = trackerActions;
  const { currentEnrollment, currentTei } = data;
  const { currentEvent, currentProgramStage, editing, disableIncompleteButton } = event;
  const { setEvent, changeEventProperty } = actions;
  const Component = currentEvent && currentProgramStage && mapping[program.id][currentProgramStage.id];
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const errors = [...useBasicRules(), ...event.formErrors];

  const checkValid = () => {
    if (errors.length > 0) {
      let html = `<div style="color: red;" />`;
      errors.forEach((error) => {
        html += "<div>" + error + "</div>";
      });
      html += "</div>";

      Swal.fire({
        width: 800,
        html,
        icon: "error",
        confirmButtonText: "OK"
      });
      return false;
    } else {
      return true;
    }
  };

  return currentEvent ? (
    <Dialog fullWidth={true} maxWidth={"xl"} open={true}>
      <div className="chr-tracker-event-form-container">
        <div className="chr-tracker-event-form">
          <Component />
        </div>
        {/* <div className="chr-tracker-event-form-helper">
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
        </div> */}
        <div className="chr-tracker-event-form-buttons">
          {editing && (
            <LoadingButton
              // disabled={errors.length > 0}
              loading={loading}
              variant="contained"
              onClick={async () => {
                const valid = checkValid();
                if (!valid) {
                  return;
                }
                setLoading(true);
                setEvent("editing", false);
                saveEventToState(currentEvent);
                await saveEvent(currentEvent);
                if (program.id === "ck0rft9jVlF") {
                  await saveIpdVisitDetails(currentEvent, currentTei, currentEnrollment, trackerActions, actions);
                }
                setLoading(false);
              }}
            >
              {t("save")}
            </LoadingButton>
          )}
          {!editing && !completed && (
            <LoadingButton
              loading={loading}
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
              // disabled={errors.length > 0}
              variant="contained"
              color="success"
              onClick={async () => {
                const valid = checkValid();
                if (!valid) {
                  return;
                }
                setLoading(true);
                changeEventProperty("status", "COMPLETED");
                const cloned = _.cloneDeep(currentEvent);
                cloned.status = "COMPLETED";
                saveEventToState(cloned);
                await saveEvent(cloned);
                if (program.id === "ck0rft9jVlF") {
                  await saveIpdVisitDetails(currentEvent, currentTei, currentEnrollment, trackerActions, actions);
                }
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("complete")}
            </LoadingButton>
          )}
          {completed && (
            <LoadingButton
              disabled={disableIncompleteButton}
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
          &nbsp;
          <LoadingButton
            loading={loading}
            variant="outlined"
            color="error"
            onClick={(event) => {
              setDeleteButtonAnchorEl(event.currentTarget);
            }}
          >
            {t("delete")}
          </LoadingButton>
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            onClose={() => {
              setDeleteButtonAnchorEl(null);
            }}
            open={Boolean(deleteButtonAnchorEl)}
            anchorEl={deleteButtonAnchorEl}
          >
            <div className="delete-event-confirmation">
              <Alert severity="warning">
                <AlertTitle>{t("warning")}</AlertTitle>
                {t("deleteEventConfirmation")}
              </Alert>
              <br />
              <Button
                color="error"
                onClick={async () => {
                  setLoading(true);
                  setDeleteButtonAnchorEl(null);
                  const result = await deleteEvent({ event: currentEvent.event });
                  deleteEventFromList(currentEvent.event);
                  setLoading(false);
                  setEvent("currentEvent", null);
                  setEvent("editing", false);
                  setEvent("formErrors", []);
                }}
              >
                {t("delete")}
              </Button>
              &nbsp;
              <Button
                onClick={() => {
                  setDeleteButtonAnchorEl(null);
                }}
              >
                {t("cancel")}
              </Button>
            </div>
          </Popover>
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
