import { Box, Table, TableBody } from "@mui/material";
import MapTable from "../../common/MapTable";

const CustomSection = ({ sectionLabel, tableName, dataElementConfigs }) => {
  return (
    <Box className="section-box">
      <Box className="section section-label">{sectionLabel}</Box>
      <Table className="dhis2-list-table">
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName={tableName}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

export default CustomSection;
