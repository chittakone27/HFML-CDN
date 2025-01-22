import { useEffect, useMemo, useRef, useState } from "react";
import { Button, MenuList, MenuItem, Divider, Popover, Box } from "@mui/material";
import { Input } from "@/ui/common";
import useSelectionStore from "@/state/selection";
import withModuleSection from "@/hocs/withModuleSection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import Tabular from "./Tabular";
import "./EventForm.css";
import "./EventTabularForm.css";

const EventTabularForm = () => {
  const eventListRef = useRef();
  const { t } = useTranslation();
  const { program } = useSelectionStore(
    (state) => ({
      program: state.program
    }),
    shallow
  );
  const [selectedPs, setSelectedPs] = useState(null);
  const { data, actions } = useTrackerCaptureStore((state) => ({ data: state.data, actions: state.actions }), shallow);
  const { currentEvents, selectedProgramStage } = data;
  const { selectProgramStage, initNewEvent } = actions;
  const events = _.sortBy(currentEvents, "eventDate").reverse();
  const [anchorEl, setAnchorEl] = useState(null);

  const listProgramStage = useMemo(() => {
    return program.programStages
      .filter(
        (ps) => {
          if (ps.repeatable) {
            return ps;
          }
          if (!ps.repeatable && !currentEvents.find((ce) => ce.programStage === ps.id)) {
            return ps;
          }
        },
        [currentEvents.length]
      )
      .map((item) => ({ ...item, value: item.id, label: item.displayName }));
  });

  useEffect(() => {
    selectProgramStage(program.programStages[0].id);
  }, [program.id]);

  return (
    <div className="tracker-event-form-container">
      <div className="tracker-timeline-container">
        <div>
          <div>
            <Button
              variant="contained"
              onClick={(event) => {
                if (
                  program.programStages.length === 1 &&
                  (program.programStages[0].repeatable ||
                    (!program.programStages[0].repeatable && !currentEvents.find((ce) => ce.programStage === program.programStages[0].id)))
                ) {
                  initNewEvent(program.programStages[0].id);
                } else {
                  setAnchorEl(event.currentTarget);
                }
              }}
            >
              {t("newEvent")}
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
                setSelectedPs(null);
              }}
              anchorOrigin={{
                vertical: "top",
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
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div>{option.label}</div>
                      </li>
                    )}
                    valueSet={listProgramStage}
                    valueType="TEXT"
                    disabled={listProgramStage.length ? false : true}
                    disableClearable={true}
                    label={t("programStage")}
                    value={selectedPs}
                    change={(value) => {
                      setSelectedPs(value);
                    }}
                    helpers={
                      listProgramStage
                        ? []
                        : [
                            {
                              type: "WARNING",
                              value: t("nonRepeatableEventCreatedError")
                            }
                          ]
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Button
                    onClick={() => {
                      setAnchorEl(null);
                      setSelectedPs(null);
                    }}
                    color="error"
                    variant="contained"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    disabled={selectedPs ? false : true}
                    variant="contained"
                    onClick={() => {
                      initNewEvent(selectedPs);
                      setAnchorEl(null);
                      setSelectedPs(null);
                    }}
                  >
                    {t("ok")}
                  </Button>
                </Box>
              </Box>
            </Popover>
          </div>
          <div ref={eventListRef}>
            {program.programStages.map((ps) => {
              const foundEvent = events.find((ev) => ev.programStage === ps.id);
              if (foundEvent) {
                return [
                  <div
                    className={`event-tabular-program-stage-item ${selectedProgramStage === ps.id ? "etpsi-selected" : ""}`}
                    onClick={() => {
                      selectProgramStage(ps.id);
                    }}
                  >
                    {ps.displayName}
                  </div>,
                  <Divider />
                ];
              }
            })}
          </div>
        </div>
        <div>{selectedProgramStage && <Tabular />}</div>
      </div>
    </div>
  );
};

export default withModuleSection(EventTabularForm, "events");
