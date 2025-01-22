import { Box, Table, TableBody, TableCell } from "@mui/material";
import MapTable from "../../common/MapTable";
import TbCaseFindingTable from "../components/TbCaseFindingTable";

const CatCell = () => (
  <Table>
    <TableBody>
      <MapTable tableName="cat" dataElementConfigs={catTableConfigs} />
    </TableBody>
  </Table>
);

const IPTCell = () => (
  <Box sx={{ display: "flex", height: 1, alignItems: "flex-start" }}>
    <Table>
      <TableBody>
        <MapTable tableName="ipt" dataElementConfigs={iptTableConfigs} />
      </TableBody>
    </Table>
  </Box>
);

const TBPatientTreatment = () => {
  return (
    <TbCaseFindingTable
      headerTitle="TB_patient_categories"
      dataElementConfigs={dataElementConfigs}
    />
  );
};
const disableStyle = {
  backgroundColor: "#ddd",
  width: "100px",
};

const dataElementConfigs = [
  [
    { customCell: <CatCell />, style: { width: "40%" } },
    { display: "empty", style: { width: "20%" } },
    { customCell: <IPTCell />, style: { width: "40%" } },
  ],
];

const catTableConfigs = [
  [
    { display: "text", text: "Cat I", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "lcbE0bGOBM1" },
  ],
  [
    { display: "text", text: "Cat II", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "s9jGKTp75oy" },
  ],
  [
    { display: "text", text: "Cat C", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "CL7LFJlgutY" },
  ],
  [
    { display: "text", text: "Cat C(r)", style: disableStyle },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ZbF0tPJ0sFl" },
  ],
];

const iptTableConfigs = [
  [
    {
      display: "text",
      text: "IPT",
      style: disableStyle,
      cellProps: { rowSpan: 2 },
    },
    { display: "text", text: "Children", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wWVhOfv8Oru",
      style: { width: "40%" },
    },
  ],
  [
    { display: "text", text: "PLHIV", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hGG3gpo5uKF",
      style: { width: "40%" },
    },
  ],
];

export default TBPatientTreatment;
