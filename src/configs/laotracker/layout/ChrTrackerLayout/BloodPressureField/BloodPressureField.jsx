import DataValueLabelNoState from "@/ui/TrackerCapture/EventForm/DataValueLabelNoState";
import DataValueFieldNoBlurNoState from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlurNoState";

import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import "./BloodPressureField.css";
import useChrTrackerStore from "../state";

const BloodPressureField = ({ disabled }) => {
  const { t } = useTranslation();
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout
    }))
  );
  const { event } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event
    }))
  );
  const { currentProgramStage, currentEvent } = event;
  return (
    <div className="blood-pressure-field-row">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <DataValueLabelNoState dataElement="tVPKjkXrMSB" currentProgramStage={currentProgramStage} />
          <DataValueFieldNoBlurNoState
            disabled={disabled}
            dataElement="tVPKjkXrMSB"
            currentEvent={currentEvent}
            currentProgramStage={currentProgramStage}
          />
        </div>
        <div style={{ alignSelf: "flex-end", height: 36, fontSize: 25 }}>&nbsp;/&nbsp;</div>
        <div>
          <DataValueLabelNoState dataElement="TThw3XArMBK" currentProgramStage={currentProgramStage} />
          <DataValueFieldNoBlurNoState
            disabled={disabled}
            dataElement="TThw3XArMBK"
            currentEvent={currentEvent}
            currentProgramStage={currentProgramStage}
          />
        </div>
        <div style={{ alignSelf: "flex-end", height: 32 }}>&nbsp;mmHg</div>
      </div>
    </div>
  );
};

export default BloodPressureField;
