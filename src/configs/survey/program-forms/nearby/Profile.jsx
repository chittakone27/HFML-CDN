import {  Table,  TableBody,  TableCell,  TableRow,  Typography,  Box,  TextField,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState, useMemo } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";
import HealthFacilitySelectorNoState from "../common/HealthFacilitySelectorNoState";
import VillageSelectorOrgUnit from "../common/VillageSelectorOrgUnit";
import useProfileRules from "./useProfileRules";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

const LABEL_COL_WIDTH = 220;
const FIELD_MAX_WIDTH = 480;

const DIST_W = 120; 
const TYPE_W = 130; 
const SEQ_W = 90; 

const toAsciiDigits = (str = "") => {
  const s = String(str);
  const bases = [0x0660, 0x06f0, 0x0966, 0x0e50, 0x0ed0]; 
  return s.replace(
    /[0-9\u0660-\u0669\u06F0-\u06F9\u0966-\u096F\u0E50-\u0E59\u0ED0-\u0ED9]/g,
    (ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 0x30 && code <= 0x39) return ch; 
      for (const base of bases) {
        if (code >= base && code <= base + 9) {
          return String.fromCharCode(0x30 + (code - base));
        }
      }
      return "";
    }
  );
};

const normalize = (s) => String(s ?? "").trim().toLowerCase();

const NEARBY_EXISTING_HF_CODES = new Set([
  "EXIST_PUBLIC_HF", 
]);

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const trSelectNearest = t("profile.hf.selectNearest", {
    defaultValue: isLao ? "ເລືອກສະຖານທີ່ບໍລິການໃກ້ຄຽງ" : "Near by Health Facility",
  });
  const trLevel1 = t("profile.hf.level1", {
    defaultValue: isLao ? "ແຂວງ" : "Province",
  });
  const trLevel2 = t("profile.hf.level2", {
    defaultValue: isLao
      ? "ໂຮງໝໍສູນກາງ / ໂຮງໝໍແຂວງ / ເມືອງ"
      : "Central Hospital / Provincial Hospital / DHO",
  });
  const trLevel3 = t("profile.hf.level3", {
    defaultValue: isLao
      ? "ໂຮງໝໍເມືອງປະເພດ / ໂຮງໝໍນ້ອຍ"
      : "District Hospital / Health Center",
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
  const trAddress = t("profile.addressBlock", {
    defaultValue: isLao ? "ທີ່ຢູ່" : "Address",
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

  const IDS = useMemo(
    () => ({

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
      nearbyType: "SxKvvxpzop9", 
      customFacilityName: "f9d4P9maZEq", 
      customFacilityGps: "oqcnIPmiVhh", 

      addressProvince: "kFHo6CSy7B0",
      addressDistrict: "MFb4L2Ju4iu",
      addressVillage: "U4k2WoPO2dN",
    }),
    []
  );

  const props = useProfileRules();
  const MANUAL_HIDE = new Set([]);
  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");
  const firstFieldVal = findAttributeValue(currentTei, IDS.firstField) || "";
  useEffect(() => {
    const next = props?.assignations?.[IDS.firstField];
    if (typeof next === "undefined") return;
    if (String(firstFieldVal) !== String(next)) setAttr(IDS.firstField, next);
  }, [props?.assignations?.[IDS.firstField], currentTei]);

  const rawDist = findAttributeValue(currentTei, IDS.districtId) || "";
  const rawSeq = findAttributeValue(currentTei, IDS.seqNum) || "";
  const hfType = (findAttributeValue(currentTei, IDS.hfType) || "")
    .toString()
    .trim();

  const dist = toAsciiDigits(rawDist).replace(/\D/g, "").slice(0, 4); // clamp to 4
  const seq = toAsciiDigits(rawSeq).replace(/\D/g, "").slice(0, 2); // clamp to 2
  const nearbyTypeRaw = findAttributeValue(currentTei, IDS.nearbyType) || "";
  const isExistingPublicHF =
    NEARBY_EXISTING_HF_CODES.has(nearbyTypeRaw) ||
    normalize(nearbyTypeRaw) === normalize("Existing public health facility");

  const isCustomFacilityMode =
    !!normalize(nearbyTypeRaw) && !isExistingPublicHF;

  const customFacilityName =
    findAttributeValue(currentTei, IDS.customFacilityName) || "";
  const facilityNameValid =
    !isCustomFacilityMode || customFacilityName.trim().length > 0;

  useEffect(() => {
    if (rawDist && rawDist !== dist) setAttr(IDS.districtId, dist);
    if (rawSeq && rawSeq !== seq) setAttr(IDS.seqNum, seq);

  }, [rawDist, rawSeq, dist, seq]);

  const distValid = !isExistingPublicHF || /^\d{4}$/.test(dist);
  const typeValid = !isExistingPublicHF || hfType.length > 0;
  const seqValid = !isExistingPublicHF || /^[0-9]{1,3}$/.test(seq);

  const [hfValid, setHfValid] = useState(true);
  const hfValidityForSave = isExistingPublicHF ? hfValid : true;

  useEffect(() => {
    if (!setLayout) return;
    const block =
      layout?.profileFormEditing &&
      (!hfValidityForSave ||
        !distValid ||
        !typeValid ||
        !seqValid ||
        !facilityNameValid);

    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "profileRequiredFields" : "");
    return () => {
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };

  }, [
    hfValidityForSave,
    distValid,
    typeValid,
    seqValid,
    facilityNameValid,
    layout?.profileFormEditing,
    setLayout,
  ]);

  const DIST_DIGIT_GUARDS = {
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      maxLength: 4,
      placeholder: "####",
      "aria-invalid":
        isExistingPublicHF && !distValid ? "true" : undefined,
      "aria-describedby":
        isExistingPublicHF && !distValid ? "dist-help" : undefined,
      required: isExistingPublicHF,
    },
    onKeyDown: (e) => {
      if (["e", "E", "+", "-", ".", ",", " "].includes(e.key))
        return e.preventDefault();
      if (/^\d$/.test(e.key)) {
        const el = e.target;
        const val = toAsciiDigits(String(el.value ?? "")).replace(/\D/g, "");
        const hasSel =
          (el.selectionEnd ?? 0) - (el.selectionStart ?? 0) > 0;
        if (!hasSel && val.length >= 4) return e.preventDefault();
      }
    },
    onPaste: (e) => {
      const txt =
        (e.clipboardData || window.clipboardData).getData("text") || "";
      const clean = toAsciiDigits(txt).replace(/\D/g, "").slice(0, 4);
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next = (
        toAsciiDigits(String(el.value ?? "")).slice(0, start) +
        clean +
        toAsciiDigits(String(el.value ?? "")).slice(end)
      )
        .replace(/\D/g, "")
        .slice(0, 4);
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
      "aria-invalid":
        isExistingPublicHF && !seqValid ? "true" : undefined,
      required: isExistingPublicHF,
    },
    onKeyDown: (e) => {
      if (["e", "E", "+", "-", ".", ",", " "].includes(e.key))
        e.preventDefault();
    },
    onInput: (e) => {
      const s = toAsciiDigits(String(e.target.value ?? ""));
      const clean = s.replace(/\D/g, "").slice(0, 3);
      if (s !== clean) e.target.value = clean;
    },
    onPaste: (e) => {
      const txt =
        (e.clipboardData || window.clipboardData).getData("text") || "";
      const clean = toAsciiDigits(txt).replace(/\D/g, "").slice(0, 3);
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const next = (
        toAsciiDigits(String(el.value ?? "")).slice(0, start) +
        clean +
        toAsciiDigits(String(el.value ?? "")).slice(end)
      )
        .replace(/\D/g, "")
        .slice(0, 3);
      el.value = next;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
  };

  const rowFirstDisabled = true;
  const hfIds = [
    IDS.province,
    IDS.district,
    IDS.ph,
    IDS.dh,
    IDS.ch,
    IDS.hc,
  ];
  const hfRowHidden = hfIds.every((id) => MANUAL_HIDE.has(id));
  const showHfSelectorRow = !hfRowHidden && isExistingPublicHF;

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>

          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <AttributeLabel attribute={IDS.nearbyType} />
            </TableCell>
            <TableCell>
              <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                <AttributeField
                  attribute={IDS.nearbyType}
                  size="small"
                  disabled={!layout?.profileFormEditing}
                />
              </Box>
            </TableCell>
          </TableRow>

          {isExistingPublicHF && (
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
                          ...(isExistingPublicHF && !distValid
                            ? {
                                borderColor: "#d32f2f",
                                borderWidth: 1,
                                borderStyle: "solid",
                              }
                            : {}),
                        },
                        "& .MuiInputBase-input": {
                          py: 0.5,
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                    {isExistingPublicHF && !distValid && (
                      <Box
                        id="dist-help"
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          lineHeight: "16px",
                          color: "#d32f2f",
                        }}
                      >
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
                          ...(isExistingPublicHF && !typeValid
                            ? {
                                borderColor: "#d32f2f",
                                borderWidth: 1,
                                borderStyle: "solid",
                              }
                            : {}),
                        },
                        "& .MuiInputBase-input, & .MuiSelect-select": {
                          py: 0.5,
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                    {isExistingPublicHF && !typeValid && (
                      <Box
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          lineHeight: "16px",
                          color: "#d32f2f",
                        }}
                      >
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
                          ...(isExistingPublicHF && !seqValid
                            ? {
                                borderColor: "#d32f2f",
                                borderWidth: 1,
                                borderStyle: "solid",
                              }
                            : {}),
                        },
                        "& .MuiInputBase-input": {
                          py: 0.5,
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                    {isExistingPublicHF && !seqValid && (
                      <Box
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          lineHeight: "16px",
                          color: "#d32f2f",
                        }}
                      >
                        {trRequired}
                      </Box>
                    )}
                  </Box>
                </Box>

                {isExistingPublicHF &&
                  (!distValid || !typeValid || !seqValid) && (
                    <Box sx={{ mt: 1, fontSize: 12, color: "#d32f2f" }}>
                      {trFixErrors}
                    </Box>
                  )}
              </TableCell>
            </TableRow>
          )}

          {isExistingPublicHF && (
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
          )}

          {showHfSelectorRow && (
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
                      firstField:
                        findAttributeValue(currentTei, IDS.firstField) || "",
                      province:
                        findAttributeValue(currentTei, IDS.province) || "",
                      district:
                        findAttributeValue(currentTei, IDS.district) || "",
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

          {isCustomFacilityMode && (
            <>

              <TableRow>
                <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <AttributeLabel attribute={IDS.customFacilityName} />
                    <Box
                      component="span"
                      sx={{ color: "#d32f2f" }}
                      aria-hidden="true"
                    >
                      *
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                    <AttributeField
                      attribute={IDS.customFacilityName}
                      size="small"
                      disabled={!layout?.profileFormEditing}
                    />
                    {!facilityNameValid && (
                      <Box
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          lineHeight: "16px",
                          color: "#d32f2f",
                        }}
                      >
                        {trRequired}
                      </Box>
                    )}
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                  <Typography>{trAddress}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                    <VillageSelectorOrgUnit
                      VillageSelectorIds={[
                        IDS.addressProvince,
                        IDS.addressDistrict,
                        IDS.addressVillage,
                      ]}
                      saveGeo
                      disabled={!layout?.profileFormEditing}
                    />
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                  <AttributeLabel attribute={IDS.customFacilityGps} />
                </TableCell>
                <TableCell>
                  <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                    <AttributeField
                      attribute={IDS.customFacilityGps}
                      size="small"
                      disabled={!layout?.profileFormEditing}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Profile;
