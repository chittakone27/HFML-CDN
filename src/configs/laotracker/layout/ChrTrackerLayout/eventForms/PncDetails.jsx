import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { useTranslation } from "react-i18next";
import { pickExecutionDateLabel } from "@/utils/utils";
import useChrTrackerStore from "../state";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import BloodPressureField from "../BloodPressureField/BloodPressureField";
import Row from "../Row";
import { useShallow } from "zustand/react/shallow";
import usePncRules from "./usePncRules";
import { useEffect } from "react";

const PncDetails = () => {
  const { t } = useTranslation();
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const { disabledFields, hiddenFields, props } = usePncRules();
  useEffect(() => {
    let order = [];
    currentProgramStage.programStageSections.forEach((pss) => {
      pss.dataElements.forEach((de) => {
        order.push(de.id);
      });
    });
    setEvent("order", order);
  }, []);

  const generateSections = () => {
    return currentProgramStage.programStageSections.map((pss, pssIndex) => {
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {pssIndex === 0 && (
            <>
              <Row label={<AttributeLabel attribute="oPKsfqS64oE" />} field={<AttributeField attribute="oPKsfqS64oE" disabled={true} />} />
              <Row
                label={pickExecutionDateLabel(currentProgramStage, t)}
                field={
                  <EventDateFieldNoState
                    disabled={!editing || completed}
                    currentEvent={currentEvent}
                    currentProgramStage={currentProgramStage}
                    accept={(value) => {
                      changeEventProperty("eventDate", value);
                    }}
                  />
                }
              />
            </>
          )}
          {pss.dataElements.map((de) => {
            const index = order.findIndex((o) => o === de.id);
            if (hiddenFields.includes(de.id)) {
              return null;
            }
            switch (de.id) {
              case "tVPKjkXrMSB":
                return <Row label={t("bloodPressure")} field={<BloodPressureField disabled={!editing || completed} />} />;
              case "TThw3XArMBK":
              case "CLon1OEoS2k":
                return null;
              default:
                return (
                  <Row
                    label={
                      <div style={{ display: "flex" }}>
                        {index + 1}.&nbsp;
                        <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
                      </div>
                    }
                    field={
                      <DataValueFieldNoBlurNoState
                        change={(value) => {
                          changeDataValue(de.id, value);
                        }}
                        accept={(value) => {
                          changeDataValue(de.id, value);
                        }}
                        disabled={!editing || completed || disabledFields.includes(de.id)}
                        dataElement={de.id}
                        currentProgramStage={currentProgramStage}
                        currentEvent={currentEvent}
                        {...props[de.id]}
                      />
                    }
                  />
                );
            }
          })}
        </div>
      );
    });
  };

  return (
    <div className="ancpnc-anc-container">
      {!currentEvent.eventDate && (
        <Row
          label={pickExecutionDateLabel(currentProgramStage, t)}
          field={
            <EventDateFieldNoState
              disabled={!editing || completed}
              currentEvent={currentEvent}
              currentProgramStage={currentProgramStage}
              accept={(value) => {
                changeEventProperty("eventDate", value);
              }}
            />
          }
        />
      )}
      {currentEvent.eventDate && generateSections()}
    </div>
  );
};

export default PncDetails;
