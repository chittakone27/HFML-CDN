import { Box, Table, TableBody, Alert, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import useSelectionStore from "@/state/selection";
import useGrowthMonitorRules from "./rules/useGrowthMonitorRules";
import useDetailSectionRules from "./rules/useDetailSectionRules";
import useChildNutritionStatusRules from "./rules/useChildNutritionStatusRules";
import useEventValidation from "./rules/useEventValidation";
import { RowMapper, SectionCollapse } from "@/configs/lao/program-forms/common/tracker";
import { GROWTH_MONITOR_ID, CHILD_NUTRI_STATUS_SECTION_ID } from "./const";
import { CHILD_NUTRI_SECTION_UI } from "./mapping";
import "./GrowthMonitoring.css";
import "../eir.css";
import EventDateLabel from "@/ui/TrackerCapture/EventForm/EventDateLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";

// Age IDs (disabled + horizontal)
const YEAR_ID = "XxJ8Ta1NoAV";
const MONTH_ID = "MV1yoC7BfnG";
const WEEK_ID  = "DxOqZZgVQhF";
const DAY_ID   = "H40cGMAAnAe";
const AGE_IDS = new Set([YEAR_ID, MONTH_ID, WEEK_ID, DAY_ID]);

const mergeFieldProps = (...propsArr) => {
  const out = Object.assign({}, ...propsArr.filter(Boolean));
  const helpers = propsArr.flatMap(p => (p?.helpers || []));
  if (helpers.length) out.helpers = helpers;
  return out;
};

const GrowthMonitoring = () => {
  const { t } = useTranslation();
  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));

  const growthMonitorStage = program.programStages.find(
    (ps) => ps.id === GROWTH_MONITOR_ID
  );
  const { programStageSections } = growthMonitorStage;

  const { hiddenFields } = useGrowthMonitorRules();
  useDetailSectionRules();
  const childNutriDeProps = useChildNutritionStatusRules();
  const { fieldHelperProps } = useEventValidation();

  const sectionHasAgeFields = (pss) =>
    pss?.dataElements?.some((de) => AGE_IDS.has(de.id));

  const AgeNotice = () => (
    <Alert severity="info" icon={false}
      sx={{ mb: 1.5, borderRadius: 2, "& .MuiAlert-message": { width: "100%" } }}>
      <Typography variant="body2">
        ອາຍຸຂອງເດັກ ແມ່ນໄລ່ຈາກວັນເດືອນປີເກີດ ຮອດວັນທີມາຮັບການບໍລິການ. ຖ້າຫາກວ່າອາຍຸປາກົດວ່າບໍ່ຖືກຕ້ອງ,
        ກະລຸນາກວດສອບວັນທີມາຮັບການບໍລິການ ແລະ ວັນເດືອນປີເກີດຂອງເດັກ
      </Typography>
    </Alert>
  );

  return (
    <Box className="eir-growth-monitor-form">
      <EventDateLabel type="eventDate" />
      <EventDateFieldNoBlur type="eventDate" />
      <br />

      {programStageSections.map((pss) => {
        const visibleDes = pss.dataElements.filter((de) => !hiddenFields.includes(de.id));

        if (pss.id === CHILD_NUTRI_STATUS_SECTION_ID) {
          return (
            <SectionCollapse key={pss.id} title={t(pss.displayName)} disabledCollapse sx={{ mb: "10px" }}>
              <div className="child-nutri-container">
                {CHILD_NUTRI_SECTION_UI.map((col) => {
                  const finalConfigs = col.colConfigs.map(([cfg]) => {
                    const id = cfg.id;
                    const fieldProps = mergeFieldProps(cfg.fieldProps, childNutriDeProps[id], fieldHelperProps[id]);
                    return [{ ...cfg, fieldProps }];
                  });
                  return (
                    <SectionCollapse key={col.colTitle} title={col.colTitle} sx={{ m: .5, width: "50%" }} disabledCollapse>
                      <Table sx={{ height: "auto" }}>
                        <TableBody>
                          <RowMapper rows={finalConfigs} tableName={col.colTitle} context="event" />
                        </TableBody>
                      </Table>
                    </SectionCollapse>
                  );
                })}
              </div>
            </SectionCollapse>
          );
        }

        const hasAge = sectionHasAgeFields(pss);
        const ageRow = hasAge
          ? [[
              { id: YEAR_ID,  fieldProps: { disabled: true } },
              { id: MONTH_ID, fieldProps: { disabled: true } },
              { id: WEEK_ID,  fieldProps: { disabled: true } },
              { id: DAY_ID,   fieldProps: { disabled: true } },
            ]]
          : [];

        const otherRows = visibleDes
          .filter((de) => !AGE_IDS.has(de.id))
          .map((de) => [{ id: de.id, fieldProps: fieldHelperProps[de.id] }]);

        return (
          <SectionCollapse key={pss.id} title={t(pss.displayName)} disabledCollapse sx={{ mb: "10px" }}>
            {hasAge && <AgeNotice />}
            <Table>
              <TableBody>
                <RowMapper rows={[...ageRow, ...otherRows]} tableName={pss.displayName} context="event" />
              </TableBody>
            </Table>
          </SectionCollapse>
        );
      })}
    </Box>
  );
};

export default GrowthMonitoring;
