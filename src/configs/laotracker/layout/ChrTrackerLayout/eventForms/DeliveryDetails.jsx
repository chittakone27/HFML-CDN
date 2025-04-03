import { useState } from "react";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useChrTrackerStore from "../state";
import { useTranslation } from "react-i18next";
import Row from "../Row";
import { findAttributeValue, findDataValue } from "@/configs/laotracker/common/utils";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { pickExecutionDateLabel } from "@/utils/utils";
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
  const { currentEnrollment, editing } = event;
  const currentEvent = currentEnrollment.events[0];
  const { setEvent } = actions;
  const completed = currentEnrollment && currentEnrollment.status === "COMPLETED";

  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: 32 }}>
        <Row
          label={<div style={{ fontWeight: "bold" }}>{t("healthIdMother")}</div>}
          field={<div style={{ color: "#0277bd", fontWeight: "bold" }}>{findAttributeValue(currentTei, "oPKsfqS64oE")}</div>}
          labelWidth={400}
        />
      </div>
      <div style={{ height: "calc(100% - 32px)", overflow: "auto" }}>
        <Row
          label={pickExecutionDateLabel(currentProgramStage, t)}
          field={<EventDateFieldNoState disabled={!editing || completed} currentEvent={currentEvent} currentProgramStage={currentProgramStage} />}
          labelWidth={400}
        />
        {dataElements.map((de) => {
          return (
            <Row
              label={<DataValueLabelNoState dataElement={de} currentProgramStage={currentProgramStage} />}
              field={
                <DataValueFieldNoBlurNoState
                  disabled={!editing || completed}
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
