import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./mch-eenc-sma.css";

const HeaderCell = styled(TableCell)(() => ({
  backgroundColor: "#212121",
  color: "#fff",
  fontWeight: "bold",
  width: "25%",
}));

const Title = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: 10,
}));

const MchEencSma = () => {
  return (
    <Box
      id="mch-eenc-sma-form-container"
      className="custom-form remove-border-left"
      sx={{ minWidth: 800 }}
    >
      <Title variant="h6">
        ຕາຕະລາງ 1. ການລະບຸ ແລະ ຈັດລະດັບຄວາມສໍາຄັນ ຂອງຈຸດດີ ແລະ
        ຂົງເຂດທີ່ຕ້ອງປັບປຸງ ກ່ຽວກັບ EENC
      </Title>
      <Table id="table-section1">
        <TableHead>
          <TableRow>
            <HeaderCell>ຂົງເຂດ</HeaderCell>
            <HeaderCell>ຈຸດດີ</HeaderCell>
            <HeaderCell>ຂົງເຂດທີ່ຕ້ອງປັບປຸງ</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection1} />
        </TableBody>
      </Table>

      <Title variant="h6" sx={{ mt: 1 }}>
        ຕາຕະລາງ 2: ປະຕິບັດການທີ່ເປັນບູລິມະສິດ ສໍາລັບການປັບປຸງ EENC
      </Title>

      <Box sx={{ paddingBottom: 4 }}>
        <Table id="table-section2">
          <TableHead>
            <TableRow>
              <HeaderCell>ປະຕິບັດການທີ່ເປັນບູລິມະສິດ</HeaderCell>
              <HeaderCell>ຜູ້ຮັບຜິດຊອບ</HeaderCell>
              <HeaderCell>ໄລຍະເວລາ</HeaderCell>
              <HeaderCell>ສະພາບ/ວັນທີ</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <MapTable dataElementConfigs={dataElementConfigsSection2} />
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

const HospitalRequestsLabel = () => (
  <span className="de-note">
    ຮ້ອງຂໍໃຫ້ໂຮງໝໍສູນກາງ/ແຂວງ
    <br />*
    ການສ້າງແຜນປະຕິບັດການສ່ວນຫຼາຍແມ່ນຕ້ອງເຮັດຢູ່ສະຖານທີ່ບໍລິການສາທາລະນະສຸກຂອງທ່ານເອງ.
    ຫ້ອງດ້ານລຸ່ມແມ່ນສະເພາະໃນກໍລະນີຍົກເວັ້ນຖ້າວ່າບັນຫາດັ່ງກ່າວບໍ່ສາມາດແກ້ໄຂໄດ້ໃນໂຮງໝໍຂອງທ່ານໄດ້
  </span>
);

const dataElementConfigsSection1 = [
  [
    { display: "text", text: "internalInterview" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "njN7SX4wcOt" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "GGnOnVDqXoi" },
  ],
  [
    { display: "text", text: "internalChartReview" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "NeMuk5Nfh5A" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "zoIRvkKtOEm" },
  ],
  [
    { display: "text", text: "observationOfDelivery" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "joQ8bNAcodM" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "KBlLoPSYiTG" },
  ],
];

const dataElementConfigsSection2 = [
  [
    {
      display: "textOnField",
      text: "pendingIssues",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "R5Za1zhvJbx",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "PihPbdHpBwb" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "vNIZgqkHGJ7" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "PhCloeJ3tGo" },
  ],
  [
    {
      display: "textOnField",
      text: "internalInterviewsDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PSZ2yKv2BPP",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "Vlwt1VFFbl6" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "PqeDIP0HUSg" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ag3msJeE02n" },
  ],
  [
    {
      display: "textOnField",
      text: "internalChartReviewDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FbBxTLNbZZt",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "Z9bsZMjdTPz" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "oZn3bs1aCs2" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "MSkj6vCDwEV" },
  ],
  [
    {
      display: "textOnField",
      text: "observationOfDeliveryDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "XhHHj6VDPZB",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ikjLE93m0pM" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "lDjFGyxOpug" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "laPEGftTkUW" },
  ],
  [
    { customCell: <HospitalRequestsLabel />, cellProps: { colSpan: 2 } },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gXKxTCP8fXx",
      cellProps: { colSpan: 2 },
    },
  ],
];

export default MchEencSma;
