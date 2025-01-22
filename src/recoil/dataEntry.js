import { atom, selector } from "recoil";

const dataEntryState = atom({
  key: "dataEntryState",
  default: {
    completeness: null,
    dataValues: null,
    selectedInputField: null,
    error: null,
    isLocked: false
  }
});

const dataEntryCompleteness = selector({
  key: "dataEntryCompleteness",
  get: ({ get }) => {
    const state = get(dataEntryState);
    return state.completeness;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(dataEntryState) };
    if (newValue) {
      currentState.completeness = { ...newValue };
    } else {
      currentState.completeness = null;
    }

    set(dataEntryState, currentState);
  }
});

const dataEntryDataValues = selector({
  key: "dataEntryDataValues",
  get: ({ get }) => {
    const state = get(dataEntryState);
    return state.dataValues;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(dataEntryState) };
    if (newValue) {
      currentState.dataValues = { ...newValue };
    } else {
      currentState.dataValues = null;
    }
    set(dataEntryState, currentState);
  }
});
const dataEntrySelectedInputField = selector({
  key: "dataEntrySelectedInputField",
  get: ({ get }) => {
    const state = get(dataEntryState);
    return state.selectedInputField;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(dataEntryState) };
    if (newValue) {
      currentState.selectedInputField = { ...newValue };
    } else {
      currentState.selectedInputField = null;
    }
    set(dataEntryState, currentState);
  }
});
const dataEntryError = selector({
  key: "dataEntryError",
  get: ({ get }) => {
    const state = get(dataEntryState);
    return state.error;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(dataEntryState) };
    if (newValue) {
      currentState.error = { ...newValue };
    } else {
      currentState.error = null;
    }
    set(dataEntryState, currentState);
  }
});

const dataEntryLocked = selector({
  key: "dataEntryLocked",
  get: ({ get }) => {
    const state = get(dataEntryState);
    return state.isLocked;
  },
  set: ({ get, set }, newValue) => {
    const currentState = { ...get(dataEntryState) };
    currentState.isLocked = newValue;
    set(dataEntryState, currentState);
  }
});

export {
  dataEntryState,
  dataEntryCompleteness,
  dataEntryDataValues,
  dataEntrySelectedInputField,
  dataEntryError,
  dataEntryLocked
};
