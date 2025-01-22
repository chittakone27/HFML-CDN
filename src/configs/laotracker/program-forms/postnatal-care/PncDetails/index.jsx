// Hooks
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";
import usePncRules from "./usePncRules";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect } from "react";
// Components
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import BloodPressureField from "@/configs/laotracker/common/BloodPressureField/BloodPressureField";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
// Others
import { pickExecutionDateLabel } from "@/utils/utils";
import "./PncDetails.css";

const Row = (props) => {
  return (
    <div className="ancpnc-section-row">
      <div>
        <DataValueLabel {...props} />
      </div>
      <div>
        <DataValueFieldNoBlur {...props} />
      </div>
    </div>
  );
};

const PncDetails = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { currentEvent } = useCurrentEvent();
  const { disabledFields, hiddenFields, props } = usePncRules();
  const foundProgramStage = program.programStages.find(
    (ps) => ps.id === "huYWjrG6A1C"
  );
  const actions = useTrackerCaptureStore((state) => state.actions);
  const { setHandlers } = actions;
  useEffect(() => {
    setHandlers("eventSave", null);
  }, []);

  const generateSections = () => {
    return foundProgramStage.programStageSections.map((pss, pssIndex) => {
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {pssIndex === 0 && (
            <>
              <div className="ancpnc-section-row">
                <div>
                  <AttributeLabel attribute="oPKsfqS64oE" />
                </div>
                <div>
                  <AttributeField attribute="oPKsfqS64oE" disabled={true} />
                </div>
              </div>
              <div className="ancpnc-section-row">
                <div>{pickExecutionDateLabel(foundProgramStage, t)}</div>
                <div>
                  <EventDateFieldNoBlur type="eventDate" />
                </div>
              </div>
            </>
          )}
          {pss.dataElements.map((de) => {
            if (hiddenFields.includes(de.id)) {
              return null;
            }
            switch (de.id) {
              case "tVPKjkXrMSB":
                return (
                  <div className="ancpnc-section-row">
                    <div>{t("bloodPressure")}</div>
                    <div>
                      <BloodPressureField />
                    </div>
                  </div>
                );
              case "TThw3XArMBK":
                return null;
              default:
                return (
                  <Row
                    dataElement={de.id}
                    key={de.id}
                    disabled={disabledFields.includes(de.id)}
                    {...props[de.id]}
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
        <div className="ancpnc-section-row">
          <div>{pickExecutionDateLabel(foundProgramStage, t)}</div>
          <div>
            <EventDateFieldNoBlur type="eventDate" />
          </div>
        </div>
      )}
      {currentEvent.eventDate && generateSections()}
    </div>
  );
};

export default PncDetails;
