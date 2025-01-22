import { Box, Table, TableBody, TableCell } from "@mui/material";
import { useMemo } from "react";

import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import MapTable from "../common/MapTable";
import "../common/index.css";
import { useTranslation } from "react-i18next";

const IpdEvent = () => {
  useAgeInYearRule("Z1x2iwf6IIY", "zDPvXY6h4JN");
  useForeignerRule("jaan5ZI8EnJ", villageSelectorIds);

  const { currentEvent } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent }),
    shallow
  );

  const dataElementConfigs = useMemo(
    () => [
      [{ id: "k9JX0RZZc3O", labelCellProps: { sx: { width: "300px" } } }],
      [{ id: "iJwfIajfB8f" }],
      [{ id: "PtQkaC6x3Ii" }],
      [{ id: "JunLHqdVGyI" }],
      [{ id: "jaan5ZI8EnJ" }],
      [{ id: "Nsv148saunk" }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: currentEvent.dataValues["jaan5ZI8EnJ"],
        },
      ],
      [{ id: "CC9BpgSQbfh" }],
      [{ id: "Z1x2iwf6IIY" }],
      [{ id: "nZPGwtNjtQh" }],
      [{ id: "GAO4k89s3Zo" }],
      [{ id: "bg2OBGWpOGH" }],
      [{ id: "v7d7hyP79Py" }],
      [{ id: "WVSCDSh6VK3" }],
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  return (
    <Box className="ipd-event-form-container custom-form">
      <Table>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="ipd-event"
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const villageSelectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell>{t("currentAddress")}</TableCell>
      <TableCell>
        <Box className="bordered-left">
          <VillageSelector
            dataElementIds={villageSelectorIds}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

export default IpdEvent;
