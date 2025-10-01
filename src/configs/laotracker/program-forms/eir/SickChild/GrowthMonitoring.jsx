import { Box, Table, TableBody, TableRow, TableCell, Typography, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react"; 
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useGrowthMonitorRules from "./rules/useGrowthMonitorRules";
// import useDetailSectionRules from "./rules/useDetailSectionRules";
import useChildNutritionStatusRules from "./rules/useChildNutritionStatusRules";
import useSickChildValidation from "./rules/useSickChildValidation";
import useMetadataStore from "@/state/metadata"; 
import { RowMapper, SectionCollapse } from "@/configs/lao/program-forms/common/tracker";
import { GROWTH_MONITOR_ID, CHILD_NUTRI_STATUS_SECTION_ID, GROWTH_MONITOR_DES } from "./const";
import { CHILD_NUTRI_SECTION_UI } from "./mapping";
import "./GrowthMonitoring.css";
import "../eir.css";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";

const NOTE_AFTER_ID = "ATIQuAZ9lU0";
const NOTE_TEXT =
  "ຈໍານວນຢາ/ອາຫານເສີມ ທີ່ສະຖານທີ່ບໍລິການຈ່າຍໃຫ້ແກ່ຜູ້ປ່ວຍ ບໍ່ລວມຈຳນວນຢາທີ່ຂຽນໃບສັ່ງໃຫ້ຜູ້ປ່ວຍໄປຊື້ຢູ່ນອກ.";

const { AGE_YEAR, AGE_MONTH, AGE_WEEK, AGE_DAYS } = GROWTH_MONITOR_DES;
const AGE_IDS = new Set([AGE_YEAR, AGE_MONTH, AGE_WEEK, AGE_DAYS]);

const TARGET_DES = new Set(["nvOV3SOzeAj", "RjNMwOqFNcE"]);
const ICD10_OPTIONSET_ID = "ZgqhnzhZZcQ";

const SickChild = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );

  const growthMonitorStage = program.programStages.find(
    (progState) => progState.id === GROWTH_MONITOR_ID
  );
  const { programStageSections } = growthMonitorStage;

  const { hiddenFields } = useGrowthMonitorRules();

  const childNutriDeProps = useChildNutritionStatusRules();
  const { fieldHelperProps } = useSickChildValidation();


  const { optionSets } = useMetadataStore(
    useShallow((s) => ({ optionSets: s.optionSets }))
  );

  const icd10ValueSet = useMemo(() => {
    const os = optionSets?.find((o) => o.id === ICD10_OPTIONSET_ID);
    if (!os?.options?.length) return [];
    return os.options.map((o) => {
      const lo = o.translations?.find(
        (tr) => tr.locale === "lo" && tr.property === "NAME"
      );
      const labels = [o.name]; 
      if (lo?.value) labels.unshift(lo.value); 
      return { value: o.code, label: labels.join(" | ") };
    });
  }, [optionSets]);

  const sectionHasAnyAge = (pss) => pss?.dataElements?.some((de) => AGE_IDS.has(de.id));

  return (
    <Box className="eir-growth-monitor-form">
      <EventDateFieldNoBlur type="eventDate" />
      <br />

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
                  const finalConfigs = col.colConfigs.map((de) => {
                    const curr = de[0];

                    const extra =
                      TARGET_DES.has(curr.id) && icd10ValueSet.length
                        ? { customValueSet: icd10ValueSet }
                        : {};

                    const merged = {
                      ...curr,
                      fieldProps: {
                        ...curr?.fieldProps,
                        ...childNutriDeProps[curr.id],
                        ...(fieldHelperProps[curr.id] || {}),
                        ...extra, 
                      },
                    };
                    return [merged];
                  });

                  return (
                    <SectionCollapse
                      key={col.colTitle}
                      title={col.colTitle}
                      sx={{ m: 0.5, width: "50%" }}
                      disabledCollapse
                    >
                      <Table sx={{ height: "auto" }}>
                        <TableBody>
                          <RowMapper
                            rows={finalConfigs}
                            tableName={col.colTitle}
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

        const hasAge = sectionHasAnyAge(pss);
        const ageRow = hasAge
          ? [[
              { id: AGE_YEAR,  fieldProps: { disabled: true, ...(fieldHelperProps[AGE_YEAR]  || {}) } },
              { id: AGE_MONTH, fieldProps: { disabled: true, ...(fieldHelperProps[AGE_MONTH] || {}) } },
              { id: AGE_WEEK,  fieldProps: { disabled: true, ...(fieldHelperProps[AGE_WEEK]  || {}) } },
              { id: AGE_DAYS,  fieldProps: { disabled: true, ...(fieldHelperProps[AGE_DAYS]  || {}) } },
            ]]
          : [];

        const nonAgeDes = visibleDes.filter((de) => !AGE_IDS.has(de.id));
        const otherRows = nonAgeDes.map((de) => {
          const extra =
            TARGET_DES.has(de.id) && icd10ValueSet.length
              ? { customValueSet: icd10ValueSet }
              : {};
          return [{ id: de.id, fieldProps: { ...(fieldHelperProps[de.id] || {}), ...extra } }];
        });

        const rows = [...ageRow, ...otherRows];

        const idxInNonAge = nonAgeDes.findIndex((de) => de.id === NOTE_AFTER_ID);
        const cutIndex = (hasAge ? 1 : 0) + (idxInNonAge >= 0 ? idxInNonAge + 1 : -1);

        return (
          <SectionCollapse
            key={pss.id}
            title={t(pss.displayName)}
            disabledCollapse
            sx={{ marginBottom: "10px" }}
          >
            <Table>
              <TableBody>
                {idxInNonAge === -1 ? (
                  <RowMapper rows={rows} tableName={pss.displayName} context="event" />
                ) : (
                  <>
                    <RowMapper
                      rows={rows.slice(0, cutIndex)}
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
                      rows={rows.slice(cutIndex)}
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

export default SickChild;
