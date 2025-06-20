import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import moment from "moment";
import _ from "lodash";

import {
  ALL_VACCINE,
  ATTRIBUTE_IDS,
  DATA_ELEMENT_IDS,
  IMMUNIZATION_STAGE_ID,
} from "./constants";
import {
  useEventRuleEffect,
  convertListToObj,
} from "@/configs/laotracker/program-forms/common/tracker";
import useTrackerCaptureStore from "@/state/trackerCapture";
import usePreviousEvents from "../../../common/usePreviousEvents";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { format } from "date-fns";
const useImmunizationRule = () => {
  const { t } = useTranslation();
  const [props, setProps] = useState({
    warnings: {},
    hiddenFields: {},
    assignations: {},
    disabledFields: {},
    hiddenOptions: {
      jzT9g1EzJLd: ["mass"],
    },
  });

  const { data, actions, customState } = useTrackerCaptureStore(
    useShallow((state) => ({
      data: state.data,
      actions: state.actions,
      customState: state.customState,
    }))
  );
  const { isEirVillage } = customState;
  const { currentTei, currentEvents, selectedEvent } = data;
  const { setLayout, changeEventProperty } = actions;
  const previousEvents = usePreviousEvents(IMMUNIZATION_STAGE_ID);
  const currentEvent = currentEvents.find((ev) => ev.event === selectedEvent);
  const eventDate = currentEvent?.eventDate;

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

  useEffect(() => {
    const warnings = {};
    const hiddenFields = {};
    const assignations = {};
    const disabledFields = {
      [DATA_ELEMENT_IDS.AGE_IN_WEEKS]: true,
      [DATA_ELEMENT_IDS.AGE_IN_MONTHS]: true,
    };

    let ageInMonth;
    const dob = attributes?.[ATTRIBUTE_IDS.DATE_OF_BIRTH];
    const sex = attributes?.[ATTRIBUTE_IDS.SEX];
    if (dob && eventDate) {
      //calculate age in month
      const convertDob = moment(dob, "YYYY-MM-DD");
      const convertEvDate = moment(eventDate, "YYYY-MM-DD");
      ageInMonth = convertEvDate.diff(convertDob, "months") + "";
      assignations[DATA_ELEMENT_IDS.AGE_IN_MONTHS] = ageInMonth;
      if (ageInMonth >= 12) hiddenFields[DATA_ELEMENT_IDS.BCG] = true;
      //calculate age in week
      const ageInWeek = convertEvDate.diff(convertDob, "weeks") + "";
      assignations[DATA_ELEMENT_IDS.AGE_IN_WEEKS] = ageInWeek;
      //If not given at birthday +1, show warning
      const ageInDay = convertEvDate.diff(convertDob, "days");
      if (
        ageInDay > 1 &&
        !isGiven(DATA_ELEMENT_IDS.BCG) &&
        !dataValues?.[DATA_ELEMENT_IDS.BCG]
      ) {
        warnings[DATA_ELEMENT_IDS.BCG] = t("bcgWarning");
      }
      if (
        ageInDay > 1 &&
        (!dataValues[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H] ||
          dataValues[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H] === "false")
      ) {
        hiddenFields[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H] = true;
      }
      if (
        ageInDay > 7 &&
        (!dataValues[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS] ||
          dataValues[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS] === "false")
      ) {
        hiddenFields[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS] = true;
      }
    }

    const pov = dataValues?.[DATA_ELEMENT_IDS.PLACE_OF_VACCINATION];
    if (pov !== "Provided in other facility")
      hiddenFields[DATA_ELEMENT_IDS.HEATH_FACILITY_NAME] = true;

    const hideIfGiven = (dataElement, extCondition) => {
      if (isGiven(dataElement) || extCondition + "" === "true")
        hiddenFields[dataElement] = true;
    };

    //hide HB0 > 7days if HB0 > 24h is checked
    if (dataValues?.[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H])
      hiddenFields[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS] = true;
    //hide HB0 > 24h if HB0 > 7days is checked
    if (dataValues?.[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS])
      hiddenFields[DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H] = true;

    //Full Immunize
    // const haveValue = (dataElement) => dataValues?.[dataElement] === "true";

    // const fullImmunize =
    //   (haveValue(DATA_ELEMENT_IDS.BCG) || isGiven(DATA_ELEMENT_IDS.BCG)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PENTA_3) || isGiven(DATA_ELEMENT_IDS.PENTA_3)) &&
    //   (haveValue(DATA_ELEMENT_IDS.EPI_12) || isGiven(DATA_ELEMENT_IDS.EPI_12)) &&
    //   (haveValue(DATA_ELEMENT_IDS.MR_1) || isGiven(DATA_ELEMENT_IDS.MR_1)) &&
    //   (haveValue(DATA_ELEMENT_IDS.JE) || isGiven(DATA_ELEMENT_IDS.JE)) &&
    //   (haveValue(DATA_ELEMENT_IDS.OPV_1) || isGiven(DATA_ELEMENT_IDS.OPV_1)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PENTA_1) || isGiven(DATA_ELEMENT_IDS.PENTA_1)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PENTA_2) || isGiven(DATA_ELEMENT_IDS.PENTA_2)) &&
    //   (haveValue(DATA_ELEMENT_IDS.OPV_2) || isGiven(DATA_ELEMENT_IDS.OPV_2)) &&
    //   (haveValue(DATA_ELEMENT_IDS.MR_2) || isGiven(DATA_ELEMENT_IDS.MR_2)) &&
    //   (haveValue(DATA_ELEMENT_IDS.OPV_3) || isGiven(DATA_ELEMENT_IDS.OPV_3)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PCV_3) || isGiven(DATA_ELEMENT_IDS.PCV_3)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PCV_1) || isGiven(DATA_ELEMENT_IDS.PCV_1)) &&
    //   (haveValue(DATA_ELEMENT_IDS.PCV_2) || isGiven(DATA_ELEMENT_IDS.PCV_2)) &&
    //   (haveValue(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS) ||
    //     isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS) ||
    //     haveValue(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H) ||
    //     isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H));

    // if (fullImmunize) props.assignations[DATA_ELEMENT_IDS.FULL_IMMUNIZATION] = "true";
    // if (!fullImmunize) props.assignations[DATA_ELEMENT_IDS.FULL_IMMUNIZATION] = "";

    //hide IPV2 before IPV1 is given
    if (
      !isGiven(DATA_ELEMENT_IDS.IPV_1) &&
      !dataValues?.[DATA_ELEMENT_IDS.IPV_1]
    )
      hiddenFields[DATA_ELEMENT_IDS.IPV_2] = true;

    //hide HPV if given or ageInMonth < 120 or sex = male
    if (isGiven(DATA_ELEMENT_IDS.HPV) || ageInMonth < 120 || sex === "M")
      hiddenFields[DATA_ELEMENT_IDS.HPV] = true;

    if (previousEvents?.length) {
      //Hide HB024 if ever given or HepB0 7 days is checked
      //Hide HepB0 < 7days if ever given or HepB0 <24hrs is checked
      hideIfGiven(
        DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H,
        isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS)
      );
      hideIfGiven(
        DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS,
        isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H)
      );
      hideIfGiven(DATA_ELEMENT_IDS.BCG);
      hideIfGiven(DATA_ELEMENT_IDS.PENTA_1);
      hideIfGiven(DATA_ELEMENT_IDS.PENTA_2);
      hideIfGiven(DATA_ELEMENT_IDS.PENTA_3);
      hideIfGiven(DATA_ELEMENT_IDS.EPI_12);
      hideIfGiven(DATA_ELEMENT_IDS.OPV_1);
      hideIfGiven(DATA_ELEMENT_IDS.OPV_2);
      hideIfGiven(DATA_ELEMENT_IDS.OPV_3);
      hideIfGiven(DATA_ELEMENT_IDS.PCV_1);
      hideIfGiven(DATA_ELEMENT_IDS.PCV_2);
      hideIfGiven(DATA_ELEMENT_IDS.PCV_3);
      hideIfGiven(DATA_ELEMENT_IDS.IPV_2);
      hideIfGiven(DATA_ELEMENT_IDS.MR_1);
      // hideIfGiven("kI35yRT54NZ");
      // hideIfGiven("u6ioEgMJf8j");

      //Hide JE if ever given or age less than 9 months
      hideIfGiven(DATA_ELEMENT_IDS.JE);
      hideIfGiven(DATA_ELEMENT_IDS.MR_2);
    }

    if (!pov) {
      ALL_VACCINE.forEach((id) => {
        disabledFields[id] = true;
        assignations[id] = "";
      });
    }

    let anyVaccineChecked = false;
    ALL_VACCINE.forEach((id) => {
      if (dataValues[id]) anyVaccineChecked = true;
    });

    if (!eventDate || !pov || !anyVaccineChecked || isEirVillage) {
      setLayout("disableEventCompleteButton", true);
    } else {
      setLayout("disableEventCompleteButton", false);
    }
    props.warnings = warnings;
    props.hiddenFields = hiddenFields;
    props.assignations = assignations;
    props.disabledFields = disabledFields;
    setProps({ ...props });
  }, [
    JSON.stringify(currentEvent),
    JSON.stringify(previousEvents),
    JSON.stringify(currentTei?.lastSaved),
  ]);

  useEffect(() => {
    // if (currentEvent && currentEvent.status === "SCHEDULE") {
    //   if (!currentEvent.eventDate) {
    //     changeEventProperty(currentEvent.event, "eventDate", format(new Date(currentEvent.dueDate), "yyyy-MM-dd"));
    //   }
    // }
  }, [currentEvent.event, currentEvent.status]);

  return props;
};

export default useImmunizationRule;
