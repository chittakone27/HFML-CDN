import { useEffect } from "react";
import { Input } from "@/ui/common";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useYearSelector from "../hooks/useYearSelector";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import moment from "moment";
import { addDays, getFirstDateOfWeek } from "@/utils/utils";

const WeeklySundaySelector = () => {
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions,
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear, maxDate } = useOpenFuturePeriods("WeeklySunday");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } =
    useYearSelector(maxYear);
  const weekTypeDiff = -1; //Sunday -1, Saturday -2, Thursday 3, Wednesday 2
  const iso53WeeklySundayISOYear = (year) => {
    let p = function p(y) {
      return y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
    };
    return p(year) % 7 === 4 || p(year - 1) % 7 === 3;
  };
  let weeks = currentYear
    ? iso53WeeklySundayISOYear(currentYear)
      ? 53
      : 52
    : 0;
  let valueSet = [];
  for (let i = 1; i <= weeks; i++) {
    let valid = true;
    let startDate = addDays(weekTypeDiff, getFirstDateOfWeek(currentYear, i));
    let endDate = addDays(6, startDate);
    if (currentYear === maxYear) {
      if (moment(maxDate) < moment(endDate)) {
        valid = false;
      }
    }
    if (valid) {
      valueSet.push({
        value: i,
        label: `${t("week")} ${i} - ${moment(startDate).format(
          "YYYY-MM-DD"
        )} - ${moment(endDate).format("YYYY-MM-DD")}`,
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
        label={t("weeklyStartSunday")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("week", value);
          let startDate = addDays(
            weekTypeDiff,
            getFirstDateOfWeek(currentYear, value)
          );
          let endDate = addDays(6, startDate);
          selectPeriod(
            "weekName",
            `${t("week")} ${value} - ${moment(startDate).format(
              "YYYY-MM-DD"
            )} - ${moment(endDate).format("YYYY-MM-DD")}`
          );
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

export default WeeklySundaySelector;
