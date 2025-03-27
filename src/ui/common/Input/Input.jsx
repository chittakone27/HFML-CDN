import React from "react";
import Cascader from "../Cascader/Cascader";
import DateInput from "./DateInput";
import DateTimeInput from "./DateTimeInput";
import AgePicker from "./AgePicker";
import AgePickerNow from "./AgePickerNow";
import OrgUnitInput from "./OrgUnitInput";
import GeometryPicker from "./GeometryPicker";
import ImagePicker from "./ImagePicker";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  InputAdornment,
  IconButton
} from "@mui/material";
import "./Input.css";
import { t } from "i18next";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimePicker from "./TimePicker";
import FilePicker from "./FilePicker";

const Input = ({
  onDoubleClick,
  label,
  value,
  valueType,
  valueSet,
  groupBy,
  change,
  accept,
  disabled,
  disabledManualFields,
  mandatory,
  data,
  renderAsRadio,
  helpers,
  hidden,
  minDate,
  maxDate,
  initialDate,
  defaultMonth,
  renderOption,
  focus,
  blur,
  backgroundColor,
  color,
  tabIndex,
  disableClearable,
  disabledOptions,
  endAdornment,
  filter,
  customBooleanKey,
  multiline,
  rows,
  optionNotes = [],
  row = true,
  customDateFormat
}) => {
  let isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  // let { label, value, valueType, valueSet, change, disabled, mandatory, data, renderAsRadio, helpers, hidden } =
  //   useController(props);
  const isError = helpers ? (helpers.find((h) => h.type === "ERROR") ? true : false) : false;
  if (isError) {
    backgroundColor = "#ffd6d6";
  }

  valueSet = valueSet ? valueSet.filter((set) => !set.hidden) : null;
  const generateField = () => {
    if (valueSet) {
      const selected = valueSet.find((vs) => vs.value === value);
      if (renderAsRadio) {
        return (
          <RadioGroup
            {...(row ? { row: true } : { column: true })}
            disabled={disabled}
            value={selected ? selected.value : ""}
            onChange={(event, value) => {
              change(value);
            }}
          >
            {valueSet.map((vs) => {
              return (
                <div>
                  <FormControlLabel value={vs.value} control={<Radio />} label={vs.label} disabled={disabled} />
                  {(() => {
                    const foundNote = optionNotes.find((on) => on.value === vs.value);
                    return foundNote ? (
                      <div
                        style={{
                          fontStyle: "italic",
                          fontSize: 14,
                          color: "#737373",
                          marginTop: "-7px"
                        }}
                      >
                        {t(foundNote.note)}{" "}
                      </div>
                    ) : null;
                  })()}
                </div>
              );
            })}
          </RadioGroup>
        );
      } else {
        return isMobile ? (
          <Select
            value={selected ? selected : ""}
            fullWidth
            size="small"
            disabled={disabled}
            onChange={(event) => {
              change(event.target.value);
            }}
          >
            {valueSet.map((vs) => {
              return <MenuItem value={vs.value}>{vs.label}</MenuItem>;
            })}
          </Select>
        ) : (
          <Autocomplete
            sx={{
              div: {
                backgroundColor: backgroundColor ? backgroundColor : "none",
                color: color ? color : "inherit"
              },
              input: {
                "text-fill-color": color ? color : "inherit",
                color: color ? color : "inherit"
              }
            }}
            disableClearable={disableClearable}
            renderOption={renderOption}
            groupBy={groupBy}
            value={selected ? selected : null}
            disabled={disabled}
            onChange={(event, value) => {
              change(value ? value.value : "");
            }}
            isOptionEqualToValue={(option, value) => {
              return value ? option.value === value.value : false;
            }}
            size="small"
            fullWidth
            autoComplete={false}
            options={valueSet}
            getOptionDisabled={
              disabledOptions
                ? (option) => {
                    return disabledOptions.includes(option.value);
                  }
                : undefined
            }
            renderInput={(params) => (
              <TextField
                {...params}
                multiline={multiline}
                rows={multiline ? rows : 1}
                endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : ""}
              />
            )}
          />
        );
      }
    }
    switch (valueType) {
      case "INTEGER_POSITIVE":
      case "INTEGER_NEGATIVE":
      case "INTEGER_ZERO_OR_POSITIVE":
      case "PERCENTAGE":
      case "NUMBER":
      case "INTEGER":
      case "PHONE_NUMBER":
      case "TEXT-COORDINATES":
        return (
          <TextField
            onDoubleClick={onDoubleClick}
            sx={{
              zIndex: 1,
              input: {
                backgroundColor: backgroundColor ? backgroundColor : "none",
                color: color ? color : "inherit"
              },
              div: {
                backgroundColor: backgroundColor ? backgroundColor : "none"
              }
            }}
            multiline={multiline}
            rows={multiline ? rows : 1}
            onFocus={focus}
            onBlur={blur}
            // type="number"
            size="small"
            fullWidth
            disabled={disabled}
            value={value}
            onChange={(event) => {
              const currentValue = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
              change(currentValue);
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            InputProps={{
              inputProps: { tabIndex, autoComplete: "new-password" },
              endAdornment: endAdornment ? <InputAdornment position="start">{endAdornment}</InputAdornment> : ""
            }}
          />
        );
      case "TEXT":
      case "EMAIL":
        return (
          <TextField
            sx={{
              input: {
                backgroundColor: backgroundColor ? backgroundColor : "none",
                color: color ? color : "inherit"
              },
              div: {
                backgroundColor: backgroundColor ? backgroundColor : "none"
              }
            }}
            onFocus={focus}
            onBlur={blur}
            size="small"
            fullWidth
            disabled={disabled}
            value={value}
            onChange={(event) => {
              change(event.target.value);
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            InputProps={{
              inputProps: { tabIndex, autoComplete: "new-password" },
              endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : ""
            }}
          />
        );
      case "LONG_TEXT":
        return (
          <TextField
            sx={{
              input: {
                backgroundColor: backgroundColor ? backgroundColor : "none",
                color: color ? color : "inherit"
              },
              div: {
                backgroundColor: backgroundColor ? backgroundColor : "none"
              }
            }}
            onFocus={focus}
            onBlur={blur}
            size="small"
            multiline
            rows={rows ? rows : 4}
            fullWidth
            disabled={disabled}
            value={value}
            onChange={(event) => {
              change(event.target.value);
            }}
            // endAdornment={<InputAdornment position="end">hello</InputAdornment>}
            InputProps={{
              inputProps: { tabIndex, autoComplete: "new-password" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={disabled}
                    onClick={() => {
                      change("");
                    }}
                  >
                    <FontAwesomeIcon style={{ fontSize: 18 }} icon={faTimes} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );
      case "AGE":
        return (
          <AgePicker
            accept={accept}
            initialDate={initialDate}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disabled}
            disabledManualFields={disabledManualFields}
            defaultMonth={defaultMonth}
            backgroundColor={backgroundColor}
          />
        );
      case "AGE_NOW":
        return (
          <AgePickerNow
            accept={accept}
            initialDate={initialDate}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disabled}
            disabledManualFields={disabledManualFields}
            defaultMonth={defaultMonth}
            backgroundColor={backgroundColor}
          />
        );
      case "DATE":
        return (
          <DateInput
            customDateFormat={customDateFormat}
            accept={accept}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disabled}
            defaultMonth={defaultMonth}
            disableClearable={disableClearable}
            backgroundColor={backgroundColor}
            focus={focus}
          />
        );
      case "DATETIME":
        return (
          <DateTimeInput
            accept={accept}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            disabled={disabled}
            defaultMonth={defaultMonth}
            disableClearable={disableClearable}
            backgroundColor={backgroundColor}
          />
        );
      case "BOOLEAN":
        return (
          <RadioGroup row value={value ? value : null}>
            <FormControlLabel
              value="true"
              control={
                <Radio
                  onClick={(event) => {
                    if (event.target.value === value) {
                      change("");
                    } else {
                      change(event.target.value);
                    }
                  }}
                />
              }
              disabled={disabled}
              label={customBooleanKey ? t(customBooleanKey.true) : t("yes")}
            />
            <FormControlLabel
              value="false"
              control={
                <Radio
                  onClick={(event) => {
                    if (event.target.value === value) {
                      change("");
                    } else {
                      change(event.target.value);
                    }
                  }}
                />
              }
              disabled={disabled}
              label={customBooleanKey ? t(customBooleanKey.false) : t("no")}
            />
          </RadioGroup>
        );
      case "TRUE_ONLY":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={value === "true"}
                onChange={(event) => {
                  const checked = event.target.checked;
                  change(checked ? "true" : "");
                }}
              />
            }
            label={label}
            disabled={disabled}
          />
        );
      case "CASCADER":
        return <Cascader data={data} change={change} disabled={disabled} />;
      case "ORGANISATION_UNIT":
        return <OrgUnitInput disabled={disabled} accept={accept} value={value} filter={filter} />;
      case "COORDINATE":
        return <GeometryPicker value={value} accept={accept} disabled={disabled} />;
      case "IMAGE":
        return <FilePicker type={valueType} onChange={change} disabled={disabled} value={value} />;
      case "FILE_RESOURCE":
        return (
          <FilePicker
            type={valueType}
            onChange={() => {
              change;
            }}
            disabled={disabled}
            value={value}
          />
        );
      case "TIME":
        return <TimePicker change={change} disabled={disabled} value={value} disableClearable={disableClearable} />;
      default:
        return <span>UNSUPPORTED VALUE TYPE</span>;
    }
  };
  return !hidden ? (
    <>
      {label &&
        valueType !== "TRUE_ONLY" && [
          <Typography variant="inputFieldLabel">
            {t(label)}
            {mandatory && <Typography variant="mandatoryStar">&nbsp;&lowast;</Typography>}
          </Typography>,
          <div style={{ height: 3 }}></div>
        ]}

      {generateField()}
      {helpers &&
        helpers.map((h) => {
          return (
            <div>
              <Typography variant={h.type}>{h.value}</Typography>
            </div>
          );
        })}
    </>
  ) : null;
};

export default Input;
