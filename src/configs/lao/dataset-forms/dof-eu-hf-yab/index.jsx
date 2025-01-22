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
import "./dof-eu-hf-yab.css";
import TotalCell from "../common/TotalCell";

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

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

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
              "EEIxgZqwSUD-lmbxvugTvKr",
              "gN3zj3ZAwIx-lmbxvugTvKr",
              "PIgv7Fes3sD-lmbxvugTvKr",
              "c2BeFrYoWQv-lmbxvugTvKr",
              "apdXM0tbHSd-lmbxvugTvKr",
              "CjqFbYuMU5X-lmbxvugTvKr",
              "hOFLPwiBewI-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "EEIxgZqwSUD-lmbxvugTvKr",
            "gN3zj3ZAwIx-lmbxvugTvKr",
            "PIgv7Fes3sD-lmbxvugTvKr",
            "c2BeFrYoWQv-lmbxvugTvKr",
            "apdXM0tbHSd-lmbxvugTvKr",
            "CjqFbYuMU5X-lmbxvugTvKr",
            "hOFLPwiBewI-lmbxvugTvKr",
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
              "tHp4thdxtKK-lmbxvugTvKr",
              "LboAQRaAr1e-lmbxvugTvKr",
              "NHIz0rm6Dky-lmbxvugTvKr",
              "vwiQOsHZ41P-lmbxvugTvKr",
              "V4uE92QopBi-lmbxvugTvKr",
              "Bki1TuRF2ir-lmbxvugTvKr",
              "NVN0IXSCcVK-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "tHp4thdxtKK-lmbxvugTvKr",
            "LboAQRaAr1e-lmbxvugTvKr",
            "NHIz0rm6Dky-lmbxvugTvKr",
            "vwiQOsHZ41P-lmbxvugTvKr",
            "V4uE92QopBi-lmbxvugTvKr",
            "Bki1TuRF2ir-lmbxvugTvKr",
            "NVN0IXSCcVK-lmbxvugTvKr",
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
        dsde: "EEIxgZqwSUD",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tHp4thdxtKK",
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
        dsde: "gN3zj3ZAwIx",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LboAQRaAr1e",
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
        dsde: "PIgv7Fes3sD",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NHIz0rm6Dky",
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
        dsde: "c2BeFrYoWQv",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "vwiQOsHZ41P",
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
        dsde: "apdXM0tbHSd",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "V4uE92QopBi",
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
            listData={["CjqFbYuMU5X-lmbxvugTvKr", "hOFLPwiBewI-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "CjqFbYuMU5X-lmbxvugTvKr",
            "hOFLPwiBewI-lmbxvugTvKr",
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
            listData={["Bki1TuRF2ir-lmbxvugTvKr", "NVN0IXSCcVK-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "Bki1TuRF2ir-lmbxvugTvKr",
            "NVN0IXSCcVK-lmbxvugTvKr",
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
        dsde: "CjqFbYuMU5X",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Bki1TuRF2ir",
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
        dsde: "hOFLPwiBewI",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "NVN0IXSCcVK",
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
            listData={["gJivntxYS8n-lmbxvugTvKr", "lh0tEYe7W8Z-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "gJivntxYS8n-lmbxvugTvKr",
            "lh0tEYe7W8Z-lmbxvugTvKr",
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
            listData={["tQ7WTxznkX7-lmbxvugTvKr", "OPVFGyjDhBp-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "tQ7WTxznkX7-lmbxvugTvKr",
            "OPVFGyjDhBp-lmbxvugTvKr",
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
        dsde: "gJivntxYS8n",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tQ7WTxznkX7",
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
        dsde: "lh0tEYe7W8Z",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OPVFGyjDhBp",
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
              "Q6pupQgfx8K-lmbxvugTvKr",
              "w92fvIivj3q-lmbxvugTvKr",
              "Q3tQRZi8rUi-lmbxvugTvKr",
              "Ra9KvREMGLC-lmbxvugTvKr",
              "aXGjdPLflC6-lmbxvugTvKr",
              "gCXZ9bicmiz-lmbxvugTvKr",
              "IIAol1nTuUV-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "Q6pupQgfx8K-lmbxvugTvKr",
            "w92fvIivj3q-lmbxvugTvKr",
            "Q3tQRZi8rUi-lmbxvugTvKr",
            "Ra9KvREMGLC-lmbxvugTvKr",
            "aXGjdPLflC6-lmbxvugTvKr",
            "gCXZ9bicmiz-lmbxvugTvKr",
            "IIAol1nTuUV-lmbxvugTvKr",
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
              "xAL03bxLcam-lmbxvugTvKr",
              "uKUDsVjQa4p-lmbxvugTvKr",
              "zqG6cSdxDob-lmbxvugTvKr",
              "CwaXyrMX0nW-lmbxvugTvKr",
              "rvVFy3M3Bg4-lmbxvugTvKr",
              "qa7iiNj0j6T-lmbxvugTvKr",
              "J0otLGS9eX2-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "xAL03bxLcam-lmbxvugTvKr",
            "uKUDsVjQa4p-lmbxvugTvKr",
            "zqG6cSdxDob-lmbxvugTvKr",
            "CwaXyrMX0nW-lmbxvugTvKr",
            "rvVFy3M3Bg4-lmbxvugTvKr",
            "qa7iiNj0j6T-lmbxvugTvKr",
            "J0otLGS9eX2-lmbxvugTvKr",
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
        dsde: "Q6pupQgfx8K",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "xAL03bxLcam",
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
        dsde: "w92fvIivj3q",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "uKUDsVjQa4p",
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
        dsde: "Q3tQRZi8rUi",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "zqG6cSdxDob",
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
        dsde: "Ra9KvREMGLC",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "CwaXyrMX0nW",
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
        dsde: "aXGjdPLflC6",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "rvVFy3M3Bg4",
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
        dsde: "gCXZ9bicmiz",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "qa7iiNj0j6T",
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
        dsde: "IIAol1nTuUV",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "J0otLGS9eX2",
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
            listData={["H8JBwcWSfYS-lmbxvugTvKr", "zhLxK2fhWVq-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "H8JBwcWSfYS-lmbxvugTvKr",
            "zhLxK2fhWVq-lmbxvugTvKr",
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
            listData={["HOfp9Q5cyTQ-lmbxvugTvKr", "jnEXeCyCprH-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "HOfp9Q5cyTQ-lmbxvugTvKr",
            "jnEXeCyCprH-lmbxvugTvKr",
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
        dsde: "H8JBwcWSfYS",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "HOfp9Q5cyTQ",
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
        dsde: "zhLxK2fhWVq",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jnEXeCyCprH",
        cellProps: expenditureStyle,
      },
    ],
  ];
  return (
    <Box id="dof-eu-hf-yab-form-container" className="custom-form">
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
