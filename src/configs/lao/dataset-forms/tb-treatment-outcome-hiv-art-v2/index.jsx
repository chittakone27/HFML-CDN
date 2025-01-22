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
import "./tb-treatment-outcome-hiv-art-v2.css";
import { useTranslation } from "react-i18next";
import useDataEntryStore from "@/state/dataEntry";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { useEffect, useMemo, useState } from "react";
import { saveDataValue } from "@/api/icapture/dataValue";
import { pull } from "@/utils/fetch";
import TotalCell from "../common/TotalCell";

const mappingConfigs = [
  {
    findV2: { id: "uLTx5PGOz6f", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "MZqxV2grUtV",
  }, // New Pb+
  {
    findV2: { id: "i5SiGO0dQNo", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "yXzika96WKA",
  }, // New Pb-
  {
    findV2: { id: "w7ZTCWYQi9C", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "oBIampIdAzR",
  }, // New EP
  {
    findV2: { id: "r6PkPbLMp43", categoryOptionCombo: "iKGbK3dtjnc" },
    artV3: "ezGJtOweHUK",
  }, // Relapse Pb+
  {
    findV2: { id: "r6PkPbLMp43", categoryOptionCombo: "NFEIpwf4uMk" },
    artV3: "u46pUNkaxWG",
  }, // Relapse Pb-
  {
    findV2: { id: "r6PkPbLMp43", categoryOptionCombo: "KiIF4CTr8ko" },
    artV3: "HqFl9yARkNi",
  }, // Relapse EP
  {
    findV2: { id: "a2l9gmP6yeL", categoryOptionCombo: "iKGbK3dtjnc" },
    artV3: "qzVoUADbxQI",
  }, // Failure Pb+
  {
    findV2: { id: "a2l9gmP6yeL", categoryOptionCombo: "NFEIpwf4uMk" },
    artV3: "MehNpPvwJRV",
  }, // Failure Pb-
  {
    findV2: { id: "a2l9gmP6yeL", categoryOptionCombo: "KiIF4CTr8ko" },
    artV3: "xj7ePFTpWDP",
  }, // Failure EP
  {
    findV2: { id: "UQepjKLDzmn", categoryOptionCombo: "iKGbK3dtjnc" },
    artV3: "hhrtVZgDC1J",
  }, // Return Pb+
  {
    findV2: { id: "UQepjKLDzmn", categoryOptionCombo: "NFEIpwf4uMk" },
    artV3: "Ev8g9p7Nmqd",
  }, // Return Pb-
  {
    findV2: { id: "UQepjKLDzmn", categoryOptionCombo: "KiIF4CTr8ko" },
    artV3: "q3FFcEypwIb",
  }, // Return EP
  {
    findV2: { id: "mbQdFNIjWiH", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "KOFkCp4PcU4",
  }, // other Pb+
  {
    findV2: { id: "yiRXK47C3fX", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "oeYHygyT92F",
  }, // other Pb-
  {
    findV2: { id: "CBX1WkTqvnu", categoryOptionCombo: "lmbxvugTvKr" },
    artV3: "J01h3rxS4CO",
  }, // other EP
];

const RegisteredCell = ({ data, listDataValues }) => {
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

  const targetConfig = mappingConfigs.find((item) => item.artV3 === data.dsde);

  const {
    findV2: { id: de, categoryOptionCombo: coc },
  } = targetConfig;

  const value = useMemo(() => {
    const targetDataValue = listDataValues.find(
      (item) => item.dataElement === de && item.categoryOptionCombo === coc
    );
    return targetDataValue ? targetDataValue.value : null;
  }, [JSON.stringify(listDataValues)]);
  useEffect(() => {
    if (value !== null) {
      (async () => {
        try {
          const resultSave = await saveDataValue(
            "ByxNF95QqwB",
            orgUnit.id,
            period.dhis2Period,
            data.dsde,
            data.coc,
            value
          );
          if (resultSave.ok) {
            setDataValue(data.dsde, "lmbxvugTvKr", orgUnit.id, value);
          }
        } catch (error) {}
      })();
    }
  }, [value]);

  return <>{dataValues[`${data.dsde}-${data.coc}-${orgUnit.id}`]?.value}</>;
};

const headerStyle = {
  backgroundColor: "#1976d2",
  fontWeight: "bold",
  color: "#fff",
  height: 40,
};

const HeaderCell = styled(TableCell)(headerStyle);

const TbTreatmentOutcomeHivArtV2 = () => {
  const { t } = useTranslation();
  const { orgUnit, period } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit, period: state.period }),
    shallow
  );
  const { dataValues } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues }),
    shallow
  );
  const [listDataValues, setListDataValue] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const periodLastYear = `${
          parseInt(period.dhis2Period.substring(0, 4)) - 1
        }${period.dhis2Period.substring(4, 6)}`;
        const result = await pull(
          `/api/dataValueSets.json?dataSet=cw7HTpaz9If&period=${periodLastYear}&orgUnit=${orgUnit.id}`
        );
        if (result?.dataValues) {
          setListDataValue(result.dataValues);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box
      id="tb-treatment-outcome-hiv-art-v2-form-container"
      className="custom-form remove-border-left"
    >
      <Table sx={{ minWidth: 1400 }}>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={2} sx={{ width: "30%", height: 40 }}>
              {t("typeOfPatient")}
            </HeaderCell>
            <HeaderCell
              sx={{ width: "7%" }}
              dangerouslySetInnerHTML={{ __html: t("Registered") }}
            />
            <HeaderCell sx={{ width: "7%" }}>{t("Rescued")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Completed")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Failure")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Died")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Defaulted")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Referred_out")}</HeaderCell>
            <HeaderCell sx={{ width: "7%" }}>{t("Not_Evaluate")}</HeaderCell>
            <HeaderCell
              sx={{ width: "7%" }}
              dangerouslySetInnerHTML={{ __html: t("Total") }}
            />
            <HeaderCell sx={{ width: "7%" }}>{t("on_art")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs.map((item, index) => {
              if (index > 14) {
                return item;
              }
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
                      listDataValues={listDataValues}
                      data={
                        item.slice(
                          firstCellHaveDsdeIndex,
                          firstCellHaveDsdeIndex + 1
                        )[0]
                      }
                    />
                  ),
                },
                ...item.slice(firstCellHaveDsdeIndex + 1, item.length - 2),
                {
                  ...item.slice(item.length - 2)[0],
                  customCell: (
                    <TotalCell
                      listData={item
                        .slice(firstCellHaveDsdeIndex + 1, item.length - 2)
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
                ...item.slice(item.length - 1),
              ];
            })}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const typeStyle = {
  backgroundColor: "#4dd0e1",
};
const labelStyle = {
  backgroundColor: "#26c6da",
};
const totalStyle = {
  backgroundColor: "#b2ebf2",
  textAlign: "center",
  minWidth: 70,
};
const deStyle = {
  backgroundColor: "#b2ebf2",
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
      style: { ...typeStyle, width: "150px" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MZqxV2grUtV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "S2PdmlZy3UU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "u2ds7ARTFEh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BseVQffMWUC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hX7JRaOY4rs",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gK3NmpPq5xL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hT6EPSt6OEZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Fv9vZAJ8i7p",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "o4IMcrUSQDk",
      style: deStyle,
    },
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
      dsde: "yXzika96WKA",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "C91LFMyTzLg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tZiWeAYB3hV",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gd9bxBisJgD",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Eda4o4lwQWx",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qKWH8OKisLU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WfKCSbBW5js",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "M31KRfd05Ue",
      style: deStyle,
    },
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
      dsde: "oBIampIdAzR",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OcrIXVeUev9",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kzIgHW5r7gn",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Wkq6uEzvHOQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DY1gLzlDNcL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CrsQbXTDrvy",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZsIF340P8i4",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nSK7GvEgbwf",
      style: deStyle,
    },
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
      dsde: "ezGJtOweHUK",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DxvtlLJYbGT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VCcL5mt80L8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DJpz3U8sPnm",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UpjOd94TlmQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YbqnKCkgn8i",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "G5lxiTPdpsC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XrOADUeMF4t",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FumqzdrSpXe",
      style: deStyle,
    },
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
      dsde: "u46pUNkaxWG",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "H4MQv82pitC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rTcYhbYUkao",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IVRmjuZWQeQ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "tCArKjK2h7H",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xESa7apzkmT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uswExUiGJUh",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zrWo1sySwKj",
      style: deStyle,
    },
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
      dsde: "HqFl9yARkNi",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "svI40vmdoFJ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dbTYyZyoLSP",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zQqZ2GgnDhW",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "M8QAZsgpwfF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cQL2ZVKBUaF",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qJHDrnVn91p",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "x9xbvlJAzoU",
      style: deStyle,
    },
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
      dsde: "qzVoUADbxQI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lzB17ZkjV6C",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "s5AsrAVSXaT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YI9dIS6U8vC",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vGQNOBfzu9j",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LE7ftFy1l8X",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Yf0Dc2LOfXq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wHqQ2s8kYb7",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IuFMEowBmeo",
      style: deStyle,
    },
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
      dsde: "MehNpPvwJRV",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "stC4q2iUWsU",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QUXOD7fabj8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "dhfdxusKrPO",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kkL1AFJUnQz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "w4kEPKQnFQm",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hn94dwYpiMp",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FCPup7MfHsj",
      style: deStyle,
    },
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
      dsde: "xj7ePFTpWDP",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Rb305idKPkf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ujI0FedMLx8",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "guBRiHZEIGq",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "yKxBHWCffhL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SWJGy1nvcpg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JRkeWNCSSnK",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "IfkWt7DbnXH",
      style: deStyle,
    },
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
      dsde: "hhrtVZgDC1J",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bB1ig3BGO3G",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LTIbx7XTb76",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sYkbXosjd5E",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "EXe2QB7sUnZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ciAMbWeY1qs",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "JgDKu8C4pJX",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bBO7IVtbTnt",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MegKZ5H8ewD",
      style: deStyle,
    },
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
      dsde: "Ev8g9p7Nmqd",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UkG31CifD2G",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Ah3a9DlP7Vx",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iVvvwJ4rdeB",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WTdK0OkEx3e",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mF9IaP0Qk9u",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ExabaxtZqjc",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vTSLURwdDmI",
      style: deStyle,
    },
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
      dsde: "q3FFcEypwIb",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nAFXMZTqyDw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YZC3SFD24tZ",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Y5S54GfcDg6",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jzAp6GtKi40",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "opoCPVxiRWu",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YtbWnJQGPFg",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VIES7H56Tmz",
      style: deStyle,
    },
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
      dsde: "KOFkCp4PcU4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nMJmHYFWMnS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DAifFXI8xMk",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "CwmWROwOFjG",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jlidtsyivTf",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Cnorhs7Bw4j",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gXyrco3QaJD",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bp2OuzAnMrs",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "MeY805AHfXz",
      style: deStyle,
    },
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
      dsde: "oeYHygyT92F",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PnuprmetmGz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "aUjsitLLGY3",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QqzNlygQaTz",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "swe4MrwCLKL",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bpn5U6X3TtN",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Z66rRBb3DvL",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "R1O6yChM9US",
      style: deStyle,
    },
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
      dsde: "J01h3rxS4CO",
      style: deStyle,
    },
    { display: "empty", style: disableStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZpOC9G7YEhr",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "eYZWfYyVzmg",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rPk8Xh4oUdY",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "wnVinBhLUPI",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iwDzmcoPOa4",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XggHJ1nei22",
      style: deStyle,
    },
    { display: "empty", style: totalStyle },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "i1QYIe0p8b0",
      style: deStyle,
    },
  ],
  //
  [
    {
      display: "text",
      text: "ລາຍງານການໃຫ້ ART",
      cellProps: { colSpan: 3 },
      style: headerStyle,
    },
  ],
  [
    {
      display: "text",
      text: "tb_hiv_patient",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rTQzemcoAwg",
      cellProps: { colSpan: 1 },
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "tb_hiv_art",
      cellProps: { colSpan: 2 },
      style: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "NyPSR4HRAig",
      cellProps: { colSpan: 1 },
      style: deStyle,
    },
  ],
];

export default TbTreatmentOutcomeHivArtV2;
