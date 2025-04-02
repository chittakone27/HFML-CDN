import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "./state";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import AbortionDetails from "./eventForms/AbortionDetails";
import FamilyPlanning from "./eventForms/FamilyPlanning";
import AncVisitDetails from "./eventForms/AncVisitDetails";
import PncDetails from "./eventForms/PncDetails";
const mapping = {
  vqNgkw4gfw7: {
    ks9YrW50xb5: AbortionDetails
  },
  PBLmYwloRHu: {
    Sb26npqib05: FamilyPlanning
  },
  fflLsS1lm3g: {
    IZ9GXqMAZV8: AncVisitDetails
  },
  u1Na9wCGY6d: {
    huYWjrG6A1C: PncDetails
  }
};
const EventFormDialog = () => {
  const { t } = useTranslation();
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
  const { currentEvent, currentProgramStage, editing } = event;
  const { setEvent } = actions;
  const Component = currentEvent && currentProgramStage && mapping[program.id][currentProgramStage.id];
  const completed = currentEvent && currentEvent.status === "COMPLETED";

  return currentEvent ? (
    <Dialog fullWidth={true} maxWidth={"lg"} open={true}>
      <div className="chr-tracker-event-form-container">
        <div className="chr-tracker-event-form">
          <Component />
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
          {!completed && editing && (
            <Button variant="contained" color="success" onClick={() => {}}>
              {t("complete")}
            </Button>
          )}
          {completed && (
            <Button variant="contained" color="warning" onClick={() => {}}>
              {t("incomplete")}
            </Button>
          )}
          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="error"
            onClick={() => {
              setEvent("currentEvent", null);
              setEvent("editing", false);
            }}
          >
            {t("close")}
          </Button>
        </div>
      </div>
    </Dialog>
  ) : null;
};
export default EventFormDialog;
