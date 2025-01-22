import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./tb-treatment-outcome-hiv-art.css";
import { useTranslation } from "react-i18next";
import TotalCell from "../common/TotalCell";

const headerStyle = {
  backgroundColor: "#1976d2",
  fontWeight: "bold",
  color: "#fff",
  height: 40,
};

const HeaderCell = styled(TableCell)(() => headerStyle);

const TbTreatmentOutcomeHivArt = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="tb-treatment-outcome-hiv-art-form-container"
      className="custom-form remove-border-left"
    >
      <Table sx={{ minWidth: 1400 }}>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={2} sx={{ width: "30%" }}>
              {t("typeOfPatient")}
            </HeaderCell>
            <HeaderCell
              sx={{ width: "7%" }}
              dangerouslySetInnerHTML={{ __html: t("Registered") }}
            />
            <HeaderCell sx={{ width: "7%" }}>{t("Rescued")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Completed")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Failure")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Died")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Defaulted")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Referred_out")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Not_Evaluate")}</HeaderCell>
            <HeaderCell
              sx={{ width: "7%" }}
              dangerouslySetInnerHTML={{ __html: t("Total") }}
            />
            <HeaderCell sx={{ width: "7%" }}>{t("on_art")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs.map((item, index) => {
              if (index < dataElementConfigs.length - 3) {
                const firstCellHaveDsdeIndex = item.findIndex(
                  (col) => col.dsde
                );
                return [
                  ...item.slice(0, item.length - 2),
                  {
                    ...item.slice(item.length - 2, item.length - 1)[0],
                    customCell: (
                      <TotalCell
                        listData={item
                          .slice(firstCellHaveDsdeIndex + 1, item.length - 2)
                          .map((col) => {
                            if (col.display) {
                              return null;
                            }
                            return `${col.dsde}-${col.coc}`;
                          })
                          .filter((col) => col)}
                      />
                    ),
                  },
                  ...item.slice(item.length - 1),
                ];
              }
              return item;
            })}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const typeStyle = {
  backgroundColor: "#4dd0e1",
};
const labelStyle = {
  backgroundColor: "#26c6da",
};
const totalStyle = {
  backgroundColor: "#b2ebf2",
  textAlign: "center",
  minWidth: 70,
};
const deStyle = {
  backgroundColor: "#b2ebf2",
};
const disableStyle = {
  backgroundColor: "#ddd",
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "New",
      cellProps: { rowSpan: 4 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Ps+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kvFxZXkQKqY",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fDoM6ImIn35",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LUSu7cui3Tt",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BNbkC2vJgoP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jDsRaeAtN79",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "foCXlnvk2BG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "laCYFJVj8xS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Kfq0lV6HoZH",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iXA44AMTmtb",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Ps-b+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hrRgjx64b8M",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "EBZwyKx4rIf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VmjYtES1gYv",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wtLNOGICh5G",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LEgx06K7PQt",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Za9ygbDAWvI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "anQFwPpHdX7",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MtaBaxNOGiG",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Ps-b-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YMlBw4H8DM1",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pdxHqyDoSbL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "x6FllFHE3ir",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "a1bFh459BGF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FIuScEzk0ts",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PgAtwCvfAyA",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rWVzRxJwg6J",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "N0l0LsOXvqy",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "EP",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oBIampIdAzR",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OcrIXVeUev9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kzIgHW5r7gn",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Wkq6uEzvHOQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DY1gLzlDNcL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CrsQbXTDrvy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZsIF340P8i4",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nSK7GvEgbwf",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Relapsed",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cwxQ9ICRQZQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oYHnAXRrcGd",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cRncqTO9VCB",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Isal9jpBtI9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hORs8zPlWVR",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ax4ZYirAgca",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LJlXyLmodUT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pBpkJxeBlJS",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NndBiN9jEL6",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Failure",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SB6WiROCfYw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Vvh5V5mdpYr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "H7sUds9bVWT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NFosc8MiA7V",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FpjWUiHUo0X",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MtoMpv6Yeci",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "p937IzDdPbC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gKP4Uw23Sxg",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DOm665o5mTg",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Relapsed_after_cue",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CU3kR7Wzdl6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LzinlRZmPUq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LeomwXUNbbb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Nh1ahwphb6y",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eGI315XWe5d",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NnT4JKiTtZG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UJWjnyBjsst",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "g1Bww5vxwLw",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qHndjCnQsGh",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Others",
      cellProps: { rowSpan: 4 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Ps+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Bco46RPpMzl",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pyQpmOLLrMk",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "menDZ3RkXP2",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h7seIjnFUZ0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Z6lneZAYljQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FL7CTqTKTgm",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "D7al8o2Iq7X",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZE18KYk5OTe",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "klOUKJwwYP1",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Ps-b+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ISEGpQqdWU3",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "spKBnBT9g0b",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KBgZwKbTTSz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zeZx37oDv8e",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "k7SYuxiGXBu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MxioXwQ5Zww",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hzuSX4WmeeV",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "C0fUu3hVYT3",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Ps-b-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nKKq2FphcsW",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kkPV9TrDbEU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bYWJpUcj6WX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "klfR72TpXe7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wIpiCifXd20",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Dx00DlpIpjv",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "B2SOwQp3ICR",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iNgEfrv5PDM",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "EP",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "J01h3rxS4CO",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZpOC9G7YEhr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eYZWfYyVzmg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rPk8Xh4oUdY",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wnVinBhLUPI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iwDzmcoPOa4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XggHJ1nei22",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "i1QYIe0p8b0",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ລາຍງານການໃຫ້ ART",
      cellProps: { colSpan: 3 },
      style: headerStyle,
    },
  ],
  [
    {
      display: "text",
      text: "tb_hiv_patient",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rTQzemcoAwg",
      cellProps: { colSpan: 1 },
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "tb_hiv_art",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NyPSR4HRAig",
      cellProps: { colSpan: 1 },
      style: deStyle,
    },
  ],
];

export default TbTreatmentOutcomeHivArt;
