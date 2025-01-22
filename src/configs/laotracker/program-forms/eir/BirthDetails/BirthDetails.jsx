import { Box, Table, TableBody } from "@mui/material";

import { SectionCollapse, RowMapper, withRules, withEventDate } from "@/configs/lao/program-forms/common/tracker";
import useBirthDetailsRule from "./useBirthDetailsRule";
import "../eir.css";

const BirthDetails = () => {
  useBirthDetailsRule();

  return (
    <Box className="eir-form">
      <SectionCollapse title={"birthDetails"} disabledCollapse>
        <Table>
          <TableBody>
            <RowMapper rows={deConfigs} tableName={"Birth details"} context="event" />
          </TableBody>
        </Table>
      </SectionCollapse>
    </Box>
  );
};

const deConfigs = [
  [{ id: "P1fhF8iYjm7" }],
  [{ id: "EsuDp7LMZTW" }],
  [{ id: "YesvM1AYsNy" }],
  [{ id: "Y9zVpoBIXPR" }],
  [{ id: "O2aFWsqAvWr" }],
  [{ id: "ceZPRvdgryp" }],
  [{ id: "qjcqRVWCIqa" }]
  // [{ id: "VO7tbWG3hxu" }]
  // [{ id: "oajtMHtVLWP" }],
];

export default withEventDate(withRules(BirthDetails), "eventDate");
