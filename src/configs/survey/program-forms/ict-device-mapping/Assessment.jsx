import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";

import Accordion from "../common/Accordion";
import useAssessmentRules from "./useAssessmentRules";

const Assessment = () => {
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const sections = program.programStages[0].programStageSections;
  const props = useAssessmentRules();

  Object.keys(props.assignations).forEach((a) => {
    const dataElement = a;
    const value = props.assignations[a];
    actions.changeDataValue(currentEvent.event, dataElement, value);
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <EventDateLabel type="eventDate" />
        <EventDateFieldNoBlur
          maxDate={format(new Date(), "yyyy-MM-dd")}
          type="eventDate"
          focus={() => {
            const maxDate = format(new Date(), "yyyy-MM-dd");
            const dueDate = format(
              new Date(currentEvent.dueDate),
              "yyyy-MM-dd"
            );
            if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
              if (dueDate > maxDate) {
                actions.changeEventProperty(
                  currentEvent.event,
                  "eventDate",
                  maxDate
                );
              } else {
                actions.changeEventProperty(
                  currentEvent.event,
                  "eventDate",
                  dueDate
                );
              }
            }
          }}
        />
      </Box>
      {sections.map((section) => {
        return (
          <Accordion title={section.displayName}>
            {section.dataElements.map((de) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Box sx={{ width: "300px", padding: "10px" }}>
                    <DataValueLabel dataElement={de.id} />
                  </Box>
                  <Box
                    sx={{
                      flex: "1",
                      borderLeft: "1px solid #e0e0e0",
                      padding: "10px",
                    }}
                  >
                    <DataValueFieldNoBlur dataElement={de.id} />
                  </Box>
                </Box>
              );
            })}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Assessment;
