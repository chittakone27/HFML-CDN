import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "./Input";
import { TextField, Button, Popover } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { lo } from "@/locales/index";
import "react-day-picker/dist/style.css";
import "./DateInput.css";
import { generateValueLabel, getTime } from "@/utils/utils";

const currentYear = new Date().getFullYear();
const localeMap = {
  vi: viLocale,
  en: enLocale,
  lo
};

const DateTimeInput = ({ accept, value, maxDate, minDate, disabled, backgroundColor, focus, blur, defaultMonth, disableClearable }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState(value ? new Date(value) : "");
  const hour = value ? format(new Date(value), "HH") : "00";
  const minute = value ? format(new Date(value), "mm") : "00";
  const [time, setTime] = useState({ hour, minute });
  const locale = i18n.language;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    setDate(value ? new Date(value) : "");
    const { hour, minute } = getTime(value);
    setTime({ hour, minute });
  }, [value]);

  return (
    <>
      <TextField
        onClick={(event) => {
          !disabled && setAnchorEl(event.currentTarget);
        }}
        sx={{
          input: {
            backgroundColor: backgroundColor ? backgroundColor : "none"
          }
        }}
        onFocus={focus}
        onBlur={blur}
        size="small"
        fullWidth
        disabled={disabled}
        value={generateValueLabel(value)}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <div className="date-picker-container">
          <div className="date-selection-container">
            <div className="date-selection-label">{t("selectDate")}</div>
            <DayPicker
              locale={localeMap[locale]}
              selected={date}
              defaultMonth={defaultMonth ? defaultMonth : date ? date : undefined}
              mode="single"
              disabled={[{ after: maxDate ? new Date(maxDate) : null }, { before: minDate ? new Date(minDate) : null }]}
              fromYear={1900}
              toYear={currentYear}
              captionLayout="dropdown"
              onSelect={(value) => {
                setDate(value);
                // accept(value ? format(value, "yyyy-MM-dd") + `T${time.hour}:${time.minute}:00` : "");
                // handleClose();
              }}
            />
          </div>
          <div className="date-selection-container">
            <div className="date-selection-label">{t("selectTime")}</div>
            <div className="time-selection-container">
              <Input
                change={(value) => {
                  setTime({ ...time, hour: value });
                }}
                value={time.hour}
                valueType="TEXT"
                valueSet={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour) => {
                  let value, label;
                  if (hour < 10) {
                    value = label = "0" + hour;
                  } else {
                    value = label = "" + hour;
                  }
                  return {
                    value,
                    label
                  };
                })}
              />
              &nbsp;
              <span>:</span>
              &nbsp;
              <Input
                value={time.minute}
                change={(value) => {
                  setTime({ ...time, minute: value });
                }}
                valueType="TEXT"
                valueSet={[
                  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                  35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
                ].map((minute) => {
                  let value, label;
                  if (minute < 10) {
                    value = label = "0" + minute;
                  } else {
                    value = label = "" + minute;
                  }
                  return {
                    value,
                    label
                  };
                })}
              />
            </div>
          </div>
          <div style={{ padding: 5 }}>
            <Button
              disabled={!time.hour || !time.minute}
              style={{ marginRight: 5 }}
              variant="contained"
              onClick={() => {
                console.log(date ? format(date, "yyyy-MM-dd") + `T${time.hour}:${time.minute}:00` : "");
                accept(date ? format(date, "yyyy-MM-dd") + `T${time.hour}:${time.minute}:00` : "");
                handleClose();
              }}
            >
              {t("ok")}
            </Button>
            {!disableClearable && (
              <Button
                color="warning"
                style={{ marginRight: 5 }}
                variant="contained"
                onClick={() => {
                  setDate("");
                  setTime({ hour: "", minute: "" });
                  accept("");
                }}
              >
                {t("clear")}
              </Button>
            )}
            <Button variant="contained" color="secondary" onClick={handleClose}>
              {t("close")}
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default DateTimeInput;
