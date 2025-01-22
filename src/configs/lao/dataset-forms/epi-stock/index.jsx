import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./epi-stock.css";
import { useEffect, useState } from "react";
import { pull } from "@/utils/fetch";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";

const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const numberStyle = {
  style: {
    backgroundColor: "#9CC8F5",
    textAlign: "center",
    fontWeight: "bold",
    width: "50px",
  },
};
const labelStyle = {
  style: {
    backgroundColor: "#C2DDF8",
    textAlign: "center",
    fontWeight: "bold",
    padding: "15px",
    width: "250px",
    border: "1px solid #c6cbcbcbc6c6",
  },
};
const label2Style = {
  style: {
    backgroundColor: "#C2DDF8",
    textAlign: "center",
    fontWeight: "bold",
    padding: "15px",
    width: "600px",
    border: "1px solid #bcbcbc",
  },
};
const label3Style = {
  style: {
    backgroundColor: "#C2DDF8",
    textAlign: "center",
    fontWeight: "bold",
    padding: "15px",
    width: "80px",
    border: "1px solid #bcbcbc",
  },
};
const valueStyle = {
  style: {
    width: "150px",
    backgroundColor: "#E6F2FC",
    paddingInline: "40px",
    border: "1px solid #bcbcbc",
  },
};
const primaryTextStyle = {
  style: {
    textAlign: "center",
    backgroundColor: "#20469B",
    fontWeight: "bold",
    color: "#fff",
    border: "1px solid #bcbcbc",
  },
};
const primaryText2Style = {
  style: {
    backgroundColor: "#20469B",
    fontWeight: "bold",
    color: "#fff",
    padding: "10px",
    border: "1px solid #bcbcbc",
  },
};
const secondaryTextStyle = {
  style: {
    backgroundColor: "#3063BA",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #bcbcbc",
  },
};

const EpiStock = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);
  const { dataElements } = useMetadataStore(
    (state) => ({
      dataElements: state.dataElements,
    }),
    shallow
  );
  const dataValueLabel = (dsde) => {
    const foundDe = dataElements.find((de) => de.id === dsde);
    return foundDe.displayFormName.split("(")[0].trim();
  };
  useEffect(() => {
    const getOptionSet = async () => {
      try {
        const optionsAPI = await pull(
          `/api/optionSets/fyyMCwlYD2a.json?fields=options[code,displayFormName]`
        );
        setOptions(optionsAPI.options);
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    };
    getOptionSet();
  }, []);

  const dataElementConfigs = [
    [
      {
        display: "text",
        text: t("no_"),
        cellProps: { ...primaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("vaccinName_"),
        cellProps: secondaryTextStyle,
      },
      {
        display: "text",
        text: t("balLastM_"),
        cellProps: secondaryTextStyle,
      },
      {
        display: "text",
        text: t("received_"),
        cellProps: secondaryTextStyle,
      },
      {
        display: "text",
        text: t("wastage_"),
        cellProps: secondaryTextStyle,
      },
      {
        display: "text",
        text: t("balance_"),
        cellProps: secondaryTextStyle,
      },
      {
        display: "text",
        text: t("expiareD_"),
        cellProps: secondaryTextStyle,
      },
    ],
    [
      { display: "text", text: "A", cellProps: secondaryTextStyle },
      { display: "text", text: "B", cellProps: secondaryTextStyle },
      { display: "text", text: "C", cellProps: secondaryTextStyle },
      { display: "text", text: "D", cellProps: secondaryTextStyle },
      { display: "text", text: "E", cellProps: secondaryTextStyle },
      { display: "text", text: "F", cellProps: secondaryTextStyle },
    ],
    [
      {
        display: "text",
        text: "1",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("JCFCYanTd5j"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JCFCYanTd5j",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WTatURydTMj",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "N0XLMtjnaxl",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WTj5k89KEMc",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gUrQDGCfzlC",
        cellProps: valueStyle,
      },
    ],

    [
      {
        display: "text",
        text: "2",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("y4MOUp8NFDM"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "y4MOUp8NFDM",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "C9I4QJUpq38",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "L9FFRB4SnEH",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HSnk0GYY5HI",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BDz7qN1E1aZ",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "3",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("I0qOroSX6RF"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "I0qOroSX6RF",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iHGQv9kDHHH",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NeXXMekWggm",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QDqKa4dYHK6",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GeWN2KS8AoS",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "4",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("UDvXg3Auz6G"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "UDvXg3Auz6G",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BfNRpPykHww",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Df8mLh7ugzg",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kVAVzjRtuUb",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BtERfQ4msUu",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "5",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("MlLTwZg3Axx"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MlLTwZg3Axx",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IwTpO5E1aRO",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pzVdC6lvXwu",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ubVlMJcNjQN",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZPiLRWcLhrL",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "6",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("Q8bLkDli0Gm"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q8bLkDli0Gm",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KigDqtjCOtw",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pzE0zNPZJqv",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gYrXwvNsQUA",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wSqbG6lbsiq",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "7",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("OAW0Xc7OaWL"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OAW0Xc7OaWL",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XEa34Skm9g6",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CGUDS7LbCnS",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EN8p8VNIjT7",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CaJhcxxyjZL",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "8",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("Ci9HUjcPA7K"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Ci9HUjcPA7K",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EbSp0SjGKGZ",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WoZx90dicCd",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bvHiqdvBKlE",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aR7lNrWG4lQ",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "9",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("GGweARghmWe"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GGweARghmWe",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nPYakeDrhV3",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jpIn6rW9643",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BF1wxSdTJyo",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Sx45bnLJPhB",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "10",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("YnKjjjXwjw3"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "YnKjjjXwjw3",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Shc0fHGMvts",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qisN6hII06A",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KLIU5kdbuk8",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iXl5Ab3dFAG",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "11",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("XSqHOwY46MK"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XSqHOwY46MK",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fndMs31H7aX",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Cl76bhppSHE",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iU4QZPyCw8a",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wJwl77L8xhh",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "12",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("BcJHE2O85mV"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BcJHE2O85mV",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aO30GDpSowV",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "O2sdvINkJ6x",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oqu7ioV6fe6",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "V6kxEut5G3U",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "13",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("LGzNQsnK5RE"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LGzNQsnK5RE",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CV7ioSTqSq2",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CqWJbUYbKzw",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Vewfq0tZ97e",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "k41bZ4ySauC",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "14",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("gnYP9JJ48FM"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gnYP9JJ48FM",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "R2uezgvuLGY",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JMCeZWL1H3m",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "y1dtyCkTOwq",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VY37WlXRAHZ",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "15",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("JiKoDxzr2Wh"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JiKoDxzr2Wh",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "n2mzJLT5kZR",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Q8mL0D2c1oy",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "U9QFXBoBu7X",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JweRDi8ZGip",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "16",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("wHWPX8cigPv"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wHWPX8cigPv",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sPCGzTQTONs",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "aJK6nHVGET2",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TeYe1jGQLe8",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Z0E4a2A0k0J",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "17",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("EUC1AROn14Z"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EUC1AROn14Z",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TjdtNWqYDUN",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PGCLxtyLpsd",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "M13FLWjDUSZ",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JExy0unkEP7",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "18",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("hnFm6Kk98oB"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hnFm6Kk98oB",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vBb5iTwFJV2",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ugIN1PagtP8",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MOAeOwfzbXt",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TwNTYLrxsPP",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "19",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("yCHanPWny6v"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yCHanPWny6v",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GCfGCf4fBbS",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "wOi68Skt1zR",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QhC81QricFk",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "sFVbwEZH36G",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "20",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: dataValueLabel("qSGaaj8l02v"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qSGaaj8l02v",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WRogcMEli7e",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nncAXvYgwi4",
        cellProps: valueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "x0T42nNYoTx",
        cellProps: valueStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
  ];
  const dataElementTable2Configs = [
    [
      {
        display: "text",
        text: dataValueLabel("WjbwAEUbYKw"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WjbwAEUbYKw",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: dataValueLabel("t8hDb4EqJ0K"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "t8hDb4EqJ0K",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: dataValueLabel("LPGIdC7nzzW"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LPGIdC7nzzW",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: dataValueLabel("qYcxIcR67Fb"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qYcxIcR67Fb",
        cellProps: valueStyle,
      },
    ],
  ];
  const dataElementTable3Configs = [
    [
      {
        display: "text",
        text: t("if_broken"),
        cellProps: { ...primaryText2Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: t("frig_1"),
        cellProps: label3Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "QczXWNOyCS1",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("frig_2"),
        cellProps: label3Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VFei3g2Aeqq",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("frig_3"),
        cellProps: label3Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "I2ewF0WXAMC",
        cellProps: valueStyle,
      },
    ],
  ];
  const dataElementTable4Configs = [
    [
      {
        display: "text",
        text: t("name_contact"),
        cellProps: { ...primaryText2Style, colSpan: 2 },
      },
    ],
    [
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J0PneKW6BxU",
        cellProps: valueStyle,
      },
    ],
  ];

  return (
    <Box id="epi-stock-form-container" className="custom-form">
      <Table id="table1">
        <MapTable dataElementConfigs={dataElementConfigs} />
      </Table>

      <Box id="tableRow2">
        <Table id="table2">
          <MapTable dataElementConfigs={dataElementTable2Configs} />
        </Table>
        <Table id="table2">
          <MapTable dataElementConfigs={dataElementTable3Configs} />
        </Table>
        <Table id="table2">
          <MapTable dataElementConfigs={dataElementTable4Configs} />
        </Table>
      </Box>
    </Box>
  );
};

export default EpiStock;
