import { Box, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import useEventCaptureStore from "@/state/eventCapture";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import TableSection from "../common/TableSection";
import "../common/index.css";
import "./ncle-disease.css";
import { useEffect, useMemo, useState } from "react";

const NcleDisease = () => {
  const [prevDisease, setPrevDisease] = useState(null);
  useAgeInYearRule("Z1x2iwf6IIY", "zDPvXY6h4JN");
  useForeignerRule("jaan5ZI8EnJ", villageSelectorIds);

  const currentEvent = useEventCaptureStore((state) => state.currentEvent, shallow);
  const setCurrentEventDataValue = useEventCaptureStore((state) => state.actions.setCurrentEventDataValue, shallow);

  const getDiseaseSymtomConfigs = (listId) => {
    if (!listId) return [];
    const dataElementConfigs = [];
    for (let i = 0; i < listId.length; i += 3) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const dataElement = listId[i + j];
        if (dataElement) {
          row.push({
            id: dataElement,
            display: "checkboxLeft",
            cellProps: j === 0 ? { sx: { "& .input-field-container": { borderLeft: 0 } } } : {}
          });
        } else {
          row.push({ display: "empty" });
        }
      }
      dataElementConfigs.push(row);
    }
    dataElementConfigs.push([{ id: "PRrmBVwmWRj", ...s2CommonProps }]);

    return dataElementConfigs;
  };

  const section1Configs = useMemo(
    () => [
      [{ id: "GUM9z9xJibL", labelCellProps: { sx: { width: "400px" } } }],
      [{ id: "lQSUx15reeW" }],
      [{ id: "rVgvJgkKGeG" }],
      [{ id: "fou2X6uMkty" }],
      [{ id: "Dyq13cMGMzT" }],
      [{ id: "Z1x2iwf6IIY" }],
      [{ id: "zDPvXY6h4JN", fieldProps: { disabled: true } }],
      [{ id: "C6GNCkAmbq8" }],
      [{ id: "CC9BpgSQbfh" }],
      [{ id: "jaan5ZI8EnJ" }],
      [{ id: "Nsv148saunk" }],
      [{ id: "gCsRiEbhb5C" }],
      [{ id: "jGFlzCOqeOZ" }],
      [{ id: "qwCPWI3FOWz" }],
      [{ id: "VxyFtFkaFpf" }],
      [{ id: "X9MHC5LYGuX" }],
      [{ id: "OhuguJqwvHt" }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: Boolean(currentEvent.dataValues["jaan5ZI8EnJ"])
        }
      ],
      [{ id: "bS8cPIyCJNR" }],
      [{ id: "p3jMZ9XRiIJ" }],
      [{ id: "zyZCBNbRZqm" }],
      [{ id: "iuVbJUaYMd9" }],
      [{ id: "u9d8bW7kQRH" }],
      [{ id: "V3LmnBBUufg" }],
      [{ id: "AkDupQMN7pM" }]
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  const section2Configs = useMemo(
    () => [
      ...getDiseaseSymtomConfigs(diseaseSymtomps[currentEvent.dataValues["Dyq13cMGMzT"]]),

      [{ id: "zWRBZO1YZnP", ...s2CommonProps }],
      [{ id: "dI48g9UnLz1", ...s2CommonProps }],
      [{ id: "RcbcCZu2OQe", ...s2CommonProps }],
      [{ id: "HSCmuBr76Cj", ...s2CommonProps }],
      [{ id: "A0TfrV40dH7", ...s2CommonProps }],
      [{ id: "V1u1lUdxT0m", ...s2CommonProps }],
      [
        {
          display: "text",
          text: "History of vaccination (If any)",
          cellProps: { sx: { fontWeight: "bold" } }
        },
        {
          customCell: <HistoryOfVaccination />,
          isCustomCellHide: false
        }
      ]
    ],
    [currentEvent.dataValues["Dyq13cMGMzT"]]
  );

  useEffect(() => () => setPrevDisease(currentEvent.dataValues["Dyq13cMGMzT"]), [currentEvent.dataValues["Dyq13cMGMzT"]]);

  useEffect(() => {
    if (prevDisease) {
      diseaseSymtomps[prevDisease].forEach((id) => {
        if (id) setCurrentEventDataValue(id, "");
      });
    }
  }, [prevDisease]);

  return (
    <Box className="custom-form" id="ncle-disease-form-container">
      <TableSection className="bordered" dataElementConfigs={section1Configs} tableName="ncle-disease" noHeader />
      <br></br>
      <TableSection dataElementConfigs={section2Configs} tableName="ncle-disease-section-2" sectionTitle="Symtoms" className="bordered" />
    </Box>
  );
};

const villageSelectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell>{t("currentAddress")}</TableCell>
      <TableCell>
        <Box className="bordered-left">
          <VillageSelector dataElementIds={villageSelectorIds} storeGeometry={true} />
        </Box>
      </TableCell>
    </>
  );
};

const historyOfVaccinationConfigs = [
  [{ id: "KD79hk6f5MF" }],
  [{ id: "xvX9CwrPd88" }],
  [{ id: "yjTb0eImNi8" }],
  [{ id: "Y77nqfloYSs" }],
  [{ id: "YA1NyT5rlNY" }]
];

const s2CommonProps = {
  fieldCellProps: { colSpan: 2 }
};

const HistoryOfVaccination = () => {
  return (
    <TableCell colSpan={2}>
      <Box className="bordered-left">
        <TableSection
          noHeader={true}
          tableName="history-of-vaccination"
          dataElementConfigs={historyOfVaccinationConfigs}
          sx={{ "& tr:last-child td": { borderBottom: 0 } }}
        />
      </Box>
    </TableCell>
  );
};

const diseaseSymtomps = {
  1: ["SIRX3h55H4t", "gi77vJH30YB", "E1CizKSDcKM", "FxVHR6J1033", "Pt17tqRwsWx", "xITefDCj3jK", "wOvVjobAQZC"],
  2: ["Z6hO3eXouPz", "U9JBMssWfAJ", "kktesDFdpdL", "ym1HeXGXEs2", "JujiJ2ksu7S", "NValp9x7DQq", "SIRX3h55H4t", "usd5JbByPUq"],
  3: ["KfA3nYD3O4F", "gojYZvklOpF", "qMOMy1V1Pwc", "PcjPdJPU6hr"],
  4: ["VVQFhwUjHmI", "VRsOR8syb7X", "rtZZErWT7nO"],
  5: ["Xy3hjKLw4QK", "S4WFjhrTKDj", "jbmrvuj8kyh", "Zm41ecXvamH", "SIRX3h55H4t", "rek3dTE7OhH", "WqfOVmMEULs", "q5C3whwzVA5", "tqC1NORG6AG"],
  6: ["dI2BBMH8Tp9", "ym1HeXGXEs2", "MDQ8S54eeXJ", "kuQGUFr9qQt"],
  8: ["zyOLSCtjMSF", "JujiJ2ksu7S", "SIRX3h55H4t", "HN17Gig2SUF"],
  9: ["Bfohld7XN2E", "JujiJ2ksu7S", "SIRX3h55H4t", "k6I49LZ1hWo", "HN17Gig2SUF"],
  10: ["zyOLSCtjMSF", "JujiJ2ksu7S", "Ef85tZETz0d", "SIRX3h55H4t", "VzdhayX3oAF", "vjlayJNT17s", "HN17Gig2SUF", "Pmc9Fh19fDR"],
  11: ["zyOLSCtjMSF", "DVzt535AcjM", "Y7dmGdKPJkw", "FNtcnQx8iKc", "NValp9x7DQq", "Zm41ecXvamH", "fnl0yTfo1Ki", "o9ulQ9pviEF", "pdCojKJ5pxA"],
  12: [
    "DVzt535AcjM",
    "KfA3nYD3O4F",
    "uZoUS2kMJEJ",
    "YgVxYCesuQ1",
    "SIRX3h55H4t",
    "JAduxpCJbpl",
    "TkoCGASREZU",
    "exM4rH5K10A",
    "VzdhayX3oAF",
    "gFGWrtKAHLE",
    "t53n26YfOTi",
    "Pmc9Fh19fDR"
  ],
  13: ["xtbLyF9Euaq", "DVzt535AcjM", "SIRX3h55H4t", "xVfnSQjCR1E", "o9ulQ9pviEF"],
  14: [
    "NBKbOxMEY7M",
    "aRGrqiJqcrl",
    "K9wXRvwNgIE",
    "KfA3nYD3O4F",
    "Vh7MQuXAxF6",
    "fnl0yTfo1Ki",
    "eHz1iOlmkFw",
    "VzdhayX3oAF",
    "fYpWeaE6bBC",
    "usd5JbByPUq",
    "Pmc9Fh19fDR"
  ],
  15: [
    "NBKbOxMEY7M",
    "K9wXRvwNgIE",
    "VJGRPMwkjEB",
    "KfA3nYD3O4F",
    "guI8DrDPhKk",
    "Zm41ecXvamH",
    "AvSPZACYO37",
    "HfpVFYwQD0p",
    "FxVHR6J1033",
    "dp5Kq1PboxE",
    "epI8kXMeYeT",
    "Pmc9Fh19fDR"
  ],
  16: ["SIRX3h55H4t", "o9ulQ9pviEF", "XqwTeKhB6Jy", "N2PcxxzVT9W", "HLlMIORAgEK", "mGpdmcCIG9Q", "fnl0yTfo1Ki", "WWx1lUNOxpn", "a5oIrymizFr"],
  17: ["ym1HeXGXEs2", "DWE0kcAvauK", "zl4bpFr4xCe", "WqfOVmMEULs"],
  18: ["wvxfI5GZaIi", "SKLaDugpruy", "Gkm3fHUYObW"],
  7.1: ["hGDGGfkd6us", "SIRX3h55H4t", "fnl0yTfo1Ki", "VzdhayX3oAF", "usd5JbByPUq", "hjwUHpPBihj", "Pmc9Fh19fDR"],
  7.2: [
    "zyOLSCtjMSF",
    "hGDGGfkd6us",
    "CDuWEhBZXnH",
    "SIRX3h55H4t",
    "eHz1iOlmkFw",
    "QiH1mKo7j0G",
    "DLclC43ImXG",
    "VzdhayX3oAF",
    "Xfo7Ejyg48v",
    "usd5JbByPUq",
    "maXpqwwcGNw",
    "hjwUHpPBihj",
    "Pmc9Fh19fDR"
  ],
  7.3: [
    "lxRYbQmORBR",
    "hGDGGfkd6us",
    "CDuWEhBZXnH",
    "ixKT6MISgEt",
    "SIRX3h55H4t",
    "hoyikxYll6N",
    "NDAvVfSjXGV",
    "eHz1iOlmkFw",
    "QiH1mKo7j0G",
    "DLclC43ImXG",
    "VzdhayX3oAF",
    "nuRhJ6bcqGs",
    "Xfo7Ejyg48v",
    "usd5JbByPUq",
    "mKGHjmCOQGB",
    "maXpqwwcGNw",
    "dUfQQtJ6rG9",
    "T0WSJCAZoaa",
    "hjwUHpPBihj",
    "Pmc9Fh19fDR"
  ]
};

export default NcleDisease;
