import { useEffect, useState } from "react";
import { Button, TableFooter } from "@mui/material";
import { Loader } from "@/ui/common";
import { useTranslation } from "react-i18next";
import withModuleSection from "@/hocs/withModuleSection";
import FilterDialog from "./FilterDialog";
import moment from "moment";
import { convertDisplayValue, pickTranslation } from "@/utils/utils";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import configs from "@/configs";
import { tracker } from "@/api";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataTable, DataTableHead, DataTableBody, DataTableRow, DataTableColumnHeader, DataTableCell, Pagination } from "@dhis2/ui";
import useTrackerCaptureStore from "@/state/trackerCapture";
const { VITE_CONFIG_NAME, VITE_DATE_FORMAT, VITE_TRACKER_API } = import.meta.env;
const { getTeis, getTeiById } = tracker;
import _ from "lodash";
import "./List.css";

const List = (prop) => {
  const [sort, setSort] = useState({});
  const { customTeiListColumns } = configs[VITE_CONFIG_NAME];
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets, orgUnits, me } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets, orgUnits: state.orgUnits, me: state.me }),
    shallow
  );
  const locale = me.settings.keyUiLocale;
  const { teis, filter, paging, actions, data } = useTrackerCaptureStore(
    (state) => ({ teis: state.teis, actions: state.actions, filter: state.filter, paging: state.paging, data: state.data }),
    shallow
  );
  const { page, pageSize, pageCount, total } = paging;
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
        return pickTranslation(foundOption, locale, "name");
      } else {
        return value;
      }
    } else if (tea.valueType === "ORGANISATION_UNIT") {
      const foundOu = orgUnits.find((ou) => ou.id === value);
      return pickTranslation(foundOu, locale, "name");
    } else {
      return convertDisplayValue(tea, value, t);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getTeis(program.id, orgUnit.id, paging, filter.filters, teiFilter);
      const data = result.instances.map((tei) => {
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
      setPaging("pageCount", result.pageCount);
      setPaging("total", result.total);
      setTeis(data);
      setLoading(false);
    })();
  }, [page, pageSize, filter.lastUpdated, orgUnit ? orgUnit.id : null, program ? program.id : null, teiFilter ? teiFilter.id : null]);

  useEffect(() => {
    let newTeis = [];
    if (Object.keys(sort).length > 0) {
      const tea = Object.keys(sort)[0];
      const direction = sort[tea];
      if (direction === "asc") {
        newTeis = _.sortBy(teis, tea).reverse();
      } else if (direction === "desc") {
        newTeis = _.sortBy(teis, tea);
      } else {
        newTeis = _.sortBy(teis, "enrollmentDate");
      }
    } else {
      newTeis = _.sortBy(teis, "enrollmentDate");
    }
    setTeis([...newTeis]);
  }, [JSON.stringify(sort)]);

  const columns = currentTeas.map((tea) => {
    return { name: tea.id, header: tea.displayFormName, defaultFlex: 1 };
  });

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
      <div className="tracker-list-container">
        <div className="tracker-list-table-container">
          <DataTable>
            <DataTableHead>
              <DataTableRow>
                {columns.map((column) => {
                  return (
                    <DataTableColumnHeader
                      sortDirection={sort[column.name] ? sort[column.name] : "default"}
                      name={column.name}
                      fixed
                      top="0"
                      onSortIconClick={(sort) => {
                        setSort({ [sort.name]: sort.direction });
                      }}
                    >
                      {column.header}
                    </DataTableColumnHeader>
                  );
                })}
                <DataTableColumnHeader fixed top="0" sx={{ fontWeight: "bold", fontSize: 13 }}>
                  {t("status")}
                </DataTableColumnHeader>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {teis.map((tei) => {
                const colorMapping = {
                  ACTIVE: "#ed6c02",
                  COMPLETED: "#2e7d32",
                  CANCELLED: "#fccaca"
                };
                return (
                  <DataTableRow
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
                      console.log(column);
                      return <DataTableCell>{tei[column.name]}</DataTableCell>;
                    })}
                    <DataTableCell sx={{ color: colorMapping[tei.status], fontWeight: "bold" }}>{t(tei.status)}</DataTableCell>
                  </DataTableRow>
                );
              })}
            </DataTableBody>
            {/* <TableFooter>{renderPaginationToolbar()}</TableFooter> */}
          </DataTable>
        </div>
        <div className="tracker-list-pagination-container">
          <Pagination
            hidePageSummary={false}
            pageSizeSelectText={t("pageSize")}
            pageSelectText={t("page")}
            nextPageText={t("nextPage")}
            previousPageText={t("previousPage")}
            pageSizes={["1000"]}
            onPageChange={(page) => {
              setPaging("page", page);
            }}
            pageCount={pageCount}
            total={total}
            page={page}
            pageSize={1000}
          />
        </div>
      </div>
    ),
    filter.dialog && <FilterDialog />
  ];
};

export default withModuleSection(List, "teiList");
