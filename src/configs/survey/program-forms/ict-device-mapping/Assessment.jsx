import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";

import Accordion from "../common/Accordion";
//import useAssessmentRules from "./useAssessmentRules";

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
  const props = useAssessmentRules();

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

  // ---- helpers --------------------------------------------------------------
  const norm = (s) => String(s ?? "").toLowerCase().trim();
  const dataValuesArr = currentEvent?.dataValues ?? [];

  const getDeValue = (deId) =>
    dataValuesArr.find((dv) => dv?.dataElement === deId)?.value;

  // Controller values (normalized)
  const nhQC_val = norm(getDeValue("nhQCkj3UWJK"));
  const jr3E_val = norm(getDeValue("jr3EVDUQRhX"));

  // Visibility rules for dependents
  const show_ayj5xsLBA0T = nhQC_val === "other";
  const show_ZXzj7W5848O = jr3E_val === "other";

  // Keep data clean: when a dependent becomes hidden, clear its value
  useEffect(() => {
    if (!currentEvent?.event) return;

    if (!show_ayj5xsLBA0T) {
      actions.changeDataValue(currentEvent.event, "ayj5xsLBA0T", "");
    }
    if (!show_ZXzj7W5848O) {
      actions.changeDataValue(currentEvent.event, "ZXzj7W5848O", "");
    }
  }, [show_ayj5xsLBA0T, show_ZXzj7W5848O, currentEvent?.event, actions]);

  // Apply auto-assignments coming from your custom rules hook (unchanged)
  useEffect(() => {
    if (!currentEvent?.event) return;
    if (!props?.assignations) return;

    Object.entries(props.assignations).forEach(([dataElement, value]) => {
      actions.changeDataValue(currentEvent.event, dataElement, value);
    });
  }, [actions, currentEvent?.event, props?.assignations]);

  const sections = useMemo(() => {
    const stage = program?.programStages?.find(
      (ps) => ps.id === currentEvent?.programStage
    );
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Assessment date (translated label) */}
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

      {sections.map((section) => (
        <Accordion
          key={section.id || section.displayName}
          title={trSectionTitle(section.displayName)}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            // --- conditional visibility for the two dependents ---------------
            if (deId === "ayj5xsLBA0T" && !show_ayj5xsLBA0T) return null;
            if (deId === "ZXzj7W5848O" && !show_ZXzj7W5848O) return null;

            // (Optional) also honor any hidden flags coming from useAssessmentRules
            if (props?.hiddenFields?.[deId]) return null;

            return (
              <Box
                key={deId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ width: "300px", padding: "10px" }}>
                  <DataValueLabel dataElement={deId} />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    borderLeft: "1px solid #e0e0e0",
                    padding: "10px",
                  }}
                >
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

export default Assessment;
