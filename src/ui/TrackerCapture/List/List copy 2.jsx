import { useEffect, useState } from "react";
import { Button, TableFooter } from "@mui/material";
import { Loader } from "@/ui/common";
import { useTranslation } from "react-i18next";
import withModuleSection from "@/hocs/withModuleSection";
import FilterDialog from "./FilterDialog";
import moment from "moment";
import { convertDisplayValue } from "@/utils/utils";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import configs from "@/configs";
import { tracker } from "@/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useTrackerCaptureStore from "@/state/trackerCapture";
const { VITE_CONFIG_NAME, VITE_DATE_FORMAT, VITE_TRACKER_API } = import.meta.env;
const { getTeis, getTeiById } = tracker;
import "./List.css";

const List = (prop) => {
  const { customTeiListColumns } = configs[VITE_CONFIG_NAME];
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets, orgUnits } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets, orgUnits: state.orgUnits }),
    shallow
  );
  const { teis, filter, paging, actions, data } = useTrackerCaptureStore(
    (state) => ({ teis: state.teis, actions: state.actions, filter: state.filter, paging: state.paging, data: state.data }),
    shallow
  );
  const { page } = paging;
  const { setTeis, setFilter, setLayout, setPaging, initData } = actions;
  const { teiFilter } = data;
  const currentTeas = program.programTrackedEntityAttributes
    .filter((ptea) => ptea.displayInList)
    .map((ptea) => {
      const foundTea = trackedEntityAttributes.find((tea) => tea.id === ptea.trackedEntityAttribute.id);
      return foundTea;
    });

  const convertValue = (tea, value) => {
    const foundOptionSet = tea.optionSet ? optionSets.find((os) => os.id === tea.optionSet.id) : null;
    if (foundOptionSet) {
      const foundOption = foundOptionSet.options.find((o) => o.code === value);
      if (foundOption) {
        return foundOption.displayName;
      } else {
        return value;
      }
    } else if (tea.valueType === "ORGANISATION_UNIT") {
      const foundOu = orgUnits.find((ou) => ou.id === value);
      return foundOu ? foundOu.displayName : value;
    } else {
      return convertDisplayValue(tea, value, t);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getTeis(program.id, orgUnit.id, page, filter.filters, teiFilter);
      const data = result.map((tei) => {
        let row = {};
        const foundEnrollment = tei.enrollments.find((enr) => enr.program === program.id);
        currentTeas.forEach((tea) => {
          const foundAttribute = tei.attributes.find((attr) => attr.attribute === tea.id);
          if (foundAttribute) {
            row[tea.id] = convertValue(tea, foundAttribute.value);
          }
          row.id = VITE_TRACKER_API === "new" ? tei.trackedEntity : tei.trackedEntityInstance;
          row.status = foundEnrollment.status;
          row.enrollmentDate = VITE_TRACKER_API === "new" ? foundEnrollment.enrolledAt : foundEnrollment.enrollmentDate;
        });
        if (customTeiListColumns && customTeiListColumns[program.id]) {
          customTeiListColumns[program.id].forEach((column) => {
            row[column.id] = column.render(tei, t);
          });
        }

        return row;
      });
      setTeis(data);
      setLoading(false);
    })();
  }, [page, filter.lastUpdated, orgUnit ? orgUnit.id : null, program ? program.id : null, teiFilter ? teiFilter.id : null]);

  const columns = currentTeas.map((tea) => {
    return { name: tea.id, header: tea.displayFormName, defaultFlex: 1 };
  });

  const renderPaginationToolbar = () => {
    return (
      <div className="tracker-list-pagination-toolbar">
        <Button
          sx={{ width: 170 }}
          variant="contained"
          onClick={() => {
            if (page === 1) return;
            setPaging("page", page - 1);
          }}
        >
          {t("previousPage")}
        </Button>
        &nbsp;&nbsp;
        <Button
          sx={{ width: 170 }}
          variant="contained"
          onClick={() => {
            setPaging("page", page + 1);
          }}
        >
          {t("nextPage")}
        </Button>
      </div>
    );
  };

  const rowClick = async (rowProps, event) => {
    setLoading(true);
    const result = await getTeiById(program.id, rowProps.data.id);

    initData(result, program.id, orgUnit.id);
    setLayout("layout", "layout3");
    setLoading(false);
    return result;
  };

  return [
    loading ? (
      <Loader>{t("loading")}</Loader>
    ) : (
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell sx={{ fontWeight: "bold", fontSize: 13 }}>{column.header}</TableCell>;
            })}
            <TableCell sx={{ fontWeight: "bold", fontSize: 13 }}>{t("status")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teis.map((tei) => {
            const colorMapping = {
              ACTIVE: "#ed6c02",
              COMPLETED: "#2e7d32",
              CANCELLED: "#fccaca"
            };
            return (
              <TableRow
                // sx={{ backgroundColor: colorMapping[tei.status] }}
                hover
                onClick={async () => {
                  setLoading(true);
                  const result = await getTeiById(program.id, tei.id);
                  initData(result, program.id, orgUnit.id);
                  setLayout("layout", "layout3");
                  setLoading(false);
                }}
              >
                {columns.map((column) => {
                  return <TableCell>{tei[column.name]}</TableCell>;
                })}
                <TableCell sx={{ color: colorMapping[tei.status], fontWeight: "bold" }}>{t(tei.status)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>{renderPaginationToolbar()}</TableFooter>
      </Table>
    ),
    filter.dialog && <FilterDialog />
  ];
};

export default withModuleSection(List, "teiList");
