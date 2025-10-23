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

const INTEGER_ONLY_ID = "OWAR8Vpa8IW"; 

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

  const trWarn = (code) => {
    switch (code) {
      case "footVsCar":
        return t("village.rules.footVsCar", {
          defaultValue: isLao
            ? "ເວລາເດີນທາງດ້ວຍທ້າວຕ້ອງຫຼາຍກວ່າເວລາໄປດ້ວຍລົດ."
            : "Travel time on foot must be greater than by car.",
        });
      case "integerOnly":
        return t("village.rules.integerOnly", {
          defaultValue: isLao
            ? "ກະລຸນາໃສ່ເປັນຈໍານວນເຕັມ (0–9) ເທົ່ານັ້ນ."
            : "Only whole numbers are allowed.",
        });
      default:
        return typeof code === "string" ? code : "";
    }
  };

  const sections = useMemo(() => {
    const stage = program?.programStages?.find(
      (ps) => ps.id === currentEvent?.programStage
    );
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

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

  const hasWarnings = !!props?.warnings && Object.keys(props.warnings).length > 0;
  const disabled = missing.length > 0 || hasWarnings;

  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(props?.warnings || {});
  missingRef.current = missing;
  warningsRef.current = props?.warnings || {};

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
    const KEY = "eventSave_villages_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).length > 0;

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0)
            msgs.push(
              t("village.save.completeAll", {
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
        <Accordion key={section.id || section.displayName} title={section.displayName}>
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            const hasWarn = !!props?.warnings?.[deId];
            const helpId = `help-${deId}`;
            const extra = deId === INTEGER_ONLY_ID ? integerOnlyGuards : {};
            const warnMsg = hasWarn ? trWarn(props.warnings[deId]) : "";

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
                  <DataValueLabel dataElement={deId} />
                </Box>

                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", p: "10px" }}>
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

export default VillagesStage;
