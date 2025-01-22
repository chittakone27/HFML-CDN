import { Box, Table, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hmis-ipd-v2.css";

const HmisIpdV2 = () => {
  const { t } = useTranslation();
  const primaryHeaderStyle = {
    style: {
      backgroundColor: "#7198C8",
      color: "#fff",
      paddingBlock: "15px",
      fontWeight: "bold",
      paddingLeft: "20px",
    },
  };

  const secondaryHeader1Style = {
    style: {
      paddingLeft: "20px",
      backgroundColor: "#99CCFF",
      fontWeight: "bold",
    },
  };
  const secondaryHeader2Style = {
    style: {
      textAlign: "center",
      backgroundColor: "#FFCC00",
      fontWeight: "bold",
    },
  };
  const secondaryHeader3Style = {
    style: {
      textAlign: "center",
      backgroundColor: "#99CC99",
      fontWeight: "bold",
    },
  };

  const labelStyle = {
    style: {
      backgroundColor: "#CAE5FF",
      color: "#000",
      fontWeight: "bold",
      paddingLeft: "20px",
    },
  };
  const value1Style = {
    style: {
      paddingInline: "20px",
      backgroundColor: "#FFEA99",
      padding: "5px 30px !important",
      textAlign: "center",
    },
  };
  const value2Style = {
    style: {
      paddingInline: "20px",
      backgroundColor: "#E0EFE0",
      padding: "5px 30px !important",
      textAlign: "center",
    },
  };
  const value3Style = {
    style: {
      paddingInline: "20px",
      backgroundColor: "#F7E8F1",
      padding: "5px 30px !important",
      textAlign: "center",
    },
  };

  const dataElementConfigs = [
    [
      {
        display: "text",
        text: "form_title",
        cellProps: { ...primaryHeaderStyle, colSpan: 3 },
      },
    ],
    [
      {
        display: "text",
        text: t("COMMUNICABLE_DISEASE"),
        cellProps: secondaryHeader1Style,
      },
      {
        display: "text",
        text: "UNDER_5_YEARS",
        cellProps: secondaryHeader2Style,
      },
      {
        display: "text",
        text: "5_YEARS_OVER",
        cellProps: secondaryHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: "Diarrhea_with_blood",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "Kt1EBm71tvP",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Kt1EBm71tvP",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Diarrhea_no_blood_no_severe_dehydration",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "qc2PfCyWn2i",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "qc2PfCyWn2i",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Diarrhea_severe_dehydration",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "KiditKuJPVF",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "KiditKuJPVF",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Common_cold",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "f6wJfTUDrZL",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "f6wJfTUDrZL",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Pneumo_bronchitis",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "sUOjPE2IYt8",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "sUOjPE2IYt8",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Severe_pneumo_bronchitis",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ugrJ8u4TiaV",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ugrJ8u4TiaV",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Probable_malaria_no_test",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "E36DLjQOphV",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "E36DLjQOphV",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "P_falciparum_tested_positive",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ir3Ty7IS82J",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ir3Ty7IS82J",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Non_P_falciparum_tested_positive",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "h1WX9zIwQoy",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "h1WX9zIwQoy",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Malaria_tested_negative",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "UA4I4jSANw0",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "UA4I4jSANw0",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Dengue_fever",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "YmkD0e5mIR7",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "YmkD0e5mIR7",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Measles",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "yLsY6Vgzd5l",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "yLsY6Vgzd5l",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Genital_discharge_syndrome",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "hGh6WXK5N42",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "hGh6WXK5N42",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Genital_ulcer_syndrome",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "E8r3II23f2B",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "E8r3II23f2B",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Helminthes_parasites",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "e41VzkjbMg4",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "e41VzkjbMg4",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "All_other_infections",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "tUxHFLINdYb",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "tUxHFLINdYb",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "PATHOLOGY_PER_PHYSIOLOGICAL_SYSTEM",
        cellProps: secondaryHeader1Style,
      },
      {
        display: "text",
        text: "UNDER_5_YEARS",
        cellProps: secondaryHeader2Style,
      },
      {
        display: "text",
        text: "5_YEARS_OVER",
        cellProps: secondaryHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: "Diabetes",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "xRHAUBxeh9C",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "xRHAUBxeh9C",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Other_endocrine_pathology",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "n4kKOXiSyD0",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "n4kKOXiSyD0",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Malnutrition",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ytLhNuGpmXK",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ytLhNuGpmXK",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Anemia",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "KCJnMX3HLUc",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "KCJnMX3HLUc",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Other_blood_disease",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "xSWeMt2CK3p",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "xSWeMt2CK3p",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Cancer",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "cbY2INEyc5L",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "cbY2INEyc5L",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Epilepsy",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ZbkzEtqfbjY",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ZbkzEtqfbjY",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Nervous_system_non_psych",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "nR4LV32DFHk",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "nR4LV32DFHk",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Psychiatric",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "gscN2p8Xrdc",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "gscN2p8Xrdc",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Otitis",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "LQTCWC9nROm",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "LQTCWC9nROm",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Tonsillitis_pharyngitits",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "Rvhw4UKEicH",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Rvhw4UKEicH",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Other_ear_nose_throat",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "l5n0ronRCdZ",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "l5n0ronRCdZ",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Ophthalmology",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "vGj9uUExhTQ",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "vGj9uUExhTQ",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Hypertension",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "rOSNh2omvQ5",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "rOSNh2omvQ5",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Other_circulatory_and_heart",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ni4j9thbm7x",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ni4j9thbm7x",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Asthma",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "iYN2ilHIpQU",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "iYN2ilHIpQU",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "All_other_respiratory",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "s8Gu6Gb0knq",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "s8Gu6Gb0knq",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Digestive_system",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "dwjKnwdRqzB",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "dwjKnwdRqzB",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Skin_disorders",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "V2VndOX039F",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "V2VndOX039F",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Musculo_skeletal_system",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "Fhb2FoN5QMx",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Fhb2FoN5QMx",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Gyneco",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "NTD8iA8yCIj",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "NTD8iA8yCIj",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Obstetrics",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "QiQt0lqQg6c",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Urology",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "nsOiDRoI9Vs",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "nsOiDRoI9Vs",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Road_traffic_injury",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "EC2RzfOALyl",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "EC2RzfOALyl",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Trauma_all_other",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "uQtf7nO4LQv",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "uQtf7nO4LQv",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "All_other_causes_and_diseases",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "aJVrfNPJN3Q",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "aJVrfNPJN3Q",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "INPATIENT_DEATHS",
        cellProps: secondaryHeader1Style,
      },
      {
        display: "text",
        text: "UNDER_5_YEARS",
        cellProps: secondaryHeader2Style,
      },
      {
        display: "text",
        text: "5_YEARS_OVER",
        cellProps: secondaryHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: "Deaths_from_diarrhea",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "fLEJKIVG8am",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "fLEJKIVG8am",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Death_from_ARI_deaths",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "QoQpxqt8piI",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "QoQpxqt8piI",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Deaths_from_malaria",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "JDXvAJcIigE",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "JDXvAJcIigE",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Deaths_from_Dengue_fever",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "TfymJ2qg7QJ",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "TfymJ2qg7QJ",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Deaths_other",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "y2WVS42ezHn",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "y2WVS42ezHn",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Number_of_patients_obsconded",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "SUOTBW4kz7c",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Number_of_patients_transferred_to_other_facility",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "VANrBnK17Dq",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "IPD_PROCEDURES",
        cellProps: secondaryHeader1Style,
      },
      {
        display: "text",
        text: "UNDER_5_YEARS",
        cellProps: secondaryHeader2Style,
      },
      {
        display: "text",
        text: "5_YEARS_OVER",
        cellProps: secondaryHeader3Style,
      },
    ],
    [
      {
        display: "text",
        text: "mykey01",
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "",
        cellProps: value3Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LNqR5xhFxoz",
        cellProps: value3Style,
      },
    ],
    [
      {
        display: "text",
        text: "mykey02",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "PIlhnLrPbCB",
        cellProps: value3Style,
      },
      {
        display: "text",
        text: "",
        cellProps: value3Style,
      },
    ],
    [
      {
        display: "text",
        text: "Major_surgery",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "TgXQtGTS98A",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Medium_surgery",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "BQ9RKuT0Rit",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Caesarean_section",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Hpe2V1CVKhy",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Male_sterilization",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tBlJmjK7amB",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Female_sterilization",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "fg6c5b2C4dG",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "IPD_UTILIZATION",
        cellProps: { ...secondaryHeader1Style, colSpan: 3 },
      },
    ],
    [
      {
        display: "text",
        text: "Total_hospitalization_days_of_discharged_patients",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "lOmcsNWcDEs",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Total_hospitalization_days",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "oikoo2dhE92",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
  ];
  return (
    <Box id="hmis-ipd-v2-form-container" className="custom-form">
      <Table id="hmis-ipd-v2-table">
        <MapTable dataElementConfigs={dataElementConfigs} />
      </Table>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#FDF3D1",
          padding: "10px",
          marginTop: "5px",
        }}
      >
        <Typography
          color="#856404"
          title="Please click on Complete button when your work has done"
        >
          ກະລຸນາກົດປຸ່ມ <strong style={{ color: "red" }}> "ສຳເລັດແລ້ວ" </strong>
          ເມື່ອທ່ານປ້ອນຂໍ້ມູນຄົບຖ້ວນ
        </Typography>
      </Box>
    </Box>
  );
};

export default HmisIpdV2;
