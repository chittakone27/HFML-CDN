import useTrackerCaptureStore from "@/state/trackerCapture";
import useCurrentEvent from "@/ui/TrackerCapture/EventForm/useCurrentEvent";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { add, format, differenceInMonths } from "date-fns";
import { useTranslation } from "react-i18next";
import { GROWTH_MONITORING } from "./const";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";

const useRules = () => {
  const { t } = useTranslation();
  const defaultProps = {
    dueDate: { hidden: false },
    hqWt2N0rj6x: {
      helpers: [
        {
          type: "WARNING",
          value: t("physicalExaminationHelper")
        }
      ]
    },
    dmBgyPOee8y: {
      hidden: true
    },
    uoKJZliHVhB: {
      hidden: true
    },
    q69QvoUaR2U: {
      disabled: false
    },
    q69QvoUaR2U: {
      disabled: false
    },
    IygGcvxKP4J: { endAdornment: t("cm") },
    e7Cv9Dv0Hpr: { endAdornment: t("kg") },
    yUPDYAbD3w4: { endAdornment: t("cm"), backgroundColor: "" },
    NtnqZYgVfZ5: {},
    PJV46iCxgQl: {
      disabled: true

      // endAdornment: t("months")
    },
    D4mq9u2Su2P: {},
    uoHZEBmIVkd: { hidden: false },
    SYGlg3zTINN: { hidden: false },
    eXgCO34QypV: {
      disabled: true,
      backgroundColor: "",
      color: ""
    }, // Weight for age (Correct) - Underweight
    J2sDxcMfht1: { disabled: true, backgroundColor: "", color: "" }, // Height for age (Correct) - Stunting
    QppFJG84N4H: { disabled: true, backgroundColor: "", color: "" }, // Weight for height (Correct)- Wasting
    rWQgHzlRxnr: { backgroundColor: "", helpers: [], color: "" }, // Weight for age (Report) - Underweight
    nbjCuxRtsYm: { backgroundColor: "", helpers: [], color: "" }, // Height for age (Report) - Stunting
    cMhs6WKOp5f: { backgroundColor: "", helpers: [], color: "" }, // Weight for height (Report)- Wasting
    vMzWRRRJyN3: {
      hidden: false
    },
    RihAFC2saGE: {
      customBooleanKey: {
        true: "poorAppetiteTrue",
        false: "poorAppetiteFalse"
      }
    },
    hiddenSections: []
  };
  const bgColor = {
    green: "#99CC01",
    yellow: "#FFCC01",
    orange: "#FF6500",
    red: "#7F0000"
  };
  const { data, layout, actions, setLayout } = useTrackerCaptureStore(
    (state) => ({
      data: state.data,
      layout: state.layout,
      actions: state.actions,
      setLayout: state.actions.setLayout
    }),
    shallow
  );
  const { changeEventProperty, changeDataValue } = actions;
  const { currentTei, currentEvents } = data;
  const { currentEvent, currentProgramStage } = useCurrentEvent();
  const { optionSets } = useMetadataStore((state) => ({ optionSets: state.optionSets }), shallow);

  const [props, setProps] = useState(defaultProps);
  const dataValues = currentEvent.dataValues.reduce((prev, current) => {
    prev[current.dataElement] = current.value;
    return prev;
  }, {});

  const foundAgeAttribute = currentTei.attributes.find((attr) => attr.attribute === "tQeFLjYbqzv");

  const foundGenderAttribute = currentTei.attributes.find((attr) => attr.attribute === "DmuazFb368B");
  const currentGender = foundGenderAttribute?.value;

  useEffect(() => {
    if (currentEvent.eventDate) {
      let dueDate = "";
      if (dataValues.NtnqZYgVfZ5 === "Enrollment - OPD") {
        dueDate = format(add(new Date(currentEvent.eventDate), { weeks: 2 }), "yyyy-MM-dd");
      } else if (dataValues.NtnqZYgVfZ5 === "Enrollment - IPD") {
        dueDate = format(add(new Date(currentEvent.eventDate), { days: 1 }), "yyyy-MM-dd");
      } else {
        dueDate = currentEvent.eventDate;
      }
      changeEventProperty(currentEvent.event, "dueDate", dueDate);
    }
  }, [dataValues.NtnqZYgVfZ5, currentEvent.eventDate]);

  //HIDE SECTIONS BASED ON TYPE OF VISIT
  useEffect(() => {
    const typeOfVisit = dataValues.NtnqZYgVfZ5;
    let currentHiddenSections = [];
    if (!dataValues.NtnqZYgVfZ5 || !currentEvent.eventDate) {
      currentHiddenSections = ["bUMlHtmQM4Y", "kptYuOwRg1I", "CbL573ZmZgk", "NRZukngmTf6", "XYLBTuFJMw4"];
    }
    props.dueDate.hidden = false;
    switch (typeOfVisit) {
      case "Enrollment - OPD":
      case "Enrollment - IPD":
        props.PJV46iCxgQl.customLabel = t("admissionChildAge");
        currentHiddenSections.push("NRZukngmTf6");
        currentHiddenSections.push("bUMlHtmQM4Y");
        break;
      case "Follow-up - OPD":
      case "Follow-up - IPD":
        props.PJV46iCxgQl.customLabel = t("visitChildAge");
        currentHiddenSections.push("NRZukngmTf6");
        currentHiddenSections.push("bUMlHtmQM4Y");
        break;
      case "Complete":
        props.PJV46iCxgQl.customLabel = t("dischargeChildAge");
        props.dueDate.hidden = true;
        currentHiddenSections.push("CbL573ZmZgk");
        break;
    }

    let hideEnrollmentIpdOption = false;
    let hideEnrollmentOpdOption = false;
    let hideFollowUpIpdOption = false;
    let hideFollowUpOpdOption = false;
    let hideCompleteOption = false;

    // currentEvents.forEach((event) => {
    //   const foundEnrollmentDataValue = event.dataValues.find((dv) => dv.dataElement === "NtnqZYgVfZ5" && dv.value === "1");
    //   const foundCompleteDataValue = event.dataValues.find((dv) => dv.dataElement === "NtnqZYgVfZ5" && dv.value === "3");
    //   if (event.event !== currentEvent.event && foundEnrollmentDataValue) {
    //     hideEnrollmentOption = true;
    //   }
    //   if (event.event !== currentEvent.event && foundCompleteDataValue) {
    //     hideCompleteOption = true;
    //   }
    // });

    let hiddenOptions = [];
    const currentEventIndex = currentEvents.findIndex((ce) => {
      return ce.event === currentEvent.event;
    });
    if (currentEvents.length === 1 || currentEventIndex === 0) {
      hideCompleteOption = true;
      hideFollowUpIpdOption = true;
      hideFollowUpOpdOption = true;
    } else {
      const previousEventIndex = currentEventIndex - 1;
      const previousEvent = currentEvents[previousEventIndex];
      const foundTypeOfVisit = previousEvent.dataValues.find((dv) => dv.dataElement === "NtnqZYgVfZ5");
      if (foundTypeOfVisit) {
        switch (foundTypeOfVisit.value) {
          case "Enrollment - OPD":
            hideFollowUpIpdOption = true;
            // hideCompleteOption = true;
            break;
          case "Enrollment - IPD":
            hideFollowUpOpdOption = true;
            // hideCompleteOption = true;
            break;
          case "Follow-up - OPD":
            hideFollowUpIpdOption = true;
            hideEnrollmentOpdOption = true;
            break;
          case "Follow-up - IPD":
            hideFollowUpOpdOption = true;
            hideEnrollmentIpdOption = true;
            break;
          case "Complete":
            hideFollowUpOpdOption = true;
            hideFollowUpIpdOption = true;
            hideCompleteOption = true;
            break;
        }
      }
    }
    if (hideEnrollmentIpdOption) {
      hiddenOptions.push("Enrollment - IPD");
    }
    if (hideEnrollmentOpdOption) {
      hiddenOptions.push("Enrollment - OPD");
    }
    if (hideFollowUpOpdOption) {
      hiddenOptions.push("Follow-up - OPD");
    }
    if (hideFollowUpIpdOption) {
      hiddenOptions.push("Follow-up - IPD");
    }
    if (hideCompleteOption) {
      hiddenOptions.push("Complete");
    }
    props.NtnqZYgVfZ5.hiddenOptions = hiddenOptions;
    props.hiddenSections = currentHiddenSections;
    setProps({ ...props });
  }, [dataValues.NtnqZYgVfZ5, currentEvent.eventDate, currentEvent.event]);

  useEffect(() => {
    const typeOfFood = dataValues.q69QvoUaR2U;
    switch (typeOfFood) {
      case "2":
      case "3":
        props.D4mq9u2Su2P.endAdornment = t("gram");
        break;
      case "1":
      case "4":
        props.D4mq9u2Su2P.endAdornment = t("bags");
        break;
    }
    setProps({ ...props });
  }, [dataValues.q69QvoUaR2U]);

  useEffect(() => {
    if (foundAgeAttribute.value && currentEvent.eventDate) {
      const age = differenceInMonths(new Date(currentEvent.eventDate), new Date(foundAgeAttribute.value));
      if (age > 24) {
        props.vMzWRRRJyN3.hidden = true;
        changeDataValue(currentEvent.event, "vMzWRRRJyN3", "");
      } else {
        props.vMzWRRRJyN3.hidden = false;
      }
      changeDataValue(currentEvent.event, "PJV46iCxgQl", age + "");
      setProps({ ...props });
    }
  }, [foundAgeAttribute ? foundAgeAttribute.value : "", currentEvent.eventDate]);

  useEffect(() => {
    if (dataValues.VyN7MkSnSVP !== "Referred to other hospital") {
      props.uoKJZliHVhB.hidden = true;
      props.dmBgyPOee8y.hidden = true;
      changeDataValue(currentEvent.event, "uoKJZliHVhB", "");
      changeDataValue(currentEvent.event, "dmBgyPOee8y", "");
    } else {
      props.uoKJZliHVhB.hidden = false;
      props.dmBgyPOee8y.hidden = false;
    }
    setProps({ ...props });
  }, [dataValues.VyN7MkSnSVP]);

  const getOptionSetCodes = (optionSetId) => {
    return optionSets.find((e) => e.id === optionSetId).options;
  };

  //NUTRITION ANALYSIS CALCULATION
  useEffect(() => {
    const optionSetsStunting = getOptionSetCodes("xhBUz6EMsxB");
    const optionSetsUnderweight = getOptionSetCodes("e6poGaslbYm");
    const optionSetsWasting = getOptionSetCodes("XQPuI9j4Xh6");

    const statusAnalysis = {
      underweight: "",
      stunting: "",
      wasting: ""
    };

    const {
      PJV46iCxgQl: months,
      e7Cv9Dv0Hpr: weight,
      IygGcvxKP4J: height,
      yUPDYAbD3w4: MUAC,
      rWQgHzlRxnr, //(Report) - Underweight
      cMhs6WKOp5f, // (Report)- Wasting
      nbjCuxRtsYm, // (Report) - Stunting
      eXgCO34QypV, // (Correct) - Underweight
      QppFJG84N4H, // (Correct)- Wasting
      J2sDxcMfht1 // (Correct) - Stunting
    } = dataValues;

    const sdMapping = currentGender === "F" ? GROWTH_MONITORING.female : currentGender === "M" ? GROWTH_MONITORING.male : {};

    const handleValue = (value, maxAllowed, fieldId) => {
      const parsedValue = parseFloat(value);
      if (parsedValue > maxAllowed) {
        changeDataValue(currentEvent.event, fieldId, maxAllowed.toString());
      }
      const parts = value.split(".");
      if (parts.length === 2 && parts[1].length > 1) {
        parts[1] = parts[1].charAt(0);
        changeDataValue(currentEvent.event, fieldId, parts.join("."));
      }
    };

    const maxWeight = 50;
    const maxHeight = 150;

    weight && handleValue(weight, maxWeight, "e7Cv9Dv0Hpr");
    height && handleValue(height, maxHeight, "IygGcvxKP4J");

    const muac = parseFloat(MUAC);

    if (muac > 50) {
      changeDataValue(currentEvent.event, "yUPDYAbD3w4", "50"); // MUAC
    }

    // if (muac < 11.5) {
    //   props.yUPDYAbD3w4.backgroundColor = bgColor.red;
    //   //red
    // } else if (muac >= 11.5 && muac <= 12.5) {
    //   props.yUPDYAbD3w4.backgroundColor = bgColor.yellow;
    //   //yellow
    // } else if (muac > 12.5) {
    //   props.yUPDYAbD3w4.backgroundColor = bgColor.green;
    //   //green
    // } else {
    //   props.yUPDYAbD3w4.backgroundColor = "";
    // }

    // if (weight?.includes(".") && weight?.endsWith(".")) {
    //   changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", parseFloat(weight).toFixed(1));
    // }

    if (Object.keys(sdMapping).length !== 0) {
      //underweight
      if (rWQgHzlRxnr && months && weight) {
        const weightToAge = sdMapping.weightToAge;
        const weightByMonths = {};

        for (const sd in weightToAge) {
          const entries = weightToAge[sd];
          const entryWithMonths = entries.find((entry) => entry.months == months);
          if (entryWithMonths) {
            weightByMonths[sd] = entryWithMonths.weight;
          }
        }

        if (weight >= weightByMonths["-2SD"]) {
          statusAnalysis.underweight = optionSetsUnderweight.find((e) => e.code === "Over or equal to -2 SD").code;
          props.eXgCO34QypV.backgroundColor = bgColor.green;
          props.eXgCO34QypV.color = "#000";
        } else if (weight < weightByMonths["-2SD"] && weight >= weightByMonths["-3SD"]) {
          statusAnalysis.underweight = optionSetsUnderweight.find((e) => e.code === "Below -2 to -3 SD").code;
          props.eXgCO34QypV.backgroundColor = bgColor.yellow;
          props.eXgCO34QypV.color = "#000";
        } else if (weight < weightByMonths["-3SD"]) {
          statusAnalysis.underweight = optionSetsUnderweight.find((e) => e.code === "Below -3 SD").code;
          props.eXgCO34QypV.backgroundColor = bgColor.red;
          props.eXgCO34QypV.color = "#FFF !important";
        } else {
          props.eXgCO34QypV.backgroundColor = "";
        }

        changeDataValue(currentEvent.event, "eXgCO34QypV", statusAnalysis.underweight); //underweight
      } else {
        changeDataValue(currentEvent.event, "eXgCO34QypV", "");
        props.eXgCO34QypV.backgroundColor = "";
      }

      //stunting
      if (nbjCuxRtsYm && months && height) {
        const heightToAge = sdMapping.heightToAge;
        const heightByMonths = {};
        for (const sd in heightToAge) {
          const entries = heightToAge[sd];
          const entryWithMonths = entries.find((entry) => entry.months == months);
          if (entryWithMonths) {
            heightByMonths[sd] = entryWithMonths.height;
          }
        }
        if (height >= heightByMonths["-2SD"]) {
          statusAnalysis.stunting = optionSetsStunting.find((e) => e.code === "Over or equal to -2 SD").code;
          props.J2sDxcMfht1.backgroundColor = bgColor.green;
          props.J2sDxcMfht1.color = "#000";
        } else if (height < heightByMonths["-2SD"] && height >= heightByMonths["-3SD"]) {
          statusAnalysis.stunting = optionSetsStunting.find((e) => e.code === "Below -2 to -3 SD").code;
          props.J2sDxcMfht1.backgroundColor = bgColor.yellow;
          props.J2sDxcMfht1.color = "#000";
        } else if (height < heightByMonths["-3SD"]) {
          statusAnalysis.stunting = optionSetsStunting.find((e) => e.code === "Below -3 SD").code;
          props.J2sDxcMfht1.backgroundColor = bgColor.red;
          props.J2sDxcMfht1.color = "#FFF !important";
        } else {
          props.J2sDxcMfht1.backgroundColor = "";
        }

        changeDataValue(currentEvent.event, "J2sDxcMfht1", statusAnalysis.stunting); //stunting
      } else {
        changeDataValue(currentEvent.event, "J2sDxcMfht1", "");
        props.J2sDxcMfht1.backgroundColor = "";
      }
      //wasting
      if (cMhs6WKOp5f && height && weight && months) {
        let weightToHeight = {};
        let weightByHeight = {};
        const customRound = (number) => {
          if (number % 1 === 0.5) {
            return number;
          } else if (number % 1 < 0.5) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        };

        if (months <= 24) {
          weightToHeight = sdMapping.weightToHeight["0to2"];
        } else if (months > 24 && months <= 120) {
          weightToHeight = sdMapping.weightToHeight["2to5"];
        }

        for (const sd in weightToHeight) {
          const entries = weightToHeight[sd];
          const entryWithHeight = entries.find((entry) => entry.height == customRound(height));
          if (entryWithHeight) {
            weightByHeight[sd] = entryWithHeight.weight;
          }
        }
        props.QppFJG84N4H.helpers = [
          {
            type: "WARNING",
            value: ""
          }
        ];

        if (weight >= weightByHeight["3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Over +3SD (Obese)").code;
          props.QppFJG84N4H.backgroundColor = bgColor.red;
          props.QppFJG84N4H.color = "#FFF !important";
        } else if (weight < weightByHeight["3SD"] && weight >= weightByHeight["2SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Over +2 to +3SD (overweight)").code;
          props.QppFJG84N4H.backgroundColor = bgColor.orange;
          props.QppFJG84N4H.color = "#000";
        } else if (weight < weightByHeight["2SD"] && weight >= weightByHeight["1SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "More than +1 to +2 SD").code;
          props.QppFJG84N4H.backgroundColor = bgColor.yellow;
          props.QppFJG84N4H.color = "#000";
        } else if (weight < weightByHeight["1SD"] && weight >= weightByHeight["-1SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Between -1 to + 1 SD").code;
          props.QppFJG84N4H.backgroundColor = bgColor.green;
          props.QppFJG84N4H.color = "#000";
        } else if (weight < weightByHeight["-1SD"] && weight >= weightByHeight["-2SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -1 to -2 SD").code;
          props.QppFJG84N4H.backgroundColor = bgColor.yellow;
          props.QppFJG84N4H.color = "#000";
        } else if (weight < weightByHeight["-2SD"] && weight >= weightByHeight["-3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -2 to -3SD (MAM)").code;
          props.QppFJG84N4H.backgroundColor = bgColor.orange;
          props.QppFJG84N4H.color = "#000";
        } else if (weight < weightByHeight["-3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -3SD (SAM)").code;
          props.QppFJG84N4H.backgroundColor = bgColor.red;
          props.QppFJG84N4H.color = "#FFF !important";
        } else {
          props.QppFJG84N4H.backgroundColor = "";
          props.QppFJG84N4H.helpers = [
            {
              type: "WARNING",
              value: ""
            }
          ];
        }
        changeDataValue(currentEvent.event, "QppFJG84N4H", statusAnalysis.wasting); //wasting
      } else {
        changeDataValue(currentEvent.event, "QppFJG84N4H", "");
        props.QppFJG84N4H.backgroundColor = "";
        props.QppFJG84N4H.helpers = [
          {
            type: "WARNING",
            value: ""
          }
        ];
      }
    }

    const updateUnderweightStatus = () => {
      if (rWQgHzlRxnr) {
        if (rWQgHzlRxnr === "Over or equal to -2 SD") {
          props.rWQgHzlRxnr.backgroundColor = bgColor.green;
          props.rWQgHzlRxnr.color = "#000";
        } else if (rWQgHzlRxnr === "Below -2 to -3 SD") {
          props.rWQgHzlRxnr.backgroundColor = bgColor.yellow;
          props.rWQgHzlRxnr.color = "#000";
        } else if (rWQgHzlRxnr === "Below -3 SD") {
          props.rWQgHzlRxnr.backgroundColor = bgColor.red;
          props.rWQgHzlRxnr.color = "#FFF !important";
        } else if (rWQgHzlRxnr === "Lost follow up") {
          changeDataValue(currentEvent.event, "eXgCO34QypV", "Lost follow up");
          props.eXgCO34QypV.backgroundColor = "";
          props.eXgCO34QypV.color = "#000";
          props.rWQgHzlRxnr.color = "#000";
          props.rWQgHzlRxnr.backgroundColor = "";
        }

        if (rWQgHzlRxnr !== eXgCO34QypV) {
          props.rWQgHzlRxnr.helpers = [
            {
              type: "WARNING",
              value: ""
            }
          ];
        } else {
          props.rWQgHzlRxnr.helpers = [];
        }
      } else {
        props.rWQgHzlRxnr.helpers = [];
        props.eXgCO34QypV.helpers = [];
        props.rWQgHzlRxnr.backgroundColor = "";
        props.eXgCO34QypV.backgroundColor = "";
      }
    };

    const updateWastingStatus = () => {
      if (cMhs6WKOp5f) {
        if (cMhs6WKOp5f === "Over +2 to +3SD (overweight)" || cMhs6WKOp5f === "less than -2 to -3SD (MAM)") {
          props.cMhs6WKOp5f.backgroundColor = bgColor.orange;
          props.cMhs6WKOp5f.color = "#000";
        } else if (cMhs6WKOp5f === "More than +1 to +2 SD" || cMhs6WKOp5f === "less than -1 to -2 SD") {
          props.cMhs6WKOp5f.backgroundColor = bgColor.yellow;
          props.cMhs6WKOp5f.color = "#000";
        } else if (cMhs6WKOp5f === "Over +3SD (Obese)" || cMhs6WKOp5f === "less than -3SD (SAM)") {
          props.cMhs6WKOp5f.backgroundColor = bgColor.red;
          props.cMhs6WKOp5f.color = "#FFF !important";
        } else if (cMhs6WKOp5f === "Between -1 to + 1 SD") {
          props.cMhs6WKOp5f.backgroundColor = bgColor.green;
          props.cMhs6WKOp5f.color = "#000";
        } else if (cMhs6WKOp5f === "Lost follow up") {
          changeDataValue(currentEvent.event, "QppFJG84N4H", "Lost follow up");
          props.QppFJG84N4H.backgroundColor = "";
          props.QppFJG84N4H.color = "#000";
          props.cMhs6WKOp5f.color = "#000";
          props.cMhs6WKOp5f.backgroundColor = "";
        }

        if (cMhs6WKOp5f !== QppFJG84N4H) {
          props.cMhs6WKOp5f.helpers = [
            {
              type: "WARNING",
              value: t("reportWastingStatusIsNotCorrect")
            }
          ];
        } else {
          props.cMhs6WKOp5f.helpers = [];
        }
      } else {
        props.cMhs6WKOp5f.helpers = [];
        props.cMhs6WKOp5f.backgroundColor = "";
      }
    };

    const updateStuntingStatus = () => {
      if (nbjCuxRtsYm) {
        if (nbjCuxRtsYm === "Over or equal to -2 SD") {
          props.nbjCuxRtsYm.backgroundColor = bgColor.green;
          props.nbjCuxRtsYm.color = "#000";
        } else if (nbjCuxRtsYm === "Below -2 to -3 SD") {
          props.nbjCuxRtsYm.backgroundColor = bgColor.yellow;
          props.nbjCuxRtsYm.color = "#000";
        } else if (nbjCuxRtsYm === "Below -3 SD") {
          props.nbjCuxRtsYm.backgroundColor = bgColor.red;
          props.nbjCuxRtsYm.color = "#FFF !important";
        } else if (nbjCuxRtsYm === "Lost follow up") {
          changeDataValue(currentEvent.event, "J2sDxcMfht1", "Lost follow up");
          props.J2sDxcMfht1.backgroundColor = "";
          props.J2sDxcMfht1.color = "#000";
          props.nbjCuxRtsYm.backgroundColor = "";
          props.nbjCuxRtsYm.color = "#000";
        }

        if (nbjCuxRtsYm !== J2sDxcMfht1) {
          props.nbjCuxRtsYm.helpers = [
            {
              type: "WARNING",
              value: t("reportStuntingStatusIsNotCorrect")
            }
          ];
        } else {
          props.nbjCuxRtsYm.helpers = [];
        }
      } else {
        props.nbjCuxRtsYm.helpers = [];
        props.nbjCuxRtsYm.backgroundColor = "";
      }
    };

    updateUnderweightStatus();
    updateWastingStatus();
    updateStuntingStatus();
    setProps({ ...props });
  }, [
    foundGenderAttribute?.value, //gender
    dataValues.PJV46iCxgQl, // Age
    dataValues.e7Cv9Dv0Hpr, //weight
    dataValues.IygGcvxKP4J, //Height,
    dataValues.yUPDYAbD3w4, //MUAC,
    dataValues.rWQgHzlRxnr, //(Report) - Underweight
    dataValues.cMhs6WKOp5f, // (Report)- Wasting
    dataValues.nbjCuxRtsYm // (Report) - Stunting
  ]);

  useEffect(() => {
    const {
      rWQgHzlRxnr, //(Report) - Underweight
      cMhs6WKOp5f, // (Report)- Wasting
      nbjCuxRtsYm, // (Report) - Stunting
      eXgCO34QypV, // (Correct) - Underweight
      QppFJG84N4H, // (Correct)- Wasting
      J2sDxcMfht1 // (Correct) - Stunting
    } = dataValues;
    if (rWQgHzlRxnr && eXgCO34QypV && rWQgHzlRxnr !== eXgCO34QypV) {
      props.rWQgHzlRxnr.helpers = [
        {
          type: "WARNING",
          value: t("reportUnderweightStatusIsNotCorrect")
        }
      ];
    } else {
      props.rWQgHzlRxnr.helpers = [];
    }

    if (nbjCuxRtsYm && J2sDxcMfht1 && nbjCuxRtsYm !== J2sDxcMfht1) {
      props.nbjCuxRtsYm.helpers = [
        {
          type: "WARNING",
          value: t("reportStuntingStatusIsNotCorrect")
        }
      ];
    } else {
      props.nbjCuxRtsYm.helpers = [];
    }
    if (cMhs6WKOp5f && QppFJG84N4H && cMhs6WKOp5f !== QppFJG84N4H) {
      props.cMhs6WKOp5f.helpers = [
        {
          type: "WARNING",
          value: t("reportWastingStatusIsNotCorrect")
        }
      ];
    } else {
      props.cMhs6WKOp5f.helpers = [];
    }
    setProps({ ...props });
  }, [
    dataValues.eXgCO34QypV,
    dataValues.J2sDxcMfht1,
    dataValues.QppFJG84N4H,
    dataValues.rWQgHzlRxnr,
    dataValues.cMhs6WKOp5f,
    dataValues.nbjCuxRtsYm
  ]);

  //AUTO ASSIGN RUTF IF TYPE OF VISIT = OPD
  useEffect(() => {
    if (dataValues.NtnqZYgVfZ5 && dataValues.NtnqZYgVfZ5.includes("OPD")) {
      changeDataValue(currentEvent.event, "q69QvoUaR2U", "4");
      props.q69QvoUaR2U.disabled = true;
    } else {
      props.q69QvoUaR2U.disabled = false;
    }
    setProps({ ...props });
  }, [dataValues.NtnqZYgVfZ5]);

  //Disable Complete button if treatment out come = Ref to other hospital and Hospital which the child is transferred to is null

  useEffect(() => {
    if (dataValues.VyN7MkSnSVP === "Referred to other hospital" && !dataValues.uoKJZliHVhB) {
      setLayout("disableCompleteButton", true);
    } else {
      setLayout("disableCompleteButton", false);
    }
    setProps({ ...props });
  }, [dataValues.VyN7MkSnSVP, dataValues.uoKJZliHVhB]);

  //Disable complete button if type of visit is Complete and Treatment outcome is null
  useEffect(() => {
    if (dataValues.NtnqZYgVfZ5 === "Complete" && !dataValues.VyN7MkSnSVP) {
      setLayout("disableCompleteButton", true);
    } else {
      setLayout("disableCompleteButton", false);
    }
    setProps({ ...props });
  }, [dataValues.NtnqZYgVfZ5, dataValues.VyN7MkSnSVP]);

  //Hide Child is breastfed if age in months > 24

  // useEffect(() => {
  //   const ageInMonths =
  // }, [foundAgeAttribute ? foundAgeAttribute.value : null]);

  // When the user chooses the treatment outcome option set as 'Non-response' the system should disable all fields in the 'Child Growth Monitoring' and 'Child Nutritional Status Analysis' sections. For mandatory fields such as 'Weight,' 'Height,' and 'MUAC,' please automatically input the value '0' after choose "Non-response".

  // useEffect(() => {
  //   if (dataValues.VyN7MkSnSVP === "Non-response") {
  //     props.e7Cv9Dv0Hpr.disabled = true;
  //     props.IygGcvxKP4J.disabled = true;
  //     props.yUPDYAbD3w4.disabled = true;
  //     props.rWQgHzlRxnr.disabled = true;
  //     props.cMhs6WKOp5f.disabled = true;
  //     props.nbjCuxRtsYm.disabled = true;
  //     changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "0");
  //     changeDataValue(currentEvent.event, "IygGcvxKP4J", "0");
  //     changeDataValue(currentEvent.event, "yUPDYAbD3w4", "0");
  //     changeDataValue(currentEvent.event, "rWQgHzlRxnr", "Lost follow up");
  //     changeDataValue(currentEvent.event, "cMhs6WKOp5f", "Lost follow up");
  //     changeDataValue(currentEvent.event, "nbjCuxRtsYm", "Lost follow up");
  //   } else {
  //     props.e7Cv9Dv0Hpr.disabled = false;
  //     props.IygGcvxKP4J.disabled = false;
  //     props.yUPDYAbD3w4.disabled = false;
  //     props.rWQgHzlRxnr.disabled = false;
  //     props.cMhs6WKOp5f.disabled = false;
  //     props.nbjCuxRtsYm.disabled = false;
  //     if (dataValues.e7Cv9Dv0Hpr === "0") {
  //       changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "");
  //     }
  //     if (dataValues.IygGcvxKP4J === "0") {
  //       changeDataValue(currentEvent.event, "IygGcvxKP4J", "");
  //     }
  //     if (dataValues.yUPDYAbD3w4 === "0") {
  //       changeDataValue(currentEvent.event, "yUPDYAbD3w4", "");
  //     }
  //     changeDataValue(currentEvent.event, "rWQgHzlRxnr", "");
  //     changeDataValue(currentEvent.event, "cMhs6WKOp5f", "");
  //     changeDataValue(currentEvent.event, "nbjCuxRtsYm", "");
  //     changeDataValue(currentEvent.event, "eXgCO34QypV", "");
  //     changeDataValue(currentEvent.event, "J2sDxcMfht1", "");
  //     changeDataValue(currentEvent.event, "QppFJG84N4H", "");
  //   }
  //   setProps({ ...props });
  // }, [dataValues.VyN7MkSnSVP]);

  useEffect(() => {
    if (dataValues.VyN7MkSnSVP) {
      const events = _.sortBy(currentEvents, "eventDate").reverse();
      const currentIndex = events.findIndex((ev) => ev.event === currentEvent.event);
      const index = currentIndex + 1;
      const previousEvent = events[index];
      const dataElements = ["e7Cv9Dv0Hpr", "IygGcvxKP4J", "yUPDYAbD3w4", "rWQgHzlRxnr", "cMhs6WKOp5f", "nbjCuxRtsYm"];
      if (!previousEvent) {
        return;
      }
      dataElements.forEach((de) => {
        const foundDataValue = previousEvent.dataValues.find((dv) => dv.dataElement === de);
        props[de].disabled = true;
        if (foundDataValue) {
          changeDataValue(currentEvent.event, de, foundDataValue ? foundDataValue.value : "");
        }
      });
      // props.e7Cv9Dv0Hpr.disabled = true;
      // props.IygGcvxKP4J.disabled = true;
      // props.yUPDYAbD3w4.disabled = true;
      // props.rWQgHzlRxnr.disabled = true;
      // props.cMhs6WKOp5f.disabled = true;
      // props.nbjCuxRtsYm.disabled = true;
      // changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "0");
      // changeDataValue(currentEvent.event, "IygGcvxKP4J", "0");
      // changeDataValue(currentEvent.event, "yUPDYAbD3w4", "0");
      // changeDataValue(currentEvent.event, "rWQgHzlRxnr", "Lost follow up");
      // changeDataValue(currentEvent.event, "cMhs6WKOp5f", "Lost follow up");
      // changeDataValue(currentEvent.event, "nbjCuxRtsYm", "Lost follow up");
    }
    setProps({ ...props });
  }, [dataValues.VyN7MkSnSVP]);

  return props;
};

export default useRules;
