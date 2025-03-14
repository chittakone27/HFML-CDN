import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataTable, TableHead, DataTableRow, DataTableColumnHeader, DataTableCell, TableBody } from "@dhis2/ui";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { convertDisplayValue, pickTranslation } from "@/utils/utils";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import _ from "lodash";
import { format } from "date-fns";
import { tracker } from "@/api";
const { getTeiById } = tracker;
const SearchResultDialog = ({ open, setSearchResultDialog, setSearchDialog, result }) => {
  const [sort, setSort] = useState({
    oVwa5LfjnvA: "asc"
  });
  const { t } = useTranslation();
  const { actions, layout } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      layout: state.layout
    }))
  );
  const { setLayout, initData, register } = actions;

  const { trackedEntityAttributes, optionSets, orgUnits, me } = useMetadataStore(
    useShallow((state) => ({
      optionSets: state.optionSets,
      trackedEntityAttributes: state.trackedEntityAttributes,
      orgUnits: state.orgUnits,
      me: state.me
    }))
  );
  const locale = me.settings.keyUiLocale;
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const teas = program.programTrackedEntityAttributes
    .filter((ptea) => {
      return ptea.displayInList || ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"].includes(ptea.trackedEntityAttribute.id);
    })
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return foundTea;
    });

  const convertValue = (tea, value) => {
    const foundOptionSet = tea.optionSet ? optionSets.find((os) => os.id === tea.optionSet.id) : null;
    if (foundOptionSet) {
      const foundOption = foundOptionSet.options.find((o) => o.code === value);
      if (foundOption) {
        return pickTranslation(foundOption, locale, "name");
      } else {
        return value;
      }
    } else if (tea.valueType === "ORGANISATION_UNIT") {
      const foundOu = orgUnits.find((ou) => ou.id === value);
      return foundOu ? pickTranslation(foundOu, locale, "name") : value;
    } else {
      return convertDisplayValue(tea, value, t);
    }
  };

  const toggleSort = (tea, direction) => {
    if (direction === "default") {
      setSort({});
      return;
    }
    const newSort = { [tea]: direction };
    setSort({ ...newSort });
  };

  const load = async (tei) => {
    const result = await getTeiById(program.id, tei);
    initData(result, program.id, orgUnit.id);
    setLayout("layout", "layout3");
    setSearchResultDialog(false);
    setSearchDialog(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={false}
      onClose={() => {
        setSearchResultDialog(false);
      }}
    >
      <DialogTitle>{t("searchResult")}</DialogTitle>
      <DialogContent>
        <DataTable>
          <TableHead>
            <DataTableRow>
              {teas.map((tea) => {
                return (
                  <DataTableColumnHeader
                    fixed
                    top="0"
                    name={tea.displayFormName}
                    onSortIconClick={(object) => {
                      toggleSort(tea.id, object.direction);
                    }}
                    sortDirection={sort[tea.id] ? sort[tea.id] : "default"}
                  >
                    {tea.displayFormName}
                  </DataTableColumnHeader>
                );
              })}
            </DataTableRow>
          </TableHead>
          <TableBody>
            {(() => {
              let rows = result.map((tei) => {
                const row = {
                  tei: tei.trackedEntityInstance
                };
                teas.forEach((tea) => {
                  const foundValue = tei.attributes.find((attr) => attr.attribute === tea.id);
                  row[tea.id] = convertValue(tea, foundValue ? foundValue.value : "");
                });
                return row;
              });
              if (Object.keys(sort).length > 0) {
                const direction = sort[Object.keys(sort)[0]];
                rows = _.sortBy(rows, Object.keys(sort)[0]);
                if (direction === "desc") {
                  rows = rows.reverse();
                }
              }
              return rows.map((row) => {
                return (
                  <DataTableRow
                    onClick={() => {
                      load(row.tei);
                    }}
                  >
                    {teas.map((tea) => {
                      return <DataTableCell style={{ fontSize: 13, padding: 5 }}>{row[tea.id]}</DataTableCell>;
                    })}
                  </DataTableRow>
                );
              });
            })()}
          </TableBody>
        </DataTable>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={layout.disableRegisterButton}
          variant="contained"
          onClick={() => {
            const currentDate = format(new Date(), "yyyy-MM-dd");
            register(currentDate, currentDate);
            setLayout("layout", "layout2");
            setSearchResultDialog(false);
            setSearchDialog(false);
          }}
        >
          {t("register")}
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="error"
          onClick={() => {
            setSearchResultDialog(false);
          }}
        >
          {t("cancel")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SearchResultDialog;
