import {
  Box,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./dlip6-v2.css";
import { useMemo, useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

const Dlip6V2 = () => {
  const { t } = useTranslation();
  const { period } = useSelectionStore(
    (state) => ({ period: state.period, orgUnit: state.orgUnit }),
    shallow
  );

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const year = useMemo(
    () => parseInt(period.dhis2Period.slice(0, 4)),
    [period]
  );

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
          dsde: "p4wbFuEXX7A",
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
          dsde: "DSsE5SLaEY9",
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
          dsde: "nN9o41ZoiOd",
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
          dsde: "jKlXogfGmFc",
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
          dsde: "INXI8OnOCc3",
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
          dsde: "g1XOmhpI8gH",
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
          dsde: "j84ppKs1YXS",
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
          dsde: "HJ5TTRMS4W2",
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
          dsde: "ADhl13sYEfZ",
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
          dsde: "zdKClxM96tr",
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
          dsde: "ILfvTM48itS",
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
          dsde: "mUjHDL0aW44",
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
          dsde: "oqz6Xcpc4Nc",
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
          dsde: "zNMwUWP4N3L",
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
          dsde: "Fhiyj4WgIKh",
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
          dsde: "J5ZhFZtbaAg",
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
          dsde: "fEGhUHXpul5",
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
          dsde: "emPfIsr0bQS",
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
          dsde: "F6ddEPXZjgi",
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
          dsde: "dPDUiWNB6Cm",
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
          dsde: "mDe3uYSTcxj",
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
          dsde: "vl7Ft50mzRO",
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
          dsde: "FXki71RUNtr",
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
          dsde: "J4KuCXAoXc2",
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
          dsde: "omf0JtrNHAv",
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
          dsde: "y8AGWIROiDO",
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
          dsde: "fi0LKeMMeU7",
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
          dsde: "d0ZiqGgtE8j",
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
          dsde: "Uf6JLRzgDny",
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
          dsde: "W6TMKk62KZ7",
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
          dsde: "Seit6h0iT7f",
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
          dsde: "JrtCHRthHfM",
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
          dsde: "XgIIuO8luPS",
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
          dsde: "aR0XE4pvRms",
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
          dsde: "xPDK7fbICUl",
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
          dsde: "NrI0i08wrRE",
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
          dsde: "EkUv5qDH8AB",
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
          dsde: "Heep90X6qdB",
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
          dsde: "D9ccC6dcymW",
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
          dsde: "W1RVh4xBtjI",
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
          dsde: "ldGxfneeK8a",
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
          dsde: "QEkSBs8u6QY",
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
          dsde: "nsvXlIIWRoH",
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
          dsde: "Cf3uoOl7pfX",
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
          dsde: "uQZEwq6RjEh",
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
          dsde: "tSXZkw5y6zj",
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
          dsde: "ZjuNzKiPZxM",
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
          dsde: "lE9FRagoUeq",
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
          dsde: "vkgsxmJYYcu",
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
          dsde: "acC69YDzP54",
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
          dsde: "njiBDxHGmKB",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("67"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gNJcknzYYb8",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("68"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Jz38NPMJpnf",
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
          dsde: "TXilO3Bviu0",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("71"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Kzk4Gf61Bjj",
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
          dsde: "QVfpQ6kH70z",
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
          dsde: "H2mAjo4yncw",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("76"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cu4k3B03mkS",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("77"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RIu0xwJtfWY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("78"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jmC34y8oIwu",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("79"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WaKSJ0n8yyo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("80"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lwp6me7KbJo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("81"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WWzY13x2i0s",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("82"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WLiPpvRYOIr",
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
          dsde: "UupzXroVX04",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("85"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FemiczAsvjz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("86"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VLwrl219bpZ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("87"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "vxthm9CelIN",
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
          dsde: "COYeN5Fhfx2",
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
          dsde: "TUE4IsNWRNk",
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
          dsde: "YYPqpPfKxhA",
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
          dsde: "J4A0FkqhaYy",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("96"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "s2X6FOasJ1E",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("97"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "D92brm13dXM",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("98"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mb9GnaDkUir",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("99"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bXwOfK0dLA6",
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
          dsde: "PxZmHnN5EHY",
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
          dsde: "UZ9VFjbDlZ8",
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
          dsde: "fcNiCCNHglc",
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
          dsde: "B7JxqlnN6qI",
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
          dsde: "ViLVFsr4q7W",
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
          dsde: "p06TOhRXqAt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("112"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bCgEwZKOMIo",
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
          dsde: "oYZFYGt1lD1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("116"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "DuBcyIBtNAi",
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
          dsde: "qaMzCA3GSGl",
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
          dsde: "W7liDTWZCby",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("121"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "b1vT0lyjwDQ",
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
          dsde: "inIXMenDidT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("124"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "StDRoGrq2s8",
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
          dsde: "gjePpMUfykB",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("127"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "r4SyqfhR9Ie",
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
          dsde: "rZ3nDzTDTWs",
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
          dsde: "IP7gUi40BC2",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("134"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Gpc5aUSW1YY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("135"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hO9pAuTK3N3",
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
          dsde: "dPefvILvqRI",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("138"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gm9mX7UWKXV",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("139"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EHmeL7F6euW",
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
          dsde: "GNaDXcCXEKe",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("142"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mY0BTxfDzhf",
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
          dsde: "z8PQXf18xTf",
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
          dsde: "eiq6W4w3YEI",
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
          dsde: "NWAmZf7IyGJ",
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
          dsde: "YOn15fkLZiz",
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
        { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "BFUg3ehY4C6" },
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
          dsde: "eh7mqhlQDd8",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("155"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JcbyFMvMfGZ",
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
          dsde: "c0GYimuGD1l",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("158"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "nc4fMd1eBvA",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("159"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qvHHvpKuvES",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("160"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "CRsL2LOEI7z",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("161"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tUKK60eXZRp",
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
          dsde: "cDYJhiypflP",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("164"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "nkxDM2xUIFu",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("165"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dclDN5e6PV5",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("166"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dDsL62g8t1X",
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
          dsde: "Xr4eqxqw2Ha",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("169"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eqA3C6Iblid",
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
          dsde: "jVt74jVbVTC",
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
          dsde: "nW4hFFX9FDD",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("174"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "HGKp4JarB5G",
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
          dsde: "E5cykYBFjaZ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("177"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FtZWMmDvuDf",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("178"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hxN7733L71N",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("179"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y7Rh5jZwi1o",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("180"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v1vrtRj3Uxv",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("181"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "cC3LpG82bx2",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("182"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mmib1Ll86F1",
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
          dsde: "RxWUNzlWTiz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("185"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jklaIUoWNuY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("186"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iH9poZaQRSy",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("187"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dzOqpbqrVg4",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("188"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LLlhNcgRd0m",
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
          dsde: "w9CSTx34Glw",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("191"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YE93s2eH556",
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
          dsde: "BeK0Mlev9XH",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("194"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YvZWcfEuNdo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("195"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "LYbHv9INWJO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("196"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sjYja95u7L8",
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
          dsde: "sfQjfn37oAr",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("199"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bD8paoVCpxv",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("200"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Wg9IILMvVBl",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("201"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "eEtL4QoV2yz",
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
          dsde: "DBvx4yXJQ2B",
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
          dsde: "pXclX5nrzvv",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("207"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "W4UhgSP6ioo",
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
          dsde: "pjO1Zif9Xbz",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("210"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "iYOOfCnYR5x",
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
          dsde: "RnjOLyp9PcJ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("213"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FndZZyINPdR",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("214"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kzhCtNUCbYo",
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
          dsde: "N1nIMSBYAvW",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("217"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uOoU0PLuD1K",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("218"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "evob29ACqNx",
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
          dsde: "XrZyPeISj3f",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("221"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qR6cWIjVqdV",
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
          dsde: "t23XnoqOvWA",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("224"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wopL9JviIe3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("225"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "o1FSvcvINzh",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("226"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MGdVtdBNmDn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("227"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZEfe8WHFXCY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("228"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "lw628MyMv8F",
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
          dsde: "abshW0ihpGs",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("231"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tA8H5gFqOK1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("232"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ug0Ye9iF6F3",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("233"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ZVAkAzu8esQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("234"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jDhZtgAA4Bm",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("235"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zV3oCXOp1sx",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("236"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "O89EHwvGVX1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("237"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wPBkDfyuZu2",
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
          dsde: "EhN8s1iGmIY",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("240"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FYlrTpqEhNC",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("241"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "zxn0PF9XkbW",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("242"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "pU6USKeYLDF",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("243"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "q1Xob5Ys4cQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("244"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "uUeLOCf99sp",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("245"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "BDP987JElCg",
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
          dsde: "pI8Vg5mU3Nt",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("248"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y7k0t4leSTB",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("249"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WScSeWspGVQ",
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
          dsde: "gZYP9BYqgmI",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("252"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "oMV7YYccWYW",
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
          dsde: "WqxxZTDMlme",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("255"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "d18GlYRUa7b",
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
          dsde: "IS1YiGKnTnQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("258"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SpHMMZnTX7l",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("259"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "tdBRQwUg1Ox",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("260"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "b8ACpIto2Uw",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("261"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "abdUv21psks",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("262"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "D2C3sbXCcMV",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("263"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "sXuAo8KZ9lt",
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
          dsde: "iUIo2m5LyWl",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("266"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Nu7f6Rf1K6y",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("267"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "XulZA0Uk7l6",
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
          dsde: "MxUEgkiKxtl",
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
          dsde: "U5YvbddKDPb",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("272"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YfzuFkWjVvQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("273"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "VQ6cgcXaMAB",
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
          dsde: "fyJeHz4ooBX",
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
          dsde: "gnsYvOiBnGe",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("278"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "dE2iBhu8ZJv",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("279"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Gxn96P8vzMM",
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
          dsde: "m13BAqLJn7X",
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
          dsde: "F5nkV0SufRZ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("287"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "TTKRbxJnxO0",
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
          dsde: "XpAaor71n18",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("290"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Cza56pVJqyl",
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
          dsde: "Ichf9mPTOo7",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("293"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gORwVEgln7v",
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
          dsde: "B6fDTMPuQxu",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("297"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ONU8ruflbMJ",
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
          dsde: "PmAWG7D12Yb",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("300"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wOO4LA0P0L2",
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
          dsde: "X2OidAuwRHQ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("303"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "kFwFKQoZ4z6",
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
          dsde: "qvD5pvE6rpx",
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
          dsde: "GfchDTr6dnL",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("308"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RnYk8wVmYhm",
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
          dsde: "PM92fP7rFM6",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("312"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "f4SZ3xvqQ0u",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("313"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "ohYFEt3imy2",
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
          dsde: "NZAYscgbpZK",
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
          dsde: "sHR1v4g6iOo",
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
          dsde: "LUh7ydIdPnJ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("321"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "yQJ5YxJdgzJ",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("322"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Pcw9Qojpi1g",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("323"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "jHLVbqCN0R5",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("324"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "APwRgpP3x9D",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("325"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "xNKoWL5w6ox",
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
          dsde: "eymocZeuy5O",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("GER001"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AFuziXJ8pb6",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("328"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "O2VPj71CNJo",
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
          dsde: "cdUfbMyWPUD",
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
          dsde: "MRWWuwUivBx",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("335"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "hTUu24OVkxb",
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
          dsde: "hXOXIdM5GEA",
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
          dsde: "EOoWxgJLBd6",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("340"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QHeo4vcFIBH",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("341"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "WABIF5aga9V",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("342"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "RNVfZ1h4P1z",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("343"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "G4ev9a3iPPB",
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
          dsde: "bLrDwLXv7dO",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("346"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "SKEVeCbZiSf",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("347"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "mJ30VKHexGn",
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
          dsde: "DqPt27NRGLE",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("350"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Xr6lj7P56xM",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("351"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "c6cn6N4NTRp",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("352"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bb9UkrgfkXr",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("353"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "EkW1hAZHcPk",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("354"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fIDZyzqN79p",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("355"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "JTc4jbCS3wJ",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("356"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "CREzRLqWjlC",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("357"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "DmuPeQPt9KW",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER126"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FYl8y68Nt7F",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER127"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "phKkwBKOTLZ",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER128"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "d9G5G59hnqP",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER129"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y7fOSwpHD3M",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("GER130"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "KdOoEgfBYId",
          cellProps: deStyle,
        },
      ],
      [
        { display: "text", text: t("358"), cellProps: labelStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "crFA8Am7iEk",
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
          dsde: "MB0yXITcTGk",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("361"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "owi6Hj2RZux",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("362"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "P2j4x0YdQk1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("363"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "PAAPHPtp0p1",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("364"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YEcWRFQHiyT",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("365"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "MWXdfJRKiFr",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("366"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wZiiFthXQDn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("367"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YjwKpsgPNfw",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("368"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "H530CBDuGzo",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("369"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "qXsALMwRjaf",
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
          dsde: "VkWYA6waJtn",
          cellProps: de2Style,
        },
      ],
      [
        { display: "text", text: t("372"), cellProps: label2Style },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "bUO5LZSqd7S",
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
          dsde: "eWIVOYjYgxw",
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
    <>
      {year >= 2017 && period.dhis2Period !== "2017S1" ? (
        <Box id="dlip6-v2-form-container" className="custom-form">
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
      ) : (
        <Typography fontWeight={700} fontSize="24px">
          ທ່ານບໍ່ສາມາດເລືອກຊ່ວງເວນີ້, ກະລຸນາເລືອກ ເລີ່ມແຕ່ ເດືອນ 7/2017 ຂື້ນໄປ{" "}
        </Typography>
      )}
    </>
  );
};

export default Dlip6V2;
