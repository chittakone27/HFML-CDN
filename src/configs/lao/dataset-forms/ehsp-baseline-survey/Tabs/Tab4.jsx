import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { tableCellStyles } from "../styles/styles";
import MapTable from "../../common/MapTable";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import "../ehsp-baseline-survey.css";
import useDataEntryStore from "@/state/dataEntry";
import { saveDataValue } from "@/api/icapture/dataValue";
import _ from "lodash";
const Tab4 = () => {
  const { t } = useTranslation();
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ period: state.period, orgUnit: state.orgUnit }),
    shallow
  );
  const [orgUnitGroup, setOrgUnitGroup] = useState(0);
  const [headerTable4, setHeaderTable4] = useState([]);
  const { dataValues, actions } = useDataEntryStore(
    (state) => ({
      dataValues: state.dataValues,
      actions: state.actions,
    }),
    shallow
  );

  const { setDataValue, setDataValueDirty, setDataValueError } = actions;

  const lstSections = [
    [
      {
        assignOrg: [true, true, true, true],
        text: t("Bed (ER, outpatient, inpatient)"),
        data: [
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NvHS5Z21hZl",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "s2hVZHJG6bh",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "igXJMEStmBU",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Delivery bed"),
        img: ["../HISPVN-Core-Modules/Lao/asset/delivery_bed.jpg"],
        data: [
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "abunpSWvw9P",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "rlZkxpzV2Ju",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Li5Y5ZkaWxM",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Refrigerator"),
        img: ["../HISPVN-Core-Modules/Lao/asset/refrigerator.jpg"],
        data: [
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "G5POggSjjRv",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "S3vhmi0tEoB",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YQR6xE1URfi",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Vaccine Carriers Cold box"),
        img: ["../HISPVN-Core-Modules/Lao/asset/vaccine_carriers.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Q6pzjFIwleF",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "LtVk3VvcFVY",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Autoclave"),
        img: ["../HISPVN-Core-Modules/Lao/asset/autoclave.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "lCsGqYbsjWk",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "T8Lx439gG96",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Small incinerator"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "n6OZmDHkT0Y",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ENGJ9HEjsOy",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Sharps box/safety box"),
        img: ["../HISPVN-Core-Modules/Lao/asset/sharps_box-safety_box.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "e3wzFRk8KGf",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "BcOVcVoZhdF",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/O2_01.png",
          "../HISPVN-Core-Modules/Lao/asset/O2_02.jpg",
        ],
        text: t(
          "O2 (central supply system/cylinder/concentrator) (RMNCH, NCD, CD)"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MIsZCOt9BIz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "E2yYfXrCk1x",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Microscopy"),
        img: ["../HISPVN-Core-Modules/Lao/asset/microscopy.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ybgoBCT3Kbx",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "WJgzS7BmA51",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Xray machine"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KMCmL2Z4DHq",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "FlxZ5DjS9Y7",
          },
        ],
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        text: t("MCH handbook"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SyPjW2CUkY8",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GRq3FNTtNZO",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Partograph"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "g11xtJgM711",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KogtKjef1XZ",
          },
        ],
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        text: t("RMNCAH health education material"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pH2RbJDamBp",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t(
          "IEC material of family planning and reproductive health (flipchart)"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "sxC6w1YkBLn",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IEC material of abortion"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "E4nje9k4sZm",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IEC material of STI"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "fKKgcZZlT1J",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IEC material of NCD"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "l2ztzEuJDON",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IEC material of communicable diseases"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "qZH6B4CJzUw",
          },
          { display: "text", cellProps: tableCellStyles.empty },
        ],
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        text: t("Condoms"),
        img: ["../HISPVN-Core-Modules/Lao/asset/condoms.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "PlyWzJkzRod",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "TyLTP0SnIG4",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Implant"),
        img: ["../HISPVN-Core-Modules/Lao/asset/implant.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "iEQcIz1whBX",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IraQKWDyciQ",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IUD"),
        img: ["../HISPVN-Core-Modules/Lao/asset/IUD.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "aVirbESbf9i",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "UqySbbgHYeo",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Ready to use therapeutic food (RUTF)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ref6ljiWD6L",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "y87YKzQ3j8p",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("F75/F100"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "piHPvlxk99l",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Gr9v4y6qLad",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("CMV"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "G9bwjMl7OKl",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Kzx86dOKedQ",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("LLIN"),
        img: ["../HISPVN-Core-Modules/Lao/asset/LLIN.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "uhlAaHjU0YE",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ceOtM49ViZY",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Blood transfution"),
        img: ["../HISPVN-Core-Modules/Lao/asset/blood_transfution.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KVCEBAAEwbe",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "rv4JWtL1Yyd",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IV catheter N: 16-18"),
        img: ["../HISPVN-Core-Modules/Lao/asset/IV_catheter_N_16-18.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DKHOYFPce8U",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SNdsP58f7SM",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("IV catheter"),
        img: ["../HISPVN-Core-Modules/Lao/asset/IV_catheter.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "tYtJdjtuiZe",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Oj38lVzMXZv",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Intra-osseous needle"),
        img: ["../HISPVN-Core-Modules/Lao/asset/intra-osseous_needle.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "UOcsCXI2kql",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Hn0LDGZ91Ic",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/nasogastric_tube.jpg"],
        text: t("Nasogastric tube"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "gEO3q2eRne7",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "puO0evaTQtH",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("EDTAK3 tube for CD4 count blood collection"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bdaCwkopeiq",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "cXQmbNdYyoN",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Syphilis rapid test"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "FfZbNDAFN4k",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Hwa147IaMBC",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Pregnancy urine rapid test"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "y7fc9u0zoK7",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "TqNX0H2nE4F",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("RDT of HIV (test 1) (determin)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NeiZiJWhJRk",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "AInGgV2SEfO",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("RDT for dengue"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ymggI7fXKjd",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "g0hu1f9TJ0V",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Rapid test (RDT) for malaria"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "UhjdAFD7KfJ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KPuWuQ6JEJR",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("RDT G6PD"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "VAXDWee9HV4",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "G08LsKSGEyW",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Staining kit for malaria"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "egu7UUI7hyV",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZCm7WF7yryI",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Sputum cup"),
        img: ["../HISPVN-Core-Modules/Lao/asset/sputum_cup.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "mun0NvS9Fl9",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vkr6Y7NzWpu",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Microscope slides"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "aX20sMQgzIZ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ABtLk7k5a1l",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t(
          "Ziehl-Neelsen stain (or auramine stain or auramine/rhodamine or acridine orange stain)"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "z3Keb8DPMRs",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "dNALuELoGKb",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Vortex mixer"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KfEvEHd55KY",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "H4uR7L5at7C",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Distilled water"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IFQwEbTKLc1",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "dnpg5O1ygcw",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("KOH 10% Reagent"),
        img: ["../HISPVN-Core-Modules/Lao/asset/KOH_10_percent_Reagent.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "jLTN10BDRvM",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "fkjjXn1G3Ct",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/adult_oxygen.jpg",
          "../HISPVN-Core-Modules/Lao/asset/nasal_cannulae.jpg",
        ],
        text: t("Adult oxygen mask or nasal cannulae"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "iLU0wfWgebP",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bEdRZxANbbN",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/oxygen_mask_for_child.jpg",
          "../HISPVN-Core-Modules/Lao/asset/nasal_cannulae_for_child.jpg",
        ],
        text: t("Oxygen mask or nasal cannulae for newborn and child"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "cgVEXaNFAS3",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "yJq8GGCdpCB",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/urine_catheter_and_urine_bag.jpg",
        ],
        text: t("Urine catheter and urine bag"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vNFbqdy3SIt",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "mz1tiBwg0F4",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/bandage.png"],
        text: t("Bandage"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xllwIfccoWD",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "yCTpbQLbxPV",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/splint.jpg"],
        text: t("Splint"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hbXLQN0LsUl",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "HCyyB0T9nEs",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/sling_02.jpg",
          "../HISPVN-Core-Modules/Lao/asset/sling_01.jpg",
        ],
        text: t("Sling"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "VMPKGCb28My",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YnVWFY7XjXN",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Sterilized gloves"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xFVy6a2TKTQ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "AcREJUevlNI",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/spinal_needles.jpg"],
        text: t("Spinal needles (lumbar puncture needles)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "W3YsFkAtp8d",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GMOXDvlpmzp",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/intubation_tube_size-2_0-9_0.jpg",
        ],
        text: t("Intubation tube (size 2.0-9.0)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "T7BsDMl6Sfw",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GXj0RviNiOa",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/surgical_suture.jpg"],
        text: t("Surgical suture"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "lCErqTZYnaw",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "VdyK4yo8BfP",
          },
        ],
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/weighing_scale_for_adult.png"],
        text: t("Weighing scale for adult"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "wdBbtsqf9qs",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "mFrXsFuIWBD",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/weighing_scale_for_newborn_01.png",
          "../HISPVN-Core-Modules/Lao/asset/weighing_scale_for_newborn_02.png",
        ],
        text: t("Weighing scale for newborn"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Qd602zh1xQw",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "J9k98yW5w3e",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/height_measure_standing.jpg"],
        text: t("Height measure (standing)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "LCemZRr20pR",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "N8hzfekEHUV",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/height_measure_lying down_measure tape.jpg",
        ],
        text: t("Height measure (lying down)/measure tape"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DG3RNo5mszg",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "g6qrU4hMrlu",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/measurement_tape_for_uterine_fundal_height.jpg",
        ],
        text: t("Measurement tape for uterine fundal height"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nzHetAXGrmf",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "snGoXvSRzXq",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Measuring tape for abdominal circumference"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "qkOZ5Ec7vIQ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "aIWRJUaiGkx",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/MUAC_measure_tape.jpg"],
        text: t("MUAC measure tape"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SamIeSG6uC9",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "jvynjRaHD6i",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Adult_Stethoscope.jpg"],
        text: t("Adult Stethoscope"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "qoHYBQhNrns",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "mViQauBrG0X",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Newborn_stethoscopes.jpg"],
        text: t("Newborn stethoscopes"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "WugqH9Ch2RC",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hZdOjPqAPCJ",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Fetus_stethoscope_Traube.jpg"],
        text: t("Fetus stethoscope/Traube"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "yHBUVXXVUqU",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NMF63shwyJu",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Fetal_doppler.jpg"],
        text: t("Fetal doppler"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Rk1o48JJDnh",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bIX64EmxbLA",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Adult_sphyngmomanometer.jpg"],
        text: t("Adult sphyngmomanometer"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QJIymdefFz9",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hyNdkou5Cz5",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Thermometer.jpg"],
        text: t("Thermometer"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "VvTJhDzUCwy",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ePtEep8rgXa",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Aural_speculum_Auriscope.jpg"],
        text: t("Aural speculum/Auriscope"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YNBrUBrzE5y",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hPsYfukm5Qc",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Oximeters_and_probes.jpg"],
        text: t("Oximeters and probes"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KLJbvi4vASS",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "HhOdoXQ9ZAj",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Light_for_procedure.jpg"],
        text: t("Light for procedure"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "OiUQRngpksz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YH6MDaBKchi",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Pregnancy_due_date_calculator_wheel.jpg",
        ],
        text: t("Pregnancy due date calculator wheel"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "klLnF9o65QW",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "z8O5hNAdegA",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Speculum.jpg"],
        text: t("Speculum"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IF657QbUNkn",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "topXCioCMSI",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Tenaculum.jpg"],
        text: t("Tenaculum"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "tVJjvJI8FFi",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZKHft4225Ni",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Ultrasound.png"],
        text: t("Ultrasound"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "rUELRd31lpA",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "EqzEf5cBmqp",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("EEG"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "v1nJ3vDfOGM",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "aqhFVwAvPG8",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Uterine sound"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Uterine_sound.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "VdqrYSoBvnc",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "O7c7aOMKrdV",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Urine_test_dipstick_protein-keton-sugar.jpg",
        ],
        text: t("Urine test (dipstick)(protein, keton, sugar)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "JgxJ3DOtvRp",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZQhbWrvKXfl",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Lumbar puncture needle"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SmZ3vYW4d7L",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "TQdSD2aH68X",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Hematometer-CBC_kit_equipment.jpg",
          "../HISPVN-Core-Modules/Lao/asset/Hematometer-CBC_kit_equipment_02.jpg",
        ],
        text: t("Hematometer/CBC kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "lUqxscTsCHI",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "mR7wZSznWvx",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Blood clot test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xCXDzo3EBvz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZLwRc41xC3Z",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Bleeding test kit"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "EHGfiCGxhTd",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "yK5RXEumAQj",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Blood culture test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DAb4006TG2M",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "F5RKEuTzpm5",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Urine culture test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QgnAxGGkXAA",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "A7Hmq0KZcJh",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Rapid_blood_glucose_test_kit_equipment_glucometer-blood_glucose_test_kit_equipment.jpg",
        ],
        text: t(
          "Rapid blood glucose test kit and equipment (glucometer)/blood glucose test kit and equipment"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bW4VjzaL5j3",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "rRdowQOyRhh",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("SD Bioline (test2)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "RbGsuLL0m1l",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xcqmqN6OjJx",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("Confirmatory test of HIV (Unigold)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "sYa7IfWmEPy",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Kzgg1TE0af7",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t(
          "FACSCount CD4 Analyzer and counter\n-FACSCount CD4 reagent kit\n-FACSCount Control kit\n-FACS Clean Solutions\n-FACS Rinse solution\n-FACSFLOW Sheath Fluid\n-Thermal Papare Roll\n- Cleaning Tubes\n-Cleaning Tube caps\n-Pipette tips bulk"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "CekYY5zcJtP",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Qdps42sA4lm",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("ABO blood type test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "aOdKg7FOmpt",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bjULkPCqDSL",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Blood cross-match test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bNkJOw2bAO6",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SQ69poWnk7P",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Bilirubin checker/bilirubin test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "efltX572jcj",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "o4f82sWcx2C",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Cholesterol test kit and equipment"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "O86lYiSSN4t",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GjSKGMYir9S",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Bunsen burner (or spirit lamp)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "eDdqVb9qS1b",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bDKlBkoyJiO",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("Kit to check cervical cancer"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Ao9wOzq9HQG",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "XI2LfOkwX3j",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("Ophthalmoscope"),
        img: ["../HISPVN-Core-Modules/Lao/asset/ophthalmoscope.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DAk81Ck6wmz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xjUXlDUIRhX",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Slit_lamp.jpg"],
        text: t("Slit lamp"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Zmr9T2KlyD1",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nRbIMErVm7X",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("Hammer patella"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "y7m8Zs9vxc7",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Au5F9oyReMj",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("Tuning fork"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "JjBmQ9cGg3j",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SMCFqY8U7CW",
          },
        ],
      },
    ],
    [
      {
        assignOrg: [true, true, true, true],
        text: t(
          "Self inflating bags and masks(size 0 and 1) (for premature newborn and newborn)"
        ),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Self_inflating_bags_masks_for_premature_newborn_and_newborn.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "G4ujmyWbTKR",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "m4bcapjBHtv",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Self inflating bags and masks (for child and adult)"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Self_inflating_bags_masks_for_child_and_adult.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "PVtB3mTc0uQ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "P9B2UPRUPbH",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Suction equipment"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Suction_equipment.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pwXjVIwpHnL",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "HyPQLkYd9eD",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Suction bulb"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Suction_bulb.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "h5Wlxm7OmQ9",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "jW9OnssGRn9",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Inhaler/Nebulisers"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Inhaler_Nebulisers.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GkHIOydumUc",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "cKBHtLVaGtW",
          },
        ],
      },
      {
        assignOrg: [false, false, true, false],
        text: t("CPAP"),
        img: ["../HISPVN-Core-Modules/Lao/asset/CPAP.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hD5074X4v2I",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "oiQIVIsH9FX",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t(
          "Full delivery sets (sponge forceps, scissors, needle holder, vaginal speculum, arter forceps and clamp, clean sheet, dissecting forceps, sanitary pads,cord clamp, iodin cup and kidney tray)"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "BSMBjZrncs4",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MIQI7YRz2Qz",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/delivery-table-or-trolley-for-setting-up-delivery-sets-resuscitation-areas.jpg",
        ],

        text: t(
          "Delivery table or trolley for setting up delivery sets and resuscitation areas"
        ),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "p0IKjCDpIJw",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "K76oe5jt7vh",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Table-trolley_for_newborn_resuscitation.jpg",
        ],
        text: t("Table or trolley for newborn resuscitation"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ezYKEi3RlLg",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YAM746Ze8fM",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Clean dry towels"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "CO3HJ6htEx3",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "X6QGnO7U5JS",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Single-use towels"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "XhZlRob1fr8",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "szXjh8XKk7B",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Baby caps and adequate cloths for drying"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Baby-caps-and-adequate-cloths-for-drying.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MESJN82Zapq",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "AUWHgujenZh",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Binder for KMC"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bKPYuH5Zrjh",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "eKexUI0SOLc",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Light-therapy-lamp.jpg"],
        text: t("Light therapy lamp"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "F3UNO7GFQPz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "yG12sWVJgR9",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Incubator_radiant_warmer_for_newborn.jpg",
        ],
        text: t("Incubator/ radiant warmer for newborn"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "gWfd7JXbeoF",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZTTIwogo8Ao",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/MVA_EVA-Karman_Cannula.jpg"],
        text: t("MVA or EVA (Karman Cannula)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "T7gJbvEq32x",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "F07IoGx9w2W",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Vaccum_extractor-Kiwi_ventouse.jpg",
        ],
        text: t("Vaccum extractor (Kiwi ventouse)"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "qkLqKPquz7t",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "i8CD2g0jk94",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Manual-vacuum-extractor.jpg"],
        text: t("Manual vacuum extractor"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Kdiil6uvsBJ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vqicuoKq6sp",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("DOTs kits"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Nksrd2k640G",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NumU5geSIJf",
          },
        ],
      },
    ],
    [
      {
        assignOrg: [true, false, true, false],
        text: t("Sterilized gown"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "oLtRLTc13dI",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "UBwTAa1N3lP",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Suction equipment for surgery"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Suction_equipment_for_surgery.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "YDGEYjEq9ZE",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Puqx3yqgjSD",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Suction tip/tube for surgery"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Suction_tip_tube_for_surgery.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GE6VABqrLhF",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ujkzGG2cFDe",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Clamp, Cord Umbilical clamps"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Clamp-Cord-Umbilical-clamps.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "TqNIg4D2EIj",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pblPU5zXgUK",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Curette.jpg.jpg"],
        text: t("Curette"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MMQyf0r9aB7",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "XaOuY4dVoJb",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Kidney-bowl-basin.jpg.jpg"],
        text: t("Kidney bowl/basin"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "wsrEl2PTcRJ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "q8n98mcaKa9",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Bowl"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bWXYXBStbYR",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KWA2lGwaOcl",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        img: ["../HISPVN-Core-Modules/Lao/asset/Cup.jpg.jpg"],
        text: t("Cup"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "sXTkMSKU2wS",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "S5BJToojdOL",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/Dressing-tray.jpg.jpg"],
        text: t("Dressing tray"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "kgQSC1GI1iQ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ivkOMzCXP5J",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        img: ["../HISPVN-Core-Modules/Lao/asset/IV_stand.jpg.jpg"],
        text: t("IV stand"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DA6GBW1JgSJ",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IexCo2zobUz",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Lancet / Scalpel / Blade"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Lancet-Scalpel-Blade.jpg.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Oz1epeyy3Ij",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "txBxM4UsIZN",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Scalpel/blade holder"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Scalpel-blade-holder.jpg.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QrK0I4c4c4E",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Td6SR1WqeMh",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Scissors, Dressing/Tissue, Curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Scissors_Dressing-Tissue_Curved.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pZSX20ufZgK",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "woUyVZr8ilh",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Scissors, Dressing/Tissue, Straight"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Scissors_Dressing-Tissue_Straight.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hbKdusOlHTj",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "AlS8BVKD2ah",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Scissors, Episiotomy, Angled"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Scissors_Episiotomy_Angled.jpg.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ruDM5mh4Jgu",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "atT5oqgLCcd",
          },
        ],
      },
      {
        assignOrg: [true, true, true, false],
        text: t("Scissors, Episiotomy, Straight"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IKBExyqMV1b",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "GEdDciYmPlZ",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Metzenbaum scissors, curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Metzenbaum_scissors_curved.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "RkLoRDkHkRC",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vVbtvWWbmLY",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Metzenbaum scissors, straight"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xlMSQS6brje",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NqCHSuh4XM2",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Cooper surgical scissors, curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Cooper_surgical_scissors_curved.png",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "xYw18dAKht1",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "swEj8QtjtsA",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Cooper surgical scissors, straight"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "K3R9umJvO4g",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vjjSts17O8U",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Needle holder curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Needle_holder_curved_02.jpg",
          "../HISPVN-Core-Modules/Lao/asset/Needle_holder_curved_01.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MN7EsV4klfC",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NBpYWdwTmqx",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Needle holder straight"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Needle_holder_straight.jpg"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IXVcTXPaXhs",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "A9cogPOmRkN",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("DeBakey forceps"),
        img: ["../HISPVN-Core-Modules/Lao/asset/DeBakey-forceps.png"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Aud8AhG8EHh",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pXE2WU4msFh",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Tissue/Dissecting Non-Toothed"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps_Tissue-Dissecting_Non-Toothed.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "J8uGfuwWLiL",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SG0B4iussIQ",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Tissue/Dissecting toothed"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps_Tissue-Dissecting_toothed.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "jkqpV5DzEX6",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KfDXbs487gQ",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Towel forceps"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Towel_forceps.jpg"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "iTeGMq7kqsj",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QTUMPTExLRC",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Hemostatic forceps"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DcPz8FZ8f2p",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QjLaaIbaK7K",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Lister sinuc forceps, straight"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Lister-sinuc-forceps-straight.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "RLitK5favEd",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "gI82hEenCnM",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Kelly forceps, straight"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Kelly-forceps-straight.png"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "LYydJg8re4w",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "IxBGCGyRIfr",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Kelly forceps, curve"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Kelly-forceps-curve.png"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hTALTeAZWq3",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "WXeA0DKqBzp",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Pean forceps, straight"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Pean-forceps-straight.jpg"],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "k1KxdGAPPLO",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "B8bZTyG0KaP",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Pean forceps, curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Pean-forceps-curved-02.jpg",
          "../HISPVN-Core-Modules/Lao/asset/Pean-forceps-curved-01.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NRzbEUVS9GP",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "pydieJ49PQW",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Artery, Allis"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps_Artery_Allis_02.jpg",
          "../HISPVN-Core-Modules/Lao/asset/Forceps_Artery_Allis.jpg",
        ],

        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "uNRmwqrQOk9",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "gLxwvYFGGEt",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Allis tissue forceps"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "zDt57vcULm0",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "r9mG2nHqnxr",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Babcock tissue forceps"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Babcock-tissue-forceps.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "N4LQ1BuhJjA",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Pmwg6ijpLE6",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Forceps, Sponge, straight"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Forceps-Sponge-straight.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "DZVFveDYax8",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "e3e7LqGg5gF",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Retractor, Vaginal"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Retractor_Vaginal.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MTa6GBJOYFN",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "CQuyP8hXY57",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Deaver retractor"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Deaver-retractor.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nv9SsmQYnC6",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZAAaObaqtVt",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Ribbon retractor"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Ribbon_retractor.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZqmwN0waq1d",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "zcBOQo1oeCG",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Farabeuf retractor"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Farabeuf-retractor.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZNQVrefUPri",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "jCySiiNrJGo",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Mikulica retractor"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Mikulica-retractor.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "QWrkq4ZI8Nl",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "c3Z8rz9LnvZ",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Alligator forceps"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Alligator-forceps.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "JuJevtk9rEM",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "wetdTUrC3Ir",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Forceps, Artery, Mosquito, Curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps-Artery-Mosquito-Curved.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SjtBQjHj66j",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "tsIPrPyF2Jf",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Artery, Mosquito, Straight"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps_Artery_Mosquito_Straight.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Ne7026PL36N",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Q61jgZIiwh7",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Artery, Kocher Toothed"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps-Artery-Kocher-Toothed.jpg",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "sRtHWcaRfCo",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "hLqpWc3uHZx",
          },
        ],
      },
      {
        assignOrg: [true, true, true, true],
        text: t("Instrument tray"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Instrument-tray.jpg"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "sjpgsrX6Mxv",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "XSDjtsn25wU",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps artery, Crile, straight"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps-artery-Crile-straight.png",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "qw2emhQCpd2",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "lppQeW4H8a9",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Tiley Henckel Punch forceps"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "cth77xW8IQH",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "X3f4IZnWjKr",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Rugin"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "KmHz9T3Trol",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nac0p9p9xPY",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Point carree"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NwP5SI17EVO",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ir1gEnAnJrF",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Ciseaux a os"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ZNHB0Y7xLlb",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ewCXD2AOJiR",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Pinces gouge"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nvu6SarilXa",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "AV2ccNibZ0d",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Liston bone cutting forceps"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "FnGHTNtZ1G1",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "FH4E8ro79uD",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Forceps, Artery, Crile, Curved"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Forceps-Artery-Crile-Curved.png",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ET5qo7Lhhdw",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "oGzUGH4UeUh",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Jug, Liquid measuring"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nvbRxA76Rbr",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "bYxkpxSpdSx",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Nailbrush (Surgical brush)"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Nailbrush-Surgical_brush.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "NraJvVFkXIj",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "uKfW9DaCeU0",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Needle container"),
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "z8RCMM8UtBo",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "svCVafnKTpB",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Monitor"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Monitor.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "zSU8T3uhzU6",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "nNYEzbY6iJx",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Anesthesia machine"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Anesthesia_machine.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "Nbhh9IkYgQz",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "BMzvm2QKaZk",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Laringoscope"),
        img: [
          "../HISPVN-Core-Modules/Lao/asset/Laringoscope_02.png",
          "../HISPVN-Core-Modules/Lao/asset/Laringoscope_01.png",
        ],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "ASibkUDHX01",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "MNd6CouR9lA",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Airway"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Airway.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "FIj1YEFj3QH",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "vrRV8gnO2fp",
          },
        ],
      },
      {
        assignOrg: [true, false, true, false],
        text: t("Plate and screw"),
        img: ["../HISPVN-Core-Modules/Lao/asset/Plate-and-screw.png"],
        data: [
          { display: "text", cellProps: tableCellStyles.empty },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "eghwQKX9U40",
          },
          {
            cellProps: tableCellStyles.value,
            cc: "TiHjDIadDIL",
            coc: "lmbxvugTvKr",
            dsde: "SqTQfpLLz9v",
          },
        ],
      },
    ],
  ];
  useEffect(() => {
    if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "Ky8EJEqdpGP")
    ) {
      //DH-A
      setOrgUnitGroup(0);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "ZcbWJfYaX5n")
    ) {
      //DH-B
      setOrgUnitGroup(1);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "GiRpQWVJ24q")
    ) {
      //PH: Provincial Hospitals
      setOrgUnitGroup(2);
    } else if (
      orgUnit.organisationUnitGroups.find((group) => group.id === "U53tdte60Ku")
    ) {
      //HC: Health Centers
      setOrgUnitGroup(3);
    }
  }, [orgUnit]);

  const saveDataValueWhenDisable = async (dsde, coc) => {
    const currentOrgUnit = orgUnit.id;
    const result = await saveDataValue(
      "b9xZzt8pjgy",
      currentOrgUnit,
      period.dhis2Period,
      dsde,
      coc,
      ""
    );
    if (result.ok) {
      setDataValueDirty(dsde, coc, currentOrgUnit, false);
      setDataValueError(dsde, coc, currentOrgUnit, "");
    } else {
      const error = `${t("value")}: ${""}<br/><br/>${result.json.message}`;
      setDataValueError(dsde, coc, currentOrgUnit, error);
    }
  };

  const tableConfigs4 = useMemo(() => {
    let stt = 1;
    let payload = [];
    let newSections = [];
    let headerTable = [
      "Capital equipment",
      "Medical chart",
      "IEC material",
      "Consumables",
      "Examination equipment",
      "Treatment equipment",
      "Surgical instrument and equipment",
    ];
    lstSections.forEach((section, i) => {
      let lstDeInSection = [];
      section.forEach((row) => {
        let rowData = [];
        if (row.assignOrg[orgUnitGroup]) {
          rowData = rowData.concat([
            { display: "text", text: stt, cellProps: tableCellStyles.no },
            {
              display: "text",
              text: t(row.text),
              img: row.img ? row.img : "",
              cellProps: tableCellStyles.value,
            },
          ]);
          row.data.forEach((de, index) => {
            const nextDe = row.data[index + 1];
            if (
              index === 0 &&
              dataValues[`${nextDe?.dsde}-${nextDe?.coc}-${orgUnit.id}`]
                ?.value !== "true"
            ) {
              rowData = rowData.concat({ ...de, disabled: true });
              if (
                dataValues[`${de.dsde}-${de.coc}-${orgUnit.id}`] &&
                dataValues[`${de.dsde}-${de.coc}-${orgUnit.id}`]?.value
              ) {
                setDataValue(de?.dsde, de?.coc, orgUnit.id, "");
                saveDataValueWhenDisable(de?.dsde, de?.coc);
              }
            } else {
              rowData = rowData.concat(de);
            }
          });
          stt++;
        }
        lstDeInSection.push(rowData);
      });
      if (lstDeInSection.length > 0) {
        newSections.push(headerTable[i]);
        payload.push(lstDeInSection);
      }
    });
    setHeaderTable4(newSections);
    return payload;
  }, [
    orgUnitGroup,
    ...listDsde.map(
      (dsde) => dataValues[`${dsde}-lmbxvugTvKr-${orgUnit.id}`]?.value || null
    ),
  ]);

  return (
    <Box className="ehsp-baseline-survey-tab">
      {tableConfigs4.length > 0 && (
        <Table id="ehsp-baseline-survey-table-1" stickyHeader>
          {headerTable4.map((header, index) => {
            return (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell className="cell-header-table">No.</TableCell>
                    <TableCell className="cell-header-table">
                      {header}
                    </TableCell>
                    <TableCell className="cell-header-table">
                      # of equipment
                    </TableCell>
                    <TableCell className="cell-header-table">
                      Availability
                    </TableCell>
                    <TableCell className="cell-header-table">
                      Function
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MapTable dataElementConfigs={tableConfigs4[index]} />
                </TableBody>
              </>
            );
          })}
        </Table>
      )}
    </Box>
  );
};

export default Tab4;

const listDsde = [
  "s2hVZHJG6bh",
  "rlZkxpzV2Ju",
  "S3vhmi0tEoB",
  "Q6pzjFIwleF",
  "lCsGqYbsjWk",
  "n6OZmDHkT0Y",
  "e3wzFRk8KGf",
  "MIsZCOt9BIz",
  "ybgoBCT3Kbx",
  "KMCmL2Z4DHq",
  "SyPjW2CUkY8",
  "g11xtJgM711",
  "pH2RbJDamBp",
  "sxC6w1YkBLn",
  "E4nje9k4sZm",
  "fKKgcZZlT1J",
  "l2ztzEuJDON",
  "qZH6B4CJzUw",
  "PlyWzJkzRod",
  "iEQcIz1whBX",
  "aVirbESbf9i",
  "ref6ljiWD6L",
  "piHPvlxk99l",
  "G9bwjMl7OKl",
  "uhlAaHjU0YE",
  "KVCEBAAEwbe",
  "DKHOYFPce8U",
  "tYtJdjtuiZe",
  "UOcsCXI2kql",
  "gEO3q2eRne7",
  "bdaCwkopeiq",
  "FfZbNDAFN4k",
  "y7fc9u0zoK7",
  "NeiZiJWhJRk",
  "ymggI7fXKjd",
  "UhjdAFD7KfJ",
  "VAXDWee9HV4",
  "egu7UUI7hyV",
  "mun0NvS9Fl9",
  "aX20sMQgzIZ",
  "z3Keb8DPMRs",
  "KfEvEHd55KY",
  "IFQwEbTKLc1",
  "jLTN10BDRvM",
  "iLU0wfWgebP",
  "cgVEXaNFAS3",
  "vNFbqdy3SIt",
  "xllwIfccoWD",
  "hbXLQN0LsUl",
  "VMPKGCb28My",
  "xFVy6a2TKTQ",
  "W3YsFkAtp8d",
  "T7BsDMl6Sfw",
  "lCErqTZYnaw",
  "wdBbtsqf9qs",
  "Qd602zh1xQw",
  "LCemZRr20pR",
  "DG3RNo5mszg",
  "nzHetAXGrmf",
  "qkOZ5Ec7vIQ",
  "SamIeSG6uC9",
  "qoHYBQhNrns",
  "WugqH9Ch2RC",
  "yHBUVXXVUqU",
  "Rk1o48JJDnh",
  "QJIymdefFz9",
  "VvTJhDzUCwy",
  "YNBrUBrzE5y",
  "KLJbvi4vASS",
  "OiUQRngpksz",
  "klLnF9o65QW",
  "IF657QbUNkn",
  "tVJjvJI8FFi",
  "rUELRd31lpA",
  "v1nJ3vDfOGM",
  "VdqrYSoBvnc",
  "JgxJ3DOtvRp",
  "SmZ3vYW4d7L",
  "lUqxscTsCHI",
  "xCXDzo3EBvz",
  "EHGfiCGxhTd",
  "DAb4006TG2M",
  "QgnAxGGkXAA",
  "bW4VjzaL5j3",
  "RbGsuLL0m1l",
  "sYa7IfWmEPy",
  "CekYY5zcJtP",
  "aOdKg7FOmpt",
  "bNkJOw2bAO6",
  "efltX572jcj",
  "O86lYiSSN4t",
  "eDdqVb9qS1b",
  "Ao9wOzq9HQG",
  "DAk81Ck6wmz",
  "Zmr9T2KlyD1",
  "y7m8Zs9vxc7",
  "JjBmQ9cGg3j",
  "G4ujmyWbTKR",
  "PVtB3mTc0uQ",
  "pwXjVIwpHnL",
  "h5Wlxm7OmQ9",
  "GkHIOydumUc",
  "hD5074X4v2I",
  "BSMBjZrncs4",
  "p0IKjCDpIJw",
  "ezYKEi3RlLg",
  "CO3HJ6htEx3",
  "XhZlRob1fr8",
  "MESJN82Zapq",
  "bKPYuH5Zrjh",
  "F3UNO7GFQPz",
  "gWfd7JXbeoF",
  "T7gJbvEq32x",
  "qkLqKPquz7t",
  "Kdiil6uvsBJ",
  "Nksrd2k640G",
  "oLtRLTc13dI",
  "YDGEYjEq9ZE",
  "GE6VABqrLhF",
  "TqNIg4D2EIj",
  "MMQyf0r9aB7",
  "wsrEl2PTcRJ",
  "bWXYXBStbYR",
  "sXTkMSKU2wS",
  "kgQSC1GI1iQ",
  "DA6GBW1JgSJ",
  "Oz1epeyy3Ij",
  "QrK0I4c4c4E",
  "pZSX20ufZgK",
  "hbKdusOlHTj",
  "ruDM5mh4Jgu",
  "IKBExyqMV1b",
  "RkLoRDkHkRC",
  "xlMSQS6brje",
  "xYw18dAKht1",
  "K3R9umJvO4g",
  "MN7EsV4klfC",
  "IXVcTXPaXhs",
  "Aud8AhG8EHh",
  "J8uGfuwWLiL",
  "jkqpV5DzEX6",
  "iTeGMq7kqsj",
  "DcPz8FZ8f2p",
  "RLitK5favEd",
  "LYydJg8re4w",
  "hTALTeAZWq3",
  "k1KxdGAPPLO",
  "NRzbEUVS9GP",
  "uNRmwqrQOk9",
  "zDt57vcULm0",
  "N4LQ1BuhJjA",
  "DZVFveDYax8",
  "MTa6GBJOYFN",
  "nv9SsmQYnC6",
  "ZqmwN0waq1d",
  "ZNQVrefUPri",
  "QWrkq4ZI8Nl",
  "JuJevtk9rEM",
  "SjtBQjHj66j",
  "Ne7026PL36N",
  "sRtHWcaRfCo",
  "sjpgsrX6Mxv",
  "qw2emhQCpd2",
  "cth77xW8IQH",
  "KmHz9T3Trol",
  "NwP5SI17EVO",
  "ZNHB0Y7xLlb",
  "nvu6SarilXa",
  "FnGHTNtZ1G1",
  "ET5qo7Lhhdw",
  "nvbRxA76Rbr",
  "NraJvVFkXIj",
  "z8RCMM8UtBo",
  "zSU8T3uhzU6",
  "Nbhh9IkYgQz",
  "ASibkUDHX01",
  "FIj1YEFj3QH",
  "eghwQKX9U40",
];
