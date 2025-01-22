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
import { useTranslation } from "react-i18next";
import MapTable from "../common/MapTable";

import "../common/index.css";
import "./epi-monthly.css";
import { useState } from "react";
import CustomDialog from "../common/Dialog/Dialog";
import TotalCell from "../common/TotalCell";

const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const labelStyle = {
  style: {
    backgroundColor: "#CCCCCC",
    color: "#000",
    fontSize: "17px",
    paddingLeft: "15px",
    textAlign: "left",
    minWidth: "225px",
  },
};
const labelWide1Style = {
  style: {
    textAlign: "left",
    minWidth: "175px",
    backgroundColor: "#CCCCCC",
  },
};
const labelWide2Style = {
  style: {
    textAlign: "left",
    backgroundColor: "#9CD6E8",
    minWidth: "175px",
  },
};
const labelWide3Style = {
  style: {
    textAlign: "center",
    backgroundColor: "#0177BD",
    color: "#fff",
    minWidth: "175px",
  },
};
const tertiaryText1Style = {
  style: {
    backgroundColor: "#8EBC8F",
    color: "#39547D",
    fontWeight: "bold",
  },
};
const tertiaryText2Style = {
  style: {
    backgroundColor: "#82B4ED",
    color: "#39547D",
    fontWeight: "bold",
  },
};
const tertiaryText3Style = {
  style: {
    backgroundColor: "#EDE182",
    color: "#39547D",
    fontWeight: "bold",
  },
};
const tertiaryText4Style = {
  style: {
    backgroundColor: "#F8C8D9",
    color: "#39547D",
    fontWeight: "bold",
  },
};
const tertiaryText5Style = {
  style: {
    backgroundColor: "#B2F8F5",
    color: "#39547D",
    fontWeight: "bold",
  },
};
const valueStyle = {
  style: {
    backgroundColor: "#fff",
    padding: 0,
    width: "150px",
    border: "1px solid #C0C0C0",
  },
};

const label4Style = {
  style: {
    backgroundColor: "#AFF1F1",
    color: "#000",
    fontSize: "17px",
    paddingLeft: "15px",
    textAlign: "left",
    minWidth: "225px",
  },
};
const value4Style = {
  style: {
    backgroundColor: "#fff",
    padding: 0,
    width: "150px",
    border: "1px solid #C0C0C0",
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
const tertiaryTextStyle = {
  style: {
    backgroundColor: "#4295a5",
    color: "#fff",
    fontWeight: "bold",
  },
};
const valueWide2Style = {
  style: {
    backgroundColor: "#fff",
    padding: 0,
    // width: "250px",
    border: "1px solid #C0C0C0",
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
const tertiaryTextWide2Style = {
  style: {
    backgroundColor: "#186983",
    color: "#fff",
    fontWeight: "bold",
  },
};

const EpiMonthly = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const dataElementSmall1Configs = [
    [
      {
        display: "text",
        text: t("Number of fixed site session"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "DKteAyDSqtH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "wPOxPEzRWZf",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Number of outreach session"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "DKteAyDSqtH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "wPOxPEzRWZf",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Number of mobile session"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "DKteAyDSqtH",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "wPOxPEzRWZf",
        cellProps: valueStyle,
      },
    ],
  ];

  const dataElementSmall2Configs = [
    [
      {
        display: "text",
        text: t("Fixed site village"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "XFemxaLYZ2L",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Outreach village"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "XFemxaLYZ2L",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Mobile village"),
        cellProps: labelStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "XFemxaLYZ2L",
        cellProps: valueStyle,
      },
    ],
  ];
  const dataElementSmall3Configs = [
    [
      {
        display: "text",
        text: t("Non-Serious AEFI"),
        cellProps: labelStyle,
      },
      {
        cc: "UYWiUKudn5U",
        coc: "ZqbquZsMQ5g",
        dsde: "QQoItC2wdGj",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Serious AEFI"),
        cellProps: labelStyle,
      },
      {
        cc: "UYWiUKudn5U",
        coc: "QLDTQjpFp7s",
        dsde: "QQoItC2wdGj",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Total"),
        cellProps: labelStyle,
      },
      {
        display: "text",
        text: "0",
        cellProps: valueStyle,
        customCell: (
          <TotalCell
            listData={["QQoItC2wdGj-ZqbquZsMQ5g", "QQoItC2wdGj-QLDTQjpFp7s"]}
          />
        ),
      },
    ],
  ];
  const dataElementSmall4Configs = [
    [
      {
        display: "text",
        text: t("Openning Balance"),
        cellProps: label4Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "mSqBeqmOeME",
        cellProps: value4Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Vaccine Received"),
        cellProps: label4Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "AVn5ZYSosxG",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Vaccine Used"),
        cellProps: label4Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "hEyUCQzytF0",
        cellProps: value4Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Closing Balance"),
        cellProps: label4Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "biDG8UyP0Em",
        cellProps: value4Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Vaccine Wastage"),
        cellProps: label4Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZED0mnD0mlA",
        cellProps: value4Style,
      },
    ],
  ];
  const headerWide1Text = [
    [
      {
        display: "text",
        text: t("Child"),
        cellProps: { ...primaryTextStyle, colSpan: 26 },
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
        text: t("HBO"),
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
      },
      {
        display: "text",
        text: t("OPV"),
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: t("IPV 1"),
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "IPV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ສັກ. ສັກໃຫ້ ເມື່ອເດັກອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ ພ້ອມດຽວກັບການຢອດວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("IPV 2"),
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("IPV 3"),
        cellProps: { ...secondaryTextStyle, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("RV"),
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
      },
      {
        display: "text",
        text: t("Penta"),
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: t("PCV"),
        cellProps: { ...secondaryTextStyle, colSpan: 3 },
      },
      {
        display: "text",
        text: t("MR"),
        cellProps: { ...secondaryTextStyle, colSpan: 4 },
      },
      {
        display: "text",
        text: t("JE"),
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "JE" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໄຂ້ສະໝອງອັກເສບຍີ່ປຸ່ນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("FIC"),
        cellProps: { ...secondaryTextStyle, colSpan: 2 },
      },
    ],
    [
      {
        display: "text",
        text: t("&lt; 24 hours"),
        cellProps: tertiaryTextStyle,
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
        text: t("&lt; 7 days"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "HB0 < 7 ວັນ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊິນກັນພະຍາດອັກເສບຕັບ ຊະນິດ ບີ ສັກໃຫ້ເດັກໃນເວລາເກີດ ບໍ່ກາຍ 7 ວັນ" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "1",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "2",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 2" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ 10 ອາທິດ ຫຼື ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "3",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "OPV 3" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດເປ້ຍລ່ອຍ (ໂປລີໂອ) ຊະນິດ ຢອດກິນທາງປາກ, ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("RV1"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("RV2"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "1",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib1 (Penta1)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "2",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib2 (Penta2)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ພະຍາດ ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 10 ອາທິດ ຫຼື ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "3",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "DPT-HepB-Hib3 (Penta3)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນ 5 ພະຍາດໃນເຂັມດຽວຄື: ພະຍາດ ຄໍຕີບ, ໄອໄກ່, ບາດທະຍັກ, ອັກເສບຕັບ ຊະນິດ ບີ, ເຫຍື້ອຫຸ້ມສະໝອງ ແລະ ປອດ ອັກເສບ. ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 14 ອາທິດ ຫຼື ສາມ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "1",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 1" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 1, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 6 ອາທິດ ຫຼື ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "2",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 2" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 2, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 10 ອາທິດ ຫຼື  ສອງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "3",
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "PCV 3" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ອັກເສບປອດຮຸນແຮງ. ໃຫ້ຄັ້ງທີ 3, ເມື່ອເດັກອາຍຸໄດ້ ອາຍຸໄດ້ 14 ອາທິດ ຫຼື  ໜຶ່ງ ເດືອນ ເຄິ່ງ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("MR1 9-11 Months"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "..................." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("MR1 12-59 Months"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "..................." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("MR2 12-18 Months"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "..................." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("MR2 19-59 Months"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "............" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "..................." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("JE 9-11 Months"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "JE 9-11 ເດືອນ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໄຂ້ສະໝອງອັກເສບຍີ່ປຸ່ນ. ໃຫ້ເມື່ອເດັກອາຍຸລະຫວ່າງ 9–11 ເດືອນ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("JE over 1 year"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "JE 1 ປິຂື້ນໄປ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ໄຂ້ສະໝອງອັກເສບຍີ່ປຸ່ນ. ໃຫ້ເມື່ອເດັກອາຍຸ 1 ປີຂື້ນໄປ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("FIC &lt; 1 year"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "ເດັກລຸ່ມ 1 ປີ ໄດ້ຮັບວັກຊີນກັນພະຍາດຄົບ (FIC < 1 Year)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ເດັກລຸ່ມ 1 ປີ ໝາຍເຖີ່ງເດັກນ້ອຍທີີ່ໄດ້ຮັບການສັກຢາ BCG1, OPV1-3, Panta 1-3 ແລະ MR1" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("FIC &lt; 2 year"),
        cellProps: tertiaryTextStyle,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "ເດັກລຸ່ມ 2 ປີ ໄດ້ຮັບວັກຊີນກັນພະຍາດຄົບ FIC < 2 Years)" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ເດັກລຸ່ມ 1 ປີ ໝາຍເຖີ່ງເດັກນ້ອຍທີີ່ໄດ້ຮັບການສັກຢາ BCG1, OPV1-3, Panta 1-3, MR1 ແລະ MR2" +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
    ],
    [
      {
        display: "text",
        text: t("Fixed"),
        cellProps: labelWide1Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "UnFoXigsKbu",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "U5HGQxIOYep",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "emQf7gLrRug",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "TKTk1y4uMQt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "wJsghWnTOvg",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "ltNIUvSRztm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
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
        coc: "rzN3nXE1AUj",
        dsde: "aigtJb6kiUt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "aV2UXHuzEp9",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "ygsZjua2HcR",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "yg5QKIDIuxQ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "SkPFKyJsIWJ",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "e5020gNvYnm",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "ai74njlUSEn",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "lEKy50swRZo",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "qX5dv86LEiH",
        cellProps: valueStyle,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "sXxRSSmpoY2",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "SlULf6ULKZz",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "xYVNugOdRvA",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "UVgMoeAZhnM",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "OYLIGrYeynN",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "R3rvrJXqbaY",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Outreach"),
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
        dsde: "aigtJb6kiUt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "aV2UXHuzEp9",
        cellProps: valueStyle,
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
        dsde: "xYVNugOdRvA",
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
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "R3rvrJXqbaY",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Mobile"),
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
        dsde: "aigtJb6kiUt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "aV2UXHuzEp9",
        cellProps: valueStyle,
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
        dsde: "xYVNugOdRvA",
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
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "R3rvrJXqbaY",
        cellProps: valueStyle,
      },
    ],
    [
      {
        display: "text",
        text: t("Outside country"),
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
        dsde: "aigtJb6kiUt",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "aV2UXHuzEp9",
        cellProps: valueStyle,
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
        dsde: "xYVNugOdRvA",
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
        dsde: "js2VA67hWNA",
        cellProps: valueStyle,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "R3rvrJXqbaY",
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
        text: "Td 1",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td1 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 1ແກ່ ແມ່ຍິງຖືພາ ໄຕມາດໃດກໍ່ໄດ້." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 2",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td2 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 2ແກ່ ແມ່ຍິງຖືພາ ຫ່າງຈາກຄັ້ງທີ 1 ຢ່າງໜ້ອຍ 1 ເດືອນ (ຖ້າທັນເວລາກ່ອນເກີດ ອີງຕາມການກວດເບິ່ງບັດສັກຢາ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 3",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td3 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 3ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 2 ຢ່າງໜ້ອຍ 6 ເດືອນ (ຖ້າທັນເວລາກ່ອນເກີດ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ)." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 4",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td4 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 4ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 3 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 5",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td5 ແມ່ຍິງຖືພາ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 5ແກ່ ແມ່ຍິງຖືພາ, ຫ່າງຈາກຄັ້ງທີ 4 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 1",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td1 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 1ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 2",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td2 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 2ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ ຫ່າງຈາກຄັ້ງທີ 1 ຢ່າງໜ້ອຍ 1 ເດືອນ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 3",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td3 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 3ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ 15-45 ປີ ຫ່າງຈາກຄັ້ງທີ 2 ຢ່າງໜ້ອຍ 6 ເດືອນ, ອີງຕາມການກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 4",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td4 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 4ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ, ຫ່າງຈາກຄັ້ງທີ 3 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: "Td 5",
        cellProps: tertiaryTextWide2Style,
        dialogContent:
          '<h3 class="laoFont">ຊື່ອົງປະກອບຂໍ້ມູນ:</h3>' +
          "Td5 ແມ່ຍິງ 15-45 ປີ" +
          '<hr><h3 class="laoFont">ນິຍາມ:</h3>' +
          "ແມ່ນວັກຊີນກັນພະຍາດ ບາດທະຍັກ, ຄໍຕີບ. ໃຫ້ຄັ້ງທີ 5ແກ່ ແມ່ຍິງໄວຈະເລີນພັນ, ຫ່າງຈາກຄັ້ງທີ 4 ຢ່າງໜ້ອຍ 1 ປີ, ອີງຕາມການ ກວດເບິ່ງບັດສັກຢາ." +
          '<hr><h3 class="laoFont">ແຫຼ່ງທີ່ມາຂອງຂໍ້ມູນ:</h3>' +
          "",
      },
      {
        display: "text",
        text: t("Protect at birth"),
        cellProps: tertiaryTextWide2Style,
      },
      { display: "text", text: t("Flu"), cellProps: tertiaryTextWide2Style },
    ],
    [
      {
        display: "text",
        text: t("Fixed"),
        cellProps: labelWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "P5QPXW1ZmWK",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "R7FI71ynIif",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "FVDxhxOvTp5",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "tfQpD9rPFTc",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "wLo5NRNsdVw",
        cellProps: valueWide2Style,
      },

      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "AgwzxBKsTeC",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "PQ7P05rFY3z",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "rsVj8PxOoSF",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "QgilV6VXddB",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "zz1AQlJV1Pi",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "nchrSKUh3ZP",
        cellProps: valueWide2Style,
      },
      {
        cc: "jtY9T8qeZmz",
        coc: "rzN3nXE1AUj",
        dsde: "pSnlXa87yGF",
        cellProps: valueWide2Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Outreach"),
        cellProps: labelWide2Style,
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
      {
        cc: "jtY9T8qeZmz",
        coc: "u6ZXWBKKgPV",
        dsde: "pSnlXa87yGF",
        cellProps: valueWide2Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Mobile"),
        cellProps: labelWide2Style,
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
      {
        cc: "jtY9T8qeZmz",
        coc: "HuElsgOs3K5",
        dsde: "pSnlXa87yGF",
        cellProps: valueWide2Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Outside country"),
        cellProps: labelWide2Style,
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
      {
        cc: "jtY9T8qeZmz",
        coc: "vqcWMS1423j",
        dsde: "pSnlXa87yGF",
        cellProps: valueWide2Style,
      },
    ],
  ];
  const headerWide3Text = [
    [
      {
        display: "text",
        text: t("Session Type"),
        cellProps: { ...labelWide3Style, rowSpan: 2 },
      },
      {
        display: "text",
        text: t("Target Group"),
        cellProps: { ...labelWide3Style, colSpan: 5 },
      },
    ],
    [
      {
        display: "text",
        text: t("Essential Worker"),
        cellProps: tertiaryText1Style,
      },
      {
        display: "text",
        text: t("Pregnant"),
        cellProps: tertiaryText2Style,
      },
      {
        display: "text",
        text: t("Older adults (&ge;60 Years)"),
        cellProps: tertiaryText3Style,
      },
      {
        display: "text",
        text: "Underlying health condition",
        cellProps: tertiaryText4Style,
      },
      {
        display: "text",
        text: "Other",
        cellProps: tertiaryText5Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Fixed"),
        cellProps: labelWide3Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "Ky8aCeIh3Yh",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText1Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "GaKEpqsFuDf",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText2Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "kq3DjQzfxrX",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText3Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "EpMTWpIt3ZX",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText4Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "aZTsGaE1lrP",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText5Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Outreach"),
        cellProps: labelWide3Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "XzsWSCEJPiQ",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText1Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "KjjMgjnWhER",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText2Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "mIQMtOEpVmT",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText3Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "BUEGPlmFuBX",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText4Style,
      },
      {
        cc: "ZrrYnomOZML",
        coc: "rh1hMBxlbLj",
        dsde: "tUwM5Hq4Utj",
        cellProps: tertiaryText5Style,
      },
    ],
    [
      {
        display: "text",
        text: t("Total vaccinated"),
        cellProps: labelWide3Style,
      },
      {
        display: "text",
        text: "0",
        cellProps: tertiaryText1Style,
      },
      {
        display: "text",
        text: "0",
        cellProps: tertiaryText2Style,
      },
      {
        display: "text",
        text: "0",
        cellProps: tertiaryText3Style,
      },
      {
        display: "text",
        text: "0",
        cellProps: tertiaryText4Style,
      },
      {
        display: "text",
        text: "0",
        cellProps: tertiaryText5Style,
      },
    ],
  ];
  return (
    <Box id="epi-monthly-form-container" className="custom-form">
      <Box
        id="epi-monthly-row-1-table-container"
        style={{
          marginTop: "20px",
        }}
      >
        <Box className="tableSmallBox">
          <Table id="tableSmall1" style={{ backgroundColor: "#C0C0C0" }}>
            <TableHead>
              <TableRow>
                <TableCell>{t("Monthly session plan")}</TableCell>
                <TableCell>{t("planned")}</TableCell>
                <TableCell>{t("Conducted")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MapTable dataElementConfigs={dataElementSmall1Configs} />
            </TableBody>
          </Table>
        </Box>
        <Box className="tableSmallBox">
          <Table id="tableSmall2" style={{ backgroundColor: "#C0C0C0" }}>
            <TableHead>
              <TableRow>
                <TableCell>{t("Villages in the catchment area")}</TableCell>
                <TableCell>{t("Number of villages")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MapTable dataElementConfigs={dataElementSmall2Configs} />
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Table
        id="tableWide1"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
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
      <Table
        id="tableSmall3"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>{t("Type of AEFI")}</TableCell>
            <TableCell>{t("Number of cases")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementSmall3Configs} />
        </TableBody>
      </Table>
      <Table
        id="tableWide2"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
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
      <Typography
        sx={{
          fontSize: "20px",
          marginTop: "10px",
          color: "#585D61",
          fontWeight: "450",
        }}
      >
        Seasonal Influenza Vaccine
      </Typography>
      <Table
        id="tableWide3"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
        <MapTable
          dataElementConfigs={headerWide3Text.map((item) => {
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
      <Table
        id="tableSmall3"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{}}>{t("Vaccine Report")}</TableCell>
            <TableCell sx={{}}>{t("Total vaccine")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MapTable dataElementConfigs={dataElementSmall4Configs} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default EpiMonthly;
