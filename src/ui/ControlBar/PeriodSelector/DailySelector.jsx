import { useState } from "react";
import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";

const DailySelector = () => {
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxDate } = useOpenFuturePeriods("Daily");
  const [currentValue, setCurrentValue] = useState(period.date);
  return (
    <div>
      <Input
        maxDate={maxDate}
        value={currentValue}
        valueType="DATE"
        label={t("selectPeriod")}
        change={(value) => {
          setCurrentValue(value);
        }}
        accept={(value) => {
          setCurrentValue(value);
          selectPeriod("date", value);
        }}
      />
    </div>
  );
};

export default DailySelector;
