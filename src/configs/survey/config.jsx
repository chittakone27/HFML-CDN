//ICT
import IctDeviceMapping from "./program-forms/ict-device-mapping/Profile";
import Assessment from "./program-forms/ict-device-mapping/Assessment";
//Infra
import InfrastructureMappingTracker from "./program-forms/infrastructure-mapping-tracker/Profile";
import FacilityBuildingandFurniture from "./program-forms/infrastructure-mapping-tracker/Program -stages/Facility-Building-Furniture/FacilityBuildingandFurniture";
import Wash from "./program-forms/infrastructure-mapping-tracker/Program -stages/Wash/Wash";
import Equipments from "./program-forms/infrastructure-mapping-tracker/Program -stages/Equipments/Equipments";
import FocalPoints from "./program-forms/infrastructure-mapping-tracker/Program -stages/Focal-point/FocalPoints";
import IctAdminEquipments from "./program-forms/infrastructure-mapping-tracker/Program -stages/admin-ict/IctAdminEquipments";

// Villages in catchment area (tracker: sBkMdki30ua, stage: JrbpF3DG3FL)
import VillagesProfile from "./program-forms/villages-catchment/Profile";
import VillagesStage from "./program-forms/villages-catchment/VillagesStage";

// Nearby health facilities (tracker: gr24luudE0t, stage: MLBhJz9GKds)
import NearbyProfile from "./program-forms/nearby/Profile";
import NearbyStage from "./program-forms/nearby/NearbyStage";

//logbook
import ScannedLogBook from "./program-forms/infrastructure-mapping-tracker/Program -stages/Scanned-Logbook/ScannedLogBook";
//Custom hooks
import hooks from "./hooks";

const customForms = {
  // ICT Device Mapping (tracker)
  D5YBg956c4L: {
    profile: IctDeviceMapping,
    unHrhF91UiU: Assessment
  },

  // Infrastructure Mapping Tracker (tracker)
  wkUHtogPKUL: {
    profile: InfrastructureMappingTracker,
    WUCVzpyRBHR: FacilityBuildingandFurniture,
    BVTaSDRqTdN: Wash,
    FQGIR6wmBWZ: Equipments,
    ZOMnNIWsrX7: IctAdminEquipments,
    L6OUrGJCq69: FocalPoints,
    YLDq73HwBtm: ScannedLogBook
  },

  // Villages in catchment area (tracker)
  sBkMdki30ua: {
    profile: VillagesProfile,
    JrbpF3DG3FL: VillagesStage
  },

  // Nearby health facilities (tracker)
  gr24luudE0t: {
    profile: NearbyProfile,
    MLBhJz9GKds: NearbyStage
  }
};

const customLocales = {
  en: {
    howToSeeTheDocuments: "How to see the documents",
    faqs: "FAQs",
    howToUseEventList: "How to use event list",
    comingSoon: "Coming soon ..."
  },
  lo: {
    howToSeeTheDocuments: "ວິທີເຂົ້າເບິ່ງເອກະສານຕ່າງໆ",
    faqs: "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    howToUseEventList: "ວິທີໃຊ້ລາຍການເຫດການ",
    comingSoon: "ຈະຖືກເພື້ມເຂົ້າມາ ໄວໆນີ້....."
  }
};

const documents = [
  {
    label: "howToSeeTheDocuments",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vT3O9L0CxdmRiJft5CwZ07WsddTOg1slasUVyFgKxnPdCKyIMYOr5mJifnAOfoE4-pMzM5s_7IGW3Rl/pub?embedded=true"
  },
  {
    label: "faqs",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vSY3C90x9gVhqCoMB5U2xZw6JGhkMULLo2eTZjckvw-uCT5bAXADvkWnxuTa3qs8sXxiW019Z46hU3n/pub?embedded=true"
  },
  {
    label: "howToUseEventList",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vR2mIN1GkIHDU9q3BkV7p3oesvQn3qBlFh0pUMQ-dnOWj5hGRkTf-RT0ByMfiEsicYVHDaf83SUW7f1/pub?embedded=true"
  },
  { label: "comingSoon", type: "text" }
];

const trackerFormTypes = {
  D5YBg956c4L: ["noBlur", "tabStage", "tabular"],
  wkUHtogPKUL: ["noBlur", "tabStage", "tabular"],
  sBkMdki30ua: ["noBlur", "tabStage", "tabular"],
  gr24luudE0t: ["noBlur", "tabStage", "tabular"]
};

const customProgramRules = {
  // D5YBg956c4L: { profile: useProfileRules, unHrhF91UiU: useAssessmentRules },
};

const config = {
  customForms,
  customEventListColumns: {},
  locales: customLocales,
  customLocales,
  multiOrgUnitsDataSets: [],
  hooks,
  customProgramRules,
  customTimelineFields: [],
  customEventListSorts: {},
  documents,
  trackerFormTypes,
  eventSaveInjections: [],
  customTrackerCompleteButtons: {},
  customTeiListColumns: {},
  teiFilterSections: {},
  teiSearchSections: {},
  customTeiFilterFields: {},
  customTeiSearchFields: {},
  modes: ["eventCapture", "trackerCapture"],
  customTrackerLayout: {}
};

export const allowedPrograms = [
  // trackers
  "D5YBg956c4L",
  "wkUHtogPKUL",
  "sBkMdki30ua",
  "gr24luudE0t"
  // events
  //"aGvP5brBIZl",
];

export default config;
