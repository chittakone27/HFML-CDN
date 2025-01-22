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
import "./hmis-ipd-v1.css";

const HmisIpdV1 = () => {
  const { t } = useTranslation();

  return (
    <Box id="hmis-ipd-v1-form-container" className="custom-form">
      <Table id="hmis-ipd-v1-table">
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
      coc: "iMApKQLv0u5",
      dsde: "AzVkJg0zhFj",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      coc: "iMApKQLv0u5",
      dsde: "dT0DkpdpoB3",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      coc: "iMApKQLv0u5",
      dsde: "PnzHWoa8wHA",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "LePldn7CAfG",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "DHzKgskGAJ6",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "HAfqLuKZPoI",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "wWWNiBpIiiO",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "wWWNiBpIiiO",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "P. falciparum tested positive",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "lFYq0lyy7uV",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "fYIJajmvmij",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "pIPHDwUuN8N",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "xvqMi64ckc6",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "uwIexNSvz1i",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "dxjyybG0h4A",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "cIaGJZi6GV5",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "RQtrDHeIYrw",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "dSo8mRjnuey",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "pdxOaZx1hAw",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "qzIh6vLNjrc",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "ay65OeApAC9",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "Ucz92jZMacM",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "O2s6cAiARbj",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "IoL1Sbtw8dB",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "Yj0W9WzwksV",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "FO3n01gNJex",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "lWLZUToYGvn",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "lWLZUToYGvn",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "HWONN4n92L3",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "HWONN4n92L3",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "dyuUvupfqIu",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "dyuUvupfqIu",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Other ear - nose - throat",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "BKoq4l4b5Fp",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "QPNK7HQRwAK",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "mPsacODvwgS",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "pGm3Idy0NcZ",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "VBvJrb7iBwQ",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "PcMVRSv17wV",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "DwxTM5SvvSj",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "NJvs4yB0lPH",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "Ze4P80oDLoA",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "TsoRAkXRAd7",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "UJrIwBzkhLD",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "jvlkSD9dil9",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
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
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "vrkQBDFqQwq",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "vrkQBDFqQwq",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "All other causes and diseases",
      cellProps: labelStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "iMApKQLv0u5",
      dsde: "kDoPhDfC6kz",
      cellProps: valueStyle,
    },
    {
      cc: "s0nvER5wmoR",
      coc: "A7aossMkHgE",
      dsde: "kDoPhDfC6kz",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "INPATIENT DEATHS",
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
      text: "Deaths from diarrhea",
      cellProps: labelStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "gBDp3EFLYCQ",
      dsde: "fLEJKIVG8am",
      cellProps: valueStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "RV8yOoAIbql",
      dsde: "fLEJKIVG8am",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Death from ARI deaths",
      cellProps: labelStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "gBDp3EFLYCQ",
      dsde: "QoQpxqt8piI",
      cellProps: valueStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "RV8yOoAIbql",
      dsde: "QoQpxqt8piI",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Deaths from malaria",
      cellProps: labelStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "gBDp3EFLYCQ",
      dsde: "JDXvAJcIigE",
      cellProps: valueStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "RV8yOoAIbql",
      dsde: "JDXvAJcIigE",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Deaths from Dengue fever",
      cellProps: labelStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "gBDp3EFLYCQ",
      dsde: "TfymJ2qg7QJ",
      cellProps: valueStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "RV8yOoAIbql",
      dsde: "TfymJ2qg7QJ",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Deaths, other",
      cellProps: labelStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "gBDp3EFLYCQ",
      dsde: "y2WVS42ezHn",
      cellProps: valueStyle,
    },
    {
      cc: "gTHE9KNO4Rc",
      coc: "RV8yOoAIbql",
      dsde: "y2WVS42ezHn",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Number of patients obsconded",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SUOTBW4kz7c",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Number of patients transferred to other facility",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VANrBnK17Dq",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "IPD PROCEDURES",
      cellProps: { ...secondaryHeaderStyle, colSpan: 3 },
    },
  ],
  [
    {
      display: "text",
      text: "Major surgery",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "TgXQtGTS98A",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Medium surgery",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BQ9RKuT0Rit",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Caesarean section",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Hpe2V1CVKhy",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Male sterilization",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tBlJmjK7amB",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Female sterilization",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fg6c5b2C4dG",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "IPD UTILIZATION",
      cellProps: { ...secondaryHeaderStyle, colSpan: 3 },
    },
  ],
  [
    {
      display: "text",
      text: "Inpatient Days of Care",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lOmcsNWcDEs",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Number of beds",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MjyTrLKhV2r",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
  [
    {
      display: "text",
      text: "Total number of patients discharged during the period",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oikoo2dhE92",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
];
export default HmisIpdV1;
