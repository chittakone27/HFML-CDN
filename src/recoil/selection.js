import { atom, selector } from "recoil";
import { programsState, dataSetsState } from "./metadata";

const selectionState = atom({
  key: "selectionState",
  default: {
    orgUnit: {},
    period: {
      dhis2Period: "",
      startDate: "",
      endDate: "",
      periodName: ""
    },
    program: "",
    dataSet: "",
    eventCaptureLayout: "layout1"
  }
});

const selectedProgram = selector({
  key: "selectedProgram",
  get: ({ get }) => {
    const state = get(selectionState);
    return state.program;
  },
  set: ({ get, set }, newValue) => {
    const programs = get(programsState);
    const selectedProgram = programs.find((p) => p.id === newValue);
    const currentState = { ...get(selectionState) };
    currentState.program = selectedProgram;
    currentState.dataSet = null;
    set(selectionState, currentState);
  }
});

const selectedDataSet = selector({
  key: "selectedDataSet",
  get: ({ get }) => {
    const state = get(selectionState);
    return state.dataSet;
  },
  set: ({ get, set }, newValue) => {
    const dataSets = get(dataSetsState);
    const selectedDataSet = dataSets.find((ds) => ds.id === newValue);
    const currentState = { ...get(selectionState) };
    currentState.dataSet = selectedDataSet;
    currentState.program = null;
    set(selectionState, currentState);
  }
});

const selectedOrgUnit = selector({
  key: "selectedOrgUnit",
  get: ({ get }) => {
    const state = get(selectionState);
    return state.orgUnit;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(selectionState) };
    currentState.orgUnit = newValue;
    set(selectionState, currentState);
  }
});

const selectedPeriod = selector({
  key: "selectedPeriod",
  get: ({ get }) => {
    const state = get(selectionState);
    return state.period;
  },
  set: ({ get, set }, { type, newValue }) => {
    const currentState = { ...get(selectionState) };
    const newPeriod = { ...currentState.period, [type]: newValue };
    currentState.period = newPeriod;
    set(selectionState, currentState);
  }
});

export { selectionState, selectedProgram, selectedDataSet, selectedOrgUnit, selectedPeriod };
