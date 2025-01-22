import moment from "moment";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";

const useOpenFuturePeriods = (periodType) => {
  const { program, dataSet } = useSelectionStore(
    (state) => ({
      program: state.program,
      dataSet: state.dataSet
    }),
    shallow
  );
  let currentDate = moment();
  let openFuturePeriods = dataSet ? dataSet.openFuturePeriods : program && program.dataSet ? program.dataSet.openFuturePeriods : 0;

  let maxDate;
  let maxYear;
  let maxS;
  let maxMonth;
  let maxQuarter;
  let maxWeek;
  switch (periodType) {
    case "Yearly":
      maxDate = currentDate.add(openFuturePeriods - 1, "years");
      maxYear = maxDate.year();
      break;
    case "Monthly":
      maxDate = currentDate.add(openFuturePeriods - 1, "months");
      maxMonth = maxDate.month();
      maxYear = maxDate.year();
      break;
    case "SixMonthly":
      const currentS = moment().month() <= 5 ? 1 : 2;
      const currentSixMonth = moment([currentDate.year(), currentS === 1 ? 5 : 11]);
      const currentMaxDate = currentSixMonth.add((openFuturePeriods - 1) * 6, "months");
      maxYear = currentMaxDate.year();
      maxS = currentMaxDate.month() <= 5 ? 1 : 2;
      break;
    case "Quarterly":
      maxDate = currentDate.add(openFuturePeriods - 1, "quarters");
      maxQuarter = maxDate.quarter();
      maxYear = maxDate.year();
      break;
    case "Weekly":
      const lastWeek = currentDate.add(openFuturePeriods - 1, "isoWeeks");
      maxDate = lastWeek.endOf("isoWeek");
      maxWeek = maxDate.isoWeek();
      maxYear = maxDate.year();
      break;
    case "WeeklySunday":
      maxDate = currentDate.add(openFuturePeriods, "weeks");
      maxYear = maxDate.year();
      break;
    case "WeeklySaturday":
      maxDate = currentDate.add(openFuturePeriods, "weeks");
      maxYear = maxDate.year();
      break;
    case "Daily":
      maxDate = currentDate.add(openFuturePeriods - 1, "days").format("YYYY-MM-DD");
      break;
    default:
      break;
  }
  return { maxYear, maxMonth, maxS, maxQuarter, maxWeek, maxDate };
};

export default useOpenFuturePeriods;
