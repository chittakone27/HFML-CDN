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
const INTEGER_ONLY_ID = "dBK06ybZUbT";

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

  const { warnings } = useNearbyRules();
  const hasWarnings = Object.keys(warnings || {}).length > 0;

  const trAssessmentDate = t("assessment.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  const SECTION_EN = "Details of nearby health facilities";
  const SECTION_LO = "ຂໍ້ມູນຂອງສະຖານທີ່ບໍລິການໃກ້ຄຽງ";
  const trNearbySectionTitle = t("nearby.section.details", {
    defaultValue: isLao ? SECTION_LO : SECTION_EN,
  });
  const isNearbySection = (name) => {
    const s = String(name || "").trim();
    if (!s) return false;
    const enMatch =
      s.toLowerCase().replace(/\s+/g, " ") === SECTION_EN.toLowerCase().replace(/\s+/g, " ");
    const loMatch = s === SECTION_LO;
    return enMatch || loMatch;
  };
  const trSectionTitle = (name) => (isNearbySection(name) ? trNearbySectionTitle : name);

  const trWarn = (code) => {
    switch (code) {
      case "footVsCar":
        return t("nearby.rules.footVsCar", {
          defaultValue: isLao
            ? "ເວລາເດີນທາງດ້ວຍທ້າວຕ້ອງຫຼາຍກວ່າເວລາໄປດ້ວຍລົດ."
            : "Travel time on foot must be greater than by car.",
        });
      case "integerOnly":
        return t("nearby.rules.integerOnly", {
          defaultValue: isLao
            ? "ກະລຸນາໃສ່ເປັນຈໍານວນເຕັມ (0–9) ເທົ່ານັ້ນ."
            : "Please enter a whole number (digits 0–9 only).",
        });
      case "min1000":
        return t("nearby.rules.min1000", {
          min: 1000,
          defaultValue: isLao ? "ຄ່າຕ້ອງຢ່າງນ້ອຍ 1000" : "Value must be at least 1000",
        });
      default:
        return typeof code === "string" ? code : "";
    }
  };

  const stage = useMemo(
    () => program?.programStages?.find((ps) => ps.id === currentEvent?.programStage),
    [program?.programStages, currentEvent?.programStage]
  );

  const sections = useMemo(() => {
    if (!stage) return [];
    const hasSections =
      Array.isArray(stage.programStageSections) && stage.programStageSections.length > 0;
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

  const disabled = missing.length > 0 || hasWarnings;
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(warnings);
  missingRef.current = missing;
  warningsRef.current = warnings;

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
          if (m.length > 0)
            msgs.push(
              t("nearby.save.completeAll", {
                defaultValue: isLao
                  ? "ກະລຸນາກອກຂໍ້ມູນທຸກຊ່ອງທີ່ຈໍາເປັນ."
                  : "Please complete all required fields.",
              })
            );

          if (hasW) {
            const uniqCodes = Array.from(new Set(Object.values(w)));
            msgs.push(uniqCodes.map(trWarn).join(" "));
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions, t, isLao]); 

  const maxDate = format(new Date(), "yyyy-MM-dd");

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

            const hasWarn = !!warnings?.[deId];
            const helpId = `help-${deId}`;
            const extra = deId === INTEGER_ONLY_ID ? integerOnlyGuards : {};
            const warnMsg = hasWarn ? trWarn(warnings[deId]) : "";

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
                  <DataValueFieldNoBlur
                    dataElement={deId}
                    required
                    aria-invalid={hasWarn ? "true" : undefined}
                    aria-describedby={hasWarn ? helpId : undefined}
                    {...extra}
                  />

                  {hasWarn && (
                    <Box
                      id={helpId}
                      sx={{
                        mt: 0.5,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: "#d32f2f",
                      }}
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

export default NearbyStage;
