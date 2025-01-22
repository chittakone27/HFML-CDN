import { useMemo } from "react";
import { Box, Table, TableBody, TableCell } from "@mui/material";

import { useForeignerRule } from "../common/hook";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import MapTable from "../common/MapTable";
import "../common/index.css";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

const DeliveryEvent = () => {
  useForeignerRule("jaan5ZI8EnJ", villageSelectorIds);

  const { currentEvent } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent }),
    shallow
  );

  const dataElementConfigs = useMemo(
    () => [
      [{ id: "GUM9z9xJibL", labelCellProps: { sx: { width: "400px" } } }],
      [{ id: "F2BsjoYVNQg" }],
      [{ id: "zyZCBNbRZqm" }],
      [{ id: "iloPG90pS4i" }],
      [{ id: "Ru0VRr4Sxkw" }],
      [{ id: "zDPvXY6h4JN" }],
      [{ id: "vcxwsfM9Jz6" }],
      [{ id: "NlhW64R1IYU" }],
      [{ id: "uqxqaQ5mn9J" }],
      [{ id: "vjw2BVTnMKU" }],
      [{ id: "DdqttcG4Qk7" }],
      [{ id: "jaan5ZI8EnJ" }],
      [{ id: "Nsv148saunk" }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: currentEvent.dataValues["jaan5ZI8EnJ"],
        },
      ],
      [{ id: "CAlzhVtqvJk" }],
      [{ id: "CLon1OEoS2k" }],
      [{ id: "L4vJEryMxSp" }],
      [{ id: "wkWU3gq2Ko2" }],
      [{ id: "s02gBABe5xR" }],
      [{ id: "JKfl0zic1ta" }],
      [{ id: "QElwrX1S5s2" }],
      [{ id: "yGaUk5D9f7U" }],
      [{ id: "HzAQajZRVte" }],
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  return (
    <Box id="delivery-event-form-container" className="custom-form">
      <Table>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs}
            tableName="delivery-event"
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

export default DeliveryEvent;
