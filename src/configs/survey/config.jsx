import IctDeviceMapping from "./program-forms/ict-device-mapping/Profile";
import Assessment from "./program-forms/ict-device-mapping/Assessment";
import InfrastructureMappingEvent from "./program-forms/infrastructure-mapping-event/InfrastructureMappingEvent";

const customForms = {
  D5YBg956c4L: {
    profile: IctDeviceMapping,
    unHrhF91UiU: Assessment,
  },
  aGvP5brBIZl: InfrastructureMappingEvent,
};

const hooks = [];

const locales = {};

const customLocales = {
  en: {
    howToSeeTheDocuments: "How to see the documents",
    faqs: "FAQs",
    howToUseEventList: "How to use event list",
    comingSoon: "Coming soon ...",
  },
  lo: {
    howToSeeTheDocuments: "ວິທີເຂົ້າເບິ່ງເອກະສານຕ່າງໆ",
    faqs: "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    howToUseEventList: "ວິທີໃຊ້ລາຍການເຫດການ",
    comingSoon: "ຈະຖືກເພື້ມເຂົ້າມາ ໄວໆນີ້.....",
  },
};

const customEventListColumns = {};

const multiOrgUnitsDataSets = [];

const customTimelineFields = [];

const customProgramRules = {};

const customEventListSorts = {};
const documents = [
  {
    label: "howToSeeTheDocuments",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vT3O9L0CxdmRiJft5CwZ07WsddTOg1slasUVyFgKxnPdCKyIMYOr5mJifnAOfoE4-pMzM5s_7IGW3Rl/pub?embedded=true",
  },
  {
    label: "faqs",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vSY3C90x9gVhqCoMB5U2xZw6JGhkMULLo2eTZjckvw-uCT5bAXADvkWnxuTa3qs8sXxiW019Z46hU3n/pub?embedded=true",
  },
  {
    label: "howToUseEventList",
    type: "googleDoc",
    url: "https://docs.google.com/document/d/e/2PACX-1vR2mIN1GkIHDU9q3BkV7p3oesvQn3qBlFh0pUMQ-dnOWj5hGRkTf-RT0ByMfiEsicYVHDaf83SUW7f1/pub?embedded=true",
  },
  {
    label: "comingSoon",
    type: "text",
  },
];

const eventSaveInjections = [];

const trackerFormTypes = { D5YBg956c4L: ["noBlur", "tabStage", "tabular"] };

const customTrackerCompleteButtons = {};

const customTeiListColumns = {};
const teiSearchSections = {};
const teiFilterSections = {};
const customTeiFilterFields = {};
const customTeiSearchFields = {};

const modes = ["eventCapture", "trackerCapture"];

const customTrackerLayout = {};

export default {
  customForms,
  customEventListColumns,
  locales,
  customLocales,
  multiOrgUnitsDataSets,
  hooks,
  customProgramRules,
  customTimelineFields,
  customEventListSorts,
  documents,
  trackerFormTypes,
  eventSaveInjections,
  customTrackerCompleteButtons,
  customTeiListColumns,
  teiFilterSections,
  teiSearchSections,
  customTeiFilterFields,
  customTeiSearchFields,
  // additionalCompleteHandlers,
  modes,
  // allowedDataSets,
  customTrackerLayout,
};
