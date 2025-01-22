import { atom } from "recoil";

const meState = atom({
  key: "meState",
  default: {}
});

const dataSetsState = atom({
  key: "dataSetsState",
  default: []
});

const programsState = atom({
  key: "programsState",
  default: []
});

const orgUnitsState = atom({
  key: "orgUnitsState",
  default: []
});

const dataElementsState = atom({
  key: "dataElementsState",
  default: []
});
const categoryCombosState = atom({
  key: "categoryCombosState",
  default: []
});

const optionSetsState = atom({
  key: "optionSetsState",
  default: []
});

const programRulesState = atom({
  key: "programRulesState",
  default: []
});

const optionGroupsState = atom({
  key: "optionGroupsState",
  default: []
});

export {
  meState,
  dataSetsState,
  programsState,
  orgUnitsState,
  dataElementsState,
  categoryCombosState,
  optionSetsState,
  programRulesState,
  optionGroupsState
};
