import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";

import Accordion from "../common/Accordion";
import useVillageRules from "./useVillageRules";

const getEventDEValue = (currentEvent, deId) => {
  if (!currentEvent) return undefined;
  if (currentEvent.values && typeof currentEvent.values === "object") {
    return currentEvent.values[deId];
  }
  if (Array.isArray(currentEvent.dataValues)) {
    const hit = currentEvent.dataValues.find((dv) => dv.dataElement === deId);
    return hit?.value;
  }
  return currentEvent[deId];
};
const isEmpty = (v) => {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  return false;
};

// Program: sBkMdki30ua | Stage: JrbpF3DG3FL
const INTEGER_ONLY_ID = "OWAR8Vpa8IW"; // integer-only DE

const VillagesStage = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions, data: state.data }))
  );
  const { currentEvent } = useCurrentEvent();

  // ⬇ warnings + hiddenFields + hiddenOptions (ALL visible will be required below)
  const { warnings, hiddenFields = {}, hiddenOptions = {} } = useVillageRules();

  const trStageDate = t("village.stageDate", {
    defaultValue: isLao ? "ວັນທີ່ບັນທຶກ" : "Stage date",
  });

  const trWarn = (code) => {
    switch (code) {
      case "integerOnly":
        return t("village.rules.integerOnly", {
          defaultValue: isLao
            ? "ກະລຸນາໃສ່ເປັນຈໍານວນເຕັມ (0–9) ເທົ່ານັ້ນ."
            : "Please enter a whole number (digits 0–9 only).",
        });
      case "min1000":
        return t("village.rules.min1000", {
          min: 1000,
          defaultValue: isLao ? "ຄ່າຕ້ອງຢ່າງນ້ອຍ 1000." : "Value must be at least 1000.",
        });
      default:
        return typeof code === "string" ? code : "";
    }
  };

  // SECTION title mapping
  const SECTION_EN = "Details of catchment area";
  const SECTION_LO = "ລາຍລະອຽດເຂດບໍລິການ";
  const trCatchmentSectionTitle = t("village.section.details", {
    defaultValue: isLao ? SECTION_LO : SECTION_EN,
  });
  const isCatchmentSection = (name) => {
    const s = String(name || "").trim();
    if (!s) return false;
    const enMatch =
      s.toLowerCase().replace(/\s+/g, " ") === SECTION_EN.toLowerCase().replace(/\s+/g, " ");
    const loMatch = s === SECTION_LO;
    return enMatch || loMatch;
  };
  const trSectionTitle = (name) => (isCatchmentSection(name) ? trCatchmentSectionTitle : name);

  // Sections
  const sections = useMemo(() => {
    const stage = program?.programStages?.find(
      (ps) => ps.id === currentEvent?.programStage
    );
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  // Collect DEs present in this stage (respect hiddenFields)
  const presentIds = useMemo(() => {
    const ids = [];
    sections.forEach((section) => {
      (section?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      });
    });
    const uniq = Array.from(new Set(ids));
    return uniq.filter((id) => !hiddenFields[id]);
  }, [sections, hiddenFields]);

  // ⬇⬇⬇ MAKE *ALL VISIBLE* FIELDS MANDATORY ⬇⬇⬇
  const requiredSet = useMemo(() => new Set(presentIds), [presentIds]);

  // Missing check: all visible required + eventDate
  const missing = useMemo(() => {
    const m = [];
    for (const id of requiredSet) {
      const v = getEventDEValue(currentEvent, id);
      if (isEmpty(v)) m.push(id);
    }
    if (!currentEvent?.eventDate || isEmpty(currentEvent.eventDate)) {
      m.push("__eventDate__");
    }
    return m;
  }, [requiredSet, currentEvent?.dataValues, currentEvent?.eventDate]);

  // Only block on warnings for visible fields
  const hasWarnings = useMemo(
    () => Object.keys(warnings || {}).some((id) => presentIds.includes(id)),
    [warnings, presentIds]
  );

  // Disable save/complete when missing or warnings exist
  const disabled = missing.length > 0 || hasWarnings;

  // Avoid update loops
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(warnings || {});
  missingRef.current = missing;
  warningsRef.current = warnings || {};

  // Toggle Complete button only when value changes
  useEffect(() => {
    if (!actions) return;
    if (prevDisabled.current !== disabled) {
      prevDisabled.current = disabled;
      try {
        if (actions.setLayout) {
          actions.setLayout("disableEventCompleteButton", disabled);
        } else if (actions.setCompleteDisabled) {
          actions.setCompleteDisabled(disabled);
        } else if (actions.setCanComplete) {
          actions.setCanComplete(!disabled);
        }
      } catch {}
    }
  }, [actions, disabled]);

  // Register Save handler once
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_villages_all_visible_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).some((id) => presentIds.includes(id));

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0)
            msgs.push(
              t("village.save.completeAll", {
                defaultValue: isLao
                  ? "ກະລຸນາກອກຂໍ້ມູນທີ່ຈໍາເປັນ."
                  : "Please complete all required fields.",
              })
            );
          if (hasW) {
            msgs.push(
              Array.from(new Set(
                Object.entries(w)
                  .filter(([id]) => presentIds.includes(id))
                  .map(([, code]) => trWarn(code))
              )).join(" ")
            );
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions, t, isLao, presentIds]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  // integer-only input guards for OWAR8Vpa8IW
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
      if (!/^\d+$/.test(txt.trim())) e.preventDefault();
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const digits = s.replace(/[^\d]/g, "");
      if (s !== digits) e.target.value = digits;
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trStageDate}</Box>
        <EventDateFieldNoBlur
          maxDate={maxDate}
          type="eventDate"
          focus={() => {
            if (!currentEvent) return;
            const dueDate =
              currentEvent.dueDate &&
              format(new Date(currentEvent.dueDate), "yyyy-MM-dd");
            if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
              actions.changeEventProperty(
                currentEvent.event,
                "eventDate",
                dueDate && dueDate > maxDate ? maxDate : dueDate || maxDate
              );
            }
          }}
        />
      </Box>

      {sections.map((section) => (
        <Accordion
          key={section.id || section.displayName}
          title={trSectionTitle(section.displayName)}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            // respect hidden fields
            if (hiddenFields[deId]) return null;

            const hasWarn = !!warnings?.[deId];
            const helpId = `help-${deId}`;
            const extra = deId === INTEGER_ONLY_ID ? integerOnlyGuards : {};
            const warnMsg = hasWarn ? trWarn(warnings[deId]) : "";

            // Every visible field is required
            const isRequired = requiredSet.has(deId);

            return (
              <Box
                key={deId}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: hasWarn ? "#fff5f5" : "transparent",
                }}
              >
                <Box sx={{ width: 300, p: "10px" }}>
                  <DataValueLabel dataElement={deId} required={isRequired} />
                </Box>

                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", p: "10px" }}>
                  <DataValueFieldNoBlur
                    dataElement={deId}
                    required={isRequired}
                    aria-invalid={hasWarn ? "true" : undefined}
                    aria-describedby={hasWarn ? helpId : undefined}
                    hiddenOptions={hiddenOptions?.[deId] || undefined}  // <— pass down
                    {...extra}
                  />

                  {hasWarn && (
                    <Box
                      id={helpId}
                      sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                    >
                      {warnMsg}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Accordion>
      ))}
    </Box>
  );
};

export default VillagesStage;
