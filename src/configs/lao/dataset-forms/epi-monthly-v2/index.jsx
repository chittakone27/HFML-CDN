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
import "./epi-monthly-v2.css";
import { useState } from "react";
import CustomDialog from "../common/Dialog/Dialog";

const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const labelWide1Style = {
  style: {
    textAlign: "left",
    backgroundColor: "#CCCCCC",
  },
};
const labelWide2Style = {
  style: {
    textAlign: "left",
    backgroundColor: "#9CD6E8",
  },
};
const valueStyle = {
  style: {
    backgroundColor: "#FFF",
    width: "250px",
    border: "1px solid #d1d1d1",
    padding: "5px 30px !important",
  },
};
const primaryTextStyle = {
  style: {
    textAlign: "left",
    backgroundColor: "#243C90",
    color: "#fff",
  },
};
const secondaryTextStyle = {
  style: {
    backgroundColor: "#4B62B2",
    color: "#fff",
    fontWeight: "bold",
  },
};
const valueWide2Style = {
  style: {
    backgroundColor: "#FFF",
    border: "1px solid #d1d1d1",
    width: "250px",
    padding: "5px 30px !important",
  },
};

const primaryTextWide2Style = {
  style: {
    textAlign: "left",
    backgroundColor: "#104C5F",
    color: "#fff",
  },
};
const secondaryTextWide2Style = {
  style: {
    backgroundColor: "#186983",
    color: "#fff",
    fontWeight: "bold",
  },
};

const EpiMonthlyV2 = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const headerWide1Text = [
    [
      {
        display: "text",
        text: "Child",
        cellProps: { ...primaryTextStyle, colSpan: 22 },
      },
    ],
    [
      {
        display: "text",
        text: "",
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("BCG"),
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "BCG" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ ວັນນະໂລກ ຊະນິດດຽວ ທີ່ມີໃນປະຈຸບັນ. ສາມາດປົກປ້ອງ ຕໍ່ການເປັນອັກ ເສບເຫຍື່ອຫຸ້ມສະຫມອງ ແລະ ຮູບແບບແຜ່ກະ ຈາຍ ຢູ່ໃນເດັກນ້ອຍ ແລະ ເດັກຫນຸ່ມ. ລະດັບສະເລຍ່ການປົກປ້ອງໄດ້ ຕໍ່ການເປັນ ວັນນະ ໂລກ ອັກເສບເຫຍື່ອຫຸ້ມສະຫມອງ ແລະ ວັນ ນະໂລກ ຮູບແບບແຜ່ກະຈາຍ ແມ່ນ 86%" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "ຄູ່ມື ພາກປະຕິບັດຕົວຈິງໃນການສັກຢາກັນພະຍາດ ສະບັບປັບປຸງປີ 2004",
      },
      {
        display: "text",
        text: "HBO",
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
      },
      {
        display: "text",
        text: "OPV",
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: "IPV 1",
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "IPV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ສັກ. ສັກໃຫ້ ເມື່ອເດັກອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ ພ້ອມດຽວກັບການຢອດວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "IPV 2",
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: "IPV 3",
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: "Penta",
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: "PCV",
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: "JE",
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "JE" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໄຂ້ສະໝອງອັກເສບຍີ່ປຸ່ນ. ໃຫ້ເມື່ອເດັກອາຍຸລະຫວ່າງ 9–11 ເດືອນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "MCV",
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: "FIC < 1 year",
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: "< 24 hours",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "HB0 < 24 ຊົ່ວໂມງ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊິນກັນພະຍາດອັກເສບຕັບ ຊະນິດ ບີ ສັກໃຫ້ເດັກໃນເວລາເກີດ ບໍ່ກາຍ 24 ຊົ່ວໂມງ" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "ຄູ່ມື ພາກປະຕິບັດຕົວຈິງໃນການສັກຢາກັນພະຍາດ ສະບັບປັບປຸງປີ 2004",
      },
      {
        display: "text",
        text: "< 7 days",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "HB0 < 7 ວັນ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊິນກັນພະຍາດອັກເສບຕັບ ຊະນິດ ບີ ສັກໃຫ້ເດັກໃນເວລາເກີດ ບໍ່ກາຍ 7 ວັນ" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "1",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "2",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 2" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ 10 ອາທິດ ຫຼື ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "3",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 3" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "1",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib1 (Penta1)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "2",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib2 (Penta2)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ພະຍາດ ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 10 ອາທິດ ຫຼື ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "3",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib3 (Penta3)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ພະຍາດ ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "1",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "2",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 2" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 10 ອາທິດ ຫຼື  ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "3",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 3" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 14 ອາທິດ ຫຼື  ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      { display: "text", text: "JEV 1", cellProps: secondaryTextStyle },
      { display: "text", text: "JEV 1+", cellProps: secondaryTextStyle },
      {
        display: "text",
        text: "MCV 1",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "MR (MCV1)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໝາກແດງໃຫຍ່ ໝາກແດງນ້ອຍ. ໃຫ້ເມື່ອເດັກອາຍຸລະຫວ່າງ 9–11 ເດືອນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "MCV 1+",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "MR (MCV1+)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໝາກແດງໃຫຍ່ ໝາກແດງນ້ອຍ. ໃຫ້ເມື່ອເດັກອາຍຸກາຍ 1 ປີ, ແຕ່ບໍ່ກາຍ 5 ປີ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "MCV 2",
        cellProps: secondaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "MR (MCV2)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໝາກແດງໃຫຍ່ ໝາກແດງນ້ອຍ. ໃຫ້ເມື່ອເດັກອາຍຸ 12-18 ເດືອນ. ຖ້າພາດໂອກາດ ແມ່ນສາມາດສືບຕໍ່ສັກເປັນເຂັມ 2 ໄດ້ ແຕ່ບໍ່ກາຍ 5 ປີ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
    ],

    [
      {
        display: "text",
        text: "Outreach",
        cellProps: labelWide1Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "UnFoXigsKbu",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "U5HGQxIOYep",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "emQf7gLrRug",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "TKTk1y4uMQt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "wJsghWnTOvg",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "ltNIUvSRztm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "xKtZOp1njHK",
        cellProps: valueStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "ygsZjua2HcR",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "yg5QKIDIuxQ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "SkPFKyJsIWJ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "e5020gNvYnm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "ai74njlUSEn",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "lEKy50swRZo",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "UVgMoeAZhnM",
        cellProps: valueStyle,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "OYLIGrYeynN",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "qX5dv86LEiH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "sXxRSSmpoY2",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "SlULf6ULKZz",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "Mobile",
        cellProps: labelWide1Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "UnFoXigsKbu",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "U5HGQxIOYep",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "emQf7gLrRug",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "TKTk1y4uMQt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "wJsghWnTOvg",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "ltNIUvSRztm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "xKtZOp1njHK",
        cellProps: valueStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "ygsZjua2HcR",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "yg5QKIDIuxQ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "SkPFKyJsIWJ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "e5020gNvYnm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "ai74njlUSEn",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "lEKy50swRZo",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "UVgMoeAZhnM",
        cellProps: valueStyle,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "OYLIGrYeynN",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "qX5dv86LEiH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "sXxRSSmpoY2",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "SlULf6ULKZz",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: "Outside country",
        cellProps: labelWide1Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "UnFoXigsKbu",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "U5HGQxIOYep",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "emQf7gLrRug",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "TKTk1y4uMQt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "wJsghWnTOvg",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "ltNIUvSRztm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "xKtZOp1njHK",
        cellProps: valueStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        display: "empty",
        cellProps: emptyStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "ygsZjua2HcR",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "yg5QKIDIuxQ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "SkPFKyJsIWJ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "e5020gNvYnm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "ai74njlUSEn",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "lEKy50swRZo",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "UVgMoeAZhnM",
        cellProps: valueStyle,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "OYLIGrYeynN",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "qX5dv86LEiH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "sXxRSSmpoY2",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "SlULf6ULKZz",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
    ],
  ];
  const headerWide2Text = [
    [
      {
        display: "text",
        text: "Women",
        cellProps: { ...primaryTextWide2Style, colSpan: 15 },
      },
    ],
    [
      {
        display: "text",
        text: "",
        cellProps: { ...secondaryTextWide2Style, rowSpan: 2 },
      },
      {
        display: "text",
        text: "Class 5 / 10 year out school",
        cellProps: { ...secondaryTextWide2Style, colSpan: 2 },
      },
      {
        display: "text",
        text: "15 - 45",
        cellProps: { ...secondaryTextWide2Style, colSpan: 5 },
      },
      {
        display: "text",
        text: "Pregnant",
        cellProps: { ...secondaryTextWide2Style, colSpan: 7 },
      },
    ],
    [
      {
        display: "text",
        text: "HPV 1",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "HPV1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນ ກັນມະເຮັງປາກມົດລູກ. ສັກໃຫ້ເດັກຍິງຊັ້ນປະຖົມ, ປໍ 5, ໃຫ້ຄັ້ງທີ 1. ອາຍຸລະຫວ່າງ 9 ຫາ 13 ປີ ແລະ ເດັກຍິງ ອາຍຸ 10 ປີທີ່ບໍ່ໄດ້ເຂົ້າໂຮງຮຽນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "HPV 2",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "HPV2" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນ ກັນມະເຮັງປາກມົດລູກ. ສັກໃຫ້ເດັກຍິງຊັ້ນປະຖົມ, ປໍ 5, ໃຫ້ຄັ້ງທີ 2. ອາຍຸລະຫວ່າງ 9 ຫາ 13 ປີ, ໃຫຄັ້ງທີ 2, ຫ່າງຈາກຄັ້ງທີ 1 ຫົກ ເດືອນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 1",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td1 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 1ແກ່ ແມ່ຍິງຖືພາ ໄຕມາດໃດກໍ່ໄດ້." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 2",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td2 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 2ແກ່ ແມ່ຍິງຖືພາ ຫ່າງຈາກຄັ້ງທີ 1 ຢ່າງໜ້ອຍ 1 ເດືອນ (ຖ້າທັນເວລາກ່ອນເກີດ ອີງຕາມການກວດເບິ່ງບັດສັກຢາ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 3",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td3 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 3ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 2 ຢ່າງໜ້ອຍ 6 ເດືອນ (ຖ້າທັນເວລາກ່ອນເກີດ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 4",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td4 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 4ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 3 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 5",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td5 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 5ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 4 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 1",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td1 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 1ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 2",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td2 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 2ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ ຫ່າງຈາກຄັ້ງທີ 1 ຢ່າງໜ້ອຍ 1 ເດືອນ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 3",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td3 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 3ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ ຫ່າງຈາກຄັ້ງທີ 2 ຢ່າງໜ້ອຍ 6 ເດືອນ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 4",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td4 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 4ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ, ຫ່າງຈາກຄັ້ງທີ 3 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Td 5",
        cellProps: secondaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td5 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 5ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ, ຫ່າງຈາກຄັ້ງທີ 4 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>',
      },
      {
        display: "text",
        text: "Protect at birth",
        cellProps: secondaryTextWide2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Outreach",
        cellProps: labelWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "rQya108lATG",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "zAeNeqry6eN",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "P5QPXW1ZmWK",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "R7FI71ynIif",
        cellProps: valueWide2Style,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "FVDxhxOvTp5",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "tfQpD9rPFTc",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "wLo5NRNsdVw",
        cellProps: valueWide2Style,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "AgwzxBKsTeC",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "PQ7P05rFY3z",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "rsVj8PxOoSF",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "QgilV6VXddB",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "zz1AQlJV1Pi",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "nchrSKUh3ZP",
        cellProps: valueWide2Style,
      },
    ],

    [
      {
        display: "text",
        text: "Mobile",
        cellProps: labelWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "rQya108lATG",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "zAeNeqry6eN",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "P5QPXW1ZmWK",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "R7FI71ynIif",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "FVDxhxOvTp5",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "tfQpD9rPFTc",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "wLo5NRNsdVw",
        cellProps: valueWide2Style,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "AgwzxBKsTeC",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "PQ7P05rFY3z",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "rsVj8PxOoSF",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "QgilV6VXddB",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "zz1AQlJV1Pi",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "nchrSKUh3ZP",
        cellProps: valueWide2Style,
      },
    ],
    [
      {
        display: "text",
        text: "Outside country",
        cellProps: labelWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "rQya108lATG",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "zAeNeqry6eN",
        disabled: true,
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "P5QPXW1ZmWK",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "R7FI71ynIif",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "FVDxhxOvTp5",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "tfQpD9rPFTc",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "wLo5NRNsdVw",
        cellProps: valueWide2Style,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "AgwzxBKsTeC",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "PQ7P05rFY3z",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "rsVj8PxOoSF",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "QgilV6VXddB",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "zz1AQlJV1Pi",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "nchrSKUh3ZP",
        cellProps: valueWide2Style,
      },
    ],
  ];
  return (
    <Box id="epi-monthly-v2-form-container" className="custom-form">
      <Table id="tableWide1">
        <MapTable
          dataElementConfigs={headerWide1Text.map((item) => {
            const result = item.map((col) => {
              if (col.dialogContent) {
                return {
                  ...col,
                  onClick: () => {
                    setDialogContent(col.dialogContent);
                    setOpen(true);
                  },
                };
              }
              return col;
            });
            return result;
          })}
        />
      </Table>
      <Table id="tableWide2">
        <MapTable
          dataElementConfigs={headerWide2Text.map((item) => {
            const result = item.map((col) => {
              if (col.dialogContent) {
                return {
                  ...col,
                  onClick: () => {
                    setDialogContent(col.dialogContent);
                    setOpen(true);
                  },
                };
              }
              return col;
            });
            return result;
          })}
        />
      </Table>
      <CustomDialog open={open} setOpen={setOpen} title="ນິຍາມຂໍ້ມູນ">
        {dialogContent}
      </CustomDialog>
    </Box>
  );
};
export default EpiMonthlyV2;
