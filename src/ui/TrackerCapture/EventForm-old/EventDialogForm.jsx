import { useState } from "react";
import { Popover, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Button, Alert, AlertTitle } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "./useCurrentEvent";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import configs from "@/configs";
import { event } from "@/api";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import "./EventDialogForm.css";
import { useShallow } from "zustand/react/shallow";
const { saveEvent, deleteEvent } = event;
const { VITE_CONFIG_NAME } = import.meta.env;

const EventDialogForm = () => {
  const { customForms, customTrackerCompleteButtons } = configs[VITE_CONFIG_NAME];
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { t } = useTranslation();
  const { orgUnits, me } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      me: state.me
    }))
  );
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { data, actions, layout } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      actions: state.actions,
      layout: state.layout
    }),
    shallow
  );
  const { selectedEvent } = data;
  const { changeEventProperty, setLayout, selectEvent, deleteEventFromList } = actions;
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const foundEventOrgUnit = orgUnits.find((ou) => ou.id === currentEvent.orgUnit);
  const EventCustomForm = customForms[program.id] && customForms[program.id][currentEvent.programStage];
  const CustomCompleteButton = customTrackerCompleteButtons[program.id];

  let completed;
  if (currentEvent.status === "COMPLETED") {
    completed = true;
  } else {
    completed = false;
  }
  let disableDelete = false;
  let disableComplete = false;

  currentProgramStage.programStageDataElements
    .filter((psde) => psde.compulsory === true)
    .forEach((psde) => {
      const foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === psde.dataElement.id);
      if (!foundDataValue || !foundDataValue.value) {
        disableComplete = true;
        return;
      }
    });

  if (!currentEvent.eventDate) {
    disableComplete = true;
  }

  if (layout.disableCompleteButton) {
    disableComplete = true;
  }

  if (currentEvent.orgUnit !== orgUnit.id) {
    const foundValidOu = me.organisationUnits.find((ou) => {
      return orgUnit.path.includes(ou.id);
    });
    if (!foundValidOu) {
      disableComplete = true;
    }
  }
  if (currentEvent.orgUnit !== orgUnit.id && !foundEventOrgUnit.path.includes(orgUnit.id)) {
    disableDelete = true;
  }

  const completeEvent = async () => {
    setLayout("formLoading", true);
    const status = completed ? "ACTIVE" : "COMPLETED";
    const eventToBeSaved = { ...currentEvent, status };
    const result = await saveEvent(eventToBeSaved);
    if (result.ok) {
      changeEventProperty(currentEvent.event, "status", status);
      setLayout("formLoading", false);
    } else {
      setApiError({ ...result });
    }
  };
  console.log(disableComplete);
  return [
    <Dialog
      open={selectedEvent ? true : false}
      fullWidth
      maxWidth="xl"
      onClose={() => {
        selectEvent(null);
      }}
    >
      <DialogContent dividers>
        <div className="event-dialog-form-container">
          <div>{EventCustomForm ? <EventCustomForm /> : null}</div>
        </div>
      </DialogContent>
      <DialogActions>
        {CustomCompleteButton ? (
          <CustomCompleteButton />
        ) : (
          <Button variant="contained" onClick={completeEvent} color={completed ? "orange" : "green"} disabled={disableComplete}>
            {t(completed ? "incomplete" : "complete")}
          </Button>
        )}
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
              color="primary"
              onClick={async () => {
                setLayout("formLoading", true);
                const result = await deleteEvent({ event: currentEvent.event });
                if (!result.ok) {
                  setApiError({ ...result });
                } else {
                  setLayout("formLoading", false);
                  deleteEventFromList(currentEvent.event);
                  selectEvent("");
                }
                setAnchorEl(null);
              }}
            >
              {t("delete")}
            </Button>
            &nbsp;
            <Button
              color="error"
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        </Popover>
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          disabled={disableDelete}
        >
          {t("deleteEvent")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            selectEvent(null);
          }}
        >
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>,
    apiError && (
      <ErrorDialog
        error={JSON.stringify(apiError)}
        handleClose={() => {
          setApiError(null);
        }}
      />
    )
  ];
};

export default EventDialogForm;
