import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./tb-treatment-outcome.css";
import { useEffect } from "react";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { pull } from "@/utils/fetch";
import useDataEntryStore from "@/state/dataEntry";
import { useTranslation } from "react-i18next";
import { saveDataValue } from "@/api/icapture/dataValue";
import TotalCell from "../common/TotalCell";

const dsdeMapping = {
  EJOMQCCiceI: "D6ZZJ6Qhbl2",
  qYPdJxTnn2p: "l50IUuchiDX",
  xIMn1N8HgzL: "ZIbirAPUpc3",
  NHe4tIMkkB6: "N46nRMzaZXD",
  PhIHfkOjncb: "C3GSXm7kbw5",
  g3vUGYIQNBu: "vBMhjnp2GQ7",
  dFKRdhJQK5J: "Qdi96o3Pdhx",
  RwDxufaQp03: "ntTGL0XZrr5",
  m79S3HipP54: "iiFJfTCHsCX",
  ZJNZUR50o0f: "M7K28uR7Tca",
  gx9i089QK9F: "nzkdSbL7FGP",
};

const RegisteredCell = ({ data }) => {
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const {
    dataValues,
    actions: { setDataValue },
  } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues, actions: state.actions }),
    shallow
  );
  useEffect(() => {
    (async () => {
      try {
        const periodLastYear = `${
          parseInt(period.dhis2Period.substring(0, 4)) - 1
        }${period.dhis2Period.substring(4, 6)}`;
        const result = await pull(
          `/api/dataValues.json?de=${
            dsdeMapping[data.dsde]
          }&pe=${periodLastYear}&ou=${orgUnit.id}&co=${data.coc}`
        );
        if (result.length > 0) {
          const newDataValue = result.reduce(
            (prev, curr) => prev + curr * 1,
            0
          );
          setDataValue(data.dsde, data.coc, orgUnit.id, newDataValue);

          const resultSave = await saveDataValue(
            "JIFWh1SgKJT",
            orgUnit.id,
            period.dhis2Period,
            data.dsde,
            data.coc,
            newDataValue
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return <>{dataValues[`${data.dsde}-${data.coc}-${orgUnit.id}`]?.value}</>;
};

const headerStyle = {
  backgroundColor: "#0288d1",
  fontWeight: "bold",
  color: "#fff",
};

const HeaderCell = styled(TableCell)(headerStyle);

const TbTreatmentOutcome = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="tb-treatment-outcome-form-container"
      className="custom-form remove-border-left"
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={2} sx={{ width: "15%", height: "50px" }} />
            <HeaderCell dangerouslySetInnerHTML={{ __html: t("Registered") }} />
            <HeaderCell>{t("Rescued")}</HeaderCell>
            <HeaderCell>{t("Completed")}</HeaderCell>
            <HeaderCell>{t("Failure")}</HeaderCell>
            <HeaderCell>{t("Died")}</HeaderCell>
            <HeaderCell>{t("Defaulted")}</HeaderCell>
            <HeaderCell>{t("Referred_out")}</HeaderCell>
            <HeaderCell>{t("Not_Evaluate")}</HeaderCell>
            <HeaderCell
              sx={{ width: "5%" }}
              dangerouslySetInnerHTML={{ __html: t("Total") }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs.map((item) => {
              const firstCellHaveDsdeIndex = item.findIndex((col) => col.dsde);

              return [
                ...item.slice(0, firstCellHaveDsdeIndex),
                {
                  ...item.slice(
                    firstCellHaveDsdeIndex,
                    firstCellHaveDsdeIndex + 1
                  )[0],
                  display: "text",
                  customCell: (
                    <RegisteredCell
                      data={
                        item.slice(
                          firstCellHaveDsdeIndex,
                          firstCellHaveDsdeIndex + 1
                        )[0]
                      }
                    />
                  ),
                },
                ...item.slice(firstCellHaveDsdeIndex + 1, item.length - 1),
                {
                  ...item.slice(item.length - 1)[0],
                  customCell: (
                    <TotalCell
                      listData={item
                        .slice(firstCellHaveDsdeIndex + 1, item.length - 1)
                        .map((col) => {
                          if (col.display) {
                            return null;
                          }
                          return `${col.dsde}-${col.coc}`;
                        })
                        .filter((col) => col)}
                    />
                  ),
                },
              ];
            })}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const typeStyle = {
  backgroundColor: "#81d4fa",
};
const labelStyle = {
  backgroundColor: "#4fc3f7",
};
const totalStyle = {
  backgroundColor: "#b3e5fc",
};
const deStyle = {
  backgroundColor: "#E1F5FE",
};
const disableStyle = {
  backgroundColor: "#ddd",
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "New",
      cellProps: { rowSpan: 4 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Ps+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "EJOMQCCiceI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "szWkser5kcp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ambf2dqb6cF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "t0uEvKvj9bu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xUV00bWpWTc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "L5JoTsl3TNM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "TJD7qM2V62R",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iiYs7pF0lTu",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qYPdJxTnn2p",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "n8ATZZfoLte",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zZFmHCke9eY",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cdKmbbudUO7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rou0RkXp0PT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kV5iNGhYAqe",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "znbjO38wsWY",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xIMn1N8HgzL",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Nq7OxOZsgxP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lvsad8bLU2A",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WKpIKQ0jC7d",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Vfr2fRCvqLx",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fjUbxdbMAW3",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RjJWv18MK5q",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "EP",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NHe4tIMkkB6",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fDQ6zTqY0KX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "L2oHBe82WIL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xilurmy6rIY",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RoH2gN5z7Uv",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fL3FgRCrpZh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OSGCBYH6I53",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Relapsed",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PhIHfkOjncb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XmIVeM3YoeQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IJga0fsMfoe",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oL8J31ZrbQh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GPDieiaTwmS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Om8voR8hQHx",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Bkdy8ZjpF89",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cuSad7qceO1",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Failure",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "g3vUGYIQNBu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZvuILkiSIbq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NogMor56Tcg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "TqTY1vrueI8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zX4b1CnEVVs",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "axcR3bMjE7F",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xCTk3KA12p2",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eD0l43qGJNO",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Relapsed_after_cue",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dFKRdhJQK5J",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "svUepJ0nl7e",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "w1sTYGDhS7r",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xDykzfOYq7D",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fxbyHcRZoqb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "p3VTdCEBIYh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PA8xQWu4Gyy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JXYBRaTvuch",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Others",
      cellProps: { rowSpan: 4 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Ps+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RwDxufaQp03",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tuZ3T2x4HDX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Qi23qlZFuHr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bzUo5D0u0zS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "D0Pvr0IUyHL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SAe7Syi6NPF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cgGLwanNotS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ldPdnqEEOmU",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "m79S3HipP54",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YRHofvt9rHP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lqmzIYAef8x",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "o9hDig9uxFJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UhPIhMiihB7",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JVnpPkxxvEJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fYZH3DkBlis",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Ps-b-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZJNZUR50o0f",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LD281JYn7Eo",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZRNmh7Le5He",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KaX1b2yiGvK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DaMT8zcO0Kk",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uySBe7hyBaN",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xhzUb2zqmxM",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "EP",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gx9i089QK9F",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gkZT51qbMZZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "n6r9eEK6cmj",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "duWRwmLDvnZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hbOCk2krxrR",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cnfmrjrnGFG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "N5dhhZZ4CLZ",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
];

export default TbTreatmentOutcome;
