import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DateInput from "./DateInput";
import Input from "./Input";
import useEventCaptureStore from "@/state/eventCapture";
import { differenceInCalendarDays, differenceInMonths, differenceInYears, sub, add, format, parseISO, subDays, subMonths, subYears } from "date-fns";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const AgePicker = (props) => {
  const [diff, setDiff] = useState({ years: "", months: "", days: "" });
  const [currentValues, setCurrentValues] = useState({
    years: "",
    months: "",
    days: ""
  });
  const previousValues = usePrevious(JSON.stringify(currentValues));
  const { value, initialDate } = props;
  const { t } = useTranslation();

  const onChange = (value, type) => {
    currentValues[type] = value;
    setCurrentValues({ ...currentValues });
  };
  const calculate = (e, type) => {
    if (initialDate && parseInt(e.target.value) !== currentValues[type]) {
      const { years, months, days } = currentValues;
      let dateOfBirth;
      dateOfBirth = subYears(parseISO(initialDate), parseInt(years) || 0);
      dateOfBirth = subDays(dateOfBirth, parseInt(days) || 0);
      dateOfBirth = subMonths(dateOfBirth, parseInt(months) || 0);
      props.accept(dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : "");
    }
  };

  useEffect(() => {
    let years, months, days, currentDate;
    if (initialDate && value) {
      // const currentEventDate = new Date(eventDate);
      // currentDate = new Date(value);
      // years = differenceInYears(currentEventDate, currentDate);
      // currentDate = add(currentDate, { years });
      // months = differenceInMonths(currentEventDate, currentDate);
      // currentDate = add(currentDate, { months });
      // days = differenceInCalendarDays(currentEventDate, currentDate);

      // const currentInitialDate = new Date(initialDate);
      // currentDate = new Date(value);
      // const diff = new Date(currentInitialDate.getTime() - currentDate.getTime());
      // years = diff.getUTCFullYear() - 1970;
      // months = diff.getUTCMonth();
      // days = diff.getUTCDate() - 1;
      const refDate = new Date(initialDate);
      const birth = new Date(value);

      years = refDate.getFullYear() - birth.getFullYear();
      months = refDate.getMonth() - birth.getMonth();
      days = refDate.getDate() - birth.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
        if (days < 0) {
          const lastMonth = new Date(refDate.getFullYear(), refDate.getMonth() - 1, 0);
          days += lastMonth.getDate();
        }
      }
    } else {
      years = "";
      months = "";
      days = "";
    }
    const currentDiff = { years, months, days };
    setCurrentValues({ ...currentDiff });
  }, [initialDate, value]);
  return (
    <div className="age-picker-container">
      <DateInput {...props} maxDate={props.maxDate ? format(new Date(props.maxDate), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")} />
      <div style={{ display: "flex", paddingTop: 5 }}>
        <div>
          <Input
            className="age-picker-item"
            disabled={props.disabled || props.disabledManualFields}
            valueType="TEXT"
            blur={(e) => calculate(e, "years")}
            label={t("ageInYears")}
            value={currentValues.years}
            change={(value) => {
              onChange(value, "years");
            }}
          />
        </div>
        &nbsp;&nbsp;
        <div>
          <Input
            className="age-picker-item"
            disabled={props.disabled || props.disabledManualFields}
            valueType="TEXT"
            blur={(e) => calculate(e, "months")}
            label={t("ageInMonths")}
            value={currentValues.months}
            change={(value) => {
              onChange(value, "months");
            }}
          />
        </div>
        &nbsp;&nbsp;
        <div>
          <Input
            className="age-picker-item"
            disabled={props.disabled || props.disabledManualFields}
            valueType="TEXT"
            blur={(e) => calculate(e, "days")}
            label={t("ageInDays")}
            value={currentValues.days}
            change={(value) => {
              onChange(value, "days");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AgePicker;
