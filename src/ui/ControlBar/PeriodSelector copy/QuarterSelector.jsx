import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";

const QuarterSelector = () => {
  const { period, actions } = useSelectionStore((state) => ({ period: state.period, actions: state.actions }), shallow);
  const { selectPeriod } = actions;

  const { t } = useTranslation();
  const quarters = [1, 2, 3, 4];
  const valueSet = quarters.map((quarter, index) => {
    return {
      value: quarter,
      label: t("Q" + quarter)
    };
  });

  return (
    <div>
      <Input
        value={period.quarter}
        label={t("quarter")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("quarter", value);
          selectPeriod("quarterName", t("Q" + value));
        }}
      />
    </div>
  );
};

export default QuarterSelector;
