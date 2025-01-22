import { Box, Table, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";

import { withEventDate, RowMapper, SectionCollapse } from "@/configs/lao/program-forms/common/tracker";
import "../eir.css";

const GrowthMonitoring = () => {
  const { t } = useTranslation();

  return (
    <Box className="eir-form">
      <SectionCollapse title={t("Growth monitoring details")} disabledCollapse>
        <Table>
          <TableBody>
            <RowMapper rows={section1Configs} tableName={"Growth monitoring details"} context="event" />
          </TableBody>
        </Table>
      </SectionCollapse>
      <SectionCollapse title={t("Vit A & Deworming")} disabledCollapse sx={{ mt: 1 }}>
        <Table>
          <TableBody>
            <RowMapper rows={section2Configs} tableName={"Vit A & Deworming"} context="event" />
          </TableBody>
        </Table>
      </SectionCollapse>
    </Box>
  );
};

const section1Configs = [[{ id: "DxOqZZgVQhF" }], [{ id: "MV1yoC7BfnG" }], [{ id: "xvE2z6W3wYh" }], [{ id: "acQoZnFeVYZ" }], [{ id: "fwerjuyn3QC" }]];

const section2Configs = [[{ id: "GVHTqqwolWD" }], [{ id: "VUn6z5bss2H" }], [{ id: "DzNWdRvRB11" }]];

export default withEventDate(GrowthMonitoring, "eventDate");
