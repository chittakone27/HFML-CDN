import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import Accordion from "../../../common/Accordion";

const GRID_COLS = "300px repeat(2, 1fr)";

const LO = {
  usable: "ໃຊ້ໄດ້ປົກກະຕິ",
  partiallyDamaged: "ເສຍຫາຍບາງສ່ວນ",
  SECTION_ICT: "ອຸປະກອນ ICT",
  SECTION_ADMIN: "ອຸປະກອນການແພດ ສໍາລັບວຽກງານ ການສື່ສານ",

  "1 TV screen": "1 ໜ້າຈໍ ໂທລະພາບ",
  "2 Microphone": "2 ໄມໂຄຣໂຟນ",
  "3 Mobile speaker": "3 ລໍາໂພງ ເຄື່ອນທີ່",
  "4 White / Black board": "4 ກະດານດຳ/ກະດານຂາວ",
  "5 Storage for IEC materials (i.e. cabinet/cupboard)":
    "5 ບ່ອນເກັບມ້ຽນອຸປະກອນສື່ສານ (ເຊັ່ນ ຕູ້, ຊັ້ນວາງ)",
};

const keyFor = (label) =>
  "equipment." +
  String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const stripRomanOrNumber = (s) =>
  String(s || "").replace(/^\s*((?:[IVXLCDM]+|\d+)\.)\s*/i, "").trim();
const normalizeLabel = (s) =>
  stripRomanOrNumber(s).replace(/\s*\/\s*/g, " / ").replace(/\s+/g, " ").trim();

const ADMIN_ROWS = [
  { label: "1 TV screen", usable: "T6lMVJitIUM", damaged: "oVmVDoqT8HZ" },
  { label: "2 Microphone", usable: "O7cJLIKPknD", damaged: "YlyG4OiR8h8" },
  { label: "3 Mobile speaker", usable: "gTWZK4S28jH", damaged: "IPVXRMKjXGK" },
  { label: "4 White / Black board", usable: "b8eicE9ogrb", damaged: "yXeBNJ4lS3A" },
  { label: "5 Storage for IEC materials (i.e. cabinet/cupboard)", usable: "DUI7h9EBTWN" }, // single-field
];

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

const IctAdminEquipments = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trHeader = (key, en) =>
    t(`equipment.${key}`, { defaultValue: isLao ? LO[key] || en : en });

  const trLabel = (label) => {
    const base = normalizeLabel(label);
    const fallback = isLao ? (LO[base] || LO[label] || base) : base;
    return t(keyFor(base), { defaultValue: fallback });
  };

  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));
  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  const stage = useMemo(() => {
    if (!program?.programStages || !currentEvent?.programStage) return null;
    return program.programStages.find((ps) => ps.id === currentEvent.programStage) || null;
  }, [program?.programStages, currentEvent?.programStage]);

  const stageDEIds = useMemo(() => {
    if (!stage?.programStageDataElements) return [];
    return stage.programStageDataElements
      .map((psde) => psde?.dataElement?.id || psde?.dataElement)
      .filter(Boolean);
  }, [stage?.programStageDataElements]);

  const adminRowsInStage = useMemo(() => {
    const set = new Set(stageDEIds);
    return ADMIN_ROWS.filter((r) => (r.usable && set.has(r.usable)) || (r.damaged && set.has(r.damaged)));
  }, [stageDEIds]);

  const usedAdminDEs = useMemo(() => {
    const s = new Set();
    adminRowsInStage.forEach((r) => {
      if (r.usable) s.add(r.usable);
      if (r.damaged) s.add(r.damaged);
    });
    return s;
  }, [adminRowsInStage]);

  const ictLikeDEs = useMemo(() => {
    return stageDEIds.filter((id) => !usedAdminDEs.has(id));
  }, [stageDEIds, usedAdminDEs]);

  const presentIds = useMemo(() => new Set(stageDEIds), [stageDEIds]);

  const missing = useMemo(() => {
    if (!currentEvent) return [];
    const m = [];
    presentIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });
    return m;
  }, [presentIds, currentEvent?.dataValues]);

  const disabled = missing.length > 0;
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  missingRef.current = missing;

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
    const KEY = "eventSave_equipment_all_required_ictAdmin";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const isDisabled = missingRef.current.length > 0;
        if (isDisabled) return { ok: false, message: "Please complete all required fields." };
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>
          {t("equipment.assessmentDate", {
            defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
          })}
        </Box>
        <EventDateFieldNoBlur
          maxDate={maxDate}
          type="eventDate"
          focus={() => {
            if (!currentEvent?.event) return;
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

      {ictLikeDEs.length > 0 && (
        <Accordion
          title={t("equipment.sections.ict", {
            defaultValue: isLao ? LO.SECTION_ICT : "ICT devices",
          })}
        >
          {ictLikeDEs.map((deId, idx) => (
            <Box
              key={deId || idx}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ width: "300px", padding: "10px" }}>
                <DataValueLabel dataElement={deId} />
              </Box>
              <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                <DataValueFieldNoBlur dataElement={deId} required />
              </Box>
            </Box>
          ))}
        </Accordion>
      )}

      {adminRowsInStage.length > 0 && (
        <Accordion
          title={t("equipment.sections.admin", {
            defaultValue: isLao ? LO.SECTION_ADMIN : "Administration & Communications",
          })}
        >
          <Box sx={{ border: "1px solid #d9d9d9", borderRadius: "8px", overflow: "hidden" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                alignItems: "stretch",
                borderBottom: "1px solid #d9d9d9",
                background: "#f6f7f9",
                fontWeight: 600,
              }}
            >
              <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }} />
              <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }}>
                {trHeader("usable", "Usable")}
              </Box>
              <Box sx={{ p: "10px 12px" }}>
                {trHeader("partiallyDamaged", "Partially damaged")}
              </Box>
            </Box>

            {adminRowsInStage.map((r, i) => (
              <Box
                key={`${r.label}-${i}`}
                sx={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  alignItems: "stretch",
                  borderBottom: i === adminRowsInStage.length - 1 ? "none" : "1px solid #e5e5e5",
                  background: i % 2 === 1 ? "#fafafa" : "transparent",
                }}
              >
                <Box
                  sx={{
                    p: "10px 12px",
                    borderRight: "1px solid #e5e5e5",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {trLabel(r.label)}
                </Box>

                <Box
                  sx={{
                    p: "6px 10px",
                    borderRight: r.damaged ? "1px solid #e5e5e5" : "none",
                    display: "flex",
                    alignItems: "center",
                    ...(r.damaged ? {} : { gridColumn: "2 / span 2" }),
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    {r.usable && <DataValueFieldNoBlur dataElement={r.usable} required />}
                  </Box>
                </Box>

                {r.damaged && (
                  <Box sx={{ p: "6px 10px", display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%" }}>
                      <DataValueFieldNoBlur dataElement={r.damaged} required />
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Accordion>
      )}
    </Box>
  );
};

export default IctAdminEquipments;
