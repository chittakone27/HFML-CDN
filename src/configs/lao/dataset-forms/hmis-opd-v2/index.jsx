import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hmis-opd-v2.css";

const HmisOpdV2 = () => {
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
        text: "",
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
        dsde: "Mn5HrInzIpO",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Mn5HrInzIpO",
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
        dsde: "YaT75WKW8YS",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "YaT75WKW8YS",
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
        dsde: "Y3UqQmb1IWO",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Y3UqQmb1IWO",
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
        dsde: "zNyg90A0Bbo",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "zNyg90A0Bbo",
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
        dsde: "gW8da1XgAl9",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "gW8da1XgAl9",
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
        dsde: "pUPo7JQHlcu",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "pUPo7JQHlcu",
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
        dsde: "ulub6jeCRXS",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ulub6jeCRXS",
        cellProps: value2Style,
      },
    ],

    [
      {
        display: "text",
        text: "Pfalciparum_tested_positive_confirmed_Pf",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "A0ZTpQ8sQFq",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "A0ZTpQ8sQFq",
        cellProps: value2Style,
      },
    ],

    [
      {
        display: "text",
        text: "non_P_falcip_tested_positive",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "ENetme4n6nB",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "ENetme4n6nB",
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
        dsde: "HK6Vvp6rr0G",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "HK6Vvp6rr0G",
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
        dsde: "Ldgc4NY0WOf",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Ldgc4NY0WOf",
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
        dsde: "tqAJ97hlfAf",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "tqAJ97hlfAf",
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
        dsde: "teZFQYGgP3K",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "teZFQYGgP3K",
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
        dsde: "AqtCtj8qZe4",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "AqtCtj8qZe4",
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
        dsde: "XnAtePdPtQo",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "XnAtePdPtQo",
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
        dsde: "mYbsmXUzDxJ",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "mYbsmXUzDxJ",
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
        dsde: "sXZVO1u5wrV",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "sXZVO1u5wrV",
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
        dsde: "BexRpFIr0ij",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "BexRpFIr0ij",
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
        dsde: "hnR7Rv2HAhq",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "hnR7Rv2HAhq",
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
        dsde: "bhZy0JFIgVQ",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "bhZy0JFIgVQ",
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
        dsde: "r0ZHYkhAOfG",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "r0ZHYkhAOfG",
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
        dsde: "Z5IFhExpsBm",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Z5IFhExpsBm",
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
        dsde: "jXn90QwGmOA",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "jXn90QwGmOA",
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
        dsde: "hcOY9xpuKW8",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "hcOY9xpuKW8",
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
        dsde: "c6qKHk0o79F",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "c6qKHk0o79F",
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
        dsde: "b743YplpMjD",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "b743YplpMjD",
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
        dsde: "Qh2KBIuyQZe",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Qh2KBIuyQZe",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Ear_nose_throat",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "oMk5qGNeGg3",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "oMk5qGNeGg3",
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
        dsde: "tOSBxUUISQ9",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "tOSBxUUISQ9",
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
        dsde: "LdA3m59ocpS",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "LdA3m59ocpS",
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
        dsde: "Le4rpjQMLmD",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "Le4rpjQMLmD",
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
        dsde: "SmSfKTdnLrs",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "SmSfKTdnLrs",
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
        dsde: "yehmLOVCDYh",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "yehmLOVCDYh",
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
        dsde: "SkfSw1XRVbG",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "SkfSw1XRVbG",
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
        dsde: "sqxfDGQ021c",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "sqxfDGQ021c",
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
        dsde: "lzuNOs0mW7W",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "lzuNOs0mW7W",
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
        dsde: "fuohYjq5Srs",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "fuohYjq5Srs",
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
        dsde: "N4Zb8R4THBI",
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
        dsde: "caTvqhxqQ6D",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "caTvqhxqQ6D",
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
        dsde: "GOGZWcpQ4x1",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "GOGZWcpQ4x1",
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
        dsde: "mXz1a9CQp0h",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "mXz1a9CQp0h",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Dental",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "lXQeZm6DgUa",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "lXQeZm6DgUa",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Small_surgery_dressing",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "LEqlu8m9yyS",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "LEqlu8m9yyS",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "All_OTHER_OPD_cases",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "gBDp3EFLYCQ",
        dsde: "UWuUP5ScxsE",
        cellProps: value1Style,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "RV8yOoAIbql",
        dsde: "UWuUP5ScxsE",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "OTHER_OPD_SERVICES",
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
        cc: "gTHE9KNO4Rc",
        coc: "lmbxvugTvKr",
        dsde: "dM7Mbwa3RXd",
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
        cc: "gTHE9KNO4Rc",
        coc: "lmbxvugTvKr",
        dsde: "v0lPkH7kA9I",
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
        text: "Medical_check_up",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "lmbxvugTvKr",
        dsde: "jC2t5y8lqbh",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Old_case_follow_up_visit",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "lmbxvugTvKr",
        dsde: "fkWBO1MTysS",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Cases_treated_in_outreach",
        cellProps: labelStyle,
      },
      {
        cc: "gTHE9KNO4Rc",
        coc: "lmbxvugTvKr",
        dsde: "SAHyqOOomyW",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "CHRONIC_DISEASE_REGISTER",
        cellProps: { ...secondaryHeader1Style, colSpan: 3 },
      },
    ],
    [
      {
        display: "text",
        text: "Total_cases_of_leprosy_detected",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "tcZAjVmvNxj",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "New_cases_of_leprosy_detected",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "IpRjFeKBCA7",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "First_followup_for_leprosy_in_the_year",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GTVC6qAqiZX",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Cumulative_leprosy_cases_detected_in_the_year",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dcbXklGkiLW",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Leprosy_cases_cured",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hCCtkLAxJiN",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Total_cases_of_TB_detected",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "kA06W2V7Zmg",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "New_cases_of_TB_detected",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "LFTFUR7szbu",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "First_followup_for_TB_in_the_year",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pLfYTDUq1Si",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "Cumulative_TB_cases_detected_in_the_year",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "OJnDWJj5VIY",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "TB_cases_cured",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "F4221hL4iq5",
        cellProps: { ...value3Style, colSpan: 2 },
      },
    ],
  ];
  return (
    <Box id="hmis-opd-v2-form-container" className="custom-form">
      <Table id="hmis-opd-v2-table">
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

export default HmisOpdV2;
