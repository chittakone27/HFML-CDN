import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../../common/MapTable";

import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { useEffect, useMemo, useState } from "react";
import useDataEntryStore from "@/state/dataEntry";
import { saveDataValue } from "@/api/icapture/dataValue";
import { useOpeningStockStore, withOpeningStockContext } from "../hocs";
import _ from "lodash";

const CloseCell = ({ listData, save = null }) => {
  const period = useSelectionStore((state) => state.period, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
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
      listData.receive.reduce(
        (prev, curr) =>
          prev +
          (dataValues[`${curr}-${orgUnit.id}-${attributeOptionCombo.id}`]
            ?.value * 1 || 0),
        0
      ) -
      listData.spend.reduce(
        (prev, curr) =>
          prev +
          (dataValues[`${curr}-${orgUnit.id}-${attributeOptionCombo.id}`]
            ?.value * 1 || 0),
        0
      ),
    [
      ...listData.receive.map(
        (item) =>
          dataValues[`${item}-${orgUnit.id}-${attributeOptionCombo.id}`]?.value
      ),
      ...listData.spend.map(
        (item) =>
          dataValues[`${item}-${orgUnit.id}-${attributeOptionCombo.id}`]?.value
      ),
    ]
  );

  useEffect(() => {
    if (
      save &&
      !_.isEmpty(dataValues) &&
      dataValues[
        `${save.dsde}-${save.coc}-${orgUnit.id}-${attributeOptionCombo.id}`
      ]?.value *
        1 !==
        result
    ) {
      (async () => {
        try {
          const resultSave = await saveDataValue(
            "lX2gNwsdZwV",
            orgUnit.id,
            period.dhis2Period,
            save.dsde,
            save.coc,
            result,
            attributeOptionCombo
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

const OpeningAutoCell = ({
  openingStockDsde,
  openingStockCoc,
  lastMonthDsde,
  lastMonthCoc,
}) => {
  const openingStockLastMonthVals = useOpeningStockStore();

  const period = useSelectionStore((state) => state.period, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const dataValues = useDataEntryStore((state) => state.dataValues, shallow);
  const setDataValue = useDataEntryStore(
    (state) => state.actions.setDataValue,
    shallow
  );
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );

  const [value, setValue] = useState("0");
  useEffect(() => {
    (async () => {
      const foundValue =
        openingStockLastMonthVals[`${openingStockDsde}-${openingStockCoc}`];
      if (foundValue && !_.isEmpty(dataValues)) {
        // current last month
        const currentValue =
          dataValues[
            `${lastMonthDsde}-${lastMonthCoc}-${orgUnit.id}-${attributeOptionCombo.id}`
          ]?.value;

        if (foundValue !== currentValue) {
          try {
            const resultSave = await saveDataValue(
              "lX2gNwsdZwV",
              orgUnit.id,
              period.dhis2Period,
              lastMonthDsde,
              lastMonthCoc,
              foundValue,
              attributeOptionCombo
            );
            if (resultSave.ok) {
              setValue(foundValue);
              setDataValue(lastMonthDsde, lastMonthCoc, orgUnit.id, foundValue);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setValue(foundValue);
        }
      }
    })();
  });
  return <>{value}</>;
};

const headerStyle = {
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
};

const HeaderCell = styled(TableCell)(() => headerStyle);

const Title = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: 10,
  fontWeight: "bold",
}));

const MonthlySummaryStockReport = () => {
  const { t } = useTranslation();

  return (
    <Box id="monthly-summary-stock-report">
      <Title variant="h6" sx={{ textDecoration: "underline", mt: 2 }}>
        3. Monthly summary stock report table
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell rowSpan={2}>{t("Item")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Unit")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Opening_stock_auto")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Opening_stock")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Stock_out")}</HeaderCell>
            <HeaderCell colSpan={2}>{t("Receive")}</HeaderCell>
            <HeaderCell colSpan={5}>{t("Dispensed")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Lost")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Expiring_90_days")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Expired")}</HeaderCell>
            <HeaderCell rowSpan={2}>{t("Closing")}</HeaderCell>
          </TableRow>
          <TableRow>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Receive_this_month")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Received_from_transfer")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Dispensed_to_patient")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Issued_to_HC")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Transfer")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Transfer_ACD")}
            </HeaderCell>
            <HeaderCell sx={{ backgroundColor: "#1976D2" }}>
              {t("Transfer_TES")}
            </HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection3} />
        </TableBody>
      </Table>
    </Box>
  );
};

const labelStyle = {
  backgroundColor: "#42A5F5",
};

const unitStyle = {
  backgroundColor: "#64B5F6",
};

const deStyle = {
  backgroundColor: "#BBDEFB",
};

const checkbox = {
  className: "checkbox",
};

const addTotalConfigs = (deConfigs) =>
  deConfigs.map((item) => {
    return [
      ...item.slice(0, item.length - 1),
      {
        ...item.slice(item.length - 1)[0],
        display: "text",
        customCell: (
          <CloseCell
            listData={{
              receive: [3, 5, 6].map((dataIndex) => {
                return `${item[dataIndex].dsde}-${item[dataIndex].coc}`;
              }),
              spend: [7, 8, 9, 10, 11, 12, 14].map((dataIndex) => {
                return `${item[dataIndex].dsde}-${item[dataIndex].coc}`;
              }),
            }}
            save={{
              dsde: item.slice(item.length - 1)[0].dsde,
              coc: item.slice(item.length - 1)[0].coc,
            }}
          />
        ),
      },
    ];
  });

const dataElementConfigsSection3 = addTotalConfigs([
  [
    {
      display: "text",
      text: "RDT",
      style: { ...labelStyle, width: "9%" },
    },
    {
      display: "text",
      text: "Test",
      style: { ...unitStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PIfphG0y49E",
      style: { ...deStyle, width: "8%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yia3d2eM9kj",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "T9RRc9psZ1P",
      style: { ...deStyle, width: "5%" },
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "stvmrNRY9Z8",
      style: { ...deStyle, width: "7%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gp1B8HsAB60",
      style: { ...deStyle, width: "7%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "D17edGoEwxT",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "V8B2hbpYiXK",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KOujeLuua7f",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NiZYSLYwpJi",
      style: { ...deStyle, width: "7%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WEDD6BWcoVi",
      style: { ...deStyle, width: "8%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "B29xRoJ32Tv",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UpScy0yu5xW",
      style: { ...deStyle, width: "7%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "j0JoZYAw8zP",
      style: { ...deStyle, width: "5%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "to06BpNCfJq",
      style: { ...deStyle, width: "5%" },
    },
  ],
  [
    {
      display: "text",
      text: "G6PD",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Test",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sWEchTRGo7e",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KZwNJBfEIPO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ugHYNMos5JX",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "aEqe4rZ3WZT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UYAipvE0YYo",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HUKHCinJaet",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LQPsGedv2pl",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RP1PgucLPK9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Py7Othcx0Tr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pYK1jZUvUTI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SJkHE3z3SXn",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h0fM2edSisr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QnrQs9j4dgg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ql8QfzeQgN2",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Coartem6x1",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Blisters",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ILxa69mEu3t",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LBpgWOcdZMb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PWzNx2bseR6",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Iz4lmEsn672",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mQvNxfye54V",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "naA0R9l6h9X",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MtoyLzRp5zf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YZHDYIp02V6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nnM7YMxlyCQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yjXneL8Z61B",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "U9WOMeLIuSr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cTmY9OyvihU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mJBoWQErq8u",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Zmd2CIKSCwD",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Coartem6x2",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Blisters",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yd80FM8o0de",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Fi1BBIFNJlc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "v4HAgGvW2dV",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YyfkDg8ZqHV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "P9zcnU1rvC2",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "X6PGigBc3un",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "f8rjCGcJIy0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YAKe0xIlVyU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rXQ79CVy0bE",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XE3LeT2LrpA",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Va9Owx7Pi2M",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "K1nntvzcsJK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ly5OR64JbWg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "AAYZpLsfDdO",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Coartem6x3",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Blisters",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hcNFNQeqUAt",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h6MPEePXwm0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "haAEtdS70uD",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HNQZopygZV7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FPqd0fA41md",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "i2doErWT8PI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LG23uqn1kw8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xGyQyFE6L2h",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Z2PgmaLJuor",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LZcyha9ttXM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GMbb5BcDs4H",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lYXp8MNUlYR",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wLyPvx49DTK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Rdn5Ek1uoBR",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Coartem6x4",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Blisters",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yGxPFHRhOej",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "H6E8DRU76ne",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cTcY4j1YiHQ",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dF8uP7TWSMz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "f0tFLSW8sWj",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "io8n0MMhHGv",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oUk2gvxdoRw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cnSc7owwryt",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pMNGvwwGWlR",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xZ6XNzM8apX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "czix2JdvrOw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ST5YGWFXmVk",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lAA58ysOugs",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ogduLvSIEyq",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Artesunate 60 mg",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Vials",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PUXgXAeHLPQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "l78uYp68KUH",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ece1BitkQ4W",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XFz5bG00QEV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cwjvqaxmYFa",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MTYSXHWe8jZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DuuW8yOwr2J",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LukP6UgTdrd",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FD6sR6RtEm8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gy1jp0elUQM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gez3tHhrz70",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jC1i9YT8Xi2",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hCsevfG3pI1",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "R3ube1Xc7mm",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Primaquine 7.5 mg",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Tablets",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NAEulNwxR6p",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yrCzHfkSwzb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tlRER9fhMav",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hnEphPKDAyZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "TkZ66i3etzp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sljhSz8YH2E",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "D9ElNlGjV4z",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JmZi5b6Ds7o",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BTb3BszpaIX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "W5MPW1jlPMJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "U2s0pXHKJeg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "R4Ci0rgFE54",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lrytVMJiyW5",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZDeRWw3ekeY",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Primaquine 15 mg",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Tablets",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ejVn6MCw1rN",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MOei9MBDbpu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jpAaGlfI57z",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VCAWCqFQTEO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RiKRJ7R696p",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "S6ZoVHtO0Ja",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nLPoE5yC5AV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ns519MRbA35",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KN3CzHVdnwD",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ntZsJ00q896",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oCSQZs0dYmN",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "X5a1SDG43t9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zsxnkofV550",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SMPaIfxBZco",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Paracetamol",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Blisters",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wciO8eGnrSf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rGycTe9JGmb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oMH00Hn4ip4",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ouadJa5Ht58",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Vja8PZsa2Ow",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GHBY8K9hl4Z",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WMwJmkvfNmF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cACubZeto8i",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rSMNgewUP1F",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CRffV8kyids",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VkPsO24VDhm",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YkRcuKcI3yB",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WAqrQn3Xx7M",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mcvIFmTmDZu",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ORS",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cW97KCASdqI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qidDuJayVZM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "es6srXg0Jqv",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VxvKlhjEHT3",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jsFd5UhA6FP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vnJ07dAlib6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DWcVX4wjaz1",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "X4UQEzAKPf3",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gXrQPPPz4to",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DdNqmaes7uf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CP9u0uT7uMG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XRbnKin2xtW",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FQZQKliWiHS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "AFUBZahxvwG",
      style: deStyle,
    },
  ],
  //
  [
    {
      display: "text",
      text: "Artesunate-Pyronaridine (ASPY)",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OJ5THjYqCNd",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tz0ZKmFYivK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qfLz5jmgDyM",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WDUNJ3jpKyw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "i6vGJWFBs9J",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eKk3thD8jCV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Sxdzx4N1Ahy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "u4PKxDbcUCK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eqY5yFgz9na",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "H6vGFzzFGX9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "F0BcRYxvWoz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kzvWReVafGI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DibbKgkzdhH",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Kj29ghgBU7L",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Artesunate-mefloquine (ASMQ)",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "C1Y0vdELKG0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yrbiXj4UcTg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mwlRCq9Ba2J",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ilbyJfvOSgL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RKk4XeEa9bS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qwZ6ED0wlkA",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "w3zx4j1R9pb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gQ975VDbdAr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FAzibxETzOr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "G0wWQC2XGVq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "skfJCYb1g8j",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wZdDs6GYRp7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YQtVbPIhUSE",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qKumEPo6rXU",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Quinine",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zF3FGR02JKF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "O1ejjhFmGTp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iNwQuQ7M6sB",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oneV5CioSXt",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sCAStAZIiul",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oVQFi2dLRU0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LC9yEMRlgTc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QQB0wjUh3nE",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wIBtQOX8NPu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lJBFWPGMWbB",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OTVB6YMiKYC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MwXNHqfe9QE",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SyAD5Nwb9gT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WrnXHU7T9e6",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Quinine",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "s85rnzQRpX8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hnRzzsGyLie",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FuD2ph9048e",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CGIWTkysns2",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KUhKics8Anq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kBJcFvqD4qJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DuTSYHxjE3J",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BbU3NCyhmwO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uoQ0hqAQ8RS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "C2Q49gmioY4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rs6HK9NgNiu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pvh9aaMj8XO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KSLdSRS8ENV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uFM8p2Wnx8z",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Chloroquine",
      style: labelStyle,
    },
    {
      display: "text",
      text: "Packs",
      style: unitStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mX2tvZut2vj",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PSdYwn2stp7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MmXyicIrtEf",
      style: deStyle,
      cellProps: checkbox,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Sds93BPqt6C",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hdXIlEj7Jva",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wLD6cus0VIh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ORm1AZ1nNoy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "EzIvNg9vLUE",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "W97EXqjgmRU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kMKjfFBpxf7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "m7NBkch3N0V",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Uu3cmXxLeBO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "acSki3vFJNu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "onExHOFsHYJ",
      style: deStyle,
    },
  ],
]);

const openingStocks = dataElementConfigsSection3.reduce((result, current) => {
  if (current[2].dsde) {
    current[2] = {
      customCell: (
        <OpeningAutoCell
          openingStockDsde={current[3].dsde}
          openingStockCoc={current[3].coc}
          lastMonthDsde={current[2].dsde}
          lastMonthCoc={current[2].coc}
        />
      ),
      cellProps: { sx: deStyle },
    };
  }
  if (current[3].dsde) {
    result.push(current[3]);
  }

  return result;
}, []);

export default withOpeningStockContext(
  MonthlySummaryStockReport,
  openingStocks
);
