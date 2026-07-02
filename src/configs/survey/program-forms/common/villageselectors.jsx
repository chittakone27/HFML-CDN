import { useMemo, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";

const GROUPS = {
  PHO: "jblbYwuvO33",
  DHO: "Zh1inFu0Z2O",
  HC: "U53tdte60Ku",
  DH: "S8nZUO4pUE8",
  DHOFFICE: "CFBVgrq0dgS",
  DHOVILLAGE:"eHQXg22Kk0z",
  VILLAGE: "VBzDcGflr6J",
};

const getName = (ou, language) => {
  const tx = (ou?.translations || []).find(
    (t) =>
      t.property === "NAME" &&
      (t.locale || "")
        .toLowerCase()
        .startsWith((language || "en").slice(0, 2).toLowerCase())
  );
  return tx?.value || ou?.displayName || ou?.name || "";
};

const inGroup = (ou, gid) =>
  (ou?.organisationUnitGroups || []).some((g) => g.id === gid);

const VillageSelectorNoState = ({ init = {}, onChange, disabled = false }) => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  const { orgUnits, me } = useMetadataStore(
    useShallow((s) => ({ orgUnits: s.orgUnits, me: s.me }))
  );

  const language = me?.settings?.keyUiLocale || "en";

  // Split org units by group
  const { provinces, districts, villages } = useMemo(() => {
    const provinces = [];
    const districts = [];
    const villages = [];
    (orgUnits || []).forEach((ou) => {
      if (inGroup(ou, GROUPS.PHO)) provinces.push(ou);
      if (inGroup(ou, GROUPS.DHO)) districts.push(ou);
      if (inGroup(ou, GROUPS.VILLAGE)) villages.push(ou);
    });
    return { provinces, districts, villages };
  }, [orgUnits]);
  const [provinceId, setProvinceId] = useState(init.province || "");
  const [districtId, setDistrictId] = useState(init.district || "");
  const [villageId, setVillageId] = useState(init.village || "");

  useEffect(() => {
    setProvinceId(init?.province || "");
    setDistrictId(init?.district || "");
    setVillageId(init?.village || "");
  }, [init?.province, init?.district, init?.village]);

  const provinceOptions = useMemo(
    () =>
      provinces
        .map((p) => ({ id: p.id, label: getName(p, language) }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [provinces, language]
  );

  const districtOptions = useMemo(() => {
    if (!provinceId) return [];
    return districts
      .filter((d) => d?.parent?.id === provinceId)
      .map((d) => ({ id: d.id, label: getName(d, language) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [provinceId, districts, language]);

  const parentToDistrictMap = useMemo(() => {
    const map = {};
    (orgUnits || []).forEach((ou) => {
      if (
        (inGroup(ou, GROUPS.HC) ||
          inGroup(ou, GROUPS.DH) ||
          inGroup(ou, GROUPS.DHOFFICE)||
          inGroup(ou, GROUPS.DHOVILLAGE)
        ) &&
        ou.parent
      ) {
        map[ou.id] = ou.parent.id;
      }
    });
    return map;
  }, [orgUnits]);

  const villageOptions = useMemo(() => {
    if (!districtId) return [];
    return villages
      .filter((v) => {
        const parentId = v.parent?.id;
        if (!parentId) return false;
        return parentToDistrictMap[parentId] === districtId;
      })
      .map((v) => ({ id: v.id, label: getName(v, language) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [districtId, villages, parentToDistrictMap, language]);

  const emit = (p, d, v) => {
    onChange?.({ province: p || "", district: d || "", village: v || "" });
  };

  const onProvinceChange = (e) => {
    const id = e.target.value || "";
    setProvinceId(id);
    setDistrictId("");
    setVillageId("");
    emit(id, "", "");
  };

  const onDistrictChange = (e) => {
    const id = e.target.value || "";
    setDistrictId(id);
    setVillageId("");
    emit(provinceId, id, "");
  };

  const onVillageChange = (e) => {
    const id = e.target.value || "";
    setVillageId(id);
    emit(provinceId, districtId, id);
  };

  return (
    <Box
      sx={{
        display: "grid",
        rowGap: 1,
        width: "100%",
        borderLeft: "1px solid",
        borderColor: "divider",
        pl: 2,
      }}
    >
      {/* Province */}
      <FormControl fullWidth size="small">
        <FormLabel>
          {t("location.province", {
            defaultValue: isLao ? "ແຂວງ" : "Province",
          })}
        </FormLabel>
        <Select
          value={provinceId}
          onChange={onProvinceChange}
          input={<OutlinedInput sx={{ textAlign: "left" }} />}
          disabled={disabled} // <-- Apply disabled here
        >
          {provinceOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* District */}
      <FormControl fullWidth size="small">
        <FormLabel>
          {t("location.district", {
            defaultValue: isLao ? "ເມືອງ" : "District",
          })}
        </FormLabel>
        <Select
          value={districtId}
          onChange={onDistrictChange}
          input={<OutlinedInput sx={{ textAlign: "left" }} />}
          disabled={disabled} // <-- Apply disabled here
        >
          {districtOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Village */}
      <FormControl fullWidth size="small">
        <FormLabel>
          {t("location.village", {
            defaultValue: isLao ? "ບ້ານ" : "Village",
          })}
        </FormLabel>
        <Select
          value={villageId}
          onChange={onVillageChange}
          input={<OutlinedInput sx={{ textAlign: "left" }} />}
          disabled={disabled} // <-- Apply disabled here
        >
          {villageOptions.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VillageSelectorNoState;