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
    Zz9O49cuy46: {
      disabled: true,
      backgroundColor: "",
      color: ""
    }, // Weight for age (Correct) - Underweight
    xeq1S2MW3k6: { disabled: true, backgroundColor: "", color: "" }, // Height for age (Correct) - Stunting
    Dq08KjzUprN: { disabled: true, backgroundColor: "", color: "" }, // Weight for height (Correct)- Wasting
    ilW9kJRfEav: { backgroundColor: "", helpers: [], color: "" }, // Weight for age (Report) - Underweight
    d6ttFA1zrZB: { backgroundColor: "", helpers: [], color: "" }, // Height for age (Report) - Stunting
    zPlTaBgQtAM: { backgroundColor: "", helpers: [], color: "" }, // Weight for height (Report)- Wasting
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
      currentHiddenSections = ["G1bb5ndkTjQ", "CyUqrYwAmQx", "qpIeeJTDq3Q", "NRZukngmTf6", "ATezHnPZyln"];
    }
    props.dueDate.hidden = false;
    switch (typeOfVisit) {
      case "Enrollment - OPD":
      case "Enrollment - IPD":
        props.PJV46iCxgQl.customLabel = t("admissionChildAge");
        currentHiddenSections.push("NRZukngmTf6");
        currentHiddenSections.push("G1bb5ndkTjQ");
        break;
      case "Follow-up - OPD":
      case "Follow-up - IPD":
        props.PJV46iCxgQl.customLabel = t("visitChildAge");
        currentHiddenSections.push("NRZukngmTf6");
        currentHiddenSections.push("G1bb5ndkTjQ");
        break;
      case "Complete":
        props.PJV46iCxgQl.customLabel = t("dischargeChildAge");
        props.dueDate.hidden = true;
        currentHiddenSections.push("qpIeeJTDq3Q");
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
      ilW9kJRfEav, //(Report) - Underweight
      zPlTaBgQtAM, // (Report)- Wasting
      d6ttFA1zrZB, // (Report) - Stunting
      Zz9O49cuy46, // (Correct) - Underweight
      Dq08KjzUprN, // (Correct)- Wasting
      xeq1S2MW3k6 // (Correct) - Stunting
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
      if (ilW9kJRfEav && months && weight) {
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
          props.Zz9O49cuy46.backgroundColor = bgColor.green;
          props.Zz9O49cuy46.color = "#000";
        } else if (weight < weightByMonths["-2SD"] && weight >= weightByMonths["-3SD"]) {
          statusAnalysis.underweight = optionSetsUnderweight.find((e) => e.code === "Below -2 to -3 SD").code;
          props.Zz9O49cuy46.backgroundColor = bgColor.yellow;
          props.Zz9O49cuy46.color = "#000";
        } else if (weight < weightByMonths["-3SD"]) {
          statusAnalysis.underweight = optionSetsUnderweight.find((e) => e.code === "Below -3 SD").code;
          props.Zz9O49cuy46.backgroundColor = bgColor.red;
          props.Zz9O49cuy46.color = "#FFF !important";
        } else {
          props.Zz9O49cuy46.backgroundColor = "";
        }

        changeDataValue(currentEvent.event, "Zz9O49cuy46", statusAnalysis.underweight); //underweight
      } else {
        changeDataValue(currentEvent.event, "Zz9O49cuy46", "");
        props.Zz9O49cuy46.backgroundColor = "";
      }

      //stunting
      if (d6ttFA1zrZB && months && height) {
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
          props.xeq1S2MW3k6.backgroundColor = bgColor.green;
          props.xeq1S2MW3k6.color = "#000";
        } else if (height < heightByMonths["-2SD"] && height >= heightByMonths["-3SD"]) {
          statusAnalysis.stunting = optionSetsStunting.find((e) => e.code === "Below -2 to -3 SD").code;
          props.xeq1S2MW3k6.backgroundColor = bgColor.yellow;
          props.xeq1S2MW3k6.color = "#000";
        } else if (height < heightByMonths["-3SD"]) {
          statusAnalysis.stunting = optionSetsStunting.find((e) => e.code === "Below -3 SD").code;
          props.xeq1S2MW3k6.backgroundColor = bgColor.red;
          props.xeq1S2MW3k6.color = "#FFF !important";
        } else {
          props.xeq1S2MW3k6.backgroundColor = "";
        }

        changeDataValue(currentEvent.event, "xeq1S2MW3k6", statusAnalysis.stunting); //stunting
      } else {
        changeDataValue(currentEvent.event, "xeq1S2MW3k6", "");
        props.xeq1S2MW3k6.backgroundColor = "";
      }
      //wasting
      if (zPlTaBgQtAM && height && weight && months) {
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
        props.Dq08KjzUprN.helpers = [
          {
            type: "WARNING",
            value: ""
          }
        ];

        if (weight >= weightByHeight["3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Over +3SD (Obese)").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.red;
          props.Dq08KjzUprN.color = "#FFF !important";
        } else if (weight < weightByHeight["3SD"] && weight >= weightByHeight["2SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Over +2 to +3SD (overweight)").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.orange;
          props.Dq08KjzUprN.color = "#000";
        } else if (weight < weightByHeight["2SD"] && weight >= weightByHeight["1SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "More than +1 to +2 SD").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.yellow;
          props.Dq08KjzUprN.color = "#000";
        } else if (weight < weightByHeight["1SD"] && weight >= weightByHeight["-1SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "Between -1 to + 1 SD").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.green;
          props.Dq08KjzUprN.color = "#000";
        } else if (weight < weightByHeight["-1SD"] && weight >= weightByHeight["-2SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -1 to -2 SD").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.yellow;
          props.Dq08KjzUprN.color = "#000";
        } else if (weight < weightByHeight["-2SD"] && weight >= weightByHeight["-3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -2 to -3SD (MAM)").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.orange;
          props.Dq08KjzUprN.color = "#000";
        } else if (weight < weightByHeight["-3SD"]) {
          statusAnalysis.wasting = optionSetsWasting.find((e) => e.code === "less than -3SD (SAM)").code;
          props.Dq08KjzUprN.backgroundColor = bgColor.red;
          props.Dq08KjzUprN.color = "#FFF !important";
        } else {
          props.Dq08KjzUprN.backgroundColor = "";
          props.Dq08KjzUprN.helpers = [
            {
              type: "WARNING",
              value: ""
            }
          ];
        }
        changeDataValue(currentEvent.event, "Dq08KjzUprN", statusAnalysis.wasting); //wasting
      } else {
        changeDataValue(currentEvent.event, "Dq08KjzUprN", "");
        props.Dq08KjzUprN.backgroundColor = "";
        props.Dq08KjzUprN.helpers = [
          {
            type: "WARNING",
            value: ""
          }
        ];
      }
    }

    const updateUnderweightStatus = () => {
      if (ilW9kJRfEav) {
        if (ilW9kJRfEav === "Over or equal to -2 SD") {
          props.ilW9kJRfEav.backgroundColor = bgColor.green;
          props.ilW9kJRfEav.color = "#000";
        } else if (ilW9kJRfEav === "Below -2 to -3 SD") {
          props.ilW9kJRfEav.backgroundColor = bgColor.yellow;
          props.ilW9kJRfEav.color = "#000";
        } else if (ilW9kJRfEav === "Below -3 SD") {
          props.ilW9kJRfEav.backgroundColor = bgColor.red;
          props.ilW9kJRfEav.color = "#FFF !important";
        } else if (ilW9kJRfEav === "Lost follow up") {
          changeDataValue(currentEvent.event, "Zz9O49cuy46", "Lost follow up");
          props.Zz9O49cuy46.backgroundColor = "";
          props.Zz9O49cuy46.color = "#000";
          props.ilW9kJRfEav.color = "#000";
          props.ilW9kJRfEav.backgroundColor = "";
        }

        if (ilW9kJRfEav !== Zz9O49cuy46) {
          props.ilW9kJRfEav.helpers = [
            {
              type: "WARNING",
              value: ""
            }
          ];
        } else {
          props.ilW9kJRfEav.helpers = [];
        }
      } else {
        props.ilW9kJRfEav.helpers = [];
        props.Zz9O49cuy46.helpers = [];
        props.ilW9kJRfEav.backgroundColor = "";
        props.Zz9O49cuy46.backgroundColor = "";
      }
    };

    const updateWastingStatus = () => {
      if (zPlTaBgQtAM) {
        if (zPlTaBgQtAM === "Over +2 to +3SD (overweight)" || zPlTaBgQtAM === "less than -2 to -3SD (MAM)") {
          props.zPlTaBgQtAM.backgroundColor = bgColor.orange;
          props.zPlTaBgQtAM.color = "#000";
        } else if (zPlTaBgQtAM === "More than +1 to +2 SD" || zPlTaBgQtAM === "less than -1 to -2 SD") {
          props.zPlTaBgQtAM.backgroundColor = bgColor.yellow;
          props.zPlTaBgQtAM.color = "#000";
        } else if (zPlTaBgQtAM === "Over +3SD (Obese)" || zPlTaBgQtAM === "less than -3SD (SAM)") {
          props.zPlTaBgQtAM.backgroundColor = bgColor.red;
          props.zPlTaBgQtAM.color = "#FFF !important";
        } else if (zPlTaBgQtAM === "Between -1 to + 1 SD") {
          props.zPlTaBgQtAM.backgroundColor = bgColor.green;
          props.zPlTaBgQtAM.color = "#000";
        } else if (zPlTaBgQtAM === "Lost follow up") {
          changeDataValue(currentEvent.event, "Dq08KjzUprN", "Lost follow up");
          props.Dq08KjzUprN.backgroundColor = "";
          props.Dq08KjzUprN.color = "#000";
          props.zPlTaBgQtAM.color = "#000";
          props.zPlTaBgQtAM.backgroundColor = "";
        }

        if (zPlTaBgQtAM !== Dq08KjzUprN) {
          props.zPlTaBgQtAM.helpers = [
            {
              type: "WARNING",
              value: t("reportWastingStatusIsNotCorrect")
            }
          ];
        } else {
          props.zPlTaBgQtAM.helpers = [];
        }
      } else {
        props.zPlTaBgQtAM.helpers = [];
        props.zPlTaBgQtAM.backgroundColor = "";
      }
    };

    const updateStuntingStatus = () => {
      if (d6ttFA1zrZB) {
        if (d6ttFA1zrZB === "Over or equal to -2 SD") {
          props.d6ttFA1zrZB.backgroundColor = bgColor.green;
          props.d6ttFA1zrZB.color = "#000";
        } else if (d6ttFA1zrZB === "Below -2 to -3 SD") {
          props.d6ttFA1zrZB.backgroundColor = bgColor.yellow;
          props.d6ttFA1zrZB.color = "#000";
        } else if (d6ttFA1zrZB === "Below -3 SD") {
          props.d6ttFA1zrZB.backgroundColor = bgColor.red;
          props.d6ttFA1zrZB.color = "#FFF !important";
        } else if (d6ttFA1zrZB === "Lost follow up") {
          changeDataValue(currentEvent.event, "xeq1S2MW3k6", "Lost follow up");
          props.xeq1S2MW3k6.backgroundColor = "";
          props.xeq1S2MW3k6.color = "#000";
          props.d6ttFA1zrZB.backgroundColor = "";
          props.d6ttFA1zrZB.color = "#000";
        }

        if (d6ttFA1zrZB !== xeq1S2MW3k6) {
          props.d6ttFA1zrZB.helpers = [
            {
              type: "WARNING",
              value: t("reportStuntingStatusIsNotCorrect")
            }
          ];
        } else {
          props.d6ttFA1zrZB.helpers = [];
        }
      } else {
        props.d6ttFA1zrZB.helpers = [];
        props.d6ttFA1zrZB.backgroundColor = "";
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
    dataValues.ilW9kJRfEav, //(Report) - Underweight
    dataValues.zPlTaBgQtAM, // (Report)- Wasting
    dataValues.d6ttFA1zrZB // (Report) - Stunting
  ]);

  useEffect(() => {
    const {
      ilW9kJRfEav, //(Report) - Underweight
      zPlTaBgQtAM, // (Report)- Wasting
      d6ttFA1zrZB, // (Report) - Stunting
      Zz9O49cuy46, // (Correct) - Underweight
      Dq08KjzUprN, // (Correct)- Wasting
      xeq1S2MW3k6 // (Correct) - Stunting
    } = dataValues;
    if (ilW9kJRfEav && Zz9O49cuy46 && ilW9kJRfEav !== Zz9O49cuy46) {
      props.ilW9kJRfEav.helpers = [
        {
          type: "WARNING",
          value: t("reportUnderweightStatusIsNotCorrect")
        }
      ];
    } else {
      props.ilW9kJRfEav.helpers = [];
    }

    if (d6ttFA1zrZB && xeq1S2MW3k6 && d6ttFA1zrZB !== xeq1S2MW3k6) {
      props.d6ttFA1zrZB.helpers = [
        {
          type: "WARNING",
          value: t("reportStuntingStatusIsNotCorrect")
        }
      ];
    } else {
      props.d6ttFA1zrZB.helpers = [];
    }
    if (zPlTaBgQtAM && Dq08KjzUprN && zPlTaBgQtAM !== Dq08KjzUprN) {
      props.zPlTaBgQtAM.helpers = [
        {
          type: "WARNING",
          value: t("reportWastingStatusIsNotCorrect")
        }
      ];
    } else {
      props.zPlTaBgQtAM.helpers = [];
    }
    setProps({ ...props });
  }, [
    dataValues.Zz9O49cuy46,
    dataValues.xeq1S2MW3k6,
    dataValues.Dq08KjzUprN,
    dataValues.ilW9kJRfEav,
    dataValues.zPlTaBgQtAM,
    dataValues.d6ttFA1zrZB
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
  //     props.ilW9kJRfEav.disabled = true;
  //     props.zPlTaBgQtAM.disabled = true;
  //     props.d6ttFA1zrZB.disabled = true;
  //     changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "0");
  //     changeDataValue(currentEvent.event, "IygGcvxKP4J", "0");
  //     changeDataValue(currentEvent.event, "yUPDYAbD3w4", "0");
  //     changeDataValue(currentEvent.event, "ilW9kJRfEav", "Lost follow up");
  //     changeDataValue(currentEvent.event, "zPlTaBgQtAM", "Lost follow up");
  //     changeDataValue(currentEvent.event, "d6ttFA1zrZB", "Lost follow up");
  //   } else {
  //     props.e7Cv9Dv0Hpr.disabled = false;
  //     props.IygGcvxKP4J.disabled = false;
  //     props.yUPDYAbD3w4.disabled = false;
  //     props.ilW9kJRfEav.disabled = false;
  //     props.zPlTaBgQtAM.disabled = false;
  //     props.d6ttFA1zrZB.disabled = false;
  //     if (dataValues.e7Cv9Dv0Hpr === "0") {
  //       changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "");
  //     }
  //     if (dataValues.IygGcvxKP4J === "0") {
  //       changeDataValue(currentEvent.event, "IygGcvxKP4J", "");
  //     }
  //     if (dataValues.yUPDYAbD3w4 === "0") {
  //       changeDataValue(currentEvent.event, "yUPDYAbD3w4", "");
  //     }
  //     changeDataValue(currentEvent.event, "ilW9kJRfEav", "");
  //     changeDataValue(currentEvent.event, "zPlTaBgQtAM", "");
  //     changeDataValue(currentEvent.event, "d6ttFA1zrZB", "");
  //     changeDataValue(currentEvent.event, "Zz9O49cuy46", "");
  //     changeDataValue(currentEvent.event, "xeq1S2MW3k6", "");
  //     changeDataValue(currentEvent.event, "Dq08KjzUprN", "");
  //   }
  //   setProps({ ...props });
  // }, [dataValues.VyN7MkSnSVP]);

  useEffect(() => {
    if (dataValues.VyN7MkSnSVP) {
      const events = _.sortBy(currentEvents, "eventDate").reverse();
      const currentIndex = events.findIndex((ev) => ev.event === currentEvent.event);
      const index = currentIndex + 1;
      const previousEvent = events[index];
      const dataElements = ["e7Cv9Dv0Hpr", "IygGcvxKP4J", "yUPDYAbD3w4", "ilW9kJRfEav", "zPlTaBgQtAM", "d6ttFA1zrZB"];
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
      // props.ilW9kJRfEav.disabled = true;
      // props.zPlTaBgQtAM.disabled = true;
      // props.d6ttFA1zrZB.disabled = true;
      // changeDataValue(currentEvent.event, "e7Cv9Dv0Hpr", "0");
      // changeDataValue(currentEvent.event, "IygGcvxKP4J", "0");
      // changeDataValue(currentEvent.event, "yUPDYAbD3w4", "0");
      // changeDataValue(currentEvent.event, "ilW9kJRfEav", "Lost follow up");
      // changeDataValue(currentEvent.event, "zPlTaBgQtAM", "Lost follow up");
      // changeDataValue(currentEvent.event, "d6ttFA1zrZB", "Lost follow up");
    }
    setProps({ ...props });
  }, [dataValues.VyN7MkSnSVP]);

  return props;
};

export default useRules;
