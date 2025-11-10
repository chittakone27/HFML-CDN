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

// --- IDs & rules -------------------------------------------------------------
const RULES = [
  { controller: "VmCvSADpsA1", matchValues: ["other"], dependents: ["bmlUYsjXYko"] },
  { controller: "CNVSIJkquLR", matchValues: ["other"], dependents: ["Eoj2LevRSsa"] },
];

// INTEGER-only fields in this stage:
const INTEGER_ONLY_IDS = new Set(["CViemlWnENJ", "W5UrZzdDLvz"]);

// These DEs are NOT mandatory (optional) even when visible
const OPTIONAL_IDS = new Set([
  "sevW1KA9uZv",
  "x59W91PRh3t",
  "Kcb5YG66lpa",
  "sb8FHULfVoC",
  "xnccpdd2vKn",
]);

const DEP_SET = new Set(RULES.flatMap((r) => r.dependents));
const normalize = (s) => String(s ?? "").trim().toLowerCase();

// normalize non-ASCII digits to ASCII (Thai/Lao/Arabic/… → ASCII)
const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); // Thai
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); // Lao
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); // Arabic-Indic
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); // Ext Arabic-Indic
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); // Devanagari
      return ch;
    }
  );

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

const GRID_ROW = { display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" };
const LABEL_CELL = { width: "300px", padding: "10px" };
const VALUE_CELL = { flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" };

const Wash = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  // Prefer selection.stage; fall back to program + currentEvent.programStage
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

  // i18n: translated “Assessment date”
  const trAssessmentDate = t("wash.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  // i18n: translated section titles (only for these five)
  const trSectionTitle = (displayName) => {
    const n = normalize(displayName);
    switch (n) {
      case "water":
        return t("wash.sections.water", { defaultValue: isLao ? "ນໍ້າສະອາດ" : "Water" });
      case "sanitation":
        return t("wash.sections.sanitation", { defaultValue: isLao ? "ສຸຂາພິບານ" : "Sanitation" });
      case "hygiene":
        return t("wash.sections.hygiene", { defaultValue: isLao ? "ອະນາໄມ" : "Hygiene" });
      case "waste":
        return t("wash.sections.waste", { defaultValue: isLao ? "ຂີ້ເຫຍື້ອ" : "Waste" });
      case "climate":
        return t("wash.sections.climate", { defaultValue: isLao ? "ສະພາບດິນຟ້າອາກາດ" : "Climate" });
      default:
        return displayName;
    }
  };

  // helpers for rule checks
  const valueOf = (id) => normalize(getEventDEValue(currentEvent, id));
  const matchedRuleFor = (controllerId) => RULES.find((r) => r.controller === controllerId);
  const shouldShowDependents = (rule) => {
    if (!rule) return false;
    const v = valueOf(rule.controller);
    return rule.matchValues.includes(v);
  };

  // ---- integer-only warnings (for CViemlWnENJ & W5UrZzdDLvz) ----
  const warnings = useMemo(() => {
    const w = {};
    INTEGER_ONLY_IDS.forEach((id) => {
      const raw = toAsciiDigits(String(getEventDEValue(currentEvent, id) ?? "").trim());
      if (raw !== "" && !/^\d+$/.test(raw)) w[id] = "integerOnly";
    });
    return w;
  }, [currentEvent?.dataValues]);
  const hasWarnings = Object.keys(warnings).length > 0;

  // translate warning codes → single-language message
  const trWarn = (code) => {
    switch (code) {
      case "integerOnly":
        return t("wash.rules.integerOnly", {
          defaultValue: isLao
            ? "ອະນຸຍາດໃສ່ແຕ່ເລກຈໍານວນເຕັມ (ບໍ່ອະນຸຍາດເລກຈຸດທົດສະນິຍົມ)."
            : "Only whole numbers are allowed (no decimals).",
        });
      default:
        return "";
    }
  };

  // ---------- Stage-wide mandatory guard ----------
  useEffect(() => {
    if (!actions) return;

    const presentIds = new Set(
      sections
        .flatMap((sec) => (sec?.dataElements ?? []).map((de) => de?.id ?? de?.dataElement?.id))
        .filter(Boolean)
    );

    // Required = visible & not a dependent placeholder & not in OPTIONAL_IDS
    const requiredNow = new Set(
      [...presentIds].filter((id) => !DEP_SET.has(id) && !OPTIONAL_IDS.has(id))
    );

    for (const rule of RULES) {
      const { controller, dependents } = rule;
      if (!presentIds.has(controller)) continue;
      const v = valueOf(controller);
      if (rule.matchValues.includes(v)) {
        for (const depId of dependents) {
          // Dependents become required only if visible AND not optional
          if (presentIds.has(depId) && !OPTIONAL_IDS.has(depId)) requiredNow.add(depId);
        }
      }
    }

    const missing = [];
    requiredNow.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) missing.push(id);
    });

    const disabled = missing.length > 0 || hasWarnings;

    try {
      if (actions.setLayout) actions.setLayout("disableEventCompleteButton", disabled);
      else if (actions.setCompleteDisabled) actions.setCompleteDisabled(disabled);
      else if (actions.setCanComplete) actions.setCanComplete(!disabled);
    } catch {}

    if (actions.setHandlers) {
      const KEY = "eventSave_wash_required_guard";
      actions.setHandlers(KEY, async () => {
        if (disabled) {
          const msgs = [];
          if (missing.length > 0) {
            msgs.push(
              t("wash.save.completeAll", {
                defaultValue: isLao
                  ? "ກະລຸນາກອກຂໍ້ມູນທຸກຊ່ອງທີ່ຈໍາເປັນ."
                  : "Please complete all required fields.",
              })
            );
          }
          if (hasWarnings) {
            const uniq = Array.from(new Set(Object.values(warnings)));
            msgs.push(uniq.map(trWarn).join(" "));
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
      return () => actions.setHandlers && actions.setHandlers(KEY, null);
    }
  }, [actions, currentEvent?.dataValues, sections, hasWarnings, t, isLao, warnings]);

  // numeric-only input guards (prevents typing/pasting non-integers)
  const integerOnlyGuards = {
    type: "number",
    step: 1,
    inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
    onKeyDown: (e) => {
      const blocked = ["e", "E", ".", ",", "+", "-", " "];
      if (blocked.includes(e.key)) e.preventDefault();
    },
    onPaste: (e) => {
      const txt = (e.clipboardData || window.clipboardData).getData("text") || "";
      if (!/^\d+$/.test(toAsciiDigits(txt).trim())) e.preventDefault();
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const digits = toAsciiDigits(s).replace(/[^\d]/g, "");
      if (s !== digits) e.target.value = digits;
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Translated Assessment date */}
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

              // If this DE is a dependent, skip it here; it will be injected below its controller.
              if (DEP_SET.has(deId)) return null;

              const rule = matchedRuleFor(deId);

              // --- render a single row (unchanged layout) with integer guards + inline message ---
              const code = warnings[deId];
              const hasWarn = !!code;
              const helpId = `help-${deId}`;
              const extra = INTEGER_ONLY_IDS.has(deId) ? integerOnlyGuards : {};

              const renderControllerRow = (
                <Box key={deId || `de-${dIdx}`} sx={GRID_ROW}>
                  <Box sx={LABEL_CELL}>
                    <DataValueLabel dataElement={deId} />
                  </Box>
                  <Box sx={VALUE_CELL}>
                    {/* Required unless marked optional */}
                    <DataValueFieldNoBlur
                      dataElement={deId}
                      required={!OPTIONAL_IDS.has(deId)}
                      aria-invalid={hasWarn ? "true" : undefined}
                      aria-describedby={hasWarn ? helpId : undefined}
                      {...extra}
                    />
                    {hasWarn && (
                      <Box
                        id={helpId}
                        sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                      >
                        {trWarn(code)}
                      </Box>
                    )}
                  </Box>
                </Box>
              );

              if (!rule) {
                // Plain DE, render as-is (required unless optional)
                return renderControllerRow;
              }

              // This DE controls dependents; render controller, then dependents if matched
              const showDeps = shouldShowDependents(rule);

              return (
                <Box key={`${deId}-with-deps`} sx={{ display: "flex", flexDirection: "column" }}>
                  {renderControllerRow}
                  {showDeps &&
                    rule.dependents.map((depId) => {
                      const depCode = warnings[depId];
                      const depHasWarn = !!depCode;
                      const depHelpId = `help-${depId}`;
                      const depExtra = INTEGER_ONLY_IDS.has(depId) ? integerOnlyGuards : {};

                      return (
                        <Box key={depId} sx={GRID_ROW}>
                          <Box sx={LABEL_CELL}>
                            <DataValueLabel dataElement={depId} />
                          </Box>
                          <Box sx={VALUE_CELL}>
                            {/* Dependent is required when shown, unless optional */}
                            <DataValueFieldNoBlur
                              dataElement={depId}
                              required={!OPTIONAL_IDS.has(depId)}
                              aria-invalid={depHasWarn ? "true" : undefined}
                              aria-describedby={depHasWarn ? depHelpId : undefined}
                              {...depExtra}
                            />
                            {depHasWarn && (
                              <Box
                                id={depHelpId}
                                sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                              >
                                {trWarn(depCode)}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
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
