import { Box, Table, TableBody } from "@mui/material";

import MapTable from "../common/MapTable";

import "../common/index.css";
import "./ncle-weekly.css";

const NcleWeekly = () => {
  return (
    <Box
      id="ncle-weekly-form-container"
      className="custom-form remove-border-left"
    >
      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

const dataElementConfigs = [
  [
    {
      display: "text",
      text: "NO",
    },
    {
      display: "text",
      text: "Syndrome/Disease",
    },
    {
      display: "text",
      text: "ຊື່ພະຍາດ (Lao)",
    },
    {
      display: "text",
      text: "Case",
    },
    {
      display: "text",
      text: "Death",
    },
  ],
  [
    {
      display: "text",
      text: "1",
    },
    {
      display: "text",
      text: "Acute Flaccid Paralysis (AFP)",
    },
    {
      display: "text",
      text: "ກໍລະນີລ່ອຍ​ແຫຼວ​ກະທັນຫັນ",
    },
    {
      dsde: "KoaThdH4CNu",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "uwP58A4ir9X",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "2",
    },
    {
      display: "text",
      text: "Fever and Rash",
    },
    {
      display: "text",
      text: "ໄຂ້​ ແລະອອກ​ຕຸ່ມ",
    },
    {
      dsde: "pD3PUw8YxF0",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "P0d33trA8sF",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "3",
    },
    {
      display: "text",
      text: "Neonatal Tetanus (NNT)",
    },
    {
      display: "text",
      text: "ບາດ​ທະ​ຍັກ​ເດັກ​ເກີດ​ໃໝ່",
    },
    {
      dsde: "uehb8Foufhz",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "ZT3ddtGLOtU",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "4",
    },
    {
      display: "text",
      text: "Tetanus of all ages",
    },
    {
      display: "text",
      text: "ບາດ​ທະ​ຍັກ​ທຸກ​ອາຍຸ",
    },
    {
      dsde: "QOJswY1ReJT",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "X0j44KPFZjO",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "5",
    },
    {
      display: "text",
      text: "Diphtheria",
    },
    {
      display: "text",
      text: "ພະຍາດຄໍ​ຕີບ",
    },
    {
      dsde: "QfDz1C4Swve",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "nEJti58Rq7w",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "6",
    },
    {
      display: "text",
      text: "Pertussis",
    },
    {
      display: "text",
      text: "ພະຍາດໄອ​ໄກ່",
    },
    {
      dsde: "zcF4X8W7lQw",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "cwECLqr3fp3",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "7.1",
    },
    {
      display: "text",
      text: "Dengue without warning signs",
    },
    {
      display: "text",
      text: "ໄຂ້ຍຸງ​ລາຍ​ທີ​ບໍ່​ມີ​ອາການ​ເຕືອນ",
    },
    {
      dsde: "rPM2y3l2j6a",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "YHm7Mjg7nhC",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "7.2",
    },
    {
      display: "text",
      text: "Dengue with warning signs",
    },
    {
      display: "text",
      text: "ໄຂ້​ຍຸງ​ລາຍ​ທີ​ມີ​ອາການ​​ເຕືອນ",
    },
    {
      dsde: "sHb9bX2mf6D",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "My9HnzT0EBm",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "7.3",
    },
    {
      display: "text",
      text: "Severe Dengue",
    },
    {
      display: "text",
      text: "ໄຂ້ຍຸງ​ລາຍ​ຮ້າຍ​ແຮງ",
    },
    {
      dsde: "zaacU6HTHsS",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "xC9EQOEWgBS",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "8",
    },
    {
      display: "text",
      text: "Acute watery diarrhea",
    },
    {
      display: "text",
      text: "ຖອກທ້ອງ​ເປັນນ້ຳກະທັນຫັນ",
    },
    {
      dsde: "Et8h9nOnqXm",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "XUTmH2TCf8R",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "9",
    },
    {
      display: "text",
      text: "Acute muco-bloody diarrhea",
    },
    {
      display: "text",
      text: "ຖອກທ້ອງ​ເປັນ​ມີ​ມູກ​ປົນ​ເລືອດ",
    },
    {
      dsde: "F6jAvEa4E0H",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "P4Rq8o8N4PP",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "10",
    },
    {
      display: "text",
      text: "Food poisoning",
    },
    {
      display: "text",
      text: "ເບື່ອ​ອາຫານ",
    },
    {
      dsde: "UlZz24PrwP0",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "xTVlZQaV2cM",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "11",
    },
    {
      display: "text",
      text: "Typhoid fever",
    },
    {
      display: "text",
      text: "ພະຍາດໄຂ້ທໍລະພິດ",
    },
    {
      dsde: "B1G3s6GrAf5",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "HIQerIoymX2",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "12",
    },
    {
      display: "text",
      text: "Anthrax",
    },
    {
      display: "text",
      text: "ພະຍາດໄຂ້​ເລືອດ​ດຳ",
    },
    {
      dsde: "VQXt6duDyNZ",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "RVaX39EpOO5",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "13",
    },
    {
      display: "text",
      text: "Acute Jaundice Syndrome (AJS)",
    },
    {
      display: "text",
      text: "ໝວດ​ອາການ​ເຫຼືອງ​ກະທັນຫັນ",
    },
    {
      dsde: "DtoUeLkv8xh",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "w0BO5yKsrFr",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "14",
    },
    {
      display: "text",
      text: "Meningitis",
    },
    {
      display: "text",
      text: "ເຍື້ອຫຸ້ມ​ສະໝອງ​ອັກ​ເສບ",
    },
    {
      dsde: "gqYyBs6FV2E",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "YmDPAyjyoTy",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "15",
    },
    {
      display: "text",
      text: "Acute Encephalitis Syndrome (AES)",
    },
    {
      display: "text",
      text: "ໝວດ​ອາການ​ອັກ​ເສບ​ສະໝອງ​ກະທັນ​ຫັນ",
    },
    {
      dsde: "HahFhmxG1Xs",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "HjG26ZYQGUv",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "16",
    },
    {
      display: "text",
      text: "Plague",
    },
    {
      display: "text",
      text: "ພະຍາດກາລະ​ໂລກ",
    },
    {
      dsde: "YXGjKDeRBhV",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "ayStNDAKTPG",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "17",
    },
    {
      display: "text",
      text: "Severe Acute Respiratory Infection (SARI)",
    },
    {
      display: "text",
      text: "ໝວດ​ອາການ​ຊຶມ​ເຊື້ອ​ລະບົບ​ຫາຍ​ໃຈ​ຮຸນ​ແຮງ​ກະທັນຫັນ",
    },
    {
      dsde: "DXjKknlBGha",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "BhTcJeXAqKj",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
  [
    {
      display: "text",
      text: "18",
    },
    {
      display: "text",
      text: "Rabies",
    },
    {
      display: "text",
      text: "ພະຍາດວໍ້",
    },
    {
      dsde: "LL7CbHMbwC2",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      dsde: "DYc2VONDpm1",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
  ],
];

export default NcleWeekly;
