import { Box, Table, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useGrowthMonitorRules from "./useGrowthMonitorRules";

import {
  withEventDate,
  RowMapper,
  SectionCollapse
} from "@/configs/lao/program-forms/common/tracker";
//
import {
  GROWTH_MONITOR_ID,
  CHILD_NUTRI_STATUS_SECTION_ID,
  DISABLED_FIELDS
} from "./const";
import { CHILD_NUTRI_SECTION_UI } from "./mapping";
//
import "./GrowthMonitoring.css";
import "../eir.css";

const sectionTitleStyling = {
  fontWeight: "bold",
  fontSize: "0.925rem"
};

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
  const { hiddenFields } = useGrowthMonitorRules();

  return (
    <Box className="eir-form">
      {programStageSections.map((pss) => {
        const tableConfigs = pss.dataElements
          .filter((de) => !hiddenFields.includes(de.id))
          .map((de) => {
            if (DISABLED_FIELDS.includes(de.id)) {
              return [{ id: de.id, fieldProps: { disabled: true } }];
            } else {
              return [{ id: de.id }];
            }
          });
        if (pss.id === CHILD_NUTRI_STATUS_SECTION_ID) {
          return (
            <SectionCollapse
              key={pss.id}
              title={t(pss.displayName)}
              titleStyling={sectionTitleStyling}
              disabledCollapse
              sx={{
                marginBottom: "10px"
              }}
            >
              <div className="child-nutri-container">
                {CHILD_NUTRI_SECTION_UI.map((col) => {
                  return (
                    <SectionCollapse
                      title={col["colTitle"]}
                      sx={{ m: 0.5, width: "50%" }}
                      disabledCollapse
                    >
                      <Table>
                        <TableBody>
                          <RowMapper
                            rows={col["colConfigs"]}
                            tableName={col["colTitle"]}
                            context="event"
                          />
                        </TableBody>
                      </Table>
                    </SectionCollapse>
                  );
                })}
              </div>
            </SectionCollapse>
          );
        } else {
          return (
            <SectionCollapse
              key={pss.id}
              title={t(pss.displayName)}
              titleStyling={sectionTitleStyling}
              disabledCollapse
              sx={{
                marginBottom: "10px"
              }}
            >
              <Table>
                <TableBody>
                  <RowMapper
                    rows={tableConfigs}
                    tableName={pss.displayName}
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
