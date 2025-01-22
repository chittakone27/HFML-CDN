import { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "./List.css";
import useTrackerCaptureStore from "@/state/trackerCapture";
const { VITE_CONFIG_NAME, VITE_DATE_FORMAT, VITE_TRACKER_API } = import.meta.env;
const { getTeis, getTeiById } = tracker;

const List = (prop) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { program, orgUnit } = useSelectionStore((state) => ({ program: state.program, orgUnit: state.orgUnit }), shallow);
  const { trackedEntityAttributes, optionSets } = useMetadataStore(
    (state) => ({ trackedEntityAttributes: state.trackedEntityAttributes, optionSets: state.optionSets }),
    shallow
  );
  const { teis, filter, paging, actions } = useTrackerCaptureStore(
    (state) => ({ teis: state.teis, actions: state.actions, filter: state.filter, paging: state.paging }),
    shallow
  );
  const { page } = paging;
  const { setTeis, setFilter, setLayout, setPaging, initData } = actions;
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
    } else {
      return convertDisplayValue(tea, value, t);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getTeis(program.id, orgUnit.id, page, filter.filters);
      // if (result.length === 0) {
      //   setLoading(false);
      //   setPaging("page", page - 1);
      //   return;
      // }
      const data = result.map((tei) => {
        let row = {};
        currentTeas.forEach((tea) => {
          const foundAttribute = tei.attributes.find((attr) => attr.attribute === tea.id);
          if (foundAttribute) {
            row[tea.id] = convertValue(tea, foundAttribute.value);
          }
          row.id = tei.trackedEntityInstance;
        });
        return row;
      });
      setTeis(data);
      setLoading(false);
    })();
  }, [page, filter.lastUpdated]);

  const columns = currentTeas.map((tea) => {
    return { name: tea.id, header: tea.displayFormName, defaultFlex: 1 };
  });

  const renderPaginationToolbar = () => {
    return (
      <div className="tracker-list-pagination-toolbar">
        <div>
          <Button
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
            variant="contained"
            onClick={() => {
              setPaging("page", page + 1);
            }}
          >
            {t("nextPage")}
          </Button>
        </div>
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
    <ReactDataGrid
      loading={loading}
      style={{ height: "100%" }}
      columns={columns}
      dataSource={teis}
      pagination
      renderPaginationToolbar={renderPaginationToolbar}
      onRowClick={rowClick}
    />,
    filter.dialog && <FilterDialog />
  ];
};

export default withModuleSection(List, "trackedEntityInstanceList");
