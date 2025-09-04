import { Box, Table, TableBody, TableRow, TableCell, Typography, Alert } from "@mui/material";
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

const NOTE_AFTER_ID = "ATIQuAZ9lU0";
const NOTE_TEXT =
  'ຈໍານວນຢາ/ອາຫານເສີມ ທີ່ສະຖານທີ່ບໍລິການຈ່າຍໃຫ້ແກ່ຜູ້ປ່ວຍ ບໍ່ລວມຈຳນວນຢາທີ່ຂຽນໃບສັ່ງໃຫ້ຜູ້ປ່ວຍໄປຊື້ຢູ່ນອກ.';

const SickChild = () => {
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
  useDetailSectionRules();
  const childNutriDeProps = useChildNutritionStatusRules();

  return (
    <Box className="eir-growth-monitor-form">
      {programStageSections.map((pss) => {
        const visibleDes = pss.dataElements.filter((de) => !hiddenFields.includes(de.id));

        if (pss.id === CHILD_NUTRI_STATUS_SECTION_ID) {
          return (
            <SectionCollapse
              key={pss.id}
              title={t(pss.displayName)}
              disabledCollapse
              sx={{ marginBottom: "10px" }}
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
                  return (
                    <SectionCollapse
                      key={col["colTitle"]}
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
        }

        // default sections: inject an Alert row after NOTE_AFTER_ID if visible
        const tableConfigs = visibleDes.map((de) => [{ id: de.id }]);
        const noteIndex = visibleDes.findIndex((de) => de.id === NOTE_AFTER_ID);

        return (
          <SectionCollapse
            key={pss.id}
            title={t(pss.displayName)}
            disabledCollapse
            sx={{ marginBottom: "10px" }}
          >
            <Table>
              <TableBody>
                {noteIndex === -1 ? (
                  <RowMapper rows={tableConfigs} tableName={pss.displayName} context="event" />
                ) : (
                  <>
                    <RowMapper
                      rows={tableConfigs.slice(0, noteIndex + 1)}
                      tableName={pss.displayName}
                      context="event"
                    />
                    <TableRow>
                      <TableCell sx={{ border: 0, pt: 0, pb: 1 }} colSpan={1000}>
                        <Alert
                          severity="info"
                          icon={false}
                          sx={{
                            borderRadius: 2,
                            "& .MuiAlert-message": { width: "100%" },
                            py: 0.75,
                            px: 1.25,
                          }}
                        >
                          <Typography variant="body2">{NOTE_TEXT}</Typography>
                        </Alert>
                      </TableCell>
                    </TableRow>
                    <RowMapper
                      rows={tableConfigs.slice(noteIndex + 1)}
                      tableName={pss.displayName}
                      context="event"
                    />
                  </>
                )}
              </TableBody>
            </Table>
          </SectionCollapse>
        );
      })}
    </Box>
  );
};

export default withEventDate(SickChild, "eventDate");
