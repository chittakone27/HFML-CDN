import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { Box, Table, TableBody } from "@mui/material";
import { RowMapper, withEventDate, withRules } from "@/configs/laotracker/program-forms/common/tracker";
import "./BirthDetails.css";
const BirthDetails = () => {
  const { programs } = useMetadataStore(useShallow((state) => ({ programs: state.programs })));
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout
    }))
  );
  const eirProgram = programs.find((e) => e.id === "Yj9cJ34AXw6");
  let programStage = null;
  let dataElementConfigs = [];
  if (eirProgram) {
    programStage = eirProgram.programStages.find((e) => e.id === "bwGkn5ebqkD");
    if (programStage) {
      dataElementConfigs = programStage.programStageSections[0].dataElements.map((e) => {
        return [e];
      });
    }
  }
  return eirProgram && programStage ? (
    <Box className="birth-details-stage-container">
      <Table>
        <TableBody>
          <RowMapper rows={dataElementConfigs} context="event" editable={layout.eventFormEditing} />
        </TableBody>
      </Table>
    </Box>
  ) : null;
};

export default withEventDate(withRules(BirthDetails));
