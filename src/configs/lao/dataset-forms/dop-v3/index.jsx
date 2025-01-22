import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./dop-v3.css";
import { listDialog } from "./mappingDialog";
import CustomDialog from "../common/Dialog/Dialog";
import { useState } from "react";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#282221",
  color: "#fff",
  fontWeight: "bold",
}));

const header1Style = {
  sx: {
    backgroundColor: "#3E2723",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
};
const header2Style = {
  sx: {
    backgroundColor: "#5D4037",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
};
const header3Style = {
  sx: {
    backgroundColor: "#795548",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
};
const labelStyle = {
  sx: {
    backgroundColor: "#BCAAA4",
    color: "#000",
    textAlign: "center",
  },
};
const label2Style = {
  sx: {
    backgroundColor: "#BCAAA4",
    color: "#000",
    minWidth: "200px",
    textAlign: "center",
  },
};
const value1Style = {
  sx: {
    backgroundColor: "#D7CCC8",
  },
};
const value2Style = {
  sx: {
    backgroundColor: "#EFEBE9",
  },
};

const emptyStyle = {
  sx: {
    backgroundColor: "#F7F7F7",
  },
};

const DopV3 = () => {
  const { t } = useTranslation();
  const [dialogContent, setDialogContent] = useState(null);
  const [open, setOpen] = useState(false);

  const dataElementConfigs = [
    [
      {
        display: "text",
        text: t("No_"),
        cellProps: { ...header1Style, rowSpan: 2 },
      },

      {
        display: "text",
        text: t("dataElements"),
        cellProps: { ...header1Style, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("PhD_"),
        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("HighGra_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Master_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Specialist2_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Specialist1_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Diploma_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Bachelor_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("High_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Middle_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Low_"),
        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("NoD_"),

        cellProps: { ...header1Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
      {
        display: "text",
        text: t("OffS_"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("VolunS_"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: "1",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("01_"),
        cellProps: label2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cTmGs3mC1jb",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xGnyzilzUkk",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cGK3MuDTZtC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "e9NRmpLgrTh",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "k41zsusnVKV",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aGV7YWlaj6o",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "C5nCq1I7qt6",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "n0YLUAREvtz",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HNQfhORIVX4",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bEb1hkk944L",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZZIqCZz2nsb",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IUecY8LBo8e",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CZx4UUDsbyW",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "U003rcByYyL",
        cellProps: value2Style,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "2",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("02_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "q2BIrIGaz4s",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zF669rE7VOz",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "myqKGPdV9vo",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HzZiRaZhi6Z",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RgjosOasVa5",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IRFVNFPSkqq",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MAX77IB6bMg",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "DW5fezV5lEI",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LOb3qzMe8Mo",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vjMxCyHxRjo",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Zth550cMQJw",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "os8qF6WeZrG",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "l3kONQueoLL",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VybqlOWGzMQ",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "3",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("03_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ThxK21FELQt",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kwAQPhqANsv",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SHsCMiaBBZq",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XeG3MsVPHWw",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "es6btjWYKB0",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EDRcw47orbI",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Wp79w6n7cll",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "n8DevblFsSL",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kXCQ0utKnMm",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dn0q8zEMMoO",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sr3AYWzbGdC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lk6JdjnPh0j",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MpnmE6PqOZh",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Yu0qWhKRull",
        cellProps: value2Style,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "4",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("04_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QmpiajjFZwe",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rmKuvNsMRPO",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "A2KojaHNvze",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EmV3yOyCrho",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uGQ7ne4x2AP",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qyTLRz90hlI",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hqjxQPiCpr3",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rCN65z3LAcE",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tP00VIlYKPG",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XuK3STH6NJz",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oiHJcevg43w",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tq9yz0QQDoA",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AhF8mVP9wgN",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wTQsA1uTjWT",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "5",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("05_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FgYyRPzcbJj",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OqQt91otBHw",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pINYsbMJ9HC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BWgAHrI5fWq",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oQd2GIWSi1J",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J1Wq6bPjK7R",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AtlDkRfR9VW",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gMqGgRhpbz6",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "l4PC6Q8WnwC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "e0lkiN4J2uX",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kYP3RscVZrj",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nLi3uGBsmDC",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CBDwfws5KhZ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aLSYYKLoBmu",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "6",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("06_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lMOboOSz1Pc",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wRRCKFMYiWv",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FlXRosdQmLX",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HJW57NNW9Vw",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "x1Nk1rov7zl",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IzV6rfgSEHp",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JZeo8RGtqtO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QHFQdzMk0f3",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iRlvMtbu11X",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sZ0LZHEkY1B",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sIGS1UXKh87",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HggoGboXef3",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "M91uM02zZY0",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gagIxw5Q3IH",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "7",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("07_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hrq0IcTPR07",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J33AhNqDMAF",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "d1ERDqxz4AZ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "K9Rl3SNskUI",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VnEvObYgoKz",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xQXmsVnZvfr",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "8",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("08_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nN7QKZDguvP",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kLk8pOdntdZ",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "9",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("09_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BqlwEiqNDsL",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oRVg8s2iRpM",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CMHv5VMpfAt",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "X5JCj0hsm4B",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "10",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("10_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LFfPyzemFzr",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eyrnNTTy84e",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cYO61itjtV4",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "R7ZNzbnKva6",
        cellProps: value2Style,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "11",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("11_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XlKlrSU1pBW",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "szRssmlpS7Q",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oscIXyHIPlJ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FjsEBGYxWNL",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bewr6YAcn22",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "e4AnReRKGoR",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Z2RpwXD95In",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "q0Kf5n74t9F",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "S7HoyHT1E9m",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "welMlc8j9rv",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VFvIFSAfjpO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qfkiKKXHTZ1",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bJNz0A0ayLN",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AOSNnLwwzu2",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "12",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("12_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hqGKb80XmUA",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G51TTv5foOz",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nkFz9AF3AhQ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xsJujt2DGNA",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "B79mVlg9PX9",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JrDMFo9bZ55",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dxIXPh3hRkC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Fmfs96RWoir",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zoxONd6vo25",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jGPYhMVm2LP",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "13",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("13_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mkbHgkuI6PT",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "T4yLpEJH1vp",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "da9ZNFDKdq3",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Oqlzya6tUwR",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gjMlgmXT39H",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RvXCcX5qdBo",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "14",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("14_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OoFzs9a6lCg",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "esuPMZGWh72",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pNxNPEx7HTL",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "p0AV8Fq5lPy",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EuxKUhuGyIj",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eKYnFIEdCCe",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "os2C1aeXY2b",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uN1XxQeCGTL",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wNLOeanxnA2",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "K2XZQO9Wn5N",
        cellProps: value2Style,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "15",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("15_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "DzPvdudW5tD",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pQEp9CIk9qk",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kOFueA1TrwL",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TTx5E84B8Cf",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "16",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("16_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OfHMCQWKwKX",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AFhHHOODPFn",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Xgc0KJKLll4",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qleWTqdMOaN",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CXXmCyuPgbW",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zWMbLcIEj16",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bgUs2A8u9Mm",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MJTqjWcki0p",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZOIqXeUehjO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WGmgXcpM4Hs",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "j26YsNUuUe9",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FFhR3l6DR8X",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "17",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("17_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hHccG1Jetxu",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dohjh24Kh7c",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "k0GRiZ5c9eO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FE6xITgTaiQ",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "18",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("18_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZliZE77Q1ov",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CWud3hrgnKN",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "f8SeED0NTr8",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MCn7FWCq8wy",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dZIGIeKhqNn",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rojOlgnQPgD",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vOWgbAO3ZPp",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YTtDsg4dAxp",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kUpc7baoXng",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nzr72My0sul",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Uxc4cTMi04L",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AGoiXobUhU2",
        cellProps: value2Style,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "19",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("19_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aYRcK1Utgr1",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZrXlLT2Gpxq",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "20",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("20_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gzrBPb2ozyl",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NZpjTEKYvPH",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Kmj2Ndo9ZR6",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FFe50BF6bCH",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Hp1gWEPxjb1",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wTDmwNGobEQ",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "21",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("21_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CuomV9ElCcp",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FkQeYslwUMr",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "22",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("22_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oCLPLU6hV9r",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "og51DURyf64",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FieDKo4WdpF",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c4hwKlzUdJP",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ea5ZkXJ5KEo",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mc5Gvfd1aS4",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aGYSBSrPXzE",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bDJrqJlq7eq",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UuOJgMnjhDx",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nbrV82xLiv2",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ru3xyqrBYRT",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NmMkdFBkZsn",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "23",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("23_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WMCkh1MF6SG",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gLSAL7RS3A9",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "klATvMUtrEH",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "g5NOiNpcqx4",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JdodgHXAf7C",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Cn7wDM8ceJm",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "24",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("24_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ngJywFJjPDF",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wUYQjkQ8FQ2",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PJxOLiYSQPj",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O2erTKBb5se",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OW0GgMOCCRV",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eYP6s8uJUJt",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NB3dryIpZyg",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "b37GcPSdpFs",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oanHTIvRuQd",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GY0KDsZz6Yq",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wRYqRo8jKmP",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FtPzdnUO0YU",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dgTrAQN8xXT",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NzPpP2sGHPx",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "25",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("25_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GzTjNBxFmdO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jhWXDCqeaSu",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AIn8Aagj66I",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "l93UWv9sjOZ",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FhVaajZSBNr",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CEvr2RntW8J",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hpCTpN20Toc",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eDh5LP5g7pe",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nLdf1OIC5OQ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c61X3mTjii0",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pkHwwHyHZm4",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KoY0yfsbujE",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OerWWLPWHoT",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mrCu35Rp5Bn",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "D1f5dBXHGvO",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bWxtJ3E6qxI",
        cellProps: value2Style,
      },

      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "E5S9fNTjrdQ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Klus4BgLizS",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "26",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("26_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zOfYVh9MzDa",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rQJXf9z7w72",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "t0euONYq5W0",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iTPjldEXdjV",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eUQuDKUwkQI",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aAFuzcnqXnP",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sDNEtGpqqFH",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wEdnGXejlmR",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Evrf6GuquPX",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TfrMKWRYNnO",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HWsFyrrbTKH",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XgOG2ubORPR",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "27",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("27_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aNTWwDAbz4O",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UOrAbamNlbS",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dN1fkuFNxvK",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yXgU7XeY1wP",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LSh468FmitV",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xVwBVy0mjjR",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "srYd9Yvx7hi",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IzhagOn6fOe",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UD2aJnC6Up6",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YPPcLZ8o1Dn",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UZ0bCSi8bHI",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "H9fLzi64SMX",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pEzCnH4op8o",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zfszJM61ZA1",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "28",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("28_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EfgcFd1lCSt",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gm1sQYuqf6J",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vBbhTVonktk",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "b7rImoKNbtj",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "h9bIAx47HCQ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Bmvpt9qaav7",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jB2aflm4pJV",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "grT4DppGEIg",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jF1HMSiI8Ms",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bu7cFZZ0E2Z",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c7P9UR89vx5",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jxOTx2MMWCc",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JYcHhjoabt2",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "U8kzMUcUo8K",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "29",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("29_"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },

      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "DnhFNhL8Uxs",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Bzc2E5PNFkT",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: "30",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("30_"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "S99bx411WuU",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "W7JEoGEOh99",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "B8Fg70Khwlh",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tIf7BXLrgJl",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sfC9JsXyjHL",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hWlrslVHMWb",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sYX79tGOmPz",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FOQ73bKSp8Q",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qthBzXAYDpG",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vM1i9pTws9E",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JmWIJF29Gwb",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "B0fQAbI6jFP",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FgnL6bIkqnK",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SENrdcQpeJG",
        cellProps: value2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MIcRAjCNuvz",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kZwADYXLwg2",
        cellProps: value2Style,
      },
    ],
  ];
  return (
    <Box id="dop-v3-form-container" className="custom-form remove-border-left">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={24} style={{ textAlign: "center" }}>
              ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ
            </HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs.map((item, index) => {
              if (index < 2) {
                return item;
              }
              const result = item.map((col, indexCol) => {
                if (indexCol === 1) {
                  return {
                    ...col,
                    onClick: () => {
                      setDialogContent(listDialog[index - 2]);
                      setOpen(true);
                    },
                  };
                }
                return col;
              });
              return result;
            })}
          />
        </TableBody>
      </Table>
      <CustomDialog open={open} setOpen={setOpen} title="ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ">
        {dialogContent}
      </CustomDialog>
    </Box>
  );
};

export default DopV3;
