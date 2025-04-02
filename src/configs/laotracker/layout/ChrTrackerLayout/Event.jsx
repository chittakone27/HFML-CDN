import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { pickTranslation, pickExecutionDateLabel, pickDueDateLabel, convertDisplayValue, convertDisplayDate } from "@/utils/utils";
import useChrTrackerStore from "./state";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { format } from "date-fns";
import EventFormDialog from "./EventFormDialog";
const LEGEND = {
  ACTIVE: "#faf3c8",
  COMPLETED: "#e3e3e3",
  SCHEDULE: "#b8ffb5",
  OVERDUE: "#ffada1"
};
const Event = ({ title }) => {
  const { t, i18n } = useTranslation();
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentEvents } = data;
  const { dataElements, orgUnits } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements,
      orgUnits: state.orgUnits
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const [tab, setTab] = useState(0);
  const { currentProgramStage } = event;
  const { setEvent } = actions;

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
  useEffect(() => {
    const programStage = program.programStages[tab];
    setEvent("currentProgramStage", programStage);
  }, [tab]);
  const currentDataElements = [];

  if (currentProgramStage) {
    currentProgramStage.programStageDataElements
      .filter((psde) => psde.displayInReports)
      .forEach((psde) => {
        const foundDe = dataElements.find((de) => de.id === psde.dataElement.id);
        currentDataElements.push(foundDe);
      });
  }

  return (
    <div className="chr-tracker-event-container">
      <div>
        <div className="chr-tracker-event-title">
          <Tabs
            value={tab}
            onChange={(event, value) => {
              setTab(value);
            }}
          >
            {program.programStages.map((ps) => {
              return <Tab label={pickTranslation(ps, i18n.language, "name")} />;
            })}
          </Tabs>
        </div>
        <div className="chr-tracker-section-content">
          {currentProgramStage && (
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 12 }} align="left">
                    {t("status")}
                  </TableCell>
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
                    const dueDate = ev.dueDate ? format(new Date(ev.dueDate), "yyyy-MM-dd") : "";
                    const eventDate = ev.eventDate ? format(new Date(ev.eventDate), "yyyy-MM-dd") : "";
                    const currentDate = format(new Date(), "yyyy-MM-dd");
                    if (dueDate && !eventDate) {
                      if (currentDate > dueDate) {
                        status = "OVERDUE";
                      }
                    }
                    return (
                      <TableRow
                        sx={{ cursor: "pointer", backgroundColor: LEGEND[status] }}
                        hover
                        key={ev.event}
                        onClick={() => {
                          setEvent("currentEvent", ev);
                          // selectEvent(ev.event);
                          // if (!ev.eventDate) {
                          //   setLayout("eventFormEditing", true);
                          // }
                        }}
                      >
                        <TableCell sx={{ fontSize: 12 }} align="left">
                          {t(ev.status)}
                        </TableCell>
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
          )}
        </div>
        <EventFormDialog />
      </div>
    </div>
  );
};
export default Event;
