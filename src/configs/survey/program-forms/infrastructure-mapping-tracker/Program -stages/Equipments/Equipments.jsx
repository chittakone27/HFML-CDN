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
const SCALE = 0.8;

const SECTION = {
  BASIC: "ftMRtZvarWk",
  MCH: "ipHIglCu5Z9",
  EPI: "IFiX3F88mHg",
  ADMIN: "Q68YZTN83dj",
  ICT: "kVViSpknfAg",
  MOVED_COMBINED: "XUbOnfMrc0H",
};

const LO = {
  usable: "ໃຊ້ໄດ້ປົກກະຕິ",
  image: "ຮູບພາບ",
  SECTION_ICT: "ອຸປະກອນ ICT (ຈໍານວນທີ່ໃຊ້ໄດ້ປົກກະຕິ)",
  SECTION_BASIC: "ຈໍານວນ ອຸປະກອນການແພດພື້ນຖານ (ຈໍານວນທີ່ໃຊ້ໄດ້ປົກກະຕິ)",
  SECTION_MCH: "ຈໍານວນ ອຸປະກອນ ສໍາລັບວຽກງານ ແມ່ ແລະ ເດັກ (MCH) (ຈໍານວນທີ່ໃຊ້ໄດ້ປົກກະຕິ)",
  SECTION_EPI: "ຈໍານວນ ອຸປະກອນ ສໍາລັບວຽກງານ ສັກຢາກັນພະຍາດ (EPI) (ຈໍານວນທີ່ໃຊ້ໄດ້ປົກກະຕິ)",
  SECTION_ADMIN: "ອຸປະກອນການແພດ ສໍາລັບວຽກງານ ການສື່ສານ (ຈໍານວນທີ່ໃຊ້ໄດ້ປົກກະຕິ)",
  // Basic
  "1. Oxygen concentrator": "1. ເຄື່ອງຜະລິດອົກຊີ (ບໍ່ແມ່ນບັ້ງອົກຊີ) (Oxygen concentrator)",
  "2.1. Ambu bag for adult": "2.1. ເຄື່ອງເຊີດຊູ ສໍາລັບຜູ້ໃຫຍ່ (Ambu bag for adult)",
  "2.2. Ambu bag for child or infant": "2.2. ເຄື່ອງເຊີດຊູ ສໍາລັບເດັກນ້ອຍ (Ambu bag for child or infant)",
  "3. Hemodialysis unit": "3. ເຄື່ອງຟອກໝາກໄຂ່ຫຼັງ (Hemodialysis unit)",
  "4. Hemoglobinometer":
    "4. ເຄື່ອງກວດເລືອດ (ຢ່າງໜ້ອຍກວດ CBC ໄດ້ ຫຼື ກວດໄດ້ຫຼາຍກວ່ານັ້ນ) (Hemoglobinometer)",
  "5.1. Adult sphygmomanometer": "5.1. ເຄື່ອງແທກຄວາມດັນເລືອດຜູ້ໃຫຍ່ (Adult sphygmomanometer)",
  "5.2. Newborn sphygmomanometer":
    "5.2. ເຄື່ອງວັດແທກຄວາມດັນເລືອດ ສໍາລັບເດັກເກີດໃໝ່ (Newborn sphygmomanometer)",
  "6. Glucometer": "6. ເຄື່ອງວັດແທກນໍ້າຕານໃນເລືອດ (Glucometer)",
  "7. Adult stethoscope": "7. ກ້ອງຟັງສໍາລັບຜູ້ໃຫຍ່ (Adult stethoscope)",
  "8. Pediatric stethoscope": "8. ກ້ອງຟັງສໍາລັບເດັກນ້ອຍ (Pediatric stethoscope)",
  "9. Mercury-in-glass clinical thermometer": "9. ບາຫຼອດແບບນໍ້າບາ (Mercury-in-glass clinical thermometer)",
  "10. Digital clinical thermometer": "10. ບາຫຼອດດິຈິຕອນ (Digital clinical thermometer)",
  // MCH
  "1. Mechanical weighing scale for adult":
    "1. ຊິງສັ່ງນ້ຳໜັກ ຜູ້ໃຫຍ່ ແບບເຂັມໜ້າປັດ ຫຼື ລູກກິ້ງ (Mechanical weighing scale for adult)",
  "2. Digital weighing scale for adult":
    "2. ຊິງສັ່ງນ້ຳໜັກ ຜູ້ໃຫຍ່ ແບບດິຈິຕອນ (Digital weighing scale for adult)",
  "3. Mechanical weighing scale for newborn / infant":
    "3. ຊິງສັ່ງນ້ຳໜັກ ເດັກນ້ອຍ/ເດັກເກີດໃໝ່ ແບບເຂັມໜ້າປັດ ຫຼື ລູກກີ້ງ (Mechanical weighing scale for newborn / infant)",
  "4. Digital weighing scale for newborn / infant":
    "4. ຊິງສັ່ງນ້ຳໜັກ ເດັກນ້ອຍ/ເດັກເກີດໃໝ່ ແບບດິຈິຕອນ (Digital weighing scale for newborn / infant)",
  "5. Height measure for adult": "5. ເຄື່ອງວັດແທກລວງສູງ ຜູ້ໃຫຍ່ (Height measure for adult)",
  "6. Length measurement for newborn":
    "6. ເຄື່ອງວັດແທກລວງຍາວ ເດັກນ້ອຍ/ເດັກເກີດໃໝ່ (Length measurement for newborn)",
  "7. Fetus Stethoscope / Traube / Doppler":
    "7. ກ້ອງຟັງສຽງຫົວໃຈເດັກໃນທ້ອງ (Fetus Stethoscope / Traube / Doppler)",
  "8. Autoclave for medical sterilization or dried heat sterilization oven":
    "8. ຕູ້ອົບຂ້າເຊື້ອ ອຸປະກອນການແພດ (Autoclave for medical sterilization or dried heat sterilization oven)",
  "9. MUAC measure tape": "9. ເຊືອກວັດແທກຮອບແຂນ (MUAC measure tape)",
  "10. New MCH Pink Book remaining":
    "10. ປຶ້ມບົວ (ປຶ້ມຕິດຕາມສຸຂະພາບແມ່ ແລະ ເດັກ) ຫົວໃໝ່ ທີ່ຍັງເຫຼືອຢູ່ (New MCH Pink Book remaining)",
  // EPI
  "1. Vaccine refrigerator": "1. ຕູ້ເຢັນສະເພາະເພື່ອເກັບຮັກສາວັກຊີນ (Vaccine refrigerator)",
  "2. Vaccine carrier": "2. ຖົງພາຍວັກຊີນ (Vaccine carrier)",
  "3. Cold box": "3. ຫີບເຢັນ (Cold box)",
  "4. AEFI kit":
    "4. ຊຸດແກ້ໄຂສຸກເສີນ ຫປພຊ (ທີ່ມີຢາ ແລະ ອຸປະກອນຄົບ, ແລະ ຢາຍັງບໍ່ໝົດອາຍຸ) (AEFI kit containing a complete set of medicines and equipment, all unexpired)",
  "5. Icepacks": "5. ບັ້ງນໍ້າກ້ອນ (Icepacks)",
  "6. Fridge Tag or Thermometer": "6. ເຄື່ອງວັດແທກອຸນຫະພູມຕູ້ເຢັນ (Fridge Tag or Thermometer)",

  MORE_TYPES: "ຕົວຈິງມີອຸປະກອນແບບອື່ນອີກທີ່ບໍ່ມີໃນຮູບ",
};

const keyFor = (label) =>
  "equipment." +
  String(label || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const SECTION_ROWS = {
  [SECTION.BASIC]: [
    { label: "1. Oxygen concentrator", usable: "k6STi37BjK9", image: "VPvZAg55M28", more: "ZiA3YkJHb5V" },
    { label: "2.1. Ambu bag for adult", usable: "pQr0WPezsQo", image: "HopiuuO0aYX", more: "dgayzw9X2dh" },
    { label: "2.2. Ambu bag for child or infant", usable: "r1QYYSEXNQk", image: "QQLKL3boten", more: "Qnn69bBLHal" },
    { label: "3. Hemodialysis unit", usable: "zBZ6m4ta6Vo", image: "R6c6GyfWTxN", more: "jiDWcsj9L8j" },
    { label: "4. Hemoglobinometer", usable: "oGJe86IoO1F", image: "VEpdy4pHf8h", more: "QGOus9zVD5H" },
    { label: "5.1. Adult sphygmomanometer", usable: "L5npEph6Ma4", image: "mvXsDvz4CDZ", more: "Erbkj5LOXQH" },
    { label: "5.2. Newborn sphygmomanometer", usable: "e15oX2FLlB4", image: "YeqlitNFHrR", more: "bFk8LjaMCIS" },
    { label: "6. Glucometer", usable: "idf7CX1IHEn", image: "xE2AQ5qbwkF", more: "HFwFRLMXQpD" },
    { label: "7. Adult stethoscope", usable: "F4XQkx6tIOZ", image: "gGb2bmpFh5l", more: "KZM4DumPzPp" },
    { label: "8. Pediatric stethoscope", usable: "PMJfqiytHz9", image: "Yw9knrdMLU0", more: "obZndSmylNp" },
    { label: "9. Mercury-in-glass clinical thermometer", usable: "wFgAFRsIKF9", image: "osX9NYLl0Lr", more: "IqhfWmYn1IS" },
    { label: "10. Digital clinical thermometer", usable: "S0ZKr1tEd04", image: "NZr3tWOJWsq", more: "KdDpf8Ly3nM" },
  ],
  [SECTION.MCH]: [
    { label: "1. Mechanical weighing scale for adult", usable: "E4LgLRcer1T", image: "iJvxiturOfJ", more: "ZiusmaGmgPd" },
    { label: "2. Digital weighing scale for adult", usable: "YufAR7l6iMd", image: "hzdH5tYXp6i", more: "IITmEAWjlAe" },
    { label: "3. Mechanical weighing scale for newborn / infant", usable: "y2WKfOse3Q3", image: "dBVnxaRt1H9", more: "EnlUsyE4cvV" },
    { label: "4. Digital weighing scale for newborn / infant", usable: "TCJRo52KTmj", image: "iP8Bb0JioYR", more: "hW45asQAJMf" },
    { label: "5. Height measure for adult", usable: "NLmciquYBtA", image: "tgv37RgQ5fx", more: "NYCplOUK6Yv" },
    { label: "6. Length measurement for newborn", usable: "dq7StRq2IYF", image: "ryt0IOxj0IT", more: "bZpMgbNYYJv" },
    { label: "7. Fetus Stethoscope / Traube / Doppler", usable: "qz0RYFSqR36", image: "RBtRSzaPLN3", more: "diFqjNTQgrV" },
    { label: "8. Autoclave for medical sterilization or dried heat sterilization oven", usable: "prNkyfjJ45f", image: "cuMKqPxtNcs", more: "kstskOwTtyy" },
    { label: "9. MUAC measure tape", usable: "nhnzelgD6OD", image: "YpynxWhRad7", more: "HOGd6AGXu6s" },
    { label: "10. New MCH Pink Book remaining", usable: "zW1ir3f3KFN" },
  ],
  [SECTION.EPI]: [
    { label: "1. Vaccine refrigerator", usable: "x2SHCEu9PAk", image: "O0Mn5Npwa16", more: "p4fBrZyB6m3" },
    { label: "2. Vaccine carrier", usable: "HZxJziI710Y", image: "iIAUf4qrYn4", more: "nQFfs1m5MCO" },
    { label: "3. Cold box", usable: "YmOuSL8j03k", image: "S5YoXhfmjSm", more: "xLYtPKGtacE" },
    { label: "4. AEFI kit", usable: "TF0Dkl68JpA", image: "thEbxL4v29o", more: "EXLPYqnIrGm" },
    { label: "5. Icepacks", usable: "fwL5qZQl6hF", image: "kXzUinqxUS3", more: "Ivi8QTddxUF" },
    { label: "6. Fridge Tag or Thermometer", usable: "j1hB2lmJddI", image: "fRbHYb63xeq", more: "T44KgvbWvmb" },
  ],
};

const stripRomanOrNumber = (s) =>
  String(s || "").replace(/^\s*((?:[IVXLCDM]+|\d+)\.)\s*/i, "");

const getEventDEValue = (currentEvent, deId) => {
  if (!currentEvent) return undefined;
  if (currentEvent.values && typeof currentEvent.values === "object") return currentEvent.values[deId];
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

const parseIntValue = (val) => {
  const s = String(val ?? "").trim();
  if (!s) return 0;
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? 0 : n;
};

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

  const trMoreTypes = t("equipment.moreTypes", {
    defaultValue: isLao ? LO.MORE_TYPES : "Have more types than in the photo",
  });

  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));
  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  const sections = useMemo(() => {
    if (!program?.programStages || !currentEvent?.programStage) return [];
    const stage = program.programStages.find((ps) => ps.id === currentEvent.programStage);
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  const filteredSections = sections.filter(
    (s) => ![SECTION.ICT, SECTION.ADMIN, SECTION.MOVED_COMBINED].includes(s.id)
  );

  const knownSectionIds = new Set(Object.keys(SECTION_ROWS));
  const knownSections = filteredSections.filter((s) => knownSectionIds.has(s.id));
  const unknownSections = filteredSections.filter((s) => !knownSectionIds.has(s.id));

  const allRows = useMemo(
    () => knownSections.flatMap((sec) => SECTION_ROWS[sec.id] || []),
    [knownSections]
  );

  const numericIds = useMemo(() => {
    const ids = [];
    allRows.forEach((r) => {
      if (r.usable) ids.push(r.usable);
    });
    unknownSections.forEach((sec) =>
      (sec.dataElements || []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      })
    );
    return new Set(ids);
  }, [allRows, unknownSections]);

  const conditionalRequiredImageIds = useMemo(() => {
    const required = new Set();
    if (!currentEvent) return required;

    allRows.forEach((r) => {
      if (!r.image || !r.usable) return;
      const usableVal = getEventDEValue(currentEvent, r.usable);
      if (parseIntValue(usableVal) > 0) required.add(r.image);
    });

    return required;
  }, [allRows, currentEvent?.dataValues]);

  const missing = useMemo(() => {
    if (!currentEvent) return [];
    const m = [];

    numericIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });

    conditionalRequiredImageIds.forEach((id) => {
      const val = getEventDEValue(currentEvent, id);
      if (isEmpty(val)) m.push(id);
    });

    return m;
  }, [numericIds, conditionalRequiredImageIds, currentEvent?.dataValues]);

  const disabled = missing.length > 0;

  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  missingRef.current = missing;

  useEffect(() => {
    if (!actions) return;
    if (prevDisabled.current !== disabled) {
      prevDisabled.current = disabled;
      try {
        if (actions.setLayout) actions.setLayout("disableEventCompleteButton", disabled);
        else if (actions.setCompleteDisabled) actions.setCompleteDisabled(disabled);
        else if (actions.setCanComplete) actions.setCanComplete(!disabled);
      } catch {}
    }
  }, [actions, disabled]);

  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_equipment_required_fields_only";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        if (m.length > 0) {
          return { ok: false, message: "Please complete all required fields." };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  const RedStar = () => (
    <Box component="span" sx={{ color: "#d32f2f", ml: 0.75 }} aria-hidden="true">
      *
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              useTrackerCaptureStore
                .getState()
                .actions?.changeEventProperty(
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
          <Accordion
            key={section.id || `${section.displayName}-${sIdx}`}
            title={trSectionTitle(section.displayName)}
          >
            <Box sx={{ border: "1px solid #d9d9d9", overflow: "hidden" }}>
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
                <Box sx={{ p: "10px 12px" }}>{trHeader("image", "Image")}</Box>
              </Box>
              {rows.map((r, i) => {
                const imageRequired = r.image && conditionalRequiredImageIds.has(r.image);

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
                    <Box
                      sx={{
                        p: "6px 10px",
                        borderRight: "1px solid #e5e5e5",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <DataValueFieldNoBlur dataElement={r.usable} required />
                      </Box>
                    </Box>

                    <Box sx={{ p: "6px 10px", display: "flex", alignItems: "flex-start" }}>
                      <Box sx={{ width: "100%" }}>
                        {r.image ? (
                          <Box
                            sx={{
                              transform: `scale(${SCALE})`,
                              transformOrigin: "top left",
                              width: `${(1 / SCALE) * 100}%`,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <DataValueFieldNoBlur dataElement={r.image} required={imageRequired} />
                            {imageRequired && <RedStar />}
                          </Box>
                        ) : (
                          <Box sx={{ fontSize: 12, color: "#777" }} />
                        )}

                        {r.more && (
                          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <DataValueFieldNoBlur dataElement={r.more} />
                            <Box sx={{ fontSize: 13, lineHeight: 1.3 }}>{trMoreTypes}</Box>
                          </Box>
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

      {unknownSections.map((section, sIdx) => (
        <Accordion
          key={section.id || `${section.displayName}-${sIdx}`}
          title={trSectionTitle(section.displayName)}
        >
          {(section.dataElements ?? []).map((de, dIdx) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;
            return (
              <Box
                key={deId || dIdx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box
                  sx={{
                    width: "300px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mr: 0.75, color: "#d32f2f" }}>*</Box>
                  <Box>
                    <DataValueLabel dataElement={deId} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    borderLeft: "1px solid #e0e0e0",
                    padding: "10px",
                  }}
                >
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

export default Equipments;
