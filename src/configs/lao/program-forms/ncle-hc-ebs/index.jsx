import { useMemo } from "react";
import { Box, Table, TableCell } from "@mui/material";
import { useShallow } from "zustand/react/shallow";

import CollapseSectionWrapper from "../common/CollapseSectionWrapper";
import useEventCaptureStore from "@/state/eventCapture";
import useMetadataStore from "@/state/metadata";
import TableSection from "../common/TableSection";
import SectionBox from "./components/SectionBox";
import MapTable from "../common/MapTable";
import InvestigateBy from "../common/Ebs/InvestigateBy";

import { INVESTIGATED_BY_OPTS } from "../common/Ebs/const";

import "../common/index.css";
import "./ncle-hc-ebs.css";

const NcleHcEbs = () => {
  const programs = useMetadataStore(useShallow((state) => state.programs));
  const currProgram = programs.find(({ id }) => id === "mAcd10TBJob");
  const programStageSections = currProgram?.programStages?.find(
    ({ id }) => id === "rqtelNMVEQW"
  )?.programStageSections;
  const {
    currentEvent,
    actions: { setCurrentEventDataValue }
  } = useEventCaptureStore(
    useShallow((state) => ({
      currentEvent: state.currentEvent,
      actions: state.actions
    }))
  );
  const typeOfEvent = currentEvent.dataValues["ncH8fqNv2Ky"];

  const getProgramStageSection = (sectionId) =>
    programStageSections?.find(({ id }) => id === sectionId);

  const getSectionDataElements = (sectionId, type) => {
    const section = programStageSections?.find(({ id }) => id === sectionId);
    const sectionDataElements = section?.dataElements;

    if (type === "vertical") {
      return sectionDataElements?.map((dataElement) => [{ ...dataElement }]);
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

  const getDisplaySectionConfigs = (displaySections) => {
    const result = displaySections.map((sectionId) => {
      const type = sectionMapping[sectionId].type;
      const headerTitle = sectionMapping[sectionId].headerTitle;
      const sectionConfig = { headerTitle, id: sectionId };
      if (type === "grid") sectionConfig.className = "no-border-table";
      const dataElementConfigs = getSectionDataElements(sectionId, type);
      if (!dataElementConfigs) return;
      return { ...sectionConfig, dataElementConfigs };
    });

    return result.filter(Boolean);
  };

  const clearHideValues = (sectionIds) => {
    sectionIds.forEach((sectionId) => {
      const section = programStageSections?.find(({ id }) => id === sectionId);
      const sectionDataElements = section?.dataElements;
      if (sectionDataElements?.length) {
        sectionDataElements.forEach(({ id }) => {
          setCurrentEventDataValue(id, "");
        });
      }
    });
  };

  const sectionDisplayConfigs = useMemo(() => {
    let returnData = [];
    if (typeOfEvent) {
      switch (typeOfEvent) {
        case "Individual": {
          const result = getDisplaySectionConfigs(individualSectionIds);
          const hideSection = [...clusterSectionIds, ...otherSectionIds].filter(
            (id) => !individualSectionIds.find((item) => item === id)
          );

          clearHideValues(hideSection);
          returnData = result;
          break;
        }
        case "Cluster": {
          const result = getDisplaySectionConfigs(clusterSectionIds);
          const hideSection = [
            ...individualSectionIds,
            ...otherSectionIds
          ].filter((id) => !clusterSectionIds.find((item) => item === id));

          clearHideValues(hideSection);
          returnData = result;
          break;
        }
        case "Other": {
          const result = getDisplaySectionConfigs(otherSectionIds);
          const hideSection = [
            ...individualSectionIds,
            ...clusterSectionIds
          ].filter((id) => !otherSectionIds.find((item) => item === id));

          clearHideValues(hideSection);
          returnData = result;
          break;
        }
        default:
          break;
      }
    } else {
      clearHideValues([
        ...individualSectionIds,
        ...clusterSectionIds,
        ...otherSectionIds
      ]);
    }

    return returnData;
  }, [typeOfEvent]);

  const basicInfoConfigs = useMemo(
    () => getSectionDataElements("p7OcXyW117o", "vertical"),
    []
  );

  return (
    <Box className="custom-form" id="ncle-hc-ebs-form-container">
      <SectionBox
        sectionLabel="initialEventReport"
        dataElementConfigs={basicInfoConfigs}
      />

      {sectionDisplayConfigs.length > 0 &&
        sectionDisplayConfigs.map(
          ({ dataElementConfigs, headerTitle, className, id }) => {
            switch (id) {
              case "zlniBuf38Id":
                return (
                  <CollapseSectionWrapper
                    className="ebs-section"
                    headerTitle="whichSymptomsAreYouHaving"
                    sx={{ "& .collapse-children-wrapper": { padding: "20px" } }}
                  >
                    {signSymtomsGroup.map((signSymtomConfigs) => (
                      <SectionBox {...signSymtomConfigs} />
                    ))}
                  </CollapseSectionWrapper>
                );
              case "KCkugX4vqaG":
                const finalEvtRpt = getProgramStageSection("KCkugX4vqaG");
                const des = finalEvtRpt?.dataElements.filter(
                  (de) => !INVESTIGATED_BY_OPTS.includes(de.id)
                );
                const finalEvtDeConfigs = des.map((de) =>
                  de.id !== "PWnpVKZKxpq"
                    ? [{ id: de.id, display: "default" }]
                    : [
                        { id: de.id, display: "label" },
                        {
                          customCell: (
                            <TableCell>
                              <div className="input-field-container">
                                <InvestigateBy />
                              </div>
                            </TableCell>
                          )
                        }
                      ]
                );
                return (
                  <CollapseSectionWrapper
                    className="ebs-section"
                    headerTitle={headerTitle}
                    sx={{ "& .collapse-children-wrapper": { padding: "20px" } }}
                  >
                    <Table sx={{ width: "100%" }}>
                      <MapTable
                        dataElementConfigs={finalEvtDeConfigs}
                        tableName={headerTitle}
                      />
                    </Table>
                  </CollapseSectionWrapper>
                );
              default:
                return (
                  <CollapseSectionWrapper
                    className="ebs-section"
                    headerTitle={headerTitle}
                    sx={{ "& .collapse-children-wrapper": { padding: "20px" } }}
                  >
                    <TableSection
                      dataElementConfigs={dataElementConfigs}
                      className={className}
                      noHeader={true}
                    />
                  </CollapseSectionWrapper>
                );
            }
          }
        )}
    </Box>
  );
};

const checkboxLeft = {
  display: "checkboxLeft"
};

const noBorder = {
  className: "section-box bordered no-border-table"
};

const individualSectionIds = [
  "miCPmny0xQK",
  "zlniBuf38Id",
  "en3oFSbPxgu",
  "bdihU6laB4v",
  "uEmvacQNLbT",
  "KCkugX4vqaG"
];

const clusterSectionIds = [
  "W5lN43xEgSX",
  "zlniBuf38Id",
  "uEmvacQNLbT",
  "KCkugX4vqaG"
];

const otherSectionIds = ["uEmvacQNLbT", "KCkugX4vqaG"];

const sectionMapping = {
  W5lN43xEgSX: {
    type: "vertical",
    headerTitle: "onsetOfEventAndAffected"
  },
  I4kCwIhk1pQ: {
    type: "grid",
    headerTitle: "whichTypeOfAnimalWereAffected"
  },
  xInjZuSapmC: { type: "grid", headerTitle: "WhatHappenedToTheAnimals" },
  niMpj79svG1: {
    type: "grid",
    headerTitle: "whatSignsAndSymptomsDidYouObservedInTheAffectedAnimals"
  },
  miCPmny0xQK: { type: "vertical", headerTitle: "onsetOfSymptoms" },
  zlniBuf38Id: { type: "grid", headerTitle: "whichSymptomsAreYouHaving" },
  XB1VWshq5oI: { type: "vertical", headerTitle: "COVID19ContactTracing" },
  en3oFSbPxgu: { type: "grid", headerTitle: "probableDisease" },
  bdihU6laB4v: { type: "vertical", headerTitle: "furtherReferral" },
  uEmvacQNLbT: {
    type: "vertical",
    headerTitle: "descriptiveAnalysisAndRemarks"
  },
  KCkugX4vqaG: {
    type: "vertical",
    headerTitle: "finalEventReport",
    dataElementConfigs: [[{ id: "qzAXGxx7Dag", ...checkboxLeft }]]
  }
};

const signSymtomsGroup = [
  {
    sectionLabel: "fever",
    tableName: "fever",
    dataElementConfigs: [
      [
        { id: "bYNsIhiqOln", ...checkboxLeft },
        { id: "KUXcqvyWbTS", ...checkboxLeft },
        { id: "WFLbVc6BTqa", ...checkboxLeft }
      ],
      [{ id: "QfRyWJ0Ihjq", ...checkboxLeft }]
    ],
    ...noBorder
  },
  {
    sectionLabel: "fatigue",
    tableName: "fatigue",
    dataElementConfigs: [
      [
        { id: "sq1YT3PMcc9", ...checkboxLeft },
        { id: "HLG3aQyPDMq", ...checkboxLeft },
        { display: "empty" }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "respiratory-system",
    tableName: "respiratory-system",
    dataElementConfigs: [
      [
        { id: "zZFX8Mraehj", ...checkboxLeft },
        { id: "RqWPVm8xqQg", ...checkboxLeft },
        { id: "BL5BI1wm4fE", ...checkboxLeft }
      ],
      [
        { id: "MFyUzr2WhH9", ...checkboxLeft },
        { id: "ppxeNiQ26qS", ...checkboxLeft },
        { id: "BdDBUtvevA5", ...checkboxLeft }
      ],
      [
        { id: "BJCKnuhde2F", ...checkboxLeft },
        { id: "y4QwR5mifqL", ...checkboxLeft },
        { id: "IjNslbfBCAF", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "gastrointestinal-system",
    tableName: "gastrointestinal-system",
    dataElementConfigs: [
      [
        { id: "BuA9GCwUBTW", ...checkboxLeft },
        { id: "CkuUWqV3BYw", ...checkboxLeft },
        { id: "gewFFg49OgT", ...checkboxLeft }
      ],
      [
        { id: "do6S9XumEfW", ...checkboxLeft },
        { id: "pf4W3JGu8VG", ...checkboxLeft },
        { id: "JsXBZSpqLsb", ...checkboxLeft }
      ],
      [
        { id: "oSPcKMKASul", ...checkboxLeft },
        { id: "eX0Y6eWD8dO", ...checkboxLeft },
        { id: "eFV8NnM9u3m", ...checkboxLeft }
      ],
      [
        { id: "Q5TEy5ZLlpe", ...checkboxLeft },
        { id: "ELZedxPrUEI", ...checkboxLeft },
        { id: "o8ep74CvMmK", ...checkboxLeft }
      ],
      [
        { id: "EMyWgd60YHp", ...checkboxLeft },
        { id: "PsAB5KNpeQP", ...checkboxLeft },
        { id: "a1rF7gzm6ec", ...checkboxLeft }
      ],
      [{ id: "Snd6fcyporM", ...checkboxLeft }]
    ],
    ...noBorder
  },
  {
    sectionLabel: "cardiac-system",
    tableName: "cardiac-system",
    dataElementConfigs: [
      [
        { id: "vCARfriFAvE", ...checkboxLeft },
        { id: "Na1OhSgbLhJ", ...checkboxLeft },
        { id: "JcCDL5K4yXR", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "nervous-system",
    tableName: "nervous-system",
    dataElementConfigs: [
      [
        { id: "UP4icntl9h7", ...checkboxLeft },
        { id: "jHT8LU4ZA7T", ...checkboxLeft },
        { id: "G7pCr7KdsKK", ...checkboxLeft }
      ],
      [
        { id: "hXwhyuEsIVJ", ...checkboxLeft },
        { id: "DbqKE0Vh7is", ...checkboxLeft },
        { id: "GreIanU7IOx", ...checkboxLeft }
      ],
      [
        { id: "ZDtGoaKSI2l", ...checkboxLeft },
        { id: "nFcEJTDCzRU", ...checkboxLeft },
        { id: "VYyL7SJSaae", ...checkboxLeft }
      ],
      [
        { id: "ZMb0Lpr3YLI", ...checkboxLeft },
        { id: "BjnNZlILfOY", ...checkboxLeft },
        { id: "Q1MCLYpbDqU", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "muscular-skeleton-system",
    tableName: "muscular-skeleton-system",
    dataElementConfigs: [
      [
        { id: "AVxxfwn5MGi", ...checkboxLeft },
        { id: "EZyJceBF3GW", ...checkboxLeft },
        { id: "nVq2fjd0IBk", ...checkboxLeft }
      ],
      [
        { id: "fM7zm2iijMD", ...checkboxLeft },
        { id: "KHWbeHsZ2uD", ...checkboxLeft },
        { id: "ybiZ7IJ0a6N", ...checkboxLeft }
      ],
      [
        { id: "Q42PdCMGrDc", ...checkboxLeft },
        { id: "dattpgDa6dx", ...checkboxLeft },
        { id: "i508nnTsn6h", ...checkboxLeft }
      ],
      [
        { id: "NPNykM4hEST", ...checkboxLeft },
        { id: "eKiIzUGgior", ...checkboxLeft },
        { id: "Ck34SIHchH2", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "dermatology-disorder",
    tableName: "dermatology-disorder",
    dataElementConfigs: [
      [
        { id: "ASQ4ReO6q5Q", ...checkboxLeft },
        { id: "MYwUszeScpE", ...checkboxLeft },
        { id: "tfiWkaMatjH", ...checkboxLeft }
      ]
    ],
    ...noBorder
  },
  {
    sectionLabel: "bleeding",
    tableName: "bleeding",
    dataElementConfigs: [[{ id: "JUL3Jojvqhw", ...checkboxLeft }]],
    ...noBorder
  },
  {
    sectionLabel: "other",
    tableName: "other",
    dataElementConfigs: [
      [
        { id: "uT8N1zAKrAD", ...checkboxLeft },
        { id: "V4y2HK6v3ps", ...checkboxLeft }
      ]
    ],
    ...noBorder
  }
];

export default NcleHcEbs;
