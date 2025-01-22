import { Box, Table, TableBody } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";

const SectionBox = ({ sectionLabel, dataElementConfigs, ...props }) => {
  const { t } = useTranslation();

  return (
    <Box
      className="section-box bordered"
      sx={{ marginBottom: "15px" }}
      {...props}
    >
      <Box className="section section-label">{t(sectionLabel)}</Box>
      <Table className="dhis2-list-table">
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName={sectionLabel}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

export default memo(SectionBox);
