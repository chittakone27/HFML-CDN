import {
  Box,
  Table,
  TableBody,
  Dialog,
  DialogTitle,
  Button,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { withRules, withEventDate } from "../../common/tracker";
import { useEffect, useState } from "react";
import { Input } from "@/ui/common";
import { pickDueDateLabel } from "@/utils/utils";
import { useShallow } from "zustand/react/shallow";
import useImmunizationRule from "./useImmunizationRule";
import useEventDateRule from "./useEventDateRule";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import "../eir.css";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import useSelectionStore from "@/state/selection";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import moment from "moment";
import {
  add,
  addDays,
  addWeeks,
  addMonths,
  format,
  isSameDay,
  startOfDay,
} from "date-fns";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import { tracker } from "@/api";
const { saveEvent } = tracker;
const Immunization = () => {
  const [dueDateEditing, setDueDateEditing] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentDueDate, setCurrentDueDate] = useState("");
  const [dialog, setDialog] = useState(false);
  const { t } = useTranslation();
  const { orgUnit, program } = useSelectionStore(
    useShallow((state) => ({
      orgUnit: state.orgUnit,
      program: state.program,
    }))
  );
  const { actions, data, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data,
      layout: state.layout,
    }))
  );
  const { currentEvents, currentEnrollment } = data;
  const { currentProgramStage, currentEvent } = useCurrentEvent();
  const {
    setHandlers,
    scheduleNewEvent,
    selectEvent,
    changeEventProperty,
    changeDataValue,
  } = actions;
  const eventDate = currentEvent?.eventDate;

  const eventCompleteHandler = (tei, enr, event, events) => {
    // Vaccine element IDs
    const HPV = "iE68Gk2CdA7";
    const MR2 = "n6rveUjp5h1";
    const IPV2 = "yEMXv73bX9g";

    const HEPB0_LESS_THAN_24H = "O8drIFUt4j8";
    const HEPB0_LESS_THAN_7DAYS = "qyJMInEjWtJ";
    const BCG = "G9kw7qj1duL";

    const PCV_1 = "uQ6miuyuEle";
    const OPV_1 = "TFIM3NzVlzn";
    const PENTA_1 = "UFRm7xWmxSA";

    const PCV_2 = "x1aaFGkMUtF";
    const OPV_2 = "eb5xGUCIGw3";
    const PENTA_2 = "aiFYpVd6Vle";

    const PCV_3 = "TXdcfWEjnCG";
    const OPV_3 = "TvfJjKrHq7m";
    const PENTA_3 = "Ln2xC7zuEpr";
    const IPV1 = "wQNvIFAlWdA";

    const JE = "E4YaV9wahBu";
    const MR_1 = "EdCjK8sy4WH";

    const PLACE_OF_VACCINATION = "jzT9g1EzJLd";

    let foundMr2 = false;
    let foundIpv2 = false;
    let foundHPV = false;
    let foundScheduledEvent = false;
    let latestDate = "";

    events
      .filter((ev) => ev.programStage === "hCTTxOH8FOa")
      .forEach((ce) => {
        if (!latestDate || ce.eventDate > latestDate) {
          latestDate = ce.eventDate;
        }
        const foundMr2Ce = ce.dataValues.find(
          (dv) => dv.dataElement === MR2 && dv.value === "true"
        );
        const foundIpv2Ce = ce.dataValues.find(
          (dv) => dv.dataElement === IPV2 && dv.value === "true"
        );
        const foundHPVCe = ce.dataValues.find(
          (dv) => dv.dataElement === HPV && dv.value === "true"
        );
        if (foundMr2Ce) {
          foundMr2 = true;
        }
        if (foundIpv2Ce) {
          foundIpv2 = true;
        }
        if (foundHPVCe) {
          foundHPV = true;
        }
        if (ce.status === "SCHEDULE") {
          if (ce.event !== event.event) {
            foundScheduledEvent = true;
          }
        }
      });
    if ((foundMr2 && foundIpv2) || foundHPV || foundScheduledEvent) {
      setDialog(false);
      selectEvent("");
    } else {
      /*
      const scheduledDate = add(new Date(event.eventDate), { days: 30 });
      const latestDatePlus1Day = latestDate
        ? add(new Date(latestDate), { days: 1 })
        : undefined;
      setDueDate(format(scheduledDate, "yyyy-MM-dd"));
      setMinDate(
        latestDatePlus1Day
          ? format(latestDatePlus1Day, "yyyy-MM-dd")
          : undefined
      );
      setDialog(true); */

      /* Updated by Somkhit */

      const latestDatePlus1Day = latestDate
        ? add(new Date(latestDate), { days: 1 })
        : undefined;

      // Get Date of Birth from enrollment attributes
      const dobAttr = enr.attributes.find(
        (attr) => attr.attribute === "tQeFLjYbqzv"
      );
      const dob = dobAttr ? new Date(dobAttr.value) : null;

      let scheduledDate;

      if (dob) {
        // Get place of vaccination from event
        const placeOfVaccination = event.dataValues.find(
          (dv) => dv.dataElement === PLACE_OF_VACCINATION
        )?.value;
        // Check vaccines in current event
        const hasHepB0_24h = event.dataValues.find(
          (dv) => dv.dataElement === HEPB0_LESS_THAN_24H && dv.value === "true"
        );
        const hasHepB0_7d = event.dataValues.find(
          (dv) =>
            dv.dataElement === HEPB0_LESS_THAN_7DAYS && dv.value === "true"
        );
        const hasBCG = event.dataValues.find(
          (dv) => dv.dataElement === BCG && dv.value === "true"
        );
        const hasPCV1 = event.dataValues.find(
          (dv) => dv.dataElement === PCV_1 && dv.value === "true"
        );
        const hasOPV1 = event.dataValues.find(
          (dv) => dv.dataElement === OPV_1 && dv.value === "true"
        );
        const hasPenta1 = event.dataValues.find(
          (dv) => dv.dataElement === PENTA_1 && dv.value === "true"
        );
        const hasPCV2 = event.dataValues.find(
          (dv) => dv.dataElement === PCV_2 && dv.value === "true"
        );
        const hasOPV2 = event.dataValues.find(
          (dv) => dv.dataElement === OPV_2 && dv.value === "true"
        );
        const hasPenta2 = event.dataValues.find(
          (dv) => dv.dataElement === PENTA_2 && dv.value === "true"
        );
        const hasPCV3 = event.dataValues.find(
          (dv) => dv.dataElement === PCV_3 && dv.value === "true"
        );
        const hasOPV3 = event.dataValues.find(
          (dv) => dv.dataElement === OPV_3 && dv.value === "true"
        );
        const hasPenta3 = event.dataValues.find(
          (dv) => dv.dataElement === PENTA_3 && dv.value === "true"
        );
        const hasIPV1 = event.dataValues.find(
          (dv) => dv.dataElement === IPV1 && dv.value === "true"
        );
        const hasIPV2 = event.dataValues.find(
          (dv) => dv.dataElement === IPV2 && dv.value === "true"
        );
        const hasJE = event.dataValues.find(
          (dv) => dv.dataElement === JE && dv.value === "true"
        );
        const hasMR1 = event.dataValues.find(
          (dv) => dv.dataElement === MR_1 && dv.value === "true"
        );
        // Apply rules based on place of vaccination
        if (placeOfVaccination !== "private") {
          // 💉 Rule set for NON-private places
          if ((hasHepB0_24h && hasBCG) || (hasHepB0_7d && hasBCG)) {
            scheduledDate = addWeeks(dob, 6);
          } else if (hasHepB0_24h || hasHepB0_7d || hasBCG) {
            scheduledDate = addWeeks(dob, 6);
          } else if (hasPCV1 && hasOPV1 && hasPenta1) {
            scheduledDate = addWeeks(dob, 10);
          } else if (hasPCV2 && hasOPV2 && hasPenta2) {
            scheduledDate = addWeeks(dob, 14);
          } else if (
            (hasPCV3 && hasOPV3 && hasPenta3) ||
            (hasOPV3 && hasPenta3 && hasIPV1)
          ) {
            scheduledDate = addWeeks(dob, 15);
          } else if (hasPCV3 || hasIPV1) {
            scheduledDate = addMonths(dob, 9);
          } else if (hasJE && hasMR1) {
            scheduledDate = addMonths(dob, 12);
          }
        } else {
          // 💉 Rule set for PRIVATE places
          if ((hasHepB0_24h && hasBCG) || (hasHepB0_7d && hasBCG)) {
            scheduledDate = addWeeks(dob, 6);
          } else if (hasHepB0_24h || hasHepB0_7d || hasBCG) {
            scheduledDate = addWeeks(dob, 6);
          } else if (
            (hasPenta1 && hasIPV1) ||
            (hasPCV1 && hasOPV1 && hasPenta1)
          ) {
            scheduledDate = addWeeks(dob, 10);
          } else if (
            (hasPenta2 && hasIPV2) ||
            (hasPCV2 && hasOPV2 && hasPenta2)
          ) {
            scheduledDate = addWeeks(dob, 14);
          } else if (
            (hasPCV3 && hasOPV3 && hasPenta3) ||
            (hasIPV1 && hasOPV3 && hasPenta3)
          ) {
            scheduledDate = addMonths(dob, 9);
          } else if (hasJE && hasMR1) {
            scheduledDate = addMonths(dob, 12);
          }
        }
      }

      // Set states
      setDueDate(scheduledDate ? format(scheduledDate, "yyyy-MM-dd") : "");
      setMinDate(
        latestDatePlus1Day
          ? format(latestDatePlus1Day, "yyyy-MM-dd")
          : undefined
      );
      setDialog(true);

      /* Updated by Somkhit */
    }
  };

  useEffect(() => {
    setHandlers("eventComplete", eventCompleteHandler);
  }, []);

  useEffect(() => {
    setCurrentDueDate(currentEvent.dueDate);
  }, [currentEvent ? currentEvent.event : ""]);

  const props = useImmunizationRule();

  Object.keys(props.hiddenFields).forEach((h) => {
    if (props.hiddenFields[h]) props.assignations[h] = "";
  });

  Object.keys(props.assignations).forEach((a) => {
    const dataElement = a;
    const value = props.assignations[a];
    changeDataValue(currentEvent.event, dataElement, value);
  });

  const toggleDueDateEditing = () => {
    setDueDateEditing(!dueDateEditing);
  };

  useEffect(() => {
    if (currentEvent.status === "SCHEDULE") {
      if (currentEvent.orgUnit !== orgUnit.id) {
        changeEventProperty(currentEvent.event, "orgUnit", orgUnit.id);
      }
    }
  }, []);

  return (
    <Box className="eir-form">
      <Dialog
        open={dialog}
        onClose={(event, reason) => {
          if (reason !== "escapeKeyDown" && reason !== "backdropClick") {
            setDialog(false);
          }
        }}
      >
        <DialogTitle>{t("scheduleNewEventForStage")}</DialogTitle>
        <div style={{ padding: "0px 25px 25px 25px" }}>
          <Input
            minDate={minDate}
            maxDate={format(add(new Date(), { years: 2 }), "yyyy-MM-dd")}
            value={dueDate}
            label={pickDueDateLabel(currentProgramStage)}
            valueType="DATE"
            accept={(value) => {
              setDueDate(value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            disabled={!dueDate}
            onClick={() => {
              scheduleNewEvent(currentProgramStage.id, dueDate, orgUnit.id);
              setDialog(false);
              setDueDate("");
              selectEvent("");
            }}
          >
            {t("save")}
          </Button>
        </div>
      </Dialog>
      <EventDateLabel type="dueDate" />
      <EventDateFieldNoBlur type="dueDate" disabled={!dueDateEditing} />
      <div style={{ height: 3 }}></div>
      {!dueDateEditing && (
        <Button
          disabled={
            program.readOnly ||
            layout.disableEventEditButton ||
            currentEvent.status === "COMPLETED"
          }
          variant="contained"
          onClick={toggleDueDateEditing}
        >
          {t("rescheduleDate")}
        </Button>
      )}
      {dueDateEditing && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={async () => {
              await saveEvent(currentEvent);
              toggleDueDateEditing();
            }}
          >
            {t("save")}
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              changeEventProperty(
                currentEvent.event,
                "dueDate",
                currentDueDate
              );
              toggleDueDateEditing();
            }}
          >
            {t("cancel")}
          </Button>
        </>
      )}
      <div style={{ height: 3 }}></div>
      <EventDateLabel type="eventDate" />
      <EventDateFieldNoBlur
        disabled={program.readOnly || layout.disableEventEditButton}
        maxDate={format(new Date(), "yyyy-MM-dd")}
        type="eventDate"
        focus={() => {
          const maxDate = format(new Date(), "yyyy-MM-dd");
          const dueDate = format(new Date(currentEvent.dueDate), "yyyy-MM-dd");
          if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
            if (dueDate > maxDate) {
              changeEventProperty(currentEvent.event, "eventDate", maxDate);
            } else {
              changeEventProperty(currentEvent.event, "eventDate", dueDate);
            }
          }
        }}
      />
      <br />
      {currentEvent.eventDate &&
        dataElementConfigs.map((de) => {
          const disabled = props.disabledFields[de[0].id];
          const hidden = props.hiddenFields[de[0].id];
          const warning = props.warnings[de[0].id];
          const hiddenOptions = props.hiddenOptions[de[0].id];
          console.log(de, disabled, hidden);
          return (
            !hidden && (
              <div className="eir-immunization-row">
                <DataValueLabel dataElement={de[0].id} />
                <DataValueFieldNoBlur
                  hiddenOptions={hiddenOptions}
                  dataElement={de[0].id}
                  disabled={disabled}
                  helpers={
                    warning ? [{ type: "WARNING", value: warning }] : undefined
                  }
                />
              </div>
            )
          );
        })}
      {/* <SectionCollapse title={t("immunization")} disabledCollapse>
        <Table>
          <TableBody>
            <RowMapper rows={dataElementConfigs} tableName="immunization" context="event" />
          </TableBody>
        </Table>
      </SectionCollapse> */}
    </Box>
  );
};

const dataElementConfigs = [
  [{ id: "jzT9g1EzJLd" }],
  // [{ id: "PGGExbII0aD" }],
  [{ id: "u9lncRQaojO" }],
  [{ id: "DxOqZZgVQhF" }],
  [{ id: "MV1yoC7BfnG" }],
  [{ id: "G9kw7qj1duL" }],
  [{ id: "O8drIFUt4j8" }],
  [{ id: "qyJMInEjWtJ" }],
  // [{ id: "kI35yRT54NZ" }],
  [{ id: "TFIM3NzVlzn" }],
  [{ id: "UFRm7xWmxSA" }],
  [{ id: "uQ6miuyuEle" }],
  // [{ id: "u6ioEgMJf8j" }],
  [{ id: "eb5xGUCIGw3" }],
  [{ id: "aiFYpVd6Vle" }],
  [{ id: "x1aaFGkMUtF" }],
  [{ id: "wQNvIFAlWdA" }],
  [{ id: "TvfJjKrHq7m" }],
  [{ id: "TXdcfWEjnCG" }],
  [{ id: "Ln2xC7zuEpr" }],
  [{ id: "E4YaV9wahBu" }],
  [{ id: "EdCjK8sy4WH" }],
  [{ id: "n6rveUjp5h1" }],
  [{ id: "yEMXv73bX9g" }],
  [{ id: "iE68Gk2CdA7" }],
  // [{ id: "qrZ2UmofOdm" }],
];

export default Immunization;
