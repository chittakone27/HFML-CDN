import {
  Table, TableBody, TableCell, TableRow, Typography, Box, TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState, useMemo } from "react";

import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";

import HealthFacilitySelectorNoState from "../common/HealthFacilitySelectorNoState";
import useProfileRules from "./useProfileRules";

import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

const LABEL_COL_WIDTH = 220;
const FIELD_MAX_WIDTH = 480;

const DIST_W = 120;  
const TYPE_W = 130;  
const SEQ_W  = 90;   

const toAsciiDigits = (str = "") => {
  const s = String(str);
  const bases = [0x0660, 0x06F0, 0x0966, 0x0E50, 0x0ED0]; 
  return s.replace(
    /[0-9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u0E50-\u0E59\u0ED0-\u0ED9]/g,
    (ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 0x30 && code <= 0x39) return ch; // ASCII 0–9
      for (const base of bases) {
        if (code >= base && code <= base + 9) return String.fromCharCode(0x30 + (code - base));
      }
      return "";
    }
  );
};

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trSelectNearest = t("profile.hf.selectNearest", {
    defaultValue: isLao ? "ເລືອກສະຖານທີ່ບໍລິການໃກ້ຄຽງ" : "Near by Health Facility",
  });
  const trLevel1 = t("profile.hf.level1", { defaultValue: isLao ? "ແຂວງ" : "Province" });
  const trLevel2 = t("profile.hf.level2", {
    defaultValue: isLao ? "ໂຮງໝໍສູນກາງ / ໂຮງໝໍແຂວງ / ເມືອງ" : "Central Hospital / Provincial Hospital / DHO",
  });
  const trLevel3 = t("profile.hf.level3", {
    defaultValue: isLao ? "ໂຮງໝໍເມືອງປະເພດ / ໂຮງໝໍນ້ອຍ" : "District Hospital / Health Center",
  });

  const trFirstField = t("profile.firstField", {
    defaultValue: isLao ? "ລະຫັດສະຖານທີ່" : "Facility ID",
  });
  const trDistExact4 = t("profile.districtId.exact4", {
    defaultValue: isLao ? "ໃສ່ເລກ 4 ໂຕແນ່ນອນ" : "Enter exactly 4 digits.",
  });
  const trRequired = t("form.required", {
    defaultValue: isLao ? "ຕ້ອງການ" : "Required",
  });
  const trFixErrors = t("form.fixErrorsToSave", {
    defaultValue: isLao ? "" : "",
  });

  useChrTrackerStore();

  const { layout, actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data,
    }))
  );
  const { changeAttributeValue, setLayout } = actions || {};
  const { currentTei } = data || {};

  const IDS = useMemo(() => ({
    firstField: "sO0ItF0Dr0p",
    districtId: "R4mULOs2f6M",
    hfType: "A81fBn53hAD",
    seqNum: "GwphHuSwouj",
    province: "pvY01Pt3GTk",
    district: "GbubCuHuzM7",
    hc: "Jy7ou2LCeju",
    ph: "rsXdExpMW65",
    dh: "WH4Az6TJ5ZA",
    ch: "VF9VIPxkf9z",
  }), []);

  const props = useProfileRules();

  const MANUAL_DISABLE = new Set([IDS.firstField]);
  const MANUAL_HIDE = new Set([]);

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

  const firstFieldVal = findAttributeValue(currentTei, IDS.firstField) || "";
  useEffect(() => {
    const next = props?.assignations?.[IDS.firstField];
    if (typeof next === "undefined") return;
    if (String(firstFieldVal) !== String(next)) setAttr(IDS.firstField, next);

  }, [props?.assignations?.[IDS.firstField], currentTei]);

  const rawDist = findAttributeValue(currentTei, IDS.districtId) || "";
  const rawSeq  = findAttributeValue(currentTei, IDS.seqNum) || "";
  const hfType  = (findAttributeValue(currentTei, IDS.hfType) || "").toString().trim();

  const dist = toAsciiDigits(rawDist).replace(/\D/g, "").slice(0, 4); 
  const seq  = toAsciiDigits(rawSeq).replace(/\D/g, "").slice(0, 2);  

  useEffect(() => {
    if (rawDist && rawDist !== dist) setAttr(IDS.districtId, dist);
    if (rawSeq && rawSeq !== seq)   setAttr(IDS.seqNum, seq);
  }, [rawDist, rawSeq, dist, seq]);

  const distValid = /^\d{4}$/.test(dist);
  const typeValid = hfType.length > 0;           
  const seqValid  = /^[0-9]{1,3}$/.test(seq);    

  const [hfValid, setHfValid] = useState(true);
  useEffect(() => {
    if (!setLayout) return;
    const block =
      layout?.profileFormEditing &&
      (!hfValid || !distValid || !typeValid || !seqValid);
    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "profileRequiredFields" : "");
    return () => {
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };
  }, [hfValid, distValid, typeValid, seqValid, layout?.profileFormEditing, setLayout]);

  const DIST_DIGIT_GUARDS = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      maxLength: 4,
      placeholder: "####",
      "aria-invalid": !distValid ? "true" : undefined,
      "aria-describedby": !distValid ? "dist-help" : undefined,
      required: true,
    },
    onKeyDown: (e) => {
      if (["e", "E", "+", "-", ".", ",", " "].includes(e.key)) return e.preventDefault();
      if (/^\d$/.test(e.key)) {
        const el = e.target;
        const val = toAsciiDigits(String(el.value ?? "")).replace(/\D/g, "");
        const hasSel = (el.selectionEnd ?? 0) - (el.selectionStart ?? 0) > 0;
        if (!hasSel && val.length >= 4) return e.preventDefault();
      }
    },
    onPaste: (e) => {
      const txt = (e.clipboardData || window.clipboardData).getData("text") || "";
      const clean = toAsciiDigits(txt).replace(/\D/g, "").slice(0, 4);
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next = (
        toAsciiDigits(String(el.value ?? "")).slice(0, start) +
        clean +
        toAsciiDigits(String(el.value ?? "")).slice(end)
      ).replace(/\D/g, "").slice(0, 4);
      el.value = next;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
    onInput: (e) => {
      const s = toAsciiDigits(String(e.target.value ?? ""));
      const digits4 = s.replace(/\D/g, "").slice(0, 4);
      if (s !== digits4) e.target.value = digits4;
    },
  };

  const SEQ_DIGIT_GUARDS = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      maxLength: 3,
      placeholder: "###",
      "aria-invalid": !seqValid ? "true" : undefined,
      required: true,
    },
    onKeyDown: (e) => {
      if (["e", "E", "+", "-", ".", ",", " "].includes(e.key)) e.preventDefault();
    },
    onInput: (e) => {
      const s = toAsciiDigits(String(e.target.value ?? ""));
      const clean = s.replace(/\D/g, "").slice(0, 3);
      if (s !== clean) e.target.value = clean;
    },
    onPaste: (e) => {
      const txt = (e.clipboardData || window.clipboardData).getData("text") || "";
      const clean = toAsciiDigits(txt).replace(/\D/g, "").slice(0, 3);
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next = (
        toAsciiDigits(String(el.value ?? "")).slice(0, start) +
        clean +
        toAsciiDigits(String(el.value ?? "")).slice(end)
      ).replace(/\D/g, "").slice(0, 3);
      el.value = next;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
  };

  const rowFirstDisabled = !layout?.profileFormEditing || MANUAL_DISABLE.has(IDS.firstField);

  const hfIds = [IDS.province, IDS.district, IDS.ph, IDS.dh, IDS.ch, IDS.hc];
  const hfRowHidden = hfIds.every((id) => MANUAL_HIDE.has(id));
  const hfDisabled = !layout?.profileFormEditing;

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }} />
            <TableCell>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: `${DIST_W}px ${TYPE_W}px ${SEQ_W}px`,
                  gap: 1.5,
                  maxWidth: FIELD_MAX_WIDTH,
                  alignItems: "start",
                }}
              >

                <Box sx={{ display: "grid", gap: 0.5 }}>
                  <AttributeLabel attribute={IDS.districtId} />
                  <AttributeField
                    attribute={IDS.districtId}
                    disabledManualFields
                    size="small"
                    {...DIST_DIGIT_GUARDS}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 36,
                        width: DIST_W,
                        ...(distValid ? {} : { borderColor: "#d32f2f", borderWidth: 1, borderStyle: "solid" }),
                      },
                      "& .MuiInputBase-input": { py: 0.5, fontSize: "0.9rem" },
                    }}
                  />
                  {!distValid && (
                    <Box id="dist-help" sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                      {trDistExact4}
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: "grid", gap: 0.5 }}>
                  <AttributeLabel attribute={IDS.hfType} />
                  <AttributeField
                    attribute={IDS.hfType}
                    disabledManualFields
                    size="small"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 36,
                        width: TYPE_W,
                        ...(typeValid ? {} : { borderColor: "#d32f2f", borderWidth: 1, borderStyle: "solid" }),
                      },
                      "& .MuiInputBase-input, & .MuiSelect-select": {
                        py: 0.5, fontSize: "0.9rem",
                      },
                    }}
                  />
                  {!typeValid && (
                    <Box sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                      {trRequired}
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: "grid", gap: 0.5 }}>
                  <AttributeLabel attribute={IDS.seqNum} />
                  <AttributeField
                    attribute={IDS.seqNum}
                    disabledManualFields
                    size="small"
                    {...SEQ_DIGIT_GUARDS}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 36,
                        width: SEQ_W,
                        ...(seqValid ? {} : { borderColor: "#d32f2f", borderWidth: 1, borderStyle: "solid" }),
                      },
                      "& .MuiInputBase-input": { py: 0.5, fontSize: "0.9rem" },
                    }}
                  />
                  {!seqValid && (
                    <Box sx={{ mt: 0.5, fontSize: 12, lineHeight: "16px", color: "#d32f2f" }}>
                      {trRequired}
                    </Box>
                  )}
                </Box>
              </Box>

              {(!distValid || !typeValid || !seqValid) && (
                <Box sx={{ mt: 1, fontSize: 12, color: "#d32f2f" }}>{trFixErrors}</Box>
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <Typography>{trFirstField}</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                <TextField
                  size="small"
                  fullWidth
                  value={firstFieldVal}
                  onChange={(e) => setAttr(IDS.firstField, e.target.value)}
                  disabled={rowFirstDisabled}
                />
              </Box>
            </TableCell>
          </TableRow>

          {!hfRowHidden && (
            <TableRow>
              <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                <Typography>{trSelectNearest}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                  <HealthFacilitySelectorNoState
                    disabled={!layout?.profileFormEditing}
                    ids={IDS}
                    init={{
                      firstField: findAttributeValue(currentTei, IDS.firstField) || "",
                      province: findAttributeValue(currentTei, IDS.province) || "",
                      district: findAttributeValue(currentTei, IDS.district) || "",
                      hc: findAttributeValue(currentTei, IDS.hc) || "",
                      ph: findAttributeValue(currentTei, IDS.ph) || "",
                      dh: findAttributeValue(currentTei, IDS.dh) || "",
                      ch: findAttributeValue(currentTei, IDS.ch) || "",
                    }}
                    labelsOverride={{
                      level1: <span>{trLevel1}</span>,
                      level2: <span>{trLevel2}</span>,
                      level3: <span>{trLevel3}</span>,
                    }}
                    onValidityChange={setHfValid}
                    onChange={({ province, district, ph, ch, hc, dh }) => {
                      changeAttributeValue?.(IDS.province, province || "");
                      changeAttributeValue?.(IDS.district, district || "");
                      changeAttributeValue?.(IDS.ph, ph || "");
                      changeAttributeValue?.(IDS.hc, hc || "");
                      changeAttributeValue?.(IDS.dh, dh || "");
                      changeAttributeValue?.(IDS.ch, ch || "");
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Profile;
