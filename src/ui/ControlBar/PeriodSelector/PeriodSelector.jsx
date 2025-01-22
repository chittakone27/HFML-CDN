import { useEffect, useState } from "react";
import { Input } from "@/ui/common";
import { Popover } from "@mui/material";
import withPadding from "@/hocs/withPadding";
import { useTranslation } from "react-i18next";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";
import SixMonthlySelector from "./SixMonthlySelector";
import QuarterSelector from "./QuarterSelector";
import WeekSelector from "./WeekSelector";
import DailySelector from "./DailySelector";
import FinancialOctoberSelector from "./FinancialOctoberSelector";
import WeeklySundaySelector from "./WeeklySundaySelector";
import WeeklySaturdaySelector from "./WeeklySaturdaySelector";
import moment from "moment";
import "./PeriodSelector.css";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import { addDays, getFirstDateOfWeek } from "@/utils/utils";

const PeriodSelector = ({ disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const { t } = useTranslation();
  const { program, dataSet, period, actions } = useSelectionStore(
    (state) => ({
      program: state.program,
      dataSet: state.dataSet,
      period: state.period,
      actions: state.actions
    }),
    shallow
  );
  const { selectPeriod } = actions;

  let periodType = program ? program.periodType : dataSet ? dataSet.periodType : null;

  const renderInputValue = () => {
    let value = "";
    switch (periodType) {
      case "Yearly":
        if (period.year) value = period.year;
        break;
      case "Monthly":
        if (period.year && period.month) value = period.monthName + " - " + period.year;
        break;
      case "SixMonthly":
        if (period.year && period.s) value = period.sName + " " + period.year;
        break;
      case "Quarterly":
        if (period.year && period.quarter) value = period.quarterName + " - " + period.year;
        break;
      case "Weekly":
        if (period.year && period.week) value = period.weekName + " - " + period.year;
        break;
      case "FinancialOct":
        if (period.year) value = `${t("oct")} ${period.year} - ${t("sep")} ${parseInt(period.year) + 1}`;
        break;
      case "WeeklySunday":
        if (period.year && period.week) value = period.weekName;
        break;
      case "WeeklySaturday":
        if (period.year && period.week) value = period.weekName;
        break;
      default:
        break;
    }
    return periodType === "Daily" ? null : <Input disabled={disabled} valueType="TEXT" label={t("selectPeriod")} value={value} />;
  };

  const renderSelectors = () => {
    switch (periodType) {
      case "Yearly":
        return <YearSelector />;
      case "Monthly":
        return <MonthSelector />;
      case "SixMonthly":
        return <SixMonthlySelector />;
      case "Quarterly":
        return <QuarterSelector />;
      case "Weekly":
        return <WeekSelector />;
      case "FinancialOct":
        return <FinancialOctoberSelector />;
      case "WeeklySunday":
        return <WeeklySundaySelector />;
      case "WeeklySaturday":
        return <WeeklySaturdaySelector />;
      // case "Daily":
      //   return <DailySelector />;
      default:
        return null;
    }
  };

  const convertToDhis2Period = () => {
    let startDate;
    let endDate;
    switch (periodType) {
      case "Yearly":
        if (period.year) {
          selectPeriod("dhis2Period", `${period.year}`);
          selectPeriod("startDate", `${period.year}-01-01`);
          selectPeriod("endDate", `${period.year}-12-31`);
          selectPeriod("periodType", "Yearly");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "Yearly");
        }
        break;
      case "Monthly":
        if (period.year && period.month) {
          selectPeriod("dhis2Period", `${period.year}${period.month < 10 ? "0" + period.month : period.month}`);
          startDate = moment([period.year, period.month - 1])
            .startOf("month")
            .format("YYYY-MM-DD");
          endDate = moment([period.year, period.month - 1])
            .endOf("month")
            .format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "Monthly");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "Monthly");
        }
        break;
      case "SixMonthly":
        if (period.year && period.s) {
          selectPeriod("dhis2Period", `${period.year}S${period.s}`);
          startDate = moment([period.year, period.s === 1 ? 0 : 6])
            .startOf("month")
            .format("YYYY-MM-DD");
          endDate = moment([period.year, period.s === 1 ? 5 : 11])
            .endOf("month")
            .format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "SixMonthly");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "SixMonthly");
        }
        break;
      case "Quarterly":
        if (period.year && period.quarter) {
          selectPeriod("dhis2Period", `${period.year}Q${period.quarter}`);
          startDate = moment([period.year]).quarter(period.quarter).startOf("quarter").format("YYYY-MM-DD");
          endDate = moment([period.year]).quarter(period.quarter).endOf("quarter").format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "Quarterly");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "Quarterly");
        }
        break;
      case "Weekly":
        if (period.year && period.week) {
          selectPeriod("dhis2Period", `${period.year}W${period.week}`);
          startDate = moment([period.year, 1, 1]).isoWeek(period.week).startOf("isoWeek").format("YYYY-MM-DD");
          endDate = moment([period.year, 1, 1]).isoWeek(period.week).endOf("isoWeek").format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "Weekly");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "Weekly");
        }
        break;
      case "Daily":
        if (period.date) {
          selectPeriod("dhis2Period", `${period.date.replace(/-/g, "")}`);
          selectPeriod("startDate", period.date);
          selectPeriod("endDate", period.date);
          selectPeriod("periodType", "Daily");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "Daily");
        }
        break;
      case "FinancialOct":
        if (period.year) {
          selectPeriod("dhis2Period", `${period.year}Oct`);
          selectPeriod("startDate", `${period.year}-10-01`);
          selectPeriod("endDate", `${period.year}-09-30`);
          selectPeriod("periodType", "FinancialOct");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "FinancialOct");
        }
        break;
      case "WeeklySunday":
        if (period.year && period.week) {
          const weekTypeDiff = -1;
          selectPeriod("dhis2Period", `${period.year}SunW${period.week}`);
          let startDate = addDays(weekTypeDiff, getFirstDateOfWeek(period.year, period.week));
          let endDate = addDays(6, startDate);
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = moment(endDate).format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "WeeklySunday");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "WeeklySunday");
        }
        break;
      case "WeeklySaturday":
        if (period.year && period.week) {
          const weekTypeDiff = -2;
          selectPeriod("dhis2Period", `${period.year}SatW${period.week}`);
          let startDate = addDays(weekTypeDiff, getFirstDateOfWeek(period.year, period.week));
          let endDate = addDays(6, startDate);
          startDate = moment(startDate).format("YYYY-MM-DD");
          endDate = moment(endDate).format("YYYY-MM-DD");
          selectPeriod("startDate", startDate);
          selectPeriod("endDate", endDate);
          selectPeriod("periodType", "WeeklySaturday");
        } else {
          selectPeriod("dhis2Period", null);
          selectPeriod("startDate", "");
          selectPeriod("endDate", "");
          selectPeriod("periodType", "WeeklySaturday");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    convertToDhis2Period();
  }, [JSON.stringify(period)]);

  useEffect(() => {
    if (period.dhis2Period) setAnchorEl(null);
  }, [period.dhis2Period]);
  return (
    <div className="period-selector-container">
      <div
        onClick={(event) => {
          if (!disabled) setAnchorEl(event.currentTarget);
        }}
      >
        {renderInputValue()}
      </div>
      {periodType === "Daily" ? (
        <DailySelector />
      ) : (
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          <div
            className={
              period && period.periodType && period.periodType === "Weekly"
                ? "period-selector-popover-for-weekly-container"
                : "period-selector-popover-container"
            }
          >
            {renderSelectors()}
          </div>
        </Popover>
      )}
    </div>
  );
};

export default withPadding(PeriodSelector);
