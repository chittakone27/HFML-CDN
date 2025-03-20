import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";
import { event } from "@/api";
import { Input } from "@/ui/common";
import { add, format } from "date-fns";
const { saveEvent } = event;

const EirCompleteButton = () => {
  const { t } = useTranslation();
  const { currentEvents, selectedEvent } = useTrackerCaptureStore((state) => state.data, shallow);
  const { selectEvent, setLayout, changeEventProperty, scheduleNewEvent } = useTrackerCaptureStore((state) => state.actions, shallow);
  const program = useSelectionStore((state) => state.program, shallow);
  const layout = useTrackerCaptureStore((state) => state.layout, shallow);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const currentProgramStage = program.programStages.find((ps) => ps.id === currentEvent.programStage);

  const [apiError, setApiError] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedProgramStageId, setSelectedProgramStageId] = useState(currentEvent.programStage);
  const [saved, setSaved] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const { dueDateLabel, standardInterval } = useMemo(() => {
    const selectedProgramStage = program.programStages.find((ps) => ps.id === selectedProgramStageId);
    return { dueDateLabel: selectedProgramStage?.dueDateLabel || t("dueDate"), standardInterval: selectedProgramStage?.standardInterval || 0 };
  }, [selectedProgramStageId]);

  useEffect(() => {
    if (currentEvent.eventDate) {
      setDueDate(format(add(new Date(currentEvent.eventDate), { days: standardInterval }), "yyyy-MM-dd"));
    }
  }, [scheduleDialogOpen, currentEvent.event, selectedProgramStageId]);

  const listProgramStage = program.programStages
    .filter(
      (ps) => {
        if (ps.repeatable) {
          return ps;
        }
        if (!ps.repeatable && !currentEvents.find((ce) => ce.programStage === ps.id)) {
          return ps;
        }
      },
      [currentEvents.length]
    )
    .map((item) => ({ ...item, value: item.id, label: item.displayName }));

  let completed;
  if (currentEvent.status === "COMPLETED") {
    completed = true;
  } else {
    completed = false;
  }

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

  const completeEvent = async () => {
    setLayout("formLoading", true);
    const status = completed ? "ACTIVE" : "COMPLETED";
    const eventToBeSaved = { ...currentEvent, status };
    const result = await saveEvent(eventToBeSaved);
    if (result.ok) {
      changeEventProperty(currentEvent.event, "status", status);
      if (!completed && currentEvent.programStage === "hCTTxOH8FOa") {
        setScheduleDialogOpen(true);
      }
      setLayout("formLoading", false);
    } else {
      setApiError({ ...result });
    }
  };

  const handleSave = () => {
    setScheduleDialogOpen(false);
    scheduleNewEvent(selectedProgramStageId, dueDate);
    setSaved(true);
  };

  useEffect(() => {
    (async () => {
      if (saved) {
        setSaved(false);
        selectEvent(null);
        const result = await saveEvent(currentEvent);
        if (!result.ok) {
          setApiError({ ...result });
        }
      }
    })();
  }, [saved]);
  return (
    <>
      <Dialog
        open={scheduleDialogOpen}
        maxWidth="xl"
        onClose={(e, reason) => {
          if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
            return;
          }
          setScheduleDialogOpen(false);
        }}
      >
        <DialogTitle>
          {t("scheduleNewEventForStage")} <span style={{ fontWeight: "bold" }}>{t("immunization")}</span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box className="eir-form" id="schedule-dialog">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <span>{t("programStage")}</span>
                  </TableCell>
                  <TableCell>
                    <div className="field-container">
                      <Input
                        renderOption={(props, option) => (
                          <li {...props}>
                            <div>{option.label}</div>
                          </li>
                        )}
                        valueSet={listProgramStage}
                        valueType="TEXT"
                        disabled={listProgramStage.length ? false : true}
                        disableClearable={true}
                        value={selectedProgramStageId}
                        change={(value) => {
                          setSelectedProgramStageId(value);
                        }}
                        helpers={
                          listProgramStage
                            ? []
                            : [
                                {
                                  type: "WARNING",
                                  value: t("nonRepeatableEventCreatedError")
                                }
                              ]
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span>{dueDateLabel}</span>
                  </TableCell>
                  <TableCell>
                    <div className="field-container">
                      <Input
                        minDate={"1900-01-01"}
                        valueType="DATE"
                        value={dueDate}
                        change={(value) => {
                          setDueDate(value);
                        }}
                        accept={(value) => {
                          setDueDate(value);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button variant="contained" onClick={handleSave}>
            {t("save")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setScheduleDialogOpen(false);
            }}
          >
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" onClick={completeEvent} color={completed ? "orange" : "green"} disabled={disableComplete}>
        {t(completed ? "incomplete" : "complete")}
      </Button>
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

export default EirCompleteButton;
