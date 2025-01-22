import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
const { VITE_MODE } = import.meta.env;

const useMetadataStore = create((set, get) => ({
  percent: 0,
  me: null,
  dataSets: null,
  programs: null,
  orgUnits: null,
  dataElements: null,
  trackedEntityAttributes: null,
  categoryCombos: null,
  optionSets: null,
  programRules: null,
  optionGroups: null,
  actions: {
    setMetadata: (key, value) =>
      set(() => ({
        [key]: value
      })),
    clearMetadata: () =>
      set(() => ({
        me: null,
        dataSets: null,
        programs: null,
        orgUnits: null,
        dataElements: null,
        categoryCombos: null,
        optionSets: null,
        programRules: null,
        optionGroups: null
      }))
  }
}));
if (VITE_MODE === "development") {
  mountStoreDevtool("metadataStore", useMetadataStore);
}

export default useMetadataStore;
