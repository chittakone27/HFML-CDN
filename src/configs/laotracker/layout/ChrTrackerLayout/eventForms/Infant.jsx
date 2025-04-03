import useMetadataStore from "@/state/metadata";
import { useShallow } from "zustand/react/shallow";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import Row from "../Row";
import { useTranslation } from "react-i18next";
import useChrTrackerStore from "../state";
import { findAttributeValue } from "@/configs/laotracker/common/utils";
const Infant = () => {
  const { t } = useTranslation();
  const { programs } = useMetadataStore(
    useShallow((state) => ({
      programs: state.programs
    }))
  );
  const { event } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event
    }))
  );
  const { currentChild } = event;
  const foundEirEnrollment = currentChild.enrollments.find((enr) => enr.program === "Yj9cJ34AXw6");
  const currentEvent = foundEirEnrollment.events.find((ev) => ev.programStage === "bwGkn5ebqkD");
  const foundEirProgram = programs.find((p) => p.id === "Yj9cJ34AXw6");
  const foundBirthDetailsStage = foundEirProgram.programStages.find((ps) => ps.id === "bwGkn5ebqkD");
  const pss = foundBirthDetailsStage.programStageSections[0];
  const dataElements = pss.dataElements.map((pssde) => pssde.id);
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: 32 }}>
        <Row
          label={<div style={{ fontWeight: "bold" }}>{t("healthIdChild")}</div>}
          field={<div style={{ color: "#0277bd", fontWeight: "bold" }}>{findAttributeValue(currentChild, "oPKsfqS64oE")}</div>}
          labelWidth={400}
        />
      </div>
      <div style={{ height: "calc(100% - 32px)", overflow: "auto" }}>
        {dataElements.map((de) => {
          return (
            <Row
              label={<DataValueLabelNoState dataElement={de} currentProgramStage={foundBirthDetailsStage} />}
              field={<DataValueFieldNoBlurNoState dataElement={de} currentProgramStage={foundBirthDetailsStage} currentEvent={currentEvent} />}
              labelWidth={400}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Infant;
