// src/configs/laotracker/program-forms/villages-catchment/VillagesStage.jsx
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

// ✅ TEA that stores the health facility
const FACILITY_ATTR_ID = "RLamCNXOwQ5";

// TEI attribute helper
const getAttr = (tei, id) =>
  (tei?.attributes || []).find((a) => a.attribute === id)?.value || "";

// Strip code prefix: "(0501PH01) PH Bokeo" -> "PH Bokeo"
const stripCodePrefix = (s = "") => {
  const str = String(s || "").trim();
  const match = str.match(/^\([^)]*\)\s*(.+)$/);
  return match ? match[1] : str;
};

// Normalizer for section name comparison
const normalize = (s) =>
  String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

// Program: sBkMdki30ua | Stage: JrbpF3DG3FL
const INTEGER_ONLY_ID = "OWAR8Vpa8IW"; // integer-only DE

// Static EN/LO section names (the ones you configured in metadata)
const DRY_SECTION_EN =
  "Dry-season travel conditions from this health facility to the nearby health facility";
const DRY_SECTION_LO =
  "ການເດີນທາງໃນລະດູແຫ້ງ ຈາກສະຖານທີ່ບໍລິການຂອງເຮົາ ຫາ ສະຖານທີ່ບໍລິການໃກ້ຄຽງ";

const RAINY_SECTION_EN =
  "Rainy-season travel conditions from this health facility to the nearby health facility";
const RAINY_SECTION_LO =
  "ການເດີນທາງໃນລະດູຝົນ ຈາກສະຖານທີ່ບໍລິການຂອງເຮົາ ຫາ ສະຖານທີ່ບໍລິການໃກ້ຄຽງ";

// Catchment section (details of catchment area)
const SECTION_EN = "Details of catchment area";
const SECTION_LO = "ລາຍລະອຽດເຂດບໍລິການ";

const VillagesStage = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({ program: state.program, orgUnit: state.orgUnit }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions, data: state.data }))
  );
  const { currentEvent } = useCurrentEvent();
  const currentTei = data?.currentTei;

  // ⬇ warnings + hiddenFields + hiddenOptions (ALL visible will be required below)
  const { warnings, hiddenFields = {}, hiddenOptions = {} } = useVillageRules();

  const trStageDate = t("village.stageDate", {
    defaultValue: isLao ? "ວັນທີ່ບັນທຶກ" : "Stage date",
  });

  const trWarn = (code) => {
    switch (code) {
      case "integerOnly":
        return t("village.rules.integerOnly", {
          defaultValue: isLao
            ? "ກະລຸນາໃສ່ເປັນຈໍານວນເຕັມ (0–9) ເທົ່ານັ້ນ."
            : "Please enter a whole number (digits 0–9 only).",
        });
      case "min1000OrZero":
        return t("village.rules.min1000OrZero", {
          defaultValue: isLao
            ? "ຄ່າຕ້ອງເປັນ 0 ຫຼື ແຕ່ 1000 ຂຶ້ນໄປ."
            : "Value must be 0 or at least 1000.",
        });
      default:
        return typeof code === "string" ? code : "";
    }
  };

  // ---------------------------------------------------------------------------
  // SECTION title mapping
  // ---------------------------------------------------------------------------
  const trCatchmentSectionTitle = t("village.section.details", {
    defaultValue: isLao ? SECTION_LO : SECTION_EN,
  });

  const isCatchmentSection = (name) => {
    const s = String(name || "").trim();
    if (!s) return false;
    const enMatch = normalize(s) === normalize(SECTION_EN);
    const loMatch = s === SECTION_LO;
    return enMatch || loMatch;
  };

  // ✅ FROM: selected org unit name (village)
  const sourceName = useMemo(() => {
    if (!orgUnit) return "";
    if (typeof orgUnit === "string") {
      return stripCodePrefix(orgUnit);
    }
    const label = orgUnit.displayName || orgUnit.name || "";
    return stripCodePrefix(label);
  }, [orgUnit]);

  // ✅ TO: health facility from TEA RLamCNXOwQ5
  const facilityName = useMemo(() => {
    if (!currentTei) return "";
    const raw = getAttr(currentTei, FACILITY_ATTR_ID);
    return stripCodePrefix(raw);
  }, [currentTei]);

  // ✅ Dynamic dry-season title
  const dynamicDryTitle = useMemo(() => {
    const from = sourceName || (isLao ? "ບ້ານ" : "this village");
    const to =
      facilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການສຸຂະພາບ" : "the health facility");
    return isLao
      ? `ການເດີນທາງໃນລະດູແຫ້ງ ຈາກ ${from} ຫາ ${to}`
      : `Dry-season travel conditions from ${from} to ${to}`;
  }, [isLao, sourceName, facilityName]);

  // ✅ Dynamic rainy-season title
  const dynamicRainyTitle = useMemo(() => {
    const from = sourceName || (isLao ? "ບ້ານ" : "this village");
    const to =
      facilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການສຸຂະພາບ" : "the health facility");
    return isLao
      ? `ການເດີນທາງໃນລະດູຝົນ ຈາກ ${from} ຫາ ${to}`
      : `Rainy-season travel conditions from ${from} to ${to}`;
  }, [isLao, sourceName, facilityName]);

  // Keep catchment override + add dry & rainy overrides
  const trSectionTitle = (name) => {
    const s = String(name || "").trim();
    if (!s) return s;

    const norm = normalize(s);

    // Dry-season section
    if (norm === normalize(DRY_SECTION_EN) || s === DRY_SECTION_LO) {
      return dynamicDryTitle;
    }

    // Rainy-season section
    if (norm === normalize(RAINY_SECTION_EN) || s === RAINY_SECTION_LO) {
      return dynamicRainyTitle;
    }

    // Generic catchment-section override
    if (isCatchmentSection(s)) {
      return trCatchmentSectionTitle;
    }

    return name;
  };

  // ---------------------------------------------------------------------------
  // Stage & sections (with fallback like NearbyStage)
  // ---------------------------------------------------------------------------
  const stage = useMemo(
    () =>
      program?.programStages?.find(
        (ps) => ps.id === currentEvent?.programStage
      ),
    [program?.programStages, currentEvent?.programStage]
  );

  const sections = useMemo(() => {
    if (!stage) return [];
    const hasSections =
      Array.isArray(stage.programStageSections) &&
      stage.programStageSections.length > 0;
    if (hasSections) return stage.programStageSections;

    const dataElements = (stage.programStageDataElements ?? []).map(
      (psde) => psde.dataElement ?? psde
    );
    return [
      {
        id: "__all__",
        displayName: stage.displayName || "Form",
        dataElements,
      },
    ];
  }, [stage]);

  // Collect DEs present in this stage (respect hiddenFields)
  const presentIds = useMemo(() => {
    const ids = [];
    sections.forEach((section) => {
      (section?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      });
    });
    const uniq = Array.from(new Set(ids));
    return uniq.filter((id) => !hiddenFields[id]);
  }, [sections, hiddenFields]);

  // ⬇⬇⬇ MAKE *ALL VISIBLE* FIELDS MANDATORY ⬇⬇⬇
  const requiredSet = useMemo(() => new Set(presentIds), [presentIds]);

  // Missing check: all visible required + eventDate
  const missing = useMemo(() => {
    const m = [];
    for (const id of requiredSet) {
      const v = getEventDEValue(currentEvent, id);
      if (isEmpty(v)) m.push(id);
    }
    if (!currentEvent?.eventDate || isEmpty(currentEvent.eventDate)) {
      m.push("__eventDate__");
    }
    return m;
  }, [requiredSet, currentEvent?.dataValues, currentEvent?.eventDate]);

  // Only block on warnings for visible fields
  const hasWarnings = useMemo(
    () => Object.keys(warnings || {}).some((id) => presentIds.includes(id)),
    [warnings, presentIds]
  );

  // Disable save/complete when missing or warnings exist
  const disabled = missing.length > 0 || hasWarnings;

  // Avoid update loops
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  const warningsRef = useRef(warnings || {});
  missingRef.current = missing;
  warningsRef.current = warnings || {};

  // Toggle Complete button only when value changes
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
      } catch {
        // ignore layout API differences
      }
    }
  }, [actions, disabled]);

  // Register Save handler once
  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_villages_all_visible_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).some((id) => presentIds.includes(id));

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0)
            msgs.push(
              t("village.save.completeAll", {
                defaultValue: isLao
                  ? "ກະລຸນາກອກຂໍ້ມູນທີ່ຈໍາເປັນ."
                  : "Please complete all required fields.",
              })
            );
          if (hasW) {
            msgs.push(
              Array.from(
                new Set(
                  Object.entries(w)
                    .filter(([id]) => presentIds.includes(id))
                    .map(([, code]) => trWarn(code))
                )
              ).join(" ")
            );
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions, t, isLao, presentIds]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  // integer-only input guards for OWAR8Vpa8IW
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
        <Accordion
          key={section.id || section.displayName}
          title={trSectionTitle(section.displayName)}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            // respect hidden fields
            if (hiddenFields[deId]) return null;

            const hasWarn = !!warnings?.[deId];
            const helpId = `help-${deId}`;
            const extra = deId === INTEGER_ONLY_ID ? integerOnlyGuards : {};
            const warnMsg = hasWarn ? trWarn(warnings[deId]) : "";

            // Every visible field is required
            const isRequired = requiredSet.has(deId);

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
                  <DataValueLabel dataElement={deId} required={isRequired} />
                </Box>

                <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", p: "10px" }}>
                  <DataValueFieldNoBlur
                    dataElement={deId}
                    required={isRequired}
                    aria-invalid={hasWarn ? "true" : undefined}
                    aria-describedby={hasWarn ? helpId : undefined}
                    hiddenOptions={hiddenOptions?.[deId] || undefined}
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
