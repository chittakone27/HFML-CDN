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
import "./hiv-vct-prov.css";

const HivVctProvince = () => {
  const { t } = useTranslation();

  return (
    <Box id="hiv-vct-prov-form-container" className="custom-form">
      <Table id="hiv-vct-prov-table">
        <MapTable dataElementConfigs={dataElementConfigs} />
      </Table>
    </Box>
  );
};
const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const primaryHeaderStyle = {
  style: {
    backgroundColor: "#155422",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
};

const secondaryHeaderStyle = {
  style: {
    textAlign: "center",
    backgroundColor: "#2C843B",
    color: "#fff",
    fontWeight: "bold",
  },
};

const labelStyle = {
  style: {
    backgroundColor: "#72C17D",
    fontWeight: "bold",
    textAlign: "left",
  },
};

const valueStyle = {
  style: {
    backgroundColor: "#BFE3C4",
    width: "250px",
    padding: "5px 30px !important",
    textAlign: "center",
  },
};
const dataElementConfigs = [
  [
    {
      display: "text",
      text: "VCT",
      cellProps: { ...primaryHeaderStyle, rowSpan: 2 },
    },
    {
      display: "text",
      text: "Positive cases",
      cellProps: { ...primaryHeaderStyle, colSpan: 2 },
    },
    {
      display: "text",
      text: "AIDS cases",
      cellProps: { ...primaryHeaderStyle, colSpan: 2 },
    },
    {
      display: "text",
      text: "Dead cases",
      cellProps: { ...primaryHeaderStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Male",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "Female",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "Male",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "Female",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "Male",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "Female",
      cellProps: secondaryHeaderStyle,
    },
  ],
  [
    {
      display: "text",
      text: "General population",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nEzDG2dvSD2",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nEzDG2dvSD2",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nEzDG2dvSD2",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Pregnant women",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nVF49dQFLvd",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nVF49dQFLvd",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "nVF49dQFLvd",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Husband/Partner",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tHjiDwSTCnu",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tHjiDwSTCnu",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tHjiDwSTCnu",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
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
      text: "FSW",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "HjZYdmEGbfU",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "HjZYdmEGbfU",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "HjZYdmEGbfU",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "MSM",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "Ou35obw3F6C",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "Ou35obw3F6C",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      display: "text",
      text: "",
      cellProps: emptyStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "Ou35obw3F6C",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
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
      text: "TB patient",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tgUfj00Wyel",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "BORlcoLmzWi",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tgUfj00Wyel",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "BORlcoLmzWi",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "tgUfj00Wyel",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "BORlcoLmzWi",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "PWID",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "xj7VXMyJLWl",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "FKood8xRpRu",
      dsde: "HpHxOL34MiK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "xj7VXMyJLWl",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "FKood8xRpRu",
      dsde: "fI2w7AEjyNr",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "xj7VXMyJLWl",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "FKood8xRpRu",
      dsde: "QdqvSY2oIFS",
      cellProps: valueStyle,
    },
  ],
];
export default HivVctProvince;
