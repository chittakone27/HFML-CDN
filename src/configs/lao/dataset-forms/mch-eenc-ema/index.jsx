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
import "./mch-eenc-ema.css";

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

const MchEencEma = () => {
  return (
    <Box
      id="mch-eenc-ema-form-container"
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

const dataElementConfigsSection1 = [
  [
    { display: "text", text: "externalInterview" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "RfCRMBI5lBv" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "sLvxAoRIJ6Q" },
  ],
  [
    { display: "text", text: "externalChartReview" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "voEawKqgdTo" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "Uu23CYi0cpb" },
  ],
  [
    { display: "text", text: "observationOfDelivery" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "HoCbPC1abn7" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "SKnnYcngS3X" },
  ],
  [
    { display: "text", text: "observationOfEnvironmentalHygiene" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "DQVeIeSWCfu" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "TbdDjiK1GPR" },
  ],
  [
    { display: "text", text: "medicinesAndSupplies" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "KW7CR08i51z" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "R2bZJttpX56" },
  ],
  [
    { display: "text", text: "hospitalPolicies" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "nDwcNIsoygW" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "P72pJMNmSjF" },
  ],
];

const dataElementConfigsSection2 = [
  [
    {
      display: "textOnField",
      text: "pendingIssues",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vreS3errXz5",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "TC3eWz7MqTC" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "MpmpFkAv6R1" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ByPUMfNe5jq" },
  ],
  [
    {
      display: "textOnField",
      text: "externalInterviewsDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "bDLapL1gL0Y",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "CCCKD4LsnKj" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "jOSKekEZwMn" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "kowdFELUSgf" },
  ],
  [
    {
      display: "textOnField",
      text: "externalChartReviewDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mrScZLbtXLb",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "l1BWmqBOA4u" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "LQ4Ji4zbqKI" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "XCE9bmjOVDO" },
  ],
  [
    {
      display: "textOnField",
      text: "observationOfDeliveryDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PdM6GG5ALRL",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "N2He6Tmv6sG" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "EsTC4A6Xqlm" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "aSTgeGuowHA" },
  ],
  [
    {
      display: "textOnField",
      text: "observationOfEnvironmentalHygieneDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PrLAupT1q2L",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "QjuWxC0CfwF" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "ocGJQF8WAML" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "PhuSyH6xxaj" },
  ],
  [
    {
      display: "textOnField",
      text: "medicinesAndSuppliesDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "pd2qL6a2pHb",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "veLWig0oFdW" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "WtX34Skjmtm" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "f7JJHwSC8D0" },
  ],
  [
    {
      display: "textOnField",
      text: "hospitalPoliciesDefault",
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fbJqBTMS76i",
    },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "wRiXUENZ6jz" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "lpCozSczsyk" },
    { cc: "TiHjDIadDIL", coc: "lmbxvugTvKr", dsde: "vgbIp2ER9rw" },
  ],
  [
    { customCell: <HospitalRequestsLabel />, cellProps: { colSpan: 2 } },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Qsn98qIeVTN",
      cellProps: { colSpan: 2 },
    },
  ],
];

export default MchEencEma;
