import { Table, TableBody, TableCell, TableContainer, TableHead, Pagination, TableRow, Chip } from "@mui/material";
import { Loader } from "@/ui/common";
import { useTranslation } from "react-i18next";
import { faArrowUpLong, faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import withModuleSection from "@/hocs/withModuleSection";
import FilterDialog from "./FilterDialog";
import SortDialog from "./SortDialog";
import { format } from "date-fns";
import { convertDisplayValue } from "@/utils/utils";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import configs from "@/configs";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
const { VITE_CONFIG_NAME, VITE_DATE_FORMAT, VITE_TRACKER_API } = import.meta.env;
const { customEventListColumns, defaultEventListSorts } = configs[VITE_CONFIG_NAME];

const List = ({ loading }) => {
  const { t } = useTranslation();
  const { events, paging, filter, sort, currentEvent, layout } = useEventCaptureStore(
    (state) => ({
      events: state.events,
      paging: state.paging,
      filter: state.filter,
      sort: state.sort,
      currentEvent: state.currentEvent,
      layout: state.layout
    }),
    shallow
  );
  const { dataElements, optionSets, orgUnits } = useMetadataStore(
    (state) => ({
      program: state.program,
      dataElements: state.dataElements,
      optionSets: state.optionSets,
      orgUnits: state.orgUnits
    }),
    shallow
  );
  const { setPaging, setSort, fetchEvents, open, setConvertedEvents } = useEventCaptureStore((state) => state.actions);
  const { program } = useSelectionStore(
    (state) => ({
      program: state.program
    }),
    shallow
  );
  const programStage = program.programStages[0];

  const generateDataElementColumn = (dataElement) => {
    const foundDe = dataElements.find((de) => de.id === dataElement);
    if (!foundDe) console.log(dataElement);
    const foundOptionSet = foundDe.optionSet ? optionSets.find((os) => os.id === foundDe.optionSet.id) : null;
    return {
      minWidth: 150,
      id: foundDe.id,
      label: foundDe.displayFormName,
      format: (value) => {
        if (foundOptionSet) {
          const foundOption = foundOptionSet.options.find((o) => o.code === value);
          if (foundOption) {
            return foundOption.displayName;
          } else {
            return value;
          }
        } else {
          return convertDisplayValue(foundDe, value, t);
        }
      }
    };
  };

  const generateDefaultColumn = (id) => {
    switch (id) {
      case "lastUpdated":
        return {
          minWidth: 150,
          id: "lastUpdated",
          label: t("lastUpdated"),
          format: (value) => {
            return value ? format(new Date(value), VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd") : "";
          }
        };
      case "eventDate":
        return {
          minWidth: 150,
          id: "eventDate",
          label: programStage.displayExecutionDateLabel
            ? programStage.displayExecutionDateLabel
            : programStage.executionDateLabel
            ? programStage.executionDateLabel
            : t("eventDate"),
          format: (value) => {
            return value ? format(new Date(value), VITE_DATE_FORMAT ? VITE_DATE_FORMAT : "yyyy-MM-dd") : "";
          }
        };
      case "status":
        return {
          minWidth: 150,
          id: "status",
          label: t("status"),
          format: (value) => {
            return value === "COMPLETED" ? (
              <Chip label={<strong>{t("completed")}</strong>} color="success" size="small" />
            ) : (
              <Chip label={<strong>{t("notCompleted")}</strong>} color="warning" size="small" />
            );
          }
        };
      case "statusLabel":
        return {
          minWidth: 150,
          id: "statusLabel",
          label: t("statusLabel"),
          format: (value) => {
            return value === "COMPLETED" ? t("completed") : t("notCompleted");
          }
        };
      case "orgUnit":
        return {
          minWidth: 150,
          id: "orgUnit",
          label: t("orgUnit"),
          format: (value) => {
            const foundOu = orgUnits.find((ou) => ou.id === value);
            return foundOu ? foundOu.displayName : "";
          }
        };
    }
    columns.unshift();
  };

  const generateDefaultColumns = () => {
    let columns = programStage.programStageDataElements
      .filter((psde) => psde.displayInReports)
      .map((psde) => {
        return generateDataElementColumn(psde.dataElement.id);
      });
    // columns.unshift({
    //   minWidth: 150,
    //   id: "orgUnitName",
    //   label: t("orgUnit"),
    //   format: (value) => {
    //     return value;
    //   }
    // });
    const defaultColumns = ["eventDate", "orgUnit", "lastUpdated", "status", "statusLabel"];
    defaultColumns.forEach((column) => {
      if (!layout.hiddenEventListColumns.includes(column)) {
        columns.unshift(generateDefaultColumn(column));
      }
    });
    return columns;
  };

  const generateCustomColumn = () => {};

  const generateCustomColumns = () => {
    const customColumns = customEventListColumns[program.id];
    return customColumns.map((column) => {
      switch (column.type) {
        case "dataElement":
          return generateDataElementColumn(column.id);
        case "default":
          return generateDefaultColumn(column.id);
        case "custom":
          return column.generate(t);
      }
    });
  };

  const columns = customEventListColumns[program.id] ? generateCustomColumns(customEventListColumns[program.id]) : generateDefaultColumns();

  const handleRowClick = async (eventId) => {
    if (eventId !== currentEvent.event && !layout.formLoading) {
      open(eventId);
    }
  };

  useEffect(() => {
    if (defaultEventListSorts && program && defaultEventListSorts[program.id]) {
      setSort("sorts", [defaultEventListSorts[program.id]]);
    } else {
      setSort("sorts", [{ type: "property", id: "lastUpdated", value: "desc" }]);
    }
  }, [program ? program.id : null]);

  const convertedRows = () => {
    const rows = [];
    events.rows &&
      events.rows.forEach((event) => {
        const row = {};
        if (VITE_TRACKER_API === "new") {
          row.event = event.event;
          columns.forEach((column) => {
            if (column.id === "lastUpdated") {
              row.lastUpdated = column.format(event.updatedAt);
            } else if (column.id === "eventDate") {
              row.eventDate = column.format(event.occurredAt);
            } else if (column.id === "status") {
              row.status = column.format(event.status);
            } else if (column.id === "statusLabel") {
              row.statusLabel = column.format(event.status);
            } else if (column.id === "orgUnit") {
              row.orgUnit = column.format(event.orgUnit);
            } else if (column.type === "custom") {
              row[column.id] = column.format(event);
            } else {
              const foundDataValue = event
                ? event.dataValues.find((dv) => {
                    return dv.dataElement === column.id;
                  })
                : null;
              row[column.id] = foundDataValue ? column.format(foundDataValue.value) : "";
            }
          });
          rows.push(row);
        } else {
          row.event = event[0];
          columns.forEach((column) => {
            const foundIndex = events.headers.findIndex((h) => h.name === column.id);
            const foundDataValue = event ? event[foundIndex] : null;
            row[column.id] = foundDataValue && column.format(foundDataValue);
          });
          rows.push(row);
        }
      });
    setConvertedEvents(rows);
    return rows;
  };

  return (
    <>
      <div className="table-container">
        {loading ? (
          <Loader>{t("loading")}</Loader>
        ) : (
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {columns
                    .filter((column) => !["statusLabel", "orgUnit", "event"].includes(column.id))
                    .map((column) => {
                      const foundSort = sort.sorts.find((s) => s.id === column.id);
                      const sortType = foundSort ? foundSort.value : null;
                      const generateNextSortType = () => {
                        if (sortType === null) {
                          return "desc";
                        }
                        if (sortType === "desc") {
                          return "asc";
                        }
                        if (sortType === "asc") {
                          return null;
                        }
                      };
                      return (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth, width: "auto", cursor: "pointer" }}
                          onClick={() => {
                            setSort("sorts", [
                              {
                                id: column.id,
                                value: generateNextSortType()
                              }
                            ]);
                            fetchEvents();
                          }}
                        >
                          {column.label}&nbsp;&nbsp;
                          {sortType &&
                            (sortType === "asc" ? (
                              <FontAwesomeIcon icon={faArrowUpLong} fontSize={15} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowDownLong} fontSize={15} />
                            ))}
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {convertedRows().map((row) => {
                  return (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      hover
                      key={row.event}
                      onClick={(event) => {
                        if (event.target.tagName === "TD") {
                          handleRowClick(row.event);
                        }
                      }}
                    >
                      {(() => {
                        return Object.keys(row)
                          .filter((key) => !["statusLabel", "orgUnit", "event"].includes(key))
                          .map((key) => {
                            return <TableCell key={key}>{row[key]}</TableCell>;
                          });
                      })()}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div className="table-pagination-container">
        <Pagination
          disabled={loading}
          page={paging.page}
          shape="rounded"
          count={paging.totalPages}
          size="small"
          showFirstButton
          showLastButton
          onChange={(event, value) => {
            setPaging("page", value);
            fetchEvents();
          }}
        />
      </div>
      {filter.dialog && <FilterDialog />}
      {sort.dialog && <SortDialog />}
    </>
  );
};

export default withModuleSection(List, "eventList");
