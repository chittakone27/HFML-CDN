import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  Tabs,
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MapTable from "../common/MapTable";
import { useTranslation } from "react-i18next";
import "./mch-v21.css";

import CustomPopup from "../common/Popup/Popup";
import { mappingPopup } from "./mappingPopup";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { saveDataValue } from "@/api/icapture/dataValue";
import { StyledTab, StyledTabs, TabPanel } from "../common/Tab";

const TotalCell = ({ listData, save = null }) => {
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const period = useSelectionStore((state) => state.period, shallow);
  const dataValues = useDataEntryStore((state) => state.dataValues, shallow);
  const setDataValue = useDataEntryStore(
    (state) => state.actions.setDataValue,
    shallow
  );
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );

  const result = useMemo(
    () =>
      listData.reduce(
        (prev, curr) =>
          prev +
          (dataValues[`${curr}-${orgUnit.id}-${attributeOptionCombo.id}`]
            ?.value * 1 || 0),
        0
      ),
    [
      ...listData.map(
        (item) =>
          dataValues[`${item}-${orgUnit.id}-${attributeOptionCombo.id}`]?.value
      ),
    ]
  );

  useEffect(() => {
    if (
      save &&
      dataValues[
        `${save.dsde}-${save.coc}-${orgUnit.id}-${attributeOptionCombo.id}`
      ]?.value *
        1 !==
        result
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

const MchV21 = () => {
  const { t, i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const header1Table = [
    t("No"),
    t("Health_Facility"),
    t("Outreach_"),
    t("Outside_country_"),
    t("Total_"),
  ];
  const headerTittleTable = [
    t("A_ANC"),
    t("B_Delivery"),
    t("C_PNC"),
    t("D_Abortion"),
    t("E_Cervical_screening"),
    t("F_MORTALITY_REPORT"),
  ];
  const widthColumns = {
    0: "7%",
    1: "15%",
    2: "15%",
    3: "15%",
    4: "7%",
  };

  const numberTable1Style = {
    style: {
      backgroundColor: "#E9F3FC",
      border: "1px solid #C0C0C0",
      height: "40px",
      color: "#000",
      textAlign: "center",
    },
  };
  const labelTable1Style = {
    style: {
      backgroundColor: "#C8E3FD",
      border: "1px solid #C0C0C0",
      color: "#000",
      fontWeight: "bold",
    },
  };

  const value1Style = {
    style: {
      backgroundColor: "#FFEA99",
      border: "1px solid #C0C0C0",
      width: "250px",
      height: "40px",
      textAlign: "center",
    },
  };
  const value2Style = {
    style: {
      backgroundColor: "#E0EFE0",
      border: "1px solid #C0C0C0",
      width: "250px",
      textAlign: "center",
    },
  };
  // const value3Style = {
  //   style: {
  //     backgroundColor: "#E1F5FE",
  //     width: "250px",
  //     textAlign: "center",
  //   },
  // };
  const labelTable2_1Style = {
    style: {
      backgroundColor: "#CAE5FF",
      color: "#000",
      fontWeight: "bold",
    },
  };
  const valueTable2_1Style = {
    style: {
      backgroundColor: "#FFEA99",
      width: "250px",
      textAlign: "center",
    },
  };
  const labelTable2_2Style = {
    style: {
      color: "#000",
      width: "12%",
      fontWeight: "bold",
      backgroundColor: "#CAE5FF",
      border: "1px solid #C0C0C0",
    },
  };
  const headerTable2_2_1Style = {
    style: {
      color: "#000",
      backgroundColor: "#FFE066",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };

  const headerTable2_2_2Style = {
    style: {
      color: "#000",
      backgroundColor: "#B7DBB7",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };
  const headerTable2_2_3Style = {
    style: {
      color: "#000",
      backgroundColor: "#EFD2E4",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };
  const headerTable2_2_4Style = {
    style: {
      color: "#000",
      backgroundColor: "#AEFBEE",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };
  const valueTable2_2_1Style = {
    style: {
      color: "#000",
      backgroundColor: "#FFE066",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };

  const valueTable2_2_2Style = {
    style: {
      color: "#000",
      backgroundColor: "#B7DBB7",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };
  const valueTable2_2_3Style = {
    style: {
      color: "#000",
      backgroundColor: "#EFD2E4",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };
  const valueTable2_2_4Style = {
    style: {
      color: "#000",
      backgroundColor: "#AEFBEE",
      fontWeight: "bold",
      textAlign: "center",
      paddingBlock: "20px",
      border: "1px solid #C0C0C0",
    },
  };

  const numberTable4Style = {
    style: {
      width: "4%",
      height: "40px",
      backgroundColor: "#55B7F8",
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
    },
  };
  const numberTotal4Style = {
    style: {
      width: "68%",
      backgroundColor: "#F4F9FF",
      color: "#000",
      textAlign: "center",
    },
  };
  const labelTable4Style = {
    style: {
      width: "62%",
      backgroundColor: "#C8FAFA",
      color: "#000",
      fontWeight: "bold",
    },
  };
  const valueTable4Style = {
    style: {
      width: "17%",
      backgroundColor: "#E0EFE0",
      color: "#000",
      textAlign: "center",
    },
  };
  const emptyStyle = {
    style: {
      backgroundColor: "#AAB6A2",
      border: "1px solid #C0C0C0",
    },
  };
  const disableCell = {
    backgroundColor: "#DDD !important",
  };
  const tableConfigs1 = useMemo(
    () => [
      [
        [
          { display: "text", text: "1", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_under_15y"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "xzQXZdMiKSl",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "xzQXZdMiKSl",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "2", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_15-19y"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "F6rPcRjasK0",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "F6rPcRjasK0",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "3", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_total_visit"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "Ho8cqrO9KYz",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "Ho8cqrO9KYz",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "4", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_1st_less_12weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "XgrxUnDXs6U",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "XgrxUnDXs6U",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "5", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_1st_more_12weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "ECEmqy4HAli",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "ECEmqy4HAli",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "6", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_1st_visit"),
            cellProps: labelTable1Style,
          },
          {
            display: "text",
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "h8KiBz2888q",
            cellProps: value1Style,
            customCell: (
              <TotalCell
                listData={[
                  "XgrxUnDXs6U-eFXrDqXA2WQ",
                  "ECEmqy4HAli-eFXrDqXA2WQ",
                ]}
                save={{ coc: "eFXrDqXA2WQ", dsde: "h8KiBz2888q" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "XgrxUnDXs6U-eFXrDqXA2WQ",
                "ECEmqy4HAli-eFXrDqXA2WQ",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "h8KiBz2888q",
            cellProps: value2Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "XgrxUnDXs6U-BaKsAyoQBud",
                  "ECEmqy4HAli-BaKsAyoQBud",
                ]}
                save={{ coc: "BaKsAyoQBud", dsde: "h8KiBz2888q" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "XgrxUnDXs6U-BaKsAyoQBud",
                "ECEmqy4HAli-BaKsAyoQBud",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "7", cellProps: numberTable1Style },
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
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "8", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pregnant_anemia_tested"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "KL68GzMoyDt",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "KL68GzMoyDt",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "9", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pregnant_anemia_test"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "pdQhYStFRPS",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "10", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pregnant_received_IFA90"),
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
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "11", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("ANC_36_or_more_than_36weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "GNTYsJxDwzY",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "GNTYsJxDwzY",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "12", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "L2kK7cU9dsa",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "13", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pregnant_women_received_Pay_ANC"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "gAsGiy9fOob",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
      [
        [
          { display: "text", text: "14", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Total_SBA"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tqZ",
            coc: "eFXrDqXA2WQ",
            dsde: "CyUEAFiwGTS",
            cellProps: value1Style,
            display: "text",
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
            getText: (dataValues, orgUnit) => {
              const listData = [
                "amPLatG4bO9-eFXrDqXA2WQ",
                "K7dF5mpEqyO-eFXrDqXA2WQ",
                "di2GiKSQ3wV-eFXrDqXA2WQ",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tqZ",
            coc: "BaKsAyoQBud",
            dsde: "CyUEAFiwGTS",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tqZ",
            coc: "z1oXoHKWhla",
            dsde: "CyUEAFiwGTS",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "15", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Vaginal_delivery"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "amPLatG4bO9",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "16", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Delivery_equipment"),
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
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "17", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Cesarean_section"),
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
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "18", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Delivery_under_15y"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "qLQbexagIeh",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "qLQbexagIeh",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "19", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Delivery_15-19y"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "u0ftFLN3SZJ",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "u0ftFLN3SZJ",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "20", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Women_receiveed_oxytocin"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "pesiJQ8oAE9",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "pesiJQ8oAE9",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "21", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pregnant_gestational"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "mcDM4AdUT1C",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "22", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Newborn_weight_under_2500g"),
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
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "23", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Newborn_weith_over_equal"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "WMXn3JXIjCB",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "WMXn3JXIjCB",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "WMXn3JXIjCB",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "24", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Newborn_congenital_anomality"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "ye2DITOG4Er",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "ye2DITOG4Er",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "ye2DITOG4Er",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "25", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Number_of_still_birth"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "PGaxoLVKaCz",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "PGaxoLVKaCz",
            cellProps: value2Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "PGaxoLVKaCz",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "26", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Number_of_livebirth"),
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
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "27", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Newborn_breastfeeding_90min"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "FObUs9796lh",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "28", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("skin_to_skin_complete_90min"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "SgS177qSLoX",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "29", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("skin_to_skin_least_90min"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "YEEdytYpFBD",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "30", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Free_delivery"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "HuDeipBbwsg",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "HuDeipBbwsg",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "31", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pay_delivery"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "zYqztBZLxa6",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "zYqztBZLxa6",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
      [
        [
          { display: "text", text: "32", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("PNC_visit"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "SJVjs8apJ4m",
            cellProps: value1Style,
            display: "text",
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "SJVjs8apJ4m",
            cellProps: value2Style,
            display: "text",
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "33", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("PNC_24h"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "YGCppMuus46",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "YGCppMuus46",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "34", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("PNC_6weeks"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "HePXRjficGe",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "HePXRjficGe",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "35", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("IFA_90tablets"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "cPWQO9XczcB",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "cPWQO9XczcB",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "36", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Newborn_exclusively_breastfed"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "vGRe0fLGAn3",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "37", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Free_PNC"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "zpyx8FFz9S9",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "zpyx8FFz9S9",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "38", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pay_PNC"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "fClAoyIr2nS",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
      [
        [
          { display: "text", text: "39", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Abortions_number"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "L08KyRHC8XA",
            cellProps: value1Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "CVl2SqGtDNt-eFXrDqXA2WQ",
                  "z5ZF790LT9V-eFXrDqXA2WQ",
                ]}
                save={{ coc: "eFXrDqXA2WQ", dsde: "L08KyRHC8XA" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "CVl2SqGtDNt-eFXrDqXA2WQ",
                "z5ZF790LT9V-eFXrDqXA2WQ",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "L08KyRHC8XA",
            cellProps: value2Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "CVl2SqGtDNt-BaKsAyoQBud",
                  "z5ZF790LT9V-BaKsAyoQBud",
                ]}
                save={{ coc: "BaKsAyoQBud", dsde: "L08KyRHC8XA" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "CVl2SqGtDNt-BaKsAyoQBud",
                "z5ZF790LT9V-BaKsAyoQBud",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "40", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Abortion_spontaneous"),
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
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "41", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Abortion_induced"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "z5ZF790LT9V",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "z5ZF790LT9V",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "42", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Abortion_misoprotol_mifepristone"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "FJRQNgdlFaW",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "FJRQNgdlFaW",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "43", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Abortion_EVA_MVA"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "x7HWppZv8OR",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "x7HWppZv8OR",
            cellProps: value2Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "44", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Free_abortion_care"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "frQZka5uqnG",
            cellProps: value1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "frQZka5uqnG",
            cellProps: value2Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "45", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Pay_abortion_care"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "V9hce6FQ8A1",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
      [
        [
          { display: "text", text: "46", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Cervical_VIA"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "jTXF7SbbKus",
            cellProps: value1Style,
          },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "47", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("25-49_Cervical_VIA"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "C9bsbdaLFTA",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "48", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Cervical_VIA_positive"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "xEHooC68ALt",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "49", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("VIA_Received_Cryyotherapy"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "rhIDAEuPIwH",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "50", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Cervical_treated_LEEP"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "coAPV1s0SiV",
            cellProps: value1Style,
          },

          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "", cellProps: emptyStyle },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
      [
        [
          { display: "text", text: "51", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "dJhWRKs0fcq",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "52", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "sISjKc2LEDg",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "53", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "FSLrz90vXKf",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "54", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "nCl4K1S3efY",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "55", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Total_number_of_Infant_under_1_year_of_age_deaths"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "cPcvesqWRtH",
            cellProps: value1Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-eFXrDqXA2WQ",
                  "FSLrz90vXKf-eFXrDqXA2WQ",
                  "nCl4K1S3efY-eFXrDqXA2WQ",
                ]}
                save={{
                  coc: "eFXrDqXA2WQ",
                  dsde: "cPcvesqWRtH",
                }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-eFXrDqXA2WQ",
                "FSLrz90vXKf-eFXrDqXA2WQ",
                "nCl4K1S3efY-eFXrDqXA2WQ",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "cPcvesqWRtH",
            cellProps: value2Style,
            display: "text",
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
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-BaKsAyoQBud",
                "FSLrz90vXKf-BaKsAyoQBud",
                "nCl4K1S3efY-BaKsAyoQBud",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "cPcvesqWRtH",
            cellProps: value2Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-z1oXoHKWhla",
                  "FSLrz90vXKf-z1oXoHKWhla",
                  "nCl4K1S3efY-z1oXoHKWhla",
                ]}
                save={{ coc: "z1oXoHKWhla", dsde: "cPcvesqWRtH" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-z1oXoHKWhla",
                "FSLrz90vXKf-z1oXoHKWhla",
                "nCl4K1S3efY-z1oXoHKWhla",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "56", cellProps: numberTable1Style },
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
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "kyVKK0JcRPJ",
            cellProps: value2Style,
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
        [
          { display: "text", text: "57", cellProps: numberTable1Style },
          {
            display: "text",
            text: t("Under_5_Deaths"),
            cellProps: labelTable1Style,
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "eFXrDqXA2WQ",
            dsde: "cwhEsbBe6Zs",
            cellProps: value1Style,
            display: "text",
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
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-eFXrDqXA2WQ",
                "FSLrz90vXKf-eFXrDqXA2WQ",
                "nCl4K1S3efY-eFXrDqXA2WQ",
                "kyVKK0JcRPJ-eFXrDqXA2WQ",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "BaKsAyoQBud",
            dsde: "cwhEsbBe6Zs",
            cellProps: value2Style,
            display: "text",
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
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-BaKsAyoQBud",
                "FSLrz90vXKf-BaKsAyoQBud",
                "nCl4K1S3efY-BaKsAyoQBud",
                "kyVKK0JcRPJ-BaKsAyoQBud",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          {
            cc: "FU2zdnyL2tq",
            coc: "z1oXoHKWhla",
            dsde: "cwhEsbBe6Zs",
            cellProps: value2Style,
            display: "text",
            customCell: (
              <TotalCell
                listData={[
                  "sISjKc2LEDg-z1oXoHKWhla",
                  "FSLrz90vXKf-z1oXoHKWhla",
                  "nCl4K1S3efY-z1oXoHKWhla",
                  "kyVKK0JcRPJ-z1oXoHKWhla",
                ]}
                save={{ coc: "z1oXoHKWhla", dsde: "cwhEsbBe6Zs" }}
              />
            ),
            getText: (dataValues, orgUnit) => {
              const listData = [
                "sISjKc2LEDg-z1oXoHKWhla",
                "FSLrz90vXKf-z1oXoHKWhla",
                "nCl4K1S3efY-z1oXoHKWhla",
                "kyVKK0JcRPJ-z1oXoHKWhla",
              ];
              return listData.reduce(
                (prev, curr) =>
                  prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                0
              );
            },
          },
          { display: "text", text: "0", cellProps: numberTable1Style },
        ],
      ],
    ],
    []
  );
  const tableConfigs2_1 = useMemo(
    () => [
      [
        {
          display: "text",
          text: t("service_users_aged_less_than_15y"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "R53nrzxKa2W",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("service_users_aged_15-19y"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "GO1VVXPBbpg",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("service_users_aged_20-24y"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "YavwgTqN3YJ",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("service_users_aged_25y"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "wnJq2lf6YCO",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("contraceptive_use_after_delivery"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "f6BmzP1Uaeh",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("contraceptive_use_after_abortion"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AvGolpLGNDp",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("women_aged_under_25y_received_weekly_Iron"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "QcYTIWzzNTq",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("number_implant_removal"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "FiJCOZzvGSj",
          cellProps: valueTable2_1Style,
        },
      ],
      [
        {
          display: "text",
          text: t("number_of_IUD_removal"),
          cellProps: labelTable2_1Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "V5EW225gjrg",
          cellProps: valueTable2_1Style,
        },
      ],
    ],
    []
  );
  const tableConfigs2_2 = useMemo(
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
              border: "1px solid #C0C0C0",
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
              border: "1px solid #C0C0C0",
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
              border: "1px solid #C0C0C0",
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
              border: "1px solid #C0C0C0",
              textAlign: "center",
            },
            colSpan: 4,
          },
        },
        {
          display: "text",
          text: t("Outside_country_"),
          cellProps: {
            style: {
              color: "#000",
              backgroundColor: "#61F7DE",
              fontWeight: "bold",
              border: "1px solid #C0C0C0",
              textAlign: "center",
            },
          },
        },
      ],
      [
        {
          display: "text",
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_1Style,
        },
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
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
          text: t("New_user_number_of_couple"),
          cellProps: headerTable2_2_2Style,
        },
        {
          display: "text",
          text: t("Old_user_number_of_couple"),
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
          text: t("New_user_number_of_couple"),
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
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_1Style,
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
          dsde: "m2V4dUljQVq",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "bM0YZOyAlMr",
          cellProps: valueTable2_2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
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
        { display: "text", text: "", cellProps: emptyStyle },

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
        { display: "text", text: "", cellProps: emptyStyle },
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
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_1Style,
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
          dsde: "whoq3P3gtyc",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "VPbIDh5HeVc",
          cellProps: valueTable2_2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },

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
        { display: "text", text: "", cellProps: emptyStyle },

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
        { display: "text", text: "", cellProps: emptyStyle },
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
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_1Style,
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
          dsde: "kUIvo5is72S",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "sa8Ep87YPNv",
          cellProps: valueTable2_2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
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
        { display: "text", text: "", cellProps: emptyStyle },
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
        { display: "text", text: "", cellProps: emptyStyle },
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
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_1Style,
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
          dsde: "QFWbdLref5O",
          cellProps: valueTable2_2_2Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "ym41uKo2JHl",
          dsde: "bx2Imp5Yzuw",
          cellProps: valueTable2_2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
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
        { display: "text", text: "", cellProps: emptyStyle },
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
        { display: "text", text: "", cellProps: emptyStyle },
      ],
      [
        { display: "text", text: t("IUD_"), cellProps: labelTable2_2Style },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "mDRUz90yNBS",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "OvagmN5kZYp",
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

        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "mDRUz90yNBS",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        { display: "text", text: t("Implant_"), cellProps: labelTable2_2Style },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "kaE666RoSB0",
          cellProps: valueTable2_2_1Style,
        },
        {
          cc: "kinUqU9ASfo",
          coc: "i7WPuiegoQn",
          dsde: "fxxCQH5j7cu",
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

        {
          cc: "kinUqU9ASfo",
          coc: "ALMMnjwMWQI",
          dsde: "kaE666RoSB0",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Emergency_pill"),

          cellProps: labelTable2_2Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },

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

        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },

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
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
        { display: "text", text: "", cellProps: emptyStyle },
      ],
      [
        {
          display: "text",
          text: t("Female_Sterilization"),
          cellProps: labelTable2_2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "el62zkAWxUc",
          cellProps: valueTable2_2_1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "AsHfNUmeLGa",
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

        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "y6wocX8RjXZ",
          cellProps: valueTable2_2_4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Male_Sterilization"),
          cellProps: labelTable2_2Style,
        },
        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "Itl7pbKRCvw",
          cellProps: valueTable2_2_1Style,
        },
        { display: "text", text: "", cellProps: emptyStyle },

        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "gxUrtdaeG2v",
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

        {
          cc: "TiHjDIadDIL",
          coc: "lmbxvugTvKr",
          dsde: "fmxvrYws8Id",
          cellProps: valueTable2_2_4Style,
        },
      ],
    ],
    []
  );

  const tableConfigs3_1 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "1",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_1"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "OORTxZP4Rqd",
          cellProps: valueTable4Style,
          display: "text",
          customCell: (
            <TotalCell
              listData={["SJE2kiNeRRG-eFXrDqXA2WQ", "XtBTDHZl7zM-eFXrDqXA2WQ"]}
              save={{ coc: "eFXrDqXA2WQ", dsde: "OORTxZP4Rqd" }}
            />
          ),
          getText: (dataValues, orgUnit) => {
            const listData = [
              "SJE2kiNeRRG-eFXrDqXA2WQ",
              "XtBTDHZl7zM-eFXrDqXA2WQ",
            ];
            return listData.reduce(
              (prev, curr) =>
                prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
              0
            );
          },
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "OORTxZP4Rqd",
          cellProps: valueTable4Style,
          display: "text",
          customCell: (
            <TotalCell
              listData={["SJE2kiNeRRG-BaKsAyoQBud", "XtBTDHZl7zM-BaKsAyoQBud"]}
              save={{ coc: "BaKsAyoQBud", dsde: "OORTxZP4Rqd" }}
            />
          ),
          getText: (dataValues, orgUnit) => {
            const listData = [
              "SJE2kiNeRRG-BaKsAyoQBud",
              "XtBTDHZl7zM-BaKsAyoQBud",
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
          text: "2",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_2"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "SJE2kiNeRRG",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "SJE2kiNeRRG",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "3",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_3"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "XtBTDHZl7zM",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "XtBTDHZl7zM",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "4",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_4"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "sfjQ42ahvLG",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "sfjQ42ahvLG",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "5",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_5"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "O3BgRUD6m6g",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "O3BgRUD6m6g",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_2 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "6",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_6"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "omOfTwC9flb",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "omOfTwC9flb",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "7",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_7"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "gcXpxfNDKao",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "gcXpxfNDKao",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "8",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_8"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "TbTloIy2qfR",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "TbTloIy2qfR",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Total_"),
          cellProps: { ...numberTotal4Style, colSpan: 2 },
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_3 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "9",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_9"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "aGFN2oaHKVq",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "aGFN2oaHKVq",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "10",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_10"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "zLNH4Dl6way",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "zLNH4Dl6way",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "11",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_11"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "NPlXWzPJwvB",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "NPlXWzPJwvB",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "12",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_12"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "CeqpJXCvqbq",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "CeqpJXCvqbq",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "13",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_13-0"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "fmVu20eILnF",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "fmVu20eILnF",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "14",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_12-3"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "Ut4nD9RfMuy",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "Ut4nD9RfMuy",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "15",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_13"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "TXpzfQQNJXi",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "TXpzfQQNJXi",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Total_"),
          cellProps: { ...numberTotal4Style, colSpan: 2 },
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_4 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "16",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_14"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "b8PK7fYwfcQ",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "b8PK7fYwfcQ",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "17",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_15"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "WFrkgJeekwS",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "WFrkgJeekwS",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "18",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_16"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "SjJ7sO2ELzv",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "SjJ7sO2ELzv",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: t("Total_"),
          cellProps: { ...numberTotal4Style, colSpan: 2 },
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
        {
          display: "text",
          text: "0",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_5 = useMemo(
    () => [
      // [
      //   {
      //     display: "text",
      //     text: "19",
      //     cellProps: numberTable4Style,
      //   },
      //   {
      //     display: "text",
      //     text: t("Well_Child_Health_17"),
      //     cellProps: labelTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "eFXrDqXA2WQ",
      //     dsde: "i8QjplDTQe4",
      //     cellProps: valueTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "BaKsAyoQBud",
      //     dsde: "i8QjplDTQe4",
      //     cellProps: valueTable4Style,
      //   },
      // ],
      // [
      //   {
      //     display: "text",
      //     text: "20",
      //     cellProps: numberTable4Style,
      //   },
      //   {
      //     display: "text",
      //     text: t("Well_Child_Health_18"),
      //     cellProps: labelTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "eFXrDqXA2WQ",
      //     dsde: "Kp9r0SVUahF",
      //     cellProps: valueTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "BaKsAyoQBud",
      //     dsde: "Kp9r0SVUahF",
      //     cellProps: valueTable4Style,
      //   },
      // ],
      [
        {
          display: "text",
          text: "19",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_19"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "l6lv0UDtPfc",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "l6lv0UDtPfc",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "20",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_20"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "bzsSenD9Y9L",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "bzsSenD9Y9L",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "21",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_21"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "aqeonckIBBM",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "aqeonckIBBM",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_6 = useMemo(
    () => [
      // [
      //   {
      //     display: "text",
      //     text: "22",
      //     cellProps: numberTable4Style,
      //   },
      //   {
      //     display: "text",
      //     text: t("Well_Child_Health_23"),
      //     cellProps: labelTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "eFXrDqXA2WQ",
      //     dsde: "a2V0q9vqML6",
      //     cellProps: valueTable4Style,
      //   },
      //   {
      //     cc: "FU2zdnyL2tq",
      //     coc: "BaKsAyoQBud",
      //     dsde: "a2V0q9vqML6",
      //     cellProps: valueTable4Style,
      //   },
      // ],
      [
        {
          display: "text",
          text: "22",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_24"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "vTDYCAV1vHn",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "vTDYCAV1vHn",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "23",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_25"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "aAb0BiPPRI1",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "aAb0BiPPRI1",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_7 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "24",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_27"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "cAH5z9yrHCi",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "cAH5z9yrHCi",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "25",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_28"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "v68nVurxQsu",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "v68nVurxQsu",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "26",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_29"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "Wcwf4W68H5L",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "Wcwf4W68H5L",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "27",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_30"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "S39WhlGEzmL",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "S39WhlGEzmL",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "28",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_31"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "pwExRYbZ5lA",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "pwExRYbZ5lA",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "29",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_32"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "s2JTLBI1mlM",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "s2JTLBI1mlM",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs3_8 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "30",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_33"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "xhP2UcRBm71",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "xhP2UcRBm71",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "31",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Well_Child_Health_35"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "cXeGFwdwVet",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "cXeGFwdwVet",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs4_1 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "1",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_1"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "ZWyEQLlM81u",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "ZWyEQLlM81u",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "2",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_2"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "LoUBazoKMFu",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "LoUBazoKMFu",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "3",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_3"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "DFT16PG7aGt",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "DFT16PG7aGt",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "4",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_4"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "E47rqZRXNFf",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "E47rqZRXNFf",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "5",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_5"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "etN2eCW0V8A",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "etN2eCW0V8A",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const tableConfigs4_2 = useMemo(
    () => [
      [
        {
          display: "text",
          text: "6",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_6"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "OWJYVDCxXm2",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "OWJYVDCxXm2",
          cellProps: valueTable4Style,
        },
      ],
      [
        {
          display: "text",
          text: "7",
          cellProps: numberTable4Style,
        },
        {
          display: "text",
          text: t("Sick_Child_7"),
          cellProps: labelTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "eFXrDqXA2WQ",
          dsde: "sDG6N6l2m5u",
          cellProps: valueTable4Style,
        },
        {
          cc: "FU2zdnyL2tq",
          coc: "BaKsAyoQBud",
          dsde: "sDG6N6l2m5u",
          cellProps: valueTable4Style,
        },
      ],
    ],
    []
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const headerTab1 = (index) => (
    <Table id={`mch-v21-table-1-${index + 1}`} stickyHeader>
      <TableHead>
        <TableRow>
          {header1Table.map((header, i) => (
            <>
              <TableCell
                className="cell-header-table"
                sx={{
                  width: widthColumns[i],
                  textAlign: "center",
                  backgroundColor:
                    i === 0 ? "#99ccff" : i === 1 ? "#FFCC00" : "#99CC99",
                }}
              >
                {header}
              </TableCell>
              {i === 0 && (
                <TableCell
                  className="cell-header-table"
                  sx={{ width: widthColumns[6], backgroundColor: "#99ccff" }}
                >
                  {headerTittleTable[index]}
                </TableCell>
              )}
            </>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <MapTable
          dataElementConfigs={tableConfigs1[index].map((item, itemIndex) => {
            return [
              ...item.slice(0, 1),
              {
                ...item.slice(1, 2)[0],
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
              ...item.slice(2, item.length - 1),
              {
                ...item.slice(item.length - 1)[0],
                customCell: (
                  <TotalCell
                    listData={item
                      .filter((col) => col.dsde && col)
                      .map((col) => `${col.dsde}-${col.coc}`)}
                  />
                ),
                getText: (dataValues, orgUnit) => {
                  const listData = item
                    .filter((col) => col.dsde && col)
                    .map((col) => `${col.dsde}-${col.coc}`);
                  return listData.reduce(
                    (prev, curr) =>
                      prev + (dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0),
                    0
                  );
                },
              },
            ];
          })}
        />
      </TableBody>
    </Table>
  );
  return (
    <Box id="mch-v21-form-container" className="custom-form">
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
          <StyledTab label={t("WellChildHealth_")} />
          <StyledTab label={t("SickChild_")} />
        </StyledTabs>

        <TabPanel value={tabIndex} index={0}>
          <Box id="mch-v21-table-1" className="mch-v21-table">
            {headerTittleTable.map((header, index) => headerTab1(index))}
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Box className="mch-v21-table">
            <Table id="mch-v21-table-2-1">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table"
                    sx={{ textAlign: "center" }}
                  >
                    {t("age_groups")}
                  </TableCell>
                  <TableCell className="cell-header-table">
                    {t("number_people")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs2_1.map((item, itemIndex) => {
                    return [
                      {
                        ...item.slice(0, 1)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab2[0][itemIndex].value[startIndex]
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
                      },
                      ...item.slice(1),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table id="mch-v21-table-2-2">
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs2_2.map((item, itemIndex) => {
                    if (itemIndex < 2) {
                      return item;
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
                            mappingPopup.tab2[1][itemIndex - 2].value[
                              startIndex
                            ]
                          } ${
                            mappingPopup.tab2[1][itemIndex - 2].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab2[1][itemIndex - 2].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab2[1][itemIndex - 2].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab2[1][itemIndex - 2].value[
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

        <TabPanel value={tabIndex} index={2}>
          <Box id="mch-v21-table-3" className="mch-v21-table">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table"
                    sx={{ textAlign: "center" }}
                  >
                    {t("No")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table"
                    sx={{ textAlign: "center" }}
                  >
                    {t("Sick_Child_DI")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table"
                    sx={{ textAlign: "center" }}
                    colSpan={2}
                  >
                    {t("Number_")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_A")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_1.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return item;
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[0][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[0][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[0][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[0][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[0][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_B")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_2.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_2
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_2
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_2
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_2
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[1][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[1][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[1][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[1][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[1][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_C")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_3.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_3
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_3
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_3
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_3
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[2][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[2][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[2][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[2][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[2][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_D")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_4.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_4
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_4
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_4
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_4
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[3][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[3][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[3][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[3][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[3][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_E")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_5.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_5
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_5
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_5
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_5
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[4][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[4][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[4][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[4][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[4][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_F")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_6.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_6
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_6
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_6
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_6
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[5][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[5][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[5][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[5][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[5][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_G")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_7.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_7
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_7
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_7
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_7
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[6][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[6][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[6][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[6][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[6][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Well_Child_Health_H")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Health_Facility")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs3_8.map((item, itemIndex) => {
                    if (!item.find((col) => col.dsde)) {
                      return [
                        ...item.slice(0, 1),
                        ...item.slice(1).map((col, colIndex) => {
                          return {
                            ...col,
                            customCell: (
                              <TotalCell
                                listData={
                                  colIndex === 0
                                    ? tableConfigs3_8
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[2].dsde}-${row[2].coc}`
                                        )
                                    : tableConfigs3_8
                                        .filter((row) =>
                                          row.find((cell) => cell.dsde)
                                        )
                                        .map(
                                          (row) =>
                                            `${row[3].dsde}-${row[3].coc}`
                                        )
                                }
                              />
                            ),
                            getText: (dataValues, orgUnit) => {
                              if (colIndex === 0) {
                                const listData = tableConfigs3_8
                                  .filter((row) =>
                                    row.find((cell) => cell.dsde)
                                  )
                                  .map((row) => `${row[2].dsde}-${row[2].coc}`);
                                return listData.reduce(
                                  (prev, curr) =>
                                    prev +
                                    (dataValues[`${curr}-${orgUnit}`]?.value *
                                      1 || 0),
                                  0
                                );
                              }
                              const listData = tableConfigs3_8
                                .filter((row) => row.find((cell) => cell.dsde))
                                .map((row) => `${row[3].dsde}-${row[3].coc}`);
                              return listData.reduce(
                                (prev, curr) =>
                                  prev +
                                  (dataValues[`${curr}-${orgUnit}`]?.value *
                                    1 || 0),
                                0
                              );
                            },
                          };
                        }),
                      ];
                    }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab3[7][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab3[7][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab3[7][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab3[7][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab3[7][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={3}>
          <Box id="mch-v21-table-4" className="mch-v21-table">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="cell-header-table">{t("No")}</TableCell>
                  <TableCell className="cell-header-table">
                    {t("Sick_Child_DI")}
                  </TableCell>
                  <TableCell className="cell-header-table" colSpan={2}>
                    {t("Number_")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Sick_Child_A")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_HF")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs4_1.map((item, itemIndex) => {
                    // if (!item.find((col) => col.dsde)) {
                    //   return [
                    //     ...item.slice(0, 1),
                    //     ...item.slice(1).map((col, colIndex) => {
                    //       return {
                    //         ...col,
                    // customCell: <TotalCell listData={colIndex === 0 ?tableConfigs3_8
                    // .filter((row) => row.find((cell) => cell.dsde))
                    // .map((row) => `${row[2].dsde}-${row[2].coc}`) :tableConfigs3_8
                    // .filter((row) => row.find((cell) => cell.dsde))
                    // .map((row) => `${row[3].dsde}-${row[3].coc}`)} />,
                    //         getText: (dataValues, orgUnit) => {
                    //           if (colIndex === 0) {
                    //             const listData = tableConfigs3_8
                    //               .filter((row) => row.find((cell) => cell.dsde))
                    //               .map((row) => `${row[2].dsde}-${row[2].coc}`);
                    //             return listData.reduce(
                    //               (prev, curr) =>
                    //                 prev +
                    //                 (dataValues[`${curr}-${orgUnit}`]?.value * 1 ||
                    //                   0),
                    //               0
                    //             );
                    //           }
                    //           const listData = tableConfigs3_8
                    //             .filter((row) => row.find((cell) => cell.dsde))
                    //             .map((row) => `${row[3].dsde}-${row[3].coc}`);
                    //           return listData.reduce(
                    //             (prev, curr) =>
                    //               prev +
                    //               (dataValues[`${curr}-${orgUnit}`]?.value * 1 ||
                    //                 0),
                    //             0
                    //           );
                    //         },
                    //       };
                    //     }),
                    //   ];
                    // }
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab4[0][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab4[0][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab4[0][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab4[0][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab4[0][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
                    ];
                  })}
                />
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="cell-header-table-2"
                    colSpan={2}
                    sx={{ backgroundColor: "#CAE5FF" }}
                  >
                    {t("Sick_Child_B")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_HF")}
                  </TableCell>
                  <TableCell
                    className="cell-header-table-2"
                    sx={{
                      backgroundColor: "#ffea99",
                      textAlign: "center",
                    }}
                  >
                    {t("Sick_Child_OA")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <MapTable
                  dataElementConfigs={tableConfigs4_2.map((item, itemIndex) => {
                    return [
                      ...item.slice(0, 1),
                      {
                        ...item.slice(1, 2)[0],
                        onClick: (e) => {
                          let startIndex = 0;
                          if (i18n.language === "lo") {
                            startIndex = 4;
                          }
                          const head = `${
                            mappingPopup.tab4[1][itemIndex].value[startIndex]
                          } ${
                            mappingPopup.tab4[1][itemIndex].value[
                              startIndex + 1
                            ]
                              ? `(${
                                  mappingPopup.tab4[1][itemIndex].value[
                                    startIndex + 1
                                  ]
                                })`
                              : ""
                          } `;
                          const content = `${
                            mappingPopup.tab4[1][itemIndex].value[
                              startIndex + 2
                            ]
                          }`;
                          const source = `${
                            mappingPopup.tab4[1][itemIndex].value[
                              startIndex + 3
                            ]
                          }`;

                          setAnchorEl(e.currentTarget);
                          setPopupContent({ head, content, source });
                        },
                      },
                      ...item.slice(2),
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

export default MchV21;
