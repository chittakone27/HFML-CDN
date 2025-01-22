import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";

const MonthSelector = () => {
  const { period, actions } = useSelectionStore((state) => ({ period: state.period, actions: state.actions }), shallow);
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const valueSet = months.map((month, index) => {
    return {
      value: index + 1,
      label: t(month)
    };
  });
  return (
    <div>
      <Input
        value={period.month}
        label={t("month")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("month", value);
          selectPeriod("monthName", t(months[value - 1]));
        }}
      />
    </div>
  );
};

export default MonthSelector;
