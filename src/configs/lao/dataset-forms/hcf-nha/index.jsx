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
import "./hcf-nha.css";

const HcfNationalHealthAccounts = () => {
  const { t } = useTranslation();

  return (
    <Box id="hcf-nha-table-container" className="custom-form">
      <Table id="hcf-nha-table">
        <MapTable dataElementConfigs={dataElementConfigs} />
      </Table>
    </Box>
  );
};
const emptyStyle = {
  sx: {
    backgroundColor: "#8080808f",
  },
};

const headerStyle = {
  style: {
    backgroundColor: "#283237",
    color: "#fff",
    textAlign: "center",
  },
};
const labelStyle = {
  style: {
    backgroundColor: "#B3BEC4",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
};

const valueStyle = {
  style: {
    backgroundColor: "#EDEFF1",
    width: "250px",
    padding: "5px 30px !important",
    textAlign: "center",
  },
};
const dataElementConfigs = [
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Main figures",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "LAK",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "%",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "of",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Total Health Expenditure (THE)",
    },
    {
      dsde: "x7pG46bJhQx",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "empty",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "GDP",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Public Health Expenditure (GGHE)",
    },
    {
      dsde: "h8oURvWir5M",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "GGE",
    },
  ],
  [
    {
      cellProps: {
        height: "20",
      },
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "GDP",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Domestic Government Health Expenditure",
    },
    {
      dsde: "M9zKhUWMMnA",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "Domestic GGE",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Domestic Government recurrent expenditure on Health",
    },
    {
      dsde: "HiqlzQZeSEC",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "Domestic recurrent GGE",
    },
  ],
  [
    {
      cellProps: {
        height: "20",
      },
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "Domestic GGE",
    },
  ],
  [
    {
      cellProps: {
        height: "20",
      },
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "GGE",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Domestic Government non-wage recurrent expenditure on Health",
    },
    {
      dsde: "A1TARtSV6GU",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      cellProps: {
        align: "left",
      },
      display: "text",
      text: "Domestic non-wage recurrent",
    },
  ],
  [
    {
      cellProps: {
        height: "20",
      },
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Domestic on health (central)",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Domestic on health (local)",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "GDP",
    },
    {
      dsde: "y6b0mCbSQhX",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "GGE",
    },
    {
      dsde: "KN4ZIqsM4zx",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "OOP health",
    },
    {
      dsde: "o4CJlFAffXi",
      coc: "lmbxvugTvKr",
      cc: "TiHjDIadDIL",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "Technical revenues",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "External funding outside public",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
  [
    {
      cellProps: {
        align: "left",
        height: "20",
      },
      display: "text",
      text: "External funding for health",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
    {
      display: "text",
      text: "",
    },
  ],
];
export default HcfNationalHealthAccounts;
