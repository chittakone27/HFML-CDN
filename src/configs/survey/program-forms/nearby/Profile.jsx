// src/configs/laotracker/program-forms/.../Profile.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  TextField,
} from "@mui/material";
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

const normalize = (s) => String(s ?? "").trim().toLowerCase();

// 🔧 put the *real* option code for “Existing public health facility” here
const NEARBY_EXISTING_HF_CODES = new Set([
  "EXIST_PUBLIC_HF", // <-- replace with your actual option code if needed
]);

// -------------------- helpers for orgUnit API --------------------
const DHIS_UID_RE = /^[A-Za-z][A-Za-z0-9]{10}$/;

const getApiBaseUrl = () => {
  // DHIS2 app (prod)
  if (typeof window !== "undefined" && window.DHIS_CONFIG?.baseUrl) {
    return window.DHIS_CONFIG.baseUrl.replace(/\/$/, "");
  }
  // local dev
  const envBase = import.meta.env.VITE_BASE_URL;
  if (envBase) {
    return String(envBase).replace(/\/$/, "");
  }
  return "";
};

const buildApiUrl = (path) => {
  const base = getApiBaseUrl();
  const cleaned = path.replace(/^\//, "");
  return base ? `${base}/${cleaned}` : `/${cleaned}`;
};

// ✅ Basic auth for localhost / dev (uses your .env values)
const getAuthHeaders = () => {
  const user = import.meta.env.VITE_USERNAME;
  const pass = import.meta.env.VITE_PASSWORD;
  if (!user || !pass) return {};
  const token = btoa(`${user}:${pass}`);
  return { Authorization: `Basic ${token}` };
};
// ---------------------------------------------------------------------

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
  const trRequired = t("form.required", {
    defaultValue: isLao ? "ຕ້ອງການ" : "Required",
  });
  const trFixErrors = t("form.fixErrorsToSave", {
    defaultValue: isLao ? "" : "",
  });
  const trAddress = t("profile.addressBlock", {
    defaultValue: isLao ? "ທີ່ຢູ່" : "Address",
  });
  const trSelectedHfName = t("profile.selectedHfName", {
    defaultValue: isLao ? "ຊື່ສະຖານທີ່ບໍລິການ" : "Health facility name",
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

  // TEA IDs (target + selector + new nearby facility fields)
  const IDS = useMemo(
    () => ({
      // target (auto-composed / mapped from orgUnit code)
      firstField: "sO0ItF0Dr0p",

      // selector members
      province: "pvY01Pt3GTk",
      district: "GbubCuHuzM7",
      hc: "Jy7ou2LCeju",
      ph: "rsXdExpMW65",
      dh: "WH4Az6TJ5ZA",
      ch: "VF9VIPxkf9z",

      // Type of nearby facility + custom fields
      nearbyType: "SxKvvxpzop9", // Type of nearby health facility
      customFacilityName: "f9d4P9maZEq", // Facility name (text, required when visible)
      customFacilityGps: "oqcnIPmiVhh", // GPS location (optional)

      // address block TEAs (Province / District / Village)
      addressProvince: "kFHo6CSy7B0",
      addressDistrict: "MFb4L2Ju4iu",
      addressVillage: "U4k2WoPO2dN",
    }),
    []
  );

  const props = useProfileRules();

  // manual hide set (kept for future if needed)
  const MANUAL_HIDE = new Set([]);

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

  // Keep Facility ID synced from rules (if assignations is used for something)
  const firstFieldVal = findAttributeValue(currentTei, IDS.firstField) || "";
  useEffect(() => {
    const next = props?.assignations?.[IDS.firstField];
    if (typeof next === "undefined") return;
    if (String(firstFieldVal) !== String(next)) setAttr(IDS.firstField, next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.assignations?.[IDS.firstField], currentTei]);

  // Type of nearby facility + derived mode
  const nearbyTypeRaw = findAttributeValue(currentTei, IDS.nearbyType) || "";
  const nearbyTypeNorm = normalize(nearbyTypeRaw);

  // nearbyType itself is mandatory
  const nearbyTypeValid = !!nearbyTypeNorm;

  // True only when user *actually* picked "Existing public health facility"
  const isExistingHFSelection =
    NEARBY_EXISTING_HF_CODES.has(nearbyTypeRaw) ||
    nearbyTypeNorm === normalize("Existing public health facility");

  // Show Existing HF block only when "Existing public health facility" is selected
  const showExistingHFBlock = isExistingHFSelection;

  // Custom (non-existing) facility mode:
  const isCustomFacilityMode = !!nearbyTypeNorm && !isExistingHFSelection;

  // custom facility name validity (required when visible)
  const customFacilityName =
    findAttributeValue(currentTei, IDS.customFacilityName) || "";
  const facilityNameValid =
    !isCustomFacilityMode || customFacilityName.trim().length > 0;

  // Address block values + validity (only required in custom mode)
  const addressProvinceVal =
    findAttributeValue(currentTei, IDS.addressProvince) || "";
  const addressDistrictVal =
    findAttributeValue(currentTei, IDS.addressDistrict) || "";
  const addressVillageVal =
    findAttributeValue(currentTei, IDS.addressVillage) || "";

  const addressProvinceValid =
    !isCustomFacilityMode || addressProvinceVal.trim().length > 0;
  const addressDistrictValid =
    !isCustomFacilityMode || addressDistrictVal.trim().length > 0;
  const addressVillageValid =
    !isCustomFacilityMode || addressVillageVal.trim().length > 0;

  // Disable Save when invalid (mode-aware)
  const [hfValid, setHfValid] = useState(true);
  const hfValidityForSave = isExistingHFSelection ? hfValid : true;

  useEffect(() => {
    if (!setLayout) return;
    const block =
      layout?.profileFormEditing &&
      (
        // nearbyType itself mandatory
        !nearbyTypeValid ||

        // Existing HF: selector HF must be valid
        (isExistingHFSelection && !hfValidityForSave) ||

        // Custom HF: name + address block mandatory
        (isCustomFacilityMode &&
          (!facilityNameValid ||
            !addressProvinceValid ||
            !addressDistrictValid ||
            !addressVillageValid))
      );

    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "profileRequiredFields" : "");
    return () => {
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    layout?.profileFormEditing,
    setLayout,
    nearbyTypeValid,
    isExistingHFSelection,
    isCustomFacilityMode,
    hfValidityForSave,
    facilityNameValid,
    addressProvinceValid,
    addressDistrictValid,
    addressVillageValid,
  ]);

  // visibility / disabled
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
  const showHfSelectorRow = !hfRowHidden && showExistingHFBlock;

  // ------------------- map selected orgUnit → Facility ID --------------
  // cache orgUnit details by UID (to avoid re-fetching)
  // hfOuCache[uid] = { code, en, lo }
  const [hfOuCache, setHfOuCache] = useState({});

  const hcUid = findAttributeValue(currentTei, IDS.hc) || "";
  const dhUid = findAttributeValue(currentTei, IDS.dh) || "";
  const phUid = findAttributeValue(currentTei, IDS.ph) || "";
  const chUid = findAttributeValue(currentTei, IDS.ch) || "";

  useEffect(() => {
    // When we are NOT in "Existing public health facility" mode,
    // clear Facility ID and skip mapping.
    if (!isExistingHFSelection) {
      if (firstFieldVal) setAttr(IDS.firstField, "");
      return;
    }

    // Priority: HC -> DH -> PH -> CH
    const ordered = [hcUid, dhUid, phUid, chUid]
      .map((v) => String(v || "").trim())
      .filter((v) => !!v);
    const uid = ordered.find((v) => DHIS_UID_RE.test(v));
    if (!uid) return;

    const cached = hfOuCache[uid];
    if (cached?.code) {
      if (cached.code !== firstFieldVal) {
        setAttr(IDS.firstField, cached.code);
      }
      return;
    }

    let cancelled = false;

    const fetchOu = async () => {
      try {
        const url = buildApiUrl(
          `/api/organisationUnits/${uid}.json?fields=id,code,name,displayName,translations[value,locale,property]`
        );
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            ...getAuthHeaders(), // ✅ important for localhost / external base URL
          },
          redirect: "follow",
        });

        const ct = res.headers.get("content-type") || "";
        if (!res.ok || !ct.includes("application/json")) return;

        const json = await res.json();

        const baseName =
          json.displayName ||
          json.name ||
          (json.code ? `(${json.code})` : json.id);

        let loName = "";
        if (Array.isArray(json.translations)) {
          const loTr = json.translations.find(
            (tr) =>
              tr.property === "NAME" &&
              tr.locale &&
              tr.locale.toLowerCase().startsWith("lo")
          );
          if (loTr?.value) loName = loTr.value;
        }

        const code = json.code || "";

        if (!cancelled) {
          setHfOuCache((prev) => ({
            ...prev,
            [uid]: {
              code,
              en: baseName,
              lo: loName || baseName,
            },
          }));

          if (code && code !== firstFieldVal) {
            setAttr(IDS.firstField, code);
          }
        }
      } catch {
        // ignore network / proxy errors – do not block form
      }
    };

    fetchOu();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isExistingHFSelection,
    hcUid,
    dhUid,
    phUid,
    chUid,
    firstFieldVal,
    IDS.firstField,
    setAttr,
    hfOuCache,
  ]);

  // Selected HF name (Lao/EN switch)
  const selectedHfName = useMemo(() => {
    const ordered = [hcUid, dhUid, phUid, chUid]
      .map((v) => String(v || "").trim())
      .filter((v) => !!v);
    const uid = ordered.find((v) => DHIS_UID_RE.test(v));
    if (!uid) return "";
    const entry = hfOuCache[uid];
    if (!entry) return "";
    return isLao ? entry.lo || entry.en || "" : entry.en || entry.lo || "";
  }, [hcUid, dhUid, phUid, chUid, hfOuCache, isLao]);
  // --------------------------------------------------------------------------

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          {/* FIRST FIELD: Type of nearby health facility (SxKvvxpzop9) */}
          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AttributeLabel attribute={IDS.nearbyType} />
                {/* always mandatory */}
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
                  attribute={IDS.nearbyType}
                  size="small"
                  disabled={!layout?.profileFormEditing}
                  sx={{
                    "& .MuiInputBase-root": {
                      ...(layout?.profileFormEditing && !nearbyTypeValid
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
                {!nearbyTypeValid && layout?.profileFormEditing && (
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

          {/* Facility ID – auto-filled from selected orgUnit code */}
          {showExistingHFBlock && (
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

          {/* Selected HF name (read-only, from orgUnit) */}
          {showExistingHFBlock && selectedHfName && (
            <TableRow>
              <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                <Typography>{trSelectedHfName}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                  <Typography variant="body2">{selectedHfName}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {/* Health facility selector – when "Existing public health facility" */}
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
                  {isExistingHFSelection && !hfValid && (
                    <Box sx={{ mt: 0.5, fontSize: 12, color: "#d32f2f" }}>
                      {trFixErrors}
                    </Box>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}

          {/* Custom facility details when NOT Existing public health facility */}
          {isCustomFacilityMode && (
            <>
              {/* Facility name (required when visible) */}
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

              {/* Address block (Province / District / Village) */}
              <TableRow>
                <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <Typography>{trAddress}</Typography>
                    {/* mandatory in custom mode */}
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
                    <VillageSelectorOrgUnit
                      VillageSelectorIds={[
                        IDS.addressProvince,
                        IDS.addressDistrict,
                        IDS.addressVillage,
                      ]}
                      saveGeo
                      disabled={!layout?.profileFormEditing}
                    />
                    {isCustomFacilityMode &&
                      (!addressProvinceValid ||
                        !addressDistrictValid ||
                        !addressVillageValid) && (
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

              {/* GPS location (optional) */}
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