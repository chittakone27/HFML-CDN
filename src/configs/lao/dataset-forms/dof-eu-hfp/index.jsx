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
import "./dof-eu-hfb.css";
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

const DofEuHealthFinanceProvince = () => {
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
              "IQYi8zuYoQK-lmbxvugTvKr",
              "y5nxDjzz1r0-lmbxvugTvKr",
              "GvBscgxfSnV-lmbxvugTvKr",
              "BkglzFqmAGJ-lmbxvugTvKr",
              "k2sjAmuzNQD-lmbxvugTvKr",
              "igf1BcTQwDx-lmbxvugTvKr",
              "in2lsQopSfa-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "IQYi8zuYoQK-lmbxvugTvKr",
            "y5nxDjzz1r0-lmbxvugTvKr",
            "GvBscgxfSnV-lmbxvugTvKr",
            "BkglzFqmAGJ-lmbxvugTvKr",
            "k2sjAmuzNQD-lmbxvugTvKr",
            "igf1BcTQwDx-lmbxvugTvKr",
            "in2lsQopSfa-lmbxvugTvKr",
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
              "mFsUJR2Xlgs-lmbxvugTvKr",
              "LYTge4YbIl3-lmbxvugTvKr",
              "TkAki2mbrEx-lmbxvugTvKr",
              "Mw6j61236Cn-lmbxvugTvKr",
              "SCWFnxrBPi3-lmbxvugTvKr",
              "JRIajN1YLz6-lmbxvugTvKr",
              "jfbWjsSD7eS-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "mFsUJR2Xlgs-lmbxvugTvKr",
            "LYTge4YbIl3-lmbxvugTvKr",
            "TkAki2mbrEx-lmbxvugTvKr",
            "Mw6j61236Cn-lmbxvugTvKr",
            "SCWFnxrBPi3-lmbxvugTvKr",
            "JRIajN1YLz6-lmbxvugTvKr",
            "jfbWjsSD7eS-lmbxvugTvKr",
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
        dsde: "IQYi8zuYoQK",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mFsUJR2Xlgs",
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
        dsde: "y5nxDjzz1r0",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LYTge4YbIl3",
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
        dsde: "GvBscgxfSnV",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TkAki2mbrEx",
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
        dsde: "BkglzFqmAGJ",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Mw6j61236Cn",
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
        dsde: "k2sjAmuzNQD",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SCWFnxrBPi3",
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
            listData={["igf1BcTQwDx-lmbxvugTvKr", "in2lsQopSfa-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "igf1BcTQwDx-lmbxvugTvKr",
            "in2lsQopSfa-lmbxvugTvKr",
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
            listData={["JRIajN1YLz6-lmbxvugTvKr", "jfbWjsSD7eS-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "JRIajN1YLz6-lmbxvugTvKr",
            "jfbWjsSD7eS-lmbxvugTvKr",
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
        dsde: "igf1BcTQwDx",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JRIajN1YLz6",
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
        dsde: "in2lsQopSfa",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "jfbWjsSD7eS",
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
            listData={["Se0K1mwPyUR-lmbxvugTvKr", "Ja6AUehOvoT-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "Se0K1mwPyUR-lmbxvugTvKr",
            "Ja6AUehOvoT-lmbxvugTvKr",
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
            listData={["AN7KJmMHnKf-lmbxvugTvKr", "TizoRntDUBh-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "AN7KJmMHnKf-lmbxvugTvKr",
            "TizoRntDUBh-lmbxvugTvKr",
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
        dsde: "Se0K1mwPyUR",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AN7KJmMHnKf",
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
        dsde: "Ja6AUehOvoT",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TizoRntDUBh",
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
              "iLPrKLwV6g0-lmbxvugTvKr",
              "YsgyvpFLhU5-lmbxvugTvKr",
              "Rr0WCB8U5eS-lmbxvugTvKr",
              "axzsQSaJrEm-lmbxvugTvKr",
              "VRThsWXKyGS-lmbxvugTvKr",
              "HEkTtRlIa11-lmbxvugTvKr",
              "A8HBO4vCiym-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "iLPrKLwV6g0-lmbxvugTvKr",
            "YsgyvpFLhU5-lmbxvugTvKr",
            "Rr0WCB8U5eS-lmbxvugTvKr",
            "axzsQSaJrEm-lmbxvugTvKr",
            "VRThsWXKyGS-lmbxvugTvKr",
            "HEkTtRlIa11-lmbxvugTvKr",
            "A8HBO4vCiym-lmbxvugTvKr",
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
              "OPBwFx03L7I-lmbxvugTvKr",
              "JDiJfALwBch-lmbxvugTvKr",
              "EgN2MCyvtbI-lmbxvugTvKr",
              "bYCEibXR5i8-lmbxvugTvKr",
              "tapCX8Qx1Ph-lmbxvugTvKr",
              "cYnhqt5XlMa-lmbxvugTvKr",
              "q4CBZiwbeMT-lmbxvugTvKr",
            ]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "OPBwFx03L7I-lmbxvugTvKr",
            "JDiJfALwBch-lmbxvugTvKr",
            "EgN2MCyvtbI-lmbxvugTvKr",
            "bYCEibXR5i8-lmbxvugTvKr",
            "tapCX8Qx1Ph-lmbxvugTvKr",
            "cYnhqt5XlMa-lmbxvugTvKr",
            "q4CBZiwbeMT-lmbxvugTvKr",
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
        dsde: "iLPrKLwV6g0",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OPBwFx03L7I",
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
        dsde: "YsgyvpFLhU5",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "JDiJfALwBch",
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
        dsde: "Rr0WCB8U5eS",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "EgN2MCyvtbI",
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
        dsde: "axzsQSaJrEm",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "bYCEibXR5i8",
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
        dsde: "VRThsWXKyGS",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tapCX8Qx1Ph",
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
        dsde: "HEkTtRlIa11",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cYnhqt5XlMa",
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
        dsde: "A8HBO4vCiym",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "q4CBZiwbeMT",
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
            listData={["zozU72UbnOF-lmbxvugTvKr", "cxSmw0KVGcL-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "zozU72UbnOF-lmbxvugTvKr",
            "cxSmw0KVGcL-lmbxvugTvKr",
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
            listData={["cqFlMh8QlkV-lmbxvugTvKr", "Rtn09wbopVX-lmbxvugTvKr"]}
          />
        ),
        getText: (dataValues, orgUnit) => {
          const listData = [
            "cqFlMh8QlkV-lmbxvugTvKr",
            "Rtn09wbopVX-lmbxvugTvKr",
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
        dsde: "zozU72UbnOF",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "cqFlMh8QlkV",
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
        dsde: "cxSmw0KVGcL",
        cellProps: revenueStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Rtn09wbopVX",
        cellProps: expenditureStyle,
      },
    ],
  ];
  return (
    <Box id="dof-eu-hfb-form-container" className="custom-form">
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

export default DofEuHealthFinanceProvince;
