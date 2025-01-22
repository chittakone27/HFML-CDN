import { Input } from "@/ui/common";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import useYearSelector from "../hooks/useYearSelector";
import { useEffect } from "react";

const QuarterSelector = () => {
  const quarters = [1, 2, 3, 4];
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear, maxQuarter } = useOpenFuturePeriods("Quarterly");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } = useYearSelector(maxYear);

  const valueSet = quarters
    .filter((quarter) => {
      if (currentYear === maxYear) {
        return quarter <= maxQuarter;
      } else {
        return true;
      }
    })
    .map((quarter) => {
      return {
        value: quarter,
        label: t("Q" + quarter) + " - " + currentYear
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
        value={period.quarter}
        label={t("quarter")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("quarter", value);
          selectPeriod("quarterName", t("Q" + value));
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

export default QuarterSelector;
