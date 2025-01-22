import moment from "moment";
import { format } from "date-fns";
const { VITE_DATE_FORMAT } = import.meta.env;

const sample = (d = [], fn = Math.random) => {
  if (d.length === 0) return;
  return d[Math.round(fn() * (d.length - 1))];
};

const generateUid = (limit = 11, fn = Math.random) => {
  const allowedLetters = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ].join("");
  const allowedChars = ["0123456789", allowedLetters].join("");
  const arr = [sample(allowedLetters, fn)];
  for (let i = 0; i < limit - 1; i++) {
    arr.push(sample(allowedChars, fn));
  }

  return arr.join("");
};

const convertDisplayValue = (dataItem, value, t) => {
  switch (dataItem.valueType) {
    case "DATE":
    case "AGE":
      return value
        ? format(
            new Date(value),
            VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd"
          )
        : "";
    case "TRUE_ONLY":
    case "BOOLEAN":
      return value === "true" ? t("yes") : value === "false" ? t("no") : "";
    default:
      return value;
  }
};

const convertDisplayDate = (value) => {
  const converted = value
    ? format(
        new Date(value),
        VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd"
      )
    : "";
  return converted;
};

const stringToSlug = (str) => {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};

const sortArrayByProperty = (arr, property) => {
  return arr.sort((a, b) => {
    const nameA = stringToSlug(a[property].toUpperCase()); // ignore upper and lowercase
    const nameB = stringToSlug(b[property].toUpperCase()); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

const getFirstDateOfWeek = (year, week) => {
  let ordTable = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let ordTableLeap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  let isLeapYear = new Date(new Date(year, 2, 1).setDate(0)).getDate() === 29;
  let ordDiff = isLeapYear ? ordTableLeap : ordTable;
  let correction = (new Date(year, 0, 4).getDay() || 7) + 3;
  let ordDate = week * 7 + (1 - correction);

  if (ordDate < 0) {
    return new Date(year, 0, ordDate);
  }

  let month = 11;

  while (ordDate < ordDiff[month]) {
    month--;
  }

  return new Date(year, month, ordDate - ordDiff[month]);
};

const addDays = (days, date) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const returnQuarterlyName = (year, quarter, t) => {
  switch (quarter) {
    case "Q1":
      return `Jan to Mar ${year}`;
    case "Q2":
      return `Apr to Jun ${year}`;
    case "Q3":
      return `Jul to Sept ${year}`;
    case "Q4":
      return `Oct to Dec ${year}`;
    default:
      return "";
  }
};

const returnSixMonthly = (year, sixMonth, t) => {
  switch (sixMonth) {
    case 1:
      return `Jan to Jun ${year}`;
    case 2:
      return `Jul to Dec ${year}`;
    default:
      return "";
  }
};

const generateWeeklySaturdayPeriods = (
  valueSet,
  maxDate,
  currentYear,
  maxYear,
  maxWeek,
  countYear
) => {
  let year = currentYear;
  let startDate = getStartDateOfYear(year, 6);
  let nextYearStartDate = Date.parse(getStartDateOfYear(year + 1, 1));

  // no reliable way to figure out number of weeks in a year (can differ in different calendars)
  // goes up to 200, but break when week is back to 1
  for (let week = countYear ? 200 : maxWeek; week >= 1; week--) {
    // not very elegant, but seems to be best way to get week end, adds a week, then minus 1 day
    //let endDate = new Date(startDate).add(1, "w").add(-1, "d");
    //addWeeks(date, 3)
    let endDate = new Date(startDate);
    endDate = addWeeks(endDate, 1);
    endDate.setDate(endDate.getDate() - 1);
    let isNextYearWeek =
      Date.parse(startDate) <= nextYearStartDate &&
      nextYearStartDate <= Date.parse(endDate);
    let days = Math.floor((startDate - year) / (24 * 60 * 60 * 1000));
    if (
      (Math.ceil((startDate.getDay() + 1 + days) / 7) === 1 && week > 50) ||
      isNextYearWeek
    ) {
      break;
    }
    let valid = true;
    if (currentYear === maxYear) {
      if (moment(maxDate) < moment(endDate)) {
        valid = false;
      }
    }
    if (valid && (valueSet.length <= 12 || countYear)) {
      valueSet.push({
        label: `W${week} Sat ${year}`,
        value: `${year}SatW${week}`,
      });
    }
    startDate = addWeeks(startDate, 1);
  }
  return valueSet;
};

const addWeeks = (date, weeks) => {
  const dateCopy = new Date(date);

  dateCopy.setDate(dateCopy.getDate() + 7 * weeks);

  return dateCopy;
};

const getStartDateOfYear = (year, startDayOfWeek) => {
  let day4OfYear = new Date(year, 0, 4);

  let startDate = day4OfYear;

  let dayDiff = day4OfYear.getDay() - startDayOfWeek;

  if (dayDiff > 0) {
    startDate.setDate(startDate.getDate() + (0 - dayDiff));
  } else if (dayDiff < 0) {
    startDate.setDate(startDate.getDate() + (0 - dayDiff - 7));
  }

  return startDate;
};

const iso53WeeklySundayISOYear = (year) => {
  let p = function p(y) {
    return y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  };
  return p(year) % 7 === 4 || p(year - 1) % 7 === 3;
};

const returnHistoryPeriodArray = (period, t) => {
  let arr = [];
  switch (period.periodType) {
    case "Monthly":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: moment(period.dhis2Period)
            .subtract(i, "month")
            .format("MMMM YYYY"),
          value: moment(period.dhis2Period)
            .subtract(i, "month")
            .format("YYYYMM"),
        });
      }
      return arr;
    case "Yearly":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: period.dhis2Period - i,
          value: period.dhis2Period - i,
        });
      }
      return arr;
    case "SixMonthly":
      for (let i = 72; i >= 0; i -= 6) {
        arr.push({
          label: returnSixMonthly(
            moment(period.startDate).subtract(i, "month").year(),
            moment(period.startDate).subtract(i, "month").month() <= 5 ? 1 : 2
          ),
          value: `${moment(period.startDate).subtract(i, "month").year()}S${
            moment(period.startDate).subtract(i, "month").month() <= 5 ? 1 : 2
          }`,
        });
      }
      return arr;
    case "Quarterly":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: returnQuarterlyName(
            moment(period.startDate).subtract(i, "Q").year(),
            moment(period.startDate).subtract(i, "Q").format("[Q]Q"),
            t
          ),
          value: moment(period.startDate).subtract(i, "Q").format("Y[Q]Q"),
        });
      }
      return arr;
    case "Weekly":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: `W${moment(period.startDate)
            .subtract(i, "week")
            .isoWeek()} ${moment(period.startDate).subtract(i, "week").year()}`,
          value: `${moment(period.startDate)
            .subtract(i, "week")
            .year()}W${moment(period.startDate).subtract(i, "week").isoWeek()}`,
        });
      }
      return arr;
    case "FinancialOct":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: `Oct ${period.year - i} to Sept ${period.year - i + 1}`,
          value: `${period.year - i}Oct`,
        });
      }
      return arr;
    case "WeeklySunday":
      let yearWeeklySunday = period.year;
      let totalWeeksSunday = iso53WeeklySundayISOYear(yearWeeklySunday)
        ? 53
        : 52;
      let currentWeekSunday = period.week;
      arr.push({
        label: `W${currentWeekSunday} Sun ${yearWeeklySunday}`,
        value: `${yearWeeklySunday}SunW${currentWeekSunday}`,
      });
      for (let i = 0; i < 12; i++) {
        if (currentWeekSunday - 1 === 0) {
          yearWeeklySunday--;
          totalWeeksSunday = iso53WeeklySundayISOYear(yearWeeklySunday)
            ? 53
            : 52;
          currentWeekSunday = totalWeeksSunday;
        } else {
          currentWeekSunday -= 1;
        }
        arr.push({
          label: `W${currentWeekSunday} Sun ${yearWeeklySunday}`,
          value: `${yearWeeklySunday}SunW${currentWeekSunday}`,
        });
      }
      arr = arr.reverse();
      return arr;
    case "WeeklySaturday":
      let flag = true;
      let currentYearWeeklySaturday = period.year;
      let totalWeeksSaturday = period.week;
      while (flag) {
        arr = generateWeeklySaturdayPeriods(
          arr,
          period.endDate,
          currentYearWeeklySaturday,
          period.year,
          totalWeeksSaturday,
          false
        );
        if (arr.length >= 12) {
          flag = false;
        } else {
          currentYearWeeklySaturday -= 1;
          let arrCount = [];
          arrCount = generateWeeklySaturdayPeriods(
            arrCount,
            period.startDate,
            currentYearWeeklySaturday,
            period.year,
            null,
            true
          );
          totalWeeksSaturday = arrCount.length;
        }
      }
      arr = arr.reverse();
      return arr;
    case "Daily":
      for (let i = 12; i >= 0; i--) {
        arr.push({
          label: moment(period.dhis2Period)
            .subtract(i, "day")
            .format("YYYY-MM-DD"),
          value: moment(period.dhis2Period)
            .subtract(i, "day")
            .format("YYYYMMDD"),
        });
      }
      return arr;
    default:
      return [];
  }
};

const pickEnrollmentDateLabel = (program, t) => {
  return program.displayEnrollmentDateLabel
    ? program.displayEnrollmentDateLabel
    : program.enrollmentDateLabel
    ? program.enrollmentDateLabel
    : t("enrollmentDate");
};

const pickExecutionDateLabel = (programStage, t) => {
  return programStage.displayExecutionDateLabel
    ? programStage.displayExecutionDateLabel
    : programStage.executionDateLabel
    ? programStage.executionDateLabel
    : t("eventDate");
};
const pickDueDateLabel = (programStage, t) => {
  return programStage.displayDueDateLabel
    ? programStage.displayDueDateLabel
    : programStage.dueDateLabel
    ? programStage.dueDateLabel
    : t("dueDate");
};
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
};
const escapeTrackerFilter = (filterString) => {
  filterString = replaceAll(filterString, "/", "//");
  filterString = replaceAll(filterString, ",", "/,");
  filterString = replaceAll(filterString, ".", "/.");

  return filterString;
};

const getTime = (value) => {
  const hasTime = value ? value.includes("T") : false;
  let hour, minute;
  if (hasTime) {
    hour = format(new Date(value), "HH");
    minute = format(new Date(value), "mm");
  } else {
    hour = "00";
    minute = "00";
  }
  return { hour, minute };
};

const generateValueLabel = (value) => {
  if (value) {
    const dateValue = VITE_DATE_FORMAT
      ? format(new Date(value), VITE_DATE_FORMAT)
      : value;
    const { hour, minute } = getTime(value);
    return `${dateValue} ${hour}:${minute}`;
  }
  return "--/--/-- --:--";
};

const isValidCoordinate = (value) => {
  //value: string "[latitude],[longitude]"
  // This regular expression validates geographic coordinates
  const re =
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  // Explanation of the regex:
  // ^[-+]? : Start of string, optional + or -
  // ([1-8]?\d(\.\d+)?|90(\.0+)?) : Latitude from 0 to 90 degrees
  //   [1-8]?\d : 0-89 degrees
  //   (\.\d+)? : Optional decimal places
  //   |90(\.0+)? : Or exactly 90 degrees with optional .0
  // ,\s* : Comma and optional whitespace separating latitude and longitude
  // [-+]? : Optional + or - for longitude
  // (180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?) : Longitude from 0 to 180 degrees
  //   180(\.0+)? : Exactly 180 degrees with optional .0
  //   ((1[0-7]\d)|([1-9]?\d)) : 0-179 degrees
  //   (\.\d+)? : Optional decimal places
  // $ : End of string

  return re.test(String(value).toLowerCase());
};

// Example usage:
// console.log(isValidCoordinate("40.7128, -74.0060")); // Valid: New York City coordinates
// console.log(isValidCoordinate("-33.8688, 151.2093")); // Valid: Sydney coordinates
// console.log(isValidCoordinate("90,180")); // Valid: Maximum possible values
// console.log(isValidCoordinate("-90,-180")); // Valid: Minimum possible values
// console.log(isValidCoordinate("45.123456, -123.123456")); // Valid: With decimal places

// console.log(isValidCoordinate("100,200")); // Invalid: Out of range
// console.log(isValidCoordinate("40.7128,-74.0060,100")); // Invalid: Extra value
// console.log(isValidCoordinate("latitude,longitude")); // Invalid: Non-numeric
// console.log(isValidCoordinate("40.7128")); // Invalid: Missing longitude
// console.log(isValidCoordinate("40.7128,-74.0060,100")); // Invalid: Extra component

const pickTranslation = (object, language, field) => {
  const fieldMapping = {
    formName: "FORM_NAME",
    name: "NAME",
  };
  const foundTranslation = object.translations.find(
    (t) => t.property === fieldMapping[field] && t.locale === language
  );
  return foundTranslation
    ? foundTranslation.value
    : object[field] ||
        object["displayFormName"] ||
        object["displayName"] ||
        object["name"];
};

export {
  generateUid,
  convertDisplayValue,
  convertDisplayDate,
  sortArrayByProperty,
  stringToSlug,
  getFirstDateOfWeek,
  addDays,
  returnHistoryPeriodArray,
  pickEnrollmentDateLabel,
  pickExecutionDateLabel,
  pickDueDateLabel,
  escapeTrackerFilter,
  getTime,
  generateValueLabel,
  isValidCoordinate,
  pickTranslation,
};
