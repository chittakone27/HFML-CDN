import { Box, Table, TableBody } from "@mui/material";
import MapTable from "../common/MapTable";

import "../common/index.css";
import "./hiv-chas-sti.css";

const HivChasSti = () => {
  return (
    <Box className="custom-form" id="hiv-chas-sti-form-container" sx={{ mt: 2 }}>
      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigs} tableName="hiv-chas-sti" disableHideCell />
        </TableBody>
      </Table>
    </Box>
  );
};

const dataElementConfigs = [
  [
    {
      id: "IWPNzEBCY6M",
      labelCellProps: {
        className: "blueHead strong-text",

        sx: { width: "50%" },
      },
      fieldCellProps: {
        className: "lightBlueContent",

        sx: { width: "50%" },
      },
    },
  ],
  [
    {
      id: "PjpghExB9gB",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent checkbox" },
    },
  ],
  [
    {
      id: "dKYzhVu9woF",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "dTgxxtW8uqU",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "p27LgFPi5pK",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "rIoJjB0c6R2",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "YMlxeNI1BQL",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "anGdJwptx38",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "lightBlueContent" },
    },
  ],
  [
    {
      id: "Po5yeg0tXxz",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "blueHead checkbox" },
    },
  ],
  [
    {
      id: "lDhyWuUcb7c",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "blueHead checkbox" },
    },
  ],
  [
    {
      id: "owXUG8JPODz",
      labelCellProps: { className: "blueHead strong-text" },
      fieldCellProps: { className: "blueHead checkbox" },
    },
  ],
  [
    {
      display: "text",
      text: "ກຸ່ມອາການ / Approach",
      cellProps: {
        className: "redbrownHead strong-text",
      },
    },
    {
      display: "text",
      text: "ເຊື້ອສາຍເຫດ/ Diagonsis",
      cellProps: {
        className: "redbrownHead strong-text",
      },
    },
  ],

  [
    {
      display: "text",
      text: "ລົງຂາວ / Vigina Discharge",
      cellProps: {
        className: "orangeHead strong-text",
      },
    },
    {
      display: "empty",
      cellProps: { className: "orangeContent", sx: { width: "15%" } },
    },
    { display: "empty", cellProps: { className: "greenHead" } },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent", sx: { width: "15%" } },
    },
  ],
  [
    {
      id: "KWfSH0IYQB6",
      labelCellProps: { className: "orangeSub strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    {
      display: "empty",
      cellProps: { className: "greenHead" },
    },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent" },
    },
  ],
  [
    {
      id: "bm6knnAz3OZ",
      labelCellProps: { className: "orangeSub strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "z30619tCClh",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "GlZ8hs6FwAp",
      labelCellProps: { className: "orangeSub strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "MFIQIvV6Pdp",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "OxVAkztt1m3",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "rC7y0aRR6tX",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "ottD4clTjhD",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "NcRtF9DkbYp",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "iFK3e3R2GyJ",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "cuSrvrFJiwj",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "lbb838iJ4KV",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    {
      display: "empty",
      cellProps: { className: "greenHead" },
    },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent" },
    },
  ],
  [
    {
      id: "cd8Fm94AVxG",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "iIJWAJ2ygNQ",
    //   labelCellProps: { className: "greenHead strong-text" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "QfjP92P1VXv",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "v82s7YkEZMI",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "LTJJwEa9gJY",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    {
      display: "empty",
      cellProps: { className: "greenHead" },
    },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent" },
    },
  ],
  [
    {
      id: "MhRRsMvk1Be",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    // {
    //   id: "IdPoC0N17mi",
    //   labelCellProps: { className: "greenHead" },
    //   fieldCellProps: { className: "yorkGreenContent checkbox" },
    // },
  ],
  [
    {
      id: "DxY9ag8nMhl",
      labelCellProps: { className: "orangeHead strong-text" },
      fieldCellProps: { className: "orangeContent checkbox" },
    },
    {
      display: "empty",
      cellProps: { className: "greenHead" },
    },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent" },
    },
  ],
  [
    {
      id: "ruLq30FRalo",
      fieldCellProps: { className: "orangeContent strong-text checkbox" },
      labelCellProps: { className: "orangeHead strong-text" },
    },
    {
      display: "empty",
      cellProps: { className: "greenHead" },
    },
    {
      display: "empty",
      cellProps: { className: "yorkGreenContent" },
    },
  ],
];

export default HivChasSti;
