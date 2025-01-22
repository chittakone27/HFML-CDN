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
import "./wb-dli-nut.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#0D47A1",
  color: "#fff",
  fontWeight: "bold",
}));

const WbDliNut = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="wb-dli-nut-form-container"
      className="custom-form remove-border-left"
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("no")}</HeaderCell>
            <HeaderCell>{t("commodityList")}</HeaderCell>
            <HeaderCell>{t("headerUnit")}</HeaderCell>
            <HeaderCell>{t("stockFromBeginningOfTheYear")}</HeaderCell>
            <HeaderCell>{t("requirementStockFor2Quarters_target")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const sectionLabelStyle = {
  backgroundColor: "#1565C0",
  color: "#fff",
};
const numColStyle = {
  backgroundColor: "#64b5f6",
  color: "#000",
};
const commodityListColStyle = {
  backgroundColor: "#90caf9",
  color: "#000",
};
const unitColStyle = {
  backgroundColor: "#bbdefb",
  color: "#000",
};
const deColStyle = {
  backgroundColor: "#e3f2fd",
};

const dataElementConfigs = [
  //I
  [
    {
      display: "text",
      text: "commodityForMchNutrition",
      style: sectionLabelStyle,
      cellProps: { colSpan: 5 },
    },
  ],
  [
    { display: "text", text: "1", style: numColStyle },
    {
      display: "text",
      text: "VTMA 100,000 IU < 1 Y",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GmiwAsYbv8i",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ACYeVVVkTHC",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "2", style: numColStyle },
    {
      display: "text",
      text: "VTMA 200,000 IU < 5 Y",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bhz5KjdG3Pb",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "erC41uC01g9",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "3", style: numColStyle },
    {
      display: "text",
      text: "Mebendazloe 500 mg",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xAVGhMdTvmQ",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lLUHE2uxLfI",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "4", style: numColStyle },
    {
      display: "text",
      text: "Iron Folic Acid 200mg/ Week/tablet",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KUfLBNfRVMZ",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XE82yiLPZVB",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "5", style: numColStyle },
    {
      display: "text",
      text: "Iron Folic Acid 30-60mg/Day/tablet",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ljla9zGev7q",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mJaCscimUW8",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "6", style: numColStyle },
    {
      display: "text",
      text: "Zinc Sulfate 20mg",
      style: commodityListColStyle,
    },
    { display: "text", text: "tablet", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "egDljDFTvxG",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "liTCmBmMTG2",
      style: deColStyle,
    },
  ],
  //II
  [
    {
      display: "text",
      text: "commodityForFamilyPlanning",
      style: sectionLabelStyle,
      cellProps: { colSpan: 5 },
    },
  ],
  [
    { display: "text", text: "1", style: numColStyle },
    {
      display: "text",
      text: "Birth Control Mini Pills",
      style: commodityListColStyle,
    },
    { display: "text", text: "board", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "avm3frVBcS2",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "N6SkPaoLLMz",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "2", style: numColStyle },
    {
      display: "text",
      text: "Birth Control Combined Pills",
      style: commodityListColStyle,
    },
    { display: "text", text: "board", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FQqNp4r52WM",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "t3nx5ciMwHx",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "3", style: numColStyle },
    {
      display: "text",
      text: "Birth Control Injectable Contraceptive",
      style: commodityListColStyle,
    },
    { display: "text", text: "box", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "F5oNWtdJ7DH",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZlThNkgLCOB",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "4", style: numColStyle },
    {
      display: "text",
      text: "IUDs",
      style: commodityListColStyle,
    },
    { display: "text", text: "unit", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ObagvwLdfqN",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ingL7psy205",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "5", style: numColStyle },
    {
      display: "text",
      text: "Condom",
      style: commodityListColStyle,
    },
    { display: "text", text: "unit", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FVguNIdSZx9",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "m21WcmmtWJx",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "6", style: numColStyle },
    {
      display: "text",
      text: "Implant",
      style: commodityListColStyle,
    },
    { display: "text", text: "tube", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PLFoY1nj6CJ",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CcIbg9wjnl8",
      style: deColStyle,
    },
  ],
  [
    { display: "text", text: "7", style: numColStyle },
    {
      display: "text",
      text: "Syrince1cc",
      style: commodityListColStyle,
    },
    { display: "text", text: "unit", style: unitColStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YWlZQ2MwP4y",
      style: deColStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ru21jMnFj6p",
      style: deColStyle,
    },
  ],
];

export default WbDliNut;
