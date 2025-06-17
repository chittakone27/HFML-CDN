import { useTranslation } from "react-i18next";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { pickEnrollmentDateLabel, convertDisplayDate, generateUid } from "@/utils/utils";
import { findDataValue } from "../../common/utils";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";
import useMetadataStore from "@/state/metadata";
import _ from "lodash";
import { format } from "date-fns";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import DeliveryDialog from "./DeliveryDialog";
import { useState } from "react";
import { tracker } from "@/api";
import { LoadingButton } from "@mui/lab";
const { saveEnrollment, saveEvent } = tracker;

const Deliveries = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { data, trackerActions } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      trackerActions: state.actions
    }))
  );
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );

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
  const { currentEnrollment } = event;
  const { setEvent } = actions;
  const { currentTei, currentEnrollments, currentEvents } = data;
  const { setData } = trackerActions;
  const foundProgramStage = program.programStages.find((ps) => ps.id === "YOHVx1Xmpgr");
  const foundDeliveryEnrollments = currentEnrollments.filter((ce) => ce.program === "AyPkCOMmgdd");
  const foundActiveEnrollment = foundDeliveryEnrollments.find((fde) => fde.status === "ACTIVE");
  const gpalDataElements = ["x9pl4PJop26", "fm0Mge3AePX", "E4lPyETCSON", "Vny88TWPZ1I"].map((de) => {
    const foundDe = dataElements.find((currentDe) => currentDe.id === de);
    return foundDe;
  });
  let ableToEnroll = foundActiveEnrollment ? false : true;

  const createNewDelivery = async () => {
    if (ableToEnroll) {
      setLoading(true);
      const newEnrId = generateUid();
      const newEventId = generateUid();
      const currentDate = format(new Date(), "yyyy-MM-dd");
      const newEvent = {
        event: newEventId,
        eventDate: currentDate,
        orgUnit: orgUnit.id,
        program: program.id,
        programStage: "YOHVx1Xmpgr",
        trackedEntityInstance: currentTei.trackedEntityInstance,
        enrollment: newEnrId,
        dataValues: []
      };
      const newEnrollment = {
        attributes: [],
        orgUnit: orgUnit.id,
        program: program.id,
        trackedEntityInstance: currentTei.trackedEntityInstance,
        enrollment: newEnrId,
        trackedEntityType: program.trackedEntityType.id,
        enrollmentDate: currentDate,
        incidentDate: currentDate,
        status: "ACTIVE",
        events: [newEvent]
      };
      await saveEnrollment(newEnrollment);
      const clonedEnrollments = _.cloneDeep(currentEnrollments);
      clonedEnrollments.push(newEnrollment);
      const clonedEvents = _.cloneDeep(currentEvents);
      clonedEvents.push(newEvent);
      setData("currentEnrollments", clonedEnrollments);
      setData("currentEvents", clonedEvents);
      setData("currentEnrollment", newEnrollment);
      setEvent("currentEnrollment", newEnrollment);
      setEvent("currentProgramStage", foundProgramStage);
      setEvent("currentEvent", newEvent);
      setLoading(false);
    }
  };
  return (
    <div className="chr-deliveries-container">
      <div>
        <div className="chr-deliveries-title">{t("listOfDeliveries")}</div>
        <div className="chr-deliveries-content">
          {currentEnrollment && <DeliveryDialog />}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>{pickEnrollmentDateLabel(program, t)}</strong>
                </TableCell>
                {gpalDataElements.map((de) => {
                  return (
                    <TableCell>
                      <strong>{de.displayFormName}</strong>
                    </TableCell>
                  );
                })}
                <TableCell>
                  <strong>{t("deliveredAtFacility")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("numberOfBabies")}</strong>
                </TableCell>
                <TableCell>
                  <strong>{t("status")}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.sortBy(foundDeliveryEnrollments, "enrollmentDate").map((fde) => {
                const foundOu = orgUnits.find((ou) => fde.orgUnit === ou.id);
                const foundEvent = currentEvents.find((ce) => ce.enrollment === fde.enrollment && ce.programStage === "YOHVx1Xmpgr");
                const foundDataValue = foundEvent.dataValues.find((dv) => dv.dataElement === "lYdXxom1BAG");
                const numberOfBabies = foundDataValue && foundDataValue.value ? JSON.parse(foundDataValue.value).length : 0;
                return (
                  <TableRow
                    hover
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      if (foundOu.id !== orgUnit.id) {
                        return;
                      }
                      const newEventId = generateUid();
                      setEvent("currentEnrollment", fde);
                      setEvent("currentProgramStage", foundProgramStage);
                      setEvent(
                        "currentEvent",
                        foundEvent
                          ? foundEvent
                          : {
                              isDirty: true,
                              isNew: true,
                              eventDate: format(new Date(), "yyyy-MM-dd"),
                              dueDate: format(new Date(), "yyyy-MM-dd"),
                              event: newEventId,
                              orgUnit: orgUnit.id,
                              enrollment: fde.enrollment,
                              trackedEntityInstance: fde.trackedEntityInstance,
                              program: fde.program,
                              programStage: "YOHVx1Xmpgr",
                              dataValues: [],
                              status: "ACTIVE"
                            }
                      );
                    }}
                  >
                    <TableCell>{convertDisplayDate(fde.enrollmentDate)}</TableCell>
                    {gpalDataElements.map((de) => {
                      const value = findDataValue(foundEvent.dataValues, de.id);
                      return <TableCell>{value}</TableCell>;
                    })}
                    <TableCell>{foundOu.displayName}</TableCell>
                    <TableCell>{numberOfBabies}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: fde.status === "COMPLETED" ? "#2e7d32" : "#ed6c02"
                      }}
                    >
                      {t(fde.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div style={{ padding: 5 }}>
            <LoadingButton loading={loading} disabled={!ableToEnroll} variant="contained" onClick={createNewDelivery}>
              {t("addNewDelivery")}
            </LoadingButton>
            <div className="add-new-delivery-warning">{!ableToEnroll && <div>{t("addNewDeliveryWarning")}</div>}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Deliveries;
