import { useEffect } from "react";
import { Input } from "@/ui/common";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import useYearSelector from "../hooks/useYearSelector";
import moment from "moment";

const SixMonthlySelector = () => {
  const ss = [
    ["jan", "jun"],
    ["jul", "dec"]
  ];

  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const currentMonth = moment().month();
  const { maxYear, maxS } = useOpenFuturePeriods("SixMonthly");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } = useYearSelector(maxYear);

  const valueSet = ss
    .filter((s) => {
      if (currentYear === maxYear) {
        const currentS = moment().month() <= 5 ? 1 : 2;
        return currentS <= maxS;
      } else {
        return true;
      }
    })
    .map((s, index) => {
      return {
        value: index + 1,
        label: t(s[0]) + " - " + t(s[1]) + " " + currentYear
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
        value={period.s}
        label={t("sixMonthly")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("s", value);
          selectPeriod("sName", t(ss[value - 1][0]) + " - " + t(ss[value - 1][1]));
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

export default SixMonthlySelector;
