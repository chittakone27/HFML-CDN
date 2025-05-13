import { create } from "zustand";
import produce from "immer";

const useChrTrackerStore = create((set, get) => ({
  profile: {
    helpers: [],
    disabledFields: [],
    hiddenFields: [],
    props: {}
  },
  event: {
    currentProgramStage: null,
    currentEvent: null,
    editing: false,
    currentEnrollment: null,
    currentChild: null,
    formErrors: [],
    disableIncompleteButton: false
  },
  actions: {
    setProfile: (key, value) => {
      set(
        produce((state) => {
          state.profile[key] = value;
        })
      );
    },
    setEvent: (key, value) => {
      set(
        produce((state) => {
          state.event[key] = value;
        })
      );
    },
    changeDataValue: (dataElement, value) => {
      set(
        produce((state) => {
          const foundDataValueIndex = state.event.currentEvent.dataValues.findIndex((dv) => dv.dataElement === dataElement);
          if (foundDataValueIndex === -1) {
            state.event.currentEvent.dataValues.push({
              dataElement,
              value
            });
          } else {
            state.event.currentEvent.dataValues[foundDataValueIndex].value = value;
          }
        })
      );
    },
    changeEventProperty: (property, value) => {
      set(
        produce((state) => {
          state.event.currentEvent[property] = value;
        })
      );
    }
  }
}));

export default useChrTrackerStore;
