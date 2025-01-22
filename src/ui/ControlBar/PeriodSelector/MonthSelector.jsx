import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import useYearSelector from "../hooks/useYearSelector";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

const MonthSelector = () => {
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear, maxMonth } = useOpenFuturePeriods("Monthly");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } = useYearSelector(maxYear);

  const valueSet = months
    .filter((month, index) => {
      if (currentYear === maxYear) {
        return index <= maxMonth;
      } else {
        return true;
      }
    })
    .map((month, index) => {
      return {
        value: index + 1,
        label: t(month) + " - " + currentYear
      };
    });

  useEffect(() => {
    if (period.year) {
      modifyCurrentYear(period.year);
    }
  }, [period.year]);

  return (
    <div>
      <Input
        value={period.month}
        label={t("month")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("month", value);
          selectPeriod("monthName", t(months[value - 1]));
        }}
      />
      <div className="period-selector-next-prev-year-container">
        <Button
          variant="contained"
          onClick={() => {
            selectPeriod("month", "");
            selectPeriod("monthName", "");
            previousYear();
          }}
        >
          {t("previousYear")}
        </Button>
        <span>{currentYear}</span>
        <Button
          variant="contained"
          onClick={() => {
            selectPeriod("month", "");
            selectPeriod("monthName", "");
            nextYear();
          }}
        >
          {t("nextYear")}
        </Button>
      </div>
    </div>
  );
};

export default MonthSelector;
