import { Box, Table } from "@mui/material";
import DataValueField from "@/ui/DataEntry/Form/DataValueField";
import MapTable from "../common/MapTable";

const HmisPopulation = () => {
  const headerStyle = {
    style: {
      background: "#6699CC",
      color: "#fff",
      fontWeight: "bold",
      border: "1px solid #C0C0C0",
    },
  };
  const title1Style = {
    style: {
      background: "#97C9FC",
      fontWeight: "bold",
      border: "1px solid #C0C0C0",
    },
  };
  const title2Style = {
    style: {
      background: "#FECB00",
      fontWeight: "bold",
      border: "1px solid #C0C0C0",
    },
  };
  const title3Style = {
    style: {
      background: "#99CC99",
      fontWeight: "bold",
      border: "1px solid #C0C0C0",
    },
  };
  const labelStyle = {
    style: {
      background: "#CAE5FF",
      color: "#000",
      fontWeight: "bold",
      border: "1px solid #C0C0C0",
    },
  };
  const value1Style = {
    style: {
      background: "#FFEA99",
      border: "1px solid #C0C0C0",
    },
  };
  const value2Style = {
    style: {
      background: "#E0EFE0",
      border: "1px solid #C0C0C0",
    },
  };
  const disable2Style = {
    style: {
      background: "#AAB6A2",
      border: "1px solid #C0C0C0",
    },
  };

  const dataElementConfigs = [
    [
      {
        display: "text",
        text: "totalPregnantWomen",
        cellProps: { ...headerStyle, colSpan: 3 },
      },
    ],
    [
      {
        display: "text",
        text: "targetGroup",
        cellProps: title1Style,
      },
      {
        display: "text",
        text: "estimated",
        cellProps: title2Style,
      },
      {
        display: "text",
        text: "actual",
        cellProps: title3Style,
      },
    ],
    [
      {
        display: "text",
        text: "totalPregnantWomen",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "gf8hIKiGSwQ",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "XolmTdQ2aUy",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "totalLiveBirths",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "GPKiwTh3Yt0",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "MYiSssQk57e",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "childrenUnder1Survive",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "ZxtJnJFDhsa",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "KKEfK58xvQF",
        cellProps: value2Style,
      },
    ],
    [
      {
        display: "text",
        text: "totalChildrenUnder5",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pSvE3t56sLh",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "RwufzVtUAKP",
        cellProps: disable2Style,
      },
    ],
    [
      {
        display: "text",
        text: "women1545TTtarget",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "pg5LD4qP6Vs",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: disable2Style,
      },
    ],
    [
      {
        display: "text",
        text: "women1549FPtarget",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Cv44TaVDRaG",
        cellProps: value1Style,
      },
      {
        display: "text",
        text: "",
        cellProps: disable2Style,
      },
    ],
    [
      {
        display: "text",
        text: "totalPopulation",
        cellProps: labelStyle,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "l4bbRykkO8a",
        cellProps: value1Style,
      },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "Ii7rxyBTpFs",
        cellProps: value2Style,
      },
    ],
  ];

  return (
    <Box>
      <Table
        id="hmis-population-table"
        style={{
          marginTop: "20px",
          backgroundColor: "#C0C0C0",
        }}
      >
        <MapTable dataElementConfigs={dataElementConfigs} />
      </Table>
    </Box>
  );
};
export default HmisPopulation;
