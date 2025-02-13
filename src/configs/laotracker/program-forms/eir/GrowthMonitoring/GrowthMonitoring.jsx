<<<<<<< HEAD
import { Box, Table, TableBody } from "@mui/material";
import DataValueField from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
//
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useGrowthMonitorRules from "./useGrowthMonitorRules";
//
import {
  withEventDate,
  RowMapper,
  SectionCollapse
} from "@/configs/lao/program-forms/common/tracker";
//
import {
  GROWTH_MONITOR_ID,
  CHILD_NUTRI_STATUS_SECTION_ID,
  CHILD_SYMPS_TREAT_SECTION_ID,
  MEDIC_SYMPTOM_IDS,
  DISABLED_FIELDS,
  sectionTitleStyling,
  sectionCollapseStyling
} from "./const";
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
  const { hiddenFields } = useGrowthMonitorRules();

  const renderSectionContents = (pss, tableConfigs) => {
    switch (pss.id) {
      case CHILD_NUTRI_STATUS_SECTION_ID:
        return (
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
        );
      case CHILD_SYMPS_TREAT_SECTION_ID:
        // console.log(tableConfigs);
        const tempNewConfigs = tableConfigs.filter(
          (cellConfig) =>
            cellConfig[0]["id"] === "SsTzQsXnzQB" ||
            !MEDIC_SYMPTOM_IDS.includes(cellConfig[0]["id"])
        );
        const newConfigs = tempNewConfigs.map((oldConfig) => {
          if (oldConfig[0]["id"] === "SsTzQsXnzQB") {
            return [
              { display: "text", text: t("medicSymps") },
              {
                customCellProp: {
                  sx: {
                    width: "78%"
                  }
                },
                customCell: (
                  <div className="medical-symps-container">
                    {MEDIC_SYMPTOM_IDS.map((id) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <DataValueField dataElement={id} />
                          <DataValueLabel dataElement={id} />
                        </div>
                      );
                    })}
                  </div>
                )
              }
            ];
          } else {
            return oldConfig;
          }
        });
        console.log(newConfigs);
        return (
          <Table>
            <TableBody>
              <RowMapper
                rows={newConfigs}
                tableName={pss.displayName}
                context="event"
              />
            </TableBody>
          </Table>
        );
      default:
        return (
          <Table>
            <TableBody>
              <RowMapper
                rows={tableConfigs}
                tableName={pss.displayName}
                context="event"
              />
            </TableBody>
          </Table>
        );
    }
  };

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
        return (
          <SectionCollapse
            key={pss.id}
            title={t(pss.displayName)}
            titleStyling={sectionTitleStyling}
            disabledCollapse
            sx={sectionCollapseStyling}
          >
            {renderSectionContents(pss, tableConfigs)}
          </SectionCollapse>
        );
      })}
    </Box>
  );
};

export default withEventDate(GrowthMonitoring, "eventDate");
=======
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
>>>>>>> eir-growth-monitor
