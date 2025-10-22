import { Box } from "@mui/material";
import { format, parseISO, isValid } from "date-fns";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef } from "react";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
// Removed EventDateLabel; we render a translated label ourselves:
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useShallow } from "zustand/react/shallow";
import Accordion from "../../../common/Accordion";

const GRID_COLS = "300px repeat(3, 1fr)";

// Rows -> three DEs (name, phone, position)
/** @type {{label:string,name:string,phone:string,position:string}[]} */
const ROWS = [
  { label: "Focal point in Statistics", name: "XdN4DiRdbT6", phone: "sMqisNzLyfQ", position: "DVSy2o704A9" },
  { label: "Focal point in Planning", name: "ecsoaUOowEO", phone: "vKjd2Xbizhl", position: "wxylBb6OPr9" },
  { label: "Focal point in Administration", name: "rxS2nT0THr4", phone: "drZ778iJ7o2", position: "rEqDdCxMD3E" },
  { label: "Focal point in MCH", name: "JbwHiNVcmSQ", phone: "FODGOgjn8vd", position: "J4JNG7HvErr" },
  { label: "Focal point in Nutrition", name: "gXs2SMhVjrc", phone: "Cb9nJ4gSPGN", position: "DIoi8wE1ky1" },
  { label: "Focal point in Vaccination", name: "GR4o5L0HbCo", phone: "pPnaLSoTKeO", position: "siXKKIODhgK" },
  { label: "Focal point in Treatment and Rehabilitation", name: "dogMKw4YQi6", phone: "IhWoKTEPA49", position: "GKwqkVL6Cjy" },
  { label: "Focal point in NHI", name: "gfVrKxCgmZg", phone: "JHesGHVHKRc", position: "KRyUPEGRpct" },
  { label: "Focal point in Malaria", name: "rpt2nT8IeyI", phone: "Pus81m4pqxC", position: "Hsw0zV9d5Tt" },
  { label: "Focal point in Tuberculosis", name: "nF1Qi36Mvoh", phone: "elixGs0moWC", position: "u0dUA2WbrKo" },
  { label: "Focal point in HIV", name: "ROR3qpzgQQ6", phone: "Pp082v0vFMV", position: "DDIqnYA3KZo" },
  { label: "Focal point in Communicable diseases", name: "gECI3qCAG3z", phone: "tR0b3Q278Si", position: "vPxHplhPYAi" },
  { label: "Focal point in NCD", name: "nMtlkJMhXZo", phone: "LU6bCFXTSkX", position: "cV2HtrO7So2" },
  { label: "Focal point in WASH", name: "mP26BdOPq1s", phone: "OV65eBiEnl9", position: "OocjBJGGu0p" },
];

// i18n key helper for row labels
const rowKey = (label) =>
  "focal.rows." +
  String(label).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

// Lao fallbacks for row labels (left column)
const LO_ROW = {
  focal_point_in_statistics: "1. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກສະຖິຕິ",
  focal_point_in_planning: "2. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກແຜນການ",
  focal_point_in_administration: "3. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກບໍລິຫານ",
  focal_point_in_mch: "4. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານ ແມ່ ແລະ ເດັກ",
  focal_point_in_nutrition: "5. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານໂພຊະນາການ",
  focal_point_in_vaccination: "6. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານສັກຢາກັນພະຍາດ",
  focal_point_in_treatment_and_rehabilitation: "7. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານປິ່ນປົວ ແລະ ຟື້ນຟູໜ້າທີ່ການ",
  focal_point_in_nhi: "8. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານປະກັນສຸຂະພາບ",
  focal_point_in_malaria: "9. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານໄຂ້ຍຸງ",
  focal_point_in_tuberculosis: "10. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານວັນນະໂລກ",
  focal_point_in_hiv: "11. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານເອດ ແລະ ພະຍາດຕິດຕໍ່ທາງເພດສໍາພັນ",
  focal_point_in_communicable_diseases: "12. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານລະບາດ",
  focal_point_in_ncd: "13. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານພະຍາດບໍ່ຕິດຕໍ່ (ມະເຮັງ, ເບົາຫວານ, ໂລກຫົວໃຈ ແລະ ອື່ນໆ)",
  focal_point_in_wash: "14. ພະນັກງານຜູ້ຮັບຜິດຊອບ ວຽກງານນໍ້າສະອາດ, ສຸຂາພິບານ ແລະ ອະນາໄມ",
};

// Lao fallbacks for stage title, headers, and assessment date
const LO_MISC = {
  title: "ພະນັກງານຜູ້ຮັບຜິດຊອບ / ຜູ້ປະສານງານ ຢູ່ສະຖານທີ່ດັ່ງກາວ",
  name: "ຊື່ ແລະ ນາມສະກຸນ",
  phone: "ເບີໂທລະສັບ",
  position: "ຕໍາແໜ່ງ",
  assessmentDate: "ວັນທີປະເມີນ",
};

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

const FocalPoints = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  // keep selection in case you need stage/program elsewhere later
  useSelectionStore(useShallow((s) => ({ stage: s.stage, program: s.program })));

  const maxDateStr = format(new Date(), "yyyy-MM-dd");

  // Translated strings (use i18n keys with Lao fallback)
  const trTitle = t("focal.title", { defaultValue: isLao ? LO_MISC.title : "Focal Points" });
  const trHeaderName = t("focal.headers.name", { defaultValue: isLao ? LO_MISC.name : "Name and Surname" });
  const trHeaderPhone = t("focal.headers.phone", { defaultValue: isLao ? LO_MISC.phone : "Phone number" });
  const trHeaderPosition = t("focal.headers.position", { defaultValue: isLao ? LO_MISC.position : "Position" });
  const trAssessmentDate = t("focal.assessmentDate", { defaultValue: isLao ? LO_MISC.assessmentDate : "Assessment date" });

  const trRow = (label) => {
    const key = rowKey(label); // focal.rows.<slug>
    const slug = key.split(".").pop();
    return t(key, { defaultValue: isLao ? LO_ROW[slug] || label : label });
  };

  // -------- stage-level mandatory guard (all fields + event date) --------
  const requiredIds = useMemo(() => {
    const ids = [];
    for (const r of ROWS) {
      ids.push(r.name, r.phone, r.position);
    }
    return ids;
  }, []);

  const missing = useMemo(() => {
    const m = [];
    // check DEs
    for (const id of requiredIds) {
      const v = getEventDEValue(currentEvent, id);
      if (isEmpty(v)) m.push(id);
    }
    // check event date too
    if (!currentEvent?.eventDate || isEmpty(currentEvent.eventDate)) {
      m.push("__eventDate__");
    }
    return m;
  }, [requiredIds, currentEvent?.dataValues, currentEvent?.eventDate]);

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
    const KEY = "eventSave_focal_all_required";
    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const isDisabled = missingRef.current.length > 0;
        if (isDisabled) return { ok: false, message: "Please complete all required fields." };
        return { ok: true };
      });
    return () => actions.setHandlers && actions.setHandlers(KEY, null);
  }, [actions]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Event date with translated label */}
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
        <EventDateFieldNoBlur
          maxDate={maxDateStr}
          type="eventDate"
          focus={() => {
            if (!currentEvent?.event) return;
            const rawDue = currentEvent.dueDate;
            const due =
              rawDue == null
                ? new Date()
                : typeof rawDue === "string"
                ? parseISO(rawDue)
                : new Date(rawDue);

            const dueStr = isValid(due) ? format(due, "yyyy-MM-dd") : maxDateStr;
            if (currentEvent.status === "SCHEDULE" && !currentEvent.eventDate) {
              actions.changeEventProperty(
                currentEvent.event,
                "eventDate",
                dueStr > maxDateStr ? maxDateStr : dueStr
              );
            }
          }}
        />
      </Box>

      <Accordion title={trTitle}>
        {/* Table wrapper */}
        <Box sx={{ border: "1px solid #d9d9d9", overflow: "hidden" }}>
          {/* Header row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: GRID_COLS,
              alignItems: "stretch",
              borderBottom: "1px solid #d9d9d9",
              background: "#f6f7f9",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }} />
            <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }}>{trHeaderName}</Box>
            <Box sx={{ p: "10px 12px", borderRight: "1px solid #d9d9d9" }}>{trHeaderPhone}</Box>
            <Box sx={{ p: "10px 12px" }}>{trHeaderPosition}</Box>
          </Box>

          {/* Data rows */}
          {ROWS.map((r, i) => (
            <Box
              key={r.label}
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                alignItems: "stretch",
                borderBottom: i === ROWS.length - 1 ? "none" : "1px solid #e5e5e5",
              }}
            >
              {/* Row label (translated) */}
              <Box
                sx={{
                  p: "10px 12px",
                  borderRight: "1px solid #e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  lineHeight: 1.35,
                }}
              >
                {trRow(r.label)}
              </Box>

              {/* Name & Surname */}
              <Box sx={{ p: "6px 10px", borderRight: "1px solid #e5e5e5", display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <DataValueFieldNoBlur dataElement={r.name} required />
                </Box>
              </Box>

              {/* Phone number */}
              <Box sx={{ p: "6px 10px", borderRight: "1px solid #e5e5e5", display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <DataValueFieldNoBlur dataElement={r.phone} required />
                </Box>
              </Box>

              {/* Position */}
              <Box sx={{ p: "6px 10px", display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <DataValueFieldNoBlur dataElement={r.position} required />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Accordion>
    </Box>
  );
};

export default FocalPoints;
