import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, Popover, Alert, AlertTitle } from "@mui/material";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import { useTranslation } from "react-i18next";
import useCurrentEvent from "./useCurrentEvent";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import configs from "@/configs";
import { toast } from "react-toastify";
import { tracker, event } from "@/api";
const { saveEvent } = tracker;
const { deleteEvent } = event;
import { LoadingButton } from "@mui/lab";
import "./Form.css";

const { VITE_CONFIG_NAME } = import.meta.env;

const Form = ({ type }) => {
  const { customForms, customTrackerCompleteButtons, additionalCompleteHandlers, trackerFormTypes } = configs[VITE_CONFIG_NAME];
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.program
    }))
  );
  const { layout, actions, data, handlers } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      layout: state.layout,
      actions: state.actions,
      handlers: state.handlers
    }))
  );
  const { eventSave, eventComplete, eventIncomplete } = handlers;
  const { currentTei, currentEnrollment, currentEvents } = data;
  const { selectEvent, setLayout, changeEventProperty, deleteEventFromList } = actions;
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const EventCustomForm = customForms[program.id] && customForms[program.id][currentEvent.programStage];
  const { t } = useTranslation();
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  const additionalCompleteHandler = additionalCompleteHandlers && additionalCompleteHandlers[currentProgramStage.id];
  const { formLoading } = layout;

  const saveCurrentEvent = async () => {
    setLayout("formLoading", true);
    let result;
    if (eventSave) {
      result = await eventSave(currentEvent, currentTei, currentEnrollment, currentEvents);
    } else {
      result = await saveEvent(currentEvent);
    }
    if (result.ok) {
      toast.success(t("saved"), {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
    } else {
      setApiError({ ...result });
    }
    setLayout("formLoading", false);
    setLayout("eventFormEditing", false);
  };

  const completeEvent = async () => {
    setLayout("formLoading", true);
    const status = completed ? "ACTIVE" : "COMPLETED";
    if (completed && eventIncomplete) {
      eventIncomplete(currentTei, currentEnrollment, currentEvent, currentEvents);
    } else if (!completed && eventComplete) {
      eventComplete(currentTei, currentEnrollment, currentEvent, currentEvents);
    }
    const eventToBeSaved = { ...currentEvent, status };
    const result = await saveEvent(eventToBeSaved);
    if (result.ok) {
      changeEventProperty(currentEvent.event, "status", status);
      if (additionalCompleteHandler) {
        await additionalCompleteHandler(currentTei, currentEnrollment, eventToBeSaved);
      }
      toast.success(t("saved"), {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
    } else {
      setApiError({ ...result });
    }
    setLayout("formLoading", false);
    if (status === "ACTIVE") {
      setLayout("eventFormEditing", true);
    } else {
      setLayout("eventFormEditing", false);
    }
  };

  const buttons = [
    !layout.eventFormEditing && !completed && (
      <LoadingButton
        loading={formLoading}
        disabled={layout.disableEventEditButton}
        variant="contained"
        onClick={() => {
          setLayout("eventFormEditing", true);
        }}
      >
        {t("edit")}
      </LoadingButton>
    ),
    layout.eventFormEditing && !layout.hideEventSaveButton && (
      <LoadingButton loading={formLoading} variant="contained" color="success" onClick={saveCurrentEvent} disabled={layout.disableEventSaveButton}>
        {t("save")}
      </LoadingButton>
    ),
    (layout.eventFormEditing || completed) && (
      <LoadingButton
        loading={formLoading}
        disabled={layout.disableEventCompleteButton}
        variant="contained"
        color={`${completed ? "error" : "warning"}`}
        onClick={completeEvent}
      >
        {completed ? t("incomplete") : t("complete")}
      </LoadingButton>
    ),
    !completed && (
      <LoadingButton
        loading={formLoading}
        disabled={layout.disableEventDeleteButton}
        variant="outlined"
        color="error"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {t("delete")}
      </LoadingButton>
    ),
    type === "dialog" && (
      <div style={{ marginLeft: "auto" }}>
        <LoadingButton
          loading={formLoading}
          color="error"
          variant="contained"
          onClick={(event) => {
            selectEvent(null);
          }}
        >
          {t("close")}
        </LoadingButton>
      </div>
    )
  ];

  const render = () => {
    if (type === "dialog") {
      return (
        <Dialog
          open={true}
          fullWidth
          maxWidth="xl"
          onClose={(event, reason) => {
            if (reason === "backdropClick" && formLoading) {
              return;
            }
            selectEvent(null);
            setLayout("eventFormEditing", false);
          }}
        >
          <DialogContent sx={{ padding: 1 }} dividers>
            <EventCustomForm />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-start" }}>{buttons}</DialogActions>
        </Dialog>
      );
    } else {
      return [
        <div>
          <EventCustomForm />
        </div>,
        <div>{buttons}</div>
      ];
    }
  };

  return (
    <div className="event-form">
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
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
              setLayout("formLoading", true);
              const result = await deleteEvent({ event: currentEvent.event });
              if (!result.ok) {
                setApiError({ ...result });
              } else {
                deleteEventFromList(currentEvent.event);
                selectEvent("");
                toast.success(t("saved"), {
                  position: "bottom-center",
                  autoClose: 3000,
                  closeOnClick: false,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined
                });
              }
              setLayout("formLoading", false);
              setLayout("eventFormEditing", false);
              setAnchorEl(null);
            }}
          >
            {t("delete")}
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Popover>
      {render()}
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
export default Form;
