import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { metadata } from "@/api";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import configs from "@/configs";
import { pull } from "@/utils/fetch";
const {
  getProgramIndicators,
  getIndicators,
  getUserRoles,
  getPrograms,
  getDataSets,
  getMe,
  getOrgUnits,
  getDataElements,
  getTrackedEntityAttributes,
  getTrackedEntityInstanceFilters,
  getCategoryCombos,
  getOptionSets,
  getLaoOptionSets,
  getProgramRules,
  getValidationRules,
  getOptionGroups
} = metadata;

const {
  VITE_DEBUG,
  VITE_SELECTED_OU,
  VITE_SELECTED_PROGRAM,
  VITE_SELECTED_DATASET,
  VITE_SELECTED_PERIOD_YEAR,
  VITE_SELECTED_PERIOD_MONTH,
  VITE_BASE_URL,
  VITE_MODE,
  VITE_AUTOMATIC_SELECTION,
  VITE_CONFIG_NAME
} = import.meta.env;

const { locales } = configs[VITE_CONFIG_NAME];

const useInitialization = () => {
  useOnlineStatus();
  const [ready, setReady] = useState(false);
  const { i18n } = useTranslation();
  const { setMetadata } = useMetadataStore((state) => state.actions);
  const { selectProgram, selectOrgUnit, selectDataSet, selectPeriod } = useSelectionStore((state) => state.actions);

  const allProgress = (proms, progress_cb) => {
    let d = 0;
    progress_cb(0);
    for (const p of proms) {
      p.then(() => {
        d++;
        progress_cb((d * 100) / proms.length);
      });
    }
    return Promise.all(proms);
  };

  const init = async () => {
    //INITIALIZATION
    const me = await getMe();
    i18n.changeLanguage(me.settings.keyUiLocale);
    const results = await allProgress(
      [
        getPrograms(),
        getDataSets(),
        getOrgUnits(),
        getDataElements(),
        getOptionSets(me.settings.keyUiLocale),
        // getLaoOptionSets(me.settings.keyUiLocale(),
        getProgramRules(),
        getOptionGroups(),
        getMe(),
        getCategoryCombos(),
        getUserRoles(),
        getProgramIndicators(),
        getValidationRules(),
        getTrackedEntityAttributes(),
        getTrackedEntityInstanceFilters(),
        getIndicators()
      ],
      (percent) => {
        setMetadata("percent", Math.floor(percent));
      }
    );

    const programs = results[0];
    let dataSets = results[1];
    const orgUnits = results[2];
    const dataElements = results[3];
    const optionSets = results[4];
    const programRules = results[5];
    const optionGroups = results[6];
    // const me = results[7];
    const categoryCombos = results[8];
    const userRoles = results[9];
    const programIndicators = results[10];
    const validationRules = results[11];
    const trackedEntityAttributes = results[12];
    const trackedEntityInstanceFilters = results[13];
    const indicators = results[14];

    const filteredDataSets = [];

    let canUncompleteEvent = false;
    me.userCredentials.userRoles.forEach((ur) => {
      const foundUr = userRoles.find((cur) => cur.id === ur.id);
      if (foundUr) {
        foundUr.authorities.forEach((authority) => {
          if (authority === "F_UNCOMPLETE_EVENT") canUncompleteEvent = true;
        });
      }
    });
    me.canUncompleteEvent = canUncompleteEvent;

    programs.forEach((p) => {
      if (p.style && p.style.icon) {
        p.icon = VITE_BASE_URL + `/api/icons/${p.style.icon}/icon.svg`;
      }
      const foundAttr = p.attributeValues.find((attr) => attr.attribute.id === "fKtNdlE6COS");
      if (foundAttr) {
        const foundDataSet = dataSets.find((ds) => ds.id === foundAttr.value);
        if (foundDataSet) {
          p.periodType = foundDataSet.periodType;
          p.dataSet = foundDataSet;
          filteredDataSets.push(foundDataSet.id);
        } else {
          p.periodType = null;
        }
      } else {
        p.periodType = null;
      }
      p.programRuleVariables = p.programRuleVariables.filter((prv) => {
        return prv.programRuleVariableSourceType === "DATAELEMENT_CURRENT_EVENT";
      });
    });
    dataSets = dataSets
      .filter((ds) => !filteredDataSets.includes(ds.id))
      .filter((ds) => {
        return ds.access.read === true && ds.access.data.read === true;
      });

    dataSets.forEach((ds) => {
      ds.hasAttributeCombo = false;
      if (ds.style && ds.style.icon) {
        ds.icon = VITE_BASE_URL + `/api/icons/${ds.style.icon}/icon.svg`;
      }
      if (!ds.categoryCombo.isDefault) {
        ds.hasAttributeCombo = true;
      }
    });
    setMetadata("programs", programs);
    setMetadata("programIndicators", programIndicators);
    setMetadata("indicators", indicators);
    setMetadata("dataSets", dataSets);
    setMetadata("orgUnits", orgUnits);
    setMetadata("dataElements", dataElements);
    setMetadata("trackedEntityAttributes", trackedEntityAttributes);
    setMetadata("trackedEntityInstanceFilters", trackedEntityInstanceFilters);
    setMetadata("optionSets", optionSets);
    setMetadata("categoryCombos", categoryCombos);
    setMetadata("programRules", programRules);
    setMetadata("validationRules", validationRules);
    setMetadata("optionGroups", optionGroups);
    setMetadata("me", me);
    setMetadata("userRoles", userRoles);
    VITE_DEBUG === "true" && debug(programs, dataSets, orgUnits);
    // if (VITE_DEBUG === "false" && VITE_AUTOMATIC_SELECTION === "true") {
    // if (programs.length === 1 && me.organisationUnits.length === 1) {
    //   selectProgram(programs[0]);
    //   if (locales[programs[0].id]) {
    //     Object.keys(locales[programs[0].id]).forEach((locale) => {
    //       i18n.addResources(locale, "translation", locales[programs[0].id][locale]);
    //     });
    //   }
    //   selectOrgUnit(orgUnits.find((ou) => ou.id === me.organisationUnits[0].id));
    // }
    // }
    setReady(true);
  };

  const debug = (programs, dataSets, orgUnits) => {
    const foundOu = orgUnits.find((ou) => ou.id === VITE_SELECTED_OU);
    const foundProgram = programs.find((p) => p.id === VITE_SELECTED_PROGRAM);
    const foundDataSet = dataSets.find((ds) => ds.id === VITE_SELECTED_DATASET);
    if (foundProgram) {
      selectProgram(foundProgram);
      if (locales[foundProgram.id]) {
        Object.keys(locales[foundProgram.id]).forEach((locale) => {
          i18n.addResources(locale, "translation", locales[foundProgram.id][locale]);
        });
      }
    }
    if (foundDataSet) {
      selectDataSet(foundDataSet);
      if (locales[foundDataSet.id]) {
        Object.keys(locales[foundDataSet.id]).forEach((locale) => {
          i18n.addResources(locale, "translation", locales[foundDataSet.id][locale]);
        });
      }
    }
    if (foundOu) selectOrgUnit(foundOu);
    selectPeriod("year", VITE_SELECTED_PERIOD_YEAR);
    selectPeriod("month", VITE_SELECTED_PERIOD_MONTH ? VITE_SELECTED_PERIOD_MONTH : "");
  };

  useEffect(() => {
    init();
  }, []);

  return ready;
};

export default useInitialization;
