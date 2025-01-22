import { pull, push } from "@/utils/fetch";

const getDataValues = async (dataSet, orgUnit, period) => {
  let url = `/api/dataValueSets.json?dataSet=${dataSet}&orgUnit=${orgUnit}&period=${period}&children=true`;
  const result = await pull(url);
  return result.dataValues ? result.dataValues : [];
};

const saveDataValue = async (
  dataSet,
  orgUnit,
  period,
  dataElement,
  coc,
  value,
  attributeOptionCombo,
  followUp,
  comment
) => {
  let additionalQuery = "";
  if (!attributeOptionCombo.isDefault) {
    additionalQuery += `&cc=${attributeOptionCombo.categoryCombo}`;
    additionalQuery += `&cp=${attributeOptionCombo.categoryOptions
      .map((co) => co.id)
      .join(";")}`;
  }
  let url =
    `/api/dataValues?de=${dataElement}&co=${coc}&ds=${dataSet}&ou=${orgUnit}&pe=${period}&value=${value}&comment=${
      comment ? comment : ""
    }&followUp=${followUp ? "true" : "false"}` + additionalQuery;
  const response = await push(url, {}, "POST");
  if (response.ok) return { ok: response.ok };
  else {
    const json = await response.json();
    return { ok: false, json };
  }
};

const runValidations = async (
  dataSet,
  orgUnit,
  period,
  attributeOptionCombo
) => {
  let url = `/api/validation/dataSet/${dataSet}.json?ou=${orgUnit}&pe=${period}`;
  if (!attributeOptionCombo.isDefault) {
    url += `&cc=${attributeOptionCombo.categoryCombo}`;
    url += `&cp=${attributeOptionCombo.categoryOptions
      .map((co) => co.id)
      .join(";")}`;
  }
  const result = await pull(url);
  return result;
};

const getDataValueAudits = async (
  dataSet,
  dataElement,
  orgUnit,
  categoryOptionCombo
) => {
  let url = `/api/audits/dataValue?ds=${dataSet}&de=${dataElement}&ou=${orgUnit}&co=${categoryOptionCombo}&paging=false`;
  const result = await pull(url);
  return result.dataValueAudits ? result.dataValueAudits : [];
};

const getSingleDataValue = async (
  dataSet,
  dataElement,
  orgUnit,
  categoryOptionCombo,
  period,
  attributeOptionCombo
) => {
  let url = `/api/dataValues?de=${dataElement}&co=${categoryOptionCombo}&ds=${dataSet}&ou=${orgUnit}&pe=${period}`;
  if (!attributeOptionCombo.isDefault) {
    url += `&cc=${attributeOptionCombo.categoryCombo}`;
    url += `&cp=${attributeOptionCombo.categoryOptions
      .map((co) => co.id)
      .join(";")}`;
  }
  const result = await pull(url);
  return Array.isArray(result) ? result : [0];
};

const getMinMaxDataElement = async (
  dataElement,
  orgUnit,
  categoryOptionCombo
) => {
  let url = `/api/minMaxDataElements?fields=:all,dataElement&filter=dataElement.id:eq:${dataElement}&filter=source.id:eq:${orgUnit}&filter=optionCombo.id:eq:${categoryOptionCombo}&paging=false`;
  const result = await pull(url);
  return result;
};

const saveMinMaxDataElement = async (payload, method) => {
  const response = await push(`/api/minMaxDataElements`, payload, method ? method : "POST");
  if (response.ok) return { ok: response.ok };
  else {
    const json = await response.json();
    return { ok: false, json };
  }
};

//https://dhis2.world/laohmis38/api/dataValues?de=h8KiBz2888q&co=z1oXoHKWhla&ds=WiTslxJQpbZ&ou=FV43JisquSm&pe=202302&cc=MZ3mU1AxBJW&cp=qRESDTfrgi5;lDdcVFbc0wH
//https://dhis2.world/laohmis38/api/33/audits/dataValue?ds=WiTslxJQpbZ&de=h8KiBz2888q&paging=false
//https://dhis2.world/laohmis38/api/minMaxDataElements.json?fields=:all,dataElement&filter=dataElement.id:eq:h8KiBz2888q&filter=source.id:eq:FV43JisquSm&filter=optionCombo.id:eq:BaKsAyoQBud&paging=false

export {
  getDataValues,
  saveDataValue,
  runValidations,
  getDataValueAudits,
  getSingleDataValue,
  getMinMaxDataElement,
  saveMinMaxDataElement
};
