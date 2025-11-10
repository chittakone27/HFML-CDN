import { Table, TableBody, TableCell, TableRow, Typography, Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";
import HealthFacilitySelectorNoState from "../common/HealthFacilitySelectorNoState";

const LABEL_COL_WIDTH = 220;
const FIELD_MAX_WIDTH = 400;

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isLao = (i18n.language || "").toLowerCase().startsWith("lo");

  // i18n labels with Lao/EN fallbacks
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

  // New label for the first field (TEA sO0ItF0Dr0p)
  const trFirstField = t("profile.firstField", {
    defaultValue: isLao ? "ລະຫັດສະຖານທີ່" : "Facility ID",
  });

  useChrTrackerStore(); // ensure store subscription

  const { layout, actions, data } = useTrackerCaptureStore(
    useShallow((state) => ({
      layout: state.layout,
      actions: state.actions,
      data: state.data,
    }))
  );

  const { changeAttributeValue, setLayout } = actions || {};
  const { currentTei } = data || {};

  // TEA IDs (this instance only)
  const IDS = {
    // Single text field
    firstField: "sO0ItF0Dr0p",

    // Health facility selector members
    province: "pvY01Pt3GTk",
    district: "GbubCuHuzM7",
    hc: "Jy7ou2LCeju",
    ph: "rsXdExpMW65",
    dh: "WH4Az6TJ5ZA",
    ch: "VF9VIPxkf9z",


  };

  // ========== COMMENT-TO-TOGGLE SETS ==========
  // Disable (read-only) these IDs:
  const MANUAL_DISABLE = new Set([
     IDS.firstField,
     IDS.province,
     IDS.district,
     IDS.hc,
     IDS.ph,
     IDS.dh,
     IDS.ch,

    // Quick toggles for your extra UIDs:
    // IDS.extraA, // s9TfhXLCYgD
    // IDS.extraB, // nZjzEldORWw
    // IDS.extraC, // Z9V1f5YzXXj
  ]);

  // Hide (don’t render) these IDs / rows:
  const MANUAL_HIDE = new Set([
    // IDS.firstField,
    // IDS.province,
    // IDS.district,
    // IDS.hc,
    // IDS.ph,
    // IDS.dh,
    // IDS.ch,

    // Quick toggles for your extra UIDs:
    // IDS.extraA, // s9TfhXLCYgD
    // IDS.extraB, // nZjzEldORWw
    // IDS.extraC, // Z9V1f5YzXXj
  ]);
  // ============================================

  // initial values
  const initVals = {
    firstField: findAttributeValue(currentTei, IDS.firstField) || "",
    province: findAttributeValue(currentTei, IDS.province) || "",
    district: findAttributeValue(currentTei, IDS.district) || "",
    hc: findAttributeValue(currentTei, IDS.hc) || "",
    ph: findAttributeValue(currentTei, IDS.ph) || "",
    dh: findAttributeValue(currentTei, IDS.dh) || "",
    ch: findAttributeValue(currentTei, IDS.ch) || "",
  };

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

  // receive validity from the selector and disable Save while invalid
  const [hfValid, setHfValid] = useState(true);

  useEffect(() => {
    if (!setLayout) return;
    const block = layout?.profileFormEditing && !hfValid;
    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "healthFacilityRequired" : "");
    return () => {
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hfValid, layout?.profileFormEditing, setLayout]);

  // keep value in sync with store
  const firstFieldVal = findAttributeValue(currentTei, IDS.firstField) || "";

  // --- Visibility / disable logic -------------------------------------------
  const rowFirstHidden = MANUAL_HIDE.has(IDS.firstField);
  const rowFirstDisabled = !layout?.profileFormEditing || MANUAL_DISABLE.has(IDS.firstField);

  const hfIds = [IDS.province, IDS.district, IDS.ph, IDS.dh, IDS.ch, IDS.hc];
  const hfRowHidden = hfIds.every((id) => MANUAL_HIDE.has(id));
  // If any underlying ID is disabled, disable the whole selector (component limitation)
  const hfDisabledManual = hfIds.some((id) => MANUAL_DISABLE.has(id));
  const hfDisabled = !layout?.profileFormEditing || hfDisabledManual;
  // ---------------------------------------------------------------------------

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          {/* First field row (TEA sO0ItF0Dr0p) */}
          {!rowFirstHidden && (
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

          {/* Health facility selector */}
          {!hfRowHidden && (
            <TableRow>
              <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
                <Typography>{trSelectNearest}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                  <HealthFacilitySelectorNoState
                    disabled={hfDisabled}
                    ids={IDS}
                    init={initVals}
                    labelsOverride={{
                      level1: <span>{trLevel1}</span>,
                      level2: <span>{trLevel2}</span>,
                      level3: <span>{trLevel3}</span>,
                    }}
                    onValidityChange={setHfValid}
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Profile;
