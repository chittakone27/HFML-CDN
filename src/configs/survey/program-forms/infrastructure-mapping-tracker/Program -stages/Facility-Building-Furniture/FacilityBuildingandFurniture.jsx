import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { format } from "date-fns";
import { useMemo } from "react";
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

const FacilityBuildingandFurniture = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );
  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { currentEvent } = useCurrentEvent();

  const maxDate = format(new Date(), "yyyy-MM-dd");

  const sections = useMemo(() => {
    if (!program?.programStages || !currentEvent?.programStage) return [];
    const stage = program.programStages.find(
      (ps) => ps.id === currentEvent.programStage
    );
    return stage?.programStageSections ?? [];
  }, [program?.programStages, currentEvent?.programStage]);

  // i18n: assessment date label (translated)
  const trAssessmentDate = t("facility.assessmentDate", {
    defaultValue: isLao ? "ວັນທີປະເມີນ" : "Assessment date",
  });

  // i18n: translate only these section headings (fallback to Lao/English)
  const trSectionTitle = (displayName) => {
    const n = normalize(displayName);
    switch (n) {
      case "beds and refrigerator":
        return t("facility.sections.beds_refrigerator", {
          defaultValue: isLao ? "ຕຽງ ແລະ ຕູ້ເຢັນ" : "Beds and Refrigerator",
        });
      case "electricity":
        return t("facility.sections.electricity", {
          defaultValue: isLao ? "ໄຟຟ້າ" : "Electricity",
        });
      case "internet":
        return t("facility.sections.internet", {
          defaultValue: isLao ? "ອິນເຕີເນັດ" : "Internet",
        });
      case "outreach activity":
        return t("facility.sections.outreach_activity", {
          defaultValue: isLao ? "ການລົງເຄື່ອນທີ່ເຊື່ອມສານ" : "Outreach activity",
        });
      default:
        return displayName;
    }
  };
// i18n: operator label (6.1)
const trOperatorsLabel = t("facility.internet.operators", {
  defaultValue: isLao ? "6.1 ເຄື່ອຄ່າຍອິນເຕີເນັດ" : "6.1 Operator",
});

// i18n: regular internet network question (8.1)
const trNewOperatorsLabel = t("facility.internet.regularNetworkQuestion", {
  defaultValue: isLao
    ? "8. ຖ້າມີ, ອິນເຕີເນັດປະຈໍາ ແມ່ນຂອງເຄື່ອຄ່າຍໃດ?"
    : "8. What network does the regular internet belong to?",
});

  const trMonthsLabel = t("facility.outreach.usualMonths", {
    defaultValue: isLao
      ? "ການລົງເຄື່ອນທີ່ເຊື່ອມສານ ແມ່ນໄດ້ລົງເຮັດເດືອນໃດ ?(ໝາຍທຸກເດືອນທີ່ໄດ້ລົງເຄື່ອນທີ່ເຊື່ອມສານໄປແລ້ວ ແລະ ກໍາລັງວາງແຜນຈະລົງໃນປີນີ້)"
      : "Outreach activity usually happens in which month",
  });

  // Label for the NEW operator group (8.1)
  //const trNewOperatorsLabel = "8 What network does the regular internet belong to?";

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
              currentEvent.dueDate &&
              format(new Date(currentEvent.dueDate), "yyyy-MM-dd");
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

        // 6.1 operator tiles except the service provider
        const OP_HSTACK = new Set(
          [...operators.ids].filter((id) => id !== keys.SERVICE_PROVIDER_ID)
        );

        // NEW 8.1 operator tiles
        const NEW_OP_HSTACK = new Set([...newOperators.ids]);

        // Which operator boxes are visible for this section (6.1)
        const visibleOps = allDEs
          .map((de) => getDeId(de))
          .filter((id) => id && OP_HSTACK.has(id) && !hiddenFields[id]);

        // Which NEW operator boxes are visible for this section (8.1)
        const visibleNewOps = allDEs
          .map((de) => getDeId(de))
          .filter((id) => id && NEW_OP_HSTACK.has(id) && !hiddenFields[id]);

        // Month tiles present in this section (ordered)
        const MONTH_ORDER = [
          "NIji1vKjEsn", "ycwkJ30qjwb", "bxEtg4oxf4m", "F9lxwEAGnHE",
          "X67WGTx2djm", "t1Z7lsQ2Qte", "SO1P5eMGMSc", "L1lvlYVBaVN",
          "K3q2Vgo6p6P", "N3dIyivSvSo", "kMHppy04I0O", "BkK10QaD8FE",
        ];
        const visibleMonths = MONTH_ORDER.filter(
          (id) => months.ids.has(id) && !hiddenFields[id]
        );

        return (
          <Accordion
            key={section.id || section.displayName}
            title={trSectionTitle(section.displayName)}
          >
            {allDEs.map((de) => {
              const deId = getDeId(de);
              if (!deId) return null;
              if (hiddenFields[deId]) return null;

              const isAnchor = deId === keys.OP_ANCHOR_ID;          // 6.1 after this
              const isOperator = operators.ids.has(deId);
              const isServiceProvider = deId === keys.SERVICE_PROVIDER_ID;

              const isMonthAnchor = deId === keys.MONTH_ANCHOR_ID;  // months after this
              const isMonthField = months.ids.has(deId);

              // NEW 8.1: anchor is the connection type field
              const isNewOpsAnchor = deId === keys.TYPE_CONN_ID;
              const isNewOperator = newOperators.ids.has(deId);

              // We custom-render 6.1 operators AFTER their ANCHOR row
              if ((isOperator || isServiceProvider) && !isAnchor) return null;

              // We custom-render NEW 8.1 operators AFTER TYPE_CONN_ID row
              if (isNewOperator && !isNewOpsAnchor) return null;

              // Months are rendered together after the month anchor
              if (isMonthField && !isMonthAnchor) return null;

              // Standard row (unchanged layout)
              const Row = (
                <Box
                  key={deId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #e0e0e0",
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
                      required={!!requiredFields[deId]}
                    />
                  </Box>
                </Box>
              );

              // ---- 6.1 Operators block injected after its anchor ----
              if (isAnchor) {
                return (
                  <Box key={deId}>
                    {Row}

                    {showOperators && visibleOps.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "stretch",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        {/* label cell */}
                        <Box
                          sx={{
                            width: `${LABEL_COL_W}px`,
                            px: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            textAlign: "left",
                          }}
                        >
                          <Box component="span" sx={{ fontWeight: 400, fontSize: 16, lineHeight: 1.4 }}>
                            {trOperatorsLabel}
                          </Box>
                        </Box>

                        {/* value cell — horizontal strip */}
                        <Box
                          sx={{
                            flex: 1,
                            borderLeft: "1px solid #e0e0e0",
                            padding: "10px",
                          }}
                        >
                          <Box sx={{ flex: 1, padding: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "nowrap",
                                overflowX: "auto",
                                gap: 3,
                                alignItems: "stretch",
                                py: 0.5,
                              }}
                            >
                              {allDEs.map((hde) => {
                                const hId = getDeId(hde);
                                if (!hId || !OP_HSTACK.has(hId)) return null;
                                if (hiddenFields[hId]) return null;

                                return (
                                  <Box
                                    key={hId}
                                    sx={{
                                      flex: "0 0 auto",
                                      minWidth: 100,
                                      display: "inline-flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      justifyContent: "center",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        mb: 0.5,
                                        fontWeight: 600,
                                        fontSize: 12,
                                        color: "text.secondary",
                                      }}
                                    >
                                      <DataValueLabel dataElement={hId} />
                                    </Box>
                                    <DataValueFieldNoBlur dataElement={hId} />
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {showServiceProvider && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        <Box sx={{ width: `${LABEL_COL_W}px`, padding: "10px" }}>
                          <DataValueLabel dataElement={keys.SERVICE_PROVIDER_ID} />
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            borderLeft: "1px solid #e0e0e0",
                            padding: "10px",
                          }}
                        >
                          <DataValueFieldNoBlur
                            dataElement={keys.SERVICE_PROVIDER_ID}
                            required={true /* required via rule */}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              }

              // ---- NEW 8.1 Operators block injected after TYPE_CONN_ID ----
              if (isNewOpsAnchor) {
                return (
                  <Box key={deId}>
                    {Row}

                    {showNewOperators && visibleNewOps.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "stretch",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        {/* label cell */}
                        <Box
                          sx={{
                            width: `${LABEL_COL_W}px`,
                            px: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            textAlign: "left",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ fontWeight: 400, fontSize: 16, lineHeight: 1.4 }}
                          >
                            {trNewOperatorsLabel}
                          </Box>
                        </Box>

                        {/* value cell — horizontal strip */}
                        <Box
                          sx={{
                            flex: 1,
                            borderLeft: "1px solid #e0e0e0",
                            padding: "10px",
                          }}
                        >
                          <Box sx={{ flex: 1, padding: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "nowrap",
                                overflowX: "auto",
                                gap: 3,
                                alignItems: "stretch",
                                py: 0.5,
                              }}
                            >
                              {allDEs.map((hde) => {
                                const hId = getDeId(hde);
                                if (!hId || !NEW_OP_HSTACK.has(hId)) return null;
                                if (hiddenFields[hId]) return null;

                                return (
                                  <Box
                                    key={hId}
                                    sx={{
                                      flex: "0 0 auto",
                                      minWidth: 100,
                                      display: "inline-flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      justifyContent: "center",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        mb: 0.5,
                                        fontWeight: 600,
                                        fontSize: 12,
                                        color: "text.secondary",
                                      }}
                                    >
                                      <DataValueLabel dataElement={hId} />
                                    </Box>
                                    <DataValueFieldNoBlur dataElement={hId} />
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

              // ---- Months block injected after month anchor ----
              if (isMonthAnchor) {
                return (
                  <Box key={deId}>
                    {Row}

                    {/* Months grid row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "stretch",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {/* label cell */}
                      <Box
                        sx={{
                          width: `${LABEL_COL_W}px`,
                          px: "10px",
                          py: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box component="span" sx={{ fontWeight: 400, fontSize: 16 }}>
                          {trMonthsLabel}
                        </Box>
                      </Box>

                      {/* value cell — 6 per row grid */}
                      <Box
                        sx={{
                          flex: 1,
                          borderLeft: "1px solid #e0e0e0",
                          padding: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, minmax(120px, 1fr))",
                            gap: 2,
                            alignItems: "start",
                          }}
                        >
                          {visibleMonths.map((mId) => (
                            <Box
                              key={mId}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                minWidth: 0,
                              }}
                            >
                              <Box
                                sx={{
                                  mb: 0.5,
                                  fontWeight: 600,
                                  fontSize: 12,
                                  color: "text.secondary",
                                  lineHeight: 1.2,
                                }}
                              >
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

              // Normal rows (including Availability & others)
              return Row;
            })}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FacilityBuildingandFurniture;
