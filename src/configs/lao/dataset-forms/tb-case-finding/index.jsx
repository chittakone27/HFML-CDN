import { Box, Paper } from "@mui/material";

import "../common/index.css";
import "./tb-case-finding.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LabDiagnosis from "./tabs/LabDiagnosis";
import GeneXpertTesting from "./tabs/GeneXpertTesting";
import TBRegisteredCases from "./tabs/TBRegisteredCases";
import AgeAndSex from "./tabs/AgeAndSex";
import TbHivCases from "./tabs/TbHivCases";
import TBPatientTreatment from "./tabs/TBPatientTreatment";
import CasesRegisteredByFacility from "./tabs/CasesRegisteredByFacility";
import { TabPanel, StyledTab, StyledTabs } from "../common/Tab";

const TbCaseFinding = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      id="tb-case-finding-form-container"
      className="custom-form remove-border-left"
      key="tb-case-finding"
    >
      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="basic tabs example"
          key="tb-case-finding"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <StyledTab label={<span>{t("Lab_diagnosis")}</span>} />
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
          <TBPatientTreatment />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default TbCaseFinding;
