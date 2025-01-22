import { useState } from "react";
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "./useCurrentEvent";
import { shallow } from "zustand/shallow";
import { tracker } from "@/api";
import useMetadataStore from "@/state/metadata";
import { toast } from "react-toastify";
import "./Form.css";
const { VITE_CONFIG_NAME } = import.meta.env;
const { saveEvent, deleteEvent } = tracker;

const NoBlurForm = ({ children, customSave, handleSave, disableSave }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const { layout, actions } = useTrackerCaptureStore(
    (state) => ({
      layout: state.layout,
      actions: state.actions,
      currentTei: state.data.currentTei,
      currentEnrollment: state.data.currentEnrollment
    }),
    shallow
  );
  const { setLayout, selectEvent, deleteEventFromList } = actions;
  const foundEventOrgUnit = orgUnits.find((ou) => ou.id === currentEvent.orgUnit);

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

  // if (!currentEvent.eventDate) {
  //   disableComplete = true;
  // }

  // if (layout.disableCompleteButton) {
  //   disableComplete = true;
  // }

  // if (currentEvent.orgUnit !== orgUnit.id) {
  //   disableComplete = true;
  // }

  // if (layout.formLoading) {
  //   disableComplete = true;
  // }
  // if (currentEvent.orgUnit !== orgUnit.id && !foundEventOrgUnit.path.includes(orgUnit.id)) {
  //   disableDelete = true;
  // }

  if (!currentEvent.eventDate) {
    disableSave = true;
  }

  const saveCurrentEvent = async () => {
    const result = await saveEvent(currentEvent);
    if (result.ok) {
      toast.success(t("eventSaved"), {
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
  };

  return (
    <div className="tracker-stage-form-container">
      <div>{children}</div>
      <div>
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
        {!layout.eventFormEditing && (
          <Button
            variant="contained"
            onClick={() => {
              setLayout("eventFormEditing", true);
            }}
          >
            {t("edit")}
          </Button>
        )}
        {layout.eventFormEditing && (
          <Button
            disabled={disableSave}
            variant="contained"
            color="primary"
            onClick={async () => {
              if (!customSave) {
                await saveCurrentEvent();
              }
              if (handleSave) {
                const result = await handleSave();
                if (result.ok) {
                  toast.success(t("eventSaved"), {
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
              }
              setLayout("eventFormEditing", false);
            }}
          >
            {t("save")}
          </Button>
        )}
        &nbsp;
        {/* <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          disabled={disableDelete}
        >
          {t("deleteEvent")}
        </Button> */}
        &nbsp;&nbsp;
        {layout.formLoading && (
          <div className="tracker-stage-form-saving">
            <FontAwesomeIcon icon={faRotate} spin />
            &nbsp;&nbsp;
            {t("savingEvent")}
          </div>
        )}
      </div>
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

export default NoBlurForm;
