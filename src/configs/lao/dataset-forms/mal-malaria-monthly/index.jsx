import { Box, Table, TableBody } from "@mui/material";

import { useMemo } from "react";

import MapTable from "../common/MapTable";

import { mappingData } from "./mappingData";

import "../common/index.css";
import "./mal-malaria-monthly.css";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import TotalCell from "../common/TotalCell";

const TotalCell1 = ({ listData, colIndex, dataElementConfigsWithRowTotal }) => {
  const { dataValues } = useDataEntryStore(
    (state) => ({ dataValues: state.dataValues }),
    shallow
  );
  const { orgUnit } = useSelectionStore(
    (state) => ({ orgUnit: state.orgUnit }),
    shallow
  );
  return (
    <>
      {listData.reduce((prev, curr) => {
        const total = dataElementConfigsWithRowTotal[curr][colIndex]?.customCell
          ? dataElementConfigsWithRowTotal[curr][
              colIndex
            ]?.customCell.props.listData.reduce(
              (prev, curr) =>
                prev + (dataValues[`${curr}-${orgUnit.id}`]?.value * 1 || 0),
              0
            )
          : 0;

        return (
          prev +
          (dataValues[
            `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit.id}`
          ]?.value * 1 ||
            total ||
            0)
        );
      }, 0)}
    </>
  );
};

const MalMalariaMonthly = () => {
  const dataElementConfigsWithRowTotal = useMemo(() => {
    const dataElementConfigsCopy = () => {
      let result = dataElementConfigs;
      let count = 0;
      totalRowIndex.forEach((row) => {
        row.colIndex.forEach((col) => {
          const listData = mappingData[count];
          result[row.rowIndex][col] = {
            ...result[row.rowIndex][col],
            text: "",
            getText: (dataValues, orgUnit) => {
              return listData.reduce(
                (prev, curr) =>
                  prev + dataValues[`${curr}-${orgUnit}`]?.value * 1 || 0,
                0
              );
            },
            customCell: <TotalCell listData={listData} />,
          };
          count++;
        });
      });
      return result;
    };
    const result = dataElementConfigsCopy()
      .map((item) => {
        return item.filter((col) => !col.display || col.display !== "text");
      })
      .slice(6);
    return result;
  }, []);

  const dataElementConfigsWithTotal = useMemo(() => {
    if (!dataElementConfigsWithRowTotal) return dataElementConfigs;
    const result = dataElementConfigsWithRowTotal
      .map((item, index) => {
        if (index < 8) {
          if (totalMaleIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [0, 2].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[0, 2]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
          if (totalFemaleIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [1, 3].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[1, 3]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
          if (totalOfTotalIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [0, 1, 2, 3, 4].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[0, 1, 2, 3, 4]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
        } else {
          if (totalMaleIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [8, 10].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[8, 10]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
          if (totalFemaleIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [9, 11].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[9, 11]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
          if (totalOfTotalIndex.includes(index + 1)) {
            return item.map((col, colIndex) => {
              return {
                ...col,
                display: "text",
                text: "",
                getText: (dataValues, orgUnit) => {
                  return [8, 9, 10, 11, 12].reduce((prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  }, 0);
                },
                customCell: (
                  <TotalCell1
                    listData={[8, 9, 10, 11, 12]}
                    colIndex={colIndex}
                    dataElementConfigsWithRowTotal={
                      dataElementConfigsWithRowTotal
                    }
                  />
                ),
              };
            });
          }
        }
        if (index + 1 === 17) {
          return item.map((col, colIndex) => {
            return {
              ...col,
              display: "text",
              text: "",
              getText: (dataValues, orgUnit) => {
                return [0, 1, 2, 3, 4, 8, 9, 10, 11, 12].reduce(
                  (prev, curr) => {
                    return (
                      prev +
                      (dataValues[
                        `${dataElementConfigsWithRowTotal[curr][colIndex].dsde}-${dataElementConfigsWithRowTotal[curr][colIndex].coc}-${orgUnit}`
                      ]?.value * 1 ||
                        dataElementConfigsWithRowTotal[curr][
                          colIndex
                        ]?.getText?.(dataValues, orgUnit) ||
                        0)
                    );
                  },
                  0
                );
              },
              customCell: (
                <TotalCell1
                  listData={[0, 1, 2, 3, 4, 8, 9, 10, 11, 12]}
                  colIndex={colIndex}
                  dataElementConfigsWithRowTotal={
                    dataElementConfigsWithRowTotal
                  }
                />
              ),
            };
          });
        }
      })
      .filter((item) => item);
    let count = -1;
    return dataElementConfigs.map((item, index) => {
      if (
        [
          ...totalMaleIndex,
          ...totalFemaleIndex,
          ...totalOfTotalIndex,
          17,
        ].includes(index - 5)
      ) {
        count++;
        const startIndex = item.findLastIndex((col) => col.display === "text");
        return [...item.slice(0, startIndex + 1), ...result[count]];
      }
      return item;
    });
  }, [dataElementConfigsWithRowTotal]);

  return (
    <Box
      id="mal-malaria-monthly-form-container"
      className="custom-form remove-border-left"
      sx={{ overflowX: "scroll" }}
    >
      <Table>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigsWithTotal.map((item) => {
              return item.map((col) => {
                if (col.getText) {
                  return { ...col, display: "text" };
                }
                return col;
              });
            })}
            tableName="mal-malaria-monthly"
          />
        </TableBody>
      </Table>
    </Box>
  );
};

const totalMaleIndex = [6, 14];
const totalFemaleIndex = [7, 15];
const totalOfTotalIndex = [8, 16];
const totalRowIndex = [
  { rowIndex: 6, colIndex: [8, 13, 19, 24, 25, 26, 27] },
  { rowIndex: 7, colIndex: [6, 11, 17, 22, 23, 24, 25] },
  { rowIndex: 8, colIndex: [7, 12, 18, 23, 24, 25, 26] },
  { rowIndex: 9, colIndex: [6, 11, 17, 22, 23, 24, 25] },
  { rowIndex: 10, colIndex: [6, 11, 17, 22, 23, 24, 25] },
  { rowIndex: 14, colIndex: [8, 13, 19, 24, 25, 26, 27] },
  { rowIndex: 15, colIndex: [6, 11, 17, 22, 23, 24, 25] },
  { rowIndex: 16, colIndex: [7, 12, 18, 23, 24, 25, 26] },
  { rowIndex: 17, colIndex: [6, 11, 17, 22, 23, 24, 25] },
  { rowIndex: 18, colIndex: [6, 11, 17, 22, 23, 24, 25] },
];

const brownHead = {
  color: "#fff",
  backgroundColor: "#666633",
};

const brownLabel = {
  color: "#fff",
  backgroundColor: "#958A54",
};

const blueHead = {
  backgroundColor: "#669ACC",
};

const greenHead = {
  backgroundColor: "#518E51",
};

const orangeHead = {
  backgroundColor: "#EA9000",
};

const yellowHead = {
  backgroundColor: "#D4D400",
};

const redBrownHead = {
  backgroundColor: "#b7704c",
};

const brownContent = {
  backgroundColor: "#c6be98",
  "&.disable span": {
    display: "inline-bLock",
    minWidth: "80px",
  },
};

const lightBlueContent = {
  backgroundColor: "#ccdded",
};

const lightBlueTotal = {
  backgroundColor: "#6fb1ee",
};

const yorkGreen = {
  backgroundColor: "#dcffdc",
};

const yorkGreenContent = {
  backgroundColor: "#8be88b",
};

const yorkGreenTotal = {
  backgroundColor: "#78bf78",
};

const orangeContent = {
  backgroundColor: "#ffdaa3",
};

const orangeTotal = {
  backgroundColor: "#ffb13d",
};

const yellowContent = {
  backgroundColor: "#e1e15c",
};

const yellowTotal = {
  backgroundColor: "#bbbb5a",
};

const redBrownContent = {
  backgroundColor: "#debeae",
};

const redBrownTotal = {
  backgroundColor: "#c19782",
};

const grey = {
  backgroundColor: "#999",
};

const dataElementConfigs = [
  [
    {
      display: "empty",
      cellProps: { rowSpan: 6, colSpan: 3 },
      style: brownHead,
    },
    {
      display: "text",
      text: "origin_of_the_patient",
      cellProps: { rowSpan: 2, colSpan: 3 },
      style: blueHead,
    },
    {
      display: "text",
      text: "probable_cases",
      cellProps: { rowSpan: 5 },
      style: blueHead,
    },
    {
      display: "text",
      text: "diagnosis",
      cellProps: { colSpan: 21 },
      style: greenHead,
    },
    {
      display: "text",
      text: "treatment",
      cellProps: { colSpan: 13 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "refer_from_another_place",
      cellProps: { rowSpan: 5 },
      style: yellowHead,
    },
    {
      display: "text",
      text: "sent_to_higher_health",
      cellProps: { rowSpan: 5 },
      style: yellowHead,
    },
    {
      display: "text",
      text: "dead_patients_because_of_malaria",
      cellProps: { rowSpan: 5 },
      style: yellowHead,
    },
    {
      display: "text",
      text: "total_test_RDT_by_VHV",
      cellProps: { colSpan: 3, rowSpan: 2 },
      style: redBrownHead,
    },
  ],
  [
    {
      display: "text",
      text: "patient_tested",
      cellProps: { colSpan: 17 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_species",
      cellProps: { colSpan: 4 },
      style: greenHead,
    },
    {
      display: "text",
      text: "not_severe_cases",
      cellProps: { colSpan: 7 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "not_severe_cases_sleep_in_hospital",
      cellProps: { colSpan: 3, rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "severe_cases",
      cellProps: { colSpan: 3, rowSpan: 2 },
      style: orangeHead,
    },
  ],
  [
    {
      display: "text",
      text: "from_the_province",
      cellProps: { rowSpan: 3 },
      style: blueHead,
    },
    {
      display: "text",
      text: "from_another_province",
      cellProps: { rowSpan: 3 },
      style: blueHead,
    },
    {
      display: "text",
      text: "from_another_country",
      cellProps: { rowSpan: 3 },
      style: blueHead,
    },
    {
      display: "text",
      text: "RDT",
      cellProps: { colSpan: 5 },
      style: greenHead,
    },
    {
      display: "text",
      text: "microscopy",
      cellProps: { colSpan: 6 },
      style: greenHead,
    },
    {
      display: "text",
      text: "RDT_Microscopy",
      cellProps: { colSpan: 6 },
      style: greenHead,
    },
    {
      display: "text",
      text: "P.f",
      cellProps: { rowSpan: 3 },
      style: greenHead,
    },
    {
      display: "text",
      text: "P.v",
      cellProps: { rowSpan: 3 },
      style: greenHead,
    },
    {
      display: "text",
      text: "Mix",
      cellProps: { rowSpan: 3 },
      style: greenHead,
    },
    {
      display: "text",
      text: "P.m",
      cellProps: { rowSpan: 3 },
      style: greenHead,
    },
    {
      display: "text",
      text: "treatment_positive_case",
      cellProps: { colSpan: 5 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "treatment_probable",
      cellProps: { colSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "number_of_patient_tested",
      cellProps: { rowSpan: 3 },
      style: redBrownHead,
    },
    {
      display: "text",
      text: "number_of_patient_positive",
      cellProps: { rowSpan: 3 },
      style: redBrownHead,
    },
    {
      display: "text",
      text: "number_of_patient_treated",
      cellProps: { rowSpan: 3 },
      style: redBrownHead,
    },
  ],
  [
    {
      display: "text",
      text: "total_tested",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_positive",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "positive",
      cellProps: { colSpan: 3 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_tested",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_positive",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "positive",
      cellProps: { colSpan: 4 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_tested",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "total_positive",
      cellProps: { rowSpan: 2 },
      style: greenHead,
    },
    {
      display: "text",
      text: "positive",
      cellProps: { colSpan: 4 },
      style: greenHead,
    },
    {
      display: "text",
      text: "coartem",
      cellProps: { colSpan: 4 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "other_drug",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "coartem",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "other_drug",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "coartem",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "other_drug",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "artesunate_injectable",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "artesunate_injectable",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "coartem",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
    {
      display: "text",
      text: "quinine",
      cellProps: { rowSpan: 2 },
      style: orangeHead,
    },
  ],
  [
    { display: "text", text: "P.f", style: greenHead },
    { display: "text", text: "P.v", style: greenHead },
    { display: "text", text: "Mix", style: greenHead },
    { display: "text", text: "P.f", style: greenHead },
    { display: "text", text: "P.v", style: greenHead },
    { display: "text", text: "Mix", style: greenHead },
    { display: "text", text: "P.m", style: greenHead },
    { display: "text", text: "P.f", style: greenHead },
    { display: "text", text: "P.v", style: greenHead },
    { display: "text", text: "Mix", style: greenHead },
    { display: "text", text: "P.m", style: greenHead },
    { display: "text", text: "P.f", style: orangeHead },
    { display: "text", text: "P.v", style: orangeHead },
    { display: "text", text: "Mix", style: orangeHead },
    { display: "text", text: "P.m", style: orangeHead },
  ],
  [
    { display: "text", text: "S1", style: brownContent },
    { display: "text", text: "S2", style: brownContent },
    { display: "text", text: "S3", style: brownContent },
    { display: "text", text: "S4", style: brownContent },
    { display: "text", text: "S5", style: brownContent },
    { display: "text", text: "S6", style: brownContent },
    { display: "text", text: "S7", style: brownContent },
    { display: "text", text: "S8", style: brownContent },
    { display: "text", text: "S9", style: brownContent },
    { display: "text", text: "S10", style: brownContent },
    { display: "text", text: "S11", style: brownContent },
    { display: "text", text: "S12", style: brownContent },
    { display: "text", text: "S13", style: brownContent },
    { display: "text", text: "S14", style: brownContent },
    { display: "text", text: "S15", style: brownContent },
    { display: "text", text: "S16", style: brownContent },
    { display: "text", text: "S17", style: brownContent },
    { display: "text", text: "S18", style: brownContent },
    { display: "text", text: "S19", style: brownContent },
    { display: "text", text: "S20", style: brownContent },
    { display: "text", text: "S21", style: brownContent },
    { display: "text", text: "S22", style: brownContent },
    { display: "text", text: "S23", style: brownContent },
    { display: "text", text: "S24", style: brownContent },
    { display: "text", text: "S25", style: brownContent },
    { display: "text", text: "S26", style: brownContent },
    { display: "text", text: "S27", style: brownContent },
    { display: "text", text: "S28", style: brownContent },
    { display: "text", text: "S29", style: brownContent },
    { display: "text", text: "S30", style: brownContent },
    { display: "text", text: "S31", style: brownContent },
    { display: "text", text: "S32", style: brownContent },
    { display: "text", text: "S33", style: brownContent },
    { display: "text", text: "S34", style: brownContent },
    { display: "text", text: "S35", style: brownContent },
    {
      display: "text",
      text: "S36",
      cellProps: { className: "disable" },
      style: brownContent,
    },
    {
      display: "text",
      text: "S37",
      cellProps: { className: "disable" },
      style: brownContent,
    },
    {
      display: "text",
      text: "S38",
      cellProps: { className: "disable" },
      style: brownContent,
    },
    { display: "text", text: "S39", style: brownContent },
    { display: "text", text: "S40", style: brownContent },
    { display: "text", text: "S41", style: brownContent },
    { display: "text", text: "S42", style: brownContent },
    { display: "text", text: "S43", style: brownContent },
    { display: "text", text: "S44", style: brownContent },
  ],
  [
    {
      display: "text",
      text: "OPD",
      cellProps: { rowSpan: 8 },
      style: brownHead,
    },
    {
      display: "text",
      text: "0-5",
      cellProps: { rowSpan: 2 },
      style: { ...brownLabel, whiteSpace: "nowrap" },
    },
    { display: "text", text: "Male", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "yDN8UHiCmGY",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "MmP9JbJ8zNI",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "AvvxpN3RUpM",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "xzV3S3lqCh7",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "R3zTqmpGUg3",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "CDIC5YQhNFJ",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "M5Tc1ik5osS",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "iOBRAgqKf06",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "GHlIY6H1OT6",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "ZiPJS1jGh97",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "IBTI8XaFZUA",
      style: orangeContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "TuwBdLns8z3",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "cheKmOkNPN9",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "uiWzmIVifWi",
      dsde: "MT1929EvalS",
      style: redBrownContent,
    },
  ],
  [
    { display: "text", text: "Female", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "yDN8UHiCmGY",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "MmP9JbJ8zNI",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "AvvxpN3RUpM",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "xzV3S3lqCh7",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "R3zTqmpGUg3",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "CDIC5YQhNFJ",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "M5Tc1ik5osS",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "iOBRAgqKf06",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "GHlIY6H1OT6",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "ZiPJS1jGh97",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "IBTI8XaFZUA",
      style: orangeContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "TuwBdLns8z3",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "cheKmOkNPN9",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "dkYJ9cDhgSG",
      dsde: "MT1929EvalS",
      style: redBrownContent,
    },
  ],
  [
    {
      display: "text",
      text: ">5",
      cellProps: { rowSpan: 2 },
      style: { ...brownLabel, whiteSpace: "nowrap" },
    },
    { display: "text", text: "Male", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "yDN8UHiCmGY",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "MmP9JbJ8zNI",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "AvvxpN3RUpM",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "xzV3S3lqCh7",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "R3zTqmpGUg3",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "CDIC5YQhNFJ",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "M5Tc1ik5osS",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "iOBRAgqKf06",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "GHlIY6H1OT6",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "ZiPJS1jGh97",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "IBTI8XaFZUA",
      style: orangeContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "TuwBdLns8z3",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "cheKmOkNPN9",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "RQ9vn3gonzo",
      dsde: "MT1929EvalS",
      style: redBrownContent,
    },
  ],
  [
    { display: "text", text: "Female", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "yDN8UHiCmGY",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "MmP9JbJ8zNI",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "AvvxpN3RUpM",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "xzV3S3lqCh7",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "R3zTqmpGUg3",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "CDIC5YQhNFJ",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "M5Tc1ik5osS",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "iOBRAgqKf06",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "GHlIY6H1OT6",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "ZiPJS1jGh97",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "IBTI8XaFZUA",
      style: orangeContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "TuwBdLns8z3",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "cheKmOkNPN9",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "KmvYxhPl3Az",
      dsde: "MT1929EvalS",
      style: redBrownContent,
    },
  ],
  [
    {
      display: "text",
      text: "Pregnant",
      cellProps: { colSpan: 2 },
      style: brownLabel,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "jLyQJNdlrrd",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "sEuwxzBJTr3",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "wN8BRpDiTqh",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "NVGTTWb3x2H",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "DguG9uGR1A4",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "Uckrc7jFQjl",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "ljdwwN0i69V",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "tHE1a3ObExA",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "MP9kIIvZYZG",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "cDguWAWk0Y6",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "s1qcHxvu6t0",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "YpLmUyG5tV3",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "aUUuz2HGdu1",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "xuwBlCluEeo",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "LPkvcfbGbHN",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "JHbYLgWWHI1",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "PiYugZmdZUE",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "eUbi3N2jcxG",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "GtJV5dJWFct",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "olipH4CuJnx",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "hGd3dj4CK2y",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "dozNMEWbsZ1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "m3mFUPV9CVp",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "bMOcC65M5PI",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "Y3QKgDvIUQm",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "mPpPI9LZG5f",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "cdRxQqlSzu1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "MTOPGuuMez2",
      style: orangeContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "Ox0bcTu6KGG",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "fK857SFFKCS",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "Y7l9wDz7Po3",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "s9MLJiVCMI6",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "ukrQkJM1mGi",
      style: redBrownContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FMzRkxssoAV",
      dsde: "RzslU70HddV",
      style: redBrownContent,
    },
  ],
  [
    {
      display: "text",
      text: "Total",
      cellProps: { rowSpan: 3 },
      style: brownLabel,
    },
    {
      display: "text",
      text: "Male",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  [
    {
      display: "text",
      text: "Female",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  [
    {
      display: "text",
      text: "Total",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  //IPD
  [
    {
      display: "text",
      text: "IPD",
      cellProps: { rowSpan: 8 },
      style: brownHead,
    },
    {
      display: "text",
      text: "0-5",
      cellProps: { rowSpan: 2 },
      style: brownLabel,
    },
    { display: "text", text: "Male", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "OrjwXESH8Zi",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "d9VBG2HRwds",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "iw5qxhQ2pr1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "ajLJhg5FF8A",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
  ],
  [
    { display: "text", text: "Female", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "OrjwXESH8Zi",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "d9VBG2HRwds",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "iw5qxhQ2pr1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "FbqT6l3aDry",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
  ],
  [
    {
      display: "text",
      text: ">5",
      cellProps: { rowSpan: 2 },
      style: { ...brownLabel, whiteSpace: "nowrap" },
    },
    { display: "text", text: "Male", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "OrjwXESH8Zi",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "d9VBG2HRwds",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "iw5qxhQ2pr1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "HxnL5RwG8iI",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
  ],
  [
    { display: "text", text: "Female", style: brownLabel },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "MBh3OAb1Mk0",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "ShEJIeTC5aq",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "CUAf00J6ZNK",
      style: lightBlueContent,
    },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "nZcX5DIl2Ez",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "Jw3Dgi1rDCW",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "flDaFOI3oqP",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "b8i8vDuewIM",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "ys4Y7YtewJ0",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "dkKg2ztuiOA",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "Yby1SUc6Mi9",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "b7ov1g6nlKz",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "eQYyxR3SXmL",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "RPEECXwq3u1",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "hZlmzO0N8RD",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "ePa2RBfeuV3",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "mfkMXZ9OOhc",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "yiPfeQ8Tt4Y",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "OrjwXESH8Zi",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "d9VBG2HRwds",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "iw5qxhQ2pr1",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "hFo3BV2UrUa",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "FtiagPBMb3t",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "V1dF2oufGCI",
      dsde: "ryvqfc7TOWr",
      style: yellowContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
  ],
  [
    {
      display: "text",
      text: "Pregnant",
      cellProps: { colSpan: 2 },
      style: brownLabel,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "jLyQJNdlrrd",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "sEuwxzBJTr3",
      style: lightBlueContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "wN8BRpDiTqh",
      style: lightBlueContent,
    },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "DguG9uGR1A4",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "Uckrc7jFQjl",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "ljdwwN0i69V",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "tHE1a3ObExA",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "MP9kIIvZYZG",
      style: yorkGreen,
    },
    { display: "empty", style: yorkGreen },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "cDguWAWk0Y6",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "s1qcHxvu6t0",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "YpLmUyG5tV3",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "aUUuz2HGdu1",
      style: yorkGreen,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "xuwBlCluEeo",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreenContent },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "LPkvcfbGbHN",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "JHbYLgWWHI1",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "PiYugZmdZUE",
      style: yorkGreenContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "eUbi3N2jcxG",
      style: yorkGreenContent,
    },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: yorkGreen },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "IhGvyrjC54X",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "gY2v0jhosyr",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "NHlk8Y7oEbj",
      style: orangeContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "Ox0bcTu6KGG",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "fK857SFFKCS",
      style: yellowContent,
    },
    {
      cc: "l1yoMU4SEJe",
      coc: "byuNwOEB6zI",
      dsde: "Y7l9wDz7Po3",
      style: yellowContent,
    },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
    { display: "empty", style: grey },
  ],
  [
    {
      display: "text",
      text: "Total",
      cellProps: { rowSpan: 3 },
      style: brownLabel,
    },
    {
      display: "text",
      text: "Male",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  [
    {
      display: "text",
      text: "Female",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  [
    {
      display: "text",
      text: "Total",
      style: brownLabel,
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: lightBlueTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yorkGreenTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: orangeTotal,
      getText: (dataValues, orgUnit) => {},
    },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    { display: "empty", style: grey, getText: (dataValues, orgUnit) => {} },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: yellowTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
    {
      display: "empty",
      style: redBrownTotal,
      getText: (dataValues, orgUnit) => {},
    },
  ],
  [
    {
      display: "text",
      text: "Total_OPD_IPD",
      cellProps: { colSpan: 3 },
      style: brownHead,
    },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
    { display: "empty", style: brownLabel },
  ],
];

export default MalMalariaMonthly;
