import { Box, Table, TableBody } from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hpv-monthly-v2.css";
import TotalCell from "../common/TotalCell";

const HpvMonthlyV2 = () => {
  return (
    <Box
      id="hpv-monthly-form-container"
      className="custom-form remove-border-left"
    >
      <Table stickyHeader>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const addTotalConfigs = (deConfigs) => {
  const totals = deConfigs.reduce(
    (resultTotals, DEs) => {
      const filtered = DEs.filter((de) => de.dsde);
      if (!filtered.length) return resultTotals;
      if (filtered.length === 2) {
        resultTotals[2].push(`${filtered[0].dsde}-${filtered[0].coc}`);
        resultTotals[3].push(`${filtered[1].dsde}-${filtered[1].coc}`);
        return resultTotals;
      }

      resultTotals.forEach((total, idx) => {
        total.push(`${filtered[idx].dsde}-${filtered[idx].coc}`);
      });

      return resultTotals;
    },
    [[], [], [], []]
  );

  deConfigs[deConfigs.length - 1].forEach((de, idx) => {
    switch (idx) {
      case 2:
        de.customCell = <TotalCell listData={totals[0]} />;
        break;
      case 3:
        de.customCell = <TotalCell listData={totals[1]} />;
        break;
      case 5:
        de.customCell = <TotalCell listData={totals[2]} />;
        break;
      case 6:
        de.customCell = <TotalCell listData={totals[3]} />;
        break;
      default:
        break;
    }
  });

  return deConfigs;
};

const dataElementConfigs = addTotalConfigs([
  [
    {
      cellProps: {
        class: "title vaccin",
        rowSpan: "2",
      },
      display: "text",
      text: "vaccinationSite",
    },
    {
      cellProps: {
        class: "title age",
        rowSpan: "2",
      },
      display: "text",
      text: "age",
    },
    {
      cellProps: {
        class: "title hpv1",
        colSpan: "2",
      },
      display: "text",
      text: "HPV1",
    },
    {
      cellProps: {
        class: "title age",
        rowSpan: "2",
      },
      display: "text",
      text: "age",
    },
    {
      cellProps: {
        class: "title hpv2",
        colSpan: "2",
      },
      display: "text",
      text: "HPV2",
    },
  ],
  [
    {
      cellProps: {
        class: "title hpv1 sub1",
      },
      display: "text",
      text: "schoolGirls",
    },
    {
      cellProps: {
        class: "title hpv1 sub2",
      },
      display: "text",
      text: "outOfSchoolGirls",
    },
    {
      cellProps: {
        class: "title hpv2 sub1",
      },
      display: "text",
      text: "schoolGirls",
    },
    {
      cellProps: {
        class: "title hpv2 sub2",
      },
      display: "text",
      text: "outOfSchoolGirls",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title",
        rowSpan: "8",
      },
      display: "text",
      text: "school",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "o8SFeAuUdqE",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "QAYXg6o3AEa",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "o8SFeAuUdqE",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "QAYXg6o3AEa",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "bQMwVCFD7RI",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "HCH4PI2ZK5H",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "bQMwVCFD7RI",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "HCH4PI2ZK5H",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "DRUevfUOtzf",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "buT5931rCRZ",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "DRUevfUOtzf",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "buT5931rCRZ",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "pDviRORNCzE",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "bfi10ZXYZlB",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "pDviRORNCzE",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "bfi10ZXYZlB",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "Ta4CTqU627c",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "G9hO3sma7FD",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "Ta4CTqU627c",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "G9hO3sma7FD",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "dWY7RRGZ8kh",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "jEUVmOyFKsi",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "dWY7RRGZ8kh",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "jEUVmOyFKsi",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "RdbDmNm1hbC",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "aDms9tX4kva",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "RdbDmNm1hbC",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "aDms9tX4kva",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "under17year",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "Lbp62ca9g1c",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "KTpp0EAxgVV",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title",
        rowSpan: "8",
      },
      display: "text",
      text: "healthCentre",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "E7x187QRJcy",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "zTbbf6D61zP",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "E7x187QRJcy",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "zTbbf6D61zP",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "Y0ojtDYIswL",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "zjPFNiqdUDn",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "Y0ojtDYIswL",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "zjPFNiqdUDn",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "HHAPWHjH2jl",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "dk7A1GdQJZb",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "HHAPWHjH2jl",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "dk7A1GdQJZb",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "oBvk20QR8Ku",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "yD5MOTjJGQh",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "oBvk20QR8Ku",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "yD5MOTjJGQh",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "nJPr5TpxMRH",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "LpsndI6YY7B",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "nJPr5TpxMRH",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "LpsndI6YY7B",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "NDFXr3rbNr4",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "In5c9PQc9k2",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "NDFXr3rbNr4",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "In5c9PQc9k2",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "WOgh3JVN8ZR",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "cKGZwH1teRd",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "WOgh3JVN8ZR",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "cKGZwH1teRd",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "under17year",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "fqP25ZQFIQM",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "n95SqgFG2Hi",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title",
        rowSpan: "8",
      },
      display: "text",
      text: "outreach",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "OS0WCL24P6O",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "ElwY9YMpWTY",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "10",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "OS0WCL24P6O",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "ElwY9YMpWTY",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "DUFFDtrne1C",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "y6czmzNQyDk",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "11",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "DUFFDtrne1C",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "y6czmzNQyDk",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "xyWn9ISZs7Q",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "rZDB8LnMpft",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "12",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "xyWn9ISZs7Q",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "rZDB8LnMpft",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "GM9pP7uw3XA",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "Dn9GowN4arf",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "13",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "GM9pP7uw3XA",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "Dn9GowN4arf",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "N5JolnyBz7N",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "mJXeIXBTvfp",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "14",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "N5JolnyBz7N",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "mJXeIXBTvfp",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "KP4Pz5C605Y",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "fh1RQZlz5vm",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "15",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "KP4Pz5C605Y",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "fh1RQZlz5vm",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      dsde: "rT73tSTcugV",
      coc: "ExshjH245nK",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      dsde: "rT73tSTcugV",
      coc: "ZipNcoJnXT8",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "16",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "ExshjH245nK",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "ZipNcoJnXT8",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "row-title age-ele",
      },
      display: "text",
      text: "under17year",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      dsde: "h22EnXE9H21",
      coc: "K9K1fX5faXx",
      cc: "egWWsb8NolN",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      dsde: "h22EnXE9H21",
      coc: "KvJSgLdyKUh",
      cc: "egWWsb8NolN",
    },
  ],
  [
    {
      cellProps: {
        class: "total-field title",
      },
      display: "text",
      text: "total",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "hpv1 type-1",
      },
      display: "empty",
    },
    {
      cellProps: {
        class: "hpv1 type-2",
      },
      display: "empty",
    },
    {
      cellProps: {
        class: "gray-field",
      },
      display: "text",
      text: "",
    },
    {
      cellProps: {
        class: "hpv2 type-1",
      },
      display: "empty",
    },
    {
      cellProps: {
        class: "hpv2 type-2",
      },
      display: "empty",
    },
  ],
]);

export default HpvMonthlyV2;
