import { Box } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import Accordion from "../../../common/Accordion";

const GRID_ROW   = { display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" };
const LABEL_CELL = { width: "300px", padding: "10px" };
const VALUE_CELL = { flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" };

const ScannedLogBook = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");
  const { currentEvent } = useCurrentEvent();

  // Prefer selection.stage; fallback to program + currentEvent.programStage
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

  // i18n label
  const trAssessmentDate = t("wash.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Keep the standard Event Date control at top */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur maxDate={maxDateStr} type="eventDate" />
      </Box>

      {/* Render all sections & their data elements as-is (no rules) */}
      {sections.map((section, sIdx) => (
        <Accordion
          key={section.id || `${section.displayName || "section"}-${sIdx}`}
          title={section.displayName || section.name || `Section ${sIdx + 1}`}
        >
          {(section.dataElements || []).map((de, dIdx) => {
            const deId = de?.id ?? de?.dataElement?.id;
            if (!deId) return null;
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
