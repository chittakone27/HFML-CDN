import { Box, Table, TableBody, Typography } from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./mch-mnch-1415.css";

import { useTranslation } from "react-i18next";
import TotalCell from "../common/TotalCell";

const headerStyle = {
  style: {
    backgroundColor: "#99CCFF",
    color: "#000",
    paddingBlock: "20px",
    paddingLeft: "20px",
  },
};
const header1Style = {
  style: { backgroundColor: "#FFCC00", color: "#000", textAlign: "center" },
};
const header2Style = {
  style: { backgroundColor: "#99CC99", color: "#000", textAlign: "center" },
};
const header3Style = {
  style: { backgroundColor: "#B7704C", color: "#000", textAlign: "center" },
};
const header4Style = {
  style: { backgroundColor: "#EBC7DE", color: "#000", textAlign: "center" },
};
const subHeader1Style = {
  style: { backgroundColor: "#FFE066", color: "#000", textAlign: "center" },
};
const subHeader2Style = {
  style: { backgroundColor: "#B7DBB7", color: "#000", textAlign: "center" },
};
const subHeader3Style = {
  style: { backgroundColor: "#CC997F", color: "#000", textAlign: "center" },
};
const subHeader4Style = {
  style: { backgroundColor: "#EFD2E4", color: "#000", textAlign: "center" },
};
const emptyStyle = {
  style: { backgroundColor: "#ACB6A4" },
};
const labelStyle = {
  style: {
    backgroundColor: "#cae5ff",
    color: "#000",
    paddingLeft: "20px",
    minWidth: "250px",
  },
};
const value1Style = {
  style: {
    backgroundColor: "#ffea99",
    width: "125px",
    textAlign: "left",
    minWidth: "15%",
  },
};
const value2Style = {
  style: {
    backgroundColor: "#e0efe0",
    width: "125px",
    minWidth: "15%",
  },
};
const value3Style = {
  style: {
    textAlign: "center",
    backgroundColor: "#e0c1b2",
    width: "125px",
    minWidth: "15%",
  },
};
const value4Style = {
  style: {
    backgroundColor: "#EFD2E4",
    width: "125px",
    minWidth: "15%",
  },
};
const MchMnch1415 = () => {
  const { t } = useTranslation();

  const dataElementConfigsA = [
    [
      {
        display: "text",
        text: t("aANC"),
        cellProps: headerStyle,
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: header1Style,
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("total"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("firstANCVisitUnder19"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "MFfuL7meWJ5",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "MFfuL7meWJ5",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("firstANCVisitGreaterEqual19"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "BDCOp88aI91",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "BDCOp88aI91",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("fourthANCvisit"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "J5E8BkAoIWn",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "J5E8BkAoIWn",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("riskMother1StageHigherHos"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "CHFkUvXqZuV",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "CHFkUvXqZuV",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("riskMother2StageHigherHos"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "St3S4FCzicG",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "St3S4FCzicG",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenTd1"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "tZH5BmEHUun",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "tZH5BmEHUun",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenTd2"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "pXfELMu5ihJ",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "pXfELMu5ihJ",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenTdComplete"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "tZy4uW84fqG",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "tZy4uW84fqG",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenReceiveIFA90"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "Q3SDvb99gUE",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "Q3SDvb99gUE",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenANCvisitHIVCounsel"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WRYGPGnbcyE",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenANCvisitHIVTest"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "q5ZMwieGJ1N",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pregnantWomenANCvisitHIVPos"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RYnLUPvo278",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("delivery"),
        cellProps: headerStyle,
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: header1Style,
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("total"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("deliveryAtHealthFacility"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CyUEAFiwGTS",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("deliveryInOtherHF"),
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
        cellProps: value3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("deliveryHomeSBA"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "skWdJmVHpkM",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("deliveryHomeWithoutSBA"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Ryqym3k0Ufc",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("normalDelivery"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "amPLatG4bO9",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "amPLatG4bO9",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("medicalEquipDelivery"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "K7dF5mpEqyO",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("caesareanSection"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "di2GiKSQ3wV",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("delPreEclamsia"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fPLmoXgFDs7",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("pretermDelivery2236w"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "DLRD2Qoe6qP",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "DLRD2Qoe6qP",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("stillBirth"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PGaxoLVKaCz",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("liveBirth"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "XnsSXusE1ow",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "XnsSXusE1ow",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("newbornUnderWeight"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "jt385ilkaUd",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "jt385ilkaUd",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("motherBreastfeed1Hr"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "FBUvQe3qNgf",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "FBUvQe3qNgf",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("spontaneusAbortion"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "CVl2SqGtDNt",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "CVl2SqGtDNt",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("inducedAbortion"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "syylGWdLSOR",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("ectopicPregnancyRupture"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "eMtjlRvZ3pz",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("cpnc"),
        cellProps: headerStyle,
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: header1Style,
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("total"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("womenReceivePNC07day"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "fWhUngeGuvn",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "fWhUngeGuvn",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("womenReceivePNC842day"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "Rhz7ffr49yD",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "Rhz7ffr49yD",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("totalPNC"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "zbJoMbBRjLq",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "zbJoMbBRjLq",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("mortality"),
        cellProps: headerStyle,
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: header1Style,
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("total"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("maternalDeath"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "dJhWRKs0fcq",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "dJhWRKs0fcq",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("neoDeath07day"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "sISjKc2LEDg",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "sISjKc2LEDg",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("neoDeath828day"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "FSLrz90vXKf",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "FSLrz90vXKf",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("infantDeath111months"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "nCl4K1S3efY",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "nCl4K1S3efY",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("infantDeath"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "cPcvesqWRtH",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "cPcvesqWRtH",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("childDeath114y"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "kyVKK0JcRPJ",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "kyVKK0JcRPJ",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("under5Mortality"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "cwhEsbBe6Zs",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "cwhEsbBe6Zs",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
  ];

  const dataElementConfigsD = [
    [
      {
        display: "text",
        text: "",
        cellProps: { ...headerStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: { ...header1Style, colSpan: 3 },
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: { ...header2Style, colSpan: 3 },
      },
      {
        display: "text",
        text: t("cbdAndVHV"),
        cellProps: { ...header4Style, colSpan: 3 },
      },
      {
        display: "text",
        text: t("total"),
        cellProps: { ...header3Style, colSpan: 3 },
      },
    ],
    [
      {
        display: "text",
        text: t("oldUser"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("newUser"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("cbdAndVHV"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("oldUser"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("newUser"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("distributeWastage"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("oldUser"),
        cellProps: subHeader4Style,
      },
      {
        display: "text",
        text: t("newUser"),
        cellProps: subHeader4Style,
      },
      {
        display: "text",
        text: t("distributeWastage"),
        cellProps: subHeader4Style,
      },
      {
        display: "text",
        text: t("oldUser"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("newUser"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("distributeWastage"),
        cellProps: subHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveCondom"),
        cellProps: labelStyle,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "bM0YZOyAlMr",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "m2V4dUljQVq",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "jIp5LTCcNtK",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "bM0YZOyAlMr",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "m2V4dUljQVq",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "jIp5LTCcNtK",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "bM0YZOyAlMr",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "m2V4dUljQVq",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "jIp5LTCcNtK",
        cellProps: value4Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveSinglePill"),
        cellProps: labelStyle,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "bM0YZOyAlMr",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "whoq3P3gtyc",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "P5XJHbCeYjZ",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "bM0YZOyAlMr",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "whoq3P3gtyc",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "P5XJHbCeYjZ",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "bM0YZOyAlMr",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "whoq3P3gtyc",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "P5XJHbCeYjZ",
        cellProps: value4Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveMixPill"),
        cellProps: labelStyle,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "sa8Ep87YPNv",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "kUIvo5is72S",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "UwHbHit401I",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "sa8Ep87YPNv",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "kUIvo5is72S",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "UwHbHit401I",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "sa8Ep87YPNv",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "kUIvo5is72S",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "UwHbHit401I",
        cellProps: value4Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveDepose"),
        cellProps: labelStyle,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "bx2Imp5Yzuw",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "QFWbdLref5O",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "i7WPuiegoQn",
        dsde: "XSoNHLsSVCq",
        cellProps: value1Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "bx2Imp5Yzuw",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "QFWbdLref5O",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "ym41uKo2JHl",
        dsde: "XSoNHLsSVCq",
        cellProps: value2Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "bx2Imp5Yzuw",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "QFWbdLref5O",
        cellProps: value4Style,
      },
      {
        cc: "kinUqU9ASfo",
        coc: "W0ELtxvwjdA",
        dsde: "XSoNHLsSVCq",
        cellProps: value4Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveIUD"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OvagmN5kZYp",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mDRUz90yNBS",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GdS8rjeT5jm",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveImplant"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fxxCQH5j7cu",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kaE666RoSB0",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pFejMr8V1sj",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("CoupleReceiveIUD"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pMsIub38RRC",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yRcuPIKofP7",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BQiWHHRpTJk",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("femaleSterilization"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "el62zkAWxUc",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("maleSterilization"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Itl7pbKRCvw",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("1244FemaleReceivedIFA"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "CSWmDcfmDmv",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "AQyADRGOSBJ",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "zYWfyGpbOu6",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "CSWmDcfmDmv",
        cellProps: value2Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "AQyADRGOSBJ",
        cellProps: value2Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "zYWfyGpbOu6",
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
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
  ];

  const dataElementConfigsE_1 = [
    [
      {
        display: "text",
        text: "",
        cellProps: { ...headerStyle, rowSpan: 3 },
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: { ...header1Style, colSpan: 4 },
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: { ...header2Style, colSpan: 4 },
      },
      {
        display: "text",
        text: t("total"),
        cellProps: { ...header3Style, colSpan: 4 },
      },
    ],
    [
      {
        display: "text",
        text: t("under12Month"),
        cellProps: { ...subHeader1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: { ...subHeader1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("under12Month"),
        cellProps: { ...subHeader2Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: { ...subHeader2Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("under12Month"),
        cellProps: { ...subHeader3Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: { ...subHeader3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("male"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("female"),
        cellProps: subHeader3Style,
      },
    ],

    [
      {
        display: "text",
        text: t("BCG"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "HjDMApUQGcf",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "HjDMApUQGcf",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "HjDMApUQGcf",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "HjDMApUQGcf",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "HjDMApUQGcf",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "HjDMApUQGcf",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "HjDMApUQGcf",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "HjDMApUQGcf",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("BCG"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "yn1HlpkSXVO",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "yn1HlpkSXVO",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "yn1HlpkSXVO",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "yn1HlpkSXVO",
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
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      {
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
        text: t("HepB07day"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "ascmJUGBy90",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "ascmJUGBy90",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "ascmJUGBy90",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "ascmJUGBy90",
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
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      {
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
        text: t("DHH1"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "Kv5OWjtPdka",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "Kv5OWjtPdka",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "Kv5OWjtPdka",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "Kv5OWjtPdka",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "Kv5OWjtPdka",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "Kv5OWjtPdka",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "Kv5OWjtPdka",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "Kv5OWjtPdka",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("DHH2"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "Wwetscm6GjH",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "Wwetscm6GjH",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "Wwetscm6GjH",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "Wwetscm6GjH",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "Wwetscm6GjH",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "Wwetscm6GjH",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "Wwetscm6GjH",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "Wwetscm6GjH",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("DHH3"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "YCRUI2KHJ6S",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "YCRUI2KHJ6S",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "YCRUI2KHJ6S",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "YCRUI2KHJ6S",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "YCRUI2KHJ6S",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "YCRUI2KHJ6S",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "YCRUI2KHJ6S",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "YCRUI2KHJ6S",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("OPV1"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "Ryo3U9yy918",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "Ryo3U9yy918",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "Ryo3U9yy918",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "Ryo3U9yy918",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "Ryo3U9yy918",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "Ryo3U9yy918",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "Ryo3U9yy918",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "Ryo3U9yy918",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("OPV2"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "dnO73itfcFY",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "dnO73itfcFY",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "dnO73itfcFY",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "dnO73itfcFY",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "dnO73itfcFY",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "dnO73itfcFY",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "dnO73itfcFY",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "dnO73itfcFY",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("OPV3"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "WwD99ujZ6WT",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "WwD99ujZ6WT",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "WwD99ujZ6WT",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "WwD99ujZ6WT",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "WwD99ujZ6WT",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "WwD99ujZ6WT",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "WwD99ujZ6WT",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "WwD99ujZ6WT",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("IPV"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "MDN5DCyb13Z",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "MDN5DCyb13Z",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "MDN5DCyb13Z",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "MDN5DCyb13Z",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "MDN5DCyb13Z",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "MDN5DCyb13Z",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "MDN5DCyb13Z",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "MDN5DCyb13Z",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("PVC1"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "LEO8quyayBX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "LEO8quyayBX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "LEO8quyayBX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "LEO8quyayBX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "LEO8quyayBX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "LEO8quyayBX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "LEO8quyayBX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "LEO8quyayBX",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("PVC2"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "V4nVWHrNwHQ",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "V4nVWHrNwHQ",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "V4nVWHrNwHQ",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "V4nVWHrNwHQ",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "V4nVWHrNwHQ",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "V4nVWHrNwHQ",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "V4nVWHrNwHQ",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "V4nVWHrNwHQ",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("PVC3"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "GazgjZwryqh",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "GazgjZwryqh",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "GazgjZwryqh",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "GazgjZwryqh",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "GazgjZwryqh",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "GazgjZwryqh",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "GazgjZwryqh",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "GazgjZwryqh",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("MeasleRubella"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "pJ4m5F1BMFX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "pJ4m5F1BMFX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "pJ4m5F1BMFX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "pJ4m5F1BMFX",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "pJ4m5F1BMFX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "pJ4m5F1BMFX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "pJ4m5F1BMFX",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "pJ4m5F1BMFX",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("JE"),
        cellProps: labelStyle,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "JOdSKa74dOt",
        dsde: "VzFAhjUGPKy",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "w1Eoicl90Dw",
        dsde: "VzFAhjUGPKy",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "EkQQvjTZ7ud",
        dsde: "VzFAhjUGPKy",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "E5JiTJPiDG9",
        dsde: "VzFAhjUGPKy",
        cellProps: value1Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "uqCRDO2SwAo",
        dsde: "VzFAhjUGPKy",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RKOgdQGR7Ju",
        dsde: "VzFAhjUGPKy",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "TnWpDZgVtTT",
        dsde: "VzFAhjUGPKy",
        cellProps: value2Style,
      },
      {
        cc: "wOBm7iDjTm8",
        coc: "RYOsHtyIGkG",
        dsde: "VzFAhjUGPKy",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
  ];
  const dataElementConfigsE_2 = [
    [
      {
        display: "text",
        text: t("ReprosuctiveWomen"),
        cellProps: headerStyle,
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: header1Style,
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: header2Style,
      },
      {
        display: "text",
        text: t("total"),
        cellProps: header3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("firstHPV914y"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "FxuIOMfoaAt",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "FxuIOMfoaAt",
        cellProps: value2Style,
      },

      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("secondHPV914y"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "h9TuPNYziST",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "h9TuPNYziST",
        cellProps: value2Style,
      },

      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("womenReceiveTd1"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "GQTewVMURsX",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "GQTewVMURsX",
        cellProps: value2Style,
      },

      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("womenCompletedTd"),
        cellProps: labelStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "S9piUAv5iYA",
        cellProps: value1Style,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "S9piUAv5iYA",
        cellProps: value2Style,
      },

      { display: "text", text: "", cellProps: value3Style },
    ],
  ];
  const dataElementConfigsF = [
    [
      {
        display: "text",
        text: "",
        cellProps: { ...headerStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("healthFacility"),
        cellProps: { ...header1Style, colSpan: 2 },
      },
      {
        display: "text",
        text: t("outReach"),
        cellProps: { ...header2Style, colSpan: 2 },
      },

      {
        display: "text",
        text: t("total"),
        cellProps: { ...header3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: t("under12Month"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: subHeader1Style,
      },
      {
        display: "text",
        text: t("under12Month"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: subHeader2Style,
      },
      {
        display: "text",
        text: t("under12Month"),
        cellProps: subHeader3Style,
      },
      {
        display: "text",
        text: t("12to59month"),
        cellProps: subHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: t("ChildrenRecHelminthod"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "eFXrDqXA2WQ",
        dsde: "WT0nisMw0yl",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      {
        cc: "FU2zdnyL2tq",
        coc: "BaKsAyoQBud",
        dsde: "WT0nisMw0yl",
        cellProps: value2Style,
      },
      {
        display: "text",
        text: "",
        cellProps: emptyStyle,
      },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("ChildrenRecVitA"),
        cellProps: labelStyle,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "xp6YPoDKUe4",
        dsde: "JRxfNE2n8Ux",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "jD0Cf8zYYbV",
        dsde: "JRxfNE2n8Ux",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "TV90yPZi9iy",
        dsde: "JRxfNE2n8Ux",
        cellProps: value2Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "myQ7981H7vs",
        dsde: "JRxfNE2n8Ux",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("ChildrenGrowthMon"),
        cellProps: labelStyle,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "xp6YPoDKUe4",
        dsde: "LoRGj1dFh6X",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "jD0Cf8zYYbV",
        dsde: "LoRGj1dFh6X",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "TV90yPZi9iy",
        dsde: "LoRGj1dFh6X",
        cellProps: value2Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "myQ7981H7vs",
        dsde: "LoRGj1dFh6X",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("childrenMeasureMidUpperArm"),
        cellProps: labelStyle,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "xp6YPoDKUe4",
        dsde: "ANMIcle2zLx",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "jD0Cf8zYYbV",
        dsde: "ANMIcle2zLx",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "TV90yPZi9iy",
        dsde: "ANMIcle2zLx",
        cellProps: value2Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "myQ7981H7vs",
        dsde: "ANMIcle2zLx",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("childrenBelowStandardMeasureMidUpperArmRed"),
        cellProps: labelStyle,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "xp6YPoDKUe4",
        dsde: "CpObNMjrSLR",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "jD0Cf8zYYbV",
        dsde: "CpObNMjrSLR",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "TV90yPZi9iy",
        dsde: "CpObNMjrSLR",
        cellProps: value2Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "myQ7981H7vs",
        dsde: "CpObNMjrSLR",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
    [
      {
        display: "text",
        text: t("childrenBelowStandardMeasureMidUpperArmYellow"),
        cellProps: labelStyle,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "xp6YPoDKUe4",
        dsde: "sdWCKbL3IdD",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "jD0Cf8zYYbV",
        dsde: "sdWCKbL3IdD",
        cellProps: value1Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "TV90yPZi9iy",
        dsde: "sdWCKbL3IdD",
        cellProps: value2Style,
      },
      {
        cc: "ekxx48xH3oc",
        coc: "myQ7981H7vs",
        dsde: "sdWCKbL3IdD",
        cellProps: value2Style,
      },
      { display: "text", text: "", cellProps: value3Style },
      { display: "text", text: "", cellProps: value3Style },
    ],
  ];

  return (
    <Box id="mch-mnch-1415-form-container" className="custom-form">
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          backgroundColor: "#7198C8",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
        }}
      >
        {t("ancDeliveryPNCMortality")}
      </Typography>
      <Table style={{ margin: "10px" }}>
        <TableBody>
          <MapTable
            dataElementConfigs={(() => {
              const result = dataElementConfigsA.map((item) => {
                if (
                  JSON.stringify(item[0].cellProps) ===
                  JSON.stringify(headerStyle)
                ) {
                  return item;
                }
                return [
                  ...item.slice(0, item.length - 1),
                  {
                    ...item.slice(item.length - 1)[0],
                    getText: (dataValues, orgUnit) => {
                      const listData = item
                        .filter((col) => col.dsde && col)
                        .map((col) => `${col.dsde}-${col.coc}`);
                      return listData.reduce(
                        (prev, curr) =>
                          prev +
                          (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                        0
                      );
                    },
                    customCell: (
                      <TotalCell
                        listData={item
                          .filter((col) => col.dsde && col)
                          .map((col) => `${col.dsde}-${col.coc}`)}
                      />
                    ),
                  },
                ];
              });
              return result;
            })()}
          />
        </TableBody>
      </Table>

      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          backgroundColor: "#7198C8",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
        }}
      >
        {t("familyPlanning")}
      </Typography>
      <Table style={{ margin: "10px" }}>
        <TableBody>
          <MapTable
            dataElementConfigs={(() => {
              return dataElementConfigsD.map((item) => {
                if (item.find((col) => col.dsde)) {
                  return [
                    ...item.slice(0, item.length - 3),
                    ...item.slice(item.length - 3).map((col, index) => {
                      if (
                        JSON.stringify(col.cellProps) ===
                        JSON.stringify(emptyStyle)
                      ) {
                        return col;
                      }
                      switch (index) {
                        case 0:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [1, 4, 7]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[1, 4, 7]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 1:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [2, 5, 8]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[2, 5, 8]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 2:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [3, 6, 9]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[3, 6, 9]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        default:
                          break;
                      }
                    }),
                  ];
                }
                return item;
              });
            })()}
          />
        </TableBody>
      </Table>
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          backgroundColor: "#7198C8",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
        }}
      >
        {t("eEPI")}
      </Typography>
      <Table style={{ margin: "10px" }}>
        <TableBody>
          <MapTable
            dataElementConfigs={(() => {
              return dataElementConfigsE_1.map((item) => {
                if (item.find((col) => col.dsde)) {
                  return [
                    ...item.slice(0, item.length - 4),
                    ...item.slice(item.length - 4).map((col, index) => {
                      if (
                        JSON.stringify(col.cellProps) ===
                        JSON.stringify(emptyStyle)
                      ) {
                        return col;
                      }
                      switch (index) {
                        case 0:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [1, 5]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[1, 5]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 1:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [2, 6]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[2, 6]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 2:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [3, 7]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[3, 7]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 3:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [4, 8]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[4, 8]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        default:
                          break;
                      }
                    }),
                  ];
                }
                return item;
              });
            })()}
          />
        </TableBody>
      </Table>
      <Table style={{ margin: "10px" }}>
        <TableBody>
          <MapTable
            dataElementConfigs={(() => {
              const result = dataElementConfigsE_2.map((item) => {
                if (
                  JSON.stringify(item[0].cellProps) ===
                  JSON.stringify(headerStyle)
                ) {
                  return item;
                }
                return [
                  ...item.slice(0, item.length - 1),
                  {
                    ...item.slice(item.length - 1)[0],
                    getText: (dataValues, orgUnit) => {
                      const listData = item
                        .filter((col) => col.dsde && col)
                        .map((col) => `${col.dsde}-${col.coc}`);
                      return listData.reduce(
                        (prev, curr) =>
                          prev +
                          (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                        0
                      );
                    },
                    customCell: (
                      <TotalCell
                        listData={item
                          .filter((col) => col.dsde && col)
                          .map((col) => `${col.dsde}-${col.coc}`)}
                      />
                    ),
                  },
                ];
              });
              return result;
            })()}
          />
        </TableBody>
      </Table>

      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          backgroundColor: "#7198C8",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
        }}
      >
        {t("fnutrition")}
      </Typography>
      <Table style={{ margin: "10px" }}>
        <TableBody>
          <MapTable
            dataElementConfigs={(() => {
              return dataElementConfigsF.map((item) => {
                if (item.find((col) => col.dsde)) {
                  return [
                    ...item.slice(0, item.length - 2),
                    ...item.slice(item.length - 2).map((col, index) => {
                      if (
                        JSON.stringify(col.cellProps) ===
                        JSON.stringify(emptyStyle)
                      ) {
                        return col;
                      }
                      switch (index) {
                        case 0:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [1, 3]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[1, 3]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };
                        case 1:
                          return {
                            ...col,
                            getText: (dataValues, orgUnit) => {
                              const listData = [2, 4]
                                .map((colIndex) => {
                                  if (item[colIndex].display) {
                                    return null;
                                  }
                                  return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                })
                                .filter((data) => data);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                            customCell: (
                              <TotalCell
                                listData={[2, 4]
                                  .map((colIndex) => {
                                    if (item[colIndex].display) {
                                      return null;
                                    }
                                    return `${item[colIndex].dsde}-${item[colIndex].coc}`;
                                  })
                                  .filter((data) => data)}
                              />
                            ),
                          };

                        default:
                          break;
                      }
                    }),
                  ];
                }
                return item;
              });
            })()}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

export default MchMnch1415;
