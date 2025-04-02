import { useState } from "react";
import { Input } from "@/ui/common";
import ErrorDialog from "@/ui/common/ErrorDialog/ErrorDialog";
import _ from "lodash";
import { convertDisplayDate } from "@/utils/utils";
const EventDateFieldNoState = ({ helpers, disabled, type, minDate, maxDate, currentEvent, accept }) => {
  const [apiError, setApiError] = useState(null);
  const completed = currentEvent.status === "COMPLETED" ? true : false;
  let currentDisabled = completed || disabled;

  return (
    <div className="input-field-container">
      <Input
        helpers={helpers}
        disabled={currentDisabled}
        minDate={minDate ? minDate : "1900-01-01"}
        maxDate={maxDate}
        valueType="DATE"
        mandatory={type === "eventDate"}
        value={currentEvent[type ? type : "eventDate"] ? convertDisplayDate(currentEvent[type ? type : "eventDate"]) : ""}
        accept={(value) => {
          accept(value);
        }}
      />
      {apiError && (
        <ErrorDialog
          error={JSON.stringify(apiError)}
          handleClose={() => {
            setApiError(null);
          }}
        />
      )}
    </div>
  );
};

export default EventDateFieldNoState;
