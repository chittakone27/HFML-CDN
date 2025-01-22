import { Box, Button, Grid, Typography, Popover } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DataValueField from "@/ui/TrackerCapture/EventForm/DataValueField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import FieldRow from "./FieldRow";
import useRules from "./rules/useRules";
import Section from "./Section";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import EventDateField from "@/ui/TrackerCapture/EventForm/EventDateField";
import { t } from "i18next";
import { useState } from "react";
import { push } from "@/utils/fetch";
import { format, add } from "date-fns";
import _ from "lodash";

const Stage = () => {
  const { program } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { dataElements, orgUnits } = useMetadataStore((state) => ({ dataElements: state.dataElements, orgUnits: state.orgUnits }), shallow);
  const { data, setLayout, resetState } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      setLayout: state.actions.setLayout,
      resetState: state.actions.resetState
    }),
    shallow
  );
  const { currentTei, selectedEvent, currentEvents, currentEnrollment } = data;
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const currentProgramStage = program.programStages.find((ps) => ps.id === currentEvent.programStage);
  const props = useRules();
  const desCheckList = [
    "SsTzQsXnzQB",
    "XJZMts4mVR8",
    "rnM3LkQjUy6",
    "ifAuVeXOvRd",
    "EqLjprtVN6N",
    "wFdNB36WPdS",
    "lhRNlZMA7H9",
    "IdXzP98RNfm",
    "sGTeX9wL4Ku",
    "gDMlGPApJr0",
    "wyBEDZwwBZE",
    "pXuk5jmHA1Y",
    "GOOC2QYNpK7",
    "i5aMMSra45Y",
    "Ak2Mv3ryvFD",
    "KH7JIavea1w"
  ];

  const deReportChildStatus = ["rWQgHzlRxnr", "nbjCuxRtsYm", "cMhs6WKOp5f"];
  const deCorrectChildStatus = ["eXgCO34QypV", "J2sDxcMfht1", "QppFJG84N4H"];
  const foundDateOfBirthAttribute = currentTei.attributes.find((attr) => attr.attribute === "tQeFLjYbqzv");
  let latestEventDate = "";
  const transferredHospitalDe = dataElements.find((de) => de.id === "uoKJZliHVhB");
  const foundTransferredHospitalDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === "uoKJZliHVhB");
  const [loading, setLoading] = useState(false);

  const transferEvent = async () => {
    setLoading(true);
    let foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === "uoKJZliHVhB");
    if (foundDataValue) {
      let tei = { ...currentTei };
      let enrollment = { ...currentEnrollment };
      enrollment.orgUnit = foundDataValue.value;
      tei.orgUnit = foundDataValue.value;
      let foundProgramOwner = tei.programOwners.find((po) => po.program === "hr56o6I5n6p");
      let programOwners = { ...foundProgramOwner };
      if (foundProgramOwner) {
        programOwners.ownerOrgUnit = foundDataValue.value;
        tei.programOwners = tei.programOwners.filter((e) => !e.program === "hr56o6I5n6p");
        tei.programOwners.push(programOwners);
      }
      const updateTei = await push("/api/trackedEntityInstances?strategy=CREATE_AND_UPDATE", {
        trackedEntityInstances: [tei]
      });
      const updateEnrollment = await push("/api/enrollments?strategy=CREATE_AND_UPDATE", {
        enrollments: [enrollment]
      });
      const updateOwnership = await push(
        `/api/tracker/ownership/transfer?trackedEntityInstance=${tei.trackedEntityInstance}&program=hr56o6I5n6p&ou=${foundDataValue.value}`,
        {},
        "PUT"
      );
      setLoading(false);
      setLayout("layout", "layout1");
      resetState();
    }
  };

  if (currentEvent.isNew) {
    const sortedEvents = _.sortBy(currentEvents, "eventDate").reverse();
    if (sortedEvents[0].eventDate) {
      latestEventDate = format(add(new Date(sortedEvents[0].eventDate), { days: 1 }), "yyyy-MM-dd");
    }
  }

  const generateGridForCheckList = () => {
    return (
      <FieldRow type="custom" customLabel={t("medicalSymptoms")}>
        <Grid container rowSpacing={1} columns={desCheckList.length}>
          {desCheckList.map((de) => {
            const findDe = dataElements.find((e) => e.id === de);
            return (
              <Grid item xs={16} sm={16} md={8} lg={5} xl={4} style={{ padding: "0px" }}>
                <FieldRow type="checkBox" id={de} {...props[de]} customLabel={findDe ? findDe.displayFormName : ""} />
              </Grid>
            );
          })}
        </Grid>
      </FieldRow>
    );
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const foundTransferredHospitalDataValueLabel = orgUnits.find((ou) => ou.id === foundTransferredHospitalDataValue?.value);
  return (
    <div>
      {currentProgramStage.programStageSections.map((pss) => {
        if (props.hiddenSections.includes(pss.id)) return null;
        return (
          <Section title={pss.displayName}>
            {pss.id === "bmdtaVLIU4e" ? (
              [
                <FieldRow type="custom" customLabel={<EventDateLabel type="eventDate" label={t("imamEventDate")} />}>
                  <div style={{ width: "40%" }}>
                    <EventDateField
                      type="eventDate"
                      maxDate={format(new Date(), "yyyy-MM-dd")}
                      minDate={latestEventDate ? latestEventDate : foundDateOfBirthAttribute ? foundDateOfBirthAttribute.value : null}
                    />
                  </div>
                </FieldRow>,
                currentEvent.eventDate && <FieldRow type="dataElement" id={"NtnqZYgVfZ5"} {...props["NtnqZYgVfZ5"]} />,
                // currentEvent.eventDate && <FieldRow type="dataElement" id={"Qglc02ULdIj"} {...props["Qglc02ULdIj"]} />,
                !props.dueDate.hidden && currentEvent.eventDate && (
                  <FieldRow type="custom" customLabel={<EventDateLabel type="dueDate" label={t("imamDueDate")} />}>
                    <div style={{ width: "40%" }}>
                      <EventDateField type="dueDate" minDate={foundDateOfBirthAttribute ? foundDateOfBirthAttribute.value : null} />
                    </div>
                  </FieldRow>
                )
              ]
            ) : pss.id === "XYLBTuFJMw4" ? (
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    fontSize: 14,
                    width: 415,
                    padding: "10px 5px 0px 0px",
                    input: { fontSize: 15 }
                  }}
                >
                  <Section title={t("reportChildStatus")}>
                    {deReportChildStatus.map((de) => {
                      return <FieldRow type="dataElement" id={de} {...props[de]} labelWidth="120px" inputWidth="calc(100% - 120px)" />;
                    })}
                  </Section>
                </Box>
                <Box
                  sx={{
                    fontSize: 14,
                    width: 415,
                    padding: "10px 5px 0px 0px",
                    input: { fontSize: 15 }
                  }}
                >
                  <Section title={t("correctChildStatus")}>
                    {deCorrectChildStatus.map((de) => {
                      return <FieldRow type="dataElement" id={de} {...props[de]} labelWidth="120px" inputWidth="calc(100% - 120px)" />;
                    })}
                  </Section>
                </Box>
              </Box>
            ) : (
              pss.dataElements.map((de) => {
                if (de.id === "SsTzQsXnzQB") {
                  return generateGridForCheckList();
                }
                if (de.id === "uoKJZliHVhB" && !props.uoKJZliHVhB.hidden) {
                  return (
                    <div>
                      <FieldRow type="custom" customLabel={transferredHospitalDe.displayFormName}>
                        <div>
                          <DataValueField dataElement={de.id} {...props[de.id]} filter={program.organisationUnits.map((ou) => ou.path).join(";")} />
                          <br />
                          {/* <Button
                            variant="contained"
                            disabled={
                              !foundTransferredHospitalDataValue ||
                              !foundTransferredHospitalDataValue.value
                            }
                            onClick={(event) => {
                              setAnchorEl(event.currentTarget);
                            }}
                          >
                            {t("transfer")}
                          </Button>
                          <Popover
                            onClose={(event, reason) => {
                              if (reason !== "backdropClick") setAnchorEl(null);
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <div style={{ padding: 10 }}>
                              <div>
                                {t("moveChildConfirmation", {
                                  ou: foundTransferredHospitalDataValueLabel
                                    ? foundTransferredHospitalDataValueLabel.displayName
                                    : "",
                                })}
                              </div>
                              <br />
                              <div>
                                <LoadingButton
                                  color="green"
                                  variant="contained"
                                  loading={loading}
                                  loadingPosition="start"
                                  onClick={() => {
                                    transferEvent();
                                  }}
                                >
                                  {loading ? (
                                    <span style={{ paddingLeft: "20px" }}>
                                      {t("confirm")}
                                    </span>
                                  ) : (
                                    t("confirm")
                                  )}
                                </LoadingButton>
                                &nbsp;
                                <LoadingButton
                                  color="error"
                                  variant="contained"
                                  loading={loading}
                                  loadingPosition="start"
                                  onClick={() => {
                                    setAnchorEl(null);
                                  }}
                                >
                                  {loading ? (
                                    <span style={{ paddingLeft: "20px" }}>
                                      {t("cancel")}
                                    </span>
                                  ) : (
                                    t("cancel")
                                  )}
                                </LoadingButton>
                              </div>
                            </div>
                          </Popover> */}
                          {/* <br /> */}
                          <Typography variant="HELPER">{t("childWillBeMoved")}</Typography>
                        </div>
                      </FieldRow>
                    </div>
                  );
                }
                return (props[de.id] && props[de.id].hidden) || desCheckList.includes(de.id) ? null : (
                  <FieldRow type="dataElement" id={de.id} {...props[de.id]} />
                );
              })
            )}
          </Section>
        );
      })}
    </div>
  );
};

export default Stage;
