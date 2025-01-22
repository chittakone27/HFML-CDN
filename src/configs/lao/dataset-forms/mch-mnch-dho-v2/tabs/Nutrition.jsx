import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { Box, styled, Table, TableBody, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import MapTable from "../../common/MapTable";
import TotalCell from "../../common/TotalCell";

const listDataMapping = [[1], [2]];
const Nutrition = () => {
  const { t } = useTranslation();
  const dataElementConfigsEWithTotal = dataElementConfigsE.map((item) => {
    if (item.find((col) => col.dsde)) {
      return [
        ...item.slice(0, item.length - 2),
        ...item.slice(item.length - 2).map((col, colIndex) => {
          return {
            ...col,
            customCell: (
              <TotalCell
                listData={listDataMapping[colIndex]
                  .map((dataIndex) => {
                    const dataItem = item.slice(dataIndex, dataIndex + 1)[0];
                    if (dataItem.dsde) {
                      return `${dataItem.dsde}-${dataItem.coc}`;
                    }
                    return null;
                  })
                  .filter((dataIndex) => dataIndex)}
              />
            ),
          };
        }),
      ];
    }
    return item;
  });
  return (
    <Box id="family-planing-wrapper">
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#0277BD",
          border: "1px solid #fff",
          padding: "8px 5px",
          color: "#fff",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {t("H_Growth_monitoring_and_nutrition")}
      </Typography>

      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsEWithTotal} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default Nutrition;

const disableCell = {
  backgroundColor: "#DDD !important",
};

const blueTitle = {
  backgroundColor: "#99ccff",
};

const blueContent = {
  textAlign: "left !important",
  backgroundColor: "#cae5ff",
};

const yorkGreenTitle = {
  backgroundColor: "#99cc99",
};

const yorkGreenCategory = {
  backgroundColor: "#b7dbb7",
};

const yorkGreenContent = {
  backgroundColor: "#e0efe0",
};

const brownTitle = {
  backgroundColor: "#b7704c",
};

const brownCategory = {
  backgroundColor: "#cc997f",
};

const brownContent = {
  backgroundColor: "#e0c1b2",
};

const dataElementConfigsE = [
  [
    {
      display: "empty",
      cellProps: { rowSpan: 2 },
      style: { ...blueTitle, width: "40%" },
    },
    {
      display: "text",
      text: "Outreach_",
      cellProps: { colSpan: 2 },
      style: { ...yorkGreenTitle, width: "30%" },
    },
    {
      display: "text",
      text: "Total_",
      cellProps: { colSpan: 2 },
      style: { ...brownTitle, width: "30%" },
    },
  ],
  [
    {
      display: "text",
      text: "Under_12_months",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "12_months_to_59_months",
      style: yorkGreenCategory,
    },
    {
      display: "text",
      text: "Under_12_months",
      style: brownCategory,
    },
    {
      display: "text",
      text: "12_months_to_59_months",
      style: brownCategory,
    },
  ],
  [
    {
      display: "text",
      text: "Children_received_deworming_tablets_helmithic_1st_round",
      style: blueContent,
    },
    { display: "empty", style: disableCell },
    {
      cc: "FU2zdnyL2tq",
      coc: "eFXrDqXA2WQ",
      dsde: "WT0nisMw0yl",
      style: yorkGreenContent,
    },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "Children_received_deworming_tablets_helmithic_2nd_round",
      style: blueContent,
    },
    { display: "empty", style: disableCell },
    {
      cc: "FU2zdnyL2tq",
      coc: "eFXrDqXA2WQ",
      dsde: "huihfumqv2F",
      style: yorkGreenContent,
    },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "Children_aged_6_11_months_received_Vitamin_A",
      style: blueContent,
    },
    {
      cc: "FU2zdnyL2tq",
      coc: "eFXrDqXA2WQ",
      dsde: "QG0RFB0FNAV",
      style: yorkGreenContent,
    },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
    { display: "empty", style: disableCell },
  ],
  [
    {
      display: "text",
      text: "Children_aged_12_59_months_received_Vitamin_A_1st_round",
      style: blueContent,
    },
    { display: "empty", style: disableCell },
    {
      cc: "FU2zdnyL2tq",
      coc: "eFXrDqXA2WQ",
      dsde: "CU0V0nXneSL",
      style: yorkGreenContent,
    },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "Children_aged_12_59_months_received_Vitamin_A_2nd_round",
      style: blueContent,
    },
    { display: "empty", style: disableCell },
    {
      cc: "FU2zdnyL2tq",
      coc: "eFXrDqXA2WQ",
      dsde: "fwIMLRx7aem",
      style: yorkGreenContent,
    },
    { display: "empty", style: disableCell },
    { display: "empty", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "Children_under_5_years_who_recieved_growth_monitoring",
      style: blueContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "LoRGj1dFh6X",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "LoRGj1dFh6X",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "High_Age", style: blueTitle },
    {
      display: "text",
      text: "Outreach_",
      style: yorkGreenTitle,
      cellProps: { colSpan: 2 },
    },
    {
      display: "text",
      text: "Total_",
      style: brownTitle,
      cellProps: { colSpan: 2 },
    },
  ],
  [
    { display: "text", text: "Green_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "rUWYJuSYz8l",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "rUWYJuSYz8l",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Yellow_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "m3bBTxYt7gk",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "m3bBTxYt7gk",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Red_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "AbVeoBQBMaH",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "AbVeoBQBMaH",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Weight_Age", style: blueTitle },
    { display: "empty", style: yorkGreenContent },
    { display: "empty", style: yorkGreenContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Green_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "OXysJyDVZmg",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "OXysJyDVZmg",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Yellow_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "NkkIEskFsmV",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "NkkIEskFsmV",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Red_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "EVYbaClmpIU",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "EVYbaClmpIU",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Weight_High", style: blueTitle },
    { display: "empty", style: yorkGreenContent },
    { display: "empty", style: yorkGreenContent },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Green_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "JSevlY9b61y",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "JSevlY9b61y",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Yellow_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "Ix4edqrszwC",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "Ix4edqrszwC",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    { display: "text", text: "Red_", style: blueContent },
    {
      cc: "ekxx48xH3oc",
      coc: "xp6YPoDKUe4",
      dsde: "lkPUtglo3SP",
      style: yorkGreenContent,
    },
    {
      cc: "ekxx48xH3oc",
      coc: "jD0Cf8zYYbV",
      dsde: "lkPUtglo3SP",
      style: yorkGreenContent,
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "Weekly_IFA_pills_for_12_44_year_female",
      style: blueTitle,
    },
    {
      cc: "FU2zdnyL2tq",
      coc: "BaKsAyoQBud",
      dsde: "WAL7FPoeocd",
      style: yorkGreenContent,
      cellProps: { colSpan: 2 },
    },
    { display: "empty", style: brownContent },
    { display: "empty", style: brownContent },
  ],
];
