import React, { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useIpdVisitDetailsRules from "./useIpdVisitDetailsRules";
import { useShallow } from "zustand/react/shallow";
import { DATA_ELEMENTS } from "../const";
import { t } from "i18next";

const {
  IPD_MAIN_DIAGNOSIS,
  CLIENT_AGE_AT_VISIT,
  IPD_ADMISSION_DATE,
  IPD_MAIN_DIAGNOSIS_ICD10,
} = DATA_ELEMENTS;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  container: {
    padding: "5px",
  },
  checkbox: { display: "flex", alignItems: "center", marginBottom: "5px" },
  field: {
    marginBottom: "5px",
  },
  error: {
    color: "red",
  },
  preCondition: {
    marginTop: "5px",
  },
};

const getStyles = (name, selectedIds, theme) => ({
  fontWeight: selectedIds.includes(name)
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
});

const IPDVisitDetails = () => {
  const theme = useTheme();
  const { program } = useSelectionStore((state) => ({
    program: state.program,
  }));

  const { layout, actions } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
    }))
  );

  const { changeDataValue, setLayout } = actions;
  const { dataElements } = useMetadataStore((state) => ({
    dataElements: state.dataElements,
  }));
  const { currentEvent } = useCurrentEvent();
  const psIPDVisitDetailStageId = "PuT0v7uvrDO";
  const psIPDVisitDetail = useMemo(
    () => program.programStages.find((e) => e.id === psIPDVisitDetailStageId),
    [program.programStages]
  );

  const lstDEs = useMemo(
    () =>
      psIPDVisitDetail.programStageDataElements.map((e) => e.dataElement.id),
    [psIPDVisitDetail]
  );

  const preConditionDataElements = [
    "dLIPYO8wooC",
    "eYGlKgmZyj8",
    "NoXeTahc1E2",
    "uN8LfG3KPgZ",
    "ZwwgoOLFry8",
    "CuKwviFco3q",
  ];
  const [selectedIds, setSelectedIds] = useState(
    currentEvent.dataValues
      .filter(
        (value) =>
          preConditionDataElements.includes(value.dataElement) &&
          value.value == "true"
      )
      .map((dataValue) => dataValue.dataElement)
  );

  const deName = (dataElement) =>
    dataElements.find((de) => de.id === dataElement).displayFormName;

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedIds = typeof value === "string" ? value.split(",") : value;
    setSelectedIds(selectedIds);
    preConditionDataElements.forEach((preConditionDe) => {
      const isDePreConditionSelected = selectedIds.includes(preConditionDe);
      changeDataValue(
        currentEvent.event,
        preConditionDe,
        isDePreConditionSelected ? "true" : ""
      );
    });
  };

  const handleDelete = (value) => {
    setSelectedIds((prevSelected) => {
      const updatedSelected = prevSelected.filter((id) => id !== value);
      changeDataValue(currentEvent.event, value, "");
      return updatedSelected;
    });
  };

  const { props, icd10ValueSet } = useIpdVisitDetailsRules(program);

  const renderSelect = () => (
    <FormControl sx={{ width: "100%" }}>
      <Select
        disabled={!layout.eventFormEditing}
        multiple
        value={selectedIds}
        id="demo-multiple-chip"
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={deName(value)}
                clickable
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={() => layout.eventFormEditing && handleDelete(value)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {preConditionDataElements.map((id) => {
          const hidden = props[id] && props[id].hidden;
          return hidden ? null : (
            <MenuItem
              key={id}
              value={id}
              style={getStyles(id, selectedIds, theme)}
            >
              {dataElements.find((element) => element.id === id).displayName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );

  return (
    <div style={styles.container}>
      <EventDateLabel type="eventDate" />
      <EventDateFieldNoBlur
        type="eventDate"
        maxDate={new Date().toISOString().split("T")[0]}
        {...props.eventDate}
      />
      {lstDEs.map((de) => {
        const hidden = props[de] && props[de].hidden;
        const isCheckbox =
          dataElements.find((element) => element.id === de).valueType ===
          "TRUE_ONLY";
        if (hidden || preConditionDataElements.includes(de)) return null;
        return (
          <div key={de} style={isCheckbox ? styles.checkbox : styles.field}>
            {isCheckbox ? (
              <>
                <DataValueFieldNoBlur dataElement={de} />
                <DataValueLabel dataElement={de} />
              </>
            ) : (
              <>
                <DataValueLabel dataElement={de} />
                <DataValueFieldNoBlur
                  dataElement={de}
                  disabled={de === CLIENT_AGE_AT_VISIT}
                  {...props[de]}
                  customValueSet={
                    de === IPD_MAIN_DIAGNOSIS_ICD10 ? icd10ValueSet : undefined
                  }
                />
                {/* PreCondition under IDP main diagnosis */}
                {de === IPD_MAIN_DIAGNOSIS && (
                  <>
                    <div style={styles.preCondition}>{t("preConditions")}</div>
                    {renderSelect()}
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IPDVisitDetails;
