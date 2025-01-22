import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import useTrackerCaptureStore from "@/state/trackerCapture";
import {
  useEventRuleEffect,
  convertListToObj,
} from "@/configs/lao/program-forms/common/tracker";

const useBirthDetailsRule = () => {
  const { t } = useTranslation();
  const { setLayout } = useTrackerCaptureStore(
    (state) => state.actions,
    shallow
  );
  const { currentEvents, selectedEvent } = useTrackerCaptureStore(
    (state) => state.data,
    shallow
  );
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const dataValues = currentEvent
    ? convertListToObj(currentEvent.dataValues, "dataElement", "value")
    : null;

  useEventRuleEffect(() => {
    //reset
    const errors = {};
    const warnings = {};
    const hiddenFields = {};
    setLayout("disableCompleteButton", false);

    //Hide field If Place Of Birth is home
    //Hide field If Place Of Birth is health facility
    //Hide field If Place Of Birth is health facility
    const pobIsHome = dataValues?.["Y9zVpoBIXPR"] === "Home";
    const pobIsHF = dataValues?.["Y9zVpoBIXPR"] === "Health Facility";
    hiddenFields["O2aFWsqAvWr"] = pobIsHome;
    hiddenFields["qjcqRVWCIqa"] = pobIsHF;
    hiddenFields["ceZPRvdgryp"] = pobIsHF;
    //If birth weight > 10000g, show error
    //If birth weight < 2500g, show error
    const birthWeight = dataValues?.P1fhF8iYjm7;
    if (birthWeight) {
      if (birthWeight * 1 > 10000) {
        errors["P1fhF8iYjm7"] = t("birthWeightHigh");
        setLayout("disableCompleteButton", true);
      }
      if (birthWeight * 1 < 2500) {
        errors["P1fhF8iYjm7"] = t("birthWeightLow");
        setLayout("disableCompleteButton", true);
      }
    }
    //Gestational Age at birth 0-28 weeks or 42-49 weeks (soft), show warning
    //Gestational Age at birth >= 50 w (hard), show error
    const gestationalAge = dataValues?.YesvM1AYsNy;
    if (gestationalAge) {
      if (
        (gestationalAge * 1 >= 0 && gestationalAge * 1 <= 28) ||
        (gestationalAge * 1 >= 42 && gestationalAge * 1 <= 49)
      ) {
        warnings["YesvM1AYsNy"] = t("gestationalAgeWarning");
      }
      if (gestationalAge * 1 >= 50) {
        errors["YesvM1AYsNy"] = t("gestationalAgeError");
        setLayout("disableCompleteButton", true);
      }
    }

    return { errors, warnings, hiddenFields };
  }, [JSON.stringify(currentEvent)]);
};

export default useBirthDetailsRule;
