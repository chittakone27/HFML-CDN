import { useState } from "react";
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
import CustomPopup from "../common/Popup/Popup";

import { mappingPopup } from "./mappingPopup";

import "./psi-family-planing.css";
import "../common/index.css";
import { useTranslation } from "react-i18next";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

const PsiFamilyPlaning = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  return (
    <Box
      id="psi-family-planing-form-container"
      className="custom-form remove-border-left"
    >
      <CustomPopup
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        content={popupContent}
      />
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={10}>{t("familyPlanningForm")}</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={dataElementConfigs.map((item, index) => {
              if (index === 0) {
                return [
                  ...item.slice(0, 1),
                  ...item.slice(1).map((col, colIndex) => {
                    return {
                      ...col,
                      onClick: (e) => {
                        let startIndex = 0;
                        if (i18n.language === "lo") {
                          startIndex = 4;
                        }
                        const head = `${
                          mappingPopup.headerRow[colIndex].value[startIndex]
                        } ${
                          mappingPopup.headerRow[colIndex].value[startIndex + 1]
                            ? `(${
                                mappingPopup.headerRow[colIndex].value[
                                  startIndex + 1
                                ]
                              })`
                            : ""
                        } `;
                        const content = `${
                          mappingPopup.headerRow[colIndex].value[startIndex + 2]
                        }`;
                        const source = `${
                          mappingPopup.headerRow[colIndex].value[startIndex + 3]
                        }`;

                        setAnchorEl(e.currentTarget);
                        setPopupContent({ head, content, source });
                      },
                    };
                  }),
                ];
              }
              return [
                {
                  ...item.slice(0, 1)[0],
                  onClick: (e) => {
                    let startIndex = 0;
                    if (i18n.language === "lo") {
                      startIndex = 4;
                    }
                    const head = `${
                      mappingPopup.headerColumn[index - 1].value[startIndex]
                    } ${
                      mappingPopup.headerColumn[index - 1].value[startIndex + 1]
                        ? `(${
                            mappingPopup.headerColumn[index - 1].value[
                              startIndex + 1
                            ]
                          })`
                        : ""
                    } `;
                    const content = `${
                      mappingPopup.headerColumn[index - 1].value[startIndex + 2]
                    }`;
                    const source = `${
                      mappingPopup.headerColumn[index - 1].value[startIndex + 3]
                    }`;

                    setAnchorEl(e.currentTarget);
                    setPopupContent({ head, content, source });
                  },
                },
                ...item.slice(1),
              ];
            })}
          />
        </TableBody>
      </Table>
    </Box>
  );
};

export default PsiFamilyPlaning;

const typeStyle = {
  backgroundColor: "#0277BD",
  color: "#fff",
};
const labelStyle = {
  backgroundColor: "#4FC3F7",
  color: "#000",
};
const deStyle = {
  backgroundColor: "#B3E5FC",
  width: "250px",
  padding: "5px 30px !important",
};
const emptyStyle = {
  backgroundColor: "rgb(170, 182, 162)",
};

const dataElementConfigs = [
  //I
  [
    {
      display: "text",
      text: "dataElements",
      style: typeStyle,
    },
    {
      display: "text",
      text: "Old_user_number_of_couple",
      style: typeStyle,
    },
    {
      display: "text",
      text: "New_user_number_of_couple",
      style: typeStyle,
    },
    {
      display: "text",
      text: "Number_of_continue_users",
      style: typeStyle,
    },
    {
      display: "text",
      text: "Total_number_distributed",
      style: typeStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Condoms_",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "bM0YZOyAlMr",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "m2V4dUljQVq",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "xCa6R5GJHmZ",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "NQ1VY2fZLhp",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Single_Pill",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "VPbIDh5HeVc",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "whoq3P3gtyc",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "CSugsclfQYE",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "hUhFB4xWcnR",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Combined_Pill",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "sa8Ep87YPNv",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "kUIvo5is72S",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "a6pVsTaYm7v",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "MxuZzDqR47u",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Depose_Injectable",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "bx2Imp5Yzuw",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "QFWbdLref5O",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "ayQp61TleuI",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "SCytLILeL3R",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "IUD_",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "OvagmN5kZYp",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "mDRUz90yNBS",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "L4ngJgyyJSh",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "v0wAUejW3DY",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Implant_",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "fxxCQH5j7cu",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "kaE666RoSB0",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "clpItQMXZfT",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "h9TYImbiQdk",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Emergency_pill",
      style: labelStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "pMsIub38RRC",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "yRcuPIKofP7",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "gqAUUkPKvQQ",
      style: deStyle,
    },
    {
      cc: "kinUqU9ASfo",
      coc: "i7WPuiegoQn",
      dsde: "IjyThCvfkyd",
      style: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Female_Sterilization",
      style: labelStyle,
    },
    {
      display: "empty",
      style: emptyStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "el62zkAWxUc",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "AsHfNUmeLGa",
      style: deStyle,
    },
    {
      display: "empty",
      style: emptyStyle,
    },
  ],
  [
    {
      display: "text",
      text: "Male_Sterilization",
      style: labelStyle,
    },
    {
      display: "empty",
      style: emptyStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Itl7pbKRCvw",
      style: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gxUrtdaeG2v",
      style: deStyle,
    },
    {
      display: "empty",
      style: emptyStyle,
    },
  ],
];
