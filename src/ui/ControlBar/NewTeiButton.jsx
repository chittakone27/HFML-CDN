import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import withPadding from "@/hocs/withPadding";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { format } from "date-fns";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
const NewTeiButton = () => {
  const { program } = useSelectionStore(
    (state) => ({
      program: state.program
    }),
    shallow
  );
  const { layout, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions
    }))
  );
  const { register } = actions;
  const { t } = useTranslation();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  let disabled = false;
  if (layout.disableRegisterButton) {
    disabled = true;
  }
  return (
    <>
      <Button
        disabled={disabled}
        variant="contained"
        onClick={() => {
          register(currentDate, currentDate);
        }}
      >
        {t("register")}
      </Button>
      {/* <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setEnrollmentDate(null);
          setIncidentDate(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "10px",
            width: "auto",
            minWidth: "300px"
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}
          >
            <Input
              maxDate={format(new Date(), "yyyy-MM-dd")}
              value={enrollmentDate}
              valueType="DATE"
              label={pickEnrollmentDateLabel(program, t)}
              change={(value) => {
                setEnrollmentDate(value);
              }}
              accept={(value) => {
                setEnrollmentDate(value);
              }}
            />
            {program.displayIncidentDate && (
              <Input
                maxDate={format(new Date(), "yyyy-MM-dd")}
                value={incidentDate}
                valueType="DATE"
                label={t("incidentDate")}
                change={(value) => {
                  setIncidentDate(value);
                }}
                accept={(value) => {
                  setIncidentDate(value);
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              onClick={() => {
                setAnchorEl(null);
                setEnrollmentDate(null);
                setIncidentDate(null);
              }}
              color="error"
              variant="contained"
            >
              {t("cancel")}
            </Button>
            <Button
              disabled={program.displayIncidentDate ? (enrollmentDate && incidentDate ? false : true) : enrollmentDate ? false : true}
              variant="contained"
              onClick={() => {
                register(enrollmentDate, incidentDate || enrollmentDate);
                setAnchorEl(null);
                setEnrollmentDate(null);
                setIncidentDate(null);
              }}
            >
              {t("ok")}
            </Button>
          </Box>
        </Box>
      </Popover> */}
    </>
  );
};

export default withPadding(NewTeiButton);
