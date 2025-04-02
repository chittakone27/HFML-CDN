import { useTranslation } from "react-i18next";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { pickEnrollmentDateLabel, convertDisplayDate } from "@/utils/utils";
import { findDataValue } from "../../common/utils";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";
import useMetadataStore from "@/state/metadata";
import _ from "lodash";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import DeliveryDialog from "./DeliveryDialog";

const Deliveries = () => {
  const { t } = useTranslation();
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
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
  const { setEvent } = actions;
  const { currentEnrollments, currentEvents } = data;
  const foundDeliveryEnrollments = currentEnrollments.filter((ce) => ce.program === "AyPkCOMmgdd");
  const foundActiveEnrollment = foundDeliveryEnrollments.find((fde) => fde.status === "ACTIVE");
  const gpalDataElements = ["x9pl4PJop26", "fm0Mge3AePX", "E4lPyETCSON", "Vny88TWPZ1I"].map((de) => {
    const foundDe = dataElements.find((currentDe) => currentDe.id === de);
    return foundDe;
  });
  return (
    <div className="chr-deliveries-container">
      <div>
        <div className="chr-deliveries-title">{t("listOfDeliveries")}</div>
        <div className="chr-deliveries-content">
          <DeliveryDialog />
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
                const numberOfBabies = foundDataValue ? JSON.parse(foundDataValue.value).length : 0;
                return (
                  <TableRow
                    hover
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setEvent("currentEnrollment", fde);
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
        </div>
      </div>
    </div>
  );
};
export default Deliveries;
