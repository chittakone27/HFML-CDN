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
import "./hmis-opd-v1.css";

const HmisOpdV1 = () => {
  const { t } = useTranslation();

  return (
    <Box id="hmis-opd-v1-form-container" className="custom-form">
      <Table id="hmis-opd-v1-table">
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
const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const primaryHeaderStyle = {
  style: {
    backgroundColor: "#1C2379",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
};

const secondaryHeaderStyle = {
  style: {
    textAlign: "center",
    backgroundColor: "#333F99",
    color: "#fff",
    fontWeight: "bold",
  },
};

const labelStyle = {
  style: {
    width: "34%",
    backgroundColor: "#A1A8D6",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
};

const valueStyle = {
  style: {
    width: "33%",
    backgroundColor: "#E8EAF5",
    padding: "5px 30px !important",
    textAlign: "center",
  },
};
const dataElementConfigs = [
  [
    {
      display: "text",
      text: "REPORT ON ACTIVITIES AND MORBIDITY - INPATIENT",
      cellProps: { ...primaryHeaderStyle, colSpan: 3 },
    },
  ],
  [
    {
      display: "text",
      text: "COMMUNICABLE DISEASE",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "UNDER 5 YEARS",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "5 YEARS OVER",
      cellProps: secondaryHeaderStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Diarrhea with blood",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "gCyXvjm9ZzW",
      dsde: "AzVkJg0zhFj",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "hpM66RmHpMk",
      dsde: "AzVkJg0zhFj",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Diarrhea, no blood, no severe dehydration",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "gCyXvjm9ZzW",
      dsde: "dT0DkpdpoB3",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "hpM66RmHpMk",
      dsde: "dT0DkpdpoB3",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Diarrhea severe dehydration",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "gCyXvjm9ZzW",
      dsde: "PnzHWoa8wHA",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "hpM66RmHpMk",
      dsde: "PnzHWoa8wHA",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Common cold",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "LePldn7CAfG",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "LePldn7CAfG",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Pneumo-bronchitis",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "DHzKgskGAJ6",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "DHzKgskGAJ6",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Severe pneumo-bronchitis",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "HAfqLuKZPoI",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "HAfqLuKZPoI",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Probable malaria, no test",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "wWWNiBpIiiO",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "wWWNiBpIiiO",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "P.falciparum tested positive = confirmed P.f.",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lFYq0lyy7uV",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lFYq0lyy7uV",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Non P falciparum tested positive",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "fYIJajmvmij",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "fYIJajmvmij",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Malaria tested negative",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pIPHDwUuN8N",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pIPHDwUuN8N",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Dengue fever",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "xvqMi64ckc6",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "xvqMi64ckc6",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Measles",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "uwIexNSvz1i",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "uwIexNSvz1i",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Genital discharge syndrome",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dxjyybG0h4A",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dxjyybG0h4A",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Genital ulcer syndrome",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "cIaGJZi6GV5",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "cIaGJZi6GV5",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Helminthes parasites",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "RQtrDHeIYrw",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "RQtrDHeIYrw",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "All other infections",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dSo8mRjnuey",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dSo8mRjnuey",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "PATHOLOGY PER PHYSIOLOGICAL SYSTEM",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "UNDER 5 YEARS",
      cellProps: secondaryHeaderStyle,
    },
    {
      display: "text",
      text: "5 YEARS OVER",
      cellProps: secondaryHeaderStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Diabetes",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pdxOaZx1hAw",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pdxOaZx1hAw",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Other endocrine pathology",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "qzIh6vLNjrc",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "qzIh6vLNjrc",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Malnutrition",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "ay65OeApAC9",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "ay65OeApAC9",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Anemia",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Ucz92jZMacM",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Ucz92jZMacM",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Other blood disease",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "O2s6cAiARbj",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "O2s6cAiARbj",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Cancer",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "IoL1Sbtw8dB",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "IoL1Sbtw8dB",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Epilepsy",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Yj0W9WzwksV",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Yj0W9WzwksV",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Nervous system-non-psych",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "FO3n01gNJex",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "FO3n01gNJex",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Psychiatric",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lWLZUToYGvn",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lWLZUToYGvn",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Tonsillitis, pharyngitits",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dyuUvupfqIu",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "dyuUvupfqIu",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Otitis",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "HWONN4n92L3",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "HWONN4n92L3",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Ear, nose, throat",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "BKoq4l4b5Fp",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "BKoq4l4b5Fp",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Ophthalmology",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "QPNK7HQRwAK",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "QPNK7HQRwAK",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Hypertension",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "mPsacODvwgS",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "mPsacODvwgS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Other circulatory and heart",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pGm3Idy0NcZ",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "pGm3Idy0NcZ",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Asthma",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "VBvJrb7iBwQ",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "VBvJrb7iBwQ",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "All other respiratory",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "PcMVRSv17wV",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "PcMVRSv17wV",
      cellProps: valueStyle,
    },
  ],

  [
    {
      display: "text",
      text: "Digestive system",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "DwxTM5SvvSj",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "DwxTM5SvvSj",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Skin disorders",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "NJvs4yB0lPH",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "NJvs4yB0lPH",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Musculo-skeletal system",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Ze4P80oDLoA",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "Ze4P80oDLoA",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Gyneco-Obstetrics",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "TsoRAkXRAd7",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "TsoRAkXRAd7",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Urology",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "UJrIwBzkhLD",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "UJrIwBzkhLD",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Road traffic injury",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "jvlkSD9dil9",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "jvlkSD9dil9",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Trauma, all other",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "vrkQBDFqQwq",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "vrkQBDFqQwq",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Dental",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lXQeZm6DgUa",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "lXQeZm6DgUa",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Small surgery / dressing",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "LEqlu8m9yyS",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "LEqlu8m9yyS",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "All OTHER OPD cases",
      cellProps: labelStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "UWuUP5ScxsE",
      cellProps: valueStyle,
    },
    {
      cc: "FcHItoIwfiv",
      coc: "mT8i249Qib8",
      dsde: "UWuUP5ScxsE",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "OTHER OPD SERVICES",
      cellProps: { ...secondaryHeaderStyle, colSpan: 3 },
    },
  ],
  [
    {
      display: "text",
      text: "Medical check up",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jC2t5y8lqbh",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Old case (follow up visit)",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fkWBO1MTysS",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Cases treated in outreach",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SAHyqOOomyW",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "CHRONIC DISEASE REGISTER",
      cellProps: { ...secondaryHeaderStyle, colSpan: 3 },
    },
  ],
  [
    {
      display: "text",
      text: "Total cases of leprosy detected",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tcZAjVmvNxj",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "New cases of leprosy detected",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IpRjFeKBCA7",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "First followup for leprosy in the year",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GTVC6qAqiZX",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Cumulative leprosy cases detected in the year",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dcbXklGkiLW",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Leprosy cases cured",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hCCtkLAxJiN",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Total cases of TB detected",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kA06W2V7Zmg",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "New cases of TB detected",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LFTFUR7szbu",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "First followup for TB in the year",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pLfYTDUq1Si",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Cumulative TB cases detected in the year",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OJnDWJj5VIY",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "TB cases cured",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "F4221hL4iq5",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
];
export default HmisOpdV1;
