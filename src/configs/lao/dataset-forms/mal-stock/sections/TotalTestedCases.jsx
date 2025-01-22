import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../../common/MapTable";
import { useTranslation } from "react-i18next";

const headerStyle = {
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
};

const HeaderCell = styled(TableCell)(() => headerStyle);

const Title = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: 10,
  fontWeight: "bold",
}));

const TotalTestedCases = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Title variant="h6" sx={{ textDecoration: "underline", mt: 2 }}>
        2. Total Tested Cases
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("AGE")}</HeaderCell>
            <HeaderCell>{t("RDTtest")}</HeaderCell>
            <HeaderCell>{t("MICtest")}</HeaderCell>
            <HeaderCell>{t("VHVtest")}</HeaderCell>
            <HeaderCell>{t("ACTtest")}</HeaderCell>
            <HeaderCell>{t("FTATtest")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection2} />
        </TableBody>
      </Table>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("AGE")}</HeaderCell>
            <HeaderCell>{t("PPMTest")}</HeaderCell>
            <HeaderCell>{t("KMWTest")}</HeaderCell>
            <HeaderCell>{t("KMW_RACDTest")}</HeaderCell>
            <HeaderCell>{t("MMWTest")}</HeaderCell>
            <HeaderCell>{t("MMW_RACDTest")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection2_Table2} />
        </TableBody>
      </Table>
    </Box>
  );
};

const labelStyle = {
  backgroundColor: "#42A5F5",
};

const deStyle = {
  backgroundColor: "#BBDEFB",
};

const dataElementConfigsSection2 = [
  [
    {
      display: "text",
      text: "Under5",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "OjXIQY2xY7K",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "ulFgJ1voklw",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "cTaYKaTFnvi",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "JmJ5tcHSaJP",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "rytp1GxObJf",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Over5",
      style: labelStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "OjXIQY2xY7K",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "ulFgJ1voklw",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "cTaYKaTFnvi",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "JmJ5tcHSaJP",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "rytp1GxObJf",
      style: deStyle,
    },
  ],
];

const dataElementConfigsSection2_Table2 = [
  [
    {
      display: "text",
      text: "Under5",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "HB6KdK6lNgp",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "eIxSWlynWHT",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "yP2KIHquJZ2",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "zqY1bsW1RvE",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "K5TCy4YgFWC",
      dsde: "mfxX0XZA9sr",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Over5",
      style: labelStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "HB6KdK6lNgp",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "eIxSWlynWHT",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "yP2KIHquJZ2",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "zqY1bsW1RvE",
      style: deStyle,
    },
    {
      cc: "MzxaRqGSs2a",
      coc: "AavaBYyzhvd",
      dsde: "mfxX0XZA9sr",
      style: deStyle,
    },
  ],
];

export default TotalTestedCases;
