import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Box, Grid } from "@mui/material";
import { FieldRow } from "../common/MuiStyled";
import useSelectionStore from "@/state/selection";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import DataValueLabel from "@/ui/EventCapture/Form/DataValueLabel";
import Accordion from "../common/Accordion";

import useEventCaptureStore from "@/state/eventCapture";

const InfrastructureMappingEvent = () => {
  const program = useSelectionStore((state) => state.program);
  const programDataElements = program.programStages[0].programStageDataElements;
  const programStageSections = program.programStages[0].programStageSections;

  const { currentEvent, status, actions } = useEventCaptureStore(
    useShallow((state) => ({ currentEvent: state.currentEvent, status: state.status, actions: state.actions }))
  );

  useEffect(() => {
    if (status.hiddenSections.length !== 0) {
      const newEvent = _.cloneDeep(currentEvent);
      newEvent.dataValues = status.hiddenSections.forEach((section) => {
        const found = programStageSections.find((pss) => pss.id === section);
        found.dataElements.forEach((de) => {
          newEvent.dataValues[de.id] = "";
        });
      });
      actions.setCurrentEvent(newEvent);
    }
  }, [Object.values(currentEvent).join(""), Object.values(currentEvent.dataValues).join("")]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: "10px" }}>
      {programStageSections.map((section) => {
        const hidden = status.hiddenSections.includes(section.id);
        const currentProgramDataElements = section.dataElements.map((de) => {
          const found = programDataElements.find((pde) => pde.dataElement.id === de.id);
          return found ? found : null;
        });

        if (hidden) return null;
        return (
          <Accordion key={section.id} title={section.displayName}>
            {gridLayoutSections.includes(section.id) ? (
              <Grid container>
                {currentProgramDataElements.map((pde, index) => {
                  const length = currentProgramDataElements.length;
                  const isLastItems = index >= length - (length % 3);

                  return (
                    <Grid item xs={4} key={pde.dataElement.id} sx={{ borderBottom: isLastItems ? 0 : "1px solid #e0e0e0", p: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "30px",
                          borderLeft: !(index % 3) ? 0 : "1px solid #e0e0e0",
                          "& label": { marginRight: 0.5 },
                        }}
                      >
                        <DataValueField dataElement={pde.dataElement.id} />
                        <DataValueLabel dataElement={pde.dataElement.id} />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              currentProgramDataElements.map((pde) => (
                <FieldRow>
                  <div>
                    <DataValueLabel dataElement={pde.dataElement.id} />
                  </div>
                  <div>
                    <DataValueField dataElement={pde.dataElement.id} />
                  </div>
                </FieldRow>
              ))
            )}
          </Accordion>
        );
      })}
    </Box>
  );
};

const gridLayoutSections = ["QJnELvrdJkk", "tXNvPcS2tn7"];

export default InfrastructureMappingEvent;
