import { Box, Table, TableBody, TableCell } from "@mui/material";
import MapTable from "../common/MapTable";

import VtcId from "../common/VctId";
import ArtId from "../common/ArtId";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import { useTranslation } from "react-i18next";

import "../common/index.css";
import "./hiv-chas-2.css";

const HivChas2 = () => {
  return (
    <Box className="custom-form" id="hiv-chas-2-form-container">
      <Table className="reset-border">
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="hiv-chas-2"
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell>{t("currentAddress")}</TableCell>
      <TableCell>
        <Box>
          <VillageSelector
            dataElementIds={["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"]}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

const dataElementConfigs = [
  [
    {
      id: "L623JdOXhWT",
      display: "label",
      cellProps: { sx: { width: "300px" } },
    },
    { customCell: <VtcId resetBorder />, id: "L623JdOXhWT" },
  ],
  [
    { id: "dNYSK3RNpfC", display: "label" },
    { customCell: <ArtId resetBorder />, id: "dNYSK3RNpfC" },
  ],
  [{ id: "IWPNzEBCY6M" }],
  [{ id: "PjpghExB9gB" }],
  [{ id: "C5o37HpqIyv" }],
  [{ id: "dTgxxtW8uqU" }],
  [{ customCell: <VillageCell /> }],
  [{ id: "IO7izgI5cjg" }],
  [{ id: "He0mSMP0gmo" }],
  [{ id: "yJjRFbrhNk0" }],
  [{ id: "YMlxeNI1BQL" }],
  [{ id: "P7vIKGponzn" }],
  [{ id: "SeNwIk6li24" }],
  [{ id: "fmVMYCSPH2f" }],
  [{ id: "Nur21in82q0" }],
  [{ id: "SjaD3FiEwPd" }],
  [{ id: "qTMtA2jbed1" }],
  [{ id: "WEHIlvsRn8i" }],
  [{ id: "IrfW0QnxhpR" }],
];

export default HivChas2;
