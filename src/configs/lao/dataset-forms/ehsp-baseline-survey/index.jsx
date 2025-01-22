import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  Tabs,
  Tab,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TabContext, TabList } from "@mui/lab";
import Tab1 from "./Tabs/Tab1";
import Tab2 from "./Tabs/Tab2";
import Tab3 from "./Tabs/Tab3";
import Tab4 from "./Tabs/Tab4";
import Tab5 from "./Tabs/Tab5";
import Tab6 from "./Tabs/Tab6";

const ehspBaselineSurvey = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const tabName = [
    t("1. HRH"),
    t("2. Essential Medicine"),
    t("3. Trained Human Resources"),
    t("4. Essential Equipment"),
    t("5. Hospital Management Observation"),
    t("6. Hospital Management Interview"),
  ];

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="ehsp-baseline-survey-form-container" className="custom-form">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabName.map((name, index) => {
              return <Tab label={name} value={index} />;
            })}
          </TabList>
        </TabContext>
      </Box>

      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 0 ? undefined : "none" }}
      >
        <Tab1 />
      </Box>
      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 1 ? undefined : "none" }}
      >
        <Tab2 />
      </Box>
      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 2 ? undefined : "none" }}
      >
        <Tab3 />
      </Box>
      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 3 ? undefined : "none" }}
      >
        <Tab4 />
      </Box>
      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 4 ? undefined : "none" }}
      >
        <Tab5 />
      </Box>
      <Box
        className="ehsp-baseline-survey-tab"
        style={{ display: value === 5 ? undefined : "none" }}
      >
        <Tab6 />
      </Box>
    </Box>
  );
};
export default ehspBaselineSurvey;
