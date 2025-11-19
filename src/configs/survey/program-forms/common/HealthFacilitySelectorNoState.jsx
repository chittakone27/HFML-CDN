import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import useMetadataStore from "@/state/metadata";
import AttributeLabelNoState from "@/ui/TrackerCapture/Profile/AttributeLabelNoState";

const LABEL_SX = {};
const SELECT_SX = { "& .MuiSelect-select": { textAlign: "left", py: 1 } };
const ROW_GAP = 1;

const G = {
  PHO: "jblbYwuvO33",   // Province
  DHO: "Zh1inFu0Z2O",   // District
  PH:  "GiRpQWVJ24q",   // Provincial Hospital
  DH:  "S8nZUO4pUE8",   // District Hospital (A+B combined)
  HC:  "U53tdte60Ku",   // Health Center
  CH:  "Wg7j9DPk2n5",   // Central Hospital
  //DC:  "OwxKU9KCNMv",   // District Service Center (treat as DH)
};

const getName = (ou, language) => {
  const tx = (ou?.translations || []).find(
    (t) =>
      (t.property === "NAME") &&
      (t.locale || "").toLowerCase().startsWith((language || "en").slice(0, 2).toLowerCase())
  );
  return tx?.value || ou?.displayName || ou?.name || "";
};
const inGroup = (ou, gid) => (ou?.organisationUnitGroups || []).some((g) => g.id === gid);
const mapByParent = (list) => {
  const m = new Map();
  (list || []).forEach((ou) => {
    const pid = ou?.parent?.id || "__root__";
    if (!m.has(pid)) m.set(pid, []);
    m.get(pid).push(ou);
  });
  return m;
};

const HealthFacilitySelectorNoState = ({
  ids,
  init,
  onChange,
  onValidityChange,
  disabled,
  labelsOverride,
}) => {
  const { orgUnits, me } = useMetadataStore(
    useShallow((s) => ({ orgUnits: s.orgUnits, me: s.me }))
  );
  const language = me?.settings?.keyUiLocale || "en";

  const { provinces, districts, phs, chs, hcs, dhs } = useMemo(() => {
    const provinces = [], districts = [], phs = [], chs = [], hcs = [], dhs = [];
    (orgUnits || []).forEach((ou) => {
      if (inGroup(ou, G.PHO)) provinces.push(ou);
      if (inGroup(ou, G.DHO)) districts.push(ou);
      if (inGroup(ou, G.PH))  phs.push(ou);
      if (inGroup(ou, G.CH))  chs.push(ou);
      if (inGroup(ou, G.HC))  hcs.push(ou);
      // Treat DH and DC as DH-type
      if (inGroup(ou, G.DH) || inGroup(ou, G.DC)) dhs.push(ou);
    });
    return { provinces, districts, phs, chs, hcs, dhs };
  }, [orgUnits]);

  const dhoByProv = useMemo(() => mapByParent(districts), [districts]);
  const phByProv  = useMemo(() => mapByParent(phs),       [phs]);
  const chByProv  = useMemo(() => mapByParent(chs),       [chs]);
  const hcByDist  = useMemo(() => mapByParent(hcs),       [hcs]);
  const dhByDist  = useMemo(() => mapByParent(dhs),       [dhs]);

  const [provId, setProvId] = useState(init?.province || "");
  const [l2, setL2] = useState(() => {
    if (init?.ph)       return { type: "PH",  id: init.ph };
    if (init?.ch)       return { type: "CH",  id: init.ch };
    if (init?.district) return { type: "DHO", id: init.district };
    return { type: "", id: "" };
  });
  const [l3, setL3] = useState(() => {
    if (init?.hc) return { type: "HC", id: init.hc };
    if (init?.dh) return { type: "DH", id: init.dh };
    return { type: "", id: "" };
  });

  useEffect(() => {
    setProvId(init?.province || "");
    if (init?.ph) setL2({ type: "PH", id: init.ph });
    else if (init?.ch) setL2({ type: "CH", id: init.ch });
    else if (init?.district) setL2({ type: "DHO", id: init.district });
    else setL2({ type: "", id: "" });

    if (init?.hc) setL3({ type: "HC", id: init.hc });
    else if (init?.dh) setL3({ type: "DH", id: init.dh });
    else setL3({ type: "", id: "" });
  }, [init?.province, init?.district, init?.ph, init?.ch, init?.hc, init?.dh]);

  const provOptions = useMemo(
    () =>
      (provinces || [])
        .map((p) => ({ id: p.id, label: getName(p, language) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [provinces, language]
  );

  const l2Options = useMemo(() => {
    if (!provId) return [];
    const opts = [];
    (chByProv.get(provId) || []).forEach((ou) =>
      opts.push({ id: ou.id, type: "CH", label: getName(ou, language) })
    );
    (phByProv.get(provId) || []).forEach((ou) =>
      opts.push({ id: ou.id, type: "PH", label: getName(ou, language) })
    );
    (dhoByProv.get(provId) || []).forEach((ou) =>
      opts.push({ id: ou.id, type: "DHO", label: getName(ou, language) })
    );
    return opts.sort((a, b) => a.label.localeCompare(b.label));
  }, [provId, chByProv, phByProv, dhoByProv, language]);

  const l3Options = useMemo(() => {
    if (l2.type !== "DHO" || !l2.id) return [];
    const opts = [];
    (hcByDist.get(l2.id) || []).forEach((ou) =>
      opts.push({ id: ou.id, type: "HC", label: getName(ou, language) })
    );
    (dhByDist.get(l2.id) || []).forEach((ou) =>
      opts.push({ id: ou.id, type: "DH", label: getName(ou, language) })
    );
    return opts.sort((a, b) => a.label.localeCompare(b.label));
  }, [l2, hcByDist, dhByDist, language]);

  const emit = (nextProv, nextL2, nextL3) => {
    const province = nextProv || "";
    let district = "", ph = "", ch = "", hc = "", dh = "";
    if (nextL2.type === "PH") ph = nextL2.id;
    else if (nextL2.type === "CH") ch = nextL2.id;
    else if (nextL2.type === "DHO") {
      district = nextL2.id;
      if (nextL3.type === "HC") hc = nextL3.id;
      else if (nextL3.type === "DH") dh = nextL3.id;
    }
    onChange?.({ province, district, ph, ch, hc, dh });
  };

  const requireL2 = !!provId;          
  const requireL3 = l2.type === "DHO"; 
  const l2Error   = requireL2 && !l2.id;
  const l3Error   = requireL3 && !l3.id;

  const isValid =
    (!provId && !l2.id && !l3.id) ||
    (!!provId && !!l2.id && (!requireL3 || !!l3.id));

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const ClearBtn = ({ onClick, disabled }) => (
    <InputAdornment position="end" sx={{ mr: 2 }}>
      <IconButton
        size="small"
        onClick={onClick}
        disabled={disabled}
        edge="end"
        sx={{ p: 0.5 }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  );

  const onProvChange = (e) => {
    const id = e.target.value || "";
    const nextL2 = { type: "", id: "" };
    const nextL3 = { type: "", id: "" };
    setProvId(id); setL2(nextL2); setL3(nextL3);
    emit(id, nextL2, nextL3);
  };

  const onL2Change = (e) => {
    const id = e.target.value || "";
    const picked = l2Options.find((o) => o.id === id) || { type: "", id: "" };
    const nextL3 = picked.type === "DHO" && l2.type === "DHO" && l2.id === picked.id ? l3 : { type: "", id: "" };
    setL2({ type: picked.type, id: picked.id }); setL3(nextL3);
    emit(provId, { type: picked.type, id: picked.id }, nextL3);
  };

  const onL3Change = (e) => {
    const id = e.target.value || "";
    const picked = l3Options.find((o) => o.id === id) || { type: "", id: "" };
    const nextL3 = { type: picked.type, id: picked.id };
    setL3(nextL3); emit(provId, l2, nextL3);
  };

  const l1Label = labelsOverride?.level1 ?? <AttributeLabelNoState attribute={ids.province} />;
  const l2Label = labelsOverride?.level2 ?? "CH / PH / DHO";
  const l3Label = labelsOverride?.level3 ?? "DH / HC";

  return (
    <Box sx={{ display: "grid", rowGap: ROW_GAP }}>
      {/* Province */}
      <FormControl fullWidth size="small" disabled={!!disabled}>
        <FormLabel sx={LABEL_SX}>{l1Label}</FormLabel>
        <Select
          value={provId}
          onChange={onProvChange}
          displayEmpty
          input={
            <OutlinedInput
              size="small"
              endAdornment={
                provId ? <ClearBtn onClick={() => onProvChange({ target: { value: "" } })} disabled={!!disabled} /> : null
              }
            />
          }
          sx={SELECT_SX}
        >
          {provOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>{o.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        disabled={!!disabled || !provId}
        required={requireL2}
        error={l2Error}
      >
        <FormLabel sx={LABEL_SX}>{l2Label}</FormLabel>
        <Select
          value={l2.id}
          onChange={onL2Change}
          displayEmpty
          input={
            <OutlinedInput
              size="small"
              endAdornment={
                l2.id ? <ClearBtn onClick={() => onL2Change({ target: { value: "" } })} disabled={!!disabled || !provId} /> : null
              }
            />
          }
          sx={SELECT_SX}
        >
          {l2Options.map((o) => (
            <MenuItem key={`${o.type}-${o.id}`} value={o.id}>{o.label}</MenuItem>
          ))}
        </Select>

      </FormControl>

      {l2.type === "DHO" && (
        <FormControl
          fullWidth
          size="small"
          disabled={!!disabled || !l2.id}
          required={requireL3}
          error={l3Error}
        >
          <FormLabel sx={LABEL_SX}>{l3Label}</FormLabel>
          <Select
            value={l3.id}
            onChange={onL3Change}
            displayEmpty
            input={
              <OutlinedInput
                size="small"
                endAdornment={
                  l3.id ? <ClearBtn onClick={() => onL3Change({ target: { value: "" } })} disabled={!!disabled || !l2.id} /> : null
                }
              />
            }
            sx={SELECT_SX}
          >
            {l3Options.map((o) => (
              <MenuItem key={`${o.type}-${o.id}`} value={o.id}>{o.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default HealthFacilitySelectorNoState;