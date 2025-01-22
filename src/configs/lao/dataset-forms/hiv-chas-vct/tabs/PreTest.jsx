import {
  Box,
  styled,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MapTable from "../../common/MapTable";
import TotalCell from "../../common/TotalCell";

const headerStyle = {
  backgroundColor: "#0277BD",
  color: "#fff",
};

const HeaderCell = styled(TableCell)(() => headerStyle);

const PreTest = () => {
  const { t } = useTranslation();

  const dataElementConfigsAWithTotal = dataElementConfigsA.map((item) => {
    const listData = item
      .slice(item.length - 2, item.length - 1)
      .map((col) => (col.dsde ? `${col.dsde}-${col.coc}` : null))
      .filter((col) => col);
    return [
      ...item.slice(0, item.length - 1),
      {
        ...item.slice(item.length - 1)[0],
        customCell: <TotalCell listData={listData} />,
      },
    ];
  });
  const dataElementConfigsBWithTotal = dataElementConfigsB.map((item) => {
    const listData = item
      .slice(item.length - 2, item.length - 1)
      .map((col) => (col.dsde ? `${col.dsde}-${col.coc}` : null))
      .filter((col) => col);
    return [
      ...item.slice(0, item.length - 1),
      {
        ...item.slice(item.length - 1)[0],
        customCell: <TotalCell listData={listData} />,
      },
    ];
  });
  const dataElementConfigsCWithTotal = dataElementConfigsC.map((item) => {
    const listData = item
      .slice(item.length - 2, item.length - 1)
      .map((col) => (col.dsde ? `${col.dsde}-${col.coc}` : null))
      .filter((col) => col);
    return [
      ...item.slice(0, item.length - 1),
      {
        ...item.slice(item.length - 1)[0],
        customCell: <TotalCell listData={listData} />,
      },
    ];
  });
  const dataElementConfigsDWithTotal = dataElementConfigsD.map((item) => {
    const listData = item
      .slice(item.length - 2, item.length - 1)
      .map((col) => (col.dsde ? `${col.dsde}-${col.coc}` : null))
      .filter((col) => col);
    return [
      ...item.slice(0, item.length - 1),
      {
        ...item.slice(item.length - 1)[0],
        customCell: <TotalCell listData={listData} />,
      },
    ];
  });

  return (
    <Box id="nce-delivery-pnc-mortality-wrapper">
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
        {t("ANC_DELIVERY_PNC_MORTALITY")}
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("A_ANC")}</HeaderCell>
            <HeaderCell>{t("Outreach_")}</HeaderCell>
            <HeaderCell>{t("Total_")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsAWithTotal} />
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("B_Delivery")}</HeaderCell>
            <HeaderCell>{t("Outreach_")}</HeaderCell>
            <HeaderCell>{t("Total_")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsBWithTotal} />
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("C_PNC")}</HeaderCell>
            <HeaderCell>{t("Outreach_")}</HeaderCell>
            <HeaderCell>{t("Total_")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsCWithTotal} />
        </TableBody>
      </Table>

      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>{t("D_MORTALITY_REPORT")}</HeaderCell>
            <HeaderCell>{t("Outreach_")}</HeaderCell>
            <HeaderCell>{t("Total_")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsDWithTotal} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default PreTest;

const disableCell = {
  backgroundColor: "#DDD !important",
};

const dataElementConfigsA = [
  [
    {
      display: "text",
      text: "ANC_1st_visit",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "h8KiBz2888q" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "ANC_4th_visit",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "J5E8BkAoIWn" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Level_1_High_risk_mother_identified_and_referred_to_upper_level_facility",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "CHFkUvXqZuV" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Level_2_High_risk_mother_identified_and_referred_to_upper_level_facility",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "St3S4FCzicG" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Td1_Pregnant_women_received_one_dose_of_Td_in_this_pregnancy",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "tZH5BmEHUun" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Td2_Pregnant_women_received_one_dose_of_Td_in_this_pregnancy",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "pXfELMu5ihJ" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_Women_Completed_Td_before_this_pregnancy",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "tZy4uW84fqG" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_received_IFA_90_tablets",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "Q3SDvb99gUE" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_come_for_ANC_visit_received_HIV_Counselling",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_received_Counselling_Tested_for_HIV",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_received_Free_ANC",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "L2kK7cU9dsa" },
    { display: "empty" },
  ],
];

const dataElementConfigsB = [
  [
    {
      display: "text",
      text: "Delivery_at_health_facility",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Deliveries_at_home_by_SBA",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "skWdJmVHpkM" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Natural_Delivery_Vaginal_delivery",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "amPLatG4bO9" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Deliveries_by_using_medical_equipment_Forcep_Vacuum_aspiration",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Caesarean_sections",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Deliveries_with_Pre_and_Eclampsia",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Delivery_with_oxytocine_within_one_minute_of_birth",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Under_weight_newborn_2500_gr",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "jt385ilkaUd" },
    { display: "empty" },
  ],

  [
    {
      display: "text",
      text: "Preterm_deliveries_at_22_27_weeks",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Preterm_deliveries_at_28_36_weeks",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Still_births_28_weeks",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Total_live_births",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "XnsSXusE1ow" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Newborn_initiated_breastfeeding_within_the_first_hour_after_birth",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "FBUvQe3qNgf" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Spontaneus_abortions_28_weeks",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "CVl2SqGtDNt" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Induced_abortions",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Complicated_Abortions",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Ectopic_pregnancies_ruptured",
    },
    { display: "empty", style: disableCell },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_received_Free_delivery",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "HuDeipBbwsg" },
    { display: "empty" },
  ],
];

const dataElementConfigsC = [
  [
    {
      display: "text",
      text: "Women_receiving_PNC_within_2_days_from_birth_in_the_month",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "tlKnF8fn6oZ" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Women_receiving_PNC_within_3_42_days_from_birth_in_the_month",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "tdE0ZUlwmyY" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Women_receiving_IFA_90_tablets",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "lAYCRO8NyOh" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Pregnant_women_received_Free_PNC",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "zpyx8FFz9S9" },
    { display: "empty" },
  ],
];

const dataElementConfigsD = [
  [
    {
      display: "text",
      text: "Maternal_deaths",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "dJhWRKs0fcq" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Neonatal_death_0_7_days",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "sISjKc2LEDg" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Neonatal_death_8_28_days",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "FSLrz90vXKf" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Infant_death_age_1_11_months",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "nCl4K1S3efY" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Total_number_of_Infant_under_1_year_of_age_deaths",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "cPcvesqWRtH" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Child_death_age_1_4_years",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "kyVKK0JcRPJ" },
    { display: "empty" },
  ],
  [
    {
      display: "text",
      text: "Under_5_Deaths",
    },
    { cc: "FU2zdnyL2tq", coc: "BaKsAyoQBud", dsde: "cwhEsbBe6Zs" },
    { display: "empty" },
  ],
];
