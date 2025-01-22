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
import "./ncle-data-quality-assessment.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
}));

const NcleDqa = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="ncle-data-quality-assessment-form-container"
      className="custom-form"
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell colSpan={2} sx={{ textAlign: "center" }}>
              ລາຍການພະຍາດ
            </HeaderCell>
            <HeaderCell colSpan={2} sx={{ textAlign: "center", width: "60%" }}>
              ໃສ່ຈຳນວນໂຕເລກຈາກປື້ມບັນທຶກຄົນເຈັບ
            </HeaderCell>
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
  sx: {
    backgroundColor: "#4FC3F7",
    color: "#000",
    textAlign: "center",
    width: "10%",
  },
};
const deStyle = {
  sx: {
    backgroundColor: "#B3E5FC",
    width: "250px",
    padding: "5px 30px !important",
  },
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "1",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ລ່ອຍແຫຼວກະທັນຫັນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KoaThdH4CNu",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "2",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ ແລະ ອອກຕຸ່ມ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pD3PUw8YxF0",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "3",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ບາດທະຍັກເດັກເກີດໃໝ່",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uehb8Foufhz",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "4",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ບາດທະຍັກທຸກອາຍຸ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QOJswY1ReJT",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "5",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ຄໍຕີບ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "QfDz1C4Swve",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "6",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄອໄກ່",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zcF4X8W7lQw",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "7.1",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ຍຸງລາຍທີບໍ່ມີອາການເຕືອນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "rPM2y3l2j6a",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "7.2",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ຍຸງລາຍທີມີອາການເຕືອນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sHb9bX2mf6D",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "7.3",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ຍຸງລາຍຮ້າຍແຮງ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "zaacU6HTHsS",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "8",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ຖອກທ້ອງເປັນນ້ຳກະທັນຫັນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Et8h9nOnqXm",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "9",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ຖອກທ້ອງເປັນມີມູກປົນເລືອດ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "F6jAvEa4E0H",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "10",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ເບື່ອອາຫານ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UlZz24PrwP0",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "11",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ທໍລະພິດ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "B1G3s6GrAf5",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "12",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໄຂ້ເລືອດດຳ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "VQXt6duDyNZ",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "13",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໝວດອາການເຫຼືອງກະທັນຫັນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DtoUeLkv8xh",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "14",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ເຍື້ອຫຸ້ມສະໝອງອັກເສບ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gqYyBs6FV2E",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "15",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໝວດອາການອັກເສບສະໝອງກະທັນຫັນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "HahFhmxG1Xs",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "16",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ພະຍາດກາລະໂລກ (ພະຍາດຕາຍຫ່າ)",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YXGjKDeRBhV",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "17",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ໝວດອາການຊຶມເຊື້ອລະບົບຫາຍໃຈຮຸນແຮງກະທັນຫັນ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DXjKknlBGha",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "18",
      cellProps: labelStyle,
    },
    {
      display: "text",
      text: "ພະຍາດວໍ້",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "LL7CbHMbwC2",
      cellProps: deStyle,
    },
  ],
];

export default NcleDqa;
