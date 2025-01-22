import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";

const FinancialOctoberSelector = () => {
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
      label: `${t("oct")} ${i} - ${t("sep")} ${i + 1}`,
      value: `${i}Oct`
    });
  }

  return (
    <div>
      <Input
        value={period.year ? `${period.year}Oct` : null}
        label={t("financialOct")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", value.replace("Oct", ""));
        }}
      />
    </div>
  );
};

export default FinancialOctoberSelector;
