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
import "./dof-eu-hf.css";
import TotalCell from "../common/TotalCell";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

const typeStyle = {
  style: {
    backgroundColor: "#0277BD",
    color: "#fff",
  },
};
const numberStyle = {
  style: {
    backgroundColor: "#4FC3F7",
    color: "#000",
    padding: "15px",
  },
};
const labelStyle = {
  style: {
    backgroundColor: "#4FC3F7",
    color: "#000",
    padding: "15px",
    textAlign: "left",
  },
};
const revenueStyle = {
  style: {
    backgroundColor: "#94D2F6",
    width: "250px",
    padding: "5px 30px !important",
  },
};
const expenditureStyle = {
  style: {
    backgroundColor: "#BDE4F9",
    width: "250px",
    padding: "5px 30px !important",
  },
};

const DofEuHealthFinance = () => {
  const { t } = useTranslation();

  const dataElementConfigs = [
    [
      {
        display: "text",
        text: "I",
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Total_Government_Budget"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("government_revenue_total"),
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "qV0IaVCLMps-lmbxvugTvKr",
              "ObDrD2lMRDp-lmbxvugTvKr",
              "psc5nQ34ZY4-lmbxvugTvKr",
              "rYCPabyq9kh-lmbxvugTvKr",
              "Qmyt0NOuhjf-lmbxvugTvKr",
              "ws9QojpVHqh-lmbxvugTvKr",
              "yfkQrPZ3PF5-lmbxvugTvKr",
            ]}
          />
        ),
      },
      {
        display: "text",
        text: t("government_expenditure_total"),
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "tL04GVagsmQ-lmbxvugTvKr",
              "iG0zqRSRhAy-lmbxvugTvKr",
              "xGxjQCAq8Gs-lmbxvugTvKr",
              "Oe5LtiGiOAA-lmbxvugTvKr",
              "IkBlofVT6JG-lmbxvugTvKr",
              "FVlIDHadI6j-lmbxvugTvKr",
              "WF6tKVtvipM-lmbxvugTvKr",
            ]}
          />
        ),
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
        text: t("Salary_Employee_Allowance"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qV0IaVCLMps",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tL04GVagsmQ",
        cellProps: expenditureStyle,
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
        text: t("Compensation_allowance"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ObDrD2lMRDp",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iG0zqRSRhAy",
        cellProps: expenditureStyle,
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
        text: t("Operating_expenditure"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "psc5nQ34ZY4",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xGxjQCAq8Gs",
        cellProps: expenditureStyle,
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
        text: t("Knowledge_upgrading_promotion_costs"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rYCPabyq9kh",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Oe5LtiGiOAA",
        cellProps: expenditureStyle,
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
        text: t("Fixed_assets_serving_administration_mechanism"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Qmyt0NOuhjf",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IkBlofVT6JG",
        cellProps: expenditureStyle,
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
        text: t("Investment_Budget"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: revenueStyle,
        customCell: (
          <TotalCell
            listData={["ws9QojpVHqh-lmbxvugTvKr", "yfkQrPZ3PF5-lmbxvugTvKr"]}
          />
        ),
      },
      {
        display: "text",
        text: "",
        cellProps: revenueStyle,
        customCell: (
          <TotalCell
            listData={["FVlIDHadI6j-lmbxvugTvKr", "WF6tKVtvipM-lmbxvugTvKr"]}
          />
        ),
      },
    ],
    [
      {
        display: "text",
        text: "#",
        cellProps: { ...numberStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("Government_Budget"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ws9QojpVHqh",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FVlIDHadI6j",
        cellProps: expenditureStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Nam_Theun_2"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "yfkQrPZ3PF5",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "WF6tKVtvipM",
        cellProps: expenditureStyle,
      },
    ],
    [
      {
        display: "text",
        text: "II",
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Total_Technical_Budget"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={["RqMJ1qRgWTf-lmbxvugTvKr", "N5TstbqUAM0-lmbxvugTvKr"]}
          />
        ),
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={["xrBcVoNTY2q-lmbxvugTvKr", "tjRyObB6sba-lmbxvugTvKr"]}
          />
        ),
      },
    ],
    [
      {
        display: "text",
        text: "1",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: t("Technical_Revenue"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RqMJ1qRgWTf",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xrBcVoNTY2q",
        cellProps: expenditureStyle,
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
        text: t("Drug_Revolving_Fund"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "N5TstbqUAM0",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tjRyObB6sba",
        cellProps: expenditureStyle,
      },
    ],
    [
      {
        display: "text",
        text: "III",
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Total_Health_Insurance_Budget"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "oDLB75pb6Wr-lmbxvugTvKr",
              "fpWxe7ml29A-lmbxvugTvKr",
              "m1fsf2YTN4Q-lmbxvugTvKr",
              "fJo8IfZaenc-lmbxvugTvKr",
              "HSq99RRkTMJ-lmbxvugTvKr",
              "k4SVoRFDre4-lmbxvugTvKr",
              "jNUudWKryON-lmbxvugTvKr",
            ]}
          />
        ),
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "j1BOJZ7l1Bj-lmbxvugTvKr",
              "oQecTEAOQpj-lmbxvugTvKr",
              "ko9ayapXlm5-lmbxvugTvKr",
              "BvixHxEMEPn-lmbxvugTvKr",
              "FHftPKI9hqX-lmbxvugTvKr",
              "JH5i2JfqrPT-lmbxvugTvKr",
              "jem0SxgxF9B-lmbxvugTvKr",
            ]}
          />
        ),
      },
    ],
    [
      {
        display: "text",
        text: "1",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: t("SASS"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oDLB75pb6Wr",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "j1BOJZ7l1Bj",
        cellProps: expenditureStyle,
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
        text: t("SSO"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fpWxe7ml29A",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oQecTEAOQpj",
        cellProps: expenditureStyle,
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
        text: t("CBHI"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "m1fsf2YTN4Q",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ko9ayapXlm5",
        cellProps: expenditureStyle,
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
        text: t("HEF"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fJo8IfZaenc",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BvixHxEMEPn",
        cellProps: expenditureStyle,
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
        text: t("Free_mother_health"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HSq99RRkTMJ",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "FHftPKI9hqX",
        cellProps: expenditureStyle,
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
        text: t("Free_child_under_5"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "k4SVoRFDre4",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JH5i2JfqrPT",
        cellProps: expenditureStyle,
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
        text: "ກອງທຶນປະກັນສຸຂະພາບປະຊາຊົນ (ກປຊ)",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jNUudWKryON",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jem0SxgxF9B",
        cellProps: expenditureStyle,
      },
    ],
    [
      {
        display: "text",
        text: "IV",
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: t("Total_ODA"),
        cellProps: typeStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={["vEfnTYUG44u-lmbxvugTvKr", "IIacnOblJbG-lmbxvugTvKr"]}
          />
        ),
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,

        customCell: (
          <TotalCell
            listData={["e6ybck8bat5-lmbxvugTvKr", "gVdwRq1sMCJ-lmbxvugTvKr"]}
          />
        ),
      },
    ],
    [
      {
        display: "text",
        text: "1",
        cellProps: numberStyle,
      },
      {
        display: "text",
        text: t("Grand_Total"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vEfnTYUG44u",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "e6ybck8bat5",
        cellProps: expenditureStyle,
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
        text: t("Loan"),
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IIacnOblJbG",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gVdwRq1sMCJ",
        cellProps: expenditureStyle,
      },
    ],
  ];
  return (
    <Box id="dof-eu-hf-form-container" className="custom-form">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>No</HeaderCell>
            <HeaderCell>{t("Chapter_Name")}</HeaderCell>
            <HeaderCell>{t("Revenue")}</HeaderCell>
            <HeaderCell>{t("Expenditure")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default DofEuHealthFinance;
