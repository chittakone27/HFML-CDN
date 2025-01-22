import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";

import MapTable from "../../common/MapTable";
import { useTranslation } from "react-i18next";

const headerStyle = {
  backgroundColor: "#01579B",
  color: "#fff",
  fontWeight: "bold",
};

const HeaderCell = styled(TableCell)(() => headerStyle);

const Title = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: 10,
  fontWeight: "bold",
}));

const DirectInput = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell rowSpan={2}>ລາຍມຸ້ງ</HeaderCell>
            <HeaderCell rowSpan={2}>ຫົວໜ່ວຍ</HeaderCell>
            <HeaderCell rowSpan={2}>
              ຈ/ນ ເຫຼືອຈາກເດືອນກ່ອນ (ອັດຕະໂນມັດ)
            </HeaderCell>
            <HeaderCell rowSpan={2}>ຈ/ນ ເຫຼືອເດືອນກ່ອນ</HeaderCell>
            <HeaderCell colspan={2}>ຮັບເຂົ້າ (+)</HeaderCell>
            <HeaderCell colSpan={2}>ສົ່ງອອກ (-)</HeaderCell>
            <HeaderCell rowSpan={2}>ຈ/ນ ເສຍຫາຍ</HeaderCell>
            <HeaderCell rowSpan={2}>ຍອດເຫຼືອໃນປັດຈຸບັນ</HeaderCell>
          </TableRow>
          <TableRow>
            <HeaderCell>ຈ/ນ ຮັບໃໝ່ເດືອນນີ້</HeaderCell>
            <HeaderCell>ຈ/ນ ຮັບໂອນຈາກກິດຈະກຳອື່ນ</HeaderCell>
            <HeaderCell>ຈ/ນ ຈ່າຍອອກ</HeaderCell>
            <HeaderCell>ຈ/ນ ຈ່າຍໂອນໄປກິດຈະກຳອື່ນ</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection2} />
        </TableBody>
      </Table>
    </Box>
  );
};

const labelStyle = {
  backgroundColor: "#42A5F5",
};

const deStyle = {
  backgroundColor: "#BBDEFB",
};

const dataElementConfigsSection2 = [
  [
    {
      display: "text",
      text: "ມຸ້ງຄອບຄົວ ແມ່ມານ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UwFc37Z65wQ",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "OIRvAaTjwGO",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "sgoO2F6svbA",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "t6dTCeSJq5Z",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cdY10IWJx8X",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gtAHYNwK5Q9",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "RsXFQCOxChC",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KOhntWCxlqr",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງດ່ຽວ ຄົນເຄື່ອນຍ້າຍ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "kCDoO9YYQBS",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Mxj4jxPzwUd",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mHoEH6yB523",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "PjbL3YcARLO",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "P9I6HxzAfm9",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Lc0rLBkYoGM",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hk1C27OYhbC",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Jm1AEKtf2nP",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງຄອບຄົວ ຕ້ານລະບາດ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZkzILEcQ7sm",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iQtuZydO61m",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "iV7Y4HIV54e",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "YtmMWa5EQFc",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Gh0Qnwa5Esl",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "slvRlUjBrUS",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "man8muSLdKM",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "r2zy9ajwsaT",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງດ່ຽວ ທະຫານ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cfetH7hLzCD",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Lx9kcUlVpvA",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "fqnDzC6ZcdX",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ig3c9DIgyZx",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ZRxwlec8G2v",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UWdeDzunFOz",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "E7xqWoQHQCo",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UbXMbhKrWYo",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງດ່ຽວອູ່",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "WCTf0c1XBi0",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Am5abiCcRcV",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "vUKLwePtp1O",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "S1OItpY3BV2",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "j3k26tvqV5C",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "DcyEjuGER6W",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "aAL5B0bbBrV",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "uRz9N41r6et",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງດ່ຽວ TDA",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "cllYhWwpVet",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "hyaMHCzXb2n",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "nHAeJS7Or0A",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "lHt4d5YsFHF",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ok1GheoqSbg",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "KgpCKhN1uIl",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "mWuB1NxWbOg",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "FZOKIFoQJ2D",
      cellProps: deStyle,
    },
  ],
  [
    {
      display: "text",
      text: "ມຸ້ງຄອບຄົວ TDA",
      style: { ...labelStyle, width: "10%" },
    },
    {
      display: "text",
      text: "ຈຳນວນ",
      style: { ...labelStyle, width: "10%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "ywAFH0JsCyv",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Fi5GxVgVg5e",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "R23fm68luHd",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "SE01NNbokhR",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "jEib7ETXYCO",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "Jb2IvYdfb9y",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "We7F1zBvlTg",
      cellProps: deStyle,
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "gX7Q1Ov01W2",
      cellProps: deStyle,
    },
  ],
];

export default DirectInput;
