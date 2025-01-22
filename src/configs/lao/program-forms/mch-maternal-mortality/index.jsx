import { Box, Table, TableBody, TableCell } from "@mui/material";
import MapTable from "../common/MapTable";

import "../common/index.css";
import "./mch-maternal-mortality.css";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import { useAgeInYearRule, useForeignerRule } from "../common/hook";

const MchMaternalMortality = () => {
  useAgeInYearRule("Z1x2iwf6IIY", "zDPvXY6h4JN");
  useForeignerRule("jaan5ZI8EnJ", villageSectorIds);

  const { currentEvent } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent }),
    shallow
  );

  const dataElementConfigs = useMemo(
    () => [
      [{ id: "Z1x2iwf6IIY" }],
      [{ id: "jaan5ZI8EnJ" }],
      [{ id: "Nsv148saunk" }],
      [{ id: "l83MdUzCjBh" }],
      [{ id: "etebLr4tTiV" }],
      [{ id: "J67zuyn1oPT" }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: currentEvent.dataValues["jaan5ZI8EnJ"],
        },
      ],
      [{ id: "WzhnLfIlcv5" }],
      [{ id: "gEUW5qZdedk" }],
      [{ id: "zjaADh2wy1L" }],
      [{ id: "fEkGiTHJiOh" }],
      [{ id: "j3Bu3vuv9Vp" }],
      [{ id: "ZdMmEAIPQPn" }],
      [{ id: "iTfmvZWMKYk" }],
      [{ id: "M1RRKp7qm57" }],
      [{ id: "FroQ84eIcWe" }],
      [{ id: "Ta8ks29nfer" }],
      [
        {
          display: "text",
          text: "additionalData",
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

      [{ id: "QiZ1yOGsVGV" }],
      [{ id: "GUM9z9xJibL" }],
      [{ id: "i92btBTxDub" }],
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  return (
    <Box className="custom-form" id="mch-maternal-mortality-form-container">
      <Table>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="mch-maternal-mortality"
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const villageSectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

const VillageCell = () => {
  const { t } = useTranslation();
  return (
    <>
      <TableCell>{t("addressOfDeceasedMother")}</TableCell>
      <TableCell>
        <Box className="bordered-left">
          <VillageSelector
            dataElementIds={villageSectorIds}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

export default MchMaternalMortality;
