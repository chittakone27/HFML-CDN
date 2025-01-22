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
import "./tb-treatment-outcome-v2.css";
import { useTranslation } from "react-i18next";
import useDataEntryStore from "@/state/dataEntry";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { saveDataValue } from "@/api/icapture/dataValue";
import { useEffect } from "react";
import { pull } from "@/utils/fetch";
import TotalCell from "../common/TotalCell";

const dsdeMapping = {
  HkfdkWVp0M9: "D6ZZJ6Qhbl2",
  QAlsRbYo380: "vbXYCi3iKZm",
  NHe4tIMkkB6: "oUok8xYQcAq",
  CSPiLV2F2Fa: "C3GSXm7kbw5",
  UFRBEenuSiz: "izEbukxm8oa",
  hEvc1jB1Rul: "j3AZcMNM3y6",
  NTZGWDo5pBS: "vBMhjnp2GQ7",
  bHmyrbXacbO: "DCLoTNwSGT8",
  eGrk8gckQGL: "b1IQfgcfneL",
  cf051rSkRyM: "Qdi96o3Pdhx",
  rViZtpPi5Lw: "Dc51iOEY0Rm",
  En4jdh8ccnc: "Gc9KGu3ay4B",
  JquFx5YQYEb: "ntTGL0XZrr5",
  Lh4wYTxx6Nu: "QpAMzshVzjL",
  gx9i089QK9F: "WndvDT8PPD1",
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
          const resultSave = await saveDataValue(
            "JIFWh1SgKJT",
            orgUnit.id,
            period.dhis2Period,
            data.dsde,
            data.coc,
            newDataValue
          );
          if (resultSave.ok) {
            setDataValue(data.dsde, data.coc, orgUnit.id, newDataValue);
          }
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

const TbTreatmentOutcomeV2 = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="tb-treatment-outcome-v2-form-container"
      className="custom-form remove-border-left"
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={2} sx={{ width: "15%", height: 40 }} />
            <HeaderCell
              dangerouslySetInnerHTML={{ __html: t("Registered") }}
              sx={{ width: 110 }}
            />
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
  color: "#000",
};
const labelStyle = {
  backgroundColor: "#4fc3f7",
  color: "#000",
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
      cellProps: { rowSpan: 3 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Pb+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HkfdkWVp0M9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iET21cpVnQN",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oVvkKr76SYH",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QzmprZin7eS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WH7lVjJ5zUJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oPtIaHelPFM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tDzN3KvQjaf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wodxBQAVgNG",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Pb-",
      style: { ...typeStyle, width: "100px" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QAlsRbYo380",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Pxj8KhZRO3a",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qV9lIwyIWIp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XgU68OUFFEJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vp9LEXetanh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "oX8BEjV6Lo4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xSObYzT2Se5",
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
  //
  [
    {
      display: "text",
      text: "Relapsed",
      cellProps: { rowSpan: 3 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Pb+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CSPiLV2F2Fa",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "g4qdKlKPLQ4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uYcdxgG4UDp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qkl3VCQamdP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "GKfn8OYlN2g",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "EybVTrdWIuQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WFwe3EO0Oie",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tvF3Zr2cMRg",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Pb-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UFRBEenuSiz",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Y533NU7fA1G",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "E59JFQFo7s3",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ePyvsaL90mc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iigPLKDhVK8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xUhxqaWoL2v",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LOKWZfGdgdI",
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
      dsde: "hEvc1jB1Rul",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FaQ2kNkb39a",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pVpaSJ43ZI1",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NSk2JquXTEX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PqE9lDJuYj6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WbGTbBBHLxc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NxE9ZtgIsqe",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  //
  [
    {
      display: "text",
      text: "Failure",
      cellProps: { rowSpan: 3 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Pb+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NTZGWDo5pBS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ivs1qKtPRs8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PC2DT4qhOli",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xb1gh3lNSA0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KUP9YTRWlww",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "X4f6L3GrYc6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JUld3Rshjvm",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "e5NYR44IiXR",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Pb-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bHmyrbXacbO",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QEMVU0BpTWe",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iEbjsV7wByH",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rQi9HWeyVxa",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JjDyYcmSL6d",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gq4CjM57i4I",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IYv1EI3mT9X",
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
      dsde: "eGrk8gckQGL",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SnwpR5OQSYs",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qNaKRLqiK4G",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZPqjpvCTCgS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h12FpwdpES6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "djwHBZpzpSr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vVojCLq7cV4",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  //
  [
    {
      display: "text",
      text: "Relapsed_after_cue",
      cellProps: { rowSpan: 3 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Pb+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cf051rSkRyM",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uQqi7zSLn5R",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "y1BfpXoHhFI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MwxHXhdIo1o",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ooKv5gFm85U",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FpOk0U7JzCX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XySB7GhKpC1",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BcEkp1H0U2Z",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Pb-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rViZtpPi5Lw",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eN9ZAzjh4qp",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "u7gSqFD8fki",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "obQeZzDxlYO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FdmZCPkx3eU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NLOm9pTHCrl",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hAHTVP0K01U",
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
      dsde: "En4jdh8ccnc",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iaFZKiIUIzy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "umYXbwFbDmU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MRD4OLBbSbI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NdBbdkwqqny",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HdjAT8vYiIe",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xPZnniMwsc1",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  //
  [
    {
      display: "text",
      text: "Others",
      cellProps: { rowSpan: 3 },
      style: labelStyle,
    },
    {
      display: "text",
      text: "Pb+",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JquFx5YQYEb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SIHdoTYbExG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dnG1kTd9yib",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gQvzhKXK83T",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DBqdvuvguXU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "a7qKWsAz6Yf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kJwWT9Rs6eb",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YPLqQuSv6BI",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
  ],
  [
    {
      display: "text",
      text: "Pb-",
      style: typeStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Lh4wYTxx6Nu",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sSC5AXx7FPq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ag12zNt29aj",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "u8qPOZCQh8e",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UFULSsY5F7j",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KW1HeTImoHu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gVqei00iRNN",
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

export default TbTreatmentOutcomeV2;
