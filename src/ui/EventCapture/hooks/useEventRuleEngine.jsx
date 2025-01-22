import moment from "moment";
import _ from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import useEventCaptureStore from "@/state/eventCapture";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import configs from "@/configs";
import { useShallow } from "zustand/react/shallow";
const { VITE_CONFIG_NAME } = import.meta.env;
const { customProgramRules } = configs[VITE_CONFIG_NAME];

const baseValueTypeCheck = (dataItem, value, t) => {
  const errors = [];
  const { valueType, mandatory } = dataItem;
  // if (!value && mandatory) {
  //   errors.push(t("thisFieldIsRequired"));
  // }
  if (!value) return errors;
  switch (valueType) {
    case "INTEGER":
      if (isNaN(value) || value > 999999999 || value < -999999999) {
        errors.push(t("valueMustBeInteger"));
      }
      break;
    case "NUMBER":
      if (isNaN(value) || value > 99999999999999999999 || value < -99999999999999999999) {
        errors.push(t("valueMustBeNumber"));
      }
      break;
    case "PERCENTAGE":
      if (isNaN(value) || value > 100 || value < 0) {
        errors.push(t("valueMustBeBetween0And100"));
      }
      break;
    case "INTEGER_POSITIVE":
      if (isNaN(value) || value > 999999999 || value < 1) {
        errors.push(t("valueMustBePositiveInteger"));
      }
      break;
    case "INTEGER_NEGATIVE":
      if (isNaN(value) || value > -1 || value < -999999999) {
        errors.push(t("valueMustBeNegativeInteger"));
      }
      break;
    case "INTEGER_ZERO_OR_POSITIVE":
      if (isNaN(value) || value > 999999999 || value < 0) {
        errors.push(t("valueMustBeZeroOrPositiveInteger"));
      }
      break;
    case "PHONE_NUMBER":
      if (isNaN(value)) {
        errors.push(t("valueMustBePhoneNumber"));
      }
      break;
    case "EMAIL":
      // eslint-disable-next-line
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        errors.push(t("valueMustBeEmail"));
      }
      break;
    case "TEXT-COORDINATES":
      if (!isValidCoordinate(value)) {
        errors.push(t("valueMustBeCoordinates"));
      }
      break;
    case "UNIT_INTERVAL":
    // case "FILE_RESOURCE":
    case "LETTER":
    // case "IMAGE":
    case "URL":
    case "USERNAME":
      errors.push(t("unsupportedValueType") + " " + dataItem.valueType);
      break;
    default:
      break;
  }
  return errors;
};

const daysBetween = (a, b) => {
  const diff = moment(a).diff(moment(b), "days");
  return diff;
};
const weeksBetween = (a, b) => {
  return moment(a).diff(moment(b), "isoWeeks");
};
const monthsBetween = (a, b) => {
  return moment(a).diff(moment(b), "months");
};
const yearsBetween = (a, b) => {
  return moment(a).diff(moment(b), "years");
};

const testRegExp = (text, regExp) => {
  const flags = regExp.replace(/.*\/([gimy]*)$/, "$1");
  const pattern = regExp.replace(new RegExp("^/(.*?)/" + flags + "$"), "$1");
  const regex = new RegExp(pattern, flags);
  return regex.test(text);
};

const useEventRuleEngine = () => {
  const { t } = useTranslation();
  const { setStatus, setCurrentEvent, setCurrentEventDataValue } = useEventCaptureStore((state) => state.actions);
  const { currentEvent } = useEventCaptureStore((state) => ({ currentEvent: state.currentEvent }), shallow);
  const { program, orgUnit } = useSelectionStore(
    useShallow((state) => ({
      program: state.program,
      orgUnit: state.orgUnit
    }))
  );
  const { programRules, optionGroups, dataElements } = useMetadataStore(
    (state) => ({
      programRules: state.programRules,
      optionGroups: state.optionGroups,
      dataElements: state.dataElements
    }),
    shallow
  );
  let currentProgramRules = programRules.filter((pr) => pr.program.id === program.id);
  const programRuleVariables = program.programRuleVariables;
  const convertFunction = (condition) => {
    const mapping = {
      "d2:hasValue": "Boolean",
      "d2:ceil": "Math.ceil",
      "d2:floor": "Math.floor",
      "d2:round": "Math.round",
      "d2:daysBetween": "functions.daysBetween",
      "d2:weeksBetween": "functions.weeksBetween",
      "d2:monthsBetween": "functions.monthsBetween",
      "d2:yearsBetween": "functions.yearsBetween",
      "d2:validatePattern": "functions.testRegExp"
    };
    Object.keys(mapping).forEach((key) => {
      const replace = key;
      const re = new RegExp(replace, "g");
      condition = condition.replace(re, mapping[key]);
    });
    return condition;
  };

  const convertVariable = (condition) => {
    const mapping = {
      "V{event_date}": "currentEvent.eventDate",
      "V{current_date}": `moment().format("YYYY-MM-DD")`,
      "V{due_date}": "currentEvent.dueDate",
      "V{orgunit_code}": "orgUnit.code"
    };
    Object.keys(mapping).forEach((key) => {
      const replace = key;
      const re = new RegExp(replace, "g");
      condition = condition.replace(re, mapping[key]);
    });
    return condition;
  };

  const convertProgramRuleVariables = (condition) => {
    programRuleVariables.forEach((prv) => {
      const replace = `#{${prv.name}}`;
      const re = new RegExp(replace, "g");
      condition = condition.replace(re, "currentEvent.dataValues." + prv.dataElement.id);
    });
    return condition;
  };

  const convertExpression = (expression) => {
    expression = convertProgramRuleVariables(expression);
    expression = convertFunction(expression);
    expression = convertVariable(expression);
    return expression;
  };

  const runExpression = (expression) => {
    let compiled = _.template(`<%= ${expression} %>`, {
      imports: {
        currentEvent: currentEvent,
        orgUnit: orgUnit,
        moment,
        functions: {
          daysBetween,
          weeksBetween,
          monthsBetween,
          yearsBetween,
          testRegExp
        }
      }
    });
    return compiled();
  };

  useEffect(
    () => {
      const status = {
        valid: true,
        disabledFields: [],
        hiddenFields: [],
        mandatoryFields: [],
        helpers: [],
        assignations: [],
        hiddenOptions: [],
        hiddenSections: []
      };
      let errors = [];
      const currentCustomProgramRules = customProgramRules[program.id];
      if (currentCustomProgramRules) {
        currentProgramRules = [...currentProgramRules, ...currentCustomProgramRules];
      }
      program.programStages[0].programStageDataElements.forEach((psde) => {
        const foundDe = dataElements.find((de) => de.id === psde.dataElement.id);
        if (!foundDe) return;
        const currentErrors = baseValueTypeCheck(foundDe, currentEvent.dataValues[foundDe.id], t);
        errors = errors.concat(
          currentErrors.map((error) => ({
            value: error,
            targetType: "DATA_ELEMENT",
            target: foundDe.id,
            type: "ERROR"
          }))
        );
      });
      status.helpers = [...errors];
      const newEvent = _.cloneDeep(currentEvent);
      currentProgramRules.forEach((pr) => {
        // if condition is null, then set condition to "true" (DD fix bug when condition is null)
        let condition = pr.condition ? convertExpression(pr.condition) : "true";
        let result;
        try {
          result = runExpression(condition);
        } catch (err) {
          result = "false";
        }
        if (result == "true") {
          pr.programRuleActions.forEach((pra) => {
            switch (pra.programRuleActionType) {
              case "SHOWERROR":
                status.helpers.push({
                  type: "ERROR",
                  targetType: "DATA_ELEMENT",
                  target: pra.dataElement.id,
                  value: pra.content
                });
                break;
              case "SHOWWARNING":
                status.helpers.push({
                  type: "WARNING",
                  targetType: "DATA_ELEMENT",
                  target: pra.dataElement.id,
                  value: pra.displayContent
                });
                break;
              case "DISPLAYTEXT":
                status.helpers.push({
                  type: "HELPER",
                  targetType: "DATA_ELEMENT",
                  target: pra.dataElement.id,
                  value: pra.displayContent
                });
                break;
              case "HIDEOPTIONGROUP":
                const foundOptionGroup = optionGroups.find((og) => og.id === pra.optionGroup.id);
                const hiddenOptions = foundOptionGroup.options.map((o) => o.code);
                if (foundOptionGroup) {
                  status.hiddenOptions.push({
                    target: pra.dataElement.id,
                    options: hiddenOptions
                  });
                }
                if (hiddenOptions.includes(currentEvent.dataValues[pra.dataElement.id])) {
                  setCurrentEventDataValue(pra.dataElement.id, "");
                  // newEvent.dataValues[pra.dataElement.id] = "";
                }
                break;
              case "HIDEOPTION":
                status.hiddenOptions.push({
                  target: pra.dataElement.id,
                  options: [pra.option.code]
                });
                if ([pra.option.code].includes(currentEvent.dataValues[pra.dataElement.id])) {
                  setCurrentEventDataValue(pra.dataElement.id, "");
                  // newEvent.dataValues[pra.dataElement.id] = "";
                }
                break;
              case "HIDEFIELD":
                status.hiddenFields.push(pra.dataElement.id);
                setCurrentEventDataValue(pra.dataElement.id, "");
                // newEvent.dataValues[pra.dataElement.id] = "";
                break;
              case "HIDESECTION":
                status.hiddenSections.push(pra.programStageSection.id);
                const foundSection = program.programStages[0].programStageSections.find((pss) => pss.id === pra.programStageSection.id);
                if (foundSection) {
                  foundSection.dataElements.forEach((de) => {
                    setCurrentEventDataValue(de.id, "");
                    // newEvent.dataValues[de.id] = "";
                  });
                }
                break;
              case "ASSIGN":
                // if data is null, then set data to "true" (DD fix bug when data is null)
                const expression = pra.data ? convertExpression(pra.data) : "true";
                const value = runExpression(expression);
                status.assignations.push({ target: pra.dataElement.id, value });
                setCurrentEventDataValue(pra.dataElement.id, value);
                // newEvent.dataValues[pra.dataElement.id] = value;
                break;
              case "SETMANDATORYFIELD":
                status.mandatoryFields.push(pra.dataElement.id);
                if (!currentEvent.dataValues[pra.dataElement.id]) {
                  status.helpers.push({
                    type: "ERROR",
                    targetType: "DATA_ELEMENT",
                    target: pra.dataElement.id,
                    value: t("thisFieldIsRequired")
                  });
                }
                break;
              case "DISPLAYKEYVALUEPAIR":
              case "HIDEPROGRAMSTAGE":
              case "WARNINGONCOMPLETE":
              case "ERRORONCOMPLETE":
              case "CREATEEVENT":
              case "SENDMESSAGE":
              case "SCHEDULEMESSAGE":
              case "SHOWOPTIONGROUP":
                break;
              default:
                break;
            }
          });
        }
      });
      program.programStages[0].programStageDataElements.forEach((psde) => {
        if (psde.compulsory && !currentEvent.dataValues[psde.dataElement.id]) {
          status.helpers.push({
            type: "ERROR",
            targetType: "DATA_ELEMENT",
            target: psde.dataElement.id,
            value: t("thisFieldIsRequired")
          });
        }
      });
      if (!currentEvent.eventDate) {
        status.helpers.push({
          type: "ERROR",
          targetType: "EVENT_PROPERTY",
          target: "eventDate",
          value: t("thisFieldIsRequired")
        });
      }
      const error = status.helpers.find((helper) => helper.type === "ERROR");
      if (error) {
        status.valid = false;
      }
      setStatus(status);
      // setCurrentEvent(newEvent);
    },
    Object.keys(currentEvent).length > 0 ? [Object.values(currentEvent).join(""), Object.values(currentEvent.dataValues).join("")] : [null]
  );
};

export default useEventRuleEngine;
