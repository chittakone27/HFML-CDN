import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import MapTable from "../common/MapTable";
import { useTranslation } from "react-i18next";
import "./hiv-chas-vct.css";
import { shallow } from "zustand/shallow";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { TabPanel, StyledTab, StyledTabs } from "../common/Tab";

const labelStyle = {
  style: {
    backgroundColor: "#B1FCFE",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: "200px",
    border: " 1px solid #B9DEDF",
  },
};
const totalStyle = {
  style: {
    backgroundColor: "#B1FCFE",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    paddingInline: "20px",
    border: " 1px solid #B9DEDF",
  },
};
const subLabelStyle = {
  style: {
    backgroundColor: "#B1FCFE",
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    paddingInline: "35px",
    border: " 1px solid #B9DEDF",
  },
};
const valueStyle = {
  style: {
    backgroundColor: "#EDF8FE",
    width: "250px",
    textAlign: "center",
  },
};

const emptyStyle = {
  style: {
    backgroundColor: "#999999",
  },
};

const categOptRows = [
  [
    "QESRCfKZVNC",
    "IskT3fdcrOY",
    "ZhbD6LXVxjU",
    "sEr56qB6JJY",
    "HvUsOa345UY",
    "S69xcsPZmca",
    "BYb9ouAymaj",
    "EKaVkesqJ49",
    "iezqR5THe9s",
    "rPoVKdFT8zz",
    "IJv1J4B32PO",
  ],
  [
    "qy9Vf9xQ3O6",
    "QTW2e8Q9hhs",
    "TgLamHzE6AB",
    "HF7K4Daa9Sl",
    "YGKRQuGl4hM",
    "aDpDfHDbEL2",
    "aPeNpNuorFU",
    "d02z8qRZL7S",
    "g4Gx1KTELc0",
    "avPbycBQzjy",
    "qtawxWzdR42",
  ],
  [
    "",
    "FlGsQdRCmTc",
    "hwvJXyF29Ao",
    "yeMelRRAfO5",
    "w6Z4KolfM1R",
    "uErsYiAd7WR",
    "zhNM5q7ChwV",
    "J88y5rzZQ0y",
    "Ci5FjppqNVt",
    "dzXm1Pj9Tnb",
    "FLlv2AgOXqv",
  ],
  [
    "",
    "",
    "U1f2VbBxb2S",
    "vD7y9sJlmtl",
    "ceI80MAhqsj",
    "m81DmtSydxG",
    "bUTMXUYTPvw",
    "wnBdXRzWyEg",
    "wNaJxpI574F",
    "b2eJ9BKuamI",
    "Kmfj0u4a2Ug",
  ],
  [
    "",
    "",
    "TaMOLvFK5sR",
    "U4lXy6uSJZa",
    "K1w2TisphOY",
    "pte5VcirHFa",
    "SEr5QgZkuW4",
    "Rgn1TvNBQu1",
    "ueN6fPDJ37B",
    "jXqlvr08Eqq",
    "AR9ArDXBlRS",
  ],
  [
    "lEK4GrTpNDq",
    "mhQQgPco8S8",
    "wsfie2JREEK",
    "MX48070gsl7",
    "YY3ylfaQXsL",
    "QqWHJAgpW5h",
    "AWmlPz5wlEh",
    "oysbFEMcR24",
    "W3PUEYHOSTF",
    "TnqKdfOGae5",
    "sPS84vxOagt",
  ],
  [
    "haBVrhbMrif",
    "Xa0c3IJoT2S",
    "tb2j3pEqnhB",
    "u6pyfb75LA7",
    "GNMyXRmDigW",
    "Tl5qCpaS6Kd",
    "nd4lv2lNG0B",
    "mDZ7QL0U0PF",
    "ah6OTsvFbym",
    "HHKLmytzvVk",
    "bus8376oc82",
  ],
  [
    "W09xH9aoLdz",
    "P6XgrNVuZqw",
    "qFZx0doDfZE",
    "HBiahf5El7o",
    "AznsyjTi5OO",
    "azwDNwArfT4",
    "LwmmQRCkApx",
    "m1qCUZq7dUE",
    "wxeB5QlrgEE",
    "FDt7rEQVgDk",
    "jONSaBQWDA3",
  ],
  [
    "vCPxw6Vt19z",
    "hiFqB4gz5Oj",
    "BomAd26hzYW",
    "ug9xF0cbG4M",
    "hySiDgX6AlU",
    "jR8tqdAvOEl",
    "abzuSNL6yaO",
    "diQsOofxpji",
    "F0xtIyX7KQ0",
    "ujTRs6XAl7P",
    "y3BiPJPyPMp",
  ],
  [
    "h9GI6Wab98C",
    "g2TYaNAB8Zp",
    "j1kCHOSmPj9",
    "DoU1VKZa22y",
    "yjHI68IleVm",
    "YDjWUMO1I5V",
    "dXnR2yrQIXa",
    "yZ82KR8bcct",
    "anWm9YLQFRF",
    "zOtW7NUrRwH",
    "V1XXkkeOwZe",
  ],
  [
    "f8Ac4diS2rz",
    "TWcziZ1lKG8",
    "HsIJlq7VQL8",
    "EzvbgmXCU11",
    "WLFphppDmDQ",
    "oLQ3zKQyt8V",
    "ZrdfBgFgEMZ",
    "HJOEIg1pCZk",
    "guz0I69ZdJN",
    "gCCJFGMjdpJ",
    "al3v27u3Fh1",
  ],
  [
    "JbLQGaI0JCy",
    "nyoOK6mtRrE",
    "TTKTEDJjVqe",
    "EaczRwUc4Xc",
    "w35rW3AYUdB",
    "lcc8KFh1YQr",
    "msacFeJguvH",
    "Re4VmDSuBQj",
    "TgmRr8FW7RE",
    "tALXQOpa6s8",
    "BS7M0mW2YRD",
  ],
  [
    "APY2luK1qte",
    "CLBEHRpqqsy",
    "dmCX59hErLQ",
    "KPz333r4JWk",
    "KLMcoievVah",
    "uLw2uI0QG7X",
    "IKwHk6gg8gW",
    "pqP29ZKOiKL",
    "V2nYL6EEGhf",
    "sT2JwY31wDK",
    "ImW8F8HbOpf",
  ],
  [
    "ReSR9Z7GsBn",
    "oBNxr4boCsT",
    "GXLStLVmE6a",
    "M389fO3SnuC",
    "uEOFf6J5EYb",
    "O53hI0YW8Na",
    "PH7zFIasc5L",
    "SpYgmyGLQmF",
    "Lv8tDwy08rW",
    "hJjtboUvdfr",
    "qRsHShng98r",
  ],
  [
    "",
    "",
    "FbqqhxeSi3p",
    "reZgnEYoLZm",
    "Q1RzesdvRWy",
    "Pj5xEZZEalm",
    "FfjWcNBrWja",
    "qJAZKWtKZsY",
    "mxyXsigdxe6",
    "pC7kXwuIi6w",
    "LYtOl0I9rDc",
  ],
  [
    "OWxkIjuZoiP",
    "JH2ibM3QY7K",
    "G6tfLdClvsN",
    "FWy5vWbrmmA",
    "s0tAycSMk20",
    "Wkv2Bv5eYTz",
    "iPqqMRNtkmw",
    "kLOL2Wcra2F",
    "BHuAy88dJON",
    "FxgbH57dYNu",
    "wDHPKYMFLdY",
  ],
  [
    "ZLDsFfELhN9",
    "mmjFGRzJApg",
    "AofOBtSs4z9",
    "bAYYLIDMuip",
    "mVOI5mfq6vO",
    "BldR5OUUQhU",
    "Vs5Ib3RUYLE",
    "LseFYZHZbBW",
    "t9gsAnkEPos",
    "GmhFO9oIahX",
    "QSF35uuBTN8",
  ],
  [
    "",
    "",
    "Q0o9XX8tTGO",
    "QIDf4lgQlkW",
    "qeYr0lyNs6h",
    "UFtzrpGb4jJ",
    "Qin2xQugZc0",
    "lKqTUA6gaOP",
    "rA6aeIsR7zc",
    "g055usQhC9o",
    "Q7RRkSb0kZI",
  ],
  [
    "",
    "",
    "CpYrz4qjvnR",
    "UbNA3XDlmqS",
    "VhwKQTqIoqO",
    "guwhYxAf92c",
    "ypV8zEwkWEh",
    "tRsTYRZIXxs",
    "isD8zEwKP7B",
    "N1FenBfP0rY",
    "GgmHlhsua6E",
  ],
  [
    "NacGFaydJJS",
    "U6anau7rBWu",
    "ttccmbBZgmB",
    "CQvi9OCSRbh",
    "kMKmQv1WVkq",
    "HIwKds1f2Iu",
    "TAMoV0ku3iC",
    "ufMs8wCOjwZ",
    "U4zhlz91XkA",
    "TUPuFc5un0Z",
    "hvGKeNqcOpn",
  ],
];

const TotalCell = ({ rows }) => {
  const dataValues = useDataEntryStore((state) => state.dataValues, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );
  const result = rows.reduce((prev, curr) => {
    if (curr.display) {
      return prev;
    }

    return (
      prev +
      (dataValues[
        `${curr.dsde}-${curr.coc}-${orgUnit.id}-${attributeOptionCombo.id}`
      ]?.value * 1 || 0)
    );
  }, 0);
  return <>{result}</>;
};

const HivChasVctDetail = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const buttonData = {
    Pre: {
      headerText: t("PRE-TEST"),
      deId: "SA2bLCYb88X",
    },
    Hiv: { headerText: t("HIV-TEST"), deId: "YMeyUiErrWn" },
    Post: {
      headerText: t("POST-TEST"),
      deId: "Jndrom9ha7z",
    },
  };
  const lstLabel = [
    { label: t("General_Population"), isHaveSex: true },
    { label: t("Pregnant_women"), isHaveSex: false },
    { label: t("Husband_Partner"), isHaveSex: false },
    { label: t("FSW"), isHaveSex: false },
    { label: t("TG"), isHaveSex: false },
    { label: t("DrugUser"), isHaveSex: true },
    { label: t("STI_symptom_refer_to_HIV_testing"), isHaveSex: true },
    { label: t("Prisoner"), isHaveSex: true },
    { label: t("MigrantWorker"), isHaveSex: true },
    { label: t("MSM"), isHaveSex: false },
    { label: t("TB_patients"), isHaveSex: true },
    { label: t("PWID"), isHaveSex: true },
    { label: t("Oral Quick"), isHaveSex: false },
  ];
  const { preConfigs, hivConfigs, postConfigs } = useMemo(() => {
    let indexRow = 0;
    let dataConfig = {
      Pre: [],
      Hiv: [],
      Post: [],
    };

    Object.keys(buttonData).forEach((key) => {
      lstLabel.map((label) => {
        let currentRow = indexRow;
        let payload = [];
        if (label.isHaveSex) {
          const labelCell = {
            display: "text",
            text: label.label,
            cellProps: { ...labelStyle, rowSpan: 2 },
          };
          const mSubLabelCell = {
            display: "text",
            text: t("M"),
            cellProps: subLabelStyle,
          };
          const fSubLabelCell = {
            display: "text",
            text: t("F"),
            cellProps: subLabelStyle,
          };

          const mRowCells = categOptRows[currentRow].map((cocId) => {
            if (cocId !== "") {
              return {
                cc: "jbyurvmKiaC",
                coc: cocId,
                dsde: buttonData[key].deId,
                cellProps: valueStyle,
              };
            }
            return { display: "text", text: "", cellProps: emptyStyle };
          });

          const fRowCells = categOptRows[currentRow + 1].map((cocId) => {
            if (cocId !== "") {
              return {
                cc: "jbyurvmKiaC",
                coc: cocId,
                dsde: buttonData[key].deId,
                cellProps: valueStyle,
              };
            }
            return { display: "text", text: "", cellProps: emptyStyle };
          });
          const totalCellM = {
            display: "text",
            text: "0",
            cellProps: totalStyle,
            customCell: <TotalCell rows={mRowCells} />,
          };
          const totalCellF = {
            display: "text",
            text: "0",
            cellProps: totalStyle,
            customCell: <TotalCell rows={fRowCells} />,
          };
          dataConfig[key].push([
            labelCell,
            mSubLabelCell,
            ...mRowCells,
            totalCellM,
          ]);
          dataConfig[key].push([fSubLabelCell, ...fRowCells, totalCellF]);
          currentRow += 2;
        } else {
          const labelData = {
            display: "text",
            text: label.label,
            cellProps: { ...labelStyle, colSpan: 2 },
          };
          const cells = categOptRows[currentRow].map((cocId) => {
            if (cocId !== "") {
              return {
                cc: "jbyurvmKiaC",
                coc: cocId,
                dsde: buttonData[key].deId,
                cellProps: valueStyle,
              };
            }
            return { display: "text", text: "", cellProps: emptyStyle };
          });
          const totalCell = {
            display: "text",
            text: "0",
            cellProps: totalStyle,
            customCell: <TotalCell rows={cells} />,
          };

          dataConfig[key].push([labelData].concat(cells).concat(totalCell));
          currentRow += 1;
        }
        indexRow = currentRow;
        dataConfig[key] = dataConfig[key].concat(payload);
      });
      indexRow = 0;
    });

    return {
      preConfigs: dataConfig.Pre,
      hivConfigs: dataConfig.Hiv,
      postConfigs: dataConfig.Post,
    };
  }, []);

  const headerTable = [
    t("Type_of_population"),
    "0 - 4",
    "5 - 9",
    "10 - 14",
    "15 - 19",
    "20 - 24",
    "25 - 29",
    "30 - 34",
    "35 - 39",
    "40 - 44",
    "45 - 49",
    "50 +",
    t("Total"),
  ];

  return (
    <Box id="hiv-chas-vct-form-container" className="custom-form">
      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="basic tabs example"
        >
          <StyledTab label={t("PRE-TEST")} />
          <StyledTab label={t("HIV_TEST")} />
          <StyledTab label={t("POST_TEST")} />
        </StyledTabs>

        <TabPanel value={tabIndex} index={0}>
          <Typography className="header-text">
            {t("Number_receiving_pre_test_counselling")}
          </Typography>
          <Table id="hiv-chas-vct-table" stickyHeader>
            <TableHead>
              <TableRow>
                {headerTable.map((header, index) => (
                  <TableCell
                    className="cell-header-table"
                    colSpan={index === 0 && 2}
                    sx={{ top: -5 }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <MapTable dataElementConfigs={preConfigs} />
            </TableBody>
          </Table>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography className="header-text">
            {t("Number_receiving_HIV_testing")}
          </Typography>
          <Table id="hiv-chas-vct-table" stickyHeader>
            <TableHead>
              <TableRow>
                {headerTable.map((header, index) => (
                  <TableCell
                    className="cell-header-table"
                    colSpan={index === 0 && 2}
                    sx={{ top: -5 }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <MapTable dataElementConfigs={hivConfigs} />
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography className="header-text">
            {t("Number_receiving_post_test_counselling")}
          </Typography>
          <Table id="hiv-chas-vct-table" stickyHeader>
            <TableHead>
              <TableRow>
                {headerTable.map((header, index) => (
                  <TableCell
                    className="cell-header-table"
                    colSpan={index === 0 && 2}
                    sx={{ top: -5 }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <MapTable dataElementConfigs={postConfigs} />
            </TableBody>
          </Table>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default HivChasVctDetail;
