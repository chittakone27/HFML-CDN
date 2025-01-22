import { pull } from "@/utils/fetch";
import _ from "lodash";
const { VITE_CONFIG_NAME } = import.meta.env;

const chunkGet = async (url, type, pageSize) => {
  const firstRequest = await pull(`${url}&pageSize=${pageSize}&page=1&totalPages=true`);
  const promises = [];
  for (let i = 2; i <= firstRequest.pager.pageCount; i++) {
    promises.push(pull(`${url}&pageSize=${pageSize}&page=${i}`));
  }
  const results = await Promise.all(promises);
  const finalResults = [...firstRequest[type]];
  results.forEach((res) => {
    finalResults.push(...res[type]);
  });
  return finalResults;
};

const getPrograms = async () => {
  const result = await pull(
    "/api/programs?paging=false&fields=id,name,displayName,displayIncidentDate,displayEnrollmentDateLabel,enrollmentDateLabel,access,organisationUnits[id,path],attributeValues,programStages[id,name,access,publicAccess,userGroupAccesses,displayName,featureType,executionDateLabel,displayExecutionDateLabel,dueDateLabel,displayDueDateLabel,hideDueDate,standardInterval,repeatable,autoGenerateEvent,openAfterEnrollment,programStageDataElements[dataElement,compulsory,displayInReports,allowFutureDate,sortOrder,renderType],programStageSections[id,displayName,dataElements],dataEntryForm[htmlCode]],programRuleVariables[id,name,dataElement,trackedEntityAttribute,programRuleVariableSourceType],style,registration,trackedEntityType,programTrackedEntityAttributes[mandatory,searchable,displayInList,trackedEntityAttribute[id]]"
  );
  return result.programs;
};

const getProgramIndicators = async () => {
  const result = await pull("/api/programIndicators?paging=false&fields=id,displayName,expression,filter,program");
  return result.getProgramIndicators;
};
const getIndicators = async () => {
  const result = await pull("/api/indicators?paging=false&fields=id,name,displayName,numerator,denominator,indicatorType[factor]");
  return result.indicators;
};

const getDataSets = async () => {
  const result = await pull(
    "/api/dataSets?paging=false&fields=id,name,displayName,categoryCombo[id,isDefault],access,organisationUnits[id,path],renderAsTabs,compulsoryDataElementOperands[id],compulsoryFieldsCompleteOnly,dataSetElements[dataElement[id],categoryCombo],periodType,style,expiryDays,openFuturePeriods,sections[id,displayName,greyedFields[id],dataElements]"
  );
  // const result = await chunkGet(
  //   "/api/dataSets?fields=id,name,displayName,categoryCombo[id,isDefault],access,organisationUnits[id,path],renderAsTabs,compulsoryDataElementOperands[id],compulsoryFieldsCompleteOnly,dataSetElements[dataElement[id],categoryCombo],periodType,style,expiryDays,openFuturePeriods,sections[id,displayName,greyedFields[id],dataElements]",
  //   "dataSets",
  //   20
  // );
  return result.dataSets;
};

const getMe = async () => {
  const result = await pull("/api/me?fields=*,settings[*],organisationUnits[id,path,name,displayName,ancestors]");
  const settingResult = await pull("/api/userSettings");
  if (!result.settings) {
    result.settings = settingResult;
  }
  return result;
};

const getUserRoles = async () => {
  const result = await pull("/api/userRoles.json?fields=*,!users&paging=false");
  return result.userRoles;
};

const getOrgUnits = async () => {
  let ouResult;
  if (VITE_CONFIG_NAME === "laotracker") {
    ouResult = await pull("/api/routes/cacher/run?type=orgUnits");
  } else {
    const results = await Promise.all([
      pull(
        "/api/organisationUnits?fields=id,name,displayName,code,path,ancestors[id,code],parent,level,attributeValues,geometry,translations&paging=false"
      ),
      pull("/api/organisationUnitGroups?fields=id,name,organisationUnits[id],translations&paging=false")
    ]);
    ouResult = results[0];
    const ouGroupResult = results[1];
    ouResult.organisationUnits.forEach((ou) => {
      ou.organisationUnitGroups = [];
    });
    ouGroupResult.organisationUnitGroups.forEach((oug) => {
      oug.organisationUnits.forEach((ouItem) => {
        const foundOu = ouResult.organisationUnits.find((ou) => ou.id === ouItem.id);
        if (foundOu) {
          foundOu.organisationUnitGroups.push({
            id: oug.id,
            name: oug.name
          });
        }
      });
    });
  }

  // const result = await chunkGet(
  //   "/api/organisationUnits?fields=id,name,displayName,code,path,ancestors[id,code],parent,level,organisationUnitGroups[id,name]",
  //   "organisationUnits",
  //   2000
  // );
  const geoJsonLevel1Result = await pull("/api/organisationUnits.geojson?level=1");
  if (geoJsonLevel1Result && geoJsonLevel1Result.features && geoJsonLevel1Result.features.length > 0) {
    ouResult.organisationUnits.forEach((ou) => {
      if (ou.level === 1) {
        ou.geoJson = geoJsonLevel1Result;
      }
    });
  } else {
    const geoJsonLevel2Result = await pull("/api/organisationUnits.geojson?level=2");
    ouResult.organisationUnits.forEach((ou) => {
      if (ou.level === 1) {
        ou.geoJson = geoJsonLevel2Result;
      }
    });
  }

  return ouResult.organisationUnits;
};

const getTrackedEntityAttributes = async () => {
  const result = await pull(
    "/api/trackedEntityAttributes.json?fields=id,displayName,displayFormName,valueType,optionSet,unique,pattern&paging=false"
  );
  return result.trackedEntityAttributes;
};

const getDataElements = async () => {
  const result = await pull(
    "/api/dataElements?fields=id,name,displayName,displayFormName,code,valueType,optionSetValue,optionSet,aggregationType,domainType,categoryCombo,translations&paging=false"
  );
  return result.dataElements;
};
const getCategoryCombos = async () => {
  const result = await pull(
    "/api/categoryCombos.json?paging=false&fields=id,displayName,isDefault,categories[id,displayName,categoryOptions[id,displayName]],categoryOptionCombos[id,displayName,categoryOptions[id]]"
  );
  return result.categoryCombos;
};

const getOptionSets = async () => {
  let optionSetResult;
  if (VITE_CONFIG_NAME === "laotracker") {
    optionSetResult = await pull("/api/routes/cacher/run?type=optionSets");
  } else {
    optionSetResult = await pull("/api/optionSets?fields=id,displayName,translations&paging=false");
    const optionResult = await pull("/api/options?fields=id,displayName,name,code,sortOrder,optionSet,attributeValues,translations&paging=false");
    // const optionResult = await chunkGet("/api/options?fields=id,displayName,code,optionSet,attributeValues", "options", 2000);
    optionSetResult.optionSets.forEach((os) => {
      os.options = _.sortBy(
        optionResult.options.filter((o) => {
          if (!o.optionSet) {
            return false;
          } else {
            return o.optionSet.id === os.id;
          }
        }),
        ["sortOrder"]
      );
    });
  }
  return optionSetResult.optionSets;
};

const getProgramRules = async () => {
  const result = await pull(
    "/api/programRules?paging=false&fields=id,displayName,programRuleActions[*,option[id,name,code]],program,condition,description"
  );
  return result.programRules;
};

const getValidationRules = async () => {
  const result = await pull("/api/validationRules?fields=id,name,displayName,leftSide,rightSide,operator&paging=false");
  return result.validationRules;
};

const getOptionGroups = async () => {
  const result = await pull("/api/optionGroups.json?fields=id,name,code,options[id,name,code,displayName,translations]&paging=false");
  return result.optionGroups;
};

const getTrackedEntityInstanceFilters = async () => {
  const result = await pull("/api/trackedEntityInstanceFilters.json?fields=*&paging=false");
  return result.trackedEntityInstanceFilters;
};

const getHeaderBarData = async () => {
  const headerBarDataObject = {};
  const results = await Promise.all([
    pull("/api/systemSettings"),
    pull("/api/me/dashboard"),
    pull("/api/me?fields=authorities,avatar,email,name,settings"),
    pull("/dhis-web-commons/menu/getModules.action"),
    pull("/api/systemSettings/helpPageLink")
  ]);
  headerBarDataObject.applicationTitle = results[0].applicationTitle;
  headerBarDataObject.notifications = results[1];
  headerBarDataObject.user = results[2];
  headerBarDataObject.apps = results[3];
  headerBarDataObject.help = results[4];
  return headerBarDataObject;
};

const ping = async () => {
  try {
    const result = await pull("/api/me?fields=id");
    return true;
  } catch (err) {
    return false;
  }
};

export {
  getPrograms,
  getProgramIndicators,
  getIndicators,
  getDataSets,
  getMe,
  getUserRoles,
  getOrgUnits,
  getDataElements,
  getTrackedEntityAttributes,
  getCategoryCombos,
  getOptionSets,
  getProgramRules,
  getValidationRules,
  getOptionGroups,
  getTrackedEntityInstanceFilters,
  getHeaderBarData,
  ping
};
