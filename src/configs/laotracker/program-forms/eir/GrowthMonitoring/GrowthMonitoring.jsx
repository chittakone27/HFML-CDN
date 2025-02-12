import { Box, Table, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useGrowthMonitorRules from "./rules/useGrowthMonitorRules";
import useDetailSectionRules from "./rules/useDetailSectionRules";
import useChildNutritionStatusRules from "./rules/useChildNutritionStatusRules";
import {
  withEventDate,
  RowMapper,
  SectionCollapse
} from "@/configs/lao/program-forms/common/tracker";
//
import { GROWTH_MONITOR_ID, CHILD_NUTRI_STATUS_SECTION_ID } from "./const";
import { CHILD_NUTRI_SECTION_UI } from "./mapping";
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
  const { hiddenFields } = useGrowthMonitorRules();
  // console.log(hiddenFields);
  useDetailSectionRules();
  const childNutriDeProps = useChildNutritionStatusRules();
  // console.log(childNutriDeProps);

  return (
    <Box className="eir-growth-monitor-form">
      {programStageSections.map((pss) => {
        const tableConfigs = pss.dataElements
          .filter((de) => !hiddenFields.includes(de.id))
          .map((de) => [{ id: de.id }]);
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
                {CHILD_NUTRI_SECTION_UI.map((col) => {
                  const finalConfigs = col["colConfigs"].map((de) => {
                    const currConfigObj = de[0];
                    const newConfigObj = {
                      ...currConfigObj,
                      fieldProps: {
                        ...currConfigObj?.fieldProps,
                        ...childNutriDeProps[currConfigObj.id]
                      }
                    };
                    return [newConfigObj];
                  });
                  // console.log(finalConfigs);
                  return (
                    <SectionCollapse
                      title={col["colTitle"]}
                      sx={{ m: 0.5, width: "50%" }}
                      disabledCollapse
                    >
                      <Table sx={{ height: "auto" }}>
                        <TableBody>
                          <RowMapper
                            rows={finalConfigs}
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
