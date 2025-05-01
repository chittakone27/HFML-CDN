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
import useAncRules from "./useAncRules";

const AncVisitDetails = () => {
  const { t } = useTranslation();
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );

  const { currentEvent, currentProgramStage, editing } = event;
  const { changeDataValue, changeEventProperty } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const { disabledFields, hiddenFields, helpers, props } = useAncRules();
  let sequence = 1;

  const generateSections = () => {
    return currentProgramStage.programStageSections.map((pss) => {
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {pss.id === "IoWawA1nSJw" && (
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
                    label={<DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />}
                    field={
                      <DataValueFieldNoBlurNoState
                        helpers={helpers[de.id]}
                        disabled={!editing || completed || disabledFields.includes(de.id)}
                        dataElement={de.id}
                        currentProgramStage={currentProgramStage}
                        currentEvent={currentEvent}
                        change={(value) => {
                          changeDataValue(de.id, value);
                        }}
                        accept={(value) => {
                          changeDataValue(de.id, value);
                        }}
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
      {currentEvent.eventDate && generateSections()}
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
    </div>
  );
};

export default AncVisitDetails;
