import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";

import Accordion from "../../../common/Accordion";
import useFacilityBuildingRules from "./useFacilityBuildingRules";

const LABEL_COL_W = 300;
const getDeId = (de) => de?.id || de?.dataElement?.id;
const normalize = (s) => String(s || "").trim().toLowerCase();

const INTEGER_ONLY_IDS = new Set(["bEWpwn7HfUI","OpKuX0h3iSf","Gt26xzdkt53"]);

const toAsciiDigits = (str = "") =>
  String(str).replace(
    /[\u0E50-\u0E59\u0ED0-\u0ED9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F]/g,
    (ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x0e50 && c <= 0x0e59) return String(c - 0x0e50); 
      if (c >= 0x0ed0 && c <= 0x0ed9) return String(c - 0x0ed0); 
      if (c >= 0x0660 && c <= 0x0669) return String(c - 0x0660); 
      if (c >= 0x06f0 && c <= 0x06f9) return String(c - 0x06f0); 
      if (c >= 0x0966 && c <= 0x096f) return String(c - 0x0966); 
      return ch;
    }
  );

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

const RedStar = () => (
  <Box component="span" sx={{ color: "#d32f2f", mr: 0.75 }} aria-hidden="true">
    *
  </Box>
);

const FacilityBuildingandFurniture = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(useShallow((s) => ({ program: s.program })));
  const { actions } = useTrackerCaptureStore(useShallow((s) => ({ actions: s.actions })));
  const { currentEvent } = useCurrentEvent();

  const maxDate = format(new Date(), "yyyy-MM-dd");

  const sections = useMemo(() => {
    if (!program?.programStages || !currentEvent?.programStage) return [];
    const stage = program.programStages.find((ps) => ps.id === currentEvent.programStage);
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  const trAssessmentDate = t("facility.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });
  const trOperatorsLabel = t("facility.internet.operators", {
    defaultValue: isLao ? "6.1. ເຄື່ອຄ່າຍໂທລະສັບ" : "6.1. Mobile Operator",
  });
  const trNewOperatorsLabel = t("facility.internet.regularNetworkQuestion", {
    defaultValue: isLao
      ? "8. ຖ້າມີ, ອິນເຕີເນັດປະຈໍາ ແມ່ນຂອງເຄື່ອຄ່າຍໃດ?"
      : "8. On-site internet operator",
  });
  const trMonthsLabel = t("facility.outreach.usualMonths", {
    defaultValue: isLao
      ? "14. ການລົງເຄື່ອນທີ່ເຊື່ອມສານ ແມ່ນໄດ້ລົງເຮັດເດືອນໃດ ?(ໝາຍທຸກເດືອນທີ່ໄດ້ລົງເຄື່ອນທີ່ເຊື່ອມສານໄປແລ້ວ ແລະ ກໍາລັງວາງແຜນຈະລົງໃນປີນີ້)"
      : "14. Indicate the months during which outreach activities were conducted or are planned to be conducted (Tick all applicable months)",
  });
  const trIntOnly = t("equipment.error.integerOnly", {
    defaultValue: isLao
      ? "ອະນຸຍາດໃສ່ແຕ່ເລກຈໍານວນເຕັມ (ບໍ່ອະນຸຍາດເລກຈຸດທົດສະນິຍົມ)."
      : "Only whole numbers are allowed (no decimals).",
  });

  const trSectionTitle = (displayName) => {
    const n = normalize(displayName);
    switch (n) {
      case "beds and refrigerator":
        return t("facility.sections.beds_refrigerator", {
          defaultValue: isLao ? "ຕຽງ ແລະ ຕູ້ເຢັນ" : "Beds and Refrigerator",
        });
      case "electricity":
        return t("facility.sections.electricity", { defaultValue: isLao ? "ໄຟຟ້າ" : "Electricity" });
      case "internet":
        return t("facility.sections.internet", { defaultValue: isLao ? "ອິນເຕີເນັດ" : "Internet" });
      case "outreach activity":
        return t("facility.sections.outreach_activity", {
          defaultValue: isLao ? "ການລົງເຄື່ອນທີ່ເຊື່ອມສານ" : "Outreach activity",
        });
      default:
        return displayName;
    }
  };

  const warnings = useMemo(() => {
    const w = {};
    INTEGER_ONLY_IDS.forEach((id) => {
      const raw = toAsciiDigits(String(getEventDEValue(currentEvent, id) ?? "").trim());
      if (raw !== "" && !/^\d+$/.test(raw)) w[id] = "integerOnly";
    });
    return w;
  }, [currentEvent?.dataValues]);

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
      if (!/^\d+$/.test(toAsciiDigits(txt).trim())) e.preventDefault();
    },
    onInput: (e) => {
      const s = String(e.target.value ?? "");
      const digits = toAsciiDigits(s).replace(/[^\d]/g, "");
      if (s !== digits) e.target.value = digits;
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Box sx={{ fontWeight: 600, mb: 0.5 }}>{trAssessmentDate}</Box>
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
                dueDate && dueDate > maxDate ? maxDate : (dueDate || maxDate)
              );
            }
          }}
        />
      </Box>

      {sections.map((section) => {
        const allDEs = section.dataElements ?? [];
        const rules = useFacilityBuildingRules(allDEs);

        const {
          hiddenFields,
          requiredFields,
          operators,
          newOperators,
          months,
          keys,
          state: { showServiceProvider, showOperators, showNewOperators },
        } = rules;

        const OP_HSTACK = new Set(
          [...operators.ids].filter((id) => id !== keys.SERVICE_PROVIDER_ID)
        );
        const NEW_OP_HSTACK = new Set([...newOperators.ids]);

        const visibleOps = allDEs
          .map((de) => getDeId(de))
          .filter((id) => id && OP_HSTACK.has(id) && !hiddenFields[id]);

        const visibleNewOps = allDEs
          .map((de) => getDeId(de))
          .filter((id) => id && NEW_OP_HSTACK.has(id) && !hiddenFields[id]);

        const MONTH_ORDER = [
          "NIji1vKjEsn","ycwkJ30qjwb","bxEtg4oxf4m","F9lxwEAGnHE",
          "X67WGTx2djm","t1Z7lsQ2Qte","SO1P5eMGMSc","L1lvlYVBaVN",
          "K3q2Vgo6p6P","N3dIyivSvSo","kMHppy04I0O","BkK10QaD8FE","l4g6U5MNdxQ"
        ];
        const visibleMonths = MONTH_ORDER.filter(
          (id) => months.ids.has(id) && !hiddenFields[id]
        );

        return (
          <Accordion key={section.id || section.displayName} title={trSectionTitle(section.displayName)}>
            {allDEs.map((de) => {
              const deId = getDeId(de);
              if (!deId) return null;
              if (hiddenFields[deId]) return null;

              const isAnchor = deId === keys.OP_ANCHOR_ID;
              const isOperator = operators.ids.has(deId);
              const isServiceProvider = deId === keys.SERVICE_PROVIDER_ID;

              const isMonthAnchor = deId === keys.MONTH_ANCHOR_ID;
              const isMonthField = months.ids.has(deId);

              const isNewOpsAnchor = deId === keys.TYPE_CONN_ID;
              const isNewOperator = newOperators.ids.has(deId);

              if ((isOperator || isServiceProvider) && !isAnchor) return null;
              if (isNewOperator && !isNewOpsAnchor) return null;
              if (isMonthField && !isMonthAnchor) return null;

              const hasWarn = warnings[deId] === "integerOnly";
              const helpId = hasWarn ? `help-${deId}` : undefined;
              const intGuards = INTEGER_ONLY_IDS.has(deId) ? integerOnlyGuards : {};

              const Row = (
                <Box key={deId} sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
                  <Box sx={{ width: `${LABEL_COL_W}px`, padding: "10px" }}>
                    <DataValueLabel dataElement={deId} />
                  </Box><RedStar />
                  <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                    <DataValueFieldNoBlur
                      dataElement={deId}
                      required={!!requiredFields[deId]}
                      aria-invalid={hasWarn ? "true" : undefined}
                      aria-describedby={helpId}
                      {...intGuards}
                    />
                    {hasWarn && (
                      <Box id={helpId} sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                        {trIntOnly}
                      </Box>
                    )}
                  </Box>
                </Box>
              );

              if (isAnchor) {
                return (
                  <Box key={deId}>
                    {Row}

                    {showOperators && visibleOps.length > 0 && (
                      <Box sx={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #e0e0e0" }}>
                        <Box sx={{ width: `${LABEL_COL_W}px`, px: "10px", display: "flex", alignItems: "center" }}>
                          <Box
                            component="span"
                            sx={{ fontWeight: 400, fontSize: 16, lineHeight: 1.4, display: "inline-flex", alignItems: "center" }}
                          >
                            {trOperatorsLabel}
                            <RedStar />
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                          <Box sx={{ flex: 1, padding: "10px" }}>
                            <Box sx={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: 3, alignItems: "stretch", py: 0.5 }}>
                              {allDEs.map((hde) => {
                                const hId = getDeId(hde);
                                if (!hId || !OP_HSTACK.has(hId)) return null;
                                if (hiddenFields[hId]) return null;

                                const hWarn = warnings[hId] === "integerOnly";
                                const hHelpId = hWarn ? `help-${hId}` : undefined;
                                const hGuards = INTEGER_ONLY_IDS.has(hId) ? integerOnlyGuards : {};

                                return (
                                  <Box
                                    key={hId}
                                    sx={{ flex: "0 0 auto", minWidth: 100, display: "inline-flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", whiteSpace: "nowrap" }}
                                  >
                                    <Box sx={{ mb: 0.5, fontWeight: 600, fontSize: 12, color: "text.secondary" }}>
                                      <DataValueLabel dataElement={hId} /> 
                                    </Box>
                                    <DataValueFieldNoBlur
                                      dataElement={hId}
                                      aria-invalid={hWarn ? "true" : undefined}
                                      aria-describedby={hHelpId}
                                      {...hGuards}
                                    />
                                    {hWarn && (
                                      <Box id={hHelpId} sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                                        {trIntOnly}
                                      </Box>
                                    )}
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {showServiceProvider && (
                      <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
                        <Box sx={{ width: `${LABEL_COL_W}px`, padding: "10px" }}>
                          <DataValueLabel dataElement={keys.SERVICE_PROVIDER_ID} />
                        </Box><RedStar />
                        <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                          <DataValueFieldNoBlur dataElement={keys.SERVICE_PROVIDER_ID} required />
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              }

              if (isNewOpsAnchor) {
                return (
                  <Box key={deId}>
                    {Row}

                    {showNewOperators && visibleNewOps.length > 0 && (
                      <Box sx={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #e0e0e0" }}>
                        <Box sx={{ width: `${LABEL_COL_W}px`, px: "10px", display: "flex", alignItems: "center" }}>
                          <Box
                            component="span"
                            sx={{ fontWeight: 400, fontSize: 16, lineHeight: 1.4, display: "inline-flex", alignItems: "center" }}
                          >
                           {trNewOperatorsLabel} 
                           <RedStar />
                          </Box>
                        </Box>

                        <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                          <Box sx={{ flex: 1, padding: "10px" }}>
                            <Box sx={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: 3, alignItems: "stretch", py: 0.5 }}>
                              {allDEs.map((hde) => {
                                const hId = getDeId(hde);
                                if (!hId || !NEW_OP_HSTACK.has(hId)) return null;
                                if (hiddenFields[hId]) return null;

                                const hWarn = warnings[hId] === "integerOnly";
                                const hHelpId = hWarn ? `help-${hId}` : undefined;
                                const hGuards = INTEGER_ONLY_IDS.has(hId) ? integerOnlyGuards : {};

                                return (
                                  <Box key={hId} sx={{ flex: "0 0 auto", minWidth: 100, display: "inline-flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", whiteSpace: "nowrap" }}>
                                    <Box sx={{ mb: 0.5, fontWeight: 600, fontSize: 12, color: "text.secondary" }}>
                                      <DataValueLabel dataElement={hId} />
                                    </Box>
                                    <DataValueFieldNoBlur
                                      dataElement={hId}
                                      aria-invalid={hWarn ? "true" : undefined}
                                      aria-describedby={hHelpId}
                                      {...hGuards}
                                    />
                                    {hWarn && (
                                      <Box id={hHelpId} sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                                        {trIntOnly}
                                      </Box>
                                    )}
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              }

              if (isMonthAnchor) {
                return (
                  <Box key={deId}>
                    {Row}
                    <Box sx={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid #e0e0e0" }}>
                      <Box sx={{ width: `${LABEL_COL_W}px`, px: "10px", py: "10px", display: "flex", alignItems: "center" }}>
                        <Box component="span" sx={{ fontWeight: 400, fontSize: 16, display: "inline-flex", alignItems: "center" }}>
                          {trMonthsLabel}
                          <RedStar />
                        </Box>
                      </Box>
                      <Box sx={{ flex: 1, borderLeft: "1px solid #e0e0e0", padding: "10px" }}>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(120px, 1fr))", gap: 2, alignItems: "start" }}>
                          {visibleMonths.map((mId) => (
                            <Box key={mId} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
                              <Box sx={{ mb: 0.5, fontWeight: 600, fontSize: 12, color: "text.secondary", lineHeight: 1.2 }}>
                                <DataValueLabel dataElement={mId} />
                              </Box>
                              <DataValueFieldNoBlur dataElement={mId} />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }

              return Row;
            })}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FacilityBuildingandFurniture;