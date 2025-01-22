import { Tabs, Tab, Button, MenuList, MenuItem, Divider, Popover, Box } from "@mui/material";
import useSelectionStore from "@/state/selection";
import withModuleSection from "@/hocs/withModuleSection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import _ from "lodash";
import Form from "./Form";
import configs from "@/configs";
import "./EventForm.css";
import { convertDisplayValue } from "@/utils/utils";
import { Input } from "@/ui/common";
const { VITE_CONFIG_NAME } = import.meta.env;

const EventForm = () => {
  const { customForms, customTimelineFields } = configs[VITE_CONFIG_NAME];
  const eventListRef = useRef();
  const { t } = useTranslation();
  const { orgUnits, dataElements, optionSets } = useMetadataStore(
    (state) => ({
      orgUnits: state.orgUnits,
      dataElements: state.dataElements,
      optionSets: state.optionSets
    }),
    shallow
  );
  const { program } = useSelectionStore(
    (state) => ({
      program: state.program
    }),
    shallow
  );

  const { data, actions } = useTrackerCaptureStore((state) => ({ data: state.data, actions: state.actions }), shallow);
  const { currentTei, currentEvents, selectedEvent } = data;
  const { selectEvent, initNewEvent } = actions;
  const events = _.sortBy(currentEvents, "eventDate")
    .reverse()
    .filter((ev) => ev.program === program.id);
  const currentEvent = events.find((ev) => ev.event === selectedEvent);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProgramStage, setSelectedProgramStage] = useState(null);
  useEffect(() => {
    if (events.length > 0) {
      selectEvent(events[0].event);
      eventListRef.current.scrollTop = eventListRef.current.scrollHeight;
    }
  }, [currentTei.trackedEntityInstance]);

  const generateCustomTimelineField = (event, field) => {
    switch (field.type) {
      case "eventProperty":
        return event[field.field];
      case "dataElement":
        const foundDataElement = dataElements.find((de) => de.id === field.field);
        const foundDataValue = event.dataValues.find((dv) => dv.dataElement === field.field);
        const foundOptionSet = foundDataElement.optionSet ? optionSets.find((os) => os.id === foundDataElement.optionSet.id) : null;
        if (foundOptionSet && foundDataValue) {
          const foundOption = foundOptionSet.options.find((o) => o.code === foundDataValue.value);
          if (foundOption) {
            return foundOption.displayName;
          }
        } else {
          return convertDisplayValue(foundDataElement, foundDataValue ? foundDataValue.value : "", t);
        }
    }
  };
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
                setSelectedProgramStage(null);
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
                    value={selectedProgramStage}
                    change={(value) => {
                      setSelectedProgramStage(value);
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
                      setSelectedProgramStage(null);
                    }}
                    color="error"
                    variant="contained"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    disabled={selectedProgramStage ? false : true}
                    variant="contained"
                    onClick={() => {
                      initNewEvent(selectedProgramStage);
                      setAnchorEl(null);
                      setSelectedProgramStage(null);
                    }}
                  >
                    {t("ok")}
                  </Button>
                </Box>
              </Box>
            </Popover>
          </div>
          <div ref={eventListRef}>
            <MenuList>
              {events.map((ev) => {
                const foundOu = orgUnits.find((ou) => ou.id === ev.orgUnit);
                const foundProgramStage = program.programStages.find((ps) => ps.id === ev.programStage);
                {
                  /* console.log(ev.programStage, foundProgramStage); */
                }
                const foundCustomTimelineFields = customTimelineFields.find((ctf) => ctf.programStage === foundProgramStage.id);
                return [
                  <MenuItem
                    selected={currentEvent ? ev.event === currentEvent.event : false}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14
                    }}
                    onClick={() => {
                      selectEvent(ev.event);
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div>
                        <strong>{ev.eventDate ? format(new Date(ev.eventDate), "yyyy-MM-dd") : ""}</strong>
                      </div>
                      <div>{foundOu.displayName}</div>
                      <div>{foundProgramStage.displayName}</div>
                      {foundCustomTimelineFields &&
                        foundCustomTimelineFields.fields.map((field) => {
                          return <div style={field.style}>{generateCustomTimelineField(ev, field)}</div>;
                        })}
                    </div>
                  </MenuItem>,
                  <Divider />
                ];
              })}
            </MenuList>
          </div>
        </div>
        <div>{currentEvent && <Form />}</div>
      </div>
    </div>
  );
};

export default withModuleSection(EventForm, "events");
