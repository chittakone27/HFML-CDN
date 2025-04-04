import { useShallow } from "zustand/react/shallow";
import useChrTrackerStore from "../state";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { pickExecutionDateLabel, pickTranslation } from "@/utils/utils";
import { findDataValue } from "@/configs/laotracker/common/utils";
import useMetadataStore from "@/state/metadata";

const useBasicRules = () => {
  const { t, i18n } = useTranslation();
  const { dataElements } = useMetadataStore(
    useShallow((state) => ({
      dataElements: state.dataElements
    }))
  );
  const [errors, setErrors] = useState([]);
  const { event } = useChrTrackerStore(
    useShallow((state) => ({
      event: state.event
    }))
  );
  const { currentEvent, currentProgramStage } = event;
  useEffect(() => {
    const currentErrors = [];
    const mandatoryFields = [];
    if (currentEvent) {
      //Check if event date is available
      if (!currentEvent.eventDate) {
        mandatoryFields.push(pickExecutionDateLabel(currentProgramStage, t));
      }
      //Check if all mandatory fields are filled
      currentProgramStage.programStageDataElements
        .filter((psde) => psde.compulsory)
        .forEach((psde) => {
          const foundDataValue = findDataValue(currentEvent.dataValues, psde.dataElement.id);
          if (!foundDataValue) {
            const foundDataElement = dataElements.find((de) => de.id === psde.dataElement.id);
            mandatoryFields.push(pickTranslation(foundDataElement, i18n.language, "formName"));
          }
        });

      if (mandatoryFields.length > 0) {
        currentErrors.push(t("cannotSaveMissingMandatoryFields") + ": " + mandatoryFields.join(", "));
      }
      setErrors([...currentErrors]);
    } else {
      setErrors([]);
    }
  }, [JSON.stringify(currentEvent)]);

  return errors;
};

export default useBasicRules;
