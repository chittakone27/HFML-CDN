import useSelectionStore from "@/state/selection";
import AttributeField from "@/ui/TrackerCapture/Profile/AttributeField";
import AttributeLabel from "@/ui/TrackerCapture/Profile/AttributeLabel";
import { Box } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { useEffect, useMemo, useState } from "react";
import useProfileRules from "./useProfileRules";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";
import HealthFacilitySelectorNoState from "../common/HealthFacilitySelectorNoState";

const FIELD_MAX_WIDTH = 480;

const IDS = {
  orgUnitId: "NSkJrZeR8LL",   
  orgUnitName: "RLamCNXOwQ5", 

  province: "waE5GXY7Bo5",
  district: "XVt1Ar6BRcv",
  hc: "VklGYpp1m5K",
  ph: "nBxJDYEPkhc",
  dh: "vHh9uvGwT3U",
  ch: "gTy71R4wgJQ",
};

const MANUAL_DISABLE = new Set([IDS.orgUnitId, IDS.orgUnitName]);

const CUSTOM_HANDLED = new Set([
  IDS.province,
  IDS.district,
  IDS.hc,
  IDS.ph,
  IDS.dh,
  IDS.ch,
]);

const DHIS_UID_RE = /^[A-Za-z][A-Za-z0-9]{10}$/;

const getApiBaseUrl = () => {
  if (typeof window !== "undefined" && window.DHIS_CONFIG?.baseUrl) {
    return window.DHIS_CONFIG.baseUrl.replace(/\/$/, "");
  }
  const envBase = import.meta.env.VITE_BASE_URL;
  if (envBase) return String(envBase).replace(/\/$/, "");
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

const Profile = () => {
  const { program } = useSelectionStore(
    useShallow((state) => ({ program: state.program }))
  );

  const { actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      actions: state.actions,
      data: state.data,
    }))
  );

  const { currentTei } = data || {};
  const changeAttributeValue = actions?.changeAttributeValue;

  const props = useProfileRules() || {};

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

  useEffect(() => {
    if (!props.hiddenFields || !changeAttributeValue) return;
    Object.entries(props.hiddenFields).forEach(([attr, isHidden]) => {
      if (isHidden) changeAttributeValue(attr, "");
    });
  }, [changeAttributeValue, props.hiddenFields]);

  useEffect(() => {
    if (!props.assignations || !changeAttributeValue) return;
    Object.entries(props.assignations).forEach(([attr, value]) => {
      changeAttributeValue(attr, value);
    });
  }, [changeAttributeValue, props.assignations]);

  const attributes = useMemo(
    () =>
      (program?.programTrackedEntityAttributes ?? []).map(
        (ptea) => ptea.trackedEntityAttribute.id
      ),
    [program?.programTrackedEntityAttributes]
  );

  const [hfOuCache, setHfOuCache] = useState({});

  const hfIds = {
    hc: findAttributeValue(currentTei, IDS.hc) || "",
    dh: findAttributeValue(currentTei, IDS.dh) || "",
    ph: findAttributeValue(currentTei, IDS.ph) || "",
    ch: findAttributeValue(currentTei, IDS.ch) || "",
  };

  const orgUnitIdVal = findAttributeValue(currentTei, IDS.orgUnitId) || "";
  const orgUnitNameVal =
    findAttributeValue(currentTei, IDS.orgUnitName) || "";

  useEffect(() => {
    if (!currentTei || !changeAttributeValue) return;

    const ordered = [hfIds.hc, hfIds.dh, hfIds.ph, hfIds.ch]
      .map((v) => String(v || "").trim())
      .filter(Boolean);

    const uid = ordered.find((v) => DHIS_UID_RE.test(v));

    if (!uid) {
      if (orgUnitIdVal || orgUnitNameVal) {
        setAttr(IDS.orgUnitId, "");
        setAttr(IDS.orgUnitName, "");
      }
      return;
    }

    const cached = hfOuCache[uid];
    if (cached) {
      const { code = "", name = "" } = cached;
      if (code && code !== orgUnitIdVal) setAttr(IDS.orgUnitId, code);
      if (name && name !== orgUnitNameVal) setAttr(IDS.orgUnitName, name);
      return;
    }

    let cancelled = false;

    const fetchOu = async () => {
      try {
        const url = buildApiUrl(
          `/api/organisationUnits/${uid}.json?fields=id,code,displayName,name`
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
        const code = json.code || "";
        const name = json.displayName || json.name || "";

        if (cancelled) return;

        setHfOuCache((prev) => ({
          ...prev,
          [uid]: { code, name },
        }));

        if (code && code !== orgUnitIdVal) setAttr(IDS.orgUnitId, code);
        if (name && name !== orgUnitNameVal) setAttr(IDS.orgUnitName, name);
      } catch {
      }
    };

    fetchOu();
    return () => {
      cancelled = true;
    };
  }, [
    hfIds.hc,
    hfIds.dh,
    hfIds.ph,
    hfIds.ch,
    currentTei,
    orgUnitIdVal,
    orgUnitNameVal,
    changeAttributeValue,
    IDS.orgUnitId,
    IDS.orgUnitName,
    hfOuCache,
  ]);

  return (
    <>

      {attributes.map((attribute) => {

        if (CUSTOM_HANDLED.has(attribute)) return null;

        const hidden = props?.hiddenFields?.[attribute];
        if (hidden) return null;

        const ruleDisabled = !!props?.disabledFields?.[attribute];
        const manualDisabled = MANUAL_DISABLE.has(attribute);
        const disabled = ruleDisabled || manualDisabled;

        return (
          <Box key={attribute} className="custom-tracker-profile-field-row">
            <AttributeLabel attribute={attribute} />
            <AttributeField
              attribute={attribute}
              disabledManualFields
              disabled={disabled}
            />
          </Box>
        );
      })}

      <Box
        className="custom-tracker-profile-field-row"
        sx={{ mt: 1.5 }}
      >
        <Box>
          Health facility
        </Box>
        <Box sx={{ maxWidth: FIELD_MAX_WIDTH, width: "100%" }}>
          <HealthFacilitySelectorNoState
            ids={IDS}
            init={{
              province: findAttributeValue(currentTei, IDS.province) || "",
              district: findAttributeValue(currentTei, IDS.district) || "",
              hc: findAttributeValue(currentTei, IDS.hc) || "",
              ph: findAttributeValue(currentTei, IDS.ph) || "",
              dh: findAttributeValue(currentTei, IDS.dh) || "",
              ch: findAttributeValue(currentTei, IDS.ch) || "",
            }}
            onChange={({ province, district, ph, ch, hc, dh }) => {
              setAttr(IDS.province, province || "");
              setAttr(IDS.district, district || "");
              setAttr(IDS.ph, ph || "");
              setAttr(IDS.hc, hc || "");
              setAttr(IDS.dh, dh || "");
              setAttr(IDS.ch, ch || "");
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Profile;
