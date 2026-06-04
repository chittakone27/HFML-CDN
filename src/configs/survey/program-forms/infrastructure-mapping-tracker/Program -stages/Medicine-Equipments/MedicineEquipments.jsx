import { Box } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useMemo, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import DataValueFieldNoBlur from "@/ui/TrackerCapture/EventForm/DataValueFieldNoBlur";
import DataValueLabel from "@/ui/TrackerCapture/EventForm/DataValueLabel";
import EventDateFieldNoBlur from "@/ui/TrackerCapture/EventForm/EventDateFieldNoBlur";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";

import useSelectionStore from "@/state/selection";
import useTrackerCaptureStore from "@/state/trackerCapture";
import Accordion from "../../../common/Accordion";

const LABEL_COL_W = 300;

const MEDICINE_EQUIPMENTS_STAGE_ID = "iMBvvWzdbHs";

const IDS = {
  CGZkIu1XSNz: "CGZkIu1XSNz",
  sP9J0AwGr0H: "sP9J0AwGr0H",

  RjsctZCJGfN: "RjsctZCJGfN",
  Fpb6YUYgzMN: "Fpb6YUYgzMN",
  yYRgkNLvTts: "yYRgkNLvTts",
  C9LsLNcD8aY: "C9LsLNcD8aY",

  WPyPKHKSPyq: "WPyPKHKSPyq",
  ivvJ7CCtplB: "ivvJ7CCtplB",
  owut2F1GZpP: "owut2F1GZpP",
  LI8matximN9: "LI8matximN9",

  Jne77734RQ3: "Jne77734RQ3",
  CZI8s5Uy8QT: "CZI8s5Uy8QT",
  Ef2SB0rzAGC: "Ef2SB0rzAGC",
  COYo5UqZ5JX: "COYo5UqZ5JX",

  uLrUYGguTtA: "uLrUYGguTtA",
  LNIXPsWjXGs: "LNIXPsWjXGs",
};

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

const toNumber = (v) => {
  if (v == null || v === "") return 0;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
};

const clearHiddenDataValues = (actions, currentEvent, hiddenFields) => {
  if (!actions || !currentEvent) return;
  const eventId = currentEvent.event;
  if (!eventId) return;

  Object.entries(hiddenFields).forEach(([deId, isHidden]) => {
    if (!isHidden) return;
    try {
      if (typeof actions.changeEventDataValue === "function") {
        actions.changeEventDataValue(eventId, deId, "");
      } else if (typeof actions.updateEventDataValue === "function") {
        actions.updateEventDataValue({ eventId, dataElementId: deId, value: "" });
      } else if (typeof actions.setDataValue === "function") {
        actions.setDataValue({ event: eventId, dataElement: deId, value: "" });
      } else if (typeof actions.handleDataValueChange === "function") {
        actions.handleDataValueChange({
          event: eventId,
          dataElement: deId,
          value: "",
        });
      }
    } catch {

    }
  });
};

const MedicineEquipments = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { currentEvent } = useCurrentEvent();

  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
    }))
  );

  const { actions } = useTrackerCaptureStore(
    useShallow((state) => ({ actions: state.actions }))
  );

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
        displayName: stage.displayName || "Medicine Equipments",
        dataElements,
      },
    ];
  }, [stage]);
  const { hiddenFields, presentIds, requiredSet, missing } = useMemo(() => {
    const hidden = {};
    const required = new Set();
    const allIds = [];

    sections.forEach((sec) => {
      (sec?.dataElements ?? []).forEach((de) => {
        const id = de?.id || de?.dataElement?.id;
        if (id) allIds.push(id);
      });
    });

    const conditionalTargets = [
      IDS.sP9J0AwGr0H,
      IDS.Fpb6YUYgzMN,
      IDS.yYRgkNLvTts,
      IDS.C9LsLNcD8aY,
      IDS.ivvJ7CCtplB,
      IDS.owut2F1GZpP,
      IDS.LI8matximN9,
      IDS.CZI8s5Uy8QT,
      IDS.Ef2SB0rzAGC,
      IDS.COYo5UqZ5JX,
      IDS.LNIXPsWjXGs,
    ];
    conditionalTargets.forEach((id) => {
      hidden[id] = true;
    });

    const vCGZ = toNumber(getEventDEValue(currentEvent, IDS.CGZkIu1XSNz));
    const vRj  = toNumber(getEventDEValue(currentEvent, IDS.RjsctZCJGfN));
    const vy   = getEventDEValue(currentEvent, IDS.yYRgkNLvTts); // still needed to show that field
    const vFpb = getEventDEValue(currentEvent, IDS.Fpb6YUYgzMN);
    const vFpbStr = String(vFpb ?? "").trim();

    const vWP  = toNumber(getEventDEValue(currentEvent, IDS.WPyPKHKSPyq));
    const vivv = getEventDEValue(currentEvent, IDS.ivvJ7CCtplB);

    const vJn  = toNumber(getEventDEValue(currentEvent, IDS.Jne77734RQ3));
    const vCZ  = getEventDEValue(currentEvent, IDS.CZI8s5Uy8QT);

    const vULR = toNumber(getEventDEValue(currentEvent, IDS.uLrUYGguTtA));

    if (vCGZ > 0) {
      hidden[IDS.sP9J0AwGr0H] = false;
    }

    if (vRj > 0) {
      hidden[IDS.Fpb6YUYgzMN] = false;
    }

    if (vRj > 0) {
      hidden[IDS.yYRgkNLvTts] = false;
    }

    if (vFpbStr === "Other_place") {
      hidden[IDS.C9LsLNcD8aY] = false;
    }

    if (vWP > 0) {
      hidden[IDS.ivvJ7CCtplB] = false;
    }

    const vivvStr = String(vivv ?? "").trim();
    if (vivvStr === "Other_place") {
      hidden[IDS.owut2F1GZpP] = false;
    }

    if (vWP > 0) {
      hidden[IDS.LI8matximN9] = false;
    }

    if (vJn > 0) {
      hidden[IDS.CZI8s5Uy8QT] = false;
    }

    const vCZStr = String(vCZ ?? "").trim();
    if (vCZStr === "other_things") {
      hidden[IDS.Ef2SB0rzAGC] = false;
    }

    if (vJn > 0) {
      hidden[IDS.COYo5UqZ5JX] = false;
    }

    if (vULR > 0) {
      hidden[IDS.LNIXPsWjXGs] = false;
    }

    const present = allIds.filter((id) => !hidden[id]);
    present.forEach((id) => required.add(id));

    const missingIds = [];
    for (const id of required) {
      const v = getEventDEValue(currentEvent, id);
      if (isEmpty(v)) missingIds.push(id);
    }

    if (!currentEvent || isEmpty(currentEvent.eventDate)) {
      missingIds.push("__eventDate__");
    }

    return {
      hiddenFields: hidden,
      presentIds: present,
      requiredSet: required,
      missing: missingIds,
    };
  }, [sections, currentEvent]);

  useEffect(() => {
    clearHiddenDataValues(actions, currentEvent, hiddenFields);
  }, [actions, currentEvent, hiddenFields]);


  const disabled = missing.length > 0;
  const prevDisabled = useRef(undefined);
  const missingRef = useRef(missing);
  missingRef.current = missing;

  useEffect(() => {
    if (!actions) return;
    if (prevDisabled.current === disabled) return;
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

    }
  }, [actions, disabled]);

  useEffect(() => {
    if (!actions) return;
    const KEY = "eventSave_medicineEquipments_all_visible_required";

    actions.setHandlers &&
      actions.setHandlers(KEY, async () => {
        const m = missingRef.current;
        if (m.length > 0) {
          const msg = t("medicineEquipments.save.completeAll", {
            defaultValue: isLao
              ? "ກະລຸນາກອກຂໍ້ມູນທັງໝົດທີ່ກໍານົດໃຫ້ຕ້ອງກອກ."
              : "Please complete all required fields in Medicine Equipments.",
          });
          return { ok: false, message: msg };
        }
        return { ok: true };
      });

    return () => {
      actions.setHandlers && actions.setHandlers(KEY, null);
    };
  }, [actions, t, isLao]);

  const maxDate = format(new Date(), "yyyy-MM-dd");

  const trAssessmentDate = t("medicineEquipments.assessmentDate", {
    defaultValue: isLao
      ? "ວັນທີກວດກາອຸປະກອນຢາ"
      : "Medicine equipment assessment date",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box>
        <Box
          sx={{
            fontWeight: 600,
            mb: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {trAssessmentDate}
          <Box component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>
            *
          </Box>
        </Box>
        <EventDateFieldNoBlur type="eventDate" maxDate={maxDate} />
      </Box>

      {sections.map((section) => (
        <Accordion
          key={section.id || section.displayName}
          title={section.displayName || "Medicine Equipments"}
        >
          {(section.dataElements ?? []).map((de) => {
            const deId = de?.id || de?.dataElement?.id;
            if (!deId) return null;

            if (hiddenFields[deId]) return null;

            const isRequired = requiredSet.has(deId);

            return (
              <Box
                key={deId}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ width: `${LABEL_COL_W}px`, padding: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    <DataValueLabel dataElement={deId} />
                    {isRequired && (
                      <Box
                        component="span"
                        sx={{ color: "#d32f2f", fontWeight: 700 }}
                      >
                        *
                      </Box>
                    )}
                  </Box>
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

export default MedicineEquipments;