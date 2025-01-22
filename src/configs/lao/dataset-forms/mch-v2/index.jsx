import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  Tabs,
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import MapTable from "../common/MapTable";
import { useTranslation } from "react-i18next";
import "./mch-v2.css";
import { mappingPopup } from "./mappingPopup";
import useDataEntryStore from "@/state/dataEntry";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import CustomPopup from "../common/Popup/Popup";
import { saveDataValue } from "@/api/icapture/dataValue";
import { StyledTab, StyledTabs, TabPanel } from "../common/Tab";

const TotalCell = ({ listData, save = null }) => {
  const {
    dataValues,
    actions: { setDataValue },
  } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues, actions: state.actions }),
    shallow
  );
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const result = useMemo(
    () =>
      listData.reduce(
        (prev, curr) =>
          prev + (dataValues[`${curr}-${orgUnit.id}`]?.value * 1 || 0),
        0
      ),
    [...listData.map((item) => dataValues[`${item}-${orgUnit.id}`]?.value)]
  );
  useEffect(() => {
    if (
      save &&
      dataValues[`${save.dsde}-${save.coc}-${orgUnit.id}`]?.value * 1 !== result
    ) {
      (async () => {
        try {
          const resultSave = await saveDataValue(
            "w8XQmI94Spv",
            orgUnit.id,
            period.dhis2Period,
            save.dsde,
            save.coc,
            result
          );
          if (resultSave.ok) {
            setDataValue(save.dsde, save.coc, orgUnit.id, result);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [result]);

  return <>{result}</>;
};

const MchV2 = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupContent, setPopupContent] = useState(null);

  const header1Table = [
    t("Health_Facility"),
    t("Outreach_"),
    t("outsideCountry"),
  ];
  const headerTittleTable = [
    t("A_ANC"),
    t("B_Delivery"),
    t("C_PNC"),
    t("D_Abortion"),
  ];
  const widthColumns = {
    1: "20%",
    2: "20%",
    3: "20%",
  };
  const labelTable1Style = {
    style: {
      width: "33%",
      color: "#000",
      fontWeight: "bold",
      backgroundColor: "#CAE5FF",
      border: "1px solid #DDDDDD",
    },
  };

  const value1Style = {
    style: {
      backgroundColor: "#FFEA99",
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };

  const value2Style = {
    style: {
      backgroundColor: "#E0EFE0",
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };

  const emptyStyle = {
    style: {
      border: "1px solid #c0c0c0",
      backgroundColor: "#AAB6A2",
    },
  };

  const labelTable2_2Style = {
    style: {
      color: "#000",
      fontWeight: "bold",
      backgroundColor: "#CAE5FF",
    },
  };

  const headerTable2_2_1Style = {
    style: {
      color: "#000",
      backgroundColor: "#FFE066",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };

  const headerTable2_2_2Style = {
    style: {
      color: "#000",
      backgroundColor: "#B7DBB7",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };
  const headerTable2_2_3Style = {
    style: {
      color: "#000",
      backgroundColor: "#EFD2E4",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };
  const headerTable2_2_4Style = {
    style: {
      color: "#000",
      backgroundColor: "#AEFBEE",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };
  const valueTable2_2_1Style = {
    style: {
      color: "#000",
      backgroundColor: "#FFE066",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };

  const valueTable2_2_2Style = {
    style: {
      color: "#000",
      backgroundColor: "#B7DBB7",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };
  const valueTable2_2_3Style = {
    style: {
      color: "#000",
      backgroundColor: "#EFD2E4",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "10px",
      border: "1px solid #DDDDDD",
    },
  };
  const valueTable2_2_4Style = {
    style: {
      color: "#000",
      backgroundColor: "#AEFBEE",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #DDDDDD",
    },
  };

  const tableConfigs1 = useMemo(
    () => [
      [
        [
          {
            display: "text",
            text: t("ANC_1st_visit"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "h8KiBz2888q",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "h8KiBz2888q",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "h8KiBz2888q",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("ANC_4th_visit"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "J5E8BkAoIWn",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "J5E8BkAoIWn",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "J5E8BkAoIWn",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Level_1_High_risk_mother_identified_and_referred_to_upper_level_facility"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "CHFkUvXqZuV",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "CHFkUvXqZuV",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "CHFkUvXqZuV",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Level_2_High_risk_mother_identified_and_referred_to_upper_level_facility"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "St3S4FCzicG",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "St3S4FCzicG",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "St3S4FCzicG",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Td1_Pregnant_women_received_one_dose_of_Td_in_this_pregnancy"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "tZH5BmEHUun",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "tZH5BmEHUun",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "tZH5BmEHUun",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Td2_Pregnant_women_received_one_dose_of_Td_in_this_pregnancy"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "pXfELMu5ihJ",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "pXfELMu5ihJ",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "pXfELMu5ihJ",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_Women_Completed_Td_before_this_pregnancy"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "tZy4uW84fqG",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "tZy4uW84fqG",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "tZy4uW84fqG",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_women_received_IFA_90_tablets"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "Q3SDvb99gUE",
            cellProps: value1Style,
          },

          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "Q3SDvb99gUE",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "Q3SDvb99gUE",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Pregnant_women_come_for_ANC_visit_received_HIV_Counselling"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "WRYGPGnbcyE",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_women_received_Counselling_Tested_for_HIV"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "q5ZMwieGJ1N",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_women_received_Free_ANC"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "L2kK7cU9dsa",
            cellProps: value1Style,
          },

          { display: "text", text: "0", cellProps: value2Style },
          { display: "text", text: "", cellProps: value2Style },
        ],
      ],
      [
        [
          {
            display: "text",
            text: t("Delivery_at_health_facility"),
            cellProps: labelTable1Style,
          },
          {
            display: "text",
            text: "0",
            cellProps: value1Style,
            customCell: (
              <TotalCell
                listData={[
                  "amPLatG4bO9-eFXrDqXA2WQ",
                  "K7dF5mpEqyO-eFXrDqXA2WQ",
                  "di2GiKSQ3wV-eFXrDqXA2WQ",
                ]}
                save={{ coc: "eFXrDqXA2WQ", dsde: "CyUEAFiwGTS" }}
              />
            ),
          },
          { display: "text", text: "", cellProps: emptyStyle },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "CyUEAFiwGTS",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Birth_notification"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "rs46TVEJK3F",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Deliveries_at_home_by_SBA"),
            cellProps: labelTable1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },

          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "CyUEAFiwGTS",
            cellProps: value2Style,
          },
          {
            display: "text",
            text: "",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Natural_Delivery_Vaginal_delivery"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "amPLatG4bO9",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "amPLatG4bO9",
            cellProps: value2Style,
          },
          {
            display: "text",
            text: "",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Deliveries_by_using_medical_equipment_Forcep_Vacuum_aspiration"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "K7dF5mpEqyO",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Caesarean_sections"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "di2GiKSQ3wV",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Deliveries_with_Pre_and_Eclampsia"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "fPLmoXgFDs7",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Delivery_with_oxytocine_within_one_minute_of_birth"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Jr4C4afqaEk",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Under_weight_newborn_2500_gr"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "jt385ilkaUd",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "jt385ilkaUd",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "jt385ilkaUd",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Preterm_deliveries_at_22_27_weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "csY0b4lxaLO",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Preterm_deliveries_at_28_36_weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "igOsIIe56dQ",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Still_births_28_weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "PGaxoLVKaCz",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Total_live_births"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "XnsSXusE1ow",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "XnsSXusE1ow",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "XnsSXusE1ow",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Newborn_initiated_breastfeeding_within_the_first_hour_after_birth"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "FBUvQe3qNgf",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "FBUvQe3qNgf",
            cellProps: value2Style,
          },
          {
            display: "text",
            text: "",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Spontaneus_abortions_28_weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "CVl2SqGtDNt",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "CVl2SqGtDNt",
            cellProps: value2Style,
          },
          {
            display: "text",
            text: "",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Induced_abortions"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "syylGWdLSOR",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Complicated_Abortions"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "gpcwb6YCpEC",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },

          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Ectopic_pregnancies_ruptured"),
            cellProps: labelTable1Style,
          },
          {
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "eMtjlRvZ3pz",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_women_received_Free_delivery"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "HuDeipBbwsg",
            cellProps: value1Style,
          },
          { display: "text", text: "0", cellProps: value2Style },
          { display: "text", text: "", cellProps: value2Style },
        ],
      ],
      [
        [
          {
            display: "text",
            text: t(
              "Women_receiving_PNC_within_2_days_from_birth_in_the_month"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "tlKnF8fn6oZ",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "tlKnF8fn6oZ",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "tlKnF8fn6oZ",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t(
              "Women_receiving_PNC_within_3_42_days_from_birth_in_the_month"
            ),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "tdE0ZUlwmyY",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "tdE0ZUlwmyY",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "tdE0ZUlwmyY",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Women_receiving_IFA_90_tablets"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "lAYCRO8NyOh",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "lAYCRO8NyOh",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "lAYCRO8NyOh",
            cellProps: value2Style,
          },
        ],
        [
          {
            display: "text",
            text: t("Pregnant_women_received_Free_PNC"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "zpyx8FFz9S9",
            cellProps: value1Style,
          },
          { display: "text", text: "0", cellProps: value2Style },
          { display: "text", text: "", cellProps: value2Style },
        ],
      ],
      [
        [
          {
            display: "text",
            text: t("Maternal_deaths"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "dJhWRKs0fcq",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "dJhWRKs0fcq",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Neonatal_death_0_7_days"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "sISjKc2LEDg",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "sISjKc2LEDg",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Neonatal_death_8_28_days"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "FSLrz90vXKf",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "FSLrz90vXKf",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Infant_death_age_1_11_months"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "nCl4K1S3efY",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "nCl4K1S3efY",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Total_number_of_Infant_under_1_year_of_age_deaths"),
            cellProps: labelTable1Style,
          },
          {
            display: "text",
            text: "0",
            cellProps: value1Style,
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-eFXrDqXA2WQ",
                  "FSLrz90vXKf-eFXrDqXA2WQ",
                  "nCl4K1S3efY-eFXrDqXA2WQ",
                ]}
                save={{ coc: "eFXrDqXA2WQ", dsde: "cPcvesqWRtH" }}
              />
            ),
          },
          {
            display: "text",
            text: "0",
            cellProps: value2Style,
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-BaKsAyoQBud",
                  "FSLrz90vXKf-BaKsAyoQBud",
                  "nCl4K1S3efY-BaKsAyoQBud",
                ]}
                save={{ coc: "BaKsAyoQBud", dsde: "cPcvesqWRtH" }}
              />
            ),
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Child_death_age_1_4_years"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "kyVKK0JcRPJ",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "kyVKK0JcRPJ",
            cellProps: value2Style,
          },

          { display: "text", text: "", cellProps: value2Style },
        ],
        [
          {
            display: "text",
            text: t("Under_5_Deaths"),
            cellProps: labelTable1Style,
          },
          {
            display: "text",
            text: "0",
            cellProps: value1Style,
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-eFXrDqXA2WQ",
                  "FSLrz90vXKf-eFXrDqXA2WQ",
                  "nCl4K1S3efY-eFXrDqXA2WQ",
                  "kyVKK0JcRPJ-eFXrDqXA2WQ",
                ]}
                save={{ coc: "eFXrDqXA2WQ", dsde: "cwhEsbBe6Zs" }}
              />
            ),
          },
          {
            display: "text",
            text: "0",
            cellProps: value2Style,
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-BaKsAyoQBud",
                  "FSLrz90vXKf-BaKsAyoQBud",
                  "nCl4K1S3efY-BaKsAyoQBud",
                  "kyVKK0JcRPJ-BaKsAyoQBud",
                ]}
                save={{ coc: "BaKsAyoQBud", dsde: "cwhEsbBe6Zs" }}
              />
            ),
          },
          { display: "text", text: "", cellProps: value2Style },
        ],
      ],
    ],
    []
  );

  const tableConfigs2 = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("List_"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#FFCC00",
              minWidth: "100px",
              textAlign: "center",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            rowSpan: 2,
          },
        },
        {
          display: "text",
          text: t("Health_Facility"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#FFCC00",
              textAlign: "center",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 5,
          },
        },
        {
          display: "text",
          text: t("Outreach_"),
          cellProps: {
            style: {
              color: "#000",
              textAlign: "center",
              backgroundColor: "#99CC99",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 5,
          },
        },
        {
          display: "text",
          text: t("CBD_and_VHV"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#EBC7DE",
              fontWeight: "bold",
              border: "1px solid #DDDDDD",
              textAlign: "center",
            },
            colSpan: 5,
          },
        },
        {
          display: "text",
          text: t("outsideCountry"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#61F7DE",
              fontWeight: "bold",
              border: "1px solid #DDDDDD",
              textAlign: "center",
            },
            colSpan: 5,
          },
        },
      ],
      [
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Number_of_continue_users"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Total_number_distributed"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Wastage_"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Number_of_continue_users"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Total_number_distributed"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Wastage_"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
          cellProps: headerTable2_2_3Style,
        },
        {
          display: "text",
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_3Style,
        },
        {
          display: "text",
          text: t("Number_of_continue_users"),
          cellProps: headerTable2_2_3Style,
        },
        {
          display: "text",
          text: t("Total_number_distributed"),
          cellProps: headerTable2_2_3Style,
        },
        {
          display: "text",
          text: t("Wastage_"),
          cellProps: headerTable2_2_3Style,
        },
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
          cellProps: headerTable2_2_4Style,
        },
        {
          display: "text",
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_4Style,
        },
        {
          display: "text",
          text: t("Number_of_continue_users"),
          cellProps: headerTable2_2_4Style,
        },
        {
          display: "text",
          text: t("Total_number_distributed"),
          cellProps: headerTable2_2_4Style,
        },
        {
          display: "text",
          text: t("Wastage_"),
          cellProps: headerTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Condoms_"),
          cellProps: labelTable2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "bM0YZOyAlMr",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "xCa6R5GJHmZ",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "NQ1VY2fZLhp",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "MnAu1CNFhuD",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "bM0YZOyAlMr",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "xCa6R5GJHmZ",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "NQ1VY2fZLhp",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "MnAu1CNFhuD",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "bM0YZOyAlMr",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "xCa6R5GJHmZ",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "NQ1VY2fZLhp",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "MnAu1CNFhuD",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "bM0YZOyAlMr",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "xCa6R5GJHmZ",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "NQ1VY2fZLhp",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "MnAu1CNFhuD",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Single_Pill"),

          cellProps: labelTable2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "VPbIDh5HeVc",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "CSugsclfQYE",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "hUhFB4xWcnR",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "Bw5LhLbGlZ2",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "VPbIDh5HeVc",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "CSugsclfQYE",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "hUhFB4xWcnR",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "Bw5LhLbGlZ2",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "VPbIDh5HeVc",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "CSugsclfQYE",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "hUhFB4xWcnR",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "Bw5LhLbGlZ2",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "VPbIDh5HeVc",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "CSugsclfQYE",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "hUhFB4xWcnR",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "Bw5LhLbGlZ2",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Combined_Pill"),

          cellProps: labelTable2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "sa8Ep87YPNv",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "a6pVsTaYm7v",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "MxuZzDqR47u",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "tAtyR4Q17E0",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "sa8Ep87YPNv",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "a6pVsTaYm7v",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "MxuZzDqR47u",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "tAtyR4Q17E0",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "sa8Ep87YPNv",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "a6pVsTaYm7v",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "MxuZzDqR47u",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "tAtyR4Q17E0",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "sa8Ep87YPNv",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "a6pVsTaYm7v",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "MxuZzDqR47u",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "tAtyR4Q17E0",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Depose_Injectable"),

          cellProps: labelTable2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "bx2Imp5Yzuw",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "ayQp61TleuI",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "SCytLILeL3R",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "oRNIpuxO3rx",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "bx2Imp5Yzuw",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "ayQp61TleuI",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "SCytLILeL3R",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "oRNIpuxO3rx",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "bx2Imp5Yzuw",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "ayQp61TleuI",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "SCytLILeL3R",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "oRNIpuxO3rx",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "bx2Imp5Yzuw",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "ayQp61TleuI",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "SCytLILeL3R",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "oRNIpuxO3rx",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        { display: "text", text: t("IUD_"), cellProps: labelTable2_2Style },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "OvagmN5kZYp",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "mDRUz90yNBS",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "L4ngJgyyJSh",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "v0wAUejW3DY",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Fc1rIvSQxAA",
          cellProps: valueTable2_2_1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
      ],
      [
        { display: "text", text: t("Implant_"), cellProps: labelTable2_2Style },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "fxxCQH5j7cu",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "kaE666RoSB0",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "clpItQMXZfT",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "h9TYImbiQdk",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fRxPQPP9OBp",
          cellProps: valueTable2_2_1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
      ],
      [
        {
          display: "text",
          text: t("Emergency_pill"),

          cellProps: labelTable2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "pMsIub38RRC",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "yRcuPIKofP7",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "gqAUUkPKvQQ",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "IjyThCvfkyd",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "rnDH004G59G",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "pMsIub38RRC",
          cellProps: emptyStyle,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "yRcuPIKofP7",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "gqAUUkPKvQQ",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "IjyThCvfkyd",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "rnDH004G59G",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "pMsIub38RRC",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "yRcuPIKofP7",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "gqAUUkPKvQQ",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "IjyThCvfkyd",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "W0ELtxvwjdA",
          dsde: "rnDH004G59G",
          cellProps: valueTable2_2_3Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "pMsIub38RRC",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "yRcuPIKofP7",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "gqAUUkPKvQQ",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "IjyThCvfkyd",
          cellProps: valueTable2_2_4Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "rnDH004G59G",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Female_Sterilization"),
          cellProps: labelTable2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "el62zkAWxUc",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AsHfNUmeLGa",
          cellProps: emptyStyle,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },

        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },

        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },

        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
      ],
      [
        {
          display: "text",
          text: t("Male_Sterilization"),
          cellProps: labelTable2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Itl7pbKRCvw",
          cellProps: valueTable2_2_1Style,
        },

        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gxUrtdaeG2v",
          cellProps: emptyStyle,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
      ],
    ],
    []
  );
  const tableConfigs3_1 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "",
          cellProps: {
            style: {
              backgroundColor: "#99CCFF",
              minWidth: "100px",
              border: "1px solid #DDDDDD",
            },
            rowSpan: 2,
          },
        },
        {
          display: "text",
          text: t("Health_Facility"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#FFCC00",
              textAlign: "center",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
        {
          display: "text",
          text: t("Outreach_"),
          cellProps: {
            style: {
              color: "#000",
              textAlign: "center",
              backgroundColor: "#99CC99",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
        {
          display: "text",
          text: t("outsideCountry"),
          cellProps: {
            style: {
              color: "#000",
              textAlign: "center",
              backgroundColor: "#99CC99",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
      ],
      [
        {
          display: "text",
          text: t("Under_12_months"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("12_months_to_59_months"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Under_12_months"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("12_months_to_59_months"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Under_12_months"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("12_months_to_59_months"),
          cellProps: headerTable2_2_2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Children_received_deworming_tablets_helmithic_1st_round"),
          cellProps: labelTable1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "WT0nisMw0yl",
          cellProps: value1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "WT0nisMw0yl",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "WT0nisMw0yl",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Children_received_deworming_tablets_helmithic_2nd_round"),
          cellProps: labelTable1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "huihfumqv2F",
          cellProps: value1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "huihfumqv2F",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "huihfumqv2F",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Children_aged_6_11_months_received_Vitamin_A"),
          cellProps: labelTable1Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "QG0RFB0FNAV",
          cellProps: value1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "QG0RFB0FNAV",
          cellProps: value2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },

        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "QG0RFB0FNAV",
          cellProps: emptyStyle,
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
          text: t("Children_aged_12_59_months_received_Vitamin_A_1st_round"),
          cellProps: labelTable1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "CU0V0nXneSL",
          cellProps: value1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "CU0V0nXneSL",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "CU0V0nXneSL",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Children_aged_12_59_months_received_Vitamin_A_2nd_round"),
          cellProps: labelTable1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "fwIMLRx7aem",
          cellProps: value1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "fwIMLRx7aem",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "fwIMLRx7aem",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Children_under_5_years_who_recieved_growth_monitoring"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "LoRGj1dFh6X",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "LoRGj1dFh6X",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "LoRGj1dFh6X",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "LoRGj1dFh6X",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Counselling_on_nutrition_provided_to_the_parent"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "O9B1ENH7a5g",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "O9B1ENH7a5g",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "O9B1ENH7a5g",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "O9B1ENH7a5g",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("DLIP4"),
          cellProps: labelTable1Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "fhYxTECOFPG",
          cellProps: { ...value1Style, colSpan: 2 },
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "fhYxTECOFPG",
          cellProps: { ...value2Style, colSpan: 2 },
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("High_Age"),
          cellProps: {
            style: {
              backgroundColor: "#99CCFF",
              minWidth: "100px",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
          },
        },
        {
          display: "text",
          text: t("Health_Facility"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#FFCC00",
              textAlign: "center",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
        {
          display: "text",
          text: t("Outreach_"),
          cellProps: {
            style: {
              color: "#000",
              textAlign: "center",
              backgroundColor: "#99CC99",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
        {
          display: "text",
          text: t("outsideCountry"),
          cellProps: {
            style: {
              color: "#000",
              textAlign: "center",
              backgroundColor: "#99CC99",
              border: "1px solid #DDDDDD",
              fontWeight: "bold",
            },
            colSpan: 2,
          },
        },
      ],
      [
        {
          display: "text",
          text: t("Green_High_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "rUWYJuSYz8l",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "rUWYJuSYz8l",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "rUWYJuSYz8l",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "rUWYJuSYz8l",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "rUWYJuSYz8l",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "rUWYJuSYz8l",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Yellow_High_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "m3bBTxYt7gk",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "m3bBTxYt7gk",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "m3bBTxYt7gk",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "m3bBTxYt7gk",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "m3bBTxYt7gk",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "m3bBTxYt7gk",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Red_High_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "AbVeoBQBMaH",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "AbVeoBQBMaH",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "AbVeoBQBMaH",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "AbVeoBQBMaH",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "AbVeoBQBMaH",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "AbVeoBQBMaH",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Weight_Age"),
          cellProps: {
            style: {
              fontWeight: "bold",
              backgroundColor: "#99CCFF",
              minWidth: "100px",
              border: "1px solid #DDDDDD",
            },
          },
        },
        {
          display: "text",
          text: "",
          cellProps: value1Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value1Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Green_Weight_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "OXysJyDVZmg",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "OXysJyDVZmg",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "OXysJyDVZmg",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "OXysJyDVZmg",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "OXysJyDVZmg",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "OXysJyDVZmg",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Yellow_Weight_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "NkkIEskFsmV",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "NkkIEskFsmV",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "NkkIEskFsmV",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "NkkIEskFsmV",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "NkkIEskFsmV",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "NkkIEskFsmV",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Red_Weight_Age"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "EVYbaClmpIU",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "EVYbaClmpIU",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "EVYbaClmpIU",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "EVYbaClmpIU",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "EVYbaClmpIU",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "EVYbaClmpIU",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Weight_High"),
          cellProps: {
            style: {
              backgroundColor: "#99CCFF",
              fontWeight: "bold",
              minWidth: "100px",
              border: "1px solid #DDDDDD",
            },
          },
        },
        {
          display: "text",
          text: "",
          cellProps: value1Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value1Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
        {
          display: "text",
          text: "",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Green_Weight_High"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "JSevlY9b61y",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "JSevlY9b61y",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "JSevlY9b61y",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "JSevlY9b61y",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "JSevlY9b61y",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "JSevlY9b61y",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Yellow_Weight_High"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "Ix4edqrszwC",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "Ix4edqrszwC",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "Ix4edqrszwC",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "Ix4edqrszwC",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "Ix4edqrszwC",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "Ix4edqrszwC",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Red_Weight_High"),
          cellProps: labelTable1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "xp6YPoDKUe4",
          dsde: "lkPUtglo3SP",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "jD0Cf8zYYbV",
          dsde: "lkPUtglo3SP",
          cellProps: value1Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "TV90yPZi9iy",
          dsde: "lkPUtglo3SP",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "myQ7981H7vs",
          dsde: "lkPUtglo3SP",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "DZe5rBKnSh4",
          dsde: "lkPUtglo3SP",
          cellProps: value2Style,
        },
        {
          cc: "ekxx48xH3oc",
          coc: "l3K3TGCSdKW",
          dsde: "lkPUtglo3SP",
          cellProps: value2Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Weekly_IFA_pills_for_12_44_year_female"),
          cellProps: {
            style: {
              backgroundColor: "#99CCFF",
              minWidth: "100px",
              fontWeight: "bold",
              border: "1px solid #DDDDDD",
            },
          },
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "WAL7FPoeocd",
          cellProps: { ...value1Style, colSpan: 2 },
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "WAL7FPoeocd",
          cellProps: { ...value2Style, colSpan: 2 },
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "z1oXoHKWhla",
          dsde: "WAL7FPoeocd",
          cellProps: { ...value2Style, colSpan: 2 },
        },
      ],
    ],
    []
  );
  const headerTab1 = (index) => (
    <Table
      className={"mch-v2-table-1"}
      id={`mch-v2-table-1-${index + 1}`}
      stickyHeader
    >
      <TableHead>
        <TableRow>
          {header1Table.map((header, i) => (
            <>
              {i === 0 && (
                <TableCell
                  className="cell-header-table"
                  sx={{ width: widthColumns[0], backgroundColor: "#99ccff" }}
                >
                  {headerTittleTable[index]}
                </TableCell>
              )}
              <TableCell
                className="cell-header-table"
                sx={{
                  width: widthColumns[i],
                  textAlign: "center",
                  backgroundColor: i === 0 ? "#FFCC00" : "#99CC99",
                }}
              >
                {header}
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <MapTable
          dataElementConfigs={tableConfigs1[index].map((item, itemIndex) => {
            return [
              {
                ...item.slice(0, 1)[0],
                onClick: (e) => {
                  let startIndex = 0;
                  if (i18n.language === "lo") {
                    startIndex = 4;
                  }
                  const head = `${
                    mappingPopup.tab1[index][itemIndex].value[startIndex]
                  } ${
                    mappingPopup.tab1[index][itemIndex].value[startIndex + 1]
                      ? `(${
                          mappingPopup.tab1[index][itemIndex].value[
                            startIndex + 1
                          ]
                        })`
                      : ""
                  } `;
                  const content = `${
                    mappingPopup.tab1[index][itemIndex].value[startIndex + 2]
                  }`;
                  const source = `${
                    mappingPopup.tab1[index][itemIndex].value[startIndex + 3]
                  }`;

                  setAnchorEl(e.currentTarget);
                  setPopupContent({ head, content, source });
                },
              },
              ...item.slice(1, item.length),
            ];
          })}
        />
      </TableBody>
    </Table>
  );
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box id="mch-v2-form-container" className="custom-form">
      <CustomPopup
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        content={popupContent}
      />
      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="basic tabs example"
        >
          <StyledTab label={t("ANC_DELIVERY_PNC_MORTALITY")} />
          <StyledTab label={t("Family_Planing")} />
          <StyledTab label={t("EPI_")} />
          <StyledTab label={t("Nutrition_")} />
        </StyledTabs>

        <TabPanel value={tabIndex} index={0}>
          <Box id="mch-v2-table-1" className="mch-v2-table">
            <Typography className="header-table-1">
              {t("ANC_DELIVERY_PNC_MORTALITY")}
            </Typography>
            {headerTittleTable.map((header, index) => headerTab1(index))}
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Box className="mch-v2-table">
            <Table id="mch-v2-table-2">
              <TableHead>
                <TableRow>
                  <TableCell className="cell-header-table" colSpan={21}>
                    {t("E_Family_Planing")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs2.map((item, index) => {
                    if (index === 1) {
                      return [
                        ...item.slice(0, 5).map((col, itemIndex) => {
                          return {
                            ...col,
                            onClick: (e) => {
                              let startIndex = 0;
                              if (i18n.language === "lo") {
                                startIndex = 4;
                              }
                              const head = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex
                                ]
                              } ${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 1
                                ]
                                  ? `(${
                                      mappingPopup.tab2[0][itemIndex].value[
                                        startIndex + 1
                                      ]
                                    })`
                                  : ""
                              } `;
                              const content = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 2
                                ]
                              }`;
                              const source = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 3
                                ]
                              }`;

                              setAnchorEl(e.currentTarget);
                              setPopupContent({ head, content, source });
                            },
                          };
                        }),
                        ...item.slice(5, 10).map((col, itemIndex) => {
                          return {
                            ...col,
                            onClick: (e) => {
                              let startIndex = 0;
                              if (i18n.language === "lo") {
                                startIndex = 4;
                              }
                              const head = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex
                                ]
                              } ${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 1
                                ]
                                  ? `(${
                                      mappingPopup.tab2[0][itemIndex].value[
                                        startIndex + 1
                                      ]
                                    })`
                                  : ""
                              } `;
                              const content = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 2
                                ]
                              }`;
                              const source = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 3
                                ]
                              }`;

                              setAnchorEl(e.currentTarget);
                              setPopupContent({ head, content, source });
                            },
                          };
                        }),
                        ...item.slice(10, 15).map((col, itemIndex) => {
                          return {
                            ...col,
                            onClick: (e) => {
                              let startIndex = 0;
                              if (i18n.language === "lo") {
                                startIndex = 4;
                              }
                              const head = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex
                                ]
                              } ${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 1
                                ]
                                  ? `(${
                                      mappingPopup.tab2[0][itemIndex].value[
                                        startIndex + 1
                                      ]
                                    })`
                                  : ""
                              } `;
                              const content = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 2
                                ]
                              }`;
                              const source = `${
                                mappingPopup.tab2[0][itemIndex].value[
                                  startIndex + 3
                                ]
                              }`;

                              setAnchorEl(e.currentTarget);
                              setPopupContent({ head, content, source });
                            },
                          };
                        }),
                      ];
                    }
                    if (item.find((col) => col.dsde)) {
                      return [
                        {
                          ...item.slice(0, 1)[0],
                          onClick: (e) => {
                            let startIndex = 0;
                            if (i18n.language === "lo") {
                              startIndex = 4;
                            }
                            const head = `${
                              mappingPopup.tab2[1][index - 2].value[startIndex]
                            } ${
                              mappingPopup.tab2[1][index - 2].value[
                                startIndex + 1
                              ]
                                ? `(${
                                    mappingPopup.tab2[1][index - 2].value[
                                      startIndex + 1
                                    ]
                                  })`
                                : ""
                            } `;
                            const content = `${
                              mappingPopup.tab2[1][index - 2].value[
                                startIndex + 2
                              ]
                            }`;
                            const source = `${
                              mappingPopup.tab2[1][index - 2].value[
                                startIndex + 3
                              ]
                            }`;

                            setAnchorEl(e.currentTarget);
                            setPopupContent({ head, content, source });
                          },
                        },
                        ...item.slice(1, item.length),
                      ];
                    }
                    return item;
                  })}
                />
              </TableBody>
            </Table>
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Box id="mch-v2-table-3" className="mch-v2-table">
            <Typography style={{ fontWeight: "bold", color: "blue" }}>
              EPI data elements has been moved to EPI dataset
              <br />
              ຫົວຂໍ້ສັກຢາກັນພະຍາດໄດ້ແຍກອອກເປັນແບບຟອມໜຶ່ງອີກຕ່າງຫາກ ຊື່ວ່າ: EPI -
              ແບບຟອມສັກຢາກັນພະຍາດ
            </Typography>
            <img
              src="https://media.giphy.com/media/l4EoPxbBiBs19ngas/giphy.gif"
              alt="GIF"
            />
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Box id="mch-v2-table-4" className="mch-v2-table">
            <Table id="mch-v2-table-4-1">
              <TableHead>
                <TableRow>
                  <TableCell className="cell-header-table" colSpan={21}>
                    {t("H_Growth_monitoring_and_nutrition")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_1.map((item, index) => {
                    if (!item.find((col) => col.dsde)) {
                      return item;
                    }
                    if (index < 10) {
                      return [
                        {
                          ...item.slice(0, 1)[0],
                          onClick: (e) => {
                            let startIndex = 0;
                            if (i18n.language === "lo") {
                              startIndex = 4;
                            }
                            const head = `${
                              mappingPopup.tab4[0][index - 2].value[startIndex]
                            } ${
                              mappingPopup.tab4[0][index - 2].value[
                                startIndex + 1
                              ]
                                ? `(${
                                    mappingPopup.tab4[0][index - 2].value[
                                      startIndex + 1
                                    ]
                                  })`
                                : ""
                            } `;
                            const content = `${
                              mappingPopup.tab4[0][index - 2].value[
                                startIndex + 2
                              ]
                            }`;
                            const source = `${
                              mappingPopup.tab4[0][index - 2].value[
                                startIndex + 3
                              ]
                            }`;

                            setAnchorEl(e.currentTarget);
                            setPopupContent({ head, content, source });
                          },
                        },
                        ...item.slice(1),
                      ];
                    }
                    if (index < 14) {
                      return [
                        {
                          ...item.slice(0, 1)[0],
                          onClick: (e) => {
                            let startIndex = 0;
                            if (i18n.language === "lo") {
                              startIndex = 4;
                            }
                            const head = `${
                              mappingPopup.tab4[1][index - 11].value[startIndex]
                            } ${
                              mappingPopup.tab4[1][index - 11].value[
                                startIndex + 1
                              ]
                                ? `(${
                                    mappingPopup.tab4[1][index - 11].value[
                                      startIndex + 1
                                    ]
                                  })`
                                : ""
                            } `;
                            const content = `${
                              mappingPopup.tab4[1][index - 11].value[
                                startIndex + 2
                              ]
                            }`;
                            const source = `${
                              mappingPopup.tab4[1][index - 11].value[
                                startIndex + 3
                              ]
                            }`;

                            setAnchorEl(e.currentTarget);
                            setPopupContent({ head, content, source });
                          },
                        },
                        ...item.slice(1),
                      ];
                    }
                    if (index < 18) {
                      return [
                        {
                          ...item.slice(0, 1)[0],
                          onClick: (e) => {
                            let startIndex = 0;
                            if (i18n.language === "lo") {
                              startIndex = 4;
                            }
                            const head = `${
                              mappingPopup.tab4[2][index - 15].value[startIndex]
                            } ${
                              mappingPopup.tab4[2][index - 15].value[
                                startIndex + 1
                              ]
                                ? `(${
                                    mappingPopup.tab4[2][index - 15].value[
                                      startIndex + 1
                                    ]
                                  })`
                                : ""
                            } `;
                            const content = `${
                              mappingPopup.tab4[2][index - 15].value[
                                startIndex + 2
                              ]
                            }`;
                            const source = `${
                              mappingPopup.tab4[2][index - 15].value[
                                startIndex + 3
                              ]
                            }`;

                            setAnchorEl(e.currentTarget);
                            setPopupContent({ head, content, source });
                          },
                        },
                        ...item.slice(1),
                      ];
                    }
                    if (index < 22) {
                      return [
                        {
                          ...item.slice(0, 1)[0],
                          onClick: (e) => {
                            let startIndex = 0;
                            if (i18n.language === "lo") {
                              startIndex = 4;
                            }
                            const head = `${
                              mappingPopup.tab4[3][index - 19].value[startIndex]
                            } ${
                              mappingPopup.tab4[3][index - 19].value[
                                startIndex + 1
                              ]
                                ? `(${
                                    mappingPopup.tab4[3][index - 19].value[
                                      startIndex + 1
                                    ]
                                  })`
                                : ""
                            } `;
                            const content = `${
                              mappingPopup.tab4[3][index - 19].value[
                                startIndex + 2
                              ]
                            }`;
                            const source = `${
                              mappingPopup.tab4[3][index - 19].value[
                                startIndex + 3
                              ]
                            }`;

                            setAnchorEl(e.currentTarget);
                            setPopupContent({ head, content, source });
                          },
                        },
                        ...item.slice(1),
                      ];
                    }
                    return [
                      {
                        ...item.slice(0, 1)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab4[4][index - 22].value[startIndex]
                          } ${
                            mappingPopup.tab4[4][index - 22].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab4[4][index - 22].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab4[4][index - 22].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab4[4][index - 22].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(1),
                    ];
                  })}
                />
              </TableBody>
            </Table>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default MchV2;
