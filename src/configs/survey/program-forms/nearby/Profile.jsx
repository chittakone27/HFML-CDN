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
import { useEffect, useState, useMemo, useRef } from "react";

import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import useSelectionStore from "@/state/selection";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";

import HealthFacilitySelectorNoState from "../common/HealthFacilitySelectorNoState";
import VillageSelectorOrgUnit from "../common/VillageSelectorOrgUnit";
import useProfileRules from "./useProfileRules";

import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";

const LABEL_COL_WIDTH = 220;
const FIELD_MAX_WIDTH = 480;

const ADMIN_GROUP_ID = "Ft6NncNAjeG";

const normalize = (s) => String(s ?? "").trim().toLowerCase();

const NEARBY_EXISTING_HF_CODES = new Set([
  "EXIST_PUBLIC_HF", 
]);

const NEARBY_FOREIGN_HF_CODES = new Set([
  "HF_OTHER_COUNTRY", 
]);

const DHIS_UID_RE = /^[A-Za-z][A-Za-z0-9]{10}$/;

const getApiBaseUrl = () => {
  if (typeof window !== "undefined" && window.DHIS_CONFIG?.baseUrl) {
    return window.DHIS_CONFIG.baseUrl.replace(/\/$/, "");
  }

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
      ? "ໂຮງໝໍເມືອງ / ໂຮງໝໍນ້ອຍ"
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

  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );

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
      province: "pvY01Pt3GTk",
      district: "GbubCuHuzM7",
      hc: "Jy7ou2LCeju",
      ph: "rsXdExpMW65",
      dh: "WH4Az6TJ5ZA",
      ch: "VF9VIPxkf9z",

      nearbyType: "SxKvvxpzop9", 
      customFacilityName: "f9d4P9maZEq", 
      customFacilityGps: "oqcnIPmiVhh", 
     
      foreignCountry: "vieODEkECHl",

      addressProvince: "kFHo6CSy7B0",
      addressDistrict: "MFb4L2Ju4iu",
      addressVillage: "U4k2WoPO2dN",

      army: "WSwuRKJzlBS", 
      police: "SH4pBJuBwCt", 
    }),
    []
  );

  const props = useProfileRules();

  const MANUAL_HIDE = new Set([]);

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");


  const [meInfo, setMeInfo] = useState(null); // /api/me
  const [canDeleteTei, setCanDeleteTei] = useState(null); // null = deciding

  useEffect(() => {
    let cancelled = false;

    const fetchMe = async () => {
      try {
        const url = buildApiUrl(
          "/api/me.json?fields=id,uid,username,userGroups[id,code,name]"
        );
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            ...getAuthHeaders(),
          },
        });
        const ct = res.headers.get("content-type") || "";
        if (!res.ok || !ct.includes("application/json")) return;

        const json = await res.json();
        if (!cancelled) setMeInfo(json);
      } catch {
        if (!cancelled) setMeInfo(null);
      }
    };

    fetchMe();
    return () => {
      cancelled = true;
    };
  }, []);

  const teiId =
    currentTei?.trackedEntityInstance ||
    currentTei?.trackedEntity ||
    currentTei?.tei ||
    currentTei?.id ||
    "";

  const programId =
    program?.id || program?.program?.id || program?.program || "";

  useEffect(() => {
    if (!meInfo) return;

    if (!teiId) {
      setCanDeleteTei(false);
      return;
    }

    const groups = Array.isArray(meInfo.userGroups) ? meInfo.userGroups : [];
    const inAdminGroup = groups.some((g) => g && g.id === ADMIN_GROUP_ID);

    if (inAdminGroup) {
      setCanDeleteTei(true);
      return;
    }

    let cancelled = false;

    const checkTeiCreator = async () => {
      try {
        const qProgram = programId ? `program=${programId}&` : "";
        const url = buildApiUrl(
          `/api/trackedEntityInstances/${teiId}?${qProgram}fields=createdByUserInfo[uid,username]`
        );

        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            ...getAuthHeaders(),
          },
        });
        const ct = res.headers.get("content-type") || "";
        if (!res.ok || !ct.includes("application/json")) {
          if (!cancelled) setCanDeleteTei(false);
          return;
        }

        const json = await res.json();

        const creatorUid = json?.createdByUserInfo?.uid || "";
        const creatorUsername = json?.createdByUserInfo?.username || "";

        const meUid = meInfo.id || meInfo.uid || "";
        const meUsername = meInfo.username || "";

        const sameUser =
          (creatorUid && meUid && creatorUid === meUid) ||
          (creatorUsername &&
            meUsername &&
            creatorUsername.toLowerCase() === meUsername.toLowerCase());

        if (!cancelled) {
          setCanDeleteTei(!!sameUser);
        }
      } catch {
        if (!cancelled) setCanDeleteTei(false);
      }
    };

    checkTeiCreator();
    return () => {
      cancelled = true;
    };
  }, [meInfo, teiId, programId]);

  useEffect(() => {
    if (canDeleteTei === null) return; 
    if (typeof document === "undefined") return;

    if (canDeleteTei === true) return;

    const isInsidePopup = (btn) => {
      if (!btn) return false;
      return !!btn.closest(
        [
          '[role="dialog"]',
          '[role="alertdialog"]',
          '.MuiDialog-root',
          '.MuiDialog-paper',
          '[class*="dialog"]',
          '[class*="Dialog"]',
          '[class*="modal"]',
          '[class*="Modal"]',
          '[data-test*="dialog"]',
          '[data-test*="Dialog"]',
          '[data-test*="modal"]',
          '[data-test*="Modal"]',
        ].join(", ")
      );
    };

    const hideTeiDeleteButtons = () => {
      const nodes = Array.from(
        document.querySelectorAll(
          "button, .MuiButton-root, a.btn-danger, button.btn-danger"
        )
      );

      nodes.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;

        const text = (el.textContent || "").trim();

        if (text !== "Delete" && text !== "ລຶບ") return;

        if (isInsidePopup(el)) return;

        el.style.display = "none";
        el.disabled = true;
        el.setAttribute("aria-hidden", "true");
      });
    };

    hideTeiDeleteButtons();

    const observer = new MutationObserver(hideTeiDeleteButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [canDeleteTei]);

  const firstFieldVal = findAttributeValue(currentTei, IDS.firstField) || "";
  useEffect(() => {
    const next = props?.assignations?.[IDS.firstField];
    if (typeof next === "undefined") return;
    if (String(firstFieldVal) !== String(next)) setAttr(IDS.firstField, next);
  }, [props?.assignations?.[IDS.firstField], currentTei]);
  const nearbyTypeRaw = findAttributeValue(currentTei, IDS.nearbyType) || "";
  const nearbyTypeNorm = normalize(nearbyTypeRaw);

  const nearbyTypeValid = !!nearbyTypeNorm;

  const isExistingHFSelection =
    NEARBY_EXISTING_HF_CODES.has(nearbyTypeRaw) ||
    nearbyTypeNorm === normalize("Existing public health facility");

  const isForeignHFSelection =
    NEARBY_FOREIGN_HF_CODES.has(nearbyTypeRaw) ||
    nearbyTypeNorm === normalize("Health facility in other country");

  const showExistingHFBlock = isExistingHFSelection;

  const isCustomDomesticMode =
    !!nearbyTypeNorm && !isExistingHFSelection && !isForeignHFSelection;

  const customFacilityName =
    findAttributeValue(currentTei, IDS.customFacilityName) || "";
  const facilityNameValid =
    !(isCustomDomesticMode || isForeignHFSelection) ||
    customFacilityName.trim().length > 0;

  const addressProvinceVal =
    findAttributeValue(currentTei, IDS.addressProvince) || "";
  const addressDistrictVal =
    findAttributeValue(currentTei, IDS.addressDistrict) || "";
  const addressVillageVal =
    findAttributeValue(currentTei, IDS.addressVillage) || "";

  const addressProvinceValid =
    !isCustomDomesticMode || addressProvinceVal.trim().length > 0;
  const addressDistrictValid =
    !isCustomDomesticMode || addressDistrictVal.trim().length > 0;
  const addressVillageValid =
    !isCustomDomesticMode || addressVillageVal.trim().length > 0;

  const prevShowExistingRef = useRef(undefined);
  const prevShowCustomForeignRef = useRef(undefined);
  const prevShowAddressRef = useRef(undefined);

  useEffect(() => {
    if (!currentTei || !changeAttributeValue) return;

    const showExisting = showExistingHFBlock;
    const showCustomForeign = isCustomDomesticMode || isForeignHFSelection;
    const showAddress = isCustomDomesticMode;

    const prevExisting = prevShowExistingRef.current;
    const prevCustomForeign = prevShowCustomForeignRef.current;
    const prevAddress = prevShowAddressRef.current;

    prevShowExistingRef.current = showExisting;
    prevShowCustomForeignRef.current = showCustomForeign;
    prevShowAddressRef.current = showAddress;

    const clearAttrIfHasValue = (attrId) => {
      if (!attrId) return;
      const val = findAttributeValue(currentTei, attrId) || "";
      if (val) {
        changeAttributeValue(attrId, "");
      }
    };

    if (prevExisting === true && showExisting === false) {
      [
        IDS.firstField,
        IDS.province,
        IDS.district,
        IDS.hc,
        IDS.ph,
        IDS.dh,
        IDS.ch,
        IDS.army,
        IDS.police,
      ].forEach(clearAttrIfHasValue);
    }

    const prevCustomForeignVisible = prevCustomForeign === true;
    const nowCustomForeignHidden = showCustomForeign === false;
    if (prevCustomForeignVisible && nowCustomForeignHidden) {
      [IDS.customFacilityName, IDS.customFacilityGps,  IDS.foreignCountry, ].forEach(
        clearAttrIfHasValue
      );
    }

    if (prevAddress === true && showAddress === false) {
      [
        IDS.addressProvince,
        IDS.addressDistrict,
        IDS.addressVillage,
      ].forEach(clearAttrIfHasValue);
    }
  }, [
    showExistingHFBlock,
    isCustomDomesticMode,
    isForeignHFSelection,
    currentTei,
    changeAttributeValue,
    IDS,
  ]);

  const [hfValid, setHfValid] = useState(true);
  const hfValidityForSave = isExistingHFSelection ? hfValid : true;

  useEffect(() => {
    if (!setLayout) return;
    const block =
      layout?.profileFormEditing &&
      (
        !nearbyTypeValid ||

        (isExistingHFSelection && !hfValidityForSave) ||

        ((isCustomDomesticMode || isForeignHFSelection) && !facilityNameValid) ||

        (isCustomDomesticMode &&
          (!addressProvinceValid ||
            !addressDistrictValid ||
            !addressVillageValid))
      );

    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "profileRequiredFields" : "");
    return () => {
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };
  }, [
    layout?.profileFormEditing,
    setLayout,
    nearbyTypeValid,
    isExistingHFSelection,
    isCustomDomesticMode,
    isForeignHFSelection,
    hfValidityForSave,
    facilityNameValid,
    addressProvinceValid,
    addressDistrictValid,
    addressVillageValid,
  ]);

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


  const [hfOuCache, setHfOuCache] = useState({});

  const hcUid = findAttributeValue(currentTei, IDS.hc) || "";
  const dhUid = findAttributeValue(currentTei, IDS.dh) || "";
  const phUid = findAttributeValue(currentTei, IDS.ph) || "";
  const chUid = findAttributeValue(currentTei, IDS.ch) || "";

  useEffect(() => {
    if (!isExistingHFSelection) {
      if (firstFieldVal) setAttr(IDS.firstField, "");
      return;
    }

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
            ...getAuthHeaders(), 
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
      }
    };

    fetchOu();
    return () => {
      cancelled = true;
    };
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

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AttributeLabel attribute={IDS.nearbyType} />
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
                    onChange={({
                      province,
                      district,
                      ph,
                      ch,
                      hc,
                      dh,
                      army,
                      police,
                    }) => {
                      changeAttributeValue?.(IDS.province, province || "");
                      changeAttributeValue?.(IDS.district, district || "");
                      changeAttributeValue?.(IDS.ph, ph || "");
                      changeAttributeValue?.(IDS.hc, hc || "");
                      changeAttributeValue?.(IDS.dh, dh || "");
                      changeAttributeValue?.(IDS.ch, ch || "");

                      changeAttributeValue?.(IDS.army, army || "");
                      changeAttributeValue?.(IDS.police, police || "");
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

          {(isCustomDomesticMode || isForeignHFSelection) && (
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

{isForeignHFSelection && (
      <TableRow>
        <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
          <AttributeLabel attribute={IDS.foreignCountry} />
        </TableCell>
        <TableCell>
          <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
            <AttributeField
              attribute={IDS.foreignCountry}
              size="small"
              disabled={!layout?.profileFormEditing}
            />
          </Box>
        </TableCell>
      </TableRow>
    )}

              {isCustomDomesticMode && (
                <TableRow>
                  <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography>{trAddress}</Typography>
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
                      {isCustomDomesticMode &&
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
              )}

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
