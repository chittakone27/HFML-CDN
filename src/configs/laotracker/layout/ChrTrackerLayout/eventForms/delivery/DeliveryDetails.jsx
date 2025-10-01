import { useState, useEffect } from "react";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { useTranslation } from "react-i18next";
import Row from "@/configs/laotracker/layout/ChrTrackerLayout/Row";
import { findAttributeValue, findDataValue } from "@/configs/laotracker/common/utils";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { pickExecutionDateLabel } from "@/utils/utils";
import useDeliveryDetailsRules from "./useDeliveryDetailsRules";

const DeliveryDetails = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { data } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data
    }))
  );
  const { currentTei } = data;
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const currentProgramStage = program.programStages.find((ps) => ps.id === "YOHVx1Xmpgr");
  const dataElements = currentProgramStage.programStageSections[0].dataElements.map((pssDe) => pssDe.id);
  const { currentEnrollment, currentEvent, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEnrollment && currentEnrollment.status === "COMPLETED";
  const { props, hiddenFields, disabledFields, helpers } = useDeliveryDetailsRules();

  return (
    <div style={{ height: "100%" }}>
      <Row
        label={<div style={{ fontWeight: "bold" }}>1. {t("healthIdMother")}</div>}
        field={<div style={{ color: "#0277bd", fontWeight: "bold" }}>{findAttributeValue(currentTei, "oPKsfqS64oE")}</div>}
        labelWidth={400}
        height={65}
      />
      <div style={{ height: "calc(100% - 65px)", overflow: "auto" }}>
        <Row
          label={
            <div style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
              2.&nbsp;
              <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
            </div>
          }
          field={
            <EventDateFieldNoState
              disabled={!editing || completed || disabledFields.includes("eventDate")}
              currentEvent={currentEvent}
              currentProgramStage={currentProgramStage}
              accept={(value) => {
                changeEventProperty("eventDate", value);
                changeEventProperty("dueDate", value);
              }}
            />
          }
          labelWidth={400}
        />
        {dataElements.map((de, index) => {
          if (hiddenFields.includes(de)) {
            return null;
          }
          const foundIndex = order.findIndex((o) => o === de);
          return (
            <Row
              label={
                <div style={{ display: "flex" }}>
                  {foundIndex + 1}.&nbsp;
                  <DataValueLabelNoState dataElement={de} currentProgramStage={currentProgramStage} />
                </div>
              }
              field={
                <DataValueFieldNoBlurNoState
                  helpers={helpers[de] || []}
                  disabled={!editing || completed || disabledFields.includes(de)}
                  change={(value) => {
                    changeDataValue(de, value);
                  }}
                  accept={(value) => {
                    changeDataValue(de, value);
                  }}
                  dataElement={de}
                  currentProgramStage={currentProgramStage}
                  currentEvent={currentEvent}
                />
              }
              labelWidth={400}
            />
          );
        })}
      </div>
    </div>
  );
};
export default DeliveryDetails;
