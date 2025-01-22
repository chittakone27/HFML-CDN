import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import moment from "moment";
import _ from "lodash";

import {
  useEventRuleEffect,
  convertListToObj,
} from "@/configs/lao/program-forms/common/tracker";
import useTrackerCaptureStore from "@/state/trackerCapture";
import usePreviousEvents from "./usePreviousEvents";

const useImmunizationRule = () => {
  const { t } = useTranslation();
  const { currentTei, currentEvents, selectedEvent } = useTrackerCaptureStore(
    (state) => state.data,
    shallow
  );
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const eventDate = currentEvent?.eventDate;
  const previousEvents = usePreviousEvents("hCTTxOH8FOa");

  const attributes = currentTei
    ? convertListToObj(currentTei.attributes, "attribute", "value")
    : null;
  const dataValues = currentEvent
    ? convertListToObj(currentEvent.dataValues, "dataElement", "value")
    : null;

  const isGiven = (dataElement) => {
    let given = false;
    if (previousEvents?.length) {
      previousEvents.forEach((pEv) => {
        pEv.dataValues.forEach((de) => {
          if (de.dataElement === dataElement && de.value === "true") {
            given = true;
          }
        });
      });
    }

    return given;
  };

  useEventRuleEffect(() => {
    const warnings = {};
    const hiddenFields = {};
    const assignations = {};
    const disabledFields = {
      DxOqZZgVQhF: true,
      MV1yoC7BfnG: true,
    };

    let ageInMonth;
    const dob = attributes?.["tQeFLjYbqzv"];
    if (dob && eventDate) {
      //calculate age in month
      const convertDob = moment(dob, "YYYY-MM-DD");
      const convertEvDate = moment(eventDate, "YYYY-MM-DD");
      ageInMonth = convertEvDate.diff(convertDob, "months") + "";
      assignations["MV1yoC7BfnG"] = ageInMonth;
      //calculate age in week
      const ageInWeek = convertEvDate.diff(convertDob, "weeks") + "";
      assignations["DxOqZZgVQhF"] = ageInWeek;
      //If not given at birthday +1, show warning
      const ageInDay = convertEvDate.diff(convertDob, "days");
      if (
        ageInDay > 1 &&
        !isGiven("G9kw7qj1duL") &&
        !dataValues?.["G9kw7qj1duL"]
      ) {
        warnings["G9kw7qj1duL"] = t("bcgWarning");
      }
    }

    const pov = dataValues?.["jzT9g1EzJLd"];
    if (pov !== "Provided in other facility") {
      hiddenFields["u9lncRQaojO"] = true;
    }

    const hideIfGiven = (dataElement, extCondition) => {
      if (isGiven(dataElement) || extCondition + "" === "true") {
        hiddenFields[dataElement] = true;
      }
    };

    //Hide JE if ever given or age less than 9 months
    hideIfGiven("E4YaV9wahBu");
    //Hide MR 2 if ever given or age less than 12 month
    hideIfGiven("n6rveUjp5h1");
    //Full Immunize
    const haveValue = (dataElement) => dataValues?.[dataElement] === "true";
    const fullImmunize =
      (haveValue("G9kw7qj1duL") || isGiven("G9kw7qj1duL")) &&
      (haveValue("Ln2xC7zuEpr") || isGiven("Ln2xC7zuEpr")) &&
      (haveValue("wQNvIFAlWdA") || isGiven("wQNvIFAlWdA")) &&
      (haveValue("EdCjK8sy4WH") || isGiven("EdCjK8sy4WH")) &&
      (haveValue("E4YaV9wahBu") || isGiven("E4YaV9wahBu")) &&
      (haveValue("TFIM3NzVlzn") || isGiven("TFIM3NzVlzn")) &&
      (haveValue("UFRm7xWmxSA") || isGiven("UFRm7xWmxSA")) &&
      (haveValue("aiFYpVd6Vle") || isGiven("aiFYpVd6Vle")) &&
      (haveValue("eb5xGUCIGw3") || isGiven("eb5xGUCIGw3")) &&
      (haveValue("n6rveUjp5h1") || isGiven("n6rveUjp5h1")) &&
      (haveValue("TvfJjKrHq7m") || isGiven("TvfJjKrHq7m")) && //opv3
      (haveValue("TXdcfWEjnCG") || isGiven("TXdcfWEjnCG")) && //pcv3
      (haveValue("uQ6miuyuEle") || isGiven("uQ6miuyuEle")) && //pcv1
      (haveValue("x1aaFGkMUtF") || isGiven("x1aaFGkMUtF")) && //pcv2
      (haveValue("qyJMInEjWtJ") ||
        isGiven("qyJMInEjWtJ") ||
        haveValue("O8drIFUt4j8") ||
        isGiven("O8drIFUt4j8"));

    if (fullImmunize) {
      assignations["qrZ2UmofOdm"] = "true";
    }
    if (!fullImmunize) {
      assignations["qrZ2UmofOdm"] = "";
    }

    if (previousEvents?.length) {
      //Hide HB024 if ever given or HepB0 7 days is checked
      //Hide HepB0 < 7days if ever given or HepB0 <24hrs is checked
      hideIfGiven("O8drIFUt4j8", isGiven("qyJMInEjWtJ"));
      hideIfGiven("qyJMInEjWtJ", isGiven("O8drIFUt4j8"));

      //Hide BCG if ever given
      hideIfGiven("G9kw7qj1duL");
      //Hide DPT1 if ever given
      hideIfGiven("UFRm7xWmxSA");
      //Hide DPT2 if ever given
      hideIfGiven("aiFYpVd6Vle");
      //Hide DPT3 if ever given
      hideIfGiven("Ln2xC7zuEpr");
      //Hide IPV1 if ever given
      hideIfGiven("wQNvIFAlWdA");
      //Hide OPV1 if ever given
      hideIfGiven("TFIM3NzVlzn");
      //Hide OPV2 if ever given
      hideIfGiven("eb5xGUCIGw3");
      //Hide OPV3 if ever given
      hideIfGiven("TvfJjKrHq7m");
      //Hide PCV1 if ever given
      hideIfGiven("uQ6miuyuEle");
      //Hide PCV2 if ever given
      hideIfGiven("x1aaFGkMUtF");
      //Hide PCV3 if ever given
      hideIfGiven("TXdcfWEjnCG");
      //Hide Rota1 if ever given
      // hideIfGiven("kI35yRT54NZ");
      //Hide Rota2 if ever given
      // hideIfGiven("u6ioEgMJf8j");
      //Hide measles1 if ever given
      hideIfGiven("EdCjK8sy4WH");
    }

    return { warnings, hiddenFields, assignations, disabledFields };
  }, [
    JSON.stringify(currentEvent),
    JSON.stringify(previousEvents),
    JSON.stringify(currentTei?.lastSaved),
  ]);
};

export default useImmunizationRule;
