import { useEffect, useState } from "react";
import { Chip, Tooltip } from "@mui/material";
import List from "../List/List";
import FilterButton from "./FilterButton";
import DownloadExcelButton from "./DownloadExcelButton";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useTranslation } from "react-i18next";
import "./Layout1.css";

const Layout1 = () => {
  const [ready, setReady] = useState(false);
  const { t } = useTranslation();
  const { trackedEntityInstanceFilters } = useMetadataStore(
    (state) => ({ trackedEntityInstanceFilters: state.trackedEntityInstanceFilters }),
    shallow
  );
  const { program } = useSelectionStore((state) => ({ program: state.program }), shallow);
  const { actions, data } = useTrackerCaptureStore((state) => ({ actions: state.actions, data: state.data }), shallow);
  const { teiFilter } = data;
  let currentTeiFilters = trackedEntityInstanceFilters.filter((teiF) => teiF.program.id === program.id);
  if (currentTeiFilters.length === 0) {
    currentTeiFilters = [
      {
        displayName: t("all"),
        displayDescription: t("allClientsDescription")
      }
    ];
  }

  useEffect(() => {
    actions.selectTeiFilter(currentTeiFilters[0]);
    setReady(true);
  }, [program.id]);

  return (
    <div className="tracker-capture-layout1-container">
      <div>
        {currentTeiFilters.map((ctf) => (
          <Tooltip title={<div style={{ fontSize: 14 }}>{ctf.displayDescription}</div>} arrow>
            <Chip
              color={teiFilter && teiFilter.id === ctf.id ? "teal" : "default"}
              label={ctf.displayName}
              onClick={() => {
                actions.selectTeiFilter(ctf);
              }}
            />
          </Tooltip>
        ))}
      </div>
      <div>{ready && <List buttons={[<DownloadExcelButton key="downloadExcelButton" />, <FilterButton key="filterButton" />]} />}</div>
    </div>
  );
};

export default Layout1;
