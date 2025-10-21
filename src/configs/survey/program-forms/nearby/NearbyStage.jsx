// program-forms/nearby/NearbyStage.jsx
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
import useNearbyRules from "./useNearbyRules";

const LABEL_COL_W = 300;

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

const NearbyStage = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();

  const { warnings } = useNearbyRules(); // includes the foot < car check
  const hasWarnings = Object.keys(warnings || {}).length > 0;

  const trAssessmentDate = t("assessment.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  const stage = useMemo(
    () => program?.programStages?.find((ps) => ps.id === currentEvent?.programStage),
    [program?.programStages, currentEvent?.programStage]
  );

  const sections = useMemo(() => {
    if (!stage) return [];
    const hasSections = Array.isArray(stage.programStageSections) && stage.programStageSections.length > 0;
    if (hasSections) return stage.programStageSections;

    const dataElements =
      (stage.programStageDataElements ?? []).map((psde) => psde.dataElement ?? psde);
    return [
      {
        id: "__all__",
        displayName: stage.displayName || "Form",
        dataElements,
      },
    ];
  }, [stage]);

  // collect all DE IDs present on this stage (what we render) for required check
  const presentIds = useMemo(() => {
    const ids = [];
    sections.forEach((sec) => {
      (sec?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      });
    });
    return Array.from(new Set(ids));
  }, [sections]);

  // find missing required values (all DEs + eventDate)
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

  // disable when any missing OR any warnings
  const disabled = missing.length > 0 || hasWarnings;
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(warnings);
  missingRef.current = missing;
  warningsRef.current = warnings;

  // toggle Complete button only when state changes (avoid update loops)
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

  // register Save handler once; block when missing or warnings
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_nearby_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).length > 0;

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0) msgs.push("Please complete all required fields.");
          if (hasW) {
            // include unique warning messages
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
      {/* Event date (required) */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur
          type="eventDate"
          maxDate={maxDate}
          focus={() => {
            if (!currentEvent) return;
            const dueDate =
              currentEvent.dueDate && format(new Date(currentEvent.dueDate), "yyyy-MM-dd");
            if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
              actions.changeEventProperty(
                currentEvent.event,
                "eventDate",
                dueDate && dueDate > maxDate ? maxDate : (dueDate || maxDate)
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
                <Box sx={{ width: `${LABEL_COL_W}px`, padding: "10px" }}>
                  <DataValueLabel dataElement={deId} />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    borderLeft: "1px solid #e0e0e0",
                    padding: "10px",
                  }}
                >
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

export default NearbyStage;
