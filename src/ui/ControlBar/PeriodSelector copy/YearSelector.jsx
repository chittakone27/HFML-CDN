import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import moment from "moment";

const YearSelector = () => {
  const { period, actions } = useSelectionStore((state) => ({ period: state.period, actions: state.actions }), shallow);
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const startYear = 1900;
  const currentYear = moment().year();
  let valueSet = [];

  for (let i = currentYear + 10; i >= startYear; i--) {
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
