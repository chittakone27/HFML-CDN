import { useEffect } from "react";
import { Input } from "@/ui/common";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import useYearSelector from "../hooks/useYearSelector";
import useOpenFuturePeriods from "../hooks/useOpenFuturePeriods";
import moment from "moment";
import { addDays, getFirstDateOfWeek } from "@/utils/utils";

const WeeklySaturdaySelector = () => {
  const { period, actions } = useSelectionStore(
    (state) => ({
      period: state.period,
      actions: state.actions,
    }),
    shallow
  );
  const { selectPeriod } = actions;
  const { t } = useTranslation();
  const { maxYear, maxDate } = useOpenFuturePeriods("WeeklySaturday");
  const { currentYear, nextYear, previousYear, modifyCurrentYear } =
    useYearSelector(maxYear);

  const weekTypeDiff = -2; //Sunday -1, Saturday -2, Thursday 3, Wednesday 2
  const iso53WeeklySundayISOYear = (year) => {
    let p = function p(y) {
      return y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
    };
    return p(year) % 7 === 4 || p(year - 1) % 7 === 3;
  };
  // let weeks = currentYear
  //   ? iso53WeeklySundayISOYear(currentYear)
  //     ? 53
  //     : 52
  //   : 0;
  let valueSet = [];
  // for (let i = 1; i <= weeks; i++) {
  //   let valid = true;
  //   let startDate = addDays(weekTypeDiff, getFirstDateOfWeek(currentYear, i));
  //   if (moment(startDate) < moment("01-01-2024")) {
  //     console.log(i, startDate);
  //   }
  //   let endDate = addDays(6, startDate);
  //   if (currentYear === maxYear) {
  //     if (moment(maxDate) < moment(endDate)) {
  //       valid = false;
  //     }
  //   }
  //   if (valid) {
  // valueSet.push({
  //   value: i,
  //   label: `${t("week")} ${i} - ${moment(startDate).format(
  //     "YYYY-MM-DD"
  //   )} - ${moment(endDate).format("YYYY-MM-DD")}`,
  // });
  //   }
  // }
  useEffect(() => {
    if (period.year) {
      modifyCurrentYear(period.year);
    }
  }, [period.year]);

  const addWeeks = (date, weeks) => {
    const dateCopy = new Date(date);

    dateCopy.setDate(dateCopy.getDate() + 7 * weeks);

    return dateCopy;
  }

  const getStartDateOfYear = (year, startDayOfWeek) => {
    let day4OfYear = new Date(year, 0, 4);

    let startDate = day4OfYear;

    let dayDiff = day4OfYear.getDay() - startDayOfWeek;

    if (dayDiff > 0) {
      startDate.setDate(startDate.getDate() + (0 - dayDiff));
      //startDate.add(0 - dayDiff, "d");
    } else if (dayDiff < 0) {
      startDate.setDate(startDate.getDate() + (0 - dayDiff - 7));
      //startDate.add(0 - dayDiff - 7, "d");
    }

    return startDate;
  };

  const generatePeriods = (valueSet) => {
    //let year = offset + this.calendar.today().year();
    let year = currentYear;
    //let periods = [];

    let startDate = getStartDateOfYear(year, 6);
    let nextYearStartDate = Date.parse(getStartDateOfYear(year + 1, 1));

    // no reliable way to figure out number of weeks in a year (can differ in different calendars)
    // goes up to 200, but break when week is back to 1
    for (let week = 1; week < 200; week++) {
      // not very elegant, but seems to be best way to get week end, adds a week, then minus 1 day
      //let endDate = new Date(startDate).add(1, "w").add(-1, "d");
      //addWeeks(date, 3)
      let endDate = new Date(startDate);
      endDate = addWeeks(endDate, 1);
      endDate.setDate(endDate.getDate() - 1);
      let isNextYearWeek =
        Date.parse(startDate) <= nextYearStartDate &&
        nextYearStartDate <= Date.parse(endDate);
      //Math.ceil(( currentDate.getDay() + 1 + days) / 7)
      // if ((startDate.weekOfYear() === 1 && week > 50) || isNextYearWeek) {
      //   break;
      // }
      let days = Math.floor((startDate - year) / (24 * 60 * 60 * 1000));
      if (
        (Math.ceil((startDate.getDay() + 1 + days) / 7) === 1 && week > 50) ||
        isNextYearWeek
      ) {
        break;
      }
      // let period = {};
      // period["startDate"] = moment(startDate).format("YYYY-MM-DD");
      // period["endDate"] = moment(endDate).format("YYYY-MM-DD");
      // period["name"] =
      //   "Week " +
      //   week +
      //   " - " +
      //   period["startDate"] +
      //   " - " +
      //   period["endDate"];
      // period["id"] = "WeeklySaturday_" + period["startDate"];
      // period["iso"] = year + "SatW" + week;

      // period["_startDate"] = new Date(startDate);
      // period["_endDate"] = new Date(endDate);

      // periods.push(period);
      let valid = true;
      if (currentYear === maxYear) {
        if (moment(maxDate) < moment(endDate)) {
          valid = false;
        }
      }
      if (valid) {
        valueSet.push({
          value: week,
          label: `${t("week")} ${week} - ${moment(startDate).format(
            "YYYY-MM-DD"
          )} - ${moment(endDate).format("YYYY-MM-DD")}`,
        });
      }

      //startDate.add(1, "w");
      startDate = addWeeks(startDate, 1);
    }
    return valueSet;
  };

  valueSet = generatePeriods(valueSet);
  return (
    <div>
      <Input
        value={period.week}
        label={t("weeklyStartSaturday")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          selectPeriod("year", currentYear);
          selectPeriod("week", value);
          let startDate = addDays(
            weekTypeDiff,
            getFirstDateOfWeek(currentYear, value)
          );
          let endDate = addDays(6, startDate);
          selectPeriod(
            "weekName",
            `${t("week")} ${value} - ${moment(startDate).format(
              "YYYY-MM-DD"
            )} - ${moment(endDate).format("YYYY-MM-DD")}`
          );
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

export default WeeklySaturdaySelector;
