import { Box, Table, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useSelectionStore from "@/state/selection";

import {
  withEventDate,
  RowMapper,
  SectionCollapse
} from "@/configs/lao/program-forms/common/tracker";
//
import { GROWTH_MONITOR_ID, CHILD_NUTRI_STATUS_SECTION_ID } from "./const";
//
import "./GrowthMonitoring.css";
import "../eir.css";

const GrowthMonitoring = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );
  const growthMonitorStage = program.programStages.find(
    (progState) => progState.id === GROWTH_MONITOR_ID
  );
  const { programStageSections } = growthMonitorStage;
  // console.log(programStageSections);

  return (
    <Box className="eir-form">
      {programStageSections.map((pss) => {
        const tableConfigs = pss.dataElements.map((de) => [{ id: de.id }]);
        if (pss.id === CHILD_NUTRI_STATUS_SECTION_ID) {
          return (
            <SectionCollapse
              key={pss.id}
              title={t(pss.displayName)}
              disabledCollapse
              sx={{
                marginBottom: "10px"
              }}
            >
              <div className="child-nutri-container">
                <SectionCollapse
                  title={"AchiAcho"}
                  sx={{ mt: 0.5 }}
                  disabledCollapse
                >
                  <Table>
                    <TableBody>
                      sdsdsdsdsdsds
                      {/* <RowMapper
                rows={tableConfigs}
                tableName={"Growth monitoring details"}
                context="event"
              /> */}
                    </TableBody>
                  </Table>
                </SectionCollapse>
              </div>
            </SectionCollapse>
          );
        } else {
          return (
            <SectionCollapse
              key={pss.id}
              title={t(pss.displayName)}
              disabledCollapse
              sx={{
                marginBottom: "10px"
              }}
            >
              <Table>
                <TableBody>
                  <RowMapper
                    rows={tableConfigs}
                    tableName={"Growth monitoring details"}
                    context="event"
                  />
                </TableBody>
              </Table>
            </SectionCollapse>
          );
        }
      })}
    </Box>
  );
};

export default withEventDate(GrowthMonitoring, "eventDate");
