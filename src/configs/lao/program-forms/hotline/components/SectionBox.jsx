import { Box, Table, TableBody } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";

const SectionBox = ({ sectionLabel, dataElementConfigs, ...props }) => {
  const { t } = useTranslation();

  return (
    <Box
      className="section-box bordered"
      sx={{
        margin: "9px 10px 20px 10px",
        border: "1px solid #29b6f6 !important",
        borderRadius: "8px"
      }}
      {...props}
    >
      <Box
        className="section section-label"
        sx={{
          textAlign: "center",
          borderBottom: "1.5px solid #29b6f6",
          backgroundColor: "#e1f5fe",
          borderRadius: "8px 8px 0px 0px",
          padding: "8px 0px 8px 0px"
        }}
      >
        {t(sectionLabel)}
      </Box>
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
