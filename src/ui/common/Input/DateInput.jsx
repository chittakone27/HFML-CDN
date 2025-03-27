import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, Popover } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { getYear, format, parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { lo } from "@/locales/index";
import "react-day-picker/dist/style.css";
import "./DateInput.css";
const { VITE_DATE_FORMAT } = import.meta.env;

const currentYear = new Date().getFullYear();
const localeMap = {
  vi: viLocale,
  en: enLocale,
  lo
};

const DateInput = ({ accept, value, maxDate, minDate, disabled, backgroundColor, focus, blur, defaultMonth, disableClearable, customDateFormat }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const locale = i18n.language;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  let displayValue;
  if (customDateFormat && value) {
    displayValue = format(new Date(value), customDateFormat);
  } else if (VITE_DATE_FORMAT && value) {
    displayValue = format(new Date(value), VITE_DATE_FORMAT);
  } else if (value) {
    displayValue = format(new Date(value), "yyyy-MM-dd");
  } else {
    displayValue = "";
  }
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
        value={displayValue}
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
          <DayPicker
            locale={localeMap[locale]}
            selected={value ? new Date(value) : null}
            defaultMonth={defaultMonth ? defaultMonth : value ? new Date(value) : undefined}
            mode="single"
            disabled={[{ after: maxDate ? new Date(maxDate) : null }, { before: minDate ? new Date(minDate) : null }]}
            fromYear={1900}
            toYear={maxDate ? getYear(new Date(maxDate)) : currentYear}
            captionLayout="dropdown"
            onSelect={(value) => {
              accept(value ? format(value, "yyyy-MM-dd") : "");
              handleClose();
            }}
          />
          <div style={{ padding: 5 }}>
            {!disableClearable && (
              <Button
                style={{ marginRight: 5 }}
                variant="contained"
                onClick={() => {
                  accept("");
                  handleClose();
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

export default DateInput;
