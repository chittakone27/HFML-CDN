import { Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import DeliveryStageForm from "./Stage";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { pickEnrollmentDateLabel, convertDisplayDate } from "@/utils/utils";
import "./Deliveries.css";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { tracker } from "@/api";
import _ from "lodash";
import { generateUid } from "@/utils/utils";
import { format } from "date-fns";
import { Loader } from "@/ui/common";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { findDataValue } from "../../common/utils";
const { saveEnrollment } = tracker;

const Deliveries = () => {
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const { t } = useTranslation();
  const { orgUnits, dataElements } = useMetadataStore(
    useShallow((state) => ({
      orgUnits: state.orgUnits,
      dataElements: state.dataElements
    }))
  );
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data
    }))
  );
  const { currentEnrollments, currentEvents, currentTei } = data;
  const { setData, selectEvent, setLayout } = actions;
  const { currentEvent } = useCurrentEvent();
  const foundDeliveryEnrollments = currentEnrollments.filter((ce) => ce.program === "AyPkCOMmgdd");
  const foundActiveEnrollment = foundDeliveryEnrollments.find((fde) => fde.status === "ACTIVE");
  const gpalDataElements = ["x9pl4PJop26", "fm0Mge3AePX", "E4lPyETCSON", "Vny88TWPZ1I"].map((de) => {
    const foundDe = dataElements.find((currentDe) => currentDe.id === de);
    return foundDe;
  });
  let ableToEnroll = foundActiveEnrollment ? false : true;

  const doEnroll = async () => {
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
      selectEvent(newEvent.event);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentEvent && currentEvent.event) {
      setDialog(true);
    } else {
      setDialog(false);
    }
  }, [currentEvent ? currentEvent.event : ""]);

  // useEffect(() => {
  // setData("currentEnrollment", {});
  // }, [currentTei ? currentTei.trackedEntityInstance : ""]);

  return (
    <div className="deliveries-container">
      <Dialog
        fullWidth
        maxWidth="xl"
        open={dialog}
        onClose={() => {
          setDialog(false);
          selectEvent("");
          setLayout("eventFormEditing", false);
        }}
      >
        <div style={{ height: 750 }}>
          <DeliveryStageForm />
        </div>
      </Dialog>
      <div className="deliveries-title">{t("listOfDeliveries")}</div>
      <div className="deliveries-content">
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
              {/* <TableCell>
                <strong>{t("action")}</strong>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.sortBy(foundDeliveryEnrollments, "enrollmentDate").map((fde) => {
              const foundOu = orgUnits.find((ou) => fde.orgUnit === ou.id);
              const foundEvent = currentEvents.find((ce) => ce.enrollment === fde.enrollment && ce.programStage === "YOHVx1Xmpgr");
              const foundDataValue = foundEvent.dataValues.find((dv) => dv.dataElement === "lYdXxom1BAG");
              const numberOfBabies = foundDataValue ? JSON.parse(foundDataValue.value).length : 0;
              return (
                <TableRow
                  hover
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setData("currentEnrollment", fde);
                    selectEvent(foundEvent.event);
                    setDialog(true);
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
                  {/* <TableCell>
                    {fde.status !== "COMPLETED" && (
                      <div
                        onClick={() => {
                          completeEnrollment(fde.enrollment);
                        }}
                      >
                        <LoadingButton variant="contained" color="success" loading={loading}>
                          {t("completeThisDelivery")}
                        </LoadingButton>
                      </div>
                    )}
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="add-new-delivery-button">
          <LoadingButton onClick={doEnroll} loading={loading} variant="contained" disabled={!ableToEnroll}>
            {t("addNewDelivery")}
          </LoadingButton>
          <div className="add-new-delivery-warning">{!ableToEnroll && <div>{t("addNewDeliveryWarning")}</div>}</div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
