import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { Box, Table, TableBody } from "@mui/material";
import { RowMapper, withEventDate, withRules } from "@/configs/laotracker/program-forms/common/tracker";
import "../abortionDetails.css";

const AbortionDetails = () => {
  const { programs } = useMetadataStore(useShallow((state) => ({ programs: state.programs })));
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout
    }))
  );
  const abortionDetailsProgram = programs.find((e) => e.id === "vqNgkw4gfw7");
  let programStage = null;
  let dataElementConfigs = [];
  if (abortionDetailsProgram) {
    programStage = abortionDetailsProgram.programStages.find((e) => e.id === "ks9YrW50xb5");
    if (programStage) {
      dataElementConfigs = programStage.programStageDataElements.map((e) => {
        return [e.dataElement];
      });
    }
  }
  return abortionDetailsProgram && programStage ? (
    <Box className="abortion-details-form">
      <Table>
        <TableBody>
          <RowMapper rows={dataElementConfigs} tableName={"Abortion Details"} context="event" editable={layout.eventFormEditing} />
        </TableBody>
      </Table>
    </Box>
  ) : null;
};

export default withEventDate(withRules(AbortionDetails));
