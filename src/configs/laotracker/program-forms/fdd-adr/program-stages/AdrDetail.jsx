import { Box, Table, TableBody } from "@mui/material";
import { RowMapper } from "@/configs/laotracker/program-forms/common/tracker";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import EventDateField from "@/ui/TrackerCapture/EventForm/EventDateField";
import { listTables } from "./ tableMapping";
import "./adrDetail.css";

const AdrDetail = () => {
  return (
    <div className="adr-details-form">
      <div style={{ paddingBottom: "5px", display: "flex" }}>
        <div style={{ fontSize: "0.9rem", marginRight: "10px" }}>
          <EventDateLabel type={"eventDate"} label={"Event date"} />
          <EventDateField type={"eventDate"} />
        </div>
        {/* <div style={{ fontSize: "0.9rem" }}>
          <EventDateLabel type={"dueDate"} label={"Due date"} />
          <EventDateField type={"dueDate"} />
        </div> */}
      </div>
      {listTables.map((table) => (
        <Box key={table["tableName"]} sx={{ marginBottom: "10px" }}>
          <Table sx={{ border: "1px solid #ccc" }}>
            <TableBody>
              <RowMapper context="event" tableName={table["tableName"]} rows={table["tableFields"]} />
            </TableBody>
          </Table>
        </Box>
      ))}
    </div>
  );
};

export default AdrDetail;
