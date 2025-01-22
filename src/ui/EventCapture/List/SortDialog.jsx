import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./SortDialog.css";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import { Input } from "@/ui/common";
import useMetadataStore from "@/state/metadata";
const { VITE_TRACKER_API } = import.meta.env;

const SortDialog = () => {
  const { t } = useTranslation();
  const dataElements = useMetadataStore((state) => state.dataElements);
  const program = useSelectionStore((state) => state.program);
  const programStage = program.programStages[0];
  const { actions, sort } = useEventCaptureStore((state) => ({ actions: state.actions, sort: state.sort }), shallow);
  const [currentSorts, setCurrentSorts] = useState([...sort.sorts]);
  const { setSort, setPaging, fetchEvents } = actions;

  useEffect(() => {}, [program ? program.id : null]);

  const fields = [
    {
      type: "property",
      id: "lastUpdated"
    },
    {
      type: "property",
      id: "eventDate"
    },
    {
      type: "property",
      id: "status"
    },
    ...programStage.programStageDataElements
      .map((psde) => {
        const foundDe = dataElements.find((de) => de.id === psde.dataElement.id);
        return foundDe;
      })
      .filter((de) => {
        return !["BOOLEAN", "TRUE_ONLY"].includes(de.valueType);
      })
      .map((de) => {
        return {
          ...de,
          type: "dataElement"
        };
      })
  ];

  return (
    <Dialog fullWidth maxWidth="lg" open={true}>
      <DialogTitle>{t("eventListSort")}</DialogTitle>
      <DialogContent>
        <div className="event-list-sort-container">
          {fields.map((field) => {
            const foundSortIndex = currentSorts.findIndex((s) => s.id === field.id);
            return (
              <div>
                <div>
                  {(() => {
                    if (field.id === "eventDate") {
                      return programStage.executionDateLabel;
                    }
                    if (field.id === "status" || field.id === "lastUpdated") {
                      return t(field.id);
                    }
                    if (field.type === "dataElement") {
                      return field.displayFormName;
                    }
                  })()}
                </div>
                <div>
                  <Input
                    disableClearable
                    value={foundSortIndex === -1 ? null : currentSorts[foundSortIndex].value}
                    valueType="TEXT"
                    valueSet={[
                      { label: t("noSortApplied"), value: null },
                      { label: t("ascending"), value: "asc" },
                      { label: t("descending"), value: "desc" }
                    ]}
                    change={(value) => {
                      if (foundSortIndex === -1) {
                        currentSorts.push({ type: field.type, id: field.id, value });
                      } else {
                        currentSorts[foundSortIndex] = { type: field.type, id: field.id, value };
                      }
                      setCurrentSorts([...currentSorts]);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setSort("dialog", false);
            setSort("sorts", currentSorts);
            setPaging("page", 1);
            fetchEvents();
          }}
        >
          {t("ok")}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentSorts([]);
          }}
        >
          {t("clear")}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setSort("dialog", false);
          }}
        >
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SortDialog;
