import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import { shallow } from "zustand/shallow";
import defaultLocale from "@/defaultLocale";
import configs from "@/configs";
import _ from "lodash";
const { VITE_CONFIG_NAME } = import.meta.env;
const { locales, customLocales } = configs[VITE_CONFIG_NAME];

const useCustomLocales = () => {
  const { program, dataSet } = useSelectionStore((state) => ({ program: state.program, dataSet: state.dataSet }), shallow);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const newLocale = _.cloneDeep(defaultLocale);
    if (customLocales) {
      Object.keys(customLocales).forEach((key) => {
        Object.keys(customLocales[key]).forEach((k) => {
          newLocale[key].translation[k] = customLocales[key][k];
        });
      });
    }
    Object.keys(newLocale).forEach((key) => {
      i18n.addResourceBundle(key, "translation", newLocale[key].translation, true, true);
    });
  }, []);

  useEffect(() => {
    const newLocale = _.cloneDeep(defaultLocale);
    let customLocale;
    if (program) {
      customLocale = locales[program.id];
    } else if (dataSet) {
      customLocale = locales[dataSet.id];
    }
    if (customLocale) {
      Object.keys(customLocale).forEach((key) => {
        Object.keys(customLocale[key]).forEach((k) => {
          newLocale[key].translation[k] = customLocale[key][k];
        });
      });
    }
    Object.keys(newLocale).forEach((key) => {
      i18n.addResourceBundle(key, "translation", newLocale[key].translation, true, true);
    });
  }, [program ? program.id : "", dataSet ? dataSet.id : ""]);
};

export default useCustomLocales;
