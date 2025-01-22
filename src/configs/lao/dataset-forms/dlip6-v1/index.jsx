import {
  Box,
  styled,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./dlip6-v1.css";
import { useMemo, useState } from "react";
import { TabContext, TabList } from "@mui/lab";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

const Dlip6V1 = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const headerStyle = {
    sx: {
      backgroundColor: "#000066",
      textAlign: "center",
      color: "#fff",
    },
  };
  const labelStyle = {
    sx: {
      backgroundColor: "#CCCC66",
      color: "#000",
    },
  };
  const label2Style = {
    sx: {
      backgroundColor: "#99CCFF",
      color: "#000",
    },
  };

  const deStyle = {
    sx: {
      backgroundColor: "#CCFF99",
      width: "250px",
      padding: "5px 30px !important",
    },
  };
  const de2Style = {
    sx: {
      backgroundColor: "#CCFFFF",
      width: "250px",
      padding: "5px 30px !important",
    },
  };
  const emptyStyle = {
    sx: {
      backgroundColor: "rgb(170, 182, 162)",
    },
  };
  const dataElementOverviewConfigs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("OVERVIEW_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Date_of_assessment_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "UG7mM1I6rn8",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Names_assessors_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SnJbA02G1dj",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_MDs_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jruN0Ux7FQh",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_MAs_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IxagKfW9LrC",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_nurses_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "h2kIMj1KkZ9",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_midwives_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SbaRBADLCm6",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_paramedics_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JSyhxy8t43E",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("Number_of_suppor_"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Pr0QAN3XE5P",
          cellProps: deStyle,
        },
      ],
    ],
    []
  );
  const dataElement1Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("ADMIN_FINANCE_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("2"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oOBTH0BXNz5",
          cellProps: deStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("3"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("4"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mJAMvkDtXqI",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("5"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sEwLe638ZdT",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("6"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("7"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "b5YWf8lhUGO",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("8"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("9"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "q4vLtfklO81",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("10"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hOkSQ6vT8tZ",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("11"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("12"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YXJD3xSJa5u",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("13"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("14"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Uucrw6xRVY9",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("15"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "w1XZg6w6geK",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("16"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("17"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ulUnJ7mS8lL",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("18"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mPU1nnk0HXQ",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("19"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IwYEbvTQCTs",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("20"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FtPjRPl2JVH",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("21"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("22"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "icxrfpWNnjJ",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("23"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oAsnjoXgCIZ",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("24"),
          cellProps: labelStyle,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lRLGbI9HXve",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement2Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("26"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("27"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("28"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IDoKkaggb7K",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("29"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YP2nHlew9Ki",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("30"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("31"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QiXywqyjHI8",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("32"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YSnuxJKU1c8",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("33"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RnsVQUbPEP1",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("34"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("35"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VrGEphYlWi7",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("36"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("37"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "exFyzlGMSTV",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("38"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GPUQnpQcTUp",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("39"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("40"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jWLwwA0XifU",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("41"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xVZNa72f19h",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("42"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Ki81nNbQB0I",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("43"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Jekc8Ebur0E",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("44"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mbazyWfEey8",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("45"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("46"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qeByMafHmsv",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("47"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "a6iVFhM6Bo6",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("48"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gKybEXKVwpk",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("49"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ANF0pq92JWx",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("50"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RN1CdbBNWT8",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("51"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("52"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NOQrcfAVxm3",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("53"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QX2wjHzceAo",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("54"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("55"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Lx9guXWUUwY",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("56"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GbByHgkGccE",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("57"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cFDKKdjNwad",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("58"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("59"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "afJPV5gfO8I",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("60"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wawMV1oUWLS",
          cellProps: de2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("61"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        {
          display: "text",
          text: t("62"),
          cellProps: label2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Vr4tNqlRjbF",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement3Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("CONSULTATION_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        {
          display: "text",
          text: t("65"),
        },
        {
          display: "text",
          text: "",
        },
      ],
      [
        { display: "text", text: t("66"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "G0nHPr70wny",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("67"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y1I7xAtl6gu",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("68"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "R1vmh5J8fei",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("69") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("70"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Cpy0Zlc0w7m",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("71"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MvoHuQ65P2d",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("72") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("73"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yNlnJRp6uBh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("74") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("75"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AshgeZ8ZT12",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("76"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZL18BcD7y4O",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("77"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Q6ISzuOyNBS",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("78"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "nRxZgNhNCD5",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("79"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "orgAjCqoKx5",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("80"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "icirA5hUYO5",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("81"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QhvzeJC2OIn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("82"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vozcc09M6Uy",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("83") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("84"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sUpuPavZSoh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("85"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aM5RJapiCQt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("86"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Wp2ZcToEYGV",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("87"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rJAFBUpGIID",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("88") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("89"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dcgqikgc9AM",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("90") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("91"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eM3obZm0TM3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("92") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("93"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Vwh3eA7ZdGG",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("94") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("95"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dKrixz1NrML",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("96"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AUTu57XrmaX",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("97"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "g3tDy1gmwJT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("98"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XBWG9jjHe78",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("99"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "T3EjqsnLTzd",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("100") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("101"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rAxR6ctrLLq",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("102") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("103"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pJT6ZlWns6B",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("104") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("105"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YX8bu3PJyot",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("106") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("107"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SgMNVQib2wm",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("108") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("109"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WcANvWjmxqo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("110") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("111"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uTBgwrVZGcw",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("112"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KLNXCFYbyJ7",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("114") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("115"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "m5d5oKbMlvz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("116"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "U9nP9sd0xiz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("117") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("118"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sKyAVRh6A7U",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("119") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("120"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RRsQstekvdp",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("121"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "J9QbLJRjfZe",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("122") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("123"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jKyTy9uCQPx",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("124"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cYUQ73tbAyn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("125") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("126"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oaaIhcFBC4f",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("127"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sPBoXFl9ZqM",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("128") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("129"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EiZEDlUAzjo",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement4Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("IN-PATIENT_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("132") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("133"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Tz34Dti8Kq3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("134"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BupEh2sISOI",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("135"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "i3kbHitOgfW",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("136") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("137"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "J3yDL3WpwqK",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("138"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kVi8Av79xX6",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("139"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HmEelUTXtzM",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("140") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("141"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "UnzCerKpDzr",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("142"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FipmQRPCfeJ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("143") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("144"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Dy6r7Sgf7vq",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("145") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("146"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JSW5xEzRznt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("147") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("148"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aEHHJpkuWOs",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("149") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("150"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "t8ZSxwEhdnr",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement5Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("CHILD_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("153") },
        { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "G8kv00xD8ME" },
      ],
      [
        { display: "text", text: t("GER111"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("154"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IzsAwklc7WD",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("155"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "A6b8CsCe91z",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("156") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("157"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lRgdzbVLSiR",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("158"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gpWGttpi0RX",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("159"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kYPNW6G8Lvr",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("160"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rDFOLAgHzwP",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("161"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XWRjxNvRi0S",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("162") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("163"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "i2iqwzgaQpf",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("164"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "nUNrzFvULnm",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("165"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oEPXWFkizNm",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("166"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "thTsHnYLwud",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("167") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("168"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OtAMqM2PpVP",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("169"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HG23LhCu154",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("170") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("171"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fdmEebUk46n",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("172") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("173"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cwr7M63gJgG",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("174"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "DSMerr2WUrM",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("175") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER112"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("GER113"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("176"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Ah96q0E53Rz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("177"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BRbQ4G010J9",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("178"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "o1XOKvxfYiI",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("179"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hgodt0v2BOX",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("180"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eVohelh1UeQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("181"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WT89U4NGbKO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("182"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Tn691nMbSKf",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("183") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER114"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("184"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fzj0IL1VxBn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("185"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "k4tteEKbf4J",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("186"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tievs42pJx3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("187"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XjFpb3IzNkA",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("188"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oyWSgkGhL0G",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("189") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER115"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("190"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "j5CXO3KFeDG",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("191"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cUTQpH2GBG9",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("192") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER116"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("193"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZFOIg208r7E",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("194"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tkLXTISiGwW",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("195"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tvUvyNvn7Gb",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("196"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kMELN8zRw5Y",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("197") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER117"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("198"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NbcJJz9m93w",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("199"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MFDzczwSAGd",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("200"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RNyVR1KgqFt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("201"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "koMK9iHR0qE",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement6Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("MATERNAL_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("204") },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yDIm4OGldno",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("205"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("206"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v3qQYSe1FBl",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("207"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QqeJE6kbJ0i",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("208") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("209"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Hxu6jdVwRe1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("210"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JE3970Tsqse",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("211") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("212"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "byXiOGQ0TlO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("213"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZYJtImziJMs",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("214"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VZxaBmAg1FT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("215") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("216"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kulBJ0PTY9l",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("217"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "PDIXduGpmWz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("218"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tbWwtmiKOsh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("219") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("220"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KkUhFZ2Nta0",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("221"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GygXkZjPoMs",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("222") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER118"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("223"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Nhib6VZ7tzF",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("224"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dQ3HzA161Sb",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("225"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lm73McihYzz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("226"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MD7n2f5nONa",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("227"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MdPMwqigDbh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("228"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WshHkMZKHYU",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("229") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER119"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("230"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "u6xb0EdSSy6",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("231"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "usRV2bBJgEi",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("232"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XO1FoOfXIqD",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("233"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "k8xEA4NoK8e",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("234"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vacFUWGTeVE",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("235"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y0PzAeJpt2O",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("236"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zDFaPFQ7CD3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("237"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "DaiKiNVc6R5",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("238") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER120"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("239"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uICATzaH8nS",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("240"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y8PpxUt3riQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("241"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VYHNv6GiUe8",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("242"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SZC4qB3EbbT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("243"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wqt0T4KtWMT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("244"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "J9X9fe9xker",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("245"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vFE2ud7CY9m",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("246") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("247"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SxT0NG9U0TY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("248"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eK9inYbcEu1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("249"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dHJl3HhhzQa",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("250") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("251"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XIhp9cBUNka",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("252"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "b2iubNoJrry",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("253") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("254"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vTn5R12kwRd",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("255"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XNp2RhwtJ8e",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("256") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("257"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zLLpTsdEkCq",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("258"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ixkfuFgpEFH",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("259"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kZE9dL2QIGS",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("260"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HfiKEBNEzf7",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("261"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AGMcCJAv0ud",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("262"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uEkzIlQM9Q1",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("263"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TFMyYLOFZwB",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("264") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("265"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BjT2ZVvN0ck",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("266"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "IUIQ8HZ34Qt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("267"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aJpyZ5VLhCR",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("268") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("269"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EBXqR0yEEfB",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("270") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("271"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "izg09Z6IRv7",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("272"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WugxT5v4BFs",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("273"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TXAEys5PzYn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("274") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("275"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VzwA9NXOG3C",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("276") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("277"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "quhFgzmlNCa",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("278"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RWlKCIFpSLq",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("279"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "L5O7xiar7rp",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement7Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("Infectious_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("282") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("283"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YzYIlOod4em",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("284") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("285"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("286"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qxIvi1guQkF",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("287"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GUGN4Wn4JEO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("288") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER120"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("289"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vp5egjDHf39",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("290"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eciiHrGCt43",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("291") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER121"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("292"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "P7ujgLbO2aA",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("293"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uN6G2p9bgA1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("294") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("295"), cellProps: label2Style },
        {
          display: "text",
          text: "",
          cellProps: label2Style,
        },
      ],
      [
        { display: "text", text: t("296"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Z84uXqOpoCk",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("297"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NevOMODU2KO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("298"), cellProps: label2Style },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("299"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MFoRXpekR9B",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("300"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FGwZ58Qv63v",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("301") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER121"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("302"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Xr2NMEOA5dJ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("303"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SvVJHvF2lGJ",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement8Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("Non-Communicable_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("305"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EjYAZPwGXo3",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("306") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER124"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("307"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KEF7RAkxyP2",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("308"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XvX0zhJdKoo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("309") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("310"), cellProps: label2Style },
        { display: "text", text: "", cellProps: label2Style },
      ],
      [
        { display: "text", text: t("311"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sQMrVGpkGHy",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("312"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pepQvwG0bUB",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("313"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ixWHvODs83e",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const dataElement9Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("LABORATORY_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("316") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("GER125"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uTD9l043mXh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("317") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("318"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cS1peumxzbo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("319") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("320"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lcsoFtI9LYo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("321"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Oa1DePL298G",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("322"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uyj6qIpewbN",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("323"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MVpJCcQ6EnZ",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("324"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gzb7mBgvQzS",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("325"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aGqHnPH6m1e",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("326") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("327"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Pi8DSbhGAJW",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("GER001"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OSSKsE7a77s",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("328"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ltMeiSwzhUr",
          cellProps: deStyle,
        },
      ],
    ],
    []
  );
  const dataElement10Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("PHARMACY_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("331") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("332"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GVDgVOVuhpp",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("333") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("334"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "urOHYzRsfZm",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("335"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qp9wRNT0Cm4",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("336") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("337"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YsORvVUzEct",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("338") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("339"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SLUcA6b0Ami",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("340"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "CzummaipdBP",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("341"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "g0k4vUau1t0",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("342"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "aFIF0zDRJpK",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("343"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "o7zFYTrR56k",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("344") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("345"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pshbIEkJ19J",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("346"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qovjJIQzDDb",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("347"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HmwOw11N6SK",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("348") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("349"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vbyxpSdg1MU",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("350"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bVMPIsiUswZ",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("351"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Pu8x0jBwmC0",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("352"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AcjNSD8lCX5",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("353"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "U46CQjX6Ugf",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("354"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Dv35fFVSZzV",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("355"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WNafCFNwz1L",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("356"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cAKuX5KcPF7",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("357"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LWlpxWzQnKw",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER126"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "OADAF3sU8gk",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER127"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JUEnvAPER3m",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER128"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "n2Fw6E7jcuF",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER129"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oicbXC8pnjx",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER130"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "NWvT21WHByX",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("358"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iZN49xp4atn",
          cellProps: deStyle,
        },
      ],
    ],
    []
  );
  const dataElement11Configs = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("HMIS_"),
          cellProps: headerStyle,
        },
        {
          display: "text",
          text: t("Answer_"),
          cellProps: headerStyle,
        },
      ],
      [
        { display: "text", text: t("359") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("360"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HD7frqU6SEU",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("361"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MkltfFaLEMT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("362"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "as4vV9HYa1Q",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("363"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "o4hnpgFR5cK",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("364"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "J2IuVCseCm4",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("365"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "PamXjIpoQrV",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("366"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gP4xQH9resr",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("367"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "rafUXLWg5sh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("368"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AG37cLQWyZC",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("369"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MiCbGBxT1VP",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("370") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("371"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jdstU8iulwL",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("372"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "w3xNuYRkzr8",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("373") },
        { display: "text", text: "" },
      ],
      [
        { display: "text", text: t("374"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SP7pVeWsXbc",
          cellProps: de2Style,
        },
      ],
    ],
    []
  );
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box id="dlip6-v1-form-container" className="custom-form">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={t("OVERVIEW_")} value={0} />
            <Tab label={t("ADMIN_FINANCE_")} value={1} />
            <Tab label={t("HYGIENE_SANITATION_")} value={2} />
            <Tab label={t("CONSULTATION_")} value={3} />
            <Tab label={t("IN-PATIENT_")} value={4} />
            <Tab label={t("CHILD_")} value={5} />
            <Tab label={t("MATERNAL_")} value={6} />
            <Tab label={t("Infectious_")} value={7} />
            <Tab label={t("Non-Communicable_")} value={8} />
            <Tab label={t("LABORATORY_")} value={9} />
            <Tab label={t("PHARMACY_")} value={10} />
            <Tab label={t("HMIS_")} value={11} />
          </TabList>
        </TabContext>
      </Box>

      <Box
        value={value}
        index={0}
        style={{ display: value === 0 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElementOverviewConfigs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={1}
        style={{ display: value === 1 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement1Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={2}
        style={{ display: value === 2 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement2Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={3}
        style={{ display: value === 3 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement3Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={4}
        style={{ display: value === 4 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement4Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={5}
        style={{ display: value === 5 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement5Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={6}
        style={{ display: value === 6 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement6Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={7}
        style={{ display: value === 7 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement7Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={8}
        style={{ display: value === 8 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement8Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={9}
        style={{ display: value === 9 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement9Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={10}
        style={{ display: value === 10 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement10Configs} />
          </TableBody>
        </Table>
      </Box>
      <Box
        value={value}
        index={11}
        style={{ display: value === 11 ? undefined : "none" }}
      >
        <Table>
          <TableBody>
            <MapTable dataElementConfigs={dataElement11Configs} />
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Dlip6V1;
