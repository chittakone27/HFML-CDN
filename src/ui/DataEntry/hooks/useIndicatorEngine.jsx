import useMetadataStore from "@/state/metadata";
import useDataEntryStore from "@/state/dataEntry";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import _ from "lodash";

const useIndicatorEngine = (id) => {
  const dataValues = useDataEntryStore((state) => state.dataValues);
  const { indicators, dataElements, categoryCombos } = useMetadataStore(
    (state) => ({ indicators: state.indicators, dataElements: state.dataElements, categoryCombos: state.categoryCombos }),
    shallow
  );
  const dataSet = useSelectionStore((state) => state.dataSet);
  const dataElementsId = dataSet.dataSetElements.map((dse) => {
    return dse.dataElement.id;
  });
  const foundIndicator = indicators.find((i) => i.id === id);
  const { numerator, denominator } = foundIndicator;
  const factor = foundIndicator.indicatorType.factor;

  const pickDataValue = (de, coc) => {
    if (coc) {
      const key = Object.keys(dataValues).find((key) => {
        const properties = key.split("-");
        return properties[0] === de && properties[1] === coc;
      });
      return key && dataValues[key] ? dataValues[key].value : 0;
    } else {
      const keys = Object.keys(dataValues).filter((key) => {
        const properties = key.split("-");
        return properties[0] === de;
      });
      return keys.reduce((prev, current) => {
        const value = dataValues[current] ? parseFloat(dataValues[current].value) : null;
        prev += value;
        return prev;
      }, 0);
    }
  };

  const runExpression = (expression) => {
    let compiled = _.template(`<%= ${expression} %>`);
    return compiled();
  };

  const convertDataElementVariable = (expression) => {
    dataElementsId.forEach((deId) => {
      const foundDataElement = dataElements.find((de) => de.id === deId);
      const foundCategoryCombo = categoryCombos.find((co) => co.id === foundDataElement.categoryCombo.id);
      foundCategoryCombo.categoryOptionCombos.forEach((coc) => {
        const re = new RegExp(`#{${foundDataElement.id}.${coc.id}}`, "g");
        expression = expression.replace(re, pickDataValue(deId, coc.id));
      });
      const re = new RegExp(`#{${foundDataElement.id}}`, "g");
      expression = expression.replace(re, pickDataValue(deId));
    });
    return expression;
  };

  const convert = (expression) => {
    return convertDataElementVariable(expression);
  };

  const convertedNumerator = runExpression(convert(numerator));
  const convertedDenominator = runExpression(convert(denominator));
  if (!isNaN(convertedNumerator) && !isNaN(convertedDenominator) && convertedDenominator > 0) {
    const value = (convertedNumerator / convertedDenominator) * factor;
    return isNaN(value) ? "" : Math.round(value * 100) / 100;
  } else {
    return "";
  }
};

export default useIndicatorEngine;
