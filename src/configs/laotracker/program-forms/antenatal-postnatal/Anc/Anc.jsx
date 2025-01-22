import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import BloodPressureField from "@/configs/laotracker/common/BloodPressureField/BloodPressureField";
import { useTranslation } from "react-i18next";
import { pickExecutionDateLabel } from "@/utils/utils";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useAncRules from "./useAncRules";
import "../AncPnc.css";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useEffect } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { tracker } from "@/api";
const { saveEvents } = tracker;

const Row = (props) => {
  return (
    <div className="ancpnc-section-row">
      <div>
        <DataValueLabel {...props} />
      </div>
      <div>
        <DataValueFieldNoBlur
          // dataElement={dataElement} disabled={disabled} helpers={helpers}
          {...props}
        />
      </div>
    </div>
  );
};

const Anc = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const { disabledFields, hiddenFields, helpers, props } = useAncRules();
  const { currentEvent } = useCurrentEvent();
  const foundProgramStage = program.programStages.find((ps) => ps.id === "IZ9GXqMAZV8");
  const actions = useTrackerCaptureStore((state) => state.actions);
  const { setHandlers } = actions;
  const generateSections = () => {
    return foundProgramStage.programStageSections.map((pss) => {
      return (
        <div className="ancpnc-section-container">
          <div>{pss.displayName}</div>
          {pss.id === "IoWawA1nSJw" && (
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
              case "CLon1OEoS2k":
                return null;
              default:
                return <Row dataElement={de.id} key={de.id} disabled={disabledFields.includes(de.id)} helpers={helpers[de.id]} {...props[de.id]} />;
            }
          })}
        </div>
      );
    });
  };

  const customSaveHandler = async (currentEvent, currentTei, currentEnrollment, currentEvents) => {
    const ancEvents = currentEvents.filter((ce) => ce.programStage === "IZ9GXqMAZV8");
    return saveEvents(ancEvents);
  };

  useEffect(() => {
    setHandlers("eventSave", customSaveHandler);
  }, []);

  return (
    <div className="ancpnc-anc-container">
      {currentEvent.eventDate && generateSections()}
      {!currentEvent.eventDate && (
        <div className="ancpnc-section-row">
          <div>{pickExecutionDateLabel(foundProgramStage, t)}</div>
          <div>
            <EventDateFieldNoBlur type="eventDate" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Anc;
