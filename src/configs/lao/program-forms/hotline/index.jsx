import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { shallow } from "zustand/shallow";
// Data CORE
import useEventCaptureStore from "@/state/eventCapture";
import useMetadataStore from "@/state/metadata";
// CSS
import "../common/index.css";
import "./hotline.css";
// Components
import CustomSection from "./components/CustomSection";
// import TableSection from "../common/TableSection";
import SectionBox from "./components/SectionBox";
import CollapseSectionWrapper from "./components/CustomSection/CollapseSectionWrapper";
// Mapping
import {
  sectionsMapping,
  callPurposeTypesSections,
  signSymtomsGroup
} from "./mapping/sectionMapping";
import { generalQaTypeRelatedSections } from "./mapping/generalQaTypeMapping";
// Others
import { checkboxLeft } from "./const";

const Hotline = () => {
  const programs = useMetadataStore((state) => state.programs, shallow);
  const currProgram = programs.find(({ id }) => id === "QSRfmj1Fb0I");
  const currentEvent = useEventCaptureStore(
    (state) => state.currentEvent,
    shallow
  );
  const programStageSections = currProgram?.programStages?.find(
    ({ id }) => id === "NJ3Lw6axrjZ"
  )?.programStageSections;
  const callPurpose = currentEvent.dataValues["ZTuJ6uipijY"];
  const generalQaType = currentEvent.dataValues["iJbG2OZrif5"];
  const sectionsId = sectionsMapping.map((section) => section["sectionId"]);
  // Custom hook
  const [typeOfCallConfigs, setTypeOfCallConfigs] = useState(null);
  const [hiddenSections, setHiddenSections] = useState([]);

  const getSectionDataElements = (sectionId, type) => {
    const section = programStageSections?.find(({ id }) => id === sectionId);
    const sectionDataElements = section?.dataElements;

    if (type === "vertical") {
      return sectionDataElements?.map((dataElement) => [
        { ...dataElement, labelCellProps: { sx: { width: "400px" } } }
      ]);
    }

    const dataElementConfigs = [];
    if (sectionDataElements?.length) {
      for (let i = 0; i < sectionDataElements?.length; i += 3) {
        const row = [];
        for (let j = 0; j < 3; j++) {
          const dataElement = sectionDataElements[i + j];
          if (dataElement) {
            row.push({ ...dataElement, ...checkboxLeft });
          }
        }
        dataElementConfigs.push(row);
      }
    }

    if (dataElementConfigs.length) return dataElementConfigs;
    return;
  };

  const setNewHiddenSectionsList = (mappingObj, deVl) => {
    if (deVl) {
      const newHiddenList = sectionsId.filter(
        (sectionId) => !mappingObj[deVl].includes(sectionId)
      );
      setHiddenSections(newHiddenList);
    } else {
      setHiddenSections(sectionsId);
    }
  };

  useEffect(() => {
    setHiddenSections(sectionsId);
    let results = {
      initSection: null,
      otherSections: null
    };
    results["initSection"] = getSectionDataElements("qLaW1fHpV2e", "vertical");
    results["otherSections"] = sectionsMapping.map((section) => {
      const sectionDes = getSectionDataElements(
        section["sectionId"],
        section["type"]
      );
      return {
        id: section["sectionId"],
        title: section["headerTitle"],
        renderType: section["type"],
        configs: sectionDes
      };
    });
    setTypeOfCallConfigs(results);
  }, []);

  useEffect(() => {
    if (callPurpose !== "General Q&A") {
      setNewHiddenSectionsList(callPurposeTypesSections, callPurpose);
    } else {
      setNewHiddenSectionsList(generalQaTypeRelatedSections, generalQaType);
    }
  }, [callPurpose, generalQaType]);

  return (
    typeOfCallConfigs && (
      <Box className="hotline-form-container custom-form">
        <CustomSection
          title="toc"
          dataElementConfigs={typeOfCallConfigs["initSection"]}
          isOpen={true}
        />
        {typeOfCallConfigs["otherSections"]
          .filter(
            (section) =>
              section["configs"] !== undefined &&
              !hiddenSections.includes(section["id"])
          )
          .map((section) => {
            if (section.id === "dNvGTqf40gh") {
              return (
                <CollapseSectionWrapper
                  headerTitle="sympsHaving"
                  sx={{ "& .collapse-children-wrapper": { padding: "20px" } }}
                >
                  {signSymtomsGroup.map((symptomGrp) => {
                    return (
                      <Box className="no-border-table">
                        <SectionBox
                          sectionLabel={symptomGrp["sectionLabel"]}
                          dataElementConfigs={symptomGrp["dataElementConfigs"]}
                        />
                      </Box>
                    );
                  })}
                </CollapseSectionWrapper>
              );
            } else {
              return (
                <Box
                  className={
                    section["renderType"] === "grid" ? "no-border-table" : ""
                  }
                >
                  <CustomSection
                    title={section["title"]}
                    dataElementConfigs={section["configs"]}
                    isOpen={false}
                  />
                </Box>
              );
            }
          })}
      </Box>
    )
  );
};

export default Hotline;
