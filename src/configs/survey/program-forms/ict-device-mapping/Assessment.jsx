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
// import useAssessmentRules from "./useAssessmentRules"; // keep if you use it

const GRID_COLS = "300px 1fr";

// --- helpers used in other stages -------------------------------------------
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

// tiny red asterisk like other stages
const RedStar = () => (
  <Box component="span" sx={{ color: "#d32f2f", ml: 0.5 }} aria-hidden="true">
    
  </Box>
);

const Assessment = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();

  // Use your custom rules hook if present (kept optional to avoid breaking)
  const props =
    typeof useAssessmentRules === "function" ? useAssessmentRules() : {};

  const trAssessmentDate = t("assessment.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });
  const trSectionTitle = (displayName) => {
    const n = String(displayName || "").trim().toLowerCase();
    if (n === "assessment") {
      return t("assessment.sectionTitle", {
        defaultValue: isLao ? "ການປະເມີນ" : "Assessment",
      });
    }
    return displayName;
  };

  // ---- existing visibility rules you had ------------------------------------
  const norm = (s) => String(s ?? "").toLowerCase().trim();
  const dataValuesArr = currentEvent?.dataValues ?? [];
  const getDeValueLocal = (deId) =>
    dataValuesArr.find((dv) => dv?.dataElement === deId)?.value;

  // controllers
  const nhQC_val = norm(getDeValueLocal("nhQCkj3UWJK"));
  const jr3E_val = norm(getDeValueLocal("jr3EVDUQRhX"));

  const show_ayj5xsLBA0T = nhQC_val === "other";
  const show_ZXzj7W5848O = jr3E_val === "other";

  // clear hidden dependents (keep your behavior)
  useEffect(() => {
    if (!currentEvent?.event) return;
    if (!show_ayj5xsLBA0T) {
      actions.changeDataValue(currentEvent.event, "ayj5xsLBA0T", "");
    }
    if (!show_ZXzj7W5848O) {
      actions.changeDataValue(currentEvent.event, "ZXzj7W5848O", "");
    }
  }, [show_ayj5xsLBA0T, show_ZXzj7W5848O, currentEvent?.event, actions]);

  // apply assignations from rules (unchanged)
  useEffect(() => {
    if (!currentEvent?.event) return;
    if (!props?.assignations) return;
    Object.entries(props.assignations).forEach(([dataElement, value]) => {
      actions.changeDataValue(currentEvent.event, dataElement, value);
    });
  }, [actions, currentEvent?.event, props?.assignations]);

  // Sections
  const sections = useMemo(() => {
    const stage = program?.programStages?.find(
      (ps) => ps.id === currentEvent?.programStage
    );
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  // Build the set of VISIBLE DEs (like we’d do if a stage had hides)
  const visibleDeIds = useMemo(() => {
    const ids = [];
    sections.forEach((section) => {
      (section.dataElements ?? []).forEach((de) => {
        const deId = de?.id || de?.dataElement?.id;
        if (!deId) return;

        // respect your conditional hides
        if (deId === "ayj5xsLBA0T" && !show_ayj5xsLBA0T) return;
        if (deId === "ZXzj7W5848O" && !show_ZXzj7W5848O) return;

        // honor hiddenFields from rules hook if provided
        if (props?.hiddenFields?.[deId]) return;

        ids.push(deId);
      });
    });
    return ids;
  }, [sections, show_ayj5xsLBA0T, show_ZXzj7W5848O, props?.hiddenFields]);

  // ---- ALL MANDATORY (pattern from IctAdminEquipments) ----------------------
  // Only require the *visible* DEs for this stage
  const missing = useMemo(() => {
    if (!currentEvent) return [];
    const m = [];
    visibleDeIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });
    return m;
  }, [currentEvent?.dataValues, visibleDeIds]);

  const disabled = missing.length > 0;

  // keep previous disabled state like other stage
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  missingRef.current = missing;

  // Disable/enable Complete button using the same fallbacks
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

  // Register save/complete guard handler (exact same pattern)
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_assessment_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        if (m.length > 0) {
          const msg = isLao
            ? "ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈໍາເປັນທັງໝົດ."
            : "Please complete all required fields.";
          return { ok: false, message: msg };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions, isLao]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Assessment date (kept like other stages; not forcing required here) */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
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

      {/* Sections & fields — show a red * like the other stage */}
      {sections.map((section) => (
        <Accordion
          key={section.id || section.displayName}
          title={trSectionTitle(section.displayName)}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            // respect hides
            if (deId === "ayj5xsLBA0T" && !show_ayj5xsLBA0T) return null;
            if (deId === "ZXzj7W5848O" && !show_ZXzj7W5848O) return null;
            if (props?.hiddenFields?.[deId]) return null;

            return (
              <Box
                key={deId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  alignItems: "center",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ padding: "10px", display: "flex", alignItems: "center" }}>
                  <DataValueLabel dataElement={deId} />
                  <RedStar />
                </Box>
                <Box sx={{ borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                  <DataValueFieldNoBlur dataElement={deId} required />
                </Box>
              </Box>
            );
          })}
        </Accordion>
      ))}
    </Box>
  );
};

export default Assessment;
