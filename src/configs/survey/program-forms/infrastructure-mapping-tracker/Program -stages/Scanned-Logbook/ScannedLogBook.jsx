import { Box } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import Accordion from "../../../common/Accordion";

const GRID_ROW   = { display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" };
const LABEL_CELL = { width: "300px", padding: "10px" };
const VALUE_CELL = { flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" };

// The only DE in this stage (file upload)
const ONLY_DE_ID = "vWXAocoSljn";

const ScannedLogBook = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");
  const { currentEvent } = useCurrentEvent();

  const { stage: selStage, program } = useSelectionStore(
    useShallow((s) => ({ stage: s.stage, program: s.program }))
  );

  const { actions } = useTrackerCaptureStore(
    useShallow((s) => ({ actions: s.actions }))
  );

  // Force-enable the Complete button for this stage (no mandatory checks)
  useEffect(() => {
    if (!actions) return;
    try {
      if (actions.setLayout) actions.setLayout("disableEventCompleteButton", false);
      if (actions.setCompleteDisabled) actions.setCompleteDisabled(false);
      if (actions.setCanComplete) actions.setCanComplete(true);
    } catch {}
  }, [actions, currentEvent?.event]);

  // Register a save handler that never blocks save from this stage
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_scannedLogBook_optional";
    actions.setHandlers && actions.setHandlers(KEY, async () => ({ ok: true }));
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions]);

  const stage = useMemo(() => {
    if (selStage) return selStage;
    const psId = currentEvent?.programStage;
    return program?.programStages?.find((ps) => ps.id === psId);
  }, [selStage, program?.programStages, currentEvent?.programStage]);

  const sections = useMemo(() => {
    if (!stage) return [];
    if (Array.isArray(stage.programStageSections) && stage.programStageSections.length > 0) {
      return stage.programStageSections;
    }
    const dataElements =
      (stage.programStageDataElements ?? []).map((psde) => psde.dataElement ?? psde);
    return [
      { id: "__all__", displayName: stage.displayName || "Form", dataElements },
    ];
  }, [stage]);

  const maxDateStr = format(new Date(), "yyyy-MM-dd");

  const trAssessmentDate = t("wash.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Event date (optional for this stage) */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur maxDate={maxDateStr} type="eventDate" />
      </Box>

      {sections.map((section, sIdx) => (
        <Accordion
          key={section.id || `${section.displayName || "section"}-${sIdx}`}
          title={section.displayName || section.name || `Section ${sIdx + 1}`}
        >
          {(section.dataElements || []).map((de, dIdx) => {
            const deId = de?.id ?? de?.dataElement?.id;
            if (!deId) return null;
            // Render as optional (no `required` prop)
            return (
              <Box key={deId || `de-${dIdx}`} sx={GRID_ROW}>
                <Box sx={LABEL_CELL}>
                  <DataValueLabel dataElement={deId} />
                </Box>
                <Box sx={VALUE_CELL}>
                  <DataValueFieldNoBlur dataElement={deId} />
                </Box>
              </Box>
            );
          })}
        </Accordion>
      ))}
    </Box>
  );
};

export default ScannedLogBook;
