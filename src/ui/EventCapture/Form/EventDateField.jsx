import { Input } from "@/ui/common";
import _ from "lodash";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import moment from "moment";

const EventDateField = ({ disabled }) => {
  const { program, period } = useSelectionStore((state) => ({ program: state.program, period: state.period }), shallow);
  const { currentEvent, completeness, status } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent, completeness: state.completeness, status: state.status }),
    shallow
  );
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  const { setCurrentEventProperty } = useEventCaptureStore((state) => state.actions);
  const currentDisabled = completed || completeness || disabled;
  let maxDate;

  if (program.periodType) {
    maxDate = period.endDate;
  } else {
    maxDate = moment().format("YYYY-MM-DD");
  }
  if (maxDate > moment().format("YYYY-MM-DD")) {
    maxDate = moment().format("YYYY-MM-DD");
  }

  if (program.periodType === "Daily" && !currentEvent.eventDate) {
    setCurrentEventProperty("eventDate", maxDate);
  }

  return (
    <div className="input-field-container">
      <Input
        helpers={status.helpers.filter((h) => h.target === "eventDate")}
        disabled={currentDisabled}
        minDate={program.periodType ? period.startDate : "1900-01-01"}
        defaultMonth={program.periodType ? new Date(period.startDate) : undefined}
        maxDate={maxDate}
        valueType="DATE"
        mandatory={true}
        value={currentEvent.eventDate ? currentEvent.eventDate : ""}
        accept={(value) => {
          setCurrentEventProperty("eventDate", value);
          setCurrentEventProperty("dueDate", value);
        }}
      />
    </div>
  );
};

export default EventDateField;
