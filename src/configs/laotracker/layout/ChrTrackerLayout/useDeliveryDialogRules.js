import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "./state";
import useMetadataStore from "@/state/metadata";
import { useEffect, useState } from "react";
import { findAttributeValue, findDataValue } from "../../common/utils";
import { pickTranslation } from "@/utils/utils";
import { useTranslation } from "react-i18next";
const useDeliveryDialogRules = () => {
  const { t, i18n } = useTranslation();
  const [basicErrors, setBasicErrors] = useState([]);
  const [completeDeliveryErrors, setCompleteDeliveryErrors] = useState([]);

  const { dataElements } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements
    }))
  );
  const { event } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event
    }))
  );
  const { currentEvent } = event;
  useEffect(() => {
    const currentBasicErrors = [];
    const currentCompleteDeliveryErrors = [];
    const mandatoryFields = [];
    //Check if live births is filled
    const liveBirths = findDataValue(currentEvent.dataValues, "OcT4N2illVT");
    if (!liveBirths) {
      const foundDataElement = dataElements.find((de) => de.id === "OcT4N2illVT");
      mandatoryFields.push(pickTranslation(foundDataElement, i18n.language, "formName"));
    }
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
        }
      });
    }
    ///////////////////////////
    if (mandatoryFields.length > 0) {
      currentBasicErrors.push(t("cannotSaveMissingMandatoryFields") + ": " + mandatoryFields.join(", "));
    }
    setBasicErrors(currentBasicErrors);
    setCompleteDeliveryErrors(currentCompleteDeliveryErrors);
  }, [JSON.stringify(currentEvent)]);

  return { basicErrors, completeDeliveryErrors };
};

export default useDeliveryDialogRules;
