import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import { Box, Table, TableBody } from "@mui/material";
import {
  RowMapper,
  withEventDate,
  withRules
} from "@/configs/lao/program-forms/common/tracker";
import "../delivery.css";

const VisualInspection = () => {
  const programs = useMetadataStore((state) => state.programs, shallow);
  const deliveryProgram = programs.find((e) => e.id === "QBy4wo6YZ0O");
  let programStage = null;
  let dataElementConfigs = [];
  if (deliveryProgram) {
    programStage = deliveryProgram.programStages.find(
      (e) => e.id === "nWaJIQBWtPK"
    );
    if (programStage) {
      dataElementConfigs = programStage.programStageDataElements.map((e) => {
        return [e.dataElement];
      });
    }
  }
  return deliveryProgram && programStage ? (
    <Box className="delivery-form">
      <Table>
        <TableBody>
          <RowMapper
            rows={dataElementConfigs}
            tableName={"VisualInspection"}
            context="event"
          />
        </TableBody>
      </Table>
    </Box>
  ) : null;
};

export default withEventDate(withRules(VisualInspection), "eventDate");
