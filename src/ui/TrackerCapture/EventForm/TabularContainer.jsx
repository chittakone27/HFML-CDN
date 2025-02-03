import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { useShallow } from "zustand/react/shallow";
import { convertDisplayValue, convertDisplayDate, pickExecutionDateLabel, pickDueDateLabel } from "@/utils/utils";

const LEGEND = {
  ACTIVE: "#faf3c8",
  COMPLETED: "#e3e3e3",
  SCHEDULE: "#b8ffb5",
  OVERDUE: "#ffada1"
};
const TabularContainer = ({ currentProgramStage }) => {
  const { t } = useTranslation();
  const { orgUnits, dataElements, optionSets } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      dataElements: state.dataElements,
      optionSets: state.optionSets
    }))
  );
  const { layout, currentTei, currentEnrollment, currentEvents, selectedEvent, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      currentTei: state.data.currentTei,
      currentEnrollment: state.data.currentEnrollment,
      currentEvents: state.data.currentEvents,
      selectedEvent: state.data.selectedEvent,
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { selectEvent, initNewEvent, setLayout } = actions;
  const { disableEventCreateButton } = layout;
  const foundEvents = currentEvents.filter((ce) => ce.programStage === currentProgramStage.id);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const currentDataElements = currentProgramStage.programStageDataElements
    .filter((psde) => psde.displayInReports)
    .map((psde) => {
      const foundDe = dataElements.find((de) => de.id === psde.dataElement.id);
      return foundDe;
    });

  const convertValue = (dataElement, value) => {
    const foundOptionSet = dataElement.optionSet ? optionSets.find((os) => os.id === dataElement.optionSet.id) : null;
    if (foundOptionSet) {
      const foundOption = foundOptionSet.options.find((o) => o.code === value);
      if (foundOption) {
        return foundOption.displayName;
      } else {
        return value;
      }
    } else if (dataElement.valueType === "TRUE_ONLY") {
      if (value === "true") {
        return <FontAwesomeIcon icon={faCheck} />;
      }
    } else {
      return convertDisplayValue(dataElement, value, t);
    }
  };
  console.log(currentProgramStage);

  return (
    <div className="event-form-container-tabular-content-container">
      <div className="event-form-container-tabular-table">
        <Table stickyHeade size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 12 }} align="left">
                {pickExecutionDateLabel(currentProgramStage, t)}
              </TableCell>
              {!currentProgramStage.hideDueDate && (
                <TableCell sx={{ fontSize: 12 }} align="left">
                  {pickDueDateLabel(currentProgramStage, t)}
                </TableCell>
              )}
              <TableCell sx={{ fontSize: 12 }} align="left">
                {t("orgUnit")}
              </TableCell>
              {currentDataElements.map((cde) => {
                return (
                  <TableCell sx={{ fontSize: 12 }} align="left">
                    {cde.displayFormName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEvents
              .filter((ce) => ce.programStage === currentProgramStage.id)
              .map((ev) => {
                const foundOu = orgUnits.find((ou) => ou.id === ev.orgUnit);
                let status = ev.status;
                return (
                  <TableRow
                    sx={{ cursor: "pointer", backgroundColor: LEGEND[status] }}
                    hover
                    key={ev.event}
                    onClick={() => {
                      selectEvent(ev.event);
                      if (!ev.eventDate) {
                        setLayout("eventFormEditing", true);
                      }
                    }}
                  >
                    <TableCell sx={{ fontSize: 12 }} align="left">
                      {convertDisplayDate(ev.eventDate)}
                    </TableCell>
                    {!currentProgramStage.hideDueDate && (
                      <TableCell sx={{ fontSize: 12 }} align="left">
                        {convertDisplayDate(ev.dueDate)}
                      </TableCell>
                    )}
                    <TableCell sx={{ fontSize: 12 }} align="left">
                      {foundOu.displayName}
                    </TableCell>
                    {currentDataElements.map((cde) => {
                      const foundDataValue = ev.dataValues.find((dv) => dv.dataElement === cde.id);
                      return (
                        <TableCell sx={{ fontSize: 12 }} align="left">
                          {foundDataValue ? convertValue(cde, foundDataValue.value) : ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div className="event-form-container-tabular-button">
        <Button
          disabled={disableEventCreateButton}
          variant="contained"
          onClick={() => {
            if (currentProgramStage.repeatable) {
              initNewEvent(currentProgramStage.id);
              // setLayout("eventFormEditing", true);
            } else {
              const foundEvent = currentEvents.find((ce) => ce.programStage === currentProgramStage.id);
              if (!foundEvent) {
                initNewEvent(currentProgramStage.id);
                // setLayout("eventFormEditing", true);
              }
            }
          }}
        >
          {t("newEvent")}
        </Button>
      </div>
      {selectedEvent && <Form type="dialog" />}
    </div>
  );
};
export default TabularContainer;
