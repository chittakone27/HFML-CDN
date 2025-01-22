import { useEffect } from "react";
import { Input } from "@/ui/common";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useYearSelector from "../hooks/useYearSelector";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import moment from "moment";
import { format, startOfISOWeek, endOfISOWeek } from "date-fns";
const { VITE_DATE_FORMAT } = import.meta.env;

const WeekSelector = () => {
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear, maxWeek } = useOpenFuturePeriods("Weekly");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } = useYearSelector(maxYear);
  let weeks = currentYear ? moment([currentYear, 1, 1]).isoWeeksInYear() : 0;
  let valueSet = [];

  for (let i = 1; i <= weeks; i++) {
    let valid = true;
    if (currentYear === maxYear) {
      if (i > maxWeek) {
        valid = false;
      }
    }
    if (valid) {
      let startDate = moment([currentYear, 1, 1]).isoWeek(i).startOf("isoWeek").format("YYYY-MM-DD");
      let endDate = moment([currentYear, 1, 1]).isoWeek(i).endOf("isoWeek").format("YYYY-MM-DD");
      startDate = format(new Date(startDate), VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd");
      endDate = format(new Date(endDate), VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd");
      valueSet.push({
        value: i,
        label: t("week") + " " + i + " - " + currentYear + ` (${startDate} - ${endDate})`
      });
    }
  }
  useEffect(() => {
    if (period.year) {
      modifyCurrentYear(period.year);
    }
  }, [period.year]);

  return (
    <div>
      <Input
        value={period.week}
        label={t("week")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("week", value);
          selectPeriod("weekName", t("week") + " " + value);
        }}
      />
      <div className="period-selector-next-prev-year-container">
        <Button variant="contained" onClick={previousYear}>
          {t("previousYear")}
        </Button>
        <span>{currentYear}</span>
        <Button variant="contained" onClick={nextYear}>
          {t("nextYear")}
        </Button>
      </div>
    </div>
  );
};

export default WeekSelector;
