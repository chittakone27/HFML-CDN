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
import "./dof-eu-hf-yap.css";
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

const DofEuHealthFinanceYAB = () => {
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
              "JW3exUvW64q-lmbxvugTvKr",
              "Xtl17YL2m2J-lmbxvugTvKr",
              "Sz3SikwTXEc-lmbxvugTvKr",
              "HDVv4otbBbI-lmbxvugTvKr",
              "LaL122mEszC-lmbxvugTvKr",
              "GnAjBCj9dCD-lmbxvugTvKr",
              "u6h26BLfgPk-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "JW3exUvW64q-lmbxvugTvKr",
            "Xtl17YL2m2J-lmbxvugTvKr",
            "Sz3SikwTXEc-lmbxvugTvKr",
            "HDVv4otbBbI-lmbxvugTvKr",
            "LaL122mEszC-lmbxvugTvKr",
            "GnAjBCj9dCD-lmbxvugTvKr",
            "u6h26BLfgPk-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
      },
      {
        display: "text",
        text: t("government_expenditure_total"),
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "nPLr807bihy-lmbxvugTvKr",
              "AP7fJCbYh6l-lmbxvugTvKr",
              "adVoL0nvljh-lmbxvugTvKr",
              "ZoqgT22Qhi1-lmbxvugTvKr",
              "i4mty1b7rrn-lmbxvugTvKr",
              "pANqHjCHkB3-lmbxvugTvKr",
              "iLVAQoxQElW-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "nPLr807bihy-lmbxvugTvKr",
            "AP7fJCbYh6l-lmbxvugTvKr",
            "adVoL0nvljh-lmbxvugTvKr",
            "ZoqgT22Qhi1-lmbxvugTvKr",
            "i4mty1b7rrn-lmbxvugTvKr",
            "pANqHjCHkB3-lmbxvugTvKr",
            "iLVAQoxQElW-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
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
        dsde: "JW3exUvW64q",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "nPLr807bihy",
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
        dsde: "Xtl17YL2m2J",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AP7fJCbYh6l",
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
        dsde: "Sz3SikwTXEc",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "adVoL0nvljh",
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
        dsde: "HDVv4otbBbI",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZoqgT22Qhi1",
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
        dsde: "LaL122mEszC",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "i4mty1b7rrn",
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
            listData={["GnAjBCj9dCD-lmbxvugTvKr", "u6h26BLfgPk-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "GnAjBCj9dCD-lmbxvugTvKr",
            "u6h26BLfgPk-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
      },
      {
        display: "text",
        text: "",
        cellProps: revenueStyle,
        customCell: (
          <TotalCell
            listData={["pANqHjCHkB3-lmbxvugTvKr", "iLVAQoxQElW-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "pANqHjCHkB3-lmbxvugTvKr",
            "iLVAQoxQElW-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
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
        dsde: "GnAjBCj9dCD",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pANqHjCHkB3",
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
        dsde: "u6h26BLfgPk",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "iLVAQoxQElW",
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
            listData={["d3P38Wj35wv-lmbxvugTvKr", "s1rzeqy3oTH-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "d3P38Wj35wv-lmbxvugTvKr",
            "s1rzeqy3oTH-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={["htmvvnFSIpL-lmbxvugTvKr", "kAL1SZ4lqM8-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "htmvvnFSIpL-lmbxvugTvKr",
            "kAL1SZ4lqM8-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
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
        dsde: "d3P38Wj35wv",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "htmvvnFSIpL",
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
        dsde: "s1rzeqy3oTH",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kAL1SZ4lqM8",
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
              "S3Xgy99ntdH-lmbxvugTvKr",
              "ADyXyI3YiQH-lmbxvugTvKr",
              "EG5WIpJhzgM-lmbxvugTvKr",
              "khsvvDuCGlS-lmbxvugTvKr",
              "qx8GD9W9BkW-lmbxvugTvKr",
              "uBdy8CLgocn-lmbxvugTvKr",
              "l5kgEMLcSfs-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "S3Xgy99ntdH-lmbxvugTvKr",
            "ADyXyI3YiQH-lmbxvugTvKr",
            "EG5WIpJhzgM-lmbxvugTvKr",
            "khsvvDuCGlS-lmbxvugTvKr",
            "qx8GD9W9BkW-lmbxvugTvKr",
            "uBdy8CLgocn-lmbxvugTvKr",
            "l5kgEMLcSfs-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={[
              "D91OW3PjAff-lmbxvugTvKr",
              "n9TTr3YqBjV-lmbxvugTvKr",
              "c8jinKWMy3H-lmbxvugTvKr",
              "ej5gxilLRjP-lmbxvugTvKr",
              "I0OIT8FbOKB-lmbxvugTvKr",
              "o2bu9VSk0QP-lmbxvugTvKr",
              "LW4mAo9K3ze-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "D91OW3PjAff-lmbxvugTvKr",
            "n9TTr3YqBjV-lmbxvugTvKr",
            "c8jinKWMy3H-lmbxvugTvKr",
            "ej5gxilLRjP-lmbxvugTvKr",
            "I0OIT8FbOKB-lmbxvugTvKr",
            "o2bu9VSk0QP-lmbxvugTvKr",
            "LW4mAo9K3ze-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
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
        dsde: "S3Xgy99ntdH",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "D91OW3PjAff",
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
        dsde: "ADyXyI3YiQH",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "n9TTr3YqBjV",
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
        dsde: "EG5WIpJhzgM",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c8jinKWMy3H",
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
        dsde: "khsvvDuCGlS",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ej5gxilLRjP",
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
        dsde: "qx8GD9W9BkW",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "I0OIT8FbOKB",
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
        dsde: "uBdy8CLgocn",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "o2bu9VSk0QP",
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
        dsde: "l5kgEMLcSfs",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LW4mAo9K3ze",
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
            listData={["yuUeNqUw05G-lmbxvugTvKr", "XcXyfsAN2v8-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "yuUeNqUw05G-lmbxvugTvKr",
            "XcXyfsAN2v8-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
      },
      {
        display: "text",
        text: "",
        cellProps: typeStyle,
        customCell: (
          <TotalCell
            listData={["c46ZM1oX3y4-lmbxvugTvKr", "jzDqVH7fb4R-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "c46ZM1oX3y4-lmbxvugTvKr",
            "jzDqVH7fb4R-lmbxvugTvKr",
          ];

          return listData.reduce(
            (prev, curr) =>
              prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
            0
          );
        },
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
        dsde: "yuUeNqUw05G",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "c46ZM1oX3y4",
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
        dsde: "XcXyfsAN2v8",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jzDqVH7fb4R",
        cellProps: expenditureStyle,
      },
    ],
  ];
  return (
    <Box id="dof-eu-hf-yap-form-container" className="custom-form">
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

export default DofEuHealthFinanceYAB;
