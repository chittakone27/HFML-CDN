//program
import _ from "lodash";
import { format } from "date-fns";
import { purePush, push } from "@/utils/fetch";
import useTrackerCaptureStore from "@/state/trackerCapture";
import { shallow } from "zustand/shallow";
import Dli5 from "./program-forms/dli5";
import DeliveryEvent from "./program-forms/delivery-event";
import EpiChild from "./program-forms/epi-child";
import EpiWoman from "./program-forms/epi-woman";
import HivChas2 from "./program-forms/hiv-chas-2";
import HivChas3 from "./program-forms/hiv-chas-3";
import HivChas4 from "./program-forms/hiv-chas-4";
import HivChasSti from "./program-forms/hiv-chas-sti";
import Hotline from "./program-forms/hotline";
import IpdEvent from "./program-forms/ipd-event";
import MchChildMortality from "./program-forms/mch-child-mortality";
import MchMaternalMortality from "./program-forms/mch-maternal-mortality";
import MalariaCaseV2 from "./program-forms/malaria-case-v2";
import MalariaLlin from "./program-forms/malaria-llin";
import NcleDisease from "./program-forms/ncle-disease";
import NcleCommunityEbs from "./program-forms/ncle-community-ebs";
import NcleHcEbs from "./program-forms/ncle-hc-ebs";
import MscHealthCentre from "./program-forms/msc-health-centre";
import imam from "./program-forms/imam";
import ImamLayout from "./program-forms/imam/ImamLayout";
import eir from "./program-forms/eir";
import GenderViolence from "./program-forms/gender-violence";
//program locales
import ncleHcEbsLocales from "./locales/NcleHcEbs";
import mchChildMortalityLocales from "./locales/mchChildMortality";
import mchMaternalMortalityLocales from "./locales/mchMaternalMortality";
import hotlineLocales from "./locales/Hotline";
import dli6V1Locales from "./locales/Dlip6V1";
import MCHv2Locales from "./locales/MCHv2";
import MCHv21Locales from "./locales/MCHv21";
import epiChildLocales from "./locales/epiChild";
import hivChas2Locales from "./locales/hivChas2";
import hivChas3Locales from "./locales/hivChas3";
import hivChas4Locales from "./locales/hivChas4";
import ipdEventLocales from "./locales/ipdEvent";
import MchMnch1415Locales from "./locales/MchMnch1415";
import dlipCLocales from "./locales/DlipC";
import ncleDiseaseLocales from "./locales/ncleDisease";
import malariaCaseV2Locales from "./locales/malariaCaseV2";
import malariaLlinLocales from "./locales/malariaLlin";
import epiWomanLocales from "./locales/epiWoman";
//dataSet
import Dlip7 from "./dataset-forms/dlip7";
import EpiMonthly from "./dataset-forms/epi-monthly";
import EpiMonthlyV2 from "./dataset-forms/epi-monthly-v2";
import DofEuHealthFinance from "./dataset-forms/dof-eu-hf";
import DofEuHealthFinanceYAB from "./dataset-forms/dof-eu-hf-yab";
import DofEuHealthFinanceYAP from "./dataset-forms/dof-eu-hf-yap";
import DofEuHealthFinanceProvince from "./dataset-forms/dof-eu-hfp";
import HivChasSTI from "./dataset-forms/hiv-chas-sti";
import HmisPopulation from "./dataset-forms/hmis-population";
import EpiStock from "./dataset-forms/epi-stock";
import HcfNationalHealthAccounts from "./dataset-forms/hcf-nha";
import HivChasVctDetail from "./dataset-forms/hiv-chas-vct";
import HivVctProvince from "./dataset-forms/hiv-vct-prov";
import HmisIpdV1 from "./dataset-forms/hmis-ipd-v1";
import HmisIpdV2 from "./dataset-forms/hmis-ipd-v2";
import HmisOpdV1 from "./dataset-forms/hmis-opd-v1";
import HmisOpdV2 from "./dataset-forms/hmis-opd-v2";
import WbDliNutFb from "./dataset-forms/wb-dli-nut-fb";
import WbDliNut from "./dataset-forms/wb-dli-nut";
import PsiFamilyPlaning from "./dataset-forms/psi-family-planing";
import MchMnchDhoV2 from "./dataset-forms/mch-mnch-dho-v2";
import MchEencNicu from "./dataset-forms/mch-eenc-nicu";
import NcleWeekly from "./dataset-forms/ncle-weekly";
import MchMnch1415 from "./dataset-forms/mch-mnch-1415";
import MchEencEma from "./dataset-forms/mch-eenc-ema";
import MalStock from "./dataset-forms/mal-stock";
import HpvMonthly from "./dataset-forms/hpv-monthly";
import HpvMonthlyV2 from "./dataset-forms/hpv-monthly-v2";
import MalMalariaMonthly from "./dataset-forms/mal-malaria-monthly";
import MchEencSma from "./dataset-forms/mch-eenc-sma";
import TbTreatmentOutcome from "./dataset-forms/tb-treatment-outcome";
import TbTreatmentOutcomeV2 from "./dataset-forms/tb-treatment-outcome-v2";
import TbTreatmentOutcomeHivArt from "./dataset-forms/tb-treatment-outcome-hiv-art";
import TbTreatmentOutcomeHivArtV2 from "./dataset-forms/tb-treatment-outcome-hiv-art-v2";
import DopV3 from "./dataset-forms/dop-v3";
import Dlip6V1 from "./dataset-forms/dlip6-v1";
import Dlip6V2 from "./dataset-forms/dlip6-v2";
import DlipC from "./dataset-forms/dlip-c";
import MchV2 from "./dataset-forms/mch-v2";
import MchV21 from "./dataset-forms/mch-v21";
import NumOfBeds from "./dataset-forms/num-of-beds";
import NcleDqa from "./dataset-forms/ncle-data-quality-assessment";
import EhspBaselineSurvey from "./dataset-forms/ehsp-baseline-survey";
import TbCaseFinding from "./dataset-forms/tb-case-finding";
import TbCaseFindingV2 from "./dataset-forms/tb-case-finding-v2";
import TbPtbeByGeneXpertMonthlyImport from "./dataset-forms/tb-ptbe-by-genexpert-monthly-import";
import DungTest from "./dataset-forms/dung-test";
import eirLocales from "./locales/eir";

//dataSet locales
import wbDliNutFbLocales from "./locales/wbDliNutFb";
import wbDliNutLocales from "./locales/wbDliNut";
import mchEencEmaLocales from "./locales/mchEencEma";
import mchEencNicuLocales from "./locales/mchEencNicu";
import mchEencSmaLocales from "./locales/mchEencSma";
import mchMnchDhoV2Locales from "./locales/mchMnchDhoV2";
import malStockLocales from "./locales/malStock";
import malMalariaMonthlyLocales from "./locales/malMalariaMonthly";
import psiFamilyPlaningLocales from "./locales/psiFamilyPlaning";
import treatmentOutcomeLocales from "./locales/treatmentOutcome";
import treatmentOutcomeOfHivArtLocales from "./locales/treatmentOutcomeOfHivArt";
import ehspBaselineSurveyLocales from "./locales/ehspBaselineSurvey";
import tbCaseFindingLocales from "./locales/tbCaseFinding";
import tbCaseFindingV2Locales from "./locales/tbCaseFindingV2";
import deliveryEventLocales from "./locales/deliveryEvent";
import dofEuHealthFinanceLocales from "./locales/DofEuHealthFinance";
import dopV3Locales from "./locales/DopV3";
import customHooks from "./hooks.js";
import hpvMonthlyV2Locales from "./locales/hpvMonthlyV2";
import epiMonthlyLocales from "./locales/epiMonthly";
import epiStockLocales from "./locales/epiStock";
import hivChasVctDetailLocales from "./locales/HivChasVctDetail";
import hmisIpdV2Locales from "./locales/HmisIpdV2";
import hmisOpdV2Locales from "./locales/HmisOpdV2";
import hmisPopulationLocales from "./locales/HmisPopulation";
import imamLocales from "./locales/imam";
import genderViolenceLocales from "./locales/genderViolence";
import EirCompleteButton from "./program-forms/common/tracker/EirCompleteButton/EirCompleteButton";
import VillageSelectorWithoutHandler from "./program-forms/common/tracker/VillageSelector/VillageSelectorWithoutHandler";

// const { setLayout, resetState } = useTrackerCaptureStore(
//   (state) => ({
//     setLayout: state.actions.setLayout,
//     resetState: state.actions.resetState,
//   }),
//   shallow
// );

const customForms = {
  QQkFwiPkEBv: Dli5,
  Ii2YCz7Om1U: DeliveryEvent,
  UXiVDCcnmoJ: EpiChild,
  ZXUOQUTZdxl: EpiWoman,
  fmv39tEgi3W: HivChas2,
  m9tT3UwWHvE: HivChas3,
  KAzjtGtNLMt: HivChas4,
  cyiTJecbd6Y: HivChasSti,
  QSRfmj1Fb0I: Hotline,
  UaF4Ski9Jn3: IpdEvent,
  SvbebekiPDE: MchChildMortality,
  lHC89UaXkTW: MchMaternalMortality,
  VTiOn7wKC4Q: MalariaCaseV2,
  i5dgcE3CVba: MalariaLlin,
  h6x4kyzKyK3: NcleDisease,
  vmdUzfow7Mz: NcleCommunityEbs,
  mAcd10TBJob: NcleHcEbs,
  hr56o6I5n6p: imam,
  Yj9cJ34AXw6: eir,
  PZ5jcZ6vBWu: GenderViolence,

  //CHANH - DATASET
  I2x3VFuAPUf: DopV3,
  hxKQuh7uVIg: Dlip6V1,
  yWYCsVvySNl: Dlip6V2,
  Q21U47uf0xo: MchV2,
  w8XQmI94Spv: MchV21,
  veTRU0zco7G: NumOfBeds,
  MRF5h4aiWpV: HcfNationalHealthAccounts, // Tạch select period *****
  NWWbBGxUezd: Dlip7,
  Q1wAC70GJcL: DofEuHealthFinance,
  STAl6BFST9b: DofEuHealthFinanceYAB,
  vtI4sGJXxdr: DofEuHealthFinanceYAP,
  EZc7E6Wa3l4: DofEuHealthFinanceProvince,
  Gd5efmbROUX: EpiMonthly,
  vSoNzJFcZzL: EpiMonthlyV2, // tạch orgUnit
  TuBaicMbq7w: EpiStock,
  aIHNl7fTJUa: HivChasSTI,
  e6uo6iRXakF: HivChasVctDetail,
  FxFrptlepYK: HivVctProvince,
  xm6LbvmURdm: HmisIpdV1,
  eRB2lyfgCcC: HmisIpdV2,
  eDXUmwx0yw8: HmisOpdV1,
  cXVnVexZM2V: HmisOpdV2,
  glPUtv9TeID: HmisPopulation,
  Q41TH1Zl2DS: DlipC,
  nGfbmtowSIt: NcleDqa,
  lEpDnhb3bQL: MchMnch1415,
  b9xZzt8pjgy: EhspBaselineSurvey,

  //Huy
  UOunM3a1mTH: HpvMonthly,
  PmG1XGf0bdK: HpvMonthlyV2,
  AdOQpt5vQVw: MalMalariaMonthly,
  lX2gNwsdZwV: MalStock,
  pcuEvAxTtIl: MchEencEma,
  mjgFw3B662J: MchEencNicu,
  zdEd1IooIZU: MchEencSma,
  Fpl26CKBEqZ: MchMnchDhoV2,
  lOP8lnPt1Fc: NcleWeekly,
  EQgigqykRHo: PsiFamilyPlaning,
  JIFWh1SgKJT: TbTreatmentOutcome,
  ctRPmPeRszH: TbTreatmentOutcomeV2,
  nk7c3RWD84W: TbTreatmentOutcomeHivArt,
  ByxNF95QqwB: TbTreatmentOutcomeHivArtV2,
  iJFxwdbPh5z: WbDliNut,
  n612BBRxLPI: WbDliNutFb,
  BKF8Mbva7qk: TbCaseFinding,
  cw7HTpaz9If: TbCaseFindingV2,
  OYgCLeGih3u: TbPtbeByGeneXpertMonthlyImport
  // WiTslxJQpbZ: DungTest
};

const hooks = customHooks;

const locales = {
  //program
  mAcd10TBJob: ncleHcEbsLocales,
  SvbebekiPDE: mchChildMortalityLocales,
  lHC89UaXkTW: mchMaternalMortalityLocales,
  QSRfmj1Fb0I: hotlineLocales,
  Ii2YCz7Om1U: deliveryEventLocales,
  UXiVDCcnmoJ: epiChildLocales,
  fmv39tEgi3W: hivChas2Locales,
  m9tT3UwWHvE: hivChas3Locales,
  KAzjtGtNLMt: hivChas4Locales,
  UaF4Ski9Jn3: ipdEventLocales,
  h6x4kyzKyK3: ncleDiseaseLocales,
  VTiOn7wKC4Q: malariaCaseV2Locales,
  i5dgcE3CVba: malariaLlinLocales,
  Yj9cJ34AXw6: eirLocales,
  ZXUOQUTZdxl: epiWomanLocales,
  //dataSet
  hxKQuh7uVIg: dli6V1Locales,
  yWYCsVvySNl: dli6V1Locales,
  lEpDnhb3bQL: MchMnch1415Locales,
  w8XQmI94Spv: MCHv21Locales,
  Q21U47uf0xo: MCHv2Locales,
  Fpl26CKBEqZ: mchMnchDhoV2Locales,
  n612BBRxLPI: wbDliNutFbLocales,
  iJFxwdbPh5z: wbDliNutLocales,
  mjgFw3B662J: mchEencNicuLocales,
  pcuEvAxTtIl: mchEencEmaLocales,
  zdEd1IooIZU: mchEencSmaLocales,
  Q41TH1Zl2DS: dlipCLocales,
  lX2gNwsdZwV: malStockLocales,
  AdOQpt5vQVw: malMalariaMonthlyLocales,
  EQgigqykRHo: psiFamilyPlaningLocales,
  JIFWh1SgKJT: treatmentOutcomeLocales,
  ctRPmPeRszH: treatmentOutcomeLocales,
  nk7c3RWD84W: treatmentOutcomeOfHivArtLocales,
  ByxNF95QqwB: treatmentOutcomeOfHivArtLocales,
  b9xZzt8pjgy: ehspBaselineSurveyLocales,
  BKF8Mbva7qk: tbCaseFindingLocales,
  cw7HTpaz9If: tbCaseFindingV2Locales,
  Q1wAC70GJcL: dofEuHealthFinanceLocales,
  STAl6BFST9b: dofEuHealthFinanceLocales,
  vtI4sGJXxdr: dofEuHealthFinanceLocales,
  EZc7E6Wa3l4: dofEuHealthFinanceLocales,
  I2x3VFuAPUf: dopV3Locales,
  Gd5efmbROUX: epiMonthlyLocales,
  PmG1XGf0bdK: hpvMonthlyV2Locales,
  TuBaicMbq7w: epiStockLocales,
  e6uo6iRXakF: hivChasVctDetailLocales,
  eRB2lyfgCcC: hmisIpdV2Locales,
  cXVnVexZM2V: hmisOpdV2Locales,
  glPUtv9TeID: hmisPopulationLocales,
  hr56o6I5n6p: imamLocales,
  PZ5jcZ6vBWu: genderViolenceLocales
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

const customEventListColumns = {};

const multiOrgUnitsDataSets = [];

const customTimelineFields = [
  {
    programStage: "DlhoBsu5Cp8",
    fields: [
      {
        style: { fontWeight: "bold" },
        type: "dataElement",
        field: "NtnqZYgVfZ5"
      }
    ]
  }
];

const customProgramRules = {
  QQkFwiPkEBv: [
    {
      condition: "currentEvent.disabled === true",
      programRuleActions: [
        {
          programRuleActionType: "SHOWERROR",
          dataElement: { id: "S3FyEAI34OA" },
          content: ""
        }
      ]
    }
  ]
};

const customEventListSorts = {};
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
  {
    label: "comingSoon",
    type: "text"
  }
];

const eventSaveInjections = [
  // {
  //   program: "h6x4kyzKyK3",
  //   handler: (currentEvent) => {
  //     const { dataValues } = currentEvent;
  //     if (dataValues.Dyq13cMGMzT && dataValues.Dyq13cMGMzT === "7.3") {
  //       purePush("../../../../notification/eventNotification", {
  //         currentEvent,
  //         recipientUserGroups: ["z4hp9fvhvNr"]
  //       });
  //     }
  //   }
  // }
];

const trackerFormTypes = {
  Yj9cJ34AXw6: "tabular"
};

const customTrackerCompleteButtons = {
  Yj9cJ34AXw6: EirCompleteButton
};

const customTeiListColumns = {
  hr56o6I5n6p: [
    {
      type: "attribute",
      id: "RH44eXu8Wwl",
      render: (tei, t) => {
        const foundEnrollment = tei.enrollments.find((enr) => enr.program === "hr56o6I5n6p" && enr.status === "ACTIVE");
        const events = _.sortBy(foundEnrollment.events, ["eventDate"]).reverse();
        const event = events[0];
        const foundAttribute = tei.attributes.find((attr) => attr.attribute === "RH44eXu8Wwl");
        if (event) {
          const foundTypeOfVisit = event.dataValues.find((dv) => dv.dataElement === "NtnqZYgVfZ5");
          if (foundTypeOfVisit && foundTypeOfVisit.value === "Complete") {
            return t("complete");
          }
          return foundAttribute ? foundAttribute.value : "";
        } else {
          return foundAttribute ? foundAttribute.value : "";
        }
      }
    }
  ]
};
const teiSearchSections = {
  hr56o6I5n6p: [
    {
      label: "childDetails",
      trackedEntityAttributes: [
        "zZoGQEghrHp",
        "IEE2BMhfoSc",
        "IBLkiaYRRL3",
        "tQeFLjYbqzv",
        "DmuazFb368B",
        "r8bZppSsIvR",
        "oVwa5LfjnvA",
        "UNiaP6Oz7Mv"
      ]
    },
    {
      label: "guardianDetails",
      trackedEntityAttributes: ["Y58VlT2JZ0h", "rkvu8WOjGun", "hyjuL8jlDbr"]
    },
    {
      label: "treatmentDetails",
      trackedEntityAttributes: ["oWFcp8NFmOV", "B8PuwTK2vGJ"]
    }
  ]
};
const teiFilterSections = {};
const customTeiFilterFields = {
  hr56o6I5n6p: {
    r8bZppSsIvR: (currentTeas, filters, changeFilter) => {
      const foundProvince = currentTeas.find((tea) => tea.id === "r8bZppSsIvR");
      const foundDistrict = currentTeas.find((tea) => tea.id === "oVwa5LfjnvA");
      const foundVillage = currentTeas.find((tea) => tea.id === "UNiaP6Oz7Mv");
      const values = ["r8bZppSsIvR", "oVwa5LfjnvA", "UNiaP6Oz7Mv"].map((tea) => {
        const found = filters.find((f) => f.id === tea);
        if (found) {
          return found.value;
        } else {
          return "";
        }
      });
      return (
        <VillageSelectorWithoutHandler
          labels={[foundProvince.displayFormName, foundDistrict.displayFormName, foundVillage.displayFormName]}
          values={values}
          change={(values) => {
            changeFilter(foundProvince, values[0] ? values[0].value : "");
            changeFilter(foundDistrict, values[1] ? values[1].value : "");
            changeFilter(foundVillage, values[2] ? values[2].value : "");
          }}
        />
      );
    },
    oVwa5LfjnvA: (currentTeas, filters, changeFilter) => {
      return null;
    },
    UNiaP6Oz7Mv: (currentTeas, filters, changeFilter) => {
      return null;
    }
  }
};
const customTeiSearchFields = {
  hr56o6I5n6p: {
    r8bZppSsIvR: (searchableTeas, criterias, changeCriteria) => {
      const foundProvince = searchableTeas.find((tea) => tea.id === "r8bZppSsIvR");
      const foundDistrict = searchableTeas.find((tea) => tea.id === "oVwa5LfjnvA");
      const foundVillage = searchableTeas.find((tea) => tea.id === "UNiaP6Oz7Mv");
      const values = [criterias[foundProvince.id] || "", criterias[foundDistrict.id] || "", criterias[foundVillage.id] || ""];
      return [
        <br />,
        <VillageSelectorWithoutHandler
          labels={[foundProvince.displayFormName, foundDistrict.displayFormName, foundVillage.displayFormName]}
          values={values}
          change={(values) => {
            changeCriteria(foundProvince.id, values[0] ? values[0].value : "");
            changeCriteria(foundDistrict.id, values[1] ? values[1].value : "");
            changeCriteria(foundVillage.id, values[2] ? values[2].value : "");
          }}
        />
      ];
    },
    oVwa5LfjnvA: (searchableTeas, criterias, changeCriteria) => {
      return null;
    },
    UNiaP6Oz7Mv: (searchableTeas, criterias, changeCriteria) => {
      return null;
    }
  }
};

const transferEvent = async (currentTei, currentEnrollment, currentEvent) => {
  let foundDataValue = currentEvent.dataValues.find((dv) => dv.dataElement === "uoKJZliHVhB");

  if (foundDataValue) {
    let tei = { ...currentTei };
    let enrollment = { ...currentEnrollment };
    enrollment.orgUnit = foundDataValue.value;
    tei.orgUnit = foundDataValue.value;
    let foundProgramOwner = tei.programOwners.find((po) => po.program === "hr56o6I5n6p");
    let programOwners = { ...foundProgramOwner };
    if (foundProgramOwner) {
      programOwners.ownerOrgUnit = foundDataValue.value;
      tei.programOwners = tei.programOwners.filter((e) => !e.program === "hr56o6I5n6p");
      tei.programOwners.push(programOwners);
    }
    const updateTei = await push("/api/trackedEntityInstances?strategy=CREATE_AND_UPDATE", {
      trackedEntityInstances: [tei]
    });
    const updateEnrollment = await push("/api/enrollments?strategy=CREATE_AND_UPDATE", {
      enrollments: [enrollment]
    });
    const updateOwnership = await push(
      `/api/tracker/ownership/transfer?trackedEntityInstance=${tei.trackedEntityInstance}&program=hr56o6I5n6p&ou=${foundDataValue.value}`,
      {},
      "PUT"
    );
    useTrackerCaptureStore.setState({
      layout: { layout: "layout1", disableCompleteButton: false }
    });
    useTrackerCaptureStore.setState({
      data: {
        selectedProgramStage: null,
        selectedEvent: null,
        currentTei: null,
        currentEnrollment: null,
        currentEvents: null,
        teiFilter: useTrackerCaptureStore.getState().data.teiFilter
      }
    });
  }
};

const additionalCompleteHandlers = {
  DlhoBsu5Cp8: async (currentTei, currentEnrollment, currentEvent) => {
    if (currentEvent.status === "COMPLETED") {
      await transferEvent(currentTei, currentEnrollment, currentEvent);
    }
  }
};

const modes = ["eventCapture", "dataEntry", "trackerCapture"];

const allowedDataSets = ["Q41TH1Zl2DS", "Gd5efmbROUX", "vSoNzJFcZzL", "TuBaicMbq7w", "eRB2lyfgCcC", "cXVnVexZM2V", "PmG1XGf0bdK", "w8XQmI94Spv"];

const customTrackerLayout = {
  hr56o6I5n6p: ImamLayout
};

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
  additionalCompleteHandlers,
  modes,
  allowedDataSets,
  customTrackerLayout
};
