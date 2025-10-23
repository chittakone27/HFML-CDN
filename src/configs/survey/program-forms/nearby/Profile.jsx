import { Table, TableBody, TableCell, TableRow, Typography, Box } from "@mui/material";
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

  const trSelectNearest = t("profile.hf.selectNearest", {
    defaultValue: isLao
      ? "ເລືອກສະຖານທີ່ບໍລິການໃກ້ຄຽງ"
      : "Select the Nearest Health Facility",
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
    defaultValue: isLao ? "ໂຮງໝໍເມືອງປະເພດ / ໂຮງໝໍນ້ອຍ" : "District Hospital / Health Center",
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

  const IDS = {
    province: "pvY01Pt3GTk",
    district: "GbubCuHuzM7",
    hc: "Jy7ou2LCeju",
    ph: "rsXdExpMW65",
    dh: "WH4Az6TJ5ZA",
    ch: "VF9VIPxkf9z",
  };

  const initVals = {
    province: findAttributeValue(currentTei, IDS.province) || "",
    district: findAttributeValue(currentTei, IDS.district) || "",
    hc: findAttributeValue(currentTei, IDS.hc) || "",
    ph: findAttributeValue(currentTei, IDS.ph) || "",
    dh: findAttributeValue(currentTei, IDS.dh) || "",
    ch: findAttributeValue(currentTei, IDS.ch) || "",
  };

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

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

  }, [hfValid, layout?.profileFormEditing, setLayout]);

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <Typography>{trSelectNearest}</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                <HealthFacilitySelectorNoState
                  disabled={!layout?.profileFormEditing}
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
        </TableBody>
      </Table>
    </div>
  );
};

export default Profile;
