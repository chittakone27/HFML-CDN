import { useEffect, useState } from "react";
import { Dialog, Button, Tabs, Tab } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeliveryDetails from "./eventForms/DeliveryDetails";
import Infant from "./eventForms/Infant";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import { findDataValue } from "../../common/utils";
import _ from "lodash";
import { tracker } from "@/api";
const { saveEvent } = tracker;
const DeliveryDialog = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const { trackerActions } = useTrackerCaptureStore(
    useShallow((state) => ({
      trackerActions: state.actions
    }))
  );
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
  const { currentEnrollment, currentProgramStage, currentEvent, editing } = event;

  const { setEvent } = actions;
  const { saveEventToState } = trackerActions;

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
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={async () => {
                setLoading(true);
                saveEventToState(currentEvent);
                await saveEvent(currentEvent);
                setEvent("editing", false);
                setLoading(false);
              }}
            >
              {t("save")}
            </LoadingButton>
          )}
          {!editing && !completed && (
            <LoadingButton
              variant="contained"
              onClick={() => {
                setEvent("editing", true);
              }}
            >
              {t("edit")}
            </LoadingButton>
          )}
          <LoadingButton
            loading={loading}
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="error"
            onClick={() => {
              setEvent("currentEnrollment", null);
              setEvent("currentEvent", null);
              setEvent("editing", false);
            }}
          >
            {t("close")}
          </LoadingButton>
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default DeliveryDialog;
