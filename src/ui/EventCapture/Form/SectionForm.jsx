import { useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, styled, Box, Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { grey } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DataValueField from "./DataValueField";
import DataValueLabel from "./DataValueLabel";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import _ from "lodash";

const SectionForm = () => {
  const { currentEvent, status, actions } = useEventCaptureStore(
    useShallow((state) => ({ currentEvent: state.currentEvent, status: state.status, actions: state.actions }))
  );
  const program = useSelectionStore((state) => state.program);
  const programDataElements = program.programStages[0].programStageDataElements;
  const programStageSections = program.programStages[0].programStageSections;

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
        return !hidden ? (
          <StyleAccordion key={section.id} defaultExpanded elevation={0}>
            <Title expandIcon={<ArrowForwardIosIcon fontSize="small" sx={{ fontSize: "0.9rem" }} />}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {section.displayName}
              </Typography>
            </Title>
            <Content>
              {currentProgramDataElements.map((pde) => (
                <FieldRow>
                  <div>
                    <DataValueLabel dataElement={pde.dataElement.id} />
                  </div>
                  <div>
                    <DataValueField dataElement={pde.dataElement.id} />
                  </div>
                </FieldRow>
              ))}
            </Content>
          </StyleAccordion>
        ) : null;
      })}
    </Box>
  );
};

const FieldRow = styled(Box)({
  width: "100%",
  display: "flex",
  borderBottom: "1px solid #c2c2c2",
  "&:has(div:empty)": { display: "none" },
  "&:last-child": { borderBottom: 0 },
  "&>div": {
    display: "flex",
    alignItems: "center",
    "&:empty": { display: "none" },
    "&:nth-of-type(1)": {
      padding: 10,
      width: 300
    },
    "&:nth-of-type(2)": {
      padding: 10,
      paddingLeft: 0,
      flex: 1,
      "&>div": {
        width: "100%",
        paddingLeft: 20,
        borderLeft: "1px solid #c2c2c2"
      }
    }
  }
});

const StyleAccordion = styled(Accordion)({
  margin: 0,
  overflow: "hidden",
  borderRadius: "4px",
  border: "1px solid #c2c2c2",
  "&.Mui-expanded": { margin: 0 }
});

const Title = styled(AccordionSummary)({
  backgroundColor: grey[100],
  borderBottom: 0,
  minHeight: "auto",
  padding: "12px 10px",
  "&.Mui-expanded": { minHeight: "auto", borderBottom: "1px solid #c2c2c2" },
  "& .MuiAccordionSummary-content": {
    margin: 0,
    "&.Mui-expanded": {
      margin: 0
    }
  }
});

const Content = styled(AccordionDetails)({
  padding: 0,
  "& table tr:last-child td": { borderBottom: 0 }
});

export default SectionForm;
