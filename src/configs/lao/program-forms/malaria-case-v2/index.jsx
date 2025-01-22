import { Box, TableCell } from "@mui/material";
import CustomSection from "./components/CustomSection";

import "../common/index.css";
import "./malaria-case-v2.css";
import VillageSelector from "../../common/VillageSelector/VillageSelector";
import useEventCaptureStore from "@/state/eventCapture";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import useSelectionStore from "@/state/selection";
import { useTranslation } from "react-i18next";

const MalariaCaseV2 = () => {
  const {
    currentEvent,
    actions: { setCurrentEventDataValue },
  } = useEventCaptureStore(
    (state) => ({ currentEvent: state.currentEvent, actions: state.actions }),
    shallow
  );
  const orgUnit = useSelectionStore((state) => state.orgUnit, shallow);
  const orgUnitCode = orgUnit?.code;

  const [ftatSectionHide, setFtatSectionHide] = useState(true);

  const ReportedByFTAT = currentEvent.dataValues["ZoujqtQJJT8"];

  useEffect(() => {
    if (ReportedByFTAT === "true") {
      setFtatSectionHide(false);
    } else {
      setFtatSectionHide(true);
    }
  }, [ReportedByFTAT]);

  useEffect(() => {
    if (ftatSectionHide) {
      section9Configs.forEach((row) => {
        row.forEach(({ id }) => {
          setCurrentEventDataValue(id, "");
        });
      });
    }
  }, [ftatSectionHide]);

  useEffect(() => {
    if (orgUnitCode) {
      const prefix = orgUnitCode.slice(0, 3);
      if (prefix === "ASI") {
        setCurrentEventDataValue("PUPinvzteXW", "ACD");
      } else {
        setCurrentEventDataValue("PUPinvzteXW", "PCD");
      }
    }
  }, [orgUnitCode]);

  return (
    <Box id="malaria-case-v2-form-container" className="custom-form">
      <CustomSection
        sectionLabel="Reported By"
        tableName="malaria-case-v2-section-2"
        dataElementConfigs={section2Configs}
      />

      <CustomSection
        sectionLabel="General Information"
        tableName="malaria-case-v2-section-3"
        dataElementConfigs={section3Configs}
      />

      <CustomSection
        sectionLabel="Patient Come From"
        tableName="malaria-case-v2-section-4"
        dataElementConfigs={section4Configs}
      />

      <CustomSection
        sectionLabel="Testing"
        tableName="malaria-case-v2-section-5"
        dataElementConfigs={section5Configs}
      />

      <CustomSection
        sectionLabel="G6PD Deficiency Status"
        tableName="malaria-case-v2-section-6"
        dataElementConfigs={section6Configs}
      />

      <CustomSection
        sectionLabel="Treatment"
        tableName="malaria-case-v2-section-7"
        dataElementConfigs={section7Configs}
      />

      <CustomSection
        sectionLabel="Result"
        tableName="malaria-case-v2-section-8"
        dataElementConfigs={section8Configs}
      />

      {!ftatSectionHide && (
        <CustomSection
          sectionLabel="FTAT"
          tableName="malaria-case-v2-section-9"
          dataElementConfigs={section9Configs}
        />
      )}

      <CustomSection
        sectionLabel="Case follow up"
        tableName="malaria-case-v2-section-10"
        dataElementConfigs={section10Configs}
      />
    </Box>
  );
};

const VillageCell = () => {
  const { t } = useTranslation();

  return (
    <>
      <TableCell>{t("currentAddress")}</TableCell>
      <TableCell>
        <Box className="bordered-left">
          <VillageSelector
            dataElementIds={["r2lL9b9n7AH", "WtqnbO4FXrx", "mrrTTvKqyi1"]}
            storeGeometry={true}
          />
        </Box>
      </TableCell>
    </>
  );
};

const commonProps = {
  labelCellProps: { sx: { width: "400px" } },
};

const section2Configs = [
  [{ id: "QEsIUW7YIVC", ...commonProps }],
  [{ id: "ZoujqtQJJT8", ...commonProps }],
  [{ id: "ArtB4fFQAQm", ...commonProps }],
];

const section3Configs = [
  [{ id: "KlJZPvAHcYz", ...commonProps }],
  [{ id: "zDPvXY6h4JN", ...commonProps }],
  [{ id: "CC9BpgSQbfh", ...commonProps }],
  [{ id: "jtAWc3q1gaq", ...commonProps }],
  [{ id: "LIwsje8UjPH", ...commonProps }],
  [{ id: "oFck1TwVUJZ", ...commonProps }],
];

const section4Configs = [
  [{ customCell: <VillageCell /> }],
  [{ id: "nhZCqOagIUm", ...commonProps }],
  [{ id: "ETpWULDHWEG", ...commonProps }],
  [{ id: "ffR2HB5DHkR", ...commonProps }],
  [{ id: "TQftiamvtP9", ...commonProps }],
  [{ id: "E6hdA1xH6Yo", ...commonProps }],
  [{ id: "JSAiibybXmE", ...commonProps }],
];

const section5Configs = [
  [{ id: "RtfqjYAlhsa", ...commonProps }],
  [{ id: "jU51HPBjfQL", ...commonProps }],
  [{ id: "VstbDPVvaQZ", ...commonProps }],
  [{ id: "wRrZL3eIUs0", ...commonProps }],
  [{ id: "C0HpaLxmDKA", ...commonProps }],
];

const section6Configs = [[{ id: "N2VrcsygKGh", ...commonProps }]];

const section7Configs = [
  [{ id: "Rr5zPmut72I", ...commonProps }],
  [{ id: "pPl74SI2rtI", ...commonProps }],
  [{ id: "njwrUHsT0yg", ...commonProps }],
  [{ id: "N2l2WBzG22o", ...commonProps }],
  [{ id: "N1ZTNxpWZFV", ...commonProps }],
  [{ id: "YPg3EeDi8uM", ...commonProps }],
  [{ id: "Cux2FB3Tr0P", ...commonProps }],
];

const section8Configs = [
  [{ id: "iK0WF7ajZgB", ...commonProps }],
  [{ id: "iboStpxyG6j", ...commonProps }],
  [{ id: "R5asQPlBybE", ...commonProps }],
];

const section9Configs = [
  [{ id: "ROnzAomgODc", ...commonProps }],
  [{ id: "n6tPrPI8wbq", ...commonProps }],
  [{ id: "kLI3UcwwgyY", ...commonProps }],
  [{ id: "VLHlWJv8aGT", ...commonProps }],
  [{ id: "iJo1ofgK9wC", ...commonProps }],
];

const section10Configs = [[{ id: "V0Eiaiv2EOx", ...commonProps }]];

export default MalariaCaseV2;
