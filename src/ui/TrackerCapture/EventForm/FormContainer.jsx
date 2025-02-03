import { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TabularContainer from "./TabularContainer";
import TimelineContainer from "./TimelineContainer";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import "./FormContainer.css";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;

const FormContainer = () => {
  const { customForms, trackerFormTypes } = configs[VITE_CONFIG_NAME];

  const { t } = useTranslation();
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const orgUnits = useMetadataStore((state) => state.orgUnits);
  const { layout, currentTei, currentEnrollment, currentEvents, selectedEvent, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      currentTei: state.data.currentTei,
      currentEnrollment: state.data.currentEnrollment,
      currentEvents: state.data.currentEvents,
      selectedEvent: state.data.selectedEvent,
      actions: state.actions
    }))
  );
  const { selectEvent, initNewEvent, setLayout } = actions;
  const [tab, setTab] = useState(0);

  const programStages = program.programStages.filter((ps) => {
    const access = ps.access.data.read && ps.access.data.write & (ps.userGroupAccesses.length > 0);
    return access;
  });
  const currentProgramStage = programStages[tab];

  const foundEvents = currentEvents.filter((ce) => ce.programStage === currentProgramStage.id);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);

  useEffect(() => {
    setLayout("eventFormEditing", false);
  }, []);

  const currentFormTypes = trackerFormTypes[program.id] ? trackerFormTypes[program.id] : null;

  const handleExpandCollapse = () => {
    setLayout("hideProfile", !layout.hideProfile);
  };

  const icon = layout.hideProfile ? faArrowLeft : faArrowRight;
  const color = layout.hideProfile ? "#363f4d" : "#ffffff";

  useEffect(() => {
    setLayout("selectedProgramStage", programStages[tab].id);
  }, []);

  return (
    <div className="event-form-container">
      {layout.layout === "layout3" && (
        <div className="event-form-container-expand-collapse-button">
          <IconButton variant="contained" onClick={handleExpandCollapse}>
            <FontAwesomeIcon icon={icon} style={{ color }} />
          </IconButton>
        </div>
      )}
      <div className="event-form-container-tab-container">
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            setTab(newValue);
            selectEvent("");
            setLayout("eventFormEditing", false);
            setLayout("selectedProgramStage", programStages[newValue].id);
          }}
        >
          {programStages.map((ps) => {
            const totalEvents = currentEvents.filter((ce) => ce.programStage === ps.id).length;
            return <Tab label={`${ps.displayName} (${totalEvents}) `} />;
          })}
        </Tabs>
      </div>
      {(() => {
        if (currentFormTypes && currentFormTypes.includes("tabular")) {
          return <TabularContainer currentProgramStage={currentProgramStage} />;
        } else {
          return <TimelineContainer currentProgramStage={currentProgramStage} />;
        }
      })()}
    </div>
  );
};
export default FormContainer;
