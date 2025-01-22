import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Input } from "@/ui/common";
import { shallow } from "zustand/shallow";
import useMetadataStore from "@/state/metadata";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import "./FilterDialog.css";
import { useTranslation } from "react-i18next";
const { VITE_TRACKER_API } = import.meta.env;

const generateOperator = (valueType, optionSet) => {
  if (optionSet) {
    return "eq";
  } else {
    switch (valueType) {
      case "NUMBER":
      case "INTEGER":
      case "INTEGER_POSITIVE":
      case "INTEGER_NEGATIVE":
      case "INTEGER_ZERO_OR_POSITIVE":
        return "eq";
      default:
        return "ilike";
    }
  }
};

const FilterDialog = () => {
  const { t } = useTranslation();
  const { dataElements, optionSets } = useMetadataStore(
    (state) => ({
      dataElements: state.dataElements,
      optionSets: state.optionSets
    }),
    shallow
  );
  const { setFilter, setPaging, fetchEvents } = useEventCaptureStore((state) => state.actions);
  const { filter, layout } = useEventCaptureStore((state) => ({ filter: state.filter, layout: state.layout }), shallow);
  const { program } = useSelectionStore((state) => ({ program: state.program }), shallow);
  const [filters, setFilters] = useState([...filter.filters]);
  const programStage = program.programStages[0];
  const fields = programStage.programStageDataElements.filter((psde) => psde.displayInReports);
  const changeFilter = (id, value, operator) => {
    const foundFilterIndex = filters.findIndex((f) => f.id === id);
    if (foundFilterIndex === -1) {
      filters.push({ id: id, value: value, operator });
    } else {
      filters[foundFilterIndex] = { id, value, operator };
    }
    setFilters([...filters]);
  };
  return (
    <Dialog fullWidth maxWidth="lg" open={true}>
      <DialogTitle>{t("eventListFilter")}</DialogTitle>
      <DialogContent>
        <div className="event-list-filter-dialog-content-container">
          {fields.map((field) => {
            const foundDe = dataElements.find((de) => de.id === field.dataElement.id);
            const foundOptionSet = foundDe.optionSet ? optionSets.find((os) => os.id === foundDe.optionSet.id) : null;
            const foundValue = filters.find((f) => f.id === foundDe.id);
            return (
              <div>
                <Input
                  valueSet={
                    foundOptionSet
                      ? foundOptionSet.options.map((o) => ({ value: VITE_TRACKER_API === "new" ? o.name : o.code, label: o.displayName }))
                      : null
                  }
                  accept={
                    foundDe.valueType === "DATE" || foundDe.valueType === "AGE"
                      ? (value) => {
                          changeFilter(foundDe.id, value, generateOperator(foundDe, foundDe.optionSet));
                        }
                      : undefined
                  }
                  value={foundValue ? foundValue.value : ""}
                  key={field.id}
                  valueType={foundDe.valueType}
                  label={foundDe.displayFormName}
                  change={(value) => {
                    changeFilter(foundDe.id, value, generateOperator(foundDe.valueType, foundDe.optionSet));
                  }}
                />
              </div>
            );
          })}
          <div>
            <Input
              value={(() => {
                const foundValue = filters.find((f) => f.id === "eventDate");
                return foundValue ? foundValue.value : "";
              })()}
              accept={(value) => {
                changeFilter("eventDate", value, generateOperator("DATE"));
              }}
              key="eventDate"
              valueType="DATE"
              label={
                programStage.displayExecutionDateLabel
                  ? programStage.displayExecutionDateLabel
                  : programStage.executionDateLabel
                  ? programStage.executionDateLabel
                  : t("eventDate")
              }
              change={(value) => {
                changeFilter("status", value, generateOperator("DATE"));
              }}
            />
          </div>
          <div>
            {!layout.hiddenEventListColumns.includes("status") && (
              <Input
                valueSet={[
                  { value: "COMPLETED", label: t("completed") },
                  { value: "ACTIVE", label: t("notCompleted") }
                ]}
                value={(() => {
                  const foundValue = filters.find((f) => f.id === "status");
                  return foundValue ? foundValue.value : "";
                })()}
                key="status"
                valueType="TEXT"
                label={t("status")}
                change={(value) => {
                  changeFilter("status", value, generateOperator("TEXT"));
                }}
              />
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setFilter("dialog", false);
            setFilter("filters", filters);
            setPaging("page", 1);
            fetchEvents();
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
