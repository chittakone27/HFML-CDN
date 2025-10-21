import { Table, TableBody, TableCell, TableRow, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import useTrackerCaptureStore from "@/state/trackerCapture";
import useChrTrackerStore from "@/configs/laotracker/layout/ChrTrackerLayout/state";
import { findAttributeValue } from "@/configs/laotracker/common/utils.js";
import HealthFacilitySelectorNoState from "@/configs/laotracker/common/VillageSelector/HealthFacilitySelectorNoState.jsx";

const LABEL_COL_WIDTH = 220;
const FIELD_MAX_WIDTH = 400;

const Profile = () => {
  const { t } = useTranslation();

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
    province: "pvY01Pt3GTk",
    district: "GbubCuHuzM7",
    hc:       "Jy7ou2LCeju",
    ph:       "rsXdExpMW65",
    dh:       "WH4Az6TJ5ZA",
    ch:       "VF9VIPxkf9z",
  };

  // initial values
  const initVals = {
    province: findAttributeValue(currentTei, IDS.province) || "",
    district: findAttributeValue(currentTei, IDS.district) || "",
    hc:       findAttributeValue(currentTei, IDS.hc)       || "",
    ph:       findAttributeValue(currentTei, IDS.ph)       || "",
    dh:       findAttributeValue(currentTei, IDS.dh)       || "",
    ch:       findAttributeValue(currentTei, IDS.ch)       || "",
  };

  const setAttr = (id, val) => changeAttributeValue?.(id, val ?? "");

  // receive validity from the selector and disable Save while invalid
  const [hfValid, setHfValid] = useState(true);
  useEffect(() => {
    if (!setLayout) return;
    // Only block save while the profile form is in edit mode
    const block = layout?.profileFormEditing && !hfValid;
    setLayout("saveDisabled", block);
    setLayout("saveDisabledReason", block ? "healthFacilityRequired" : "");
    return () => {
      // on unmount, clear the block
      setLayout("saveDisabled", false);
      setLayout("saveDisabledReason", "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hfValid, layout?.profileFormEditing, setLayout]);

  return (
    <div className="community-death-profile" id="profile-form">
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: LABEL_COL_WIDTH, pr: 1 }}>
              <Typography>
                {t("Select the Nearest Health Facility")}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ maxWidth: FIELD_MAX_WIDTH }}>
                <HealthFacilitySelectorNoState
                  disabled={!layout?.profileFormEditing}
                  ids={IDS}
                  init={initVals}
                  labelsOverride={{
                    level1: <span>Province</span>,
                    level2: <span>Central Hospital / Provincial Hospital / DHO</span>,
                    level3: <span>District Hospital / Health Center</span>,
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
