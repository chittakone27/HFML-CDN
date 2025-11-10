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

const GRID_COLS = "300px repeat(3, 1fr)"; // label + usable + damaged + image
const SCALE = 0.8; // scale factor for the image uploader (0.75–0.9 looks good)

// Section IDs (stable)
const SECTION = {
  BASIC: "ftMRtZvarWk",
  MCH: "ipHIglCu5Z9",
  EPI: "IFiX3F88mHg",
  ADMIN: "Q68YZTN83dj",
  ICT: "kVViSpknfAg",
  MOVED_COMBINED: "XUbOnfMrc0H", // exclude from this stage if visible
};

// Lao quick-fallbacks
const LO = {
  usable: "ໃຊ້ໄດ້ປົກກະຕິ",
  partiallyDamaged: "ເສຍຫາຍບາງສ່ວນແຕ່ຍັງໃຊ້ໄດ້ຢູ່",
  image: "ຮູບພາບ",
  SECTION_ICT: "ອຸປະກອນ ICT",
  SECTION_BASIC: "ຈໍານວນ ອຸປະກອນການແພດພື້ນຖານ",
  SECTION_MCH: "ຈໍານວນ ອຸປະກອນ ສໍາລັບວຽກງານ ແມ່ ແລະ ເດັກ (MCH)",
  SECTION_EPI: "ຈໍານວນ ອຸປະກອນ ສໍາລັບວຽກງານ ສັກຢາກັນພະຍາດ (EPI)",
  SECTION_ADMIN: "ອຸປະກອນການແພດ ສໍາລັບວຽກງານ ການສື່ສານ",
  "1. Oxygen concentrator": "1. ເຄື່ອງຜະລິດອົກຊີ (Oxygen concentrator)",
  "2. Ventilator (Inhaler)": "2. ເຄື່ອງເຊີດຊູ (Ambu bag)",
  "3. Hemodialysis unit": "3. ເຄື່ອງຟອກໝາກໄຂ່ຫຼັງ (Hemodialysis unit)",
  "4. Hemoglobinometer": "4. ເຄື່ອງກວດເລືອດ (Hemoglobinometer)",
  "5. Adult sphygmomanometer": "5. ເຄື່ອງແທກຄວາມດັນເລືອດຜູ້ໃຫຍ່ (Adult sphygmomanometer)",
  "6. Glucometer": "6. ເຄື່ອງວັດແທກນໍ້າຕານໃນເລືອດ (Glucometer)",
  "7. Adult stethoscope": "7. ກ້ອງຟັງສໍາລັບຜູ້ໃຫຍ່ (Adult stethoscope)",
  "8. Pediatric stethoscope": "8. ກ້ອງຟັງສໍາລັບເດັກນ້ອຍ (Pediatric stethoscope)",
  "9. Clinical Thermometer": "9. ເຄື່ອງວັດແທກອຸນຫະພູມຮ່າງກາຍ (Clinical Thermometer)",
  "1. Mechanical weighing scale for adult":
    "1. ເຄື່ອງວັດແທກນ້ຳໜັກສໍາລັບຜູ້ໃຫຍ່ ແບບມີເຂັມໜ້າປັດ (Mechanical weighing scale for adult)",
  "2. Digital weighing scale for adult":
    "2. ເຄື່ອງວັດແທກນ້ຳໜັກສໍາລັບຜູ້ໃຫຍ່ ແບບດິຈິຕອນ (Digital weighing scale for adult)",
  "3. Mechanical weighing scale for newborn / infant":
    "3. ເຄື່ອງວັດແທກນ້ຳໜັກສໍາລັບເດັກນ້ອຍ/ເດັກເກີດໃໝ່ ແບບມີເຂັມໜ້າປັດ (Mechanical weighing scale for newborn / infant)",
  "4. Digital weighing scale for newborn / infant":
    "4. ເຄື່ອງວັດແທກນ້ຳໜັກສໍາລັບເດັກນ້ອຍ/ເດັກເກີດໃໝ່ ແບບດິຈິຕອນ (Digital weighing scale for newborn / infant)",
  "5. Height measure for adult": "5. ເຄື່ອງວັດແທກລວງສູງສໍາລັບ ຜູ້ໃຫຍ່ (Height measure for adult)",
  "6. Height measure for newborn / infant":
    "6. ເຄື່ອງວັດແທກລວງສູງສໍາລັບເດັກນ້ອຍ/ເດັກເກີດໃໝ່ (Height measure for newborn / infant)",
  "7. Fetus Stethoscope / Traube / Doppler": "7. ກ້ອງຟັງສຽງຫົວໃຈເດັກໃນທ້ອງ (Fetus Stethoscope / Traube / Doppler)",
  "8. Autoclave for medical sterilization": "8. ຕູ້ອົບຂ້າເຊື້ອ (Autoclave for medical sterilization)",
  "9. MUAC measure tape": "9. ເຊືອກວັດແທກຮອບແຂນ (MUAC measure tape)",
  "10. New MCH Pink Book remaining":
    "10. ປຶ້ມບົວ (ປຶ້ມຕິດຕາມສຸຂະພາບແມ່ ແລະ ເດັກ) ຫົວໃໝ່ ທີ່ຍັງເຫຼືອຢູ່ (New MCH Pink Book remaining)",
  "1. Vaccine refrigerator": "1. ຕູ້ເຢັນສະເພາະເພື່ອເກັບຮັກສາວັກຊີນ (Vaccine refrigerator)",
  "2. Vaccine carrier": "2. ຖົງພາຍວັກຊີນ (Vaccine carrier)",
  "3. Cold box": "3. ຫີບເຢັນ (Cold box)",
  "4. AEFI kit": "4. ຊຸດແກ້ໄຂສຸກເສີນ ຫປພຊ (AEFI kit)",
  "5. Icepacks": "5. ບັ້ງນໍ້າກ້ອນ (Icepacks)",
  "6. Fridge Tag or Thermometer": "6. ເຄື່ອງວັດແທກອຸນຫະພູມຕູ້ເຢັນ (Fridge Tag or Thermometer)",
};

const keyFor = (label) =>
  "equipment." +
  String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

// Rows we still render here (BASIC, MCH, EPI)
const SECTION_ROWS = {
  [SECTION.BASIC]: [
    { label: "1. Oxygen concentrator", usable: "k6STi37BjK9", damaged: "NykhziIHZHH", image: "VPvZAg55M28" },
    { label: "2. Ventilator (Inhaler)", usable: "pQr0WPezsQo", damaged: "lZAqGYJYMWS", image: "HopiuuO0aYX" },
    { label: "3. Hemodialysis unit", usable: "zBZ6m4ta6Vo", damaged: "SMxb3OSjeOU", image: "R6c6GyfWTxN" },
    { label: "4. Hemoglobinometer", usable: "oGJe86IoO1F", damaged: "h12djK5TrqY", image: "VEpdy4pHf8h" },
    { label: "5. Adult sphygmomanometer", usable: "L5npEph6Ma4", damaged: "cJ7H5LeVezT", image: "mvXsDvz4CDZ" },
    { label: "6. Glucometer", usable: "idf7CX1IHEn", damaged: "YUD4SAQhiJk", image: "xE2AQ5qbwkF" },
    { label: "7. Adult stethoscope", usable: "F4XQkx6tIOZ", damaged: "WNhuDD4EY3i", image: "gGb2bmpFh5l" },
    { label: "8. Pediatric stethoscope", usable: "PMJfqiytHz9", damaged: "qhL2JRvNmBj", image: "Yw9knrdMLU0" },
    { label: "9. Clinical Thermometer", usable: "wFgAFRsIKF9", damaged: "Stl24YMrVhY", image: "osX9NYLl0Lr" },
  ],
  [SECTION.MCH]: [
    { label: "1. Mechanical weighing scale for adult", usable: "E4LgLRcer1T", damaged: "xKQNwzbVcp8", image: "iJvxiturOfJ" },
    { label: "2. Digital weighing scale for adult", usable: "YufAR7l6iMd", damaged: "DiNZw4CAiGW", image: "hzdH5tYXp6i" },
    { label: "3. Mechanical weighing scale for newborn / infant", usable: "y2WKfOse3Q3", damaged: "sIVa4XMuh2P", image: "dBVnxaRt1H9" },
    { label: "4. Digital weighing scale for newborn / infant", usable: "TCJRo52KTmj", damaged: "I2qQThEJBtZ", image: "iP8Bb0JioYR" },
    { label: "5. Height measure for adult", usable: "NLmciquYBtA", damaged: "tH0RZuet4SQ", image: "tgv37RgQ5fx" },
    { label: "6. Height measure for newborn / infant", usable: "dq7StRq2IYF", damaged: "JMhufeXTXtJ", image: "ryt0IOxj0IT" },
    { label: "7. Fetus Stethoscope / Traube / Doppler", usable: "qz0RYFSqR36", damaged: "ncCBoKCq9ne", image: "RBtRSzaPLN3" },
    { label: "8. Autoclave for medical sterilization", usable: "prNkyfjJ45f", damaged: "UVB85154Q7J", image: "cuMKqPxtNcs" },
    { label: "9. MUAC measure tape", usable: "nhnzelgD6OD", damaged: "zxMdn4JiOvD", image: "YpynxWhRad7" },
    { label: "10. New MCH Pink Book remaining", usable: "zW1ir3f3KFN" },
  ],
  [SECTION.EPI]: [
    { label: "1. Vaccine refrigerator", usable: "x2SHCEu9PAk", damaged: "Vb7fspxnk9C", image: "O0Mn5Npwa16" },
    { label: "2. Vaccine carrier", usable: "HZxJziI710Y", damaged: "cadhpfc552z", image: "iIAUf4qrYn4" },
    { label: "3. Cold box", usable: "YmOuSL8j03k", damaged: "D2WuLIJa8sg", image: "S5YoXhfmjSm" },
    { label: "4. AEFI kit", usable: "TF0Dkl68JpA", damaged: "tiF0aOGN1mC", image: "thEbxL4v29o" },
    { label: "5. Icepacks", usable: "fwL5qZQl6hF", damaged: "w33QZtCIVdE", image: "kXzUinqxUS3" },
    { label: "6. Fridge Tag or Thermometer", usable: "j1hB2lmJddI", damaged: "H45XFcl92ZS", image: "fRbHYb63xeq" },
  ],
};

const stripRomanOrNumber = (s) =>
  String(s || "").replace(/^\s*((?:[IVXLCDM]+|\d+)\.)\s*/i, "");

// --- helpers to read values / check emptiness ---
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
  String(str).replace(/[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g, (ch) => {
    const c = ch.charCodeAt(0);
    if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50);
    if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0);
    if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660);
    if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0);
    if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966);
    return ch;
  });

const Equipments = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trHeader = (key, en) =>
    t(`equipment.${key}`, { defaultValue: isLao ? LO[key] || en : en });

  const trLabel = (label) =>
    t(keyFor(label), { defaultValue: isLao ? LO[label] || label : label });

  const trSectionTitle = (displayName) => {
    const base = stripRomanOrNumber(displayName).trim();
    const n = base.toLowerCase();
    if (n === "basic medical equipment") {
      return t("equipment.sections.basic", { defaultValue: isLao ? LO.SECTION_BASIC : base });
    }
    if (n === "items related to mother and child health (mch)") {
      return t("equipment.sections.mch", { defaultValue: isLao ? LO.SECTION_MCH : base });
    }
    if (n === "items related to immunization (epi)") {
      return t("equipment.sections.epi", { defaultValue: isLao ? LO.SECTION_EPI : base });
    }
    return displayName;
  };

  const trIntOnly = t("equipment.error.integerOnly", {
    defaultValue: isLao
      ? "ອະນຸຍາດໃສ່ແຕ່ເລກຈໍານວນເຕັມ (ບໍ່ອະນຸຍາດເລກຈຸດທົດສະນິຍົມ)."
      : "Only whole numbers are allowed (no decimals).",
  });

  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));
  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  const sections = useMemo(() => {
    if (!program?.programStages || !currentEvent?.programStage) return [];
    const stage = program.programStages.find((ps) => ps.id === currentEvent.programStage);
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  // Filter OUT ICT + Admin (and the combined section if it accidentally appears in this stage)
  const filteredSections = sections.filter(
    (s) => ![SECTION.ICT, SECTION.ADMIN, SECTION.MOVED_COMBINED].includes(s.id)
  );

  const knownSectionIds = new Set(Object.keys(SECTION_ROWS));
  const knownSections = filteredSections.filter((s) => knownSectionIds.has(s.id));
  const unknownSections = filteredSections.filter((s) => !knownSectionIds.has(s.id));

  // Collect DE ids for numeric (required) vs image (optional)
  const allRows = useMemo(
    () => knownSections.flatMap((sec) => SECTION_ROWS[sec.id] || []),
    [knownSections]
  );
  const numericIds = useMemo(() => {
    const ids = [];
    allRows.forEach((r) => {
      if (r.usable) ids.push(r.usable);
      if (r.damaged) ids.push(r.damaged);
    });
    // Unknown section DEs are also treated as numeric/required
    unknownSections.forEach((sec) =>
      (sec.dataElements || []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      })
    );
    return new Set(ids);
  }, [allRows, unknownSections]);

  // Build warnings map: integer-only for numeric fields only (NOT for image)
  const warnings = useMemo(() => {
    if (!currentEvent) return {};
    const w = {};
    numericIds.forEach((id) => {
      const raw = getEventDEValue(currentEvent, id);
      if (raw == null) return;
      const s = toAsciiDigits(String(raw)).trim();
      if (s !== "" && !/^\d+$/.test(s)) {
        w[id] = trIntOnly;
      }
    });
    return w;
  }, [numericIds, currentEvent?.dataValues, trIntOnly]);

  // Missing: required = numeric fields only (NOT image)
  const missing = useMemo(() => {
    if (!currentEvent) return [];
    const m = [];
    numericIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });
    return m;
  }, [numericIds, currentEvent?.dataValues]);

  const hasWarnings = Object.keys(warnings).length > 0;
  const disabled = missing.length > 0 || hasWarnings;

  // Keep latest for save handler
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(warnings);
  missingRef.current = missing;
  warningsRef.current = warnings;

  // ---------- Stage-wide compulsory + validation guard ----------
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

  // Register Save handler once; read latest via refs
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_equipment_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current;
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

  // integer-only input guards (apply to numeric fields only)
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
      if (!/^\d+$/.test(txt.trim())) {
        e.preventDefault();
      }
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const digits = s.replace(/[^\d]/g, "");
      if (s !== digits) {
        e.target.value = digits;
      }
    },
  };

  // Reusable red asterisk
  const RedStar = () => (
    <Box component="span" sx={{ color: "#d32f2f", ml: 0.75 }} aria-hidden="true">
      *
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Assessment date */}
      <Box>
        <Box sx={{ fontWeight: 400, mb: 0.5 }}>
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
              useTrackerCaptureStore.getState().actions?.changeEventProperty(
                currentEvent.event,
                "eventDate",
                dueDate && dueDate > maxDate ? maxDate : dueDate || maxDate
              );
            }
          }}
        />
      </Box>

      {knownSections.map((section, sIdx) => {
        const rows = SECTION_ROWS[section.id] ?? [];
        return (
          <Accordion key={section.id || `${section.displayName}-${sIdx}`} title={trSectionTitle(section.displayName)}>
            <Box sx={{ border: "1px solid #d9d9d9", overflow: "hidden" }}>
              {/* header */}
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
                <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }}>
                  {trHeader("partiallyDamaged", "Partially damaged")}
                </Box>
                <Box sx={{ p: "10px 12px" }}>{trHeader("image", "Image")}</Box>
              </Box>

              {/* rows */}
              {rows.map((r, i) => {
                const usableWarn = !!warnings[r.usable];
                const damagedWarn = r.damaged ? !!warnings[r.damaged] : false;
                const usableHelpId = `help-${r.usable}`;
                const damagedHelpId = r.damaged ? `help-${r.damaged}` : null;

                return (
                  <Box
                    key={`${r.label}-${i}`}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: GRID_COLS,
                      alignItems: "stretch",
                      borderBottom: i === rows.length - 1 ? "none" : "1px solid #e5e5e5",
                      background: i % 2 === 1 ? "#fafafa" : "transparent",
                    }}
                  >
                    {/* label cell with red * (numeric columns are required) */}
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

                    {/* usable (required numeric) */}
                    <Box
                      sx={{
                        p: "6px 10px",
                        borderRight: "1px solid #e5e5e5",
                        display: "flex",
                        alignItems: "flex-start",
                        ...(r.damaged ? {} : { gridColumn: "2 / span 3" }),
                        backgroundColor: usableWarn ? "#fff5f5" : "transparent",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <DataValueFieldNoBlur
                          dataElement={r.usable}
                          required
                          aria-invalid={usableWarn ? "true" : undefined}
                          aria-describedby={usableWarn ? usableHelpId : undefined}
                          {...integerOnlyGuards}
                        />
                        {usableWarn && (
                          <Box
                            id={usableHelpId}
                            sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                          >
                            {warnings[r.usable]}
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* damaged (required numeric if present) */}
                    {r.damaged ? (
                      <Box
                        sx={{
                          p: "6px 10px",
                          borderRight: "1px solid #e5e5e5",
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
                            {...integerOnlyGuards}
                          />
                          {damagedWarn && (
                            <Box
                              id={damagedHelpId}
                              sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}
                            >
                              {warnings[r.damaged]}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      // no damaged column for this row — empty placeholder cell to keep grid aligned
                      <Box sx={{ p: "6px 10px", borderRight: "1px solid #e5e5e5" }} />
                    )}

                    {/* image (optional) — scaled smaller to reduce row height */}
                    <Box sx={{ p: "6px 10px", display: "flex", alignItems: "flex-start" }}>
                      <Box sx={{ width: "100%" }}>
                        {r.image ? (
                          <Box
                            sx={{
                              transform: `scale(${SCALE})`,
                              transformOrigin: "top left",
                              width: `${(1 / SCALE) * 100}%`, // compensate width shrink so it still fills cell
                            }}
                          >
                            <DataValueFieldNoBlur dataElement={r.image} />
                          </Box>
                        ) : (
                          <Box sx={{ fontSize: 12, color: "#777" }} />
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Accordion>
        );
      })}

      {/* Unknown sections (rare) — still enforce integer-only + red * (no image column) */}
      {unknownSections.map((section, sIdx) => (
        <Accordion key={section.id || `${section.displayName}-${sIdx}`} title={trSectionTitle(section.displayName)}>
          {(section.dataElements ?? []).map((de, dIdx) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;
            const hasWarn = !!warnings[deId];
            const helpId = `help-${deId}`;
            return (
              <Box
                key={deId || dIdx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e0e0e0",
                  backgroundColor: hasWarn ? "#fff5f5" : "transparent",
                }}
              >
                <Box sx={{ width: "300px", padding: "10px", display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 0.75, color: "#d32f2f" }}>*</Box>
                  <Box>
                    <DataValueLabel dataElement={deId} />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                  <DataValueFieldNoBlur
                    dataElement={deId}
                    required
                    aria-invalid={hasWarn ? "true" : undefined}
                    aria-describedby={hasWarn ? helpId : undefined}
                    {...integerOnlyGuards}
                  />
                  {hasWarn && (
                    <Box id={helpId} sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                      {warnings[deId]}
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

export default Equipments;
