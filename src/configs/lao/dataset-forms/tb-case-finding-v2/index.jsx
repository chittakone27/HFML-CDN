import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "../common/index.css";
import "./tb-case-finding-v2.css";
import { StyledTab, StyledTabs, TabPanel } from "../common/Tab";
import AgeAndSex from "./tabs/AgeAndSex";
import CasesRegisteredByFacility from "./tabs/CasesRegisteredByFacility";
import GeneXpertTesting from "./tabs/GeneXpertTesting";
import LabDiagnosis from "./tabs/LabDiagnosis";
import TbHiv01 from "./tabs/TbHiv01";
import TbHivCases from "./tabs/TbHivCases";
import TBPatientTreatment from "./tabs/TBPatientTreatment";
import TBRegisteredCases from "./tabs/TBRegisteredCases";

const TbCaseFindingV2 = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      id="tb-case-finding-v2-form-container"
      className="custom-form remove-border-left"
      key="tb-case-finding-v2"
    >
      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="basic tabs example"
          variant="scrollable"
          key="tb-case-finding-v2"
        >
          <StyledTab label={t("Lab_diagnosis")} />
          <StyledTab
            label={
              <span
                dangerouslySetInnerHTML={{ __html: t("GeneXpert_Testing1") }}
              />
            }
          />
          <StyledTab
            label={
              <span
                dangerouslySetInnerHTML={{ __html: t("TB_Registered_Cases") }}
              />
            }
          />
          <StyledTab label={t("Age_and_Sex_disaggregation")} />
          <StyledTab label={t("Cases_registered_by_facility")} />
          <StyledTab label={t("TB_HIV_cases1")} />
          <StyledTab label={t("tb_hiv_01")} />
          <StyledTab label={t("TB_patient_treatment")} />
        </StyledTabs>

        <TabPanel value={tabIndex} index={0}>
          <LabDiagnosis />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <GeneXpertTesting />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <TBRegisteredCases />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <AgeAndSex />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <CasesRegisteredByFacility />
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <TbHivCases />
        </TabPanel>
        <TabPanel value={tabIndex} index={6}>
          <TbHiv01 />
        </TabPanel>
        <TabPanel value={tabIndex} index={7}>
          <TBPatientTreatment />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default TbCaseFindingV2;
