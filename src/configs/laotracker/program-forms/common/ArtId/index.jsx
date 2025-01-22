import { useEffect } from "react";
import { useState } from "react";
import { Box, TableCell, Typography, styled } from "@mui/material";
import { shallow } from "zustand/shallow";

import DataValueField from "@/ui/EventCapture/Form/DataValueField";
import useEventCaptureStore from "@/state/eventCapture";
import Input from "@/ui/common/Input/Input";
import "./art-id.css";

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

const initialArtId = {
  hospital: "",
  rNumber: "",
};

const ArtId = ({ disabled = false, resetBorder, ...other }) => {
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

  const { helpers, disabledFields } = status;
  const completed = currentEvent.status === "COMPLETED" ? true : false;

  const foundHelpers = helpers.filter(
    (helper) =>
      helper.targetType === "DATA_ELEMENT" && helper.target === "dNYSK3RNpfC"
  );

  if (disabledFields.includes("dNYSK3RNpfC")) disabled = true;
  if (completeness) disabled = true;
  if (completed) disabled = true;

  const [artId, setArtId] = useState(initialArtId);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const splitted = currentEvent.dataValues["dNYSK3RNpfC"]?.split("-") || [];
    if (splitted.length === 1) {
      if (splitted[0]?.length === 2) {
        setArtId({ ...artId, hospital: splitted[0] });
      }
      if (splitted[0]?.length === 4) {
        setArtId({ ...artId, rNumber: splitted[0] });
      }
    }

    if (splitted.length === 2) {
      setArtId({ hospital: splitted[0], rNumber: splitted[1] });
    }

    return () => {
      setIsInitial(true);
      setArtId(initialArtId);
    };
  }, []);

  useEffect(() => {
    const { hospital, rNumber } = artId;
    if (
      !isInitial &&
      ((hospital?.length === 2 && rNumber?.length === 4) ||
        (hospital?.length === 0 && rNumber?.length === 0))
    ) {
      setCurrentEventDataValue("dNYSK3RNpfC", hospital + "-" + rNumber);
    }

    setIsInitial(false);
  }, [JSON.stringify(artId), isInitial]);

  return (
    <TableCell {...other}>
      <Box
        id="art-id"
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className={resetBorder ? "reset-border" : ""}
      >
        <DataValueField dataElement="dNYSK3RNpfC" disabled={true} />
        <Box sx={{ display: "flex", gap: "10px", width: 1 }} id="input-wrapper">
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="TEXT"
              disabled={disabled}
              value={artId["hospital"]}
              helpers={foundHelpers}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 2) {
                  newValue = newValue.substring(0, 2);
                }

                setArtId((prev) => ({ ...prev, hospital: newValue }));
              }}
            />
            <StyledTypography>Hospital</StyledTypography>
          </StyledBox>
          <Box style={{ paddingTop: "9px" }}>
            <span>-</span>
          </Box>
          <StyledBox sx={{ flex: 1 }}>
            <Input
              valueType="TEXT"
              disabled={disabled}
              value={artId["rNumber"]}
              change={(value) => {
                let newValue = value + "";
                if (newValue.length > 4) {
                  newValue = newValue.substring(0, 4);
                }

                setArtId((prev) => ({ ...prev, rNumber: newValue }));
              }}
            />
            <StyledTypography>Running number</StyledTypography>
          </StyledBox>
        </Box>
      </Box>
    </TableCell>
  );
};

export default ArtId;
