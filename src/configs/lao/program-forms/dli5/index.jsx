import { Alert, Box, styled, Table, TableBody } from "@mui/material";
import MapTable from "../common/MapTable";

import "../common/index.css";
import useEventCaptureStore from "@/state/eventCapture";
import { useEffect, useState } from "react";
import { pull } from "@/utils/fetch";
import { shallow } from "zustand/shallow";
import moment from "moment";
import VillageName from "./VillageName";

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginTop: 4,
  borderRadius: 0,
  fontSize: 16,
  "&.MuiAlert-standardInfo": {
    border: "1px solid " + theme.palette.info.main
  },
  "&.MuiAlert-standardError": {
    border: "1px solid " + theme.palette.error.main
  }
}));

const Dli5 = () => {
  const [villageStatus, setVillageStatus] = useState(null);

  const {
    currentEvent,
    actions: { setCurrentEventDataValue, setCurrentEventProperty }
  } = useEventCaptureStore((state) => ({ currentEvent: state.currentEvent, actions: state.actions }), shallow);

  const villageName = currentEvent.dataValues["S3FyEAI34OA"];

  useEffect(() => {
    (async () => {
      if (currentEvent.eventDate && villageName) {
        const orgUnit = currentEvent.orgUnit;
        const startDate = moment(currentEvent.eventDate).subtract(14, "days").format("YYYY-MM-DD");
        const endDate = moment(currentEvent.eventDate).add(14, "days").format("YYYY-MM-DD");

        const result = await pull(`/api/events?orgUnit=${orgUnit}&program=QQkFwiPkEBv&startDate=${startDate}&endDate=${endDate}`);

        if (result.events?.length === 0) {
          setVillageStatus("valid");
          setCurrentEventProperty("disabled", false);
        }

        if (result.events?.length > 0) {
          let exist;
          result.events.forEach(({ dataValues, event }) => {
            if (event === currentEvent.event) return;
            if (dataValues?.length) {
              const found = dataValues.find((de) => de.dataElement === "S3FyEAI34OA" && de.value === villageName);
              if (found) exist = true;
            }
          });

          if (exist) {
            setVillageStatus("inValid");
            setCurrentEventProperty("disabled", true);
          } else {
            setVillageStatus("valid");
            setCurrentEventProperty("disabled", false);
          }
        }
      } else {
        setVillageStatus(null);
        setCurrentEventProperty("disabled", false);
      }
    })();
  }, [currentEvent.eventDate, villageName]);

  useEffect(() => {
    if (!villageName || villageStatus === "inValid") {
      setCurrentEventDataValue("W4QBmOp9Lcb", "0");
      packageIds.forEach((id) => {
        setCurrentEventDataValue(id, "");
      });
      return;
    }

    let noOfPackage = 0;
    packageIds.forEach((id) => {
      if (currentEvent.dataValues[id] === "true") noOfPackage += 1;
    });
    setCurrentEventDataValue("W4QBmOp9Lcb", noOfPackage + "");
  }, [JSON.stringify(currentEvent), villageName]);

  return (
    <Box id="dli5-form-container" className="custom-form">
      <Table>
        <TableBody>
          <VillageName />
          {villageName && villageStatus === "valid" && <MapTable dataElementConfigs={dataElementConfigs} tableName="dli5-form-container" />}
        </TableBody>
      </Table>

      {villageStatus === "inValid" && (
        <>
          <StyledAlert showIcon color="error" severity="error">
            ບ້ານນີ້ໄດ້ຖືກລົງເຊື່ອມສານສຳເລັດແລ້ວ ໃນໄລຍະ 1-2 ອາທິດຜ່ານມາກະລຸນາກວດຄືນ
          </StyledAlert>
          <StyledAlert showIcon color="error" severity="error">
            This village was checked 2 weeks ago or in 2 next weeks
          </StyledAlert>
        </>
      )}

      <StyledAlert showIcon color="info" severity="info">
        ຖ້າທ່ານບໍ່ເຫັນຊື່ບ້ານຂື້ນມາ, ກະລຸນາລ້າງຂໍ້ມູນໃນ browser, ຫຼືຕິດຕໍ່ ວຽງທອງ 9113 2319/ຊົ່ງຢ່າງ 9244 4414
      </StyledAlert>
    </Box>
  );
};

const packageIds = [
  "kdnUVUiMlAt",
  "XI7JpBKucGT",
  "znHyW54QMzM",
  "LW56NRgi5NL",
  "MbeI4sw7AYQ",
  "WQJuBnMKoID",
  "HhPBfgdUcCH",
  "bx4AX1YKXOw",
  "Nvx6jzRpMo2",
  "RYxMAmqMHbF",
  "L4iCjMJLSnO",
  "ZMLmx5B81Ag"
];

const commonProps = {
  fieldCellProps: { className: "checkbox" }
};

const dataElementConfigs = [
  [{ id: "znHyW54QMzM", ...commonProps }],
  [{ id: "LW56NRgi5NL", ...commonProps }],
  [{ id: "XI7JpBKucGT", ...commonProps }],
  [{ id: "kdnUVUiMlAt", ...commonProps }],
  [{ id: "MbeI4sw7AYQ", ...commonProps }],
  [{ id: "WQJuBnMKoID", ...commonProps }],
  [{ id: "HhPBfgdUcCH", ...commonProps }],
  [{ id: "bx4AX1YKXOw", ...commonProps }],
  [{ id: "Nvx6jzRpMo2", ...commonProps }],
  [{ id: "RYxMAmqMHbF", ...commonProps }],
  [{ id: "L4iCjMJLSnO", ...commonProps }],
  [{ id: "ZMLmx5B81Ag", ...commonProps }]
];

export default Dli5;
