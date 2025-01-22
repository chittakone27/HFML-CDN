import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import { Input } from "@/ui/common";
import format from "date-fns/format";
import { useState } from "react";
import { convertDisplayDate } from "@/utils/utils";
const EnrollmentDateField = () => {
  const { data, actions } = useTrackerCaptureStore((state) => ({ data: state.data, actions: state.actions }), shallow);
  const { currentEnrollment } = data;
  const { changeEnrollmentProperty } = actions;

  return (
    <Input
      maxDate={format(new Date(), "yyyy-MM-dd")}
      value={convertDisplayDate(currentEnrollment.enrollmentDate)}
      valueType="DATE"
      accept={(value) => {
        console.log("accept", value);
        changeEnrollmentProperty("enrollmentDate", value);
      }}
    />
  );
};

export default EnrollmentDateField;
