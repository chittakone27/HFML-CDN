import { useState } from "react";
import { Button, Popover, Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import NoBlurForm from "./NoBlurForm";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "./useCurrentEvent";
import { shallow } from "zustand/shallow";
import { event } from "@/api";
import configs from "@/configs";
import "./Form.css";
import useMetadataStore from "@/state/metadata";
const { VITE_CONFIG_NAME } = import.meta.env;
const { saveEvent, deleteEvent } = event;

const Form = () => {
  const { customForms, customTrackerCompleteButtons, additionalCompleteHandlers, trackerFormTypes } = configs[VITE_CONFIG_NAME];
  const [anchorEl, setAnchorEl] = useState(null);
  const [apiError, setApiError] = useState(null);
  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const { layout, actions, currentTei, currentEnrollment } = useTrackerCaptureStore(
    (state) => ({
      actions: state.actions,
      layout: state.layout,
      currentTei: state.data.currentTei,
      currentEnrollment: state.data.currentEnrollment
    }),
    shallow
  );
  const { changeEventProperty, setLayout, selectEvent, deleteEventFromList } = actions;
  const foundEventOrgUnit = orgUnits.find((ou) => ou.id === currentEvent.orgUnit);
  const EventCustomForm = customForms[program.id] && customForms[program.id][currentEvent.programStage];
  const CustomCompleteButton = customTrackerCompleteButtons[program.id];
  let completed;
  if (currentEvent.status === "COMPLETED") {
    completed = true;
  } else {
    completed = false;
  }

  const additionalCompleteHandler = additionalCompleteHandlers && additionalCompleteHandlers[currentProgramStage.id];

  const completeEvent = async () => {
    setLayout("formLoading", true);
    const status = completed ? "ACTIVE" : "COMPLETED";
    const eventToBeSaved = { ...currentEvent, status };
    const result = await saveEvent(eventToBeSaved);
    if (result.ok) {
      changeEventProperty(currentEvent.event, "status", status);
      if (additionalCompleteHandler) {
        await additionalCompleteHandler(currentTei, currentEnrollment, eventToBeSaved);
      }
      setLayout("formLoading", false);
    } else {
      setApiError({ ...result });
    }
  };

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
    disableComplete = true;
  }

  if (layout.formLoading) {
    disableComplete = true;
  }
  if (currentEvent.orgUnit !== orgUnit.id && !foundEventOrgUnit.path.includes(orgUnit.id)) {
    disableDelete = true;
  }
  return (
    <>
      {(() => {
        if (trackerFormTypes[program.id] && trackerFormTypes[program.id].includes("noBlur")) {
          return EventCustomForm ? (
            <NoBlurForm>
              <EventCustomForm />
            </NoBlurForm>
          ) : (
            <div>FORM</div>
          );
        } else {
          return (
            <div className="tracker-stage-form-container ">
              <div>{EventCustomForm ? <EventCustomForm /> : <div>FORM</div>}</div>
              <div>
                {CustomCompleteButton ? (
                  <CustomCompleteButton />
                ) : (
                  <Button variant="contained" onClick={completeEvent} color={completed ? "error" : "green"} disabled={disableComplete}>
                    {t(completed ? "incomplete" : "complete")}
                  </Button>
                )}
                &nbsp;&nbsp;
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
                &nbsp;&nbsp;
                {layout.formLoading && (
                  <div className="tracker-stage-form-saving">
                    <FontAwesomeIcon icon={faRotate} spin />
                    &nbsp;&nbsp;
                    {t("savingEvent")}
                  </div>
                )}
                {/* <div className="tracker-stage-form-saved">
              <FontAwesomeIcon icon={faCheckCircle} />
              &nbsp;&nbsp;
              {t("eventSaved")}
            </div> */}
              </div>
            </div>
          );
        }
      })()}
      {apiError && (
        <ErrorDialog
          error={JSON.stringify(apiError)}
          handleClose={() => {
            setApiError(null);
          }}
        />
      )}
    </>
  );
};

export default Form;
