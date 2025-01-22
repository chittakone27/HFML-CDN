import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import MapTable from "../common/MapTable";

import "../common/index.css";
import "./wb-dli-nut-fb.css";
import { pull } from "@/utils/fetch";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { useEffect, useMemo, useState } from "react";
import useDataEntryStore from "@/state/dataEntry";
import { saveDataValue } from "@/api/icapture/dataValue";
const StockCell = ({ targetItem, remain }) => {
  const { dataValues } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues }),
    shallow
  );
  const { orgUnit } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit }),
    shallow
  );
  const receive =
    dataValues[`${targetItem[4].dsde}-${targetItem[4].coc}-${orgUnit.id}`]
      ?.value * 1 || 0;
  const result = remain + receive;
  return <>{result}</>;
};
const ClosingBalanceCell = ({ targetItem, remain }) => {
  const {
    dataValues,
    actions: { setDataValue },
  } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues, actions: state.actions }),
    shallow
  );
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const receive =
    dataValues[`${targetItem[4].dsde}-${targetItem[4].coc}-${orgUnit.id}`]
      ?.value * 1 || 0;
  const distribute =
    dataValues[`${targetItem[6].dsde}-${targetItem[6].coc}-${orgUnit.id}`]
      ?.value * 1 || 0;
  const waste =
    dataValues[`${targetItem[7].dsde}-${targetItem[7].coc}-${orgUnit.id}`]
      ?.value * 1 || 0;
  const result = remain + receive - distribute - waste;

  useEffect(() => {
    (async () => {
      try {
        const result1 = await saveDataValue(
          "n612BBRxLPI",
          orgUnit.id,
          period.dhis2Period,
          "Sb9Lf8e5wOd",
          "lmbxvugTvKr",
          result
        );
        if (result1.ok) {
          setDataValue("Sb9Lf8e5wOd", "lmbxvugTvKr", orgUnit.id, result);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [result]);

  return <>{result}</>;
};
const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#0D47A1",
  color: "#fff",
  fontWeight: "bold",
}));

const WbDliNutFb = () => {
  const { t } = useTranslation();
  const { period, orgUnit } = useSelectionStore(
    (state) => ({ period: state.period, orgUnit: state.orgUnit }),
    shallow
  );
  const [configs, setConfigs] = useState(dataElementConfigs);
  const getData = async () => {
    try {
      let month = parseInt(period.dhis2Period.slice(4));
      let year = parseInt(period.dhis2Period.slice(0, 4));
      if (month == 1) {
        month = 12;
        year -= 1;
      } else if (month >= 11) {
        month -= 1;
      } else {
        month -= 1;
        month = "0" + month;
      }
      let pe = `${year}${month}`;
      const result = await pull(
        `/api/dataValueSets.json?dataSet=n612BBRxLPI&period=${pe}&orgUnit=${orgUnit.id}`
      );
      if (result) {
        if (result.dataValues && result.dataValues.length) {
          const newConfigs = configs.map((item) => {
            if (item.find((col) => col.dsde)) {
              const remain =
                result.dataValues.find(
                  (dataValue) =>
                    dataValue.dataElement === item.slice(3, 4)[0].dsde
                )?.value * 1 || 0;
              return [
                ...item.slice(0, 3),
                {
                  ...item.slice(3, 4)[0],
                  customCell: <>{remain}</>,
                },
                ...item.slice(4, 5),
                {
                  ...item.slice(5, 6)[0],
                  customCell: <StockCell remain={remain} targetItem={item} />,
                },
                ...item.slice(6, 8),
                {
                  ...item.slice(8)[0],
                  customCell: (
                    <ClosingBalanceCell remain={remain} targetItem={item} />
                  ),
                },
              ];
            }
            return item;
          });
          setConfigs(newConfigs);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      id="wb-dli-nut-fb-form-container"
      className="custom-form remove-border-left"
    >
      <Button
        variant="contained"
        sx={{ mb: 1 }}
        onClick={() => {
          const elt = document.getElementById("tblToExcl");
          const clone = elt.cloneNode(true);
          clone
            .querySelectorAll("input")
            .forEach((input) => (input.closest("td").innerHTML = input.value));
          const wb = XLSX.utils.table_to_book(clone, { sheet: "sheet1" });
          return XLSX.writeFile(wb, "WB DLI NUT&FP - Stock." + "xlsx");
        }}
      >
        {t("downloadExcel")}
      </Button>

      <Table id="tblToExcl">
        <TableHead>
          <TableRow>
            <HeaderCell>{t("no")}</HeaderCell>
            <HeaderCell>{t("commodityList")}</HeaderCell>
            <HeaderCell>{t("unit")}</HeaderCell>
            <HeaderCell>{t("remainingFromLastMonth")}</HeaderCell>
            <HeaderCell sx={{ width: "120px" }}>{t("receive")}</HeaderCell>
            <HeaderCell>{t("stockAvailable")}</HeaderCell>
            <HeaderCell sx={{ width: "120px" }}>{t("distribute")}</HeaderCell>
            <HeaderCell sx={{ width: "120px" }}>{t("waste")}</HeaderCell>
            <HeaderCell>{t("closingBalanceOfTheMonth")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={configs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const sectionLabelStyle = {
  sx: {
    backgroundColor: "#1565C0",
    color: "#fff",
  },
};
const numColStyle = {
  sx: {
    backgroundColor: "#64b5f6",
    color: "#000",
  },
};
const commodityListColStyle = {
  sx: {
    backgroundColor: "#90caf9",
    color: "#000",
  },
};
const unitColStyle = {
  sx: {
    backgroundColor: "#bbdefb",
    color: "#000",
  },
};
const deColStyle = {
  sx: { backgroundColor: "#e3f2fd" },
};

const dataElementConfigs = [
  //I
  [
    {
      display: "text",
      text: "commodityForMchNutrition",
      cellProps: { colSpan: 9, ...sectionLabelStyle },
    },
  ],
  [
    { display: "text", text: "1", cellProps: numColStyle },
    {
      display: "text",
      text: "VTMA 100,000 IU < 1 Y",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "Sb9Lf8e5wOd" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JmhqohorlUf",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "g94NxfjkibL",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HLs2vEKvpEw",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "2", cellProps: numColStyle },
    {
      display: "text",
      text: "VTMA 200,000 IU< 5 Y",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "LZuxe4XEwvp" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MmldHdFefqU",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UILgm6PKQ1g",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dJd8NPQ1V1c",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "3", cellProps: numColStyle },
    {
      display: "text",
      text: "Mebendazloe 500 mg",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "D5Xc9dCbOKy" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JTAHDqCVL9W",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mO5O9uqxszv",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jmBDa8hcHM6",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "4", cellProps: numColStyle },
    {
      display: "text",
      text: "Iron Folic Acid 200mg/ Week/tablet",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "sHy2GRAVyQI" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "koNgXJuvCa8",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pC4XxUy3QPF",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ch6pQCcMBY1",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "5", cellProps: numColStyle },
    {
      display: "text",
      text: "Iron Folic Acid 30-60mg/Day/tablet",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "Iugv9ytAG1A" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SZJRblZMttd",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "E6k5flp94my",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "I5gEHd3iUXD",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "6", cellProps: numColStyle },
    {
      display: "text",
      text: "Zinc Sulfate 20mg",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ເມັດ/tablet", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "RUngQRP9Zvp" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "heEBqghRfhX",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GsoiPJBeF8G",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RHBJojtQjHH",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  //II
  [
    {
      display: "text",
      text: "commodityForFamilyPlanning",
      cellProps: { colSpan: 9, ...sectionLabelStyle },
    },
  ],
  [
    { display: "text", text: "1", cellProps: numColStyle },
    {
      display: "text",
      text: "Birth Control Mini Pills",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ແຜງ/Blister", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "RBXqjU8NXeq" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JfiaruJWaea",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qVLE2XRqdNn",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rDNvBQyik3P",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "2", cellProps: numColStyle },
    {
      display: "text",
      text: "Birth Control Combined Pills",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ແຜງ/Blister", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "DV2fcPb6yAj" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h3TaqryXslw",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "slVGzuQishi",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "s0pz7wfF1a6",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "3", cellProps: numColStyle },
    {
      display: "text",
      text: "Birth Control Injectable Contraceptive",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ຫຼອດ/Ampoule", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "TuhmbGURLRS" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RyJVB0v3V4H",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gBpQPxwODu5",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "A2pwrv7Nfd8",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "4", cellProps: numColStyle },
    {
      display: "text",
      text: "IUDs",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ອັນ/Piece", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "FTyVgt7JIWB" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JJfx6LUtkLF",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NvSJDq3O2FT",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "x2SV6FV4Bna",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "5", cellProps: numColStyle },
    {
      display: "text",
      text: "Condom",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ອັນ/Piece", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "aF38UcpDV3Y" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iUY4gIoYeae",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xHO0yDbw5wL",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BoccXrmnE1v",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "6", cellProps: numColStyle },
    {
      display: "text",
      text: "Implant",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ອັນ/Set", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "RLv9VOvCn5p" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VZVNmOd4mIF",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vzUC3RXiXU5",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mcad3dqtvqi",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  [
    { display: "text", text: "7", cellProps: numColStyle },
    {
      display: "text",
      text: "Syrince1cc",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ອັນ/Piece", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "VHyzJ0cOEVM" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZdfMdrJTxXx",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "W4iKhP3PySL",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kotISHCDxu8",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
  //III
  [
    {
      display: "text",
      text: "pinkBook",
      cellProps: { colSpan: 9, ...sectionLabelStyle },
    },
  ],
  [
    { display: "text", text: "1", cellProps: numColStyle },
    {
      display: "text",
      text: "Pink Book",
      cellProps: commodityListColStyle,
    },
    { display: "text", text: "ຫົວ/Books", cellProps: unitColStyle },
    { display: "empty", cellProps: deColStyle, dsde: "Dq5HalO0ylv" },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "q3LNMeGKg3n",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "c3FnIRkhX4G",
      cellProps: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BZDomqSJFPp",
      cellProps: deColStyle,
    },
    { display: "empty", cellProps: deColStyle },
  ],
];

export default WbDliNutFb;
