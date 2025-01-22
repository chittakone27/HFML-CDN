import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { values } from "lodash";

const YearSelector = () => {
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear } = useOpenFuturePeriods("Yearly");
  const startYear = 1900;
  let valueSet = [];

  for (let i = maxYear; i >= startYear; i--) {
    valueSet.push({
      label: i + "",
      value: i
    });
  }

  return (
    <div>
      <Input
        value={period.year}
        label={t("year")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", value);
        }}
      />
    </div>
  );
};

export default YearSelector;
