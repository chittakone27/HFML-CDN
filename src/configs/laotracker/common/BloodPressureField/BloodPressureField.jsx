import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import "./BloodPressureField.css";
const BloodPressureField = (props) => {
  const { t } = useTranslation();
  const { layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
    }))
  );
  return (
    <div className="blood-pressure-field-row">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <DataValueLabel dataElement="tVPKjkXrMSB" />
          <DataValueFieldNoBlur
            dataElement="tVPKjkXrMSB"
            {...props.tVPKjkXrMSB}
            disabled={!layout.eventFormEditing}
          />
        </div>
        <div style={{ alignSelf: "flex-end", height: 36, fontSize: 25 }}>
          &nbsp;/&nbsp;
        </div>
        <div>
          <DataValueLabel dataElement="TThw3XArMBK" />
          <DataValueFieldNoBlur
            dataElement="TThw3XArMBK"
            {...props.TThw3XArMBK}
            disabled={!layout.eventFormEditing}
          />
        </div>
        <div style={{ alignSelf: "flex-end", height: 32 }}>&nbsp;mmHg</div>
      </div>
    </div>
  );
};

export default BloodPressureField;
