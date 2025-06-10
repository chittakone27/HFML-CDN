import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { Box, Table, TableBody } from "@mui/material";
import {
  RowMapper,
  withEventDate,
  withRules
} from "@/configs/laotracker/program-forms/common/tracker";
import { listTables } from "./tableMapping";

const CommunityDeathDetail = () => {
  const { programs } = useMetadataStore(
    useShallow((state) => ({ programs: state.programs }))
  );

  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({ layout: state.layout }))
  );

  const communityDeathProgram = programs.find((e) => e.id === "d9eJlJsqplx");
  let programStage = null;

  if (communityDeathProgram) {
    programStage = communityDeathProgram.programStages.find(
      (e) => e.id === "d7Q9zL8yYpA"
    );
  }

  return communityDeathProgram && programStage ? (
    <div className="adr-details-form">
      <div style={{ paddingBottom: "5px", display: "flex" }}>
        <div style={{ fontSize: "0.9rem", marginRight: "10px" }}>
          <span style={{ fontWeight: "bold" }}>1.&nbsp;</span>Event date
        </div>
      </div>
      {listTables.map((table) => (
        <Box key={table.tableName} sx={{ marginBottom: "10px" }}>
          <Table sx={{ border: "1px solid #ccc" }}>
            <TableBody>
              <RowMapper
                context="event"
                tableName={table.tableName}
                rows={table.tableFields}
                editable={layout.eventFormEditing}
              />
            </TableBody>
          </Table>
        </Box>
      ))}
    </div>
  ) : null;
};

export default withEventDate(withRules(CommunityDeathDetail));
