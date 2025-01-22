import { Box, Table, TableBody, TableCell } from "@mui/material";
import MapTable from "../common/MapTable";

import "../common/index.css";
import "./mch-child-mortality.css";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import { useTranslation } from "react-i18next";
import { useAgeInYearRule } from "../common/hook";

const MchChildMortality = () => {
  useAgeInYearRule("Z1x2iwf6IIY", "DIdyGwQaUnv");

  return (
    <Box className="custom-form" id="mch-child-mortality-form-container">
      <Table>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="mch-child-mortality"
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
      <TableCell>{t("addressOfDeceasedChild")}</TableCell>
      <TableCell>
        <Box className="bordered-left">
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
  [{ id: "Z1x2iwf6IIY" }],
  [{ id: "EhJu5wZBhhc" }],
  [{ id: "IWPNzEBCY6M" }],
  [{ id: "l83MdUzCjBh" }],
  [{ id: "etebLr4tTiV" }],
  [{ id: "J67zuyn1oPT" }],
  [{ customCell: <VillageCell /> }],
  [{ id: "WzhnLfIlcv5" }],
  [{ id: "v7R48UJJqw9" }],
  [{ id: "DEchJENAXGH" }],
  [
    {
      display: "text",
      text: "Additional data",
      cellProps: {
        colSpan: 2,
        className: "strong-text",
        sx: {
          background: "rgb(39, 102, 150)",
          color: "#fff",
          border: "1px solid #d1d1d1",
        },
      },
    },
  ],
  [{ id: "JRJltN5YMaw" }],
];

export default MchChildMortality;
