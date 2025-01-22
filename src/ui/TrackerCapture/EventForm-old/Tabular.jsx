import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import EventDialogForm from "./EventDialogForm";
import { shallow } from "zustand/shallow";
import { convertDisplayValue, convertDisplayDate, pickExecutionDateLabel, pickDueDateLabel } from "@/utils/utils";
import "./Tabular.css";
const LEGEND = {
  ACTIVE: "#faf3c8",
  COMPLETED: "#e3e3e3",
  SCHEDULE: "#b8ffb5",
  OVERDUE: "#ffada1"
};
const Tabular = () => {
  const { t } = useTranslation();
  const { dataElements, orgUnits, optionSets } = useMetadataStore(
    (state) => ({ dataElements: state.dataElements, orgUnits: state.orgUnits, optionSets: state.optionSets }),
    shallow
  );
  const { program } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { actions, data } = useTrackerCaptureStore((state) => ({ actions: state.actions, layout: state.layout, data: state.data }), shallow);
  const { selectedProgramStage, selectedEvent } = data;
  const { currentEvents } = data;
  const { selectEvent } = actions;
  const currentProgramStage = program.programStages.find((ps) => ps.id === selectedProgramStage);
  const currentDataElements = currentProgramStage.programStageDataElements
    .filter((psde) => {
      return psde.displayInReports;
    })
    .map((psde) => {
      const foundDataElement = dataElements.find((de) => de.id === psde.dataElement.id);
      return foundDataElement;
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

  return (
    <div className="tracker-stage-tabular-form-container">
      {selectedEvent && <EventDialogForm />}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">{pickExecutionDateLabel(currentProgramStage, t)}</TableCell>
              {!currentProgramStage.hideDueDate && <TableCell align="left">{pickDueDateLabel(currentProgramStage, t)}</TableCell>}
              <TableCell align="left">{t("orgUnit")}</TableCell>
              {currentDataElements.map((cde) => {
                return <TableCell align="left">{cde.displayFormName}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEvents
              .filter((ce) => ce.programStage === selectedProgramStage)
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
                    }}
                  >
                    <TableCell align="left">{convertDisplayDate(ev.eventDate)}</TableCell>
                    {!currentProgramStage.hideDueDate && <TableCell align="left">{convertDisplayDate(ev.dueDate)}</TableCell>}
                    <TableCell align="left">{foundOu.displayName}</TableCell>
                    {currentDataElements.map((cde) => {
                      const foundDataValue = ev.dataValues.find((dv) => dv.dataElement === cde.id);
                      return <TableCell align="left">{foundDataValue ? convertValue(cde, foundDataValue.value) : ""}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tabular;
