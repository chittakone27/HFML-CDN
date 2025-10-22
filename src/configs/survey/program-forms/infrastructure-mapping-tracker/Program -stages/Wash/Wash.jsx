import { Box } from "@mui/material";
import { format, parseISO, isValid } from "date-fns";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import { useMemo, useEffect } from "react";

import Accordion from "../../../common/Accordion";

const RULES = [
  {
    controller: "VmCvSADpsA1",           // If this = Other
    matchValues: ["other"],
    dependents: ["bmlUYsjXYko"],         // -> this becomes mandatory (and is shown)
  },
  {
    controller: "CNVSIJkquLR",
    matchValues: ["other"],
    dependents: ["Eoj2LevRSsa"],
  },
];

const DEP_SET = new Set(RULES.flatMap((r) => r.dependents));
const normalize = (s) => String(s ?? "").trim().toLowerCase();

function getEventDEValue(currentEvent, deId) {
  if (!currentEvent) return undefined;
  if (currentEvent.values && typeof currentEvent.values === "object") {
    return currentEvent.values[deId];
  }
  if (Array.isArray(currentEvent.dataValues)) {
    const hit = currentEvent.dataValues.find((dv) => dv.dataElement === deId);
    return hit?.value;
  }
  return currentEvent[deId];
}

const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  return false;
};

const GRID_ROW = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
};

const LABEL_CELL = { width: "300px", padding: "10px" };
const VALUE_CELL = { flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" };

const Wash = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );
  const { currentEvent } = useCurrentEvent();

  const { stage: selStage, program } = useSelectionStore(
    useShallow((s) => ({ stage: s.stage, program: s.program }))
  );

  const stage = useMemo(() => {
    if (selStage) return selStage;
    const psId = currentEvent?.programStage;
    return program?.programStages?.find((ps) => ps.id === psId);
  }, [selStage, program?.programStages, currentEvent?.programStage]);

  const sections = stage?.programStageSections ?? [];
  const maxDateStr = format(new Date(), "yyyy-MM-dd");

  const trAssessmentDate = t("wash.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });


  const trSectionTitle = (displayName) => {
    const n = normalize(displayName);
    switch (n) {
      case "water":
        return t("wash.sections.water", {
          defaultValue: isLao ? "ນໍ້າສະອາດ" : "Water",
        });
      case "sanitation":
        return t("wash.sections.sanitation", {
          defaultValue: isLao ? "ສຸຂາພິບານ" : "Sanitation",
        });
      case "hygiene":
        return t("wash.sections.hygiene", {
          defaultValue: isLao ? "ອະນາໄມ" : "Hygiene",
        });
      case "waste":
        return t("wash.sections.waste", {
          defaultValue: isLao ? "ຂີ້ເຫຍື້ອ" : "Waste",
        });
      case "climate":
        return t("wash.sections.climate", {
          defaultValue: isLao ? "ສະພາບດິນຟ້າອາກາດ" : "Climate",
        });
      default:
        return displayName;
    }
  };

  const valueOf = (id) => normalize(getEventDEValue(currentEvent, id));
  const matchedRuleFor = (controllerId) =>
    RULES.find((r) => r.controller === controllerId);
  const shouldShowDependents = (rule) => {
    if (!rule) return false;
    const v = valueOf(rule.controller);
    return rule.matchValues.includes(v);
  };

  useEffect(() => {
    if (!actions) return;

    const presentIds = new Set(
      sections.flatMap((sec) => (sec?.dataElements ?? []).map((de) => de?.id ?? de?.dataElement?.id)).filter(Boolean)
    );

    const requiredNow = new Set([...presentIds].filter((id) => !DEP_SET.has(id)));

    for (const rule of RULES) {
      const { controller, dependents } = rule;
      if (!presentIds.has(controller)) continue;
      const v = valueOf(controller);
      if (rule.matchValues.includes(v)) {
        for (const depId of dependents) {
          if (presentIds.has(depId)) requiredNow.add(depId);
        }
      }
    }

    const missing = [];
    requiredNow.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) missing.push(id);
    });

    const disabled = missing.length > 0;

    try {
      if (actions.setLayout) {
        actions.setLayout("disableEventCompleteButton", disabled);
      } else if (actions.setCompleteDisabled) {
        actions.setCompleteDisabled(disabled);
      } else if (actions.setCanComplete) {
        actions.setCanComplete(!disabled);
      }
    } catch {}

    if (actions.setHandlers) {
      const KEY = "eventSave_wash_required_guard";
      actions.setHandlers(KEY, async () => {
        if (disabled) {
          return { ok: false, message: "Please complete all required fields." };
        }
        return { ok: true };
      });
      return () => actions.setHandlers && actions.setHandlers(KEY, null);
    }
  }, [actions, currentEvent?.dataValues, sections]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur
          maxDate={maxDateStr}
          type="eventDate"
          focus={() => {
            if (!currentEvent?.event) return;
            const rawDue = currentEvent.dueDate;
            const due =
              rawDue == null
                ? new Date()
                : typeof rawDue === "string"
                ? parseISO(rawDue)
                : new Date(rawDue);
            const dueStr = isValid(due) ? format(due, "yyyy-MM-dd") : maxDateStr;

            if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
              actions.changeEventProperty(
                currentEvent.event,
                "eventDate",
                dueStr > maxDateStr ? maxDateStr : dueStr
              );
            }
          }}
        />
      </Box>

      {sections.map((section, sIdx) => {
        return (
          <Accordion
            key={section.id || `${section.displayName || "section"}-${sIdx}`}
            title={trSectionTitle(section.displayName)}
          >
            {(section.dataElements || []).map((de, dIdx) => {
              const deId = de?.id ?? de?.dataElement?.id;
              if (!deId) return null;

              if (DEP_SET.has(deId)) {
                return null;
              }

              const rule = matchedRuleFor(deId);
              const renderControllerRow = (
                <Box key={deId || `de-${dIdx}`} sx={GRID_ROW}>
                  <Box sx={LABEL_CELL}>
                    <DataValueLabel dataElement={deId} />
                  </Box>
                  <Box sx={VALUE_CELL}>

                    <DataValueFieldNoBlur dataElement={deId} required />
                  </Box>
                </Box>
              );

              if (!rule) {

                return renderControllerRow;
              }

              const showDeps = shouldShowDependents(rule);

              return (
                <Box
                  key={`${deId}-with-deps`}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {renderControllerRow}
                  {showDeps &&
                    rule.dependents.map((depId) => (
                      <Box key={depId} sx={GRID_ROW}>
                        <Box sx={LABEL_CELL}>
                          <DataValueLabel dataElement={depId} />
                        </Box>
                        <Box sx={VALUE_CELL}>

                          <DataValueFieldNoBlur dataElement={depId} required />
                        </Box>
                      </Box>
                    ))}
                </Box>
              );
            })}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Wash;
