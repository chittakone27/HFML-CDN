import { useEffect, useState } from "react";
import NoBlurForm from "@/ui/TrackerCapture/EventForm/NoBlurForm";
import ChildForm from "./ChildForm";
import { Button, Tabs, Tab } from "@mui/material";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import BloodPressureField from "../../common/BloodPressureField/BloodPressureField";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useDeliveryDetailsRules, useChildTeisLogic } from "./rules";
import { tracker } from "@/api";
import { generateUid } from "@/utils/utils";
import _ from "lodash";
import "./Stage.css";
import { useShallow } from "zustand/react/shallow";
import { findAttributeValue } from "../../common/utils";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
const { saveEvent, getTeiById } = tracker;

const Stage = () => {
  const { t } = useTranslation();
  const [tabLoading, setTabLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [disableSave, setDisableSave] = useState(false);
  const programs = useMetadataStore((state) => state.programs);
  const { actions, layout, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout,
      data: state.data
    }))
  );
  const { currentTei, currentEnrollment, currentEvents, childTeis } = data;
  const { changeDataValue, setLayout, selectEvent, setData } = actions;
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const foundEirProgram = programs.find((p) => p.id === "Yj9cJ34AXw6");
  const programStage = program.programStages.find((ps) => ps.id === "YOHVx1Xmpgr");
  const dataElements = programStage.programStageSections[0].dataElements.map((pssDe) => pssDe.id);
  const { currentEvent } = useCurrentEvent();
  const props = useDeliveryDetailsRules();
  const createChildTeis = useChildTeisLogic(setTab);
  const hiddenDataElements = ["tVPKjkXrMSB", "TThw3XArMBK", "pRlMcY5Ubn5"];
  const [currentLiveBirths, setCurrentLiveBirths] = useState(null);
  const foundLiveBirths = currentEvent ? currentEvent.dataValues.find((dv) => dv.dataElement === "OcT4N2illVT") : null;
  const foundListOfChildren = currentEvent ? currentEvent.dataValues.find((dv) => dv.dataElement === "pRlMcY5Ubn5") : null;
  const foundChildTeisDataValue = currentEvent ? currentEvent.dataValues.find((dv) => dv.dataElement === "lYdXxom1BAG") : null;
  const foundDateOfDeliveryDataValue = currentEvent ? currentEvent.dataValues.find((dv) => dv.dataElement === "grMMOiF9fPj") : null;
  const foundDateOfDelivery = foundDateOfDeliveryDataValue ? foundDateOfDeliveryDataValue.value : "";
  const foundChildTeis = foundChildTeisDataValue ? foundChildTeisDataValue.value : "";
  const healthId = findAttributeValue(currentTei, "oPKsfqS64oE");

  useEffect(() => {
    if (foundChildTeis) {
      setData("childTeis", JSON.parse(foundChildTeis));
    } else {
      setData("childTeis", "");
    }
  }, [foundChildTeis, currentEvent ? currentEvent.event : ""]);

  const currentChildTeiId = childTeis && tab !== 0 ? childTeis[tab - 1].trackedEntityInstance : null;
  useEffect(() => {
    if (foundDateOfDelivery) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [foundDateOfDelivery]);

  // useEffect(() => {
  //   selectEvent(currentEvents[0].event);
  // }, [currentTei ? currentTei.trackedEntityInstance : ""]);

  const disabledFields = !layout.eventFormEditing;
  return currentEvent ? (
    <div className="delivery-registry-stage-container">
      <div className="delivery-registry-stage-content">
        <div className="delivery-registry-stage-tabs-container">
          <Tabs
            value={tab}
            onChange={(event, newTab) => {
              setTab(newTab);
            }}
          >
            <Tab label={t("deliveryDetails")} />
            {(() => {
              if (childTeis && childTeis.length > 0) {
                const elements = [];
                for (let i = 0; i < childTeis.length; i++) {
                  elements.push(<Tab label={`${t("infant")} ${i + 1}`} />);
                }
                return elements;
              }
            })()}
          </Tabs>
        </div>
        <div className="delivery-registry-stage-tab-container">
          <NoBlurForm handleSave={createChildTeis} disableSave={disableSave}>
            {tab === 0 ? (
              <div style={{ height: "100%" }}>
                <div className="delivery-registry-stage-field-row" style={{ height: "36.5px" }}>
                  <AttributeLabel attribute="oPKsfqS64oE" label={t("healthIdMother")} />
                  <div style={{ color: "#0277bd", fontWeight: "bold" }}>
                    {healthId ? healthId : [<div>{t("childUniqueIdWarning1")}</div>, <div>{t("childUniqueIdWarning2")}</div>]}
                  </div>
                </div>
                <div style={{ height: "calc(100% - 36.5px)", overflow: "auto" }}>
                  <div className="delivery-registry-stage-field-row">
                    <EventDateLabel type="eventDate" />
                    <EventDateFieldNoBlur type="eventDate" disabled={disabledFields} />
                  </div>
                  {dataElements.map((de) => {
                    if (de === "tVPKjkXrMSB") {
                      return (
                        <div className="delivery-registry-stage-field-row">
                          <div>{t("bloodPressure")}</div>
                          <BloodPressureField />
                        </div>
                      );
                    } else if (hiddenDataElements.includes(de) || (props[de] && props[de].hidden)) {
                      return null;
                    } else {
                      return (
                        <div className="delivery-registry-stage-field-row">
                          <DataValueLabel dataElement={de} />
                          <DataValueFieldNoBlur dataElement={de} {...props[de]} disabled={disabledFields || (props[de] && props[de].disabled)} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              <ChildForm teiId={currentChildTeiId} />
            )}
          </NoBlurForm>
        </div>
      </div>
    </div>
  ) : null;
};
export default Stage;
