import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import { useAgeInYearRule, useForeignerRule } from "../common/hook";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import MapTable from "../common/MapTable";
import "../common/index.css";
import "./epi-woman.css";
import { useTranslation } from "react-i18next";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";

const StyledTable = styled(Table)({
  border: "1px solid #bdbdbd",
  "& td": { border: "1px solid #bdbdbd" },
});

const EpiWoman = () => {
  useAgeInYearRule("Z1x2iwf6IIY", "zDPvXY6h4JN");
  useForeignerRule("jaan5ZI8EnJ", villageSelectorIds);

  const currentEvent = useEventCaptureStore(
    (state) => state.currentEvent,
    shallow
  );

  const section1Configs = useMemo(
    () => [
      [
        {
          id: "YrWCXDYIy46",
          labelCellProps: {
            ...s1CommonProps.labelCellProps,
            sx: { width: "400px" },
          },
        },
      ],
      [{ id: "Z1x2iwf6IIY", ...s1CommonProps }],
      [{ id: "jaan5ZI8EnJ", ...s1CommonProps }],
      [{ id: "Nsv148saunk", ...s1CommonProps }],
      [
        {
          customCell: <VillageCell />,
          isCustomCellHide: currentEvent.dataValues["jaan5ZI8EnJ"],
        },
      ],
      [{ id: "PytdxISwHbE", ...s1CommonProps }],
    ],
    [currentEvent.dataValues["jaan5ZI8EnJ"]]
  );

  return (
    <Box id="epi-woman-form-container" className="custom-form">
      <StyledTable>
        <TableBody>
          <MapTable
            dataElementConfigs={section1Configs}
            tableName="epi-woman"
          />
        </TableBody>
      </StyledTable>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell
              className="strong-tex"
              sx={{
                backgroundColor: "#2c6693",
                color: "#ffffff",
                padding: "10px",
                fontSize: 16,
              }}
              colSpan={6}
            >
              Woman
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable
            dataElementConfigs={section2Configs}
            tableName="epi-woman-section-2"
          />
        </TableBody>
      </StyledTable>
    </Box>
  );
};

const villageSelectorIds = ["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"];

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell className="label">{t("currentAddress")}</TableCell>
      <TableCell>
        <Box>
          <VillageSelector
            dataElementIds={villageSelectorIds}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

const s1CommonProps = {
  labelCellProps: { className: "label" },
};

const s2CommonProps = {
  labelCellProps: { className: "label" },
  fieldCellProps: { className: "checkbox" },
};

const section2Configs = [
  [
    {
      id: "bsVgHta0CuG",
      labelCellProps: { className: "label", colSpan: 1 },
      fieldCellProps: { colSpan: 5 },
    },
  ],
  [
    {
      display: "empty",
      cellProps: {
        colSpan: 6,
        sx: { backgroundColor: "#2c6693", padding: "5px !important" },
      },
    },
  ],
  [
    { id: "Dpd8ZZdjrC3", ...s2CommonProps },
    { id: "j1L37o9C896", ...s2CommonProps },
    { id: "xV6EsULND5g", ...s2CommonProps },
  ],
  [
    { id: "TPV3QreCRLJ", ...s2CommonProps },
    { id: "oX5m31va9PI", ...s2CommonProps },
    { id: "RjRXEEvFJQa", ...s2CommonProps },
  ],
  [
    { id: "KbxdORTCAHx", ...s2CommonProps },
    { id: "Fo0fILsIKqk", ...s2CommonProps },
    { id: "PnJlCoOtzzd", ...s2CommonProps },
  ],
];

export default EpiWoman;
