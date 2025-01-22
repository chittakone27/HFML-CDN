import { useEffect } from "react";
import { Box } from "@mui/material";

import "./tb-ptbe-by-genexpert-monthly-import.css";
import "../common/index.css";
import TbPtbeTable from "./components/TbPtbeTable";
import TotalCell from "../common/TotalCell";

const TbPtbeByGeneXpertMonthlyImport = () => {
  const newDataElementConfigs = dataElementConfigs.map((item) => {
    if (item.find((col) => col.dsde)) {
      const listData = item
        .filter((col) => col.dsde && col)
        .map((col) => `${col.dsde}-${col.coc}`);
      return [
        ...item.slice(0, item.length - 1),
        {
          ...item.slice(item.length - 1)[0],
          customCell: <TotalCell listData={listData} />,
        },
      ];
    }
    return item;
  });
  const newDataElementConfigs2 = dataElementConfigsS2.map((item) => {
    if (item.find((col) => col.dsde)) {
      const listData = item
        .filter((col) => col.dsde && col)
        .map((col) => `${col.dsde}-${col.coc}`);
      return [
        ...item.slice(0, 1),
        {
          ...item.slice(1, 2)[0],
          customCell: <TotalCell listData={listData} />,
        },
        ...item.slice(2),
      ];
    }
    return item;
  });
  useEffect(() => {
    const inputs = document.querySelectorAll(
      "#tb-ptbe-by-genexpert-monthly-import-form-container input"
    );
    if (inputs.length) {
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }, []);

  return (
    <Box
      id="tb-ptbe-by-genexpert-monthly-import-form-container"
      className="custom-form remove-border-left"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <TbPtbeTable
          minWidth={1600}
          headerTitle="&nbsp;"
          dataElementConfigs={newDataElementConfigs}
        />

        <TbPtbeTable
          headerTitle="ກວດດ້ວຍ GeneXpert"
          dataElementConfigs={newDataElementConfigs2}
          sx={{ width: 1200 }}
        />
      </Box>
    </Box>
  );
};

const headerStyle = {
  backgroundColor: "#3492ca",
  color: "#fff",
  width: "5%",
  textAlign: "center",
};

const headerStyle2 = {
  backgroundColor: "#03a9f4",
  color: "#fff",
  width: "5%",
  textAlign: "center",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const totalStyle = {
  backgroundColor: "#bdbdbd",
  textAlign: "center",
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "Screened by (TB Facility Unit Group)",
      cellProps: { rowSpan: 2 },
      style: { ...headerStyle, width: "12%" },
    },
    {
      display: "text",
      text: "TB",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "HIV",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "OPD/IPD",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Children Doctor",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Clinic/Private Hospital",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Local Health",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Jailed ",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Community group",
      cellProps: { colSpan: 6 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Closed Person",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "ACF",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Others",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
    {
      display: "text",
      text: "Total",
      cellProps: { rowSpan: 2 },
      style: headerStyle,
    },
  ],
  [
    {
      display: "text",
      text: "HPP",
      style: headerStyle,
    },
    {
      display: "text",
      text: "PSI",
      style: headerStyle,
    },
    {
      display: "text",
      text: "PEDA",
      style: headerStyle,
    },
    {
      display: "text",
      text: "LaoPHA",
      style: headerStyle,
    },
    {
      display: "text",
      text: "Laoyouth",
      style: headerStyle,
    },
    {
      display: "text",
      text: "VHV",
      style: headerStyle,
    },
  ],
  [
    {
      display: "text",
      text: "TB Presumptive by laboratory",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "O9BTmjhggwk" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "O9BTmjhggwk" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "TB Presumptive tested by GeneXpert by laboratory",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "Hqraj0OmfHw" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "Hqraj0OmfHw" },
    { display: "text", text: "0", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "TB GeneXpert Positive by laboratory",
      style: disableStyle,
    },
    { cc: "WiAFXrXhzno", coc: "srmvl44ELKL", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "QOSOHuRCGAf", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "iRLpzFSIhan", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "P3rRvLVSh1p", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "cncWTcouJHy", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "rPxqIZdvH7I", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "hSzNI9krTJM", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "hVGm58EFKmy", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "Ki7ZmQYQVfi", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "uuylW84OwvP", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "tfFImjkphvc", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "gcpampLY3BP", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "B8cLvyj5ZOb", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "vXNYN0N8Swx", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "ViKcp6fXevh", dsde: "a073Znqpq9o" },
    { cc: "WiAFXrXhzno", coc: "mFjckULrbYa", dsde: "a073Znqpq9o" },
    { display: "text", text: "0", style: totalStyle },
  ],
];

const dataElementConfigsS2 = [
  [
    {
      display: "text",
      text: "ກໍລະນີສົງໄສ",
      cellProps: { rowSpan: 2 },
      style: { ...headerStyle2, width: "12%" },
    },
    {
      display: "text",
      text: "ລວມກໍລະນີ ທີ່ໄດ້ກວດທັງຫມົດ",
      cellProps: { rowSpan: 2 },
      style: { ...headerStyle2, width: "10%" },
    },
    {
      display: "text",
      text: "Tested results",
      cellProps: { colSpan: 6 },
      style: headerStyle2,
    },
  ],
  [
    {
      display: "text",
      text: "T",
      style: headerStyle2,
    },
    {
      display: "text",
      text: "RR",
      style: headerStyle2,
    },
    {
      display: "text",
      text: "TI",
      style: headerStyle2,
    },
    {
      display: "text",
      text: "TT",
      style: headerStyle2,
    },
    {
      display: "text",
      text: "N",
      style: headerStyle2,
    },
    {
      display: "text",
      text: "I",
      style: headerStyle2,
    },
  ],
  [
    {
      display: "text",
      text: "TB Presumptive by GeneXpert",
      style: disableStyle,
    },
    {
      display: "text",
      text: "0",
      style: totalStyle,
    },
    { cc: "WiAFXrXhzno", coc: "eCIZb34KI9i", dsde: "mXYcr3mHxyN" },
    { cc: "WiAFXrXhzno", coc: "zchVl22y90l", dsde: "mXYcr3mHxyN" },
    { cc: "WiAFXrXhzno", coc: "CpeJurlAxQU", dsde: "mXYcr3mHxyN" },
    { cc: "WiAFXrXhzno", coc: "GCh8Kw5Zklo", dsde: "mXYcr3mHxyN" },
    { cc: "WiAFXrXhzno", coc: "z5i7IcMj0uq", dsde: "mXYcr3mHxyN" },
    { cc: "WiAFXrXhzno", coc: "L1CfihPJjJa", dsde: "mXYcr3mHxyN" },
  ],
  [
    {
      display: "text",
      text: "TB MDR by GeneXpert",
      style: disableStyle,
    },
    {
      display: "text",
      text: "0",
      style: totalStyle,
    },
    { cc: "WiAFXrXhzno", coc: "eCIZb34KI9i", dsde: "fSofolK9xSk" },
    { cc: "WiAFXrXhzno", coc: "zchVl22y90l", dsde: "fSofolK9xSk" },
    { cc: "WiAFXrXhzno", coc: "CpeJurlAxQU", dsde: "fSofolK9xSk" },
    { cc: "WiAFXrXhzno", coc: "GCh8Kw5Zklo", dsde: "fSofolK9xSk" },
    { cc: "WiAFXrXhzno", coc: "z5i7IcMj0uq", dsde: "fSofolK9xSk" },
    { cc: "WiAFXrXhzno", coc: "L1CfihPJjJa", dsde: "fSofolK9xSk" },
  ],
];

export default TbPtbeByGeneXpertMonthlyImport;
