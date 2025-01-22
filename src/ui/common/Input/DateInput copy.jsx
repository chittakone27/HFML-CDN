import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { TextField, Popover, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { format, parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import "react-day-picker/dist/style.css";

const localeMap = {
  vi: viLocale,
  en: enLocale
};

const DateInput = ({ accept, value, maxDate, minDate, disabled, backgroundColor, focus, blur }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentValue, setCurrentValue] = useState(value ? value : null);
  const { me } = useMetadataStore((state) => ({ me: state.me }), shallow);
  const locale = me.settings.keyUiLocale;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <TextField
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{ input: { backgroundColor: backgroundColor ? backgroundColor : "none" } }}
        onFocus={focus}
        onBlur={blur}
        size="small"
        fullWidth
        disabled={disabled}
        value={value ? value : ""}
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
        <div style={{ padding: 5 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
            <StaticDatePicker
              displayStaticWrapperAs="mobile"
              onAccept={(value) => {
                accept(value ? format(value, "yyyy-MM-dd") : "");
                handleClose();
              }}
              minDate={minDate ? parseISO(minDate) : undefined}
              maxDate={maxDate ? parseISO(maxDate) : undefined}
              disabled={disabled}
              mask={"____-__-__"}
              inputFormat="yyyy-MM-dd"
              views={["year", "month", "day"]}
              value={currentValue}
              onChange={(value) => {
                setCurrentValue(value ? format(value, "yyyy-MM-dd") : "");
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setCurrentValue("");
                accept("");
                handleClose();
              }}
            >
              {t("clear")}
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};
export default DateInput;
