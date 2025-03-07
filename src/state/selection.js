import { create } from "zustand";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
const { VITE_MODE } = import.meta.env;

const useSelectionStore = create((set, get) => ({
  orgUnit: null,
  period: {},
  program: null,
  trackerProgram: null,
  dataSet: null,
  attributeOptionCombo: null,
  filteredOrgUnits: null,
  customProgramDataSetHandler: null,
  actions: {
    selectOrgUnit: (orgUnit) =>
      set(() => ({
        orgUnit
      })),
    resetPeriod: () =>
      set(() => ({
        period: {}
      })),
    selectPeriod: (property, value) =>
      set(
        produce((state) => {
          state.period[property] = value;
        })
      ),
    selectProgram: (program) =>
      set(() => ({
        program
      })),
    selectDataSet: (dataSet) =>
      set(() => ({
        dataSet
      })),
    selectAttributeOptionCombo: (attributeOptionCombo) =>
      set(() => ({
        attributeOptionCombo
      })),
    setFilteredOrgUnits: (value) =>
      set(
        produce((state) => {
          state.filteredOrgUnits = value;
        })
      ),
    setCustomProgramDataSetHandler: (handler) =>
      set(
        produce((state) => {
          state.customProgramDataSetHandler = handler;
        })
      )
  }
}));
if (VITE_MODE === "development") {
  mountStoreDevtool("selectionStore", useSelectionStore);
}

export default useSelectionStore;
