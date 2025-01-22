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
import "./mch-eenc-nicu.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#212121",
  color: "#fff",
  fontWeight: "bold",
  width: "25%",
}));

const MchEencNicu = () => {
  return (
    <Box
      id="mch-eenc-nicu-form-container"
      className="custom-form remove-border-left"
      sx={{ minWidth: 800 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>ປະຕິບັດການທີ່ເປັນບູລິມະສິດ</HeaderCell>
            <HeaderCell>ຜູ້ຮັບຜິດຊອບ</HeaderCell>
            <HeaderCell>ໄລຍະເວລາ</HeaderCell>
            <HeaderCell>ສະພາບ/ວັນທີ</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const HospitalRequestsLabel = () => (
  <span>
    ຮ້ອງຂໍໃຫ້ໂຮງໝໍສູນກາງ/ແຂວງ
    <br />
    *
    ການສ້າງແຜນປະຕິບັດການສ່ວນຫຼາຍແມ່ນຕ້ອງເຮັດຢູ່ສະຖານທີ່ບໍລິການສາທາລະນະສຸກຂອງທ່ານເອງ.
    ຫ້ອງດ້ານລຸ່ມແມ່ນສະເພາະໃນກໍລະນີຍົກເວັ້ນຖ້າວ່າບັນຫາດັ່ງກ່າວ
    <br />
    ບໍ່ສາມາດແກ້ໄຂໄດ້ໃນໂຮງໝໍຂອງທ່ານໄດ້
  </span>
);

const dataElementConfigs = [
  [
    {
      display: "textOnField",
      text: "ຂໍ້ຄົງຄ້າງທີ່ຍັງບໍ່ໄດ້ຮັບການແກ້ໄຂ:",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "BTT720uq23J",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "kfgOOdCS7Te" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "cGDGAtEjUa0" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "eJ1XI6MXyi1" },
  ],
  [
    {
      display: "textOnField",
      text: "nicu",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "xxAqyWWFiL2",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ncEwWlt4gG1" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "BwacJOK0F8B" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "sOmRlQcrGlN" },
  ],
  [
    { customCell: <HospitalRequestsLabel />, cellProps: { colSpan: 2 } },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "qCtdnoISmyO",
      cellProps: { colSpan: 2 },
    },
  ],
];

export default MchEencNicu;
