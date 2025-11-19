import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import useMetadataStore from "@/state/metadata";
import useTrackerCaptureStore from "@/state/trackerCapture";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";

// OU group IDs for address
const G = {
  PROVINCE: "jblbYwuvO33", // Province (PHO)
  DISTRICT: "Zh1inFu0Z2O", // District (DHO)
  VILLAGE: "ZVH1xlLGfxn",  // Village
};

const ROW_GAP = 1;
const LABEL_SX = {};
const SELECT_SX = { "& .MuiSelect-select": { textAlign: "left", py: 1 } };

const inGroup = (ou, gid) =>
  (ou?.organisationUnitGroups || []).some((g) => g.id === gid);

const getName = (ou, language = "en") => {
  const tx = (ou?.translations || []).find(
    (t) =>
      t.property === "NAME" &&
      (t.locale || "")
        .toLowerCase()
        .startsWith((language || "en").slice(0, 2).toLowerCase())
  );
  return tx?.value || ou?.displayName || ou?.name || "";
};

const VillageSelectorOrgUnit = ({ VillageSelectorIds, saveGeo, disabled }) => {
  const { orgUnits, me } = useMetadataStore(
    useShallow((s) => ({ orgUnits: s.orgUnits, me: s.me }))
  );
  const language = me?.settings?.keyUiLocale || "en";

  const { data, actions } = useTrackerCaptureStore(
    useShallow((s) => ({ data: s.data, actions: s.actions }))
  );
  const { currentTei } = data || {};
  const { changeAttributeValue, changeEnrollmentProperty } = actions || {};

  const [provAttr, distAttr, villAttr] = VillageSelectorIds || [];

  // classify OUs + build map by id
  const { provinces, districts, villages, ouById } = useMemo(() => {
    const provinces = [];
    const districts = [];
    const villages = [];
    const byId = new Map();

    (orgUnits || []).forEach((ou) => {
      if (inGroup(ou, G.PROVINCE)) provinces.push(ou);
      if (inGroup(ou, G.DISTRICT)) districts.push(ou);
      if (inGroup(ou, G.VILLAGE)) villages.push(ou);
      if (ou?.id) byId.set(ou.id, ou);
    });

    return { provinces, districts, villages, ouById: byId };
  }, [orgUnits]);

  // Districts by province (direct parent)
  const districtByProv = useMemo(() => {
    const m = new Map();
    (districts || []).forEach((d) => {
      const pid = d?.parent?.id;
      if (!pid) return;
      if (!m.has(pid)) m.set(pid, []);
      m.get(pid).push(d);
    });
    return m;
  }, [districts]);

  // Villages by district:
  // village -> parent (HC/DH) -> parent (District)
  const villageByDistrict = useMemo(() => {
    const m = new Map();
    (villages || []).forEach((v) => {
      const hfId = v?.parent?.id;
      if (!hfId) return;
      const hf = ouById.get(hfId);
      const districtId = hf?.parent?.id;
      if (!districtId) return;
      if (!m.has(districtId)) m.set(districtId, []);
      m.get(districtId).push(v);
    });
    return m;
  }, [villages, ouById]);

  // local state from TEI
  const [provId, setProvId] = useState("");
  const [distId, setDistId] = useState("");
  const [villId, setVillId] = useState("");

  useEffect(() => {
    if (!currentTei) return;
    const attrs = currentTei.attributes || [];
    const findVal = (id) =>
      attrs.find((a) => a.attribute === id)?.value || "";

    setProvId(provAttr ? findVal(provAttr) : "");
    setDistId(distAttr ? findVal(distAttr) : "");
    setVillId(villAttr ? findVal(villAttr) : "");
  }, [currentTei, provAttr, distAttr, villAttr]);

  // options
  const provOptions = useMemo(
    () =>
      (provinces || [])
        .map((p) => ({ id: p.id, label: getName(p, language) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [provinces, language]
  );

  const distOptions = useMemo(() => {
    if (!provId) return [];
    const list = districtByProv.get(provId) || [];
    return list
      .map((d) => ({ id: d.id, label: getName(d, language) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [provId, districtByProv, language]);

  const villageOptions = useMemo(() => {
    if (!distId) return [];
    const list = villageByDistrict.get(distId) || [];
    return list
      .map((v) => ({ id: v.id, label: getName(v, language) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [distId, villageByDistrict, language]);

  // helper: update TEI attributes + enrollment geometry
  const updateAttrsAndGeo = (nextProv, nextDist, nextVill) => {
    if (changeAttributeValue) {
      if (provAttr) changeAttributeValue(provAttr, nextProv || "");
      if (distAttr) changeAttributeValue(distAttr, nextDist || "");
      if (villAttr) changeAttributeValue(villAttr, nextVill || "");
    }

    if (!saveGeo) return;

    const selectedVillage = villages.find((v) => v.id === nextVill);
    if (!selectedVillage) {
      changeEnrollmentProperty?.("geometry", null);
      return;
    }

    let latitude = null;
    let longitude = null;

    if (
      selectedVillage.geometry &&
      selectedVillage.geometry.type === "Point" &&
      Array.isArray(selectedVillage.geometry.coordinates) &&
      selectedVillage.geometry.coordinates.length >= 2
    ) {
      longitude = selectedVillage.geometry.coordinates[0];
      latitude = selectedVillage.geometry.coordinates[1];
    } else if (
      typeof selectedVillage.latitude !== "undefined" &&
      typeof selectedVillage.longitude !== "undefined"
    ) {
      latitude = selectedVillage.latitude;
      longitude = selectedVillage.longitude;
    }

    if (
      latitude === null ||
      longitude === null ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      changeEnrollmentProperty?.("geometry", null);
      return;
    }

    const geo = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    changeEnrollmentProperty?.("geometry", geo);
  };

  // Clear button
  const ClearBtn = ({ onClick, isDisabled }) => (
    <InputAdornment position="end" sx={{ mr: 1 }}>
      <IconButton
        size="small"
        onClick={onClick}
        disabled={isDisabled}
        edge="end"
        sx={{ p: 0.5 }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  );

  // handlers
  const handleProvChange = (e) => {
    const nextProv = e.target.value || "";
    const nextDist = "";
    const nextVill = "";
    setProvId(nextProv);
    setDistId(nextDist);
    setVillId(nextVill);
    updateAttrsAndGeo(nextProv, nextDist, nextVill);
  };

  const handleDistChange = (e) => {
    const nextDist = e.target.value || "";
    const nextVill = "";
    setDistId(nextDist);
    setVillId(nextVill);
    updateAttrsAndGeo(provId, nextDist, nextVill);
  };

  const handleVillChange = (e) => {
    const nextVill = e.target.value || "";
    setVillId(nextVill);
    updateAttrsAndGeo(provId, distId, nextVill);
  };

  // (optional) required flags / errors
  const provError = false;
  const distError = false;
  const villError = false;

  return (
    <Box sx={{ display: "grid", rowGap: ROW_GAP }}>
      {/* Province */}
      <FormControl
        fullWidth
        size="small"
        disabled={!!disabled}
        error={provError}
      >
        <FormLabel sx={LABEL_SX}>
          <AttributeLabelNoState attribute={provAttr} />
        </FormLabel>
        <Select
          value={provId}
          onChange={handleProvChange}
          displayEmpty
          input={
            <OutlinedInput
              size="small"
              endAdornment={
                provId ? (
                  <ClearBtn
                    onClick={() =>
                      handleProvChange({ target: { value: "" } })
                    }
                    isDisabled={!!disabled}
                  />
                ) : null
              }
            />
          }
          sx={SELECT_SX}
        >
          {provOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
        {provError && <FormHelperText>Required</FormHelperText>}
      </FormControl>

      {/* District */}
      <FormControl
        fullWidth
        size="small"
        disabled={!!disabled || !provId}
        error={distError}
      >
        <FormLabel sx={LABEL_SX}>
          <AttributeLabelNoState attribute={distAttr} />
        </FormLabel>
        <Select
          value={distId}
          onChange={handleDistChange}
          displayEmpty
          input={
            <OutlinedInput
              size="small"
              endAdornment={
                distId ? (
                  <ClearBtn
                    onClick={() =>
                      handleDistChange({ target: { value: "" } })
                    }
                    isDisabled={!!disabled || !provId}
                  />
                ) : null
              }
            />
          }
          sx={SELECT_SX}
        >
          {distOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
        {distError && <FormHelperText>Required</FormHelperText>}
      </FormControl>

      {/* Village */}
      <FormControl
        fullWidth
        size="small"
        disabled={!!disabled || !distId}
        error={villError}
      >
        <FormLabel sx={LABEL_SX}>
          <AttributeLabelNoState attribute={villAttr} />
        </FormLabel>
        <Select
          value={villId}
          onChange={handleVillChange}
          displayEmpty
          input={
            <OutlinedInput
              size="small"
              endAdornment={
                villId ? (
                  <ClearBtn
                    onClick={() =>
                      handleVillChange({ target: { value: "" } })
                    }
                    isDisabled={!!disabled || !distId}
                  />
                ) : null
              }
            />
          }
          sx={SELECT_SX}
        >
          {villageOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
        {villError && <FormHelperText>Required</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default VillageSelectorOrgUnit;
