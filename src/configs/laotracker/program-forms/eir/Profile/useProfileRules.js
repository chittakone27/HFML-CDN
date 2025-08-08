import { useEffect, useState } from "react";
import { convertListToObj } from "@/configs/lao/program-forms/common/tracker";
import moment from "moment";
import _ from "lodash";

import useTrackerCaptureStore from "@/state/trackerCapture";
import { ALL_VACCINE, DATA_ELEMENT_IDS } from "../Immunization/constants";
import { tracker } from "@/api";
import { useShallow } from "zustand/react/shallow";
const { saveTei } = tracker;
import { pull } from "@/utils/fetch";
import { format } from "date-fns";
const useProfileRules = () => {
  const { data, actions } = useTrackerCaptureStore(useShallow((state) => ({ data: state.data, actions: state.actions })));
  const { currentTei, currentEvents, currentEnrollment } = data;
  const { changeAttributeValue, setLayout } = actions;
  const { enrollmentDate } = currentEnrollment;
  const attributes = currentTei ? convertListToObj(currentTei.attributes, "attribute", "value") : {};
  const nationality = attributes["uR9XK6AbPvE"];
  const dob = attributes["tQeFLjYbqzv"];
  const [missingVillage, setMissingVillage] = useState(false);
  const [hiddenAttributes, setHiddenAttributes] = useState([
    "oPKsfqS64oE",
    "r8bZppSsIvR",
    "oVwa5LfjnvA",
    "UNiaP6Oz7Mv",
    "M41B0OLdXww",
    "IdwH3mwSy2o",
    "WiuXRd1B6Wu",
    "zf7F68AsXEH",
    "qFFDE1Aud9N"
  ]);

  const isGiven = (dataElement) => {
    let given = false;
    currentEvents.forEach((ev) => {
      ev.dataValues.forEach((de) => {
        if (de.dataElement === dataElement && de.value === "true") {
          given = true;
        }
      });
    });

    return given;
  };

  useEffect(() => {
    if (dob) {
      const dateOfBirth = moment(dob.slice(0, 10));
      const enrDateConverted = moment(enrollmentDate.slice(0, 10));
      changeAttributeValue("vJdG29KW1Et", enrDateConverted.diff(dateOfBirth, "months") + "");
    }
  }, [dob, enrollmentDate]);

  useEffect(() => {
    (async () => {
      const dates = currentEvents.filter((ce) => ce.programStage === "hCTTxOH8FOa").map((ce) => ce.eventDate);
      const sortedDates = _.compact(dates.sort().reverse());
      const latestVaccinationDate = sortedDates[0];

      if (attributes.zf7F68AsXEH !== latestVaccinationDate) {
        changeAttributeValue("zf7F68AsXEH", latestVaccinationDate);
        const clonedTei = _.cloneDeep(currentTei);
        const foundAttribute = clonedTei.attributes.find((attr) => attr.attribute === "zf7F68AsXEH");
        if (foundAttribute) {
          foundAttribute.value = latestVaccinationDate;
        } else {
          clonedTei.attributes.push({
            attribute: "zf7F68AsXEH",
            value: format(new Date(latestVaccinationDate), "yyyy-MM-dd")
          });
        }
        await saveTei(clonedTei);
        await pull(`/api/routes/chr/run?work=update&tei=${clonedTei.trackedEntityInstance}`);
      }
    })();
  }, [currentEvents.map((ce) => ce.eventDate).join(";")]);

  useEffect(() => {
    if (!nationality) changeAttributeValue("uR9XK6AbPvE", "LA");
  }, []);

  // useEffect(() => {
  //   let fullImmunize = true;
  //   ALL_VACCINE.filter((id) => ![DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS, DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H].includes(id)).forEach((id) => {
  //     if (!isGiven(id)) fullImmunize = false;
  //   });
  //   if (!isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_24H) && !isGiven(DATA_ELEMENT_IDS.HEPB0_LESS_THAN_7DAYS)) fullImmunize = false;
  //   setLayout("disableEventCreateButton", fullImmunize);
  // }, [currentEvents]);

  useEffect(() => {
    const isForeigner = attributes.DtqYqC9Xr5Z;
    let currentHiddenAttributes = [...hiddenAttributes];
    if (isForeigner === "true") {
      currentHiddenAttributes.push("villageSelector");
      currentHiddenAttributes.push("GT2H7899zzl");
      setMissingVillage(false);
      // currentHiddenAttributes = currentHiddenAttributes.filter((attr) => attr !== "uR9XK6AbPvE");
      if (attributes["uR9XK6AbPvE"] === "LA") {
        changeAttributeValue("uR9XK6AbPvE", "");
      }
      changeAttributeValue("GT2H7899zzl", "");
      changeAttributeValue("r8bZppSsIvR", "");
      changeAttributeValue("oVwa5LfjnvA", "");
      changeAttributeValue("UNiaP6Oz7Mv", "");
    } else {
      currentHiddenAttributes = currentHiddenAttributes.filter((attr) => attr !== "villageSelector" && attr !== "GT2H7899zzl");
      // currentHiddenAttributes.push("uR9XK6AbPvE");
      // changeAttributeValue("uR9XK6AbPvE", "LA");
      if (!attributes.UNiaP6Oz7Mv) {
        setMissingVillage(true);
      } else {
        setMissingVillage(false);
      }
    }
    setHiddenAttributes(currentHiddenAttributes);
  }, [JSON.stringify(attributes)]);

  return { hiddenAttributes, missingVillage };
};

export default useProfileRules;
