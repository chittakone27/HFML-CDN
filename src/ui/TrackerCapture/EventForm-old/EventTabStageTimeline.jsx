import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { useShallow } from "zustand/react/shallow";
const EventTabStageTimeline = ({ currentProgramStage }) => {
  const { t } = useTranslation();
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const { currentTei, currentEnrollment, currentEvents, selectedEvent, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      currentTei: state.data.currentTei,
      currentEnrollment: state.data.currentEnrollment,
      currentEvents: state.data.currentEvents,
      selectedEvent: state.data.selectedEvent,
      actions: state.actions
    }))
  );
  const { selectEvent, initNewEvent, setLayout } = actions;
  const foundEvents = currentEvents.filter((ce) => ce.programStage === currentProgramStage.id);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);

  return (
    <div className="tracker-event-tab-stage-form-content-container">
      <div className="tracker-event-tab-stage-form-left-bar">
        <div style={{ padding: 5, width: "100%", textAlign: "center", borderBottom: "1px solid #e0e0e0" }}>
          <Button
            variant="contained"
            onClick={(event) => {
              if (currentProgramStage.repeatable) {
                initNewEvent(currentProgramStage.id);
                setLayout("eventFormEditing", true);
              } else {
                const foundEvent = currentEvents.find((ce) => ce.programStage === currentProgramStage.id);
                if (!foundEvent) {
                  initNewEvent(currentProgramStage.id);
                  setLayout("eventFormEditing", true);
                }
              }
            }}
          >
            {t("newEvent")}
          </Button>
        </div>
        {foundEvents.map((fe) => {
          const foundOrgUnit = orgUnits.find((ou) => ou.id === fe.orgUnit);
          return (
            <div
              className="tracker-event-tab-stage-form-event-item"
              onClick={() => {
                console.log(fe.event, currentEvent);
                if (fe.event !== (currentEvent ? currentEvent.event : "")) {
                  selectEvent(fe.event);
                  setLayout("eventFormEditing", false);
                }
              }}
            >
              <div>
                <strong>{fe.eventDate}</strong>&nbsp;&nbsp;
                {fe.event === selectedEvent && <FontAwesomeIcon icon={faArrowRight} />}
              </div>
              <div>{foundOrgUnit.displayName}</div>
            </div>
          );
        })}
      </div>
      <div className="tracker-event-tab-stage-form-form">{currentEvent && <Form />}</div>
    </div>
  );
};
export default EventTabStageTimeline;
