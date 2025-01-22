import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import moment from "moment";

const WeekSelector = () => {
  const { period, actions } = useSelectionStore((state) => ({ period: state.period, actions: state.actions }), shallow);
  const { selectPeriod } = actions;
  const { year } = period;
  const { t } = useTranslation();
  let weeks = year ? moment([year, 1, 1]).isoWeeksInYear() : 0;
  const valueSet = [];
  for (let i = 1; i <= weeks; i++) {
    valueSet.push({
      value: i,
      label: t("week") + " " + i
    });
  }
  return (
    <div>
      <Input
        value={period.week}
        label={t("week")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("week", value);
          selectPeriod("weekName", t("week") + " " + value);
        }}
      />
    </div>
  );
};

export default WeekSelector;
