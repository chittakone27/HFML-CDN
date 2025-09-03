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
import { useState, Fragment } from "react";
import { push } from "@/utils/fetch";
import { format, add } from "date-fns";
import _ from "lodash";

const Stage = () => {
  const { program } = useSelectionStore(
    (state) => ({ program: state.program, orgUnit: state.orgUnit }),
    shallow
  );
  const { dataElements, orgUnits } = useMetadataStore(
    (state) => ({ dataElements: state.dataElements, orgUnits: state.orgUnits }),
    shallow
  );
  const { data, setLayout, resetState } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      setLayout: state.actions.setLayout,
      resetState: state.actions.resetState,
    }),
    shallow
  );

  const { currentTei, selectedEvent, currentEvents, currentEnrollment } = data;
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const currentProgramStage = program.programStages.find(
    (ps) => ps.id === currentEvent.programStage
  );

  const props = useRules();

  const desCheckList = [
    "SsTzQsXnzQB","XJZMts4mVR8","rnM3LkQjUy6","ifAuVeXOvRd","EqLjprtVN6N","wFdNB36WPdS",
    "lhRNlZMA7H9","IdXzP98RNfm","sGTeX9wL4Ku","gDMlGPApJr0","wyBEDZwwBZE","pXuk5jmHA1Y",
    "GOOC2QYNpK7","i5aMMSra45Y","Ak2Mv3ryvFD","KH7JIavea1w"
  ];

  // Two columns: Report vs Correct
  const deReportChildStatus  = ["ilW9kJRfEav", "d6ttFA1zrZB", "zPlTaBgQtAM"];
  const deCorrectChildStatus = ["Zz9O49cuy46", "xeq1S2MW3k6", "Dq08KjzUprN"];

  const foundDateOfBirthAttribute = currentTei.attributes.find(
    (attr) => attr.attribute === "tQeFLjYbqzv"
  );

  let latestEventDate = "";

  const transferredHospitalDe = dataElements.find((de) => de.id === "uoKJZliHVhB");
  const foundTransferredHospitalDataValue = currentEvent.dataValues.find(
    (dv) => dv.dataElement === "uoKJZliHVhB"
  );

  const [loading, setLoading] = useState(false);

  const transferEvent = async () => {
    setLoading(true);
    let foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === "uoKJZliHVhB"); // org uni - > hospital that transfred
    if (foundDataValue) {
      let tei = { ...currentTei };
      let enrollment = { ...currentEnrollment };
      enrollment.orgUnit = foundDataValue.value;
      tei.orgUnit = foundDataValue.value;
      let foundProgramOwner = tei.programOwners.find((po) => po.program === "Yj9cJ34AXw6");
      let programOwners = { ...foundProgramOwner };
      if (foundProgramOwner) {
        programOwners.ownerOrgUnit = foundDataValue.value;
        tei.programOwners = tei.programOwners.filter((e) => !e.program === "Yj9cJ34AXw6");
        tei.programOwners.push(programOwners);
      }

      await push("/api/trackedEntityInstances?strategy=CREATE_AND_UPDATE", {
        trackedEntityInstances: [tei],
      });
      await push("/api/enrollments?strategy=CREATE_AND_UPDATE", {
        enrollments: [enrollment],
      });
      await push(
        `/api/tracker/ownership/transfer?trackedEntityInstance=${tei.trackedEntityInstance}&program=Yj9cJ34AXw6&ou=${foundDataValue.value}`,
        {},
        "PUT"
      );

      setLoading(false);
      setLayout("layout", "layout1");
      resetState();
    } else {
      setLoading(false);
    }
  };

  if (currentEvent.isNew) {
    const sortedEvents = _.sortBy(currentEvents, "eventDate").reverse();
    if (sortedEvents[0].eventDate) {
      latestEventDate = format(add(new Date(sortedEvents[0].eventDate), { days: 1 }), "yyyy-MM-dd");
    }
  }

  const generateGridForCheckList = () => (
    <FieldRow type="custom" customLabel={t("medicalSymptoms")}>
      <Grid container rowSpacing={1} columns={desCheckList.length}>
        {desCheckList.map((de) => {
          const findDe = dataElements.find((e) => e.id === de);
          return (
            <Grid key={de} item xs={16} sm={16} md={8} lg={5} xl={4} style={{ padding: "0px" }}>
              <FieldRow
                type="checkBox"
                id={de}
                {...props[de]}
                customLabel={findDe ? findDe.displayFormName : ""}
              />
            </Grid>
          );
        })}
      </Grid>
    </FieldRow>
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const foundTransferredHospitalDataValueLabel = orgUnits.find(
    (ou) => ou.id === foundTransferredHospitalDataValue?.value
  );

  return (
    <div>
      {currentProgramStage.programStageSections.map((pss) => {
        if (props.hiddenSections.includes(pss.id)) return null;

        return (
          <Section title={pss.displayName} key={pss.id}>
            {pss.id === "cPliJItkIfT" ? (
              [
                <FieldRow
                  key="imamEventDate"
                  type="custom"
                  customLabel={<EventDateLabel type="eventDate" label={t("imamEventDate")} />}
                >
                  <div style={{ width: "40%" }}>
                    <EventDateField
                      type="eventDate"
                      maxDate={format(new Date(), "yyyy-MM-dd")}
                      minDate={
                        latestEventDate
                          ? latestEventDate
                          : foundDateOfBirthAttribute
                          ? foundDateOfBirthAttribute.value
                          : null
                      }
                    />
                  </div>
                </FieldRow>,
                currentEvent.eventDate && (
                  <FieldRow
                    key="NtnqZYgVfZ5" // type of visit
                    type="dataElement"
                    id={"NtnqZYgVfZ5"}
                    {...props["NtnqZYgVfZ5"]}
                  />
                ),
                !props.dueDate.hidden && currentEvent.eventDate && (
                  <FieldRow
                    key="imamDueDate"
                    type="custom"
                    customLabel={<EventDateLabel type="dueDate" label={t("imamDueDate")} />}
                  >
                    <div style={{ width: "40%" }}>
                      <EventDateField
                        type="dueDate"
                        minDate={foundDateOfBirthAttribute ? foundDateOfBirthAttribute.value : null}
                      />
                    </div>
                  </FieldRow>
                ),
              ]
            ) : pss.id === "ATezHnPZyln" ? (
              /* ---------- aligned two-column GRID (no vertical lines) ---------- */
              <div className="imam-childstatus-grid">
                {/* subheaders */}
                <div className="imam-grid-subheader">
                  {t("reportChildStatus", "Report child status")}
                </div>
                <div className="imam-grid-subheader">
                  {t("correctChildStatus", "Correct child status")}
                </div>

                {/* rows: left + right share the same grid row */}
                {deReportChildStatus.map((deLeft, idx) => {
                  const deRight = deCorrectChildStatus[idx];
                  return (
                    <Fragment key={deLeft}>
                      <div className="imam-grid-cell">
                        <FieldRow
                          type="dataElement"
                          id={deLeft}
                          {...props[deLeft]}
                          labelWidth="220px"
                          inputWidth="calc(100% - 220px)"
                        />
                      </div>
                      <div className="imam-grid-cell">
                        <FieldRow
                          type="dataElement"
                          id={deRight}
                          {...props[deRight]}
                          labelWidth="220px"
                          inputWidth="calc(100% - 220px)"
                        />
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              /* ---------------------------------------------------------------- */
            ) : (
              pss.dataElements.map((de) => {
                if (de.id === "SsTzQsXnzQB") return <span key={de.id}>{generateGridForCheckList()}</span>;

                if (de.id === "uoKJZliHVhB" && !props.uoKJZliHVhB.hidden) {
                  return (
                    <div key={de.id}>
                      <FieldRow type="custom" customLabel={transferredHospitalDe.displayFormName}>
                        <div>
                          <DataValueField
                            dataElement={de.id}
                            {...props[de.id]}
                            filter={program.organisationUnits.map((ou) => ou.path).join(";")}
                          />
                          <br />
                          <Typography variant="HELPER">{t("childWillBeMoved")}</Typography>
                        </div>
                      </FieldRow>
                    </div>
                  );
                }

                return (props[de.id] && props[de.id].hidden) || desCheckList.includes(de.id)
                  ? null
                  : <FieldRow key={de.id} type="dataElement" id={de.id} {...props[de.id]} />;
              })
            )}
          </Section>
        );
      })}
    </div>
  );
};

export default Stage;
