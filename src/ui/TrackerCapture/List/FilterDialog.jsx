import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Input } from "@/ui/common";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import "./FilterDialog.css";
import configs from "@/configs";
const { VITE_CONFIG_NAME } = import.meta.env;

const generateOperator = (valueType) => {
  switch (valueType) {
    case "NUMBER":
    case "INTEGER":
    case "INTEGER_POSITIVE":
    case "INTEGER_NEGATIVE":
    case "INTEGER_ZERO_OR_POSITIVE":
      return "EQ";
    default:
      return "LIKE";
  }
};

const FilterDialog = () => {
  const { teiFilterSections, customTeiFilterFields } = configs[VITE_CONFIG_NAME];
  const { t } = useTranslation();
  const { filter, actions } = useTrackerCaptureStore((state) => ({ filter: state.filter, actions: state.actions }), shallow);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets }),
    shallow
  );
  const { setFilter, setPaging } = actions;
  const [filters, setFilters] = useState([...filter.filters]);
  const sections = teiFilterSections ? teiFilterSections[program.id] : null;
  const currentCustomTeiFilterFields = customTeiFilterFields ? customTeiFilterFields[program.id] : null;
  const currentTeas = program.programTrackedEntityAttributes
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return foundTea;
    })
    .filter((ptea) => {
      if (["IMAGE", "COORDINATE"].includes(ptea.valueType)) {
        return false;
      } else {
        return true;
      }
    });

  const changeFilter = (tea, value) => {
    const operator = generateOperator(tea.valueType);
    const foundFilterIndex = filters.findIndex((f) => f.id === tea.id);
    if (foundFilterIndex === -1) {
      filters.push({ id: tea.id, value: value, operator });
    } else {
      filters[foundFilterIndex] = { id: tea.id, value, operator };
    }
    setFilters([...filters]);
  };

  const generateTeaInput = (tea) => {
    const foundOptionSet = tea.optionSet ? optionSets.find((os) => os.id === tea.optionSet.id) : null;
    const foundValue = filters.find((f) => f.id === tea.id);
    if (currentCustomTeiFilterFields && currentCustomTeiFilterFields[tea.id]) {
      return currentCustomTeiFilterFields[tea.id](currentTeas, filters, changeFilter);
    } else {
      return (
        <div>
          <Input
            valueSet={foundOptionSet ? foundOptionSet.options.map((o) => ({ value: o.code, label: o.displayName })) : null}
            accept={
              tea.valueType === "DATE" || tea.valueType === "AGE"
                ? (value) => {
                    changeFilter(tea, value);
                  }
                : undefined
            }
            value={foundValue ? foundValue.value : ""}
            key={tea.id}
            valueType={tea.valueType}
            label={tea.displayFormName}
            change={(value) => {
              changeFilter(tea, value);
            }}
          />
        </div>
      );
    }
  };
  return (
    <Dialog fullWidth maxWidth="md" open={true}>
      <DialogTitle>{t("trackedEntityInstanceFilter")}</DialogTitle>
      <DialogContent>
        {sections ? (
          <div className="tracker-list-filter-dialog-sections-container">
            {sections.map((section) => {
              return (
                <div className="tracker-list-filter-dialog-section">
                  <div>{t(section.label)}</div>
                  <div>
                    {section.trackedEntityAttributes.map((tea) => {
                      const foundTea = currentTeas.find((ct) => ct.id === tea);
                      return generateTeaInput(foundTea);
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="tracker-list-filter-dialog-content-container">
            {currentTeas.map((tea) => {
              return generateTeaInput(tea);
            })}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setFilter("dialog", false);
            setFilter("filters", filters);
            setFilter("lastUpdated", new Date() + "");
            setPaging("page", 1);
          }}
        >
          {t("search")}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilters([]);
          }}
        >
          {t("clear")}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setFilter("dialog", false);
          }}
        >
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FilterDialog;
``;
