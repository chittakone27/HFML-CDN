import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MapTable from "../common/MapTable";
import { useTranslation } from "react-i18next";
import "./num-of-beds.css";

const NumOfBeds = () => {
  const { t } = useTranslation();

  const headerTableStyle = {
    style: {
      backgroundColor: "#6D6D2F",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      border: "1px solid #fff",
    },
  };
  const labelTableStyle = {
    style: {
      backgroundColor: "#A2BF62",
      color: "#000",
      textAlign: "center",
    },
  };

  const valueTableStyle = {
    style: {
      backgroundColor: "#DCE7C4",
      textAlign: "center",
    },
  };
  const emptyStyle = {
    style: {
      backgroundColor: "#AAB6A2",
      border: "1px solid #E0E0E0",
    },
  };
  const tableConfigs = [
    [
      { display: "text", text: "ລາຍການ", cellProps: headerTableStyle },
      { display: "text", text: "ຈໍານວນ", cellProps: headerTableStyle },
    ],
    [
      { display: "text", text: "ຈຳນວນຕຽງ	", cellProps: labelTableStyle },
      {
        cc: "TiHjDIadDIL",
        coc: "lmbxvugTvKr",
        dsde: "dz1kQUdMaUA",
        cellProps: valueTableStyle,
      },
    ],
  ];

  return (
    <Box id="num-of-beds-form-container" className="custom-form">
      <Table id="num-of-beds-table">
        <TableBody>
          <MapTable dataElementConfigs={tableConfigs} />
        </TableBody>
      </Table>
    </Box>
  );
};

export default NumOfBeds;
