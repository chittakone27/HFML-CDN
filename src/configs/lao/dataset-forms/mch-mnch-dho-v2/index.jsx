import { Box, Tabs, Tab, styled, Paper, Typography } from "@mui/material";

import "../common/index.css";
import "./mch-mnch-dho-v2.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AncDeliveryPncMortality from "./tabs/AncDeliveryPncMortality";
import FamilyPlaning from "./tabs/FamilyPlaning";
import Nutrition from "./tabs/Nutrition";
import { TabPanel, StyledTab, StyledTabs } from "../common/Tab";

const MchMnchDhoV2 = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      id="mch-mnch-dho-v2-form-container"
      className="custom-form remove-border-left"
      sx={{ minWidth: 800 }}
    >
      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="basic tabs example"
        >
          <StyledTab label={t("ANC_DELIVERY_PNC_MORTALITY")} />
          <StyledTab label={t("Family_Planing")} />
          <StyledTab label={t("EPI_")} />
          <StyledTab label={t("Nutrition_")} />
        </StyledTabs>

        <TabPanel value={tabIndex} index={0}>
          <AncDeliveryPncMortality />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <FamilyPlaning />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography>
            EPI data elements has been moved to EPI Outreach dataset
          </Typography>
          <Typography>
            ຫົວຂໍ້ສັກຢາກັນພະຍາດໄດ້ແຍກອອກເປັນແບບຟອມໜຶ່ງອີກຕ່າງຫາກ ຊື່ວ່າ: EPI -
            ແບບຟອມສັກຢາກັນພະຍາດ
          </Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Nutrition />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default MchMnchDhoV2;
