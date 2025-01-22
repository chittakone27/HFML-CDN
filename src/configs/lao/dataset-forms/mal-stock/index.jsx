import {
  Box,
  Checkbox,
  styled,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import { shallow } from "zustand/shallow";

import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import MapTable from "../common/MapTable";
import TotalTestedCases from "./sections/TotalTestedCases";
import MonthlySummaryStockReport from "./sections/MonthlySummaryStockReport";
import "../common/index.css";
import "./mal-stock.css";
import { useState } from "react";
import DirectInput from "./sections/DirectInput";

const Title = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: 10,
  fontWeight: "bold",
}));

const MalStock = () => {
  const dataValues = useDataEntryStore((state) => state.dataValues, shallow);
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const attributeOptionCombo = useSelectionStore(
    (state) => state.attributeOptionCombo,
    shallow
  );
  const [checked, setChecked] = useState(false);

  return (
    <Box
      id="mal-stock-form-container"
      className="custom-form remove-border-left"
    >
      <Title variant="h6" sx={{ textDecoration: "underline" }}>
        1. Confirm complete event
      </Title>
      <Table>
        <TableBody>
          <MapTable dataElementConfigs={dataElementConfigsSection1} />
        </TableBody>
      </Table>

      <Box
        hidden={
          dataValues[
            `UacaZBN2uDQ-lmbxvugTvKr-${orgUnit.id}-${attributeOptionCombo.id}`
          ]?.value !== "true"
        }
      >
        <TotalTestedCases />
        <MonthlySummaryStockReport />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBlock: "15px" }}>
        <Box
          sx={{
            flex: 3,
            display: "flex",
            height: "45px",
            backgroundColor: "#42A5F5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "17px", fontWeight: 600 }}>
            ຕ້ອງການປ້ອນຂໍ້ມູນມຸ້ງ
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 2,
            display: "flex",
            height: "45px",
            backgroundColor: "#BBDEFB",
            justifyContent: "center",
          }}
        >
          <Checkbox
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
            }}
          />
        </Box>
      </Box>

      <Box hidden={!checked}>
        <DirectInput />
      </Box>
    </Box>
  );
};

const labelStyle = {
  backgroundColor: "#42A5F5",
};

const deStyle = {
  backgroundColor: "#BBDEFB",
};

const checkbox = {
  className: "checkbox",
};

const dataElementConfigsSection1 = [
  [
    {
      display: "text",
      text: "eventcomplete",
      style: { ...labelStyle, width: "60%" },
    },
    {
      cc: "TiHjDIadDIL",
      coc: "lmbxvugTvKr",
      dsde: "UacaZBN2uDQ",
      cellProps: checkbox,
      style: deStyle,
    },
  ],
];

export default MalStock;
