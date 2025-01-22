import {
  Alert,
  Box,
  Snackbar,
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
import "./dlip-c.css";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { pull } from "@/utils/fetch";
import { DEs } from "./mappingDe";
import { useEffect, useState } from "react";
import useDataEntryStore from "@/state/dataEntry";
import { saveDataValue } from "@/api/icapture/dataValue";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#6699CC",
  color: "#fff",
  fontWeight: "bold",
}));

const DlipC = () => {
  const { t } = useTranslation();

  const period = useSelectionStore((state) => state.period, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const listDataValue = useDataEntryStore((state) => state.dataValues, shallow);
  const setDataValue = useDataEntryStore(
    (state) => state.actions.setDataValue,
    shallow
  );
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );

  const typeStyle = {
    sx: {
      backgroundColor: "#99CC99",
      textAlign: "center",
      color: "#000",
    },
  };
  const typeWideStyle = {
    sx: {
      backgroundColor: "#99CC99",
      textAlign: "center",
      color: "#000",
      minWidth: "400px",
    },
  };
  const labelStyle = {
    sx: {
      backgroundColor: "#CAE5FF",
      color: "#000",
    },
  };
  const deStyle = {
    sx: {
      backgroundColor: "#CAE5FF",
      width: "250px",
      padding: "5px 30px !important",
    },
  };

  const de2Style = {
    sx: {
      backgroundColor: "#E0EFE0",
      width: "250px",
      padding: "5px 30px !important",
    },
  };

  const [dataElementConfigs, setDataElementConfigs] = useState([
    [
      {
        display: "text",
        text: t("No"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Lists"),
        cellProps: typeWideStyle,
      },
      {
        display: "text",
        text: t("Unit"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Remaining_last_month"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Receive"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Distribute"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Wasted"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Closing_balance_of_the_month"),
        cellProps: typeStyle,
      },
    ],
    [
      {
        display: "text",
        text: "01",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("Alcohol 70%"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "Mililiter",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SLOHCI6nufs",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kBtA53k8yPF",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NUH9ymioQGc",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "feaCMvEoxZI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fG9xal34kuY",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("02"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Alcohol 90%"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: t("Mililiter"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QBNyguDVrtG",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rjjO6CvMfLe",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NIluWL4oGg8",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qr44WWo1WJN",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ng7KwzpK07s",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("03"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Aluminium hydroxide tablet 500mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "goRqtTT3mBd",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VkKZikslbZa",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "clCiWoms2y7",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AwSl0GnZmNB",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G0UyfECx657",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("04"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Amoxicillin capsule 250mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Capsule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tHxmixkpISB",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LIk6XL6lVE4",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EgzuTW4wHGd",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "X8UOePGDnSz",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G9admZt06So",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("05"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Amoxicillin capsule 500mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Capsule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q939Vo1Npri",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zHEsnnuEOdW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qV29oCR4C6T",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SS23JvTpS3i",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cb8zbeepQpM",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("06"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Amoxicillin Syrup 125mg/5ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MZr9cUMzZnX",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Fg2yTFMGWFf",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "h1Zj3tHUJfB",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fYz1t9zuRtk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fZrU7uBQDcO",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("07"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Amoxicillin Syrup 250mg/ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RvGVcs923DK",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "z4wTdMxQsgn",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "I5wkd1VdPMa",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KtjWxAZmuFe",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UcOV4K8Xs0T",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("08"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ampicillin capsule 250mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YZJvMePWZvs",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J6sDVaSIEnd",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AFLtIWl1hTW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oN1a992hZq5",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oECCA80WkLK",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("09"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ampicillin capsule 500mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Capsule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JNaFx2yhvx9",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Fe5IXc0aZCY",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xy7mA92QYHm",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dR8iw3pDB7V",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cOYNGM5tJkq",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("10"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ampicillin Syrup 125mg/5ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G78yHq53NFC",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nANxgngLx5y",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SJER3DSChiK",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VkEbxBusfne",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cuqsagCtk1m",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("11"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ampicillin Syrup 250mg/ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "g98BTa6VMfr",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zt5G2nDa0k2",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yGhb6rHIQwo",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dTu5ht1VmRq",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qMI4oXLjUxs",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("12"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Artemether + Lumefantrine tablet 20mg + 120mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: t("Blister"), cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Pbyxuog3Kda",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GZ0tXs4dLWv",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iIWP6Eig59Y",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EUftBSn2IjU",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jly3axMpzTE",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("13"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ascorbic acid (Vitamine C) tablet 50mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Y8ew6JOc0Vc",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mr4WwexUB03",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "n8WsAtNTAjk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FVfvfogOh5M",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "txoULhKsiYh",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("14"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ascorbic acid (Vitamine C) tablet 100mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SB7uuoo8I3t",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VKcf8gBKSBX",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O9e1kCqmANH",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NCc0pO3CfYg",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fuqOniAt56o",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("15"), cellProps: labelStyle },
      {
        display: "text",
        text: t("BCG vaccine"),
        cellProps: labelStyle,
      },
      { display: "text", text: t("Dose"), cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hplRsXJaq3T",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "DesxcBNKt8U",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ygmiLkegHeR",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RyKNjELnX7z",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "B2n1yNhav5R",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("16"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Chloramphenicol Eye drops 0.5%"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "o9tza3H66dE",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "T00WYHsVGpR",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ccJE1klZRxo",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QfrGImiJfRi",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c0QU9lxODqe",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("17"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Chlorpheniramine syrup 2mg/5ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZsgbZEzF7RJ",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GfQsmUqkd5c",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jsAUrOQlWhJ",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "o1z6dj909tk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HBfF2e1PQnG",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("18"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Chlorpheniramine tablet 4mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fbNTqEA8pRl",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hEXept4NavJ",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XRrrtPgyBGH",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fhsHopMAVHV",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ifdGbnDdYi4",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("19"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Cimetidine tablet 200mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "klvAtu7Sm8L",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Zy2OnwbCPdq",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ny3XNwz2jCL",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BKHYEDRCuOB",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "B7teOWzfsG0",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("20"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Cimetidine tablet 400mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wV2c4Hr8vaC",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nBsDDxnJaTt",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EkaVPdX67ys",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RjBHkeVw9it",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VRH34OGqzAP",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("21"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Co-Trimoxazole (Sulfamethoxazole + C-DLI: Trimethoprim) suspension 200mg + 40mg/5 ml"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c1esdepBVlP",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IeShUc9jb8j",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bJfWjZvXxAu",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jkrAs0vKvor",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "m53p7o1YJUv",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("22"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Co-Trimoxazole (Sulfamethoxazole + Trimethoprim) tablet 400mg + 80mg,"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mIQwDEIVo8j",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "N6mVPKS1jez",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JRYhRLaG3po",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "D0qeg7P0Bla",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NDqQZ1RMpxb",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("23"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Diclofenac sodium tablet 50mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SL9dQEh8Kuk",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "U2P0htc6ze0",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nrZngmY36AL",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JaWGdyBJyGS",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O1qmAvyQgdh",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("24"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Enalapril tablet 5mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BV3RYwuPUd1",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yj8VrP67DGW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Ocsj0xlGlt1",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G2KbZkpZi8C",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "v61MEbLeBiw",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("25"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Enalapril tablet 20mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "flt2ob4ZTJm",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MOje73BPC4J",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O7Lo8SnxUKp",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NOHHcI9Bfvl",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Kk84fmqmRw5",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("26"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Ferrous sulfate + folic acid tablet 200mg + 0.4mg,"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mIPD1e4Vujl",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HhpjE7HqmFq",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vVoG9aAdqfG",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EZ3drg2qaea",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "agJLlwsmYVR",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("27"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Dextose Injectable solution 5% in 500ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Y6OtjD21Mlv",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jUn0qYD2A4k",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xMUwn0O9RmP",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "spRjBSFXrh5",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WOMNJywb4iI",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("28"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Dextose Injectable solution 5% in 1000ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Uol1sKMJzIU",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "demRW3nmfNM",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pMcf8VGAe1O",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qsTNwVNkNio",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Bqfnkvu2jVG",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("29"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Hyoscine (Scopolamine) tablet 10mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZH337uGUgP2",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xyYKID6Hyi8",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bKTrNnmPq2b",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nH66qA4eRQH",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pNAed6tVGVk",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("30"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Mebendazole tablet 500mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uf4UtFTOQ62",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wW8xt8kcj2h",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OoqFDU9cSHh",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iH16hye8VaT",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AFHeWDWKSed",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("31"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Omeprazol tablet 10mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Capsule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xLKilz3tsTR",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UhGc7u3c3hk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Y6uEvJOpr1V",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HwUBGNsMCDd",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tKSWG2pWQLe",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("32"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Omeprazol tablet 20mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Capsule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "e9J7cmBNAWO",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "u2F4jMkpLXM",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q8mzjOpijVr",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZdekohrZf5x",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CqqHDwkS7uB",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("33"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Oral rehydration salt Powder for dilution"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Sack", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "p4ovaiq5HVu",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "y0Q673QJpMq",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cAyCk9QTXeI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mJWvNoNvuo0",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Cdta3I9K3zo",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("34"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Oxytocin Injection 10 IU in 1ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Ampoule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MdfLYmzcMmZ",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Z3NaOrCmbPk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mL4a6sHsAB0",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Fu8Vjk12jJG",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xlVDG7BDyg5",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("35"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Paracetamol tablet 500mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GJAT4siJrYB",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UuvcqDfO27I",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PxYrWMrzjt8",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XOnn6FoKkS2",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LoHIn1FPenc",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("36"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Paracetamol injection 300mg/2ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Ampoule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PdY860dRR9w",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aMAgyBL6tqM",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JLhbjhgdxhT",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "u9jHci5aHWM",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OOJkjokDHRO",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("37"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Paracetamol syrup 120mg /5ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "S7oQnZz2CNo",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yESksGLgZcW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jF9b3mGIYUz",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JayZJYbLgRu",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qP2LIgQ5gsL",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("38"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Penta (DPT-Hep B-Hib vaccine ( Diphteria, Tetanus, whole-cell Pertussis(DTP), Hepatitis B and Haemophilus influenza type B))"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: t("Dose"), cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CEQ5JFl3UOw",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ays5A90ERpH",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ubKr1rRFpXc",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "omsqoXbdhuC",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nszyv3ZWlPh",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("39"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Phenoxymethylpenicillin (Penicillin V) tablet 400.000 IU"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Mi0TEcpLazH",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "W2UfFZTHF6x",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "onKHIAz0JsH",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Wsv5xQskYlh",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qYwDbOfkVII",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("40"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Phytomenadione (Vitamine K1) injection 1mg/ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Ampoule", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "f0BByENHezU",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PB2wKNyxNx7",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hFVudAgNjdL",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "G6oYDFsHVYD",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VDp0uvRyYue",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("41"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Polyvidone iodine Solution 10%"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bottle", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TceAic5dtSi",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OTs9s9QUMl9",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OcceRX2DGNv",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GZoZAMqChec",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RodnDTTNPBe",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("42"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Primaquine 7.5mg/15mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oeOlzbwGlPj",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fuO89MtRjis",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zfhcHgdbXka",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yx9oi33SeWz",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zq6dgmwdLai",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("43"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Retinol (Vitamine A) Soft capsule 100,000 IU"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "Soft capsule",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OXIMlKWarSc",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lWBkGEpLco8",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xJfsEi2wmMW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LcmobKyHNus",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O7TAd7Q1hYl",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("44"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Retinol (Vitamine A) Soft capsule 200,000 IU"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "Soft capsule",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yblltAtavuj",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OgpDw87Q7WY",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nfgJ6xxbVPP",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "R3cnu2GbKQ7",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J883DuLcrLv",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("45"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Ringer acetate or lactate, compound solution Injectable solution 500ml"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uNvqloUrM1I",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eXLBwSJ1xFN",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YH2LgoWAPId",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lJ306mjr5lt",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GydpMaXJZBi",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("46"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Ringer acetate or lactate, compound solution Injectable solution 1000ml"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "h6nQgvN9Toe",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CHaPXN2BBFY",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GK9btRjLSUA",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WEjaANKdPbM",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "DMDcmLsBy87",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("47"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Salbutamol tablet 2mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HSo7dnYtaSA",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vlbsRhwAgkr",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "h1gwmkAOW9K",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VtWBFrpzwZE",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TDhf4MrFgzM",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("48"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Sodium chloride Injectable solution 0.9% isotonic in 500ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "f9CzqEG6W2E",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zHPmwI7jWm8",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "itv0ZWAvSFX",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "t6diiepS3Ou",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "I7p6uo1fqq6",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("49"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Sodium chloride Injectable solution 0.9% isotonic in 1000ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Bag", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BppqQPjPHlS",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IQ2eM5FEJWD",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YVLrwd4DbmI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KqPPhJFYt2V",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yAAg3XUK4gp",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("50"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Syringe 1 ml"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Piece", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pF79h2tNUp4",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gLKdXUsaLpI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KnLzRTQhchZ",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uICODFLptnr",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HPuKeEY9xnO",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("51"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Tetracycline Eye ointment 1%"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tube", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YiiIsmRlOol",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O7xq8JqGtnl",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iZEFw2oxt7D",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rCMZUxlrVeN",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q5Iq5HPjq8G",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("52"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Thiamine (Vitamine B1) tablet  50mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QiLMrf8fJbU",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bNLvjSKnzLc",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vFAm7QbAaPE",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PKpZUsls4kK",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Vl78uvTmujf",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("53"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Thiamine (Vitamine B1) tablet 100mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Yg5rdI9aBk2",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lsATmcjNu3b",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XAVOkOquWrk",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vT9mrxfGEuj",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aYlRc2MR6aI",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("54"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Thiamine (Vitamine B1) tablet 250mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AwCZAzenzli",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VDyES67m6iu",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CaAq5ZgYmKr",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "q2EQxMmapFx",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rZU8PUUd1SN",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("55"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Zinc sulfate tablet 20mg"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Tablet", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lGckisImnwO",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hYOWcZTpPXx",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FgkzNJOC02f",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oLUGGA7rZ7m",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kIDMQjjZtdV",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("56"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Sputum cups"),
        cellProps: labelStyle,
      },
      { display: "text", text: t("Cup"), cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "i5Jt8SEvsIx",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VkBAiLKbdzE",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vA6umXSi7UI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kbmff1dEt91",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "upn57UXkvDG",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("57"), cellProps: labelStyle },
      { display: "text", text: t("Condom"), cellProps: labelStyle },
      { display: "text", text: "Piece", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O9f2oy0gq2d",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BukqTSFLfvn",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nyaVbSUoMnY",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ShRRRVbuQdh",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JIrjKR4oezD",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("58"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Malaria Rapid Diagnostic Test"),
        cellProps: labelStyle,
      },
      { display: "text", text: t("Kit"), cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZlY9bQJU9uw",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PvGbSBfIiDI",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Iob75Za7RrC",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "f3AotIWM4eN",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "erWautKjgGL",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("59"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Health Book MCH"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Book", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PxwWQTkoIza",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QiJUyzLzuuf",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NqsoaNHILRB",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ShGztI7lnQx",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EyuyKkOjsny",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("60"), cellProps: labelStyle },
      {
        display: "text",
        text: t("Levonorgestrel tablet 30mcg (Mini pills, BL/35tablet"),
        cellProps: labelStyle,
      },
      { display: "text", text: "Blister", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "R97BCmokqO0",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fdrqjOtJyJa",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tjrLORD28ix",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XG1v1rNY5zW",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EhA0pqt34pb",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("61"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Ethinylestradiol + levonorgestrel 30mg/150mcg (Combined Pills, BL/28tablet)"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Blister", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tzPF1XH2FQU",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "stsAam54BfS",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lNu8STrNgZD",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sXWvsv87bqZ",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NE2FxuWG7al",
        cellProps: de2Style,
      },
    ],
    [
      { display: "text", text: t("62"), cellProps: labelStyle },
      {
        display: "text",
        text: t(
          "Medroxy progesterone acetate injection 150mg/ml (Depo-Provera)"
        ),
        cellProps: labelStyle,
      },
      { display: "text", text: "Vial", cellProps: labelStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BGvaeZqW2f9",
        cellProps: deStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ploSN13C9CO",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q4HvI1NO8Jz",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "i0LkLiAhn5k",
        cellProps: de2Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wA1bds0c6Rq",
        cellProps: de2Style,
      },
    ],
  ]);

  const [remainingReady, setRemainingReady] = useState(false);

  const getLastMonth = () => {
    let year = parseInt(period.dhis2Period.slice(0, 4));
    let month = parseInt(period.dhis2Period.slice(4, 6));
    if (month == 1) {
      month = 12;
      year -= 1;
    } else if (month >= 11) {
      month -= 1;
    } else {
      month -= 1;
      month = "0" + month;
    }
    const pe = "" + year + month;
    return pe;
  };

  const loadRemainningFormLastM = async () => {
    try {
      const pe = getLastMonth();
      const ou = orgUnit.id;
      const result = await pull(
        `/api/dataValueSets.json?dataSet=Q41TH1Zl2DS&period=${pe}&orgUnit=${ou}`
      );
      if (result) {
        if (result.dataValues != null || result.dataValues != "undefined") {
          let dataValues = {};
          DEs.forEach(function (data) {
            result.dataValues.forEach(function (data1) {
              if (data1.dataElement == data.closingBalance) {
                dataValues[data.remaining.replace("-val", "")] = data1.value;
              }
            });
          });
          let listSavePush = [];
          const newDataElementConfigs = dataElementConfigs.map((item) => {
            return item.map((col, colIndex) => {
              if (dataValues[`${col.dsde}-${col.coc}`]) {
                listDataValue[
                  `${col.dsde}-${col.coc}-${orgUnit.id}-${attributeOptionCombo.id}`
                ]?.value !== dataValues[`${col.dsde}-${col.coc}`] &&
                  listSavePush.push({
                    setValueToStore: () =>
                      setDataValue(
                        col.dsde,
                        col.coc,
                        orgUnit.id,
                        dataValues[`${col.dsde}-${col.coc}`]
                      ),
                    save: saveDataValue(
                      "Q41TH1Zl2DS",
                      orgUnit.id,
                      period.dhis2Period,
                      col.dsde,
                      col.coc,
                      dataValues[`${col.dsde}-${col.coc}`],
                      attributeOptionCombo
                    ),
                  });

                return {
                  ...col,
                  display: "text",
                  cellProps: {
                    sx: { ...col.cellProps.sx, textAlign: "center" },
                  },
                  customCell: <>{dataValues[`${col.dsde}-${col.coc}`]}</>,
                };
              }
              return col;
            });
          });
          setDataElementConfigs(newDataElementConfigs);
          const resultSave = await Promise.all(
            listSavePush.map((item) => item.save)
          );
          resultSave.forEach((item, index) => {
            const { setValueToStore } = listSavePush[index];
            if (item.ok) {
              setValueToStore();
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRemainingReady(true);
    }
  };
  useEffect(() => {
    loadRemainningFormLastM();
  }, []);

  useEffect(() => {
    if (!remainingReady) return;
    (async () => {
      let listSavePush = [];
      const newDataElementConfigs = dataElementConfigs.map((item) => {
        return item.map((col, colIndex) => {
          if (DEs.find((de) => de.closingBalance === col.dsde)) {
            const listData = item.slice(colIndex - 4, colIndex);
            const value = () => {
              const remain = listData[0].customCell?.props?.children || "0";
              const receive =
                parseInt(
                  listDataValue[
                    `${listData[1].dsde}-${listData[1].coc}-${orgUnit.id}-${attributeOptionCombo.id}`
                  ]?.value
                ) || 0;
              const dist =
                parseInt(
                  listDataValue[
                    `${listData[2].dsde}-${listData[2].coc}-${orgUnit.id}-${attributeOptionCombo.id}`
                  ]?.value
                ) || 0;
              const wasted =
                parseInt(
                  listDataValue[
                    `${listData[3].dsde}-${listData[3].coc}-${orgUnit.id}-${attributeOptionCombo.id}`
                  ]?.value
                ) || 0;
              const res = remain * 1 + receive - dist - wasted;

              listDataValue[
                `${col.dsde}-${col.coc}-${orgUnit.id}-${attributeOptionCombo.id}`
              ]?.value !== `${res}` &&
                listSavePush.push({
                  setValueToStore: () =>
                    setDataValue(col.dsde, col.coc, orgUnit.id, `${res}`),
                  save: saveDataValue(
                    "Q41TH1Zl2DS",
                    orgUnit.id,
                    period.dhis2Period,
                    col.dsde,
                    col.coc,
                    `${res}`,
                    attributeOptionCombo
                  ),
                });
              return res;
            };
            return {
              ...col,
              display: "text",
              customCell: (
                <>
                  <Typography
                    sx={{ textAlign: "center", color: value() < 0 && "red" }}
                  >
                    {value()}
                  </Typography>
                </>
              ),
            };
          }
          return col;
        });
      });
      setDataElementConfigs(newDataElementConfigs);
      const resultSave = await Promise.all(
        listSavePush.map((item) => item.save)
      );
      resultSave.forEach((item, index) => {
        const { setValueToStore } = listSavePush[index];
        if (item.ok) {
          setValueToStore();
        }
      });
    })();
  }, [JSON.stringify(listDataValue), remainingReady]);
  return (
    <Box id="dlip-c-form-container" className="custom-form">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={8}>{t("form_title")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default DlipC;
