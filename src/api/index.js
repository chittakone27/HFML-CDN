import oldEvent from "./icapture/event";
import newEvent from "./icapture/event-new";
import oldTracker from "./icapture/tracker";
import newTracker from "./icapture/tracker-new";
import {
  getDataValues,
  saveDataValue,
  runValidations,
  getDataValueAudits,
  getSingleDataValue,
  getMinMaxDataElement,
  saveMinMaxDataElement
} from "./icapture/dataValue";
import { getCompleteness, postCompleteness } from "./icapture/completeness";
import {
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
} from "./icapture/metadata";
import { ocaGetEvents, ocaGetEventById, ocaSaveEvent, ocaDeleteEvent } from "./oca/event";
import { ocaGetDataValues, ocaSaveDataValue, ocaRunValidations } from "./oca/dataValue";
import { ocaGetCompleteness, ocaPostCompleteness } from "./oca/completeness";
import {
  ocaGetPrograms,
  ocaGetProgramIndicators,
  ocaGetDataSets,
  ocaGetMe,
  ocaGetUserRoles,
  ocaGetOrgUnits,
  ocaGetDataElements,
  ocaGetTrackedEntityAttributes,
  ocaGetCategoryCombos,
  ocaGetOptionSets,
  ocaGetProgramRules,
  ocaGetValidationRules,
  ocaGetOptionGroups
} from "./oca/metadata";

const { VITE_APP_MODE, VITE_TRACKER_API } = import.meta.env;
let metadata;
let event;
let dataValue;
let completeness;
let tracker;

if (VITE_APP_MODE === "icapture") {
  metadata = {
    getPrograms,
    getProgramIndicators,
    getIndicators,
    getDataSets,
    getMe,
    getUserRoles,
    getOrgUnits,
    getTrackedEntityAttributes,
    getDataElements,
    getCategoryCombos,
    getOptionSets,
    getProgramRules,
    getValidationRules,
    getOptionGroups,
    getTrackedEntityInstanceFilters,
    getHeaderBarData,
    ping
  };
  if (VITE_TRACKER_API === "new") {
    event = newEvent;
    tracker = newTracker;
  } else {
    event = oldEvent;
    tracker = oldTracker;
  }

  dataValue = {
    getDataValues,
    saveDataValue,
    runValidations,
    getDataValueAudits,
    getSingleDataValue,
    getMinMaxDataElement,
    saveMinMaxDataElement
  };
  completeness = {
    getCompleteness,
    postCompleteness
  };
} else {
  metadata = {
    getPrograms: ocaGetPrograms,
    getProgramIndicators: ocaGetProgramIndicators,
    getDataSets: ocaGetDataSets,
    getMe: ocaGetMe,
    getUserRoles: ocaGetUserRoles,
    getOrgUnits: ocaGetOrgUnits,
    getDataElements: ocaGetDataElements,
    getTrackedEntityAttributes: ocaGetTrackedEntityAttributes,
    getCategoryCombos: ocaGetCategoryCombos,
    getOptionSets: ocaGetOptionSets,
    getProgramRules: ocaGetProgramRules,
    getValidationRules: ocaGetValidationRules,
    getOptionGroups: ocaGetOptionGroups
  };

  dataValue = {
    getDataValues: ocaGetDataValues,
    saveDataValue: ocaSaveDataValue,
    runValidations: ocaRunValidations
  };
  completeness = {
    getCompleteness: ocaGetCompleteness,
    postCompleteness: ocaPostCompleteness
  };
}

export { metadata, event, dataValue, completeness, tracker };
