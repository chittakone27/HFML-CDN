import { pull, push } from "@/utils/fetch";

const getCompleteness = async (dataSet, orgUnit, period, attributeOptionCombo) => {
  const result = await pull(`/api/completeDataSetRegistrations.json?dataSet=${dataSet}&orgUnit=${orgUnit}&period=${period}`);
  if (result.completeDataSetRegistrations) {
    let foundCompleteness;
    if (attributeOptionCombo) {
      foundCompleteness = result.completeDataSetRegistrations.find((cdsr) => cdsr.attributeOptionCombo === attributeOptionCombo.id);
    } else {
      foundCompleteness = result.completeDataSetRegistrations[0];
    }
    if (foundCompleteness && foundCompleteness.completed) {
      return foundCompleteness;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const postCompleteness = async (completeness) => {
  const result = await push(`/api/completeDataSetRegistrations`, completeness, "POST");
  return result;
};

export { getCompleteness, postCompleteness };
