import { useEffect } from "react";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import { useTranslation } from "react-i18next";
import { pickExecutionDateLabel, pickTranslation } from "@/utils/utils";
import useChrTrackerStore from "../state";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";
import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import EventDateFieldNoState from "@/ui/TrackerCapture/EventForm/EventDateFieldNoState";
import EventDateLabelNoState from "@/ui/TrackerCapture/EventForm/EventDateLabelNoState";
import BloodPressureField from "../BloodPressureField/BloodPressureField";
import Row from "../Row";
import { useShallow } from "zustand/react/shallow";
import useAncRules from "./useAncRules";
import useMetadataStore from "@/state/metadata";

const NcleCommunicableDiseases = () => {
  const { t, i18n } = useTranslation();
  const { dataElements } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );

  const { currentEvent, currentProgramStage, editing, order } = event;
  const { changeDataValue, changeEventProperty, setEvent } = actions;
  const completed = currentEvent && currentEvent.status === "COMPLETED";
  const { disabledFields, hiddenFields, helpers, props } = useAncRules();

  useEffect(() => {
    let order = ["eventDate"];
    currentProgramStage.programStageSections.forEach((pss) => {
      pss.dataElements.forEach((de) => {
        order.push(de.id);
      });
    });
    setEvent("order", order);
  }, []);

  const generateSections = () => {
    return currentProgramStage.programStageSections.map((pss, index) => {
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {index === 0 && (
            <Row
              label={
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
                  1.&nbsp;
                  <EventDateLabelNoState type="eventDate" currentProgramStage={currentProgramStage} />
                </div>
              }
              field={
                <EventDateFieldNoState
                  accept={(value) => {
                    changeEventProperty("eventDate", value);
                    changeEventProperty("dueDate", value);
                  }}
                  disabled={!editing || completed}
                  currentEvent={currentEvent}
                />
              }
            />
          )}
          {pss.id === "oZPPUzgazm8" ? (
            <div className="ncle-symptoms-section">
              {pss.dataElements.map((de) => {
                const index = order.findIndex((o) => o === de.id);
                if (de.id === "PRrmBVwmWRj") {
                  return (
                    <div className="ncle-symptoms-section-item">
                      <div style={{ display: "flex" }}>
                        {index + 1}.&nbsp;
                        <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
                      </div>
                      &nbsp;
                      <div>
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
                      </div>
                    </div>
                  );
                } else {
                  const foundDataElement = dataElements.find((dataElement) => dataElement.id === de.id);
                  return (
                    <div className="ncle-symptoms-section-item">
                      <div>
                        <DataValueFieldNoBlurNoState
                          label={`${index + 1}. ${pickTranslation(foundDataElement, i18n.language, "formName")}`}
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
                      </div>
                      {/* <div style={{ display: "flex" }}>
                        {index + 1}.&nbsp;
                        <DataValueLabelNoState dataElement={de.id} currentProgramStage={currentProgramStage} />
                      </div> */}
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            (() => {
              return pss.dataElements.map((de) => {
                const index = order.findIndex((o) => o === de.id);
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
              });
            })()
          )}
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

export default NcleCommunicableDiseases;
