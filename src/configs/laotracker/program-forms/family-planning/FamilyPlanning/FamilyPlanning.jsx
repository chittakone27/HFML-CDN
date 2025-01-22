import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { Box, Table, TableBody } from "@mui/material";
import { RowMapper, withEventDate, withRules } from "@/configs/laotracker/program-forms/common/tracker";
import "../familyPlanning.css";

const FamilyPlanning = () => {
  const { programs } = useMetadataStore(useShallow((state) => ({ programs: state.programs })));
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout
    }))
  );
  const familyPlanningProgram = programs.find((e) => e.id === "PBLmYwloRHu");
  let programStage = null;
  let dataElementConfigs = [];
  if (familyPlanningProgram) {
    programStage = familyPlanningProgram.programStages.find((e) => e.id === "Sb26npqib05");
    if (programStage) {
      dataElementConfigs = programStage.programStageDataElements.map((e) => {
        return [e.dataElement];
      });
    }
  }
  return familyPlanningProgram && programStage ? (
    <Box className="family-planning-form">
      <Table>
        <TableBody>
          <RowMapper rows={dataElementConfigs} tableName={"Family Planning Details"} context="event" editable={layout.eventFormEditing} />
        </TableBody>
      </Table>
    </Box>
  ) : null;
};

export default withEventDate(withRules(FamilyPlanning));
