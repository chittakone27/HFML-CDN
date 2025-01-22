import { useState } from "react";
import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import Input from "@/ui/common/Input/Input";
import { Box, styled, TableCell, Typography } from "@mui/material";

import "./vct-id.css";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";

const StyledTypography = styled(Typography)(() => ({
  fontSize: "13px",
  color: "#4c76ba",
  fontWeight: "bold",
  padding: "0 10px",
  textAlign: "center",
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const VtcId = ({ disabled = false, resetBorder, ...other }) => {
  const { status, currentEvent, completeness, setCurrentEventDataValue } =
    useEventCaptureStore(
      (state) => ({
        status: state.status,
        currentEvent: state.currentEvent,
        completeness: state.completeness,
        setCurrentEventDataValue: state.actions.setCurrentEventDataValue,
      }),
      shallow
    );

  const splitted = currentEvent.dataValues["L623JdOXhWT"]?.split("-") || [];

  const initialVctId = {
    p: "",
    d: "",
    h: "",
    mWard: "",
    rNumber: "",
    y: "",
  };

  if (splitted.length === 6) {
    initialVctId.p = splitted[0];
    initialVctId.d = splitted[1];
    initialVctId.h = splitted[2];
    initialVctId.mWard = splitted[3];
    initialVctId.rNumber = splitted[4];
    initialVctId.y = splitted[5];
  }

  const [vctId, setVctId] = useState(
    splitted?.length === 6 ? initialVctId : ""
  );

  const { disabledFields } = status;
  const completed = currentEvent.status === "COMPLETED" ? true : false;

  if (disabledFields.includes("L623JdOXhWT")) disabled = true;
  if (completeness) disabled = true;
  if (completed) disabled = true;

  useEffect(() => {
    const { p, d, h, mWard, rNumber, y } = vctId;
    if (
      (p?.length === 2 &&
        d?.length === 2 &&
        h?.length === 3 &&
        mWard?.length === 2 &&
        rNumber?.length === 4 &&
        y?.length === 2) ||
      (p?.length === 0 &&
        d?.length === 0 &&
        h?.length === 0 &&
        mWard?.length === 0 &&
        rNumber?.length === 0 &&
        y?.length === 0)
    ) {
      setCurrentEventDataValue(
        "L623JdOXhWT",
        Object.keys(vctId)
          .map((key, idx) => (idx !== 5 ? vctId[key] + "-" : vctId[key]))
          .join("")
      );
    }
  }, [JSON.stringify(vctId)]);

  return (
    <TableCell {...other}>
      <Box
        id="vct-id"
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={resetBorder ? "reset-border" : ""}
      >
        <DataValueField dataElement="L623JdOXhWT" disabled={true} />
        <Box sx={{ display: "flex", gap: "10px" }} id="input-wrapper">
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="NUMBER"
              disabled={disabled}
              value={vctId["p"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 2) {
                  newValue = newValue.substring(0, 2);
                }

                if (newValue > 18) {
                  newValue = "18";
                }

                setVctId((prev) => ({ ...prev, p: newValue }));
              }}
            />
            <StyledTypography>Province</StyledTypography>
          </StyledBox>
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="NUMBER"
              disabled={disabled}
              value={vctId["d"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 2) {
                  newValue = newValue.substring(0, 2);
                }

                setVctId((prev) => ({ ...prev, d: newValue }));
              }}
            />
            <StyledTypography>District</StyledTypography>
          </StyledBox>
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="TEXT"
              disabled={disabled}
              value={vctId["h"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 3) {
                  newValue = newValue.substring(0, 3);
                }

                setVctId((prev) => ({ ...prev, h: newValue }));
              }}
            />
            <StyledTypography>Hospital</StyledTypography>
          </StyledBox>
          <StyledBox sx={{ flex: 2 }}>
            <Input
              valueType="TEXT"
              disabled={disabled}
              value={vctId["mWard"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 2) {
                  newValue = newValue.substring(0, 2);
                }

                setVctId((prev) => ({ ...prev, mWard: newValue }));
              }}
            />
            <StyledTypography>Medicine ward</StyledTypography>
          </StyledBox>
          <StyledBox sx={{ flex: 2 }}>
            <Input
              valueType="NUMBER"
              disabled={disabled}
              value={vctId["rNumber"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 4) {
                  newValue = newValue.substring(0, 4);
                }

                setVctId((prev) => ({ ...prev, rNumber: newValue }));
              }}
            />
            <StyledTypography>Running number</StyledTypography>
          </StyledBox>
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="NUMBER"
              disabled={disabled}
              value={vctId["y"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 2) {
                  newValue = newValue.substring(0, 2);
                }

                setVctId((prev) => ({ ...prev, y: newValue }));
              }}
            />
            <StyledTypography>Year</StyledTypography>
          </StyledBox>
        </Box>
      </Box>
    </TableCell>
  );
};

export default VtcId;
