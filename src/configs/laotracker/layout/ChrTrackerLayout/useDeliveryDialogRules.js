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
  const { dataElements, trackedEntityAttributes } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements,
      trackedEntityAttributes: state.trackedEntityAttributes
    }))
  );
  const { event, actions } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event,
      actions: state.actions
    }))
  );
  const { currentEvent, order } = event;
  const { changeDataValue } = actions;
  const foundSexAttribute = trackedEntityAttributes.find((tea) => tea.id === "DmuazFb368B");

  useEffect(() => {
    const currentBasicErrors = [];
    const currentCompleteDeliveryErrors = [];
    const mandatoryFields = [];
    //Check if live births is filled
    // const liveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
    // if (!liveBirths) {
    //   const foundDataElement = dataElements.find((de) => de.id === "OcT4N2illVT");
    //   mandatoryFields.push(pickTranslation(foundDataElement, i18n.language, "formName"));
    // }
    //Check infants
    const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
    let children = [];
    if (childTeisValue) {
      children = JSON.parse(childTeisValue);
    }
    if (children.length > 0) {
      children.forEach((child) => {
        const foundSex = findAttributeValue(child, "DmuazFb368B");
        if (!foundSex) {
          currentCompleteDeliveryErrors.push(t("sexIsMissing"));
          if (tab === 1) {
            const foundIndex = order.findIndex((o) => o === "DmuazFb368B");
            mandatoryFields.push(foundIndex + 1 + ". " + pickTranslation(foundSexAttribute, i18n.language, "name"));
          }
        }
      });
    }
    ///////////////////////////
    if (mandatoryFields.length > 0) {
      currentBasicErrors.push(t("cannotSaveMissingMandatoryFields"));
      mandatoryFields.forEach((mf) => {
        currentBasicErrors.push(mf);
      });
    }
    setBasicErrors(currentBasicErrors);
    setCompleteDeliveryErrors(currentCompleteDeliveryErrors);
  }, [JSON.stringify(currentEvent), tab, order.join(",")]);
  // useEffect(() => {
  //   const childTeisValue = findDataValue(currentEvent.dataValues, "lYdXxom1BAG");
  //   let children = [];
  //   if (childTeisValue) {
  //     children = JSON.parse(childTeisValue);
  //   }

  //   const childAttributes = [
  //     // {
  //     //   deliveryTeaId: "tQeFLjYbqzv",
  //     //   eirTeaId: "tQeFLjYbqzv"
  //     // },
  //     {
  //       deliveryTeaId: "IEE2BMhfoSc",
  //       eirTeaId: "RqEyvE6zcTE"
  //     },
  //     {
  //       deliveryTeaId: "IBLkiaYRRL3",
  //       eirTeaId: "WkHHrysFy3n"
  //     },
  //     {
  //       deliveryTeaId: "r8bZppSsIvR",
  //       eirTeaId: "r8bZppSsIvR"
  //     },
  //     {
  //       deliveryTeaId: "oVwa5LfjnvA",
  //       eirTeaId: "oVwa5LfjnvA"
  //     },
  //     {
  //       deliveryTeaId: "UNiaP6Oz7Mv",
  //       eirTeaId: "UNiaP6Oz7Mv"
  //     },
  //     {
  //       deliveryTeaId: "RwoKpuIgMmA", //lgHRdU82IJv
  //       eirTeaId: "DcMyN6eoyFD"
  //     }
  //   ];
  //   children.forEach((child) => {
  //     childAttributes.forEach((attribute) => {
  //       let value = "";
  //       if (attribute.deliveryTeaId === "tQeFLjYbqzv") {
  //         value = findDataValue(foundDeliveryDetailEvent.dataValues, "grMMOiF9fPj");
  //       } else {
  //         value = findAttributeValue(currentTei, attribute.deliveryTeaId);
  //       }
  //       const foundAttributeIndex = child.attributes.findIndex((attr) => attr.attribute === attribute.eirTeaId);
  //       if (foundAttributeIndex === -1) {
  //         child.attributes.push({
  //           attribute: attribute.eirTeaId,
  //           value
  //         });
  //       } else {
  //         child.attributes[foundAttributeIndex].value = value;
  //       }
  //     });
  //   });
  //   changeDataValue("lYdXxom1BAG", JSON.stringify(children));
  // }, [JSON.stringify(currentTei)]);

  return { basicErrors, completeDeliveryErrors };
};

export default useDeliveryDialogRules;
