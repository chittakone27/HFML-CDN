import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import useFamilyPlanningRules from "./useFamillyPlanningRules";
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
  const props = useFamilyPlanningRules();
  // console.log(props);

  const familyPlanningProgram = programs.find((e) => e.id === "PBLmYwloRHu");
  let programStage = null;
  let dataElementConfigs = [];
  if (familyPlanningProgram) {
    programStage = familyPlanningProgram.programStages.find((e) => e.id === "Sb26npqib05");
    if (programStage) {
      dataElementConfigs = programStage.programStageSections[0].dataElements
        .map((de) => (!props?.hiddenFields?.[de.id] ? [de] : null))
        .filter((e) => e);
    }
  }
  console.log(dataElementConfigs);
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
