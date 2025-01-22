import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import TrackerMapTable from "../TrackerMapTable";

// import "../index.css";
import { memo } from "react";

const TrackerTableSection = ({
  dataElementConfigs,
  sectionTitle,
  noHeader = false,
  sx,
  ...props
}) => {
  return (
    <Table {...props} sx={{ width: "100%", ...sx }}>
      {!noHeader && (
        <TableHead>
          <TableRow>
            <TableCell
              className="strong-text"
              colSpan={10}
              sx={{
                backgroundColor: "#CFD8DC",
                padding: "10px",
                fontWeight: "bold"
              }}
            >
              {sectionTitle}
            </TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        <TrackerMapTable
          dataElementConfigs={dataElementConfigs}
          tableName={sectionTitle}
        />
      </TableBody>
    </Table>
  );
};

export default memo(TrackerTableSection);
