import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./dlip7.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#EFEFEF",
  fontWeight: "bold",
  border: "1px solid #C0C0C0",
}));

const Dlip7 = () => {
  const { t } = useTranslation();

  return (
    <Box id="dlip7-form-container" className="custom-form">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>ອົງປະກອບຂໍ້ມູນ</HeaderCell>
            <HeaderCell>ພາກປົກກະຕິ</HeaderCell>
            <HeaderCell>ພາກລາຍຮັບວິຊາການ</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const labelStyle = {
  style: {
    border: "1px solid #C0C0C0",
  },
};

const valueStyle = {
  style: {
    width: "250px",
    border: "1px solid #C0C0C0",
  },
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "ງົບປະມານພາກ 62",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BvgaTA4zOZR",
      cellProps: valueStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vXyc25oSIE9",
      cellProps: valueStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ງົບປະມານພາກ 63",
      cellProps: labelStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "v1lOMMaHQpe",
      cellProps: { ...valueStyle, colSpan: 2 },
    },
  ],
];

export default Dlip7;
