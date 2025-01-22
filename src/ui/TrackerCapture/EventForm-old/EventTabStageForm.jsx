import withModuleSection from "@/hocs/withModuleSection";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import configs from "@/configs";
import Form from "./Form";
import { Tabs, Tab } from "@mui/material";
import EventTabStageTimeline from "./EventTabStageTimeline";
import EventTabStageTabular from "./EventTabStageTabular";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./EventTabStageForm.css";
const { VITE_CONFIG_NAME } = import.meta.env;
const EventTabStageForm = () => {
  const { customForms, trackerFormTypes } = configs[VITE_CONFIG_NAME];
  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
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
  const [tab, setTab] = useState(0);
  const currentProgramStage = program.programStages[tab];
  const foundEvents = currentEvents.filter((ce) => ce.programStage === currentProgramStage.id);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  useEffect(() => {
    setLayout("eventFormEditing", false);
  }, []);

  const currentFormTypes = trackerFormTypes[program.id] ? trackerFormTypes[program.id] : null;
  return (
    <div className="tracker-event-tab-stage-form-container">
      <div className="tracker-event-tab-stage-form-tab-container">
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
            selectEvent("");
            setLayout("eventFormEditing", false);
          }}
        >
          {program.programStages.map((ps) => {
            const totalEvents = currentEvents.filter((ce) => ce.programStage === ps.id).length;
            return <Tab label={`${ps.displayName} (${totalEvents}) `} />;
          })}
        </Tabs>
      </div>
      {currentFormTypes.includes("timeline") && <EventTabStageTimeline currentProgramStage={currentProgramStage} />}
      {currentFormTypes.includes("tabular") && <EventTabStageTabular currentProgramStage={currentProgramStage} />}
    </div>
  );
};

export default EventTabStageForm;
