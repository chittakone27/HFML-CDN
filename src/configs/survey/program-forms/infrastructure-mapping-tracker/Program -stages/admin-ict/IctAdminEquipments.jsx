// src/ui/TrackerCapture/EventForm/Program-stages/Equipments/IctAdminEquipments.jsx
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
const ALLOW_DECIMAL_ID = "DUI7h9EBTWN"; // the ONLY field that may accept decimals

// Lao quick-fallbacks
const LO = {
  usable: "ໃຊ້ໄດ້ປົກກະຕິ",
  partiallyDamaged: "ເສຍຫາຍບາງສ່ວນ",
  SECTION_ICT: "ອຸປະກອນ ICT",
  SECTION_ADMIN: "ອຸປະກອນການແພດ ສໍາລັບວຽກງານ ການສື່ສານ",

  // Admin item fallbacks (UNNUMBERED keys)
  "5. Printer": "5. ເຄື່ອງພິມເອກະສານທີ່ໃຊ້ໄດ້",
  "1. TV screen": "1. ໜ້າຈໍ ໂທລະພາບ",
  "2. Wireless Microphone": "2. ໄມໂຄຣໂຟນ ເຄື່ອນທີ່",
  "3. Mobile speaker": "3. ລໍາໂພງ ເຄື່ອນທີ່",
  "4. White / Black board": "4. ກະດານດຳ/ກະດານຂາວ",
  "5. Storage for IEC materials":
    "5. ບ່ອນເກັບມ້ຽນອຸປະກອນສື່ສານ (ເຊັ່ນ ຕູ້, ຊັ້ນວາງ)",
};

// i18n key from label
const keyFor = (label) =>
  "equipment." +
  String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// Normalize labels so LO fallback works with or without numbering/spaces
const stripRomanOrNumber = (s) =>
  String(s || "").replace(/^\s*((?:[IVXLCDM]+|\d+)\.)\s*/i, "").trim();
const normalizeLabel = (s) =>
  stripRomanOrNumber(s).replace(/\s*\/\s*/g, " / ").replace(/\s+/g, " ").trim();

// Admin rows (known DEs)
const ADMIN_ROWS = [
  { label: "5. 5. Printer", usable: "tKUezh4lk7d" },
  { label: "1.1. TV screen", usable: "T6lMVJitIUM", damaged: "oVmVDoqT8HZ" },
  { label: "2.2. Wireless Microphone", usable: "O7cJLIKPknD", damaged: "YlyG4OiR8h8" },
  { label: "3.3.  Mobile speaker", usable: "gTWZK4S28jH", damaged: "IPVXRMKjXGK" },
  { label: "4.4.  White / Black board", usable: "b8eicE9ogrb", damaged: "yXeBNJ4lS3A" },
  { label: "5.5. Storage for IEC materials",
    usable: "DUI7h9EBTWN", // single-field (exception, decimals allowed)
  },
];

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

// normalize non-ASCII digits to ASCII (Thai/Lao/Arabic, etc.)
const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); // Thai
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); // Lao
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); // Arabic-Indic
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); // Ext Arabic-Indic
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); // Devanagari
      return ch;
    }
  );

// Reusable red asterisk
const RedStar = () => (
  <Box component="span" sx={{ color: "#d32f2f", ml: 0.5 }} aria-hidden="true">
    *
  </Box>
);

const IctAdminEquipments = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trHeader = (key, en) =>
    t(`equipment.${key}`, { defaultValue: isLao ? LO[key] || en : en });

  // number-agnostic label translation
  const trLabel = (label) => {
    const base = normalizeLabel(label);
    const fallback = isLao ? LO[base] || LO[label] || base : base;
    return t(keyFor(base), { defaultValue: fallback });
  };

  // Bilingual integer-only message
  const trIntOnly = t("equipment.error.integerOnly", {
    defaultValue: isLao
      ? "ອະນຸຍາດໃສ່ແຕ່ເລກຈໍານວນເຕັມ (ບໍ່ອະນຸຍາດເລກຈຸດທົດສະນິຍົມ)."
      : "Only whole numbers are allowed (no decimals).",
  });

  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));
  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  // Pull ALL DEs on this program stage (no reliance on sections)
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

  // Admin rows actually available on this stage
  const adminRowsInStage = useMemo(() => {
    const set = new Set(stageDEIds);
    return ADMIN_ROWS.filter(
      (r) => (r.usable && set.has(r.usable)) || (r.damaged && set.has(r.damaged))
    );
  }, [stageDEIds]);

  // Mark Admin DEs as "used"
  const usedAdminDEs = useMemo(() => {
    const s = new Set();
    adminRowsInStage.forEach((r) => {
      if (r.usable) s.add(r.usable);
      if (r.damaged) s.add(r.damaged);
    });
    return s;
  }, [adminRowsInStage]);

  // Everything else on the stage = ICT/default list
  const ictLikeDEs = useMemo(() => {
    return stageDEIds.filter((id) => !usedAdminDEs.has(id));
  }, [stageDEIds, usedAdminDEs]);

  // ---- Missing + validation (whole number for all except ALLOW_DECIMAL_ID) ----
  const presentIds = useMemo(() => new Set(stageDEIds), [stageDEIds]);

  const warnings = useMemo(() => {
    if (!currentEvent) return {};
    const w = {};
    presentIds.forEach((id) => {
      if (id === ALLOW_DECIMAL_ID) return; // skip integer-only validation for exception
      const raw = getEventDEValue(currentEvent, id);
      if (raw == null) return;
      const s = toAsciiDigits(String(raw)).trim();
      if (s !== "" && !/^\d+$/.test(s)) {
        w[id] = trIntOnly;
      }
    });
    return w;
  }, [presentIds, currentEvent?.dataValues, trIntOnly]);

  const missing = useMemo(() => {
    if (!currentEvent) return [];
    const m = [];
    presentIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });
    return m;
  }, [presentIds, currentEvent?.dataValues]);

  const hasWarnings = Object.keys(warnings).length > 0;
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
    const KEY = "eventSave_equipment_all_required_ictAdmin";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        if (m.length > 0 || Object.keys(w).length > 0) {
          const msgs = [];
          if (m.length > 0) msgs.push("Please complete all required fields.");
          if (Object.keys(w).length > 0) {
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

  // integer-only input guards (apply to ALL, except ALLOW_DECIMAL_ID)
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
      const ascii = toAsciiDigits(txt).trim();
      if (!/^\d+$/.test(ascii)) {
        e.preventDefault();
      }
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const ascii = toAsciiDigits(s);
      const digits = ascii.replace(/[^\d]/g, "");
      if (s !== digits) {
        e.target.value = digits;
      }
    },
  };

  // decimal-allowed guards (ONLY for ALLOW_DECIMAL_ID)
  const decimalGuards = {
    type: "number",
    step: "any",
    inputProps: { inputMode: "decimal" },
    onKeyDown: (e) => {
      // allow a single dot, block scientific notation & signs
      const blocked = ["e", "E", "+", "-", " "];
      if (blocked.includes(e.key)) e.preventDefault();
      if (e.key === ".") {
        const v = e.currentTarget.value || "";
        if (v.includes(".")) e.preventDefault();
      }
    },
    onPaste: (e) => {
      const txt = (e.clipboardData || window.clipboardData).getData("text") || "";
      const ascii = toAsciiDigits(txt).trim();
      if (!/^\d+(\.\d+)?$/.test(ascii)) e.preventDefault();
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const ascii = toAsciiDigits(s);
      // strip everything except digits and a single dot
      const cleaned = ascii.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, "");
      if (s !== cleaned) e.target.value = cleaned;
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Assessment date */}
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

      {/* ICT / default block (first) */}
      {ictLikeDEs.length > 0 && (
        <Accordion
          title={t("equipment.sections.ict", {
            defaultValue: isLao
              ? LO.SECTION_ICT
              : "All ICT devices (including those no longer functional)",
          })}
        >
          {ictLikeDEs.map((deId, idx) => {
            const hasWarn = !!warnings[deId];
            const helpId = `help-${deId}`;
            const isIntegerOnly = deId !== ALLOW_DECIMAL_ID;
            const extra = isIntegerOnly ? integerOnlyGuards : decimalGuards;

            return (
              <Box
                key={deId || idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: hasWarn ? "#fff5f5" : "transparent",
                }}
              >
                <Box
                  sx={{ width: "300px", padding: "10px", display: "flex", alignItems: "center" }}
                >
                  <DataValueLabel dataElement={deId} />
                  <RedStar />
                </Box>
                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
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
                      sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                    >
                      {warnings[deId]}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Accordion>
      )}

      {/* Admin block (second) */}
      {adminRowsInStage.length > 0 && (
        <Accordion
          title={t("equipment.sections.admin", {
            defaultValue: isLao ? LO.SECTION_ADMIN : "Administration & Communications",
          })}
        >
          <Box sx={{ border: "1px solid #d9d9d9", borderRadius: "8px", overflow: "hidden" }}>
            {/* header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                alignItems: "stretch",
                borderBottom: "1px solid #d9d9d9",
                background: "#f6f7f9",
                fontWeight: 400,
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

            {adminRowsInStage.map((r, i) => {
              const usableWarn = !!warnings[r.usable];
              const damagedWarn = r.damaged ? !!warnings[r.damaged] : false;
              const usableHelpId = `help-${r.usable}`;
              const damagedHelpId = r.damaged ? `help-${r.damaged}` : null;

              const usableIntegerOnly = r.usable && r.usable !== ALLOW_DECIMAL_ID;
              const damagedIntegerOnly = r.damaged && r.damaged !== ALLOW_DECIMAL_ID;

              return (
                <Box
                  key={`${r.label}-${i}`}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: GRID_COLS,
                    alignItems: "stretch",
                    borderBottom:
                      i === adminRowsInStage.length - 1 ? "none" : "1px solid #e5e5e5",
                    background: i % 2 === 1 ? "#fafafa" : "transparent",
                  }}
                >
                  {/* Label with red * */}
                  <Box
                    sx={{
                      p: "10px 12px",
                      borderRight: "1px solid #e5e5e5",
                      display: "flex",
                      alignItems: "center",
                      fontSize: 16,
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                    }}
                  >
                    {trLabel(r.label)}
                    <RedStar />
                  </Box>

                  {/* Usable */}
                  <Box
                    sx={{
                      p: "6px 10px",
                      borderRight: r.damaged ? "1px solid #e5e5e5" : "none",
                      display: "flex",
                      alignItems: "flex-start",
                      ...(r.damaged ? {} : { gridColumn: "2 / span 2" }),
                      backgroundColor: usableWarn ? "#fff5f5" : "transparent",
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      {r.usable && (
                        <>
                          <DataValueFieldNoBlur
                            dataElement={r.usable}
                            required
                            aria-invalid={usableWarn ? "true" : undefined}
                            aria-describedby={usableWarn ? usableHelpId : undefined}
                            {...(usableIntegerOnly ? integerOnlyGuards : decimalGuards)}
                          />
                          {usableWarn && (
                            <Box
                              id={usableHelpId}
                              sx={{
                                mt: 0.5,
                                fontSize: 12,
                                lineHeight: "16px",
                                color: "#d32f2f",
                              }}
                            >
                              {warnings[r.usable]}
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>

                  {/* Partially damaged */}
                  {r.damaged && (
                    <Box
                      sx={{
                        p: "6px 10px",
                        display: "flex",
                        alignItems: "flex-start",
                        backgroundColor: damagedWarn ? "#fff5f5" : "transparent",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <DataValueFieldNoBlur
                          dataElement={r.damaged}
                          required
                          aria-invalid={damagedWarn ? "true" : undefined}
                          aria-describedby={damagedWarn ? damagedHelpId : undefined}
                          {...(damagedIntegerOnly ? integerOnlyGuards : decimalGuards)}
                        />
                        {damagedWarn && (
                          <Box
                            id={damagedHelpId || undefined}
                            sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                          >
                            {warnings[r.damaged]}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Accordion>
      )}
    </Box>
  );
};

export default IctAdminEquipments;
