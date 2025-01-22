import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MapTable from "../MapTable";

import "../index.css";
import { memo } from "react";

const TableSection = ({
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
              sx={{ color: "#fff", backgroundColor: "#2c6693" }}
            >
              {sectionTitle}
            </TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        <MapTable
          dataElementConfigs={dataElementConfigs}
          tableName={sectionTitle}
        />
      </TableBody>
    </Table>
  );
};

export default memo(TableSection);
