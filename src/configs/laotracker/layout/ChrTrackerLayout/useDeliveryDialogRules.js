import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "./state";
import useMetadataStore from "@/state/metadata";
import { useEffect, useState } from "react";
import { findAttributeValue, findDataValue } from "../../common/utils";
import { pickTranslation } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import useTrackerCaptureStore from "@/state/trackerCapture";
const useDeliveryDialogRules = (tab) => {
  const { t, i18n } = useTranslation();
  const [basicErrors, setBasicErrors] = useState([]);
  const [completeDeliveryErrors, setCompleteDeliveryErrors] = useState([]);
  const data = useTrackerCaptureStore((state) => state.data);
  const { currentTei } = data;
  const { dataElements, trackedEntityAttributes, programs } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements,
      trackedEntityAttributes: state.trackedEntityAttributes,
      programs: state.programs
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEvent, currentProgramStage, order } = event;
  const { changeDataValue } = actions;
  const foundSexAttribute = trackedEntityAttributes.find((tea) => tea.id === "DmuazFb368B");
  const foundEirProgram = programs.find((p) => p.id === "Yj9cJ34AXw6");
  const foundBirthDetailsStage = foundEirProgram.programStages.find((ps) => ps.id === "bwGkn5ebqkD");
  useEffect(() => {
    const currentBasicErrors = [];
    const currentCompleteDeliveryErrors = [];
    const foundChildTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
    const children = foundChildTeisValue ? JSON.parse(foundChildTeisValue) : [];
    if (children.length > 0) {
      children.forEach((child) => {
        const foundEirEnrollment = child.enrollments.find((enr) => enr.program === "Yj9cJ34AXw6");
        const foundBirthDetailEvent = foundEirEnrollment?.events.find((ev) => ev.programStage === "bwGkn5ebqkD");
        foundBirthDetailsStage.programStageDataElements.forEach((psde) => {
          if (psde.compulsory) {
            const foundValue = findDataValue(foundBirthDetailEvent.dataValues, psde.dataElement.id);
            if (!foundValue) {
              // const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
              // const foundItem = dataElements.find((de) => de.id === psde.dataElement.id);
              currentCompleteDeliveryErrors.push("missingMandatoryFieldInInfantForm");
            }
          }
        });
        const foundSex = findAttributeValue(child, "DmuazFb368B");
        if (!foundSex) {
          currentCompleteDeliveryErrors.push("missingMandatoryFieldInInfantForm");
        }
      });
    }
    console.log(currentCompleteDeliveryErrors);

    if (tab === 0) {
      currentProgramStage.programStageDataElements.forEach((psde) => {
        if (psde.compulsory) {
          const foundValue = findDataValue(currentEvent.dataValues, psde.dataElement.id);
          if (!foundValue) {
            const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
            const foundItem = dataElements.find((de) => de.id === psde.dataElement.id);
            currentBasicErrors.push(
              foundIndex + 1 + ". " + pickTranslation(foundItem, i18n.language, "formName") + " (" + t("thisFieldIsRequired") + ")"
            );
          }
        }
      });
    } else if (tab > 0) {
      const foundEirEnrollment = children[tab - 1].enrollments.find((enr) => enr.program === "Yj9cJ34AXw6");
      const foundBirthDetailEvent = foundEirEnrollment?.events.find((ev) => ev.programStage === "bwGkn5ebqkD");
      foundBirthDetailsStage.programStageDataElements.forEach((psde) => {
        if (psde.compulsory) {
          const foundValue = findDataValue(foundBirthDetailEvent.dataValues, psde.dataElement.id);
          if (!foundValue) {
            const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
            const foundItem = dataElements.find((de) => de.id === psde.dataElement.id);
            currentBasicErrors.push(
              foundIndex + 1 + ". " + pickTranslation(foundItem, i18n.language, "formName") + " (" + t("thisFieldIsRequired") + ")"
            );
          }
        }
      });
      const foundSex = findAttributeValue(children[tab - 1], "DmuazFb368B");
      if (!foundSex) {
        const foundSexIndex = order.findIndex((o) => o === "DmuazFb368B");
        const foundSexItem = trackedEntityAttributes.find((tea) => tea.id === "DmuazFb368B");
        currentBasicErrors.push(
          foundSexIndex + 1 + ". " + pickTranslation(foundSexItem, i18n.language, "formName") + " (" + t("thisFieldIsRequired") + ")"
        );
      }
    }

    // const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
    // let children = [];
    // if (childTeisValue) {
    //   children = JSON.parse(childTeisValue);
    // }
    // if (children.length > 0) {
    //   children.forEach((child) => {
    //     const foundSex = findAttributeValue(child, "DmuazFb368B");
    //     if (!foundSex) {
    //       currentCompleteDeliveryErrors.push(t("sexIsMissing"));
    //       if (tab === 1) {
    //         const foundIndex = order.findIndex((o) => o === "DmuazFb368B");
    //         mandatoryFields.push(foundIndex + 1 + ". " + pickTranslation(foundSexAttribute, i18n.language, "name"));
    //         const foundBirthDetailEvent = child.enrollments[0].events.find((ev) => ev.programStage === "bwGkn5ebqkD");
    //         foundBirthDetailsStage.programStageDataElements.forEach((psde) => {
    //           if (psde.compulsory) {
    //             const foundIndex = order.findIndex((o) => o === psde.dataElement.id);
    //             const foundValue = findDataValue(foundBirthDetailEvent.dataValues, psde.dataElement.id);
    //             if (!foundValue) {
    //               const foundDataElement = dataElements.find((de) => de.id === psde.dataElement.id);
    //               mandatoryFields.push(foundIndex + 1 + ". " + pickTranslation(foundDataElement, i18n.language, "name"));
    //             }
    //           }
    //         });
    //       }
    //     }
    //   });
    // }
    ///////////////////////////
    // if (mandatoryFields.length > 0) {
    //   currentBasicErrors.push(t("cannotSaveMissingMandatoryFields"));
    //   mandatoryFields.forEach((mf) => {
    //     currentBasicErrors.push(mf);
    //   });
    // }
    setBasicErrors(currentBasicErrors);
    setCompleteDeliveryErrors(currentCompleteDeliveryErrors);
  }, [JSON.stringify(currentEvent), tab, order.join(",")]);

  return { basicErrors, completeDeliveryErrors };
};

export default useDeliveryDialogRules;
