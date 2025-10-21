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

// helpers to read values / check emptiness
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
const VillagesStage = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();
  const props = useVillageRules();

  const trStageDate = t("village.stageDate", {
    defaultValue: isLao ? "ວັນທີ່ບັນທຶກ" : "Stage date",
  });

  // Auto-assignments (unchanged)
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

  // Collect DEs present in this stage (for required checks)
  const presentIds = useMemo(() => {
    const ids = [];
    sections.forEach((section) => {
      (section?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      });
    });
    return Array.from(new Set(ids));
  }, [sections]);

  // Compute missing (all DEs + eventDate)
  const missing = useMemo(() => {
    const m = [];
    for (const id of presentIds) {
      const v = getEventDEValue(currentEvent, id);
      if (isEmpty(v)) m.push(id);
    }
    if (!currentEvent?.eventDate || isEmpty(currentEvent.eventDate)) {
      m.push("__eventDate__");
    }
    return m;
  }, [presentIds, currentEvent?.dataValues, currentEvent?.eventDate]);

  // Block when missing or any rule warnings
  const hasWarnings = !!props?.warnings && Object.keys(props.warnings).length > 0;
  const disabled = missing.length > 0 || hasWarnings;

  // Avoid update loops
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(props?.warnings || {});
  missingRef.current = missing;
  warningsRef.current = props?.warnings || {};

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
    const KEY = "eventSave_villages_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).length > 0;

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0) msgs.push("Please complete all required fields.");
          if (hasW) {
            const uniq = Array.from(new Set(Object.values(w)));
            msgs.push(uniq.join(" "));
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

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
          title={section.displayName}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;
            return (
              <Box
                key={deId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ width: 300, p: "10px" }}>
                  <DataValueLabel dataElement={deId} />
                </Box>
                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", p: "10px" }}>
                  {/* ALL fields required */}
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

export default VillagesStage;
