import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hpv-monthly.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#1A237E",
  color: "#fff",
  fontWeight: "bold",
}));

const HpvMonthly = () => {
  return (
    <Box
      id="hpv-monthly-form-container"
      className="custom-form remove-border-left"
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <HeaderCell rowSpan={2} sx={{ width: "15%", top: -5 }}>
              Vaccination site
            </HeaderCell>
            <HeaderCell rowSpan={2} sx={{ width: "5%", top: -5 }}>
              Age
            </HeaderCell>
            <HeaderCell colSpan={2} sx={{ top: -5 }}>
              HPV 1
            </HeaderCell>
            <HeaderCell colSpan={2} sx={{ top: -5 }}>
              HPV 2
            </HeaderCell>
          </TableRow>
          <TableRow>
            <HeaderCell
              sx={{ width: "20%", backgroundColor: "#303F9F", top: 36.6 }}
            >
              School girls
            </HeaderCell>
            <HeaderCell
              sx={{ width: "20%", backgroundColor: "#303F9F", top: 36.6 }}
            >
              Out-of-school girls
            </HeaderCell>
            <HeaderCell
              sx={{ width: "20%", backgroundColor: "#303F9F", top: 36.6 }}
            >
              School girls
            </HeaderCell>
            <HeaderCell
              sx={{ width: "20%", backgroundColor: "#303F9F", top: 36.6 }}
            >
              Out-of-school girls
            </HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const vaccinationStyle = {
  backgroundColor: "#3F51B5",
  color: "#fff",
};

const ageStyle = {
  backgroundColor: "#7986CB",
  color: "#fff",
};

const shoolGirlStyle = {
  backgroundColor: "#C5CAE9",
};

const outShoolGirlStyle = {
  backgroundColor: "#E8EAF6",
};

const totalStyle = {
  backgroundColor: "#3949AB",
  color: "#fff",
};

const shoolGirlTotalStyle = {
  backgroundColor: "#3d5afe8a",
};

const outShoolGirlTotalStyle = {
  backgroundColor: "#536dfe7a",
};

const disableStyle = {
  backgroundColor: "#ddd",
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "School",
      style: vaccinationStyle,
      cellProps: { rowSpan: 7 },
    },
    { display: "text", text: "10", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "o8SFeAuUdqE",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "QAYXg6o3AEa",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    { display: "empty", style: disableStyle },
    { display: "empty", style: disableStyle },
  ],
  [
    { display: "text", text: "11", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "bQMwVCFD7RI",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "HCH4PI2ZK5H",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "bQMwVCFD7RI",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "HCH4PI2ZK5H",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "12", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "DRUevfUOtzf",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "buT5931rCRZ",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "DRUevfUOtzf",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "buT5931rCRZ",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "13", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "pDviRORNCzE",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "bfi10ZXYZlB",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "pDviRORNCzE",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "bfi10ZXYZlB",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "14", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "Ta4CTqU627c",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "G9hO3sma7FD",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "Ta4CTqU627c",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "G9hO3sma7FD",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "15", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "dWY7RRGZ8kh",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "jEUVmOyFKsi",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "dWY7RRGZ8kh",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "jEUVmOyFKsi",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "Over 15", style: ageStyle },
    { display: "empty", style: disableStyle },
    { display: "empty", style: disableStyle },
    {
      cc: "egWWsb8NolN",
      coc: "ptlNmHyNtHs",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "bCFbUnNh9w3",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Health centre",
      style: vaccinationStyle,
      cellProps: { rowSpan: 7 },
    },
    { display: "text", text: "10", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "E7x187QRJcy",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "zTbbf6D61zP",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    { display: "empty", style: disableStyle },
    { display: "empty", style: disableStyle },
  ],
  [
    { display: "text", text: "11", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "Y0ojtDYIswL",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "zjPFNiqdUDn",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "Y0ojtDYIswL",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "zjPFNiqdUDn",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "12", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "HHAPWHjH2jl",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "dk7A1GdQJZb",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "HHAPWHjH2jl",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "dk7A1GdQJZb",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "13", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "oBvk20QR8Ku",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "yD5MOTjJGQh",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "oBvk20QR8Ku",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "yD5MOTjJGQh",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "14", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "nJPr5TpxMRH",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "LpsndI6YY7B",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "nJPr5TpxMRH",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "LpsndI6YY7B",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "15", style: ageStyle },
    {
      cc: "egWWsb8NolN",
      coc: "NDFXr3rbNr4",
      dsde: "rT73tSTcugV",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "In5c9PQc9k2",
      dsde: "rT73tSTcugV",
      style: outShoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "NDFXr3rbNr4",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "In5c9PQc9k2",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    { display: "text", text: "Over 15", style: ageStyle },
    { display: "empty", style: disableStyle },
    { display: "empty", style: disableStyle },
    {
      cc: "egWWsb8NolN",
      coc: "HWG6TrbwK6H",
      dsde: "h22EnXE9H21",
      style: shoolGirlStyle,
    },
    {
      cc: "egWWsb8NolN",
      coc: "rY3GahVITAL",
      dsde: "h22EnXE9H21",
      style: outShoolGirlStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Total",
      style: totalStyle,
      cellProps: { colSpan: 2 },
    },
    { display: "text", text: "0", style: shoolGirlTotalStyle },
    { display: "text", text: "0", style: outShoolGirlTotalStyle },
    { display: "text", text: "0", style: shoolGirlTotalStyle },
    { display: "text", text: "0", style: outShoolGirlTotalStyle },
  ],
];

export default HpvMonthly;
