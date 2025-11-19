// src/configs/laotracker/program-forms/nearby/NearbyStage.jsx
import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
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

// Central Hospital TEA + the only DE to show when CH selected
const CH_ATTR_ID = "VF9VIPxkf9z";
const ONLY_DE_WHEN_CH = "K4RyAstSuIe";

// This DE should NOT be mandatory
const NON_MANDATORY_ID = "HFXe55C0WT0";

// Nearby facility attribute IDs (profile)
const NEARBY_ATTR = {
  hc: "Jy7ou2LCeju",
  ph: "rsXdExpMW65",
  dh: "WH4Az6TJ5ZA",
  ch: CH_ATTR_ID, // central hospital
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

const getAttr = (tei, id) =>
  (tei?.attributes || []).find((a) => a.attribute === id)?.value || "";

// Remove leading code in brackets: "(0501PH01) PH Bokeo" -> "PH Bokeo"
const stripCodePrefix = (s = "") => {
  const str = String(s || "").trim();
  const match = str.match(/^\([^)]*\)\s*(.+)$/);
  return match ? match[1] : str;
};

const normalize = (s) =>
  String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

// DHIS2 UID pattern
const DHIS_UID_RE = /^[A-Za-z][A-Za-z0-9]{10}$/;

// Detect API base URL (prod: DHIS_CONFIG.baseUrl, dev: VITE_DHIS2_BASE_URL)
const getApiBaseUrl = () => {
  if (typeof window !== "undefined" && window.DHIS_CONFIG?.baseUrl) {
    // DHIS2 will typically set baseUrl like "/dhis"
    return window.DHIS_CONFIG.baseUrl.replace(/\/$/, "");
  }
  const envBase = import.meta.env.VITE_BASE_URL;
  if (envBase) {
    return String(envBase).replace(/\/$/, "");
  }
  // Fallback: same origin (works when app is served from DHIS2)
  return "";
};

// Small helper to build full API URL
const buildApiUrl = (path) => {
  const base = getApiBaseUrl();
  const cleanedPath = path.replace(/^\//, "");
  return base ? `${base}/${cleanedPath}` : `/${cleanedPath}`;
};

// ---------------------------------------------------------------------------

const NearbyStage = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit,
    }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions, data: state.data }))
  );
  const currentTei = data?.currentTei;

  const { currentEvent } = useCurrentEvent();

  // Rules
  const { warnings, hiddenFields, hiddenOptions } = useNearbyRules();

  const trAssessmentDate = t("assessment.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  // --- Static reference strings (for matching) ------------------------------
  const SECTION_EN = "Details of nearby health facilities";
  const SECTION_LO = "ຂໍ້ມູນຂອງສະຖານທີ່ບໍລິການໃກ້ຄຽງ";

  const DRY_SECTION_EN =
    "Dry-season travel conditions from this health facility to the nearby health facility";
  const DRY_SECTION_LO =
    "ການເດີນທາງໃນລະດູແຫ້ງ ຈາກສະຖານທີ່ບໍລິການຂອງເຮົາ ຫາ ສະຖານທີ່ບໍລິການໃກ້ຄຽງ";

  const RAINY_SECTION_EN =
    "Rainy-season travel conditions from this health facility to the nearby health facility";
  const RAINY_SECTION_LO =
    "ການເດີນທາງໃນລະດູຝົນ ຈາກສະຖານທີ່ບໍລິການຂອງເຮົາ ຫາ ສະຖານທີ່ບໍລິການໃກ້ຄຽງ";

  const trNearbySectionTitle = t("nearby.section.details", {
    defaultValue: isLao ? SECTION_LO : SECTION_EN,
  });

  // -------------------------------------------------------------------------
  // Source facility name (from orgUnit selection)
  // -------------------------------------------------------------------------

  const sourceFacilityName = useMemo(() => {
    if (!orgUnit) return "";
    if (typeof orgUnit === "string") {
      return stripCodePrefix(orgUnit);
    }
    const label = orgUnit.displayName || orgUnit.name || "";
    return stripCodePrefix(label);
  }, [orgUnit]);

  // -------------------------------------------------------------------------
  // Nearby orgUnit IDs from TEI
  // -------------------------------------------------------------------------

  const nearbyOrgUnitIds = useMemo(() => {
    if (!currentTei) return [];
    const vals = [
      getAttr(currentTei, NEARBY_ATTR.dh),
      getAttr(currentTei, NEARBY_ATTR.hc),
      getAttr(currentTei, NEARBY_ATTR.ph),
      getAttr(currentTei, NEARBY_ATTR.ch),
    ]
      .map((v) => String(v || "").trim())
      .filter((v) => DHIS_UID_RE.test(v)); // we only expect UIDs here
    return Array.from(new Set(vals));
  }, [currentTei]);

  // Names fetched from DHIS2 API, keyed by UID
  const [ouNames, setOuNames] = useState({});

  // Fetch missing org unit names from DHIS2 API
  useEffect(() => {
    const missing = nearbyOrgUnitIds.filter((id) => !ouNames[id]);
    if (!missing.length) return;

    let cancelled = false;

    const fetchAll = async () => {
      for (const id of missing) {
        try {
          const url = buildApiUrl(
            `/api/organisationUnits/${id}.json?fields=id,name,displayName,code`
          );
          const res = await fetch(url, {
            headers: { Accept: "application/json" },
          });

          // If dev proxy is wrong, content-type will not be JSON
          const ct = res.headers.get("content-type") || "";
          if (!res.ok || !ct.includes("application/json")) {
            // skip on bad responses (e.g. Vite index.html)
            // console.warn("Failed to resolve orgUnit", id, res.status);
            continue;
          }

          const json = await res.json();
          const label =
            json.name ||
            json.displayName ||
            (json.code ? `(${json.code})` : "") ||
            id;

          if (!cancelled) {
            setOuNames((prev) => ({ ...prev, [id]: label }));
          }
        } catch (e) {
          // swallow network errors, do not block the form
          // console.error("Error fetching orgUnit", id, e);
        }
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [nearbyOrgUnitIds, ouNames]);

  // -------------------------------------------------------------------------
  // Target facility name (priority: DH -> HC -> PH -> CH)
  // -------------------------------------------------------------------------

  const targetFacilityName = useMemo(() => {
    if (!currentTei) return "";

    const ordered = [
      getAttr(currentTei, NEARBY_ATTR.dh),
      getAttr(currentTei, NEARBY_ATTR.hc),
      getAttr(currentTei, NEARBY_ATTR.ph),
      getAttr(currentTei, NEARBY_ATTR.ch),
    ].map((v) => String(v || "").trim());

    for (const uid of ordered) {
      if (!uid || !DHIS_UID_RE.test(uid)) continue;
      const label = ouNames[uid];
      if (label) {
        return stripCodePrefix(label);
      }
    }

    return "";
  }, [currentTei, ouNames]);

  // -------------------------------------------------------------------------
  // Dynamic section titles
  // -------------------------------------------------------------------------

  const dynamicDryTitle = useMemo(() => {
    const from =
      sourceFacilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການຂອງເຮົາ" : "this health facility");
    const to =
      targetFacilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການໃກ້ຄຽງ" : "the nearby health facility");

    return isLao
      ? `ການເດີນທາງໃນລະດູແຫ້ງ ຈາກ ${from} ຫາ ${to}`
      : `Dry-season travel conditions from ${from} to ${to}`;
  }, [isLao, sourceFacilityName, targetFacilityName]);

  const dynamicRainyTitle = useMemo(() => {
    const from =
      sourceFacilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການຂອງເຮົາ" : "this health facility");
    const to =
      targetFacilityName ||
      (isLao ? "ສະຖານທີ່ບໍລິການໃກ້ຄຽງ" : "the nearby health facility");

    return isLao
      ? `ການເດີນທາງໃນລະດູຝົນ ຈາກ ${from} ຫາ ${to}`
      : `Rainy-season travel conditions from ${from} to ${to}`;
  }, [isLao, sourceFacilityName, targetFacilityName]);

  const trSectionTitle = (name) => {
    const s = String(name || "").trim();
    if (!s) return s;

    const normName = normalize(s);

    if (normName === normalize(DRY_SECTION_EN) || s === DRY_SECTION_LO) {
      return dynamicDryTitle;
    }

    if (normName === normalize(RAINY_SECTION_EN) || s === RAINY_SECTION_LO) {
      return dynamicRainyTitle;
    }

    if (normName === normalize(SECTION_EN) || s === SECTION_LO) {
      return trNearbySectionTitle;
    }

    return name;
  };

  // -------------------------------------------------------------------------
  // Stage & sections
  // -------------------------------------------------------------------------

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

  const isCHSelected = !!String(getAttr(currentTei, CH_ATTR_ID) || "").trim();

  const presentIds = useMemo(() => {
    const ids = [];
    sections.forEach((sec) => {
      (sec?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) ids.push(id);
      });
    });
    const uniq = Array.from(new Set(ids));
    const visible = hiddenFields
      ? uniq.filter((id) => !hiddenFields[id])
      : uniq;
    return isCHSelected ? visible.filter((id) => id === ONLY_DE_WHEN_CH) : visible;
  }, [sections, hiddenFields, isCHSelected]);

  const requiredSet = useMemo(() => {
    const s = new Set(presentIds);
    s.delete(NON_MANDATORY_ID);
    return s;
  }, [presentIds]);

  const hasWarnings = useMemo(
    () => Object.keys(warnings || {}).some((id) => presentIds.includes(id)),
    [warnings, presentIds]
  );

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
      } catch {
        // ignore
      }
    }
  }, [actions, disabled]);

  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_nearby_all_visible_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        const w = warningsRef.current || {};
        const hasW = Object.keys(w).some((id) => presentIds.includes(id));

        if (m.length > 0 || hasW) {
          const msgs = [];
          if (m.length > 0) {
            msgs.push(
              t("nearby.save.completeAll", {
                defaultValue: isLao
                  ? "ກະລຸນາກອກຂໍ້ມູນທັງໝົດທີ່ກໍານົດໃຫ້ຕ້ອງກອກ."
                  : "Please complete all required fields.",
              })
            );
          }
          return { ok: false, message: msgs.join(" ") };
        }
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions, t, isLao, presentIds]);

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
      const txt =
        (e.clipboardData || window.clipboardData).getData("text") || "";
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
      {/* Event date */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur
          type="eventDate"
          maxDate={maxDate}
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

            if (
              (hiddenFields && hiddenFields[deId]) ||
              !presentIds.includes(deId)
            )
              return null;

            const hasWarn = !!warnings?.[deId];
            const helpId = `help-${deId}`;
            const extra = deId === INTEGER_ONLY_ID ? integerOnlyGuards : {};
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
                    required={isRequired}
                    aria-invalid={hasWarn ? "true" : undefined}
                    aria-describedby={hasWarn ? helpId : undefined}
                    hiddenOptions={hiddenOptions?.[deId] || undefined}
                    {...extra}
                  />
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
