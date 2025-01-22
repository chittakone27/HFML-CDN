import moment from "moment";
import { useEffect, useState } from "react";
import useSelectionStore from "@/state/selection";

const useYearSelector = (maxYear) => {
  const [currentYear, setCurrentYear] = useState(moment().year());
  const { selectPeriod } = useSelectionStore((state) => state.actions);

  const resetPeriod = () => {
    selectPeriod("month", "");
    selectPeriod("monthName", "");
    selectPeriod("quarter", "");
    selectPeriod("quarterName", "");
    selectPeriod("s", "");
    selectPeriod("sName", "");
    selectPeriod("week", "");
    selectPeriod("weekName", "");
  };

  const nextYear = () => {
    if (currentYear + 1 > maxYear) {
      return;
    } else {
      resetPeriod();
      setCurrentYear(currentYear + 1);
    }
  };

  const previousYear = () => {
    resetPeriod();
    setCurrentYear(currentYear - 1);
  };

  const modifyCurrentYear = (year) => {
    setCurrentYear(year);
  };

  useEffect(() => {
    if (currentYear > maxYear) {
      setCurrentYear(maxYear);
    }
  }, [currentYear, maxYear]);

  return { currentYear, nextYear, previousYear, modifyCurrentYear };
};

export default useYearSelector;
