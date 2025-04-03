import { useEffect, useState } from "react";
import { Dialog, Button, Tabs, Tab } from "@mui/material";
import DeliveryDetails from "./eventForms/DeliveryDetails";
import Infant from "./eventForms/Infant";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import { findDataValue } from "../../common/utils";
const DeliveryDialog = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEnrollment, currentProgramStage, editing } = event;

  const currentEvent = currentEnrollment.events[0];
  const { setEvent } = actions;
  const completed = currentEnrollment && currentEnrollment.status === "COMPLETED";
  const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
  let children = [];
  if (childTeisValue) {
    children = JSON.parse(childTeisValue);
  }

  useEffect(() => {
    setTab(0);
    setEvent("currentChild", null);
  }, [currentEnrollment.enrollment]);

  return currentEnrollment ? (
    <Dialog fullWidth={true} maxWidth={"lg"} open={true}>
      <div className="chr-tracker-event-form-container">
        <div className="chr-tracker-event-form">
          <div className="chr-tracker-delivery-tabs-container">
            <Tabs
              value={tab}
              onChange={(event, value) => {
                setTab(value);
                setEvent("currentChild", children[value - 1]);
              }}
            >
              <Tab label={t("deliveryDetails")} />
              {children.map((child, index) => {
                return <Tab label={t("infant") + " " + (index + 1)} />;
              })}
            </Tabs>
          </div>
          <div className="chr-tracker-delivery-content">
            {tab === 0 && <DeliveryDetails />}
            {tab !== 0 && <Infant />}
          </div>
        </div>
        <div className="chr-tracker-event-form-buttons">
          {editing && (
            <Button
              variant="contained"
              onClick={() => {
                setEvent("editing", false);
              }}
            >
              {t("save")}
            </Button>
          )}
          {!editing && !completed && (
            <Button
              variant="contained"
              onClick={() => {
                setEvent("editing", true);
              }}
            >
              {t("edit")}
            </Button>
          )}
          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="error"
            onClick={() => {
              setEvent("currentEnrollment", null);
            }}
          >
            {t("close")}
          </Button>
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default DeliveryDialog;
